const { Sequelize, DataType } = require("sequelize");

const sequelize = new Sequelize("info8", "inf8", "Q3P", {
  dialect: "mysql",
  host: "localhost",
});
