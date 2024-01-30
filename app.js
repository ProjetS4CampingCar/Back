const express = require("express");
const socketIo = require("socket.io");
const sequelize = require("./src/db/sequelize/sequelize");
const materialRouter = require("./src/router/material");

const app = express();
const http = require("http");
const server = http.createServer(app);
const io = socketIo(server);

app.get("/", async (req, res) => {
  res.send("bonjour sur la page d'acceuil");
});

app.use(materialRouter);

const PORT = 3008;
server.listen(PORT, () => {
  console.log(
    "le serveur est bien sur le port" +
      PORT +
      " et tourne sur http://localhost:3008/"
  );
});
