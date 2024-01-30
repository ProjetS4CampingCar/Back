const { Sequelize, DataTypes, json } = require("sequelize");
const materialModel = require("../../modele/material");

const sequelize = new Sequelize("info8", "root", "", {
  dialect: "mysql",
  host: "localhost",
});

const material = materialModel(sequelize, DataTypes);

sequelize.sync().then(() => {
  console.log("La connexion avec la base de données fonctionne correctement");
});

module.exports = { material };
