const express = require("express");
const { Kafka } = require("kafkajs");
require("dotenv").config(); // Read environment variables

// Load environment variables
const kafkaBroker = process.env.KAFKA_BROKER;
const kafkaTopic = process.env.KAFKA_TOPIC;
const PORT = process.env.PORT;

// Set up Express app
const app = express();

const kafka = new Kafka({
  clientId: "api-gateway",
  brokers: [kafkaBroker],
});

const consumer = kafka.consumer({ groupId: "api-gateway-group" });
let messages = [];

const run = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: kafkaTopic, fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      messages.push(message.value.toString());
    },
  });
};

app.get("/all", (req, res) => {
  // Send all received messages as a JSON response
  res.json({ messages: messages });
});

run().catch(console.error);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/all`);
});
