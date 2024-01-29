const express = require("express");
const socketIo = require("socket.io");
const sequelize = require("./src/db/sequelize/sequelize");

const app = express();
const http = require("http");
const server = http.createServer(app);
const io = socketIo(server);

app.get("/", (req, res) => {
  res.send("Bonjour ca marche heu peu etre");
});

const PORT = 3008;
server.listen(PORT, () => {
  console.log("le serveur est bien sur le port" + PORT);
});
