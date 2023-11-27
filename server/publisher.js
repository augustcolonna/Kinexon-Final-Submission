// Import necessary libraries
import { socket } from "zeromq";
import pkg from "protobufjs";

//protobuf import
const { loadSync } = pkg;
const root = loadSync("proto/messages.proto");
const Data3d = root.lookupType("player.positions.Data3d");
const Position = root.lookupType("player.positions.Position");

// Create a ZeroMQ publisher socket
const publisher = socket("pub");

// Bind the socket to a port
const port = "tcp://127.0.0.1:3001";
publisher.bindSync(port);
console.log(`Publisher bound to ${port}`);

// Function to generate a random position
function generatePosition() {
  return Data3d.create({
    x: Math.abs(Math.floor(Math.random() * 101)),
    y: Math.abs(Math.floor(Math.random() * 101)),
    z: 0,
  });
}

function generateMovement(coordinates) {
  let playerMovement = Math.floor(Math.random() * 6);

  if (coordinates.x === 0) {
    coordinates.x += playerMovement;
  }
  if (coordinates.y === 0) {
    coordinates.y += playerMovement;
  }
  if (coordinates.x === 100) {
    coordinates.x -= playerMovement;
  }
  if (coordinates.y === 100) {
    coordinates.y -= playerMovement;
  } else {
    coordinates.x += Math.floor(Math.random() * 11) - 5;
    coordinates.y += Math.floor(Math.random() * 11) - 5;
  }

  return Data3d.create({
    x: coordinates.x,
    y: coordinates.y,
    z: coordinates.z,
  });
}

// Function to add noise to the position
function addNoise(coordinates) {
  return Data3d.create({
    x: coordinates.x + Math.abs(Math.floor(Math.random() - 0.5) * 0.6),
    y: coordinates.y + Math.abs(Math.floor(Math.random() - 0.5) * 0.6),
    z: coordinates.z + Math.abs(Math.floor(Math.random() - 0.5) * 0.6),
  });
}

// Function to publish updates
function publishUpdates() {
  const generateInitialPosition = generatePosition();

  setInterval(() => {
    for (let i = 1; i <= 10; i++) {
      const timestamp = new Date();
      const timestamp_usec = timestamp.getTime() * 1000;

      const movement = generateMovement(generateInitialPosition);

      const positionWithNoise = addNoise(movement);

      const positionData = {
        sensorId: i.toString(),
        timestampUsec: timestamp_usec.toString(),
        data3d: positionWithNoise,
      };

      console.log(positionData);
      const message = Position.create(positionData);

      const encodeMessage = Position.encode(message).finish();
      publisher.send(["", encodeMessage]);

      console.log("Published message:");
    }
  }, 1000);
}

publishUpdates();
