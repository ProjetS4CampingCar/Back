const express = require("express");
const socketIo = require("socket.io");
const sequelize = require("./src/db/sequelize/sequelize");
const router = require("./src/router/allRouter");

const bodyParser = require("body-parser");
const helmet = require("helmet");

const cors = require("cors");
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = socketIo(server);
const pathAPI = "/api";

app.use(bodyParser.json());
app.use(helmet());
app.use(cors());

app.get("/", (req, res) => {
  res.json("Commande Pour lancer NODE JS est (npx nodemon app.js)");
});

//app.use(pathAPI, materialRouter);
app.use(pathAPI, router);

const PORT = 3008;
server.listen(PORT, () => {
  console.log(
    "le serveur est bien sur le port" +
      PORT +
      " et tourne sur http://localhost:3008/"
  );
});
