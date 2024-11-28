const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");
const app = express();

dotenv.config();

app.get("/hello", async (req, res) => {
  try {
    const greeting = await axios.get(process.env.API_HELLO_URL);
    const name = await axios.get(process.env.API_WORLD_URL);
    res.json({ message: `${greeting.data.message}, ${name.data.name}!` });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong!" });
  }
});

app.listen(process.env.PORT, () => {
  console.log(
    `API Gateway running on http://localhost:${process.env.PORT}/hello`
  );
});
