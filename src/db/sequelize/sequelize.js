const { Sequelize, DataTypes } = require("sequelize");
const materialModel = require("../../modele/material");

const sequelize = new Sequelize("info8", "info8", "Q3P", {
  dialect: "mysql",
  host: "localhost",
});

//const material = materialModel(sequelize, DataTypes);

sequelize.sync().then(console.log("La connection avec la base marche bien"));
