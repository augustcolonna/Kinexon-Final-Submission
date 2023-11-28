// Import necessary libraries
import { socket } from "zeromq";
import pkg from "protobufjs";
import express from "express";
import cors from "cors";
import * as http from "http";
import WebSocket from "ws";

const app = express();
app.use(cors());
const expressPort = 3000;

//protobuf import
const { loadSync } = pkg;
const root = loadSync("proto/messages.proto");
const Data3d = root.lookupType("player.positions.Data3d");
const Position = root.lookupType("player.positions.Position");

//instantiating websocket server
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Create a ZeroMQ publisher socket
const publisher = socket("pub");

// Bind the socket to a port
const port = "tcp://127.0.0.1:3001";
publisher.bindSync(port);
console.log(`Publisher bound to ${port}`);

// Function to generate a random position, used for initial position
function generatePosition() {
  return Data3d.create({
    x: Math.abs(Math.floor(Math.random() * 100)),
    y: Math.abs(Math.floor(Math.random() * 100)),
    z: Math.floor(Math.random() * 4),
  });
}
//create players initial position on the court
const initialPosition = generatePosition();
//generate random movement off of initial position coordinates
function generateMovement() {
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
    initialPosition.y += playerMovementZ;
  } else if (initialPosition.z === 3 || initialPosition.z > 3) {
    initialPosition.y -= playerMovementZ;
  } else {
    initialPosition.y += Math.floor(Math.random() * 11) - 5;
  }

  // check if coordinates are in the court range
  initialPosition.x = Math.max(0, Math.min(100, initialPosition.x));
  initialPosition.y = Math.max(0, Math.min(100, initialPosition.y));

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

// // Function to publish player movement messages, encode in protobuf message
// function publishUpdates() {
//   setInterval(() => {
//     for (let i = 1; i <= 10; i++) {
//       const timestamp = new Date();
//       const timestamp_usec = timestamp.getTime() * 1000;
//       const movement = generateMovement();
//       const positionWithNoise = addNoise(movement);

//       const positionData = {
//         sensorId: i.toString(),
//         timestampUsec: timestamp_usec.toString(),
//         data3d: positionWithNoise,
//       };

//       console.log(positionData);
//       const message = Position.create(positionData);

//       const encodeMessage = Position.encode(message).finish();
//       publisher.send(["positions", encodeMessage]);

//       console.log("Published message:");
//     }
//   }, 1000);
// }
// publishUpdates();

app.get("/positions", (req, res) => {
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

        console.log(positionData);
        const message = Position.create(positionData);

        const encodeMessage = Position.encode(message).finish();
        publisher.send(["positions", encodeMessage]);

        console.log("Published message:");
      }
    }, 1000);
  }
  publishUpdates();
  res.send({ "updates sent": true });
});

app.listen(expressPort, () => {
  console.log(`App listening on port ${expressPort}`);
});
