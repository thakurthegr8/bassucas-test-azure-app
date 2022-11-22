require("dotenv").config();

const express = require("express");

const app = express();

const morgan = require("morgan");

const cors = require("cors");

const db = require("./database");

const userRoute = require("./routes/user");

const port = process.env.PORT || 3000;

db();

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

app.get("/", (req, res) => res.status(200).json("Hello to the api"));

app.use("/user", userRoute);

app.listen(port, () => console.log(`Listening on port ${port}`));
