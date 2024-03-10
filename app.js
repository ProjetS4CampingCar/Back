const express = require("express");
const socketIo = require("socket.io");
const sequelize = require("./src/db/sequelize/sequelize");
const materialRouter = require("./src/router/materialRouter");
const reservationRouter = require("./src/router/reservationRouter");
const bodyParser = require("body-parser");
const router = require("./src/router/allRouter");

const bodyParser = require("body-parser");
const helmet = require("helmet");

const cors = require("cors");
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = socketIo(server);
const pathAPI = "/api";
const cors = require("cors");

app.use(bodyParser.json());
app.use(helmet());
app.use(cors());

app.get("/", (req, res) => {
  res.json("Commande Pour lancer NODE JS est (npx nodemon app.js)");
});

app.use(cors());

app.use(bodyParser.json());
app.use(pathAPI, materialRouter);
app.use(pathAPI, reservationRouter);

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
