const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = express();
const Authenticate = require("./middleware/Authenticate");

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

dotenv.config({ path: "./config.env" });
require("./db/conn");

app.use(require("./router/auth"));

const PORT = process.env.PORT;

// middleware;
app.get("/home", Authenticate, (req, res) => {
  res.send(req.rootUser);
  res.setHeader("Access-Control-Allow-Credentials", "true");
});

app.listen(PORT, () => {
  console.log(`server is running on port no ${PORT}`);
});
