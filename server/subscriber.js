// //protobuf import
// const { loadSync } = pkg;
// const root = loadSync("proto/messages.proto");
// // const Data3d = root.lookupType("player.positions.Data3d");
// const Position = root.lookupType("player.positions.Position");
// const app = express();
// import { socket } from "zeromq";
// import pkg from "protobufjs";

// const subscriber = socket("sub");

// const port = "tcp://127.0.0.1:3001";
// subscriber.connect(port);
// subscriber.subscribe("");

// let lastPosition = [];
// function lastPositionData(positionMessage) {
//   const Id = positionMessage.sensorId;
//   const timestamp = positionMessage.timestampUsec;
//   const data3d = positionMessage.data3d;

//   const newPositionData = {
//     sensorId: Id,
//     timestamp: timestamp,
//     data3d: data3d,
//     id: uuidv4(),
//   };

//   lastPosition.push(newPositionData);
// }

// subscriber.on("message", (topic, message) => {
//   try {
//     const positionMessage = Position.decode(message);

//     // console.log("connected");
//     // console.log(positionMessage);
//     console.log("subscriber connected");
//     lastPositionData(positionMessage);
//   } catch (error) {
//     console.error("Error decoding message:", error);
//   }
// });

// app.get("/positions", async (req, res) => {
//   if (lastPosition) {
//     // console.log(lastPosition);
//     console.log(lastPosition);
//     res.status(200).send(lastPosition);
//   } else {
//     // Handle the case where there is no latest position message
//     res.status(404).send("No position data available");
//   }
// });
