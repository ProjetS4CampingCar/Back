const { Sequelize, DataType } = require("sequelize");

const sequelize = new Sequelize(
  process.env.database, 
  process.env.username,
  process.env.password, {
  dialect: "mysql",
  host: "localhost",
});
