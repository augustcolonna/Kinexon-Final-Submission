import fastify from "fastify";
const zmq = require("zeromq");

const app = fastify();
const sock = new zmq.Publisher();

app.post("/", async (req, res) => {
  await sock.send(["is this working", JSON.stringify({ ...req.body })]);
  return res.send("Sent to the subscriber");
});

const main = async () => {
  try {
    await sock.bind("tcp://*:3001");
    await app.listen(3000);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

main();
