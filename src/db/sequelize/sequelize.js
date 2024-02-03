const { Sequelize, DataTypes, json } = require("sequelize");
const userModel = require("../modele/user");
const materialModel = require("../modele/material");
const reservationModel = require("../modele/reservation");

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


// false means that we don't drop the tables to recreate them
sequelize.sync({force: false}).then(() => {
  console.log("La connexion avec la base de données fonctionne correctement");
});


const user = userModel(sequelize, DataTypes);
const material = materialModel(sequelize, DataTypes);
const reservation = reservationModel(sequelize, DataTypes)

user.hasMany(reservation, {
foreignKey: 'id_user'
});
reservation.belongsTo(user, {
  foreignKey: 'id_user'
})

module.exports = {user, material, reservation};
