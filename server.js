const express = require("express");
const helmet = require("helmet");
const server = express();
const apiRouter = require("./routes");

server.use(helmet());
server.use(express.json());
server.use("/api", apiRouter);

server.get("/", (req, res) => {
  res, status(200).json({ api: "up and running..." });
});

module.exports = server;
