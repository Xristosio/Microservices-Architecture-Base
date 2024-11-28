const express = require("express");
const app = express();
const dotenv = require("dotenv");

dotenv.config();

app.get("/greeting", (req, res) => {
  res.json({ message: "Hello" });
});

app.listen(process.env.PORT, () => {
  console.log(
    `Greeting Service running on http://localhost:${process.env.PORT}/greeting`
  );
});
