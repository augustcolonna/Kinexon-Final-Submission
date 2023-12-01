// Import necessary libraries
import { socket } from "zeromq";
import pkg from "protobufjs";
import cors from "cors";
import express from "express";
import { v4 as uuidv4 } from "uuid";

const app = express();
const expressPort = 3000;
app.use(cors());

// //import utilities
// import FileQueue from "./utilities/fileQueue.js";

//protobuf import
const { loadSync } = pkg;
const root = loadSync("proto/messages.proto");
const Data3d = root.lookupType("player.positions.Data3d");
const Position = root.lookupType("player.positions.Position");

// Create a ZeroMQ publisher socket
const publisher = socket("pub");
// Create a ZeroMQ subscriber socket
const subscriber = socket("sub");

// Bind the socket to a port
const port = "tcp://127.0.0.1:3001";
publisher.bindSync(port);
console.log(`Publisher bound to ${port}`);
subscriber.connect(port);
subscriber.subscribe("");

// const Queue = new FileQueue();

// Function to generate a random position, used for initial position
function generatePosition() {
  for (let i = 0; i < 10; i++) {
    return Data3d.create({
      x: Math.abs(Math.floor(Math.random() * 100)),
      y: Math.abs(Math.floor(Math.random() * 100)),
      z: Math.floor(Math.random() * 4),
    });
  }
}
//create players initial position on the court
const initialPosition = generatePosition();
//generate random movement off of initial position coordinates
function generateMovement() {
  for (let i = 0; i < 10; i++) {
    let playerMovement = Math.floor(Math.random() * 11);
    let playerMovementZ = Math.floor(Math.random() * 4);
    // Update x coordinate
    if (initialPosition.x === 0) {
      initialPosition.x += playerMovement;
    } else if (initialPosition.x === 100 || initialPosition.y > 100) {
      initialPosition.x -= playerMovement;
    } else {
      initialPosition.x += Math.floor(Math.random() * 11) - 5;
    }

    // Update y coordinate
    if (initialPosition.y === 0 || initialPosition.y < 0) {
      initialPosition.y += playerMovement;
    } else if (initialPosition.y === 100 || initialPosition.y > 100) {
      initialPosition.y -= playerMovement;
    } else {
      initialPosition.y += Math.floor(Math.random() * 11) - 5;
    }

    //update z coordinate
    if (initialPosition.z === 0 || initialPosition.z < 0) {
      initialPosition.z += playerMovementZ;
    } else if (initialPosition.z === 3 || initialPosition.z > 3) {
      initialPosition.z -= playerMovementZ;
    } else {
      initialPosition.z += playerMovementZ;
    }

    // check if coordinates are in the court range
    initialPosition.x = Math.max(0, Math.min(100, initialPosition.x));
    initialPosition.y = Math.max(0, Math.min(100, initialPosition.y));
    initialPosition.z = Math.max(0, Math.min(3, initialPosition.z));
  }

  return Data3d.create({
    x: initialPosition.x,
    y: initialPosition.y,
    z: initialPosition.z,
  });
}
// Function to add noise to the position
function addNoise(coordinates) {
  return Data3d.create({
    x: (coordinates.x += Math.floor(Math.random() - 0.5) * 0.6),
    y: (coordinates.y += Math.floor(Math.random() - 0.5) * 0.6),
    z: (coordinates.z += Math.floor(Math.random() - 0.5) * 0.6),
  });
}
//publish updates of player position to subscriber
function publishUpdates() {
  setInterval(() => {
    for (let i = 1; i <= 10; i++) {
      const timestamp = new Date();
      const timestamp_usec = timestamp.getTime() * 1000;
      const movement = generateMovement();
      const positionWithNoise = addNoise(movement);

      const positionData = {
        sensorId: i.toString(),
        timestampUsec: timestamp_usec.toString(),
        data3d: positionWithNoise,
      };

      // console.log(positionData);
      const message = Position.create(positionData);

      const encodeMessage = Position.encode(message).finish();
      publisher.send(["", encodeMessage]);

      console.log("Published message:");
    }
  }, 1000);
}
publishUpdates();

//create array to store last position data
let lastPosition = [];
function lastPositionData(positionMessage) {
  const Id = positionMessage.sensorId;
  const timestamp = positionMessage.timestampUsec;
  const data3d = positionMessage.data3d;

  const newPositionData = {
    sensorId: Id,
    timestamp: timestamp,
    data3d: data3d,
    id: uuidv4(),
  };

  lastPosition.push(newPositionData);
}

//subscriber to publisher socket
subscriber.on("message", (topic, message) => {
  try {
    const positionMessage = Position.decode(message);
    lastPositionData(positionMessage);
  } catch (error) {
    console.error("Error decoding message:", error);
  }
});

app.get("/positions", async (req, res) => {
  if (lastPosition) {
    // console.log(lastPosition);
    // console.log(lastPosition);
    res.status(200).send(lastPosition);
  } else {
    // Handle the case where there is no latest position message
    res.status(404).send("No position data available");
  }
});

//express server listening on port 3000
app.listen(expressPort, () => {
  console.log(`App listening on port ${expressPort}`);
});
