const { Sequelize, DataTypes, json } = require("sequelize");
const materialModel = require("../modele/material");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    dialect: "mysql",
    host: "localhost",
  }
);

sequelize.sync().then(() => {
  console.log("La connexion avec la base de données fonctionne correctement");
});
const material = materialModel(sequelize, DataTypes);

module.exports = { material };
