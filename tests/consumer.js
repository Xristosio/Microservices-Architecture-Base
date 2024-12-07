const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "api-gateway",
  brokers: ["server"],
});

const consumer = kafka.consumer({ groupId: "api-gateway-group" });

const run = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: "mytopic", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(`Received message: ${message.value.toString()}`);
    },
  });
};

run().catch(console.error);
