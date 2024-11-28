const express = require("express");
const app = express();
const dotenv = require("dotenv");

dotenv.config();

app.get("/name", (req, res) => {
  res.json({ name: "World" });
});

app.listen(process.env.PORT, () => {
  console.log(
    `Name Service running on http://localhost:${process.env.PORT}/name`
  );
});
