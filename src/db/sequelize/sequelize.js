const { Sequelize, DataTypes, json } = require("sequelize");
const materialModel = require("../../modele/material");

const sequelize = new Sequelize(
  process.env.database,
  process.env.username,
  process.env.password,
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
