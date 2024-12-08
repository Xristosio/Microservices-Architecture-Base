const { Kafka } = require("kafkajs");
//const EventSource = require("eventsource"); for Server-Sent Events (SSE)

const kafka = new Kafka({
  clientId: "test-service",
  brokers: ["server"],
});

const producer = kafka.producer();
let i = 0;

const run = async () => {
  await producer.connect();

  try {
    while (true) {
      await producer.send({
        topic: "mytopic",
        messages: [{ value: "Hello from test-service!" + i++ }],
      });
    }
  } catch (e) {
    console.log(e);
    await producer.disconnect();
  }
};

run().catch(console.error);
