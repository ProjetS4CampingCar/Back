const express = require("express");
const socketIo = require("socket.io");
const sequelize = require("./src/db/sequelize/sequelize");
const materialRouter = require("./src/router/materialRouter");
const reservationRouter = require("./src/router/reservationRouter");
const bodyParser = require("body-parser");
const router = require("./src/router/allRouter");
const helmet = require("helmet");
const cors = require("cors");
const http = require("http");

const pathAPI = "/api";

const app = express();
const server = http.createServer(app);
const io = socketIo(server);




app.get("/", (req, res) => {
  res.json("Commande Pour lancer NODE JS est (npx nodemon app.js)");
});

// parse body of request 
app.use(bodyParser.json());
// encodage 
app.use(helmet());
// cross origini ...
app.use(cors({ origin: "51.68.91.213" }));
app.use(pathAPI, materialRouter);
app.use(pathAPI, reservationRouter);
app.use(pathAPI, router);

const PORT = 3008;
server.listen(PORT, () => {
  console.log(
    "le serveur est bien sur le port" +
    PORT +
    " et tourne sur http://localhost:3008/"
  );
});
