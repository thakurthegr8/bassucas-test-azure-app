require("dotenv").config();

const express = require("express");

const morgan = require("morgan");

const app = express();

app.use(morgan("tiny"));

app.get("/", (req, res) =>
  res.status(200).json("Hello world" + process.env.API_KEY)
);

app.listen(process.env.PORT || 3000, () => console.log("Listening"));
