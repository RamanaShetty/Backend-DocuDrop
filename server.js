const express = require("express");
const dotenv = require("dotenv");

const db = require("./config/db");

const app = express();
dotenv.config({ path: "./config/config.env" });

db(app);

app.use(express.json());

app.use("/api/v1/user", require("./controller/user"));
