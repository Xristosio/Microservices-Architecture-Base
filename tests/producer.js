const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "greeting-service",
  brokers: ["server"],
});

const producer = kafka.producer();

const run = async () => {
  await producer.connect();
  await producer.send({
    topic: "mytopic",
    messages: [{ value: "Hello from greeting-service!" }],
  });
  await producer.disconnect();
};

run().catch(console.error);
