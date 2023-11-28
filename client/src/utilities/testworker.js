// @/worker.js
import { Subscriber } from "zeromq";
import process from "process";

const sock = new Subscriber();

const main = async () => {
  try {
    sock.connect("tcp://localhost:7890");
    sock.subscribe("dev.to");
    for await (const [topic, msg] of sock) {
      console.log(
        "Received message from " + topic + " channel and this is the content:"
      );
      console.log(JSON.parse(msg));
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
main();
