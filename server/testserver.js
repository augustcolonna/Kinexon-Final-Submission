// @/server.js
import Fastify from "fastify";
import pkg from "zeromq";
const { Publisher } = pkg;

const app = Fastify();
const subscriber = socket("sub");
const port = "tcp://127.0.0.1:3001";
subscriber.connect(port);

app.post("/", async (request, reply) => {
  await sock.send(["dev.to", JSON.stringify({ ...request.body })]);
  return reply.send("Sent to the subscriber/worker.");
});

const main = async () => {
  try {
    await sock.bind("tcp://*:7890");
    await app.listen(3000);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
main();
