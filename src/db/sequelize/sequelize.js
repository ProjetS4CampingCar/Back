const { Sequelize, Model, DataTypes, json } = require("sequelize");
const userModel = require("../modele/user");
const materialModel = require("../modele/material");
const reservationModel = require("../modele/reservation");
const reservationMaterialModel = require("../modele/reservationMaterial");

require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    dialect: "mysql",
    host: process.env.HOST,
  }
);

const user = userModel(sequelize, DataTypes);
const material = materialModel(sequelize, DataTypes);
const reservation = reservationModel(Model, sequelize, DataTypes);
const reservationMaterial = reservationMaterialModel(sequelize, DataTypes);

user.hasMany(reservation, {
  foreignKey: "id_user",
});
reservation.belongsTo(user, {
  foreignKey: "id_user",
});

// Reservation_Material
reservation.belongsToMany(material, {
  through: reservationMaterial,
  foreignKey: "id_reservation", // replaces `reservationId`
  otherKey: "id_material",
});
material.belongsToMany(reservation, {
  through: reservationMaterial,
  foreignKey: "id_material", // replaces `materialId`
  otherKey: "id_reservation",
});

// false means that we don't drop the tables to recreate them
sequelize.sync({ force: true, logging: console.log }).then(() => {
  console.log("La connexion avec la base de données fonctionne correctement");
});

module.exports = {
  sequelize,
  user,
  material,
  reservation,
  reservationMaterial,
};
