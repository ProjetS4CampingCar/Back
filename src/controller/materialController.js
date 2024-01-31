const { material, sequelize } = require("../db/sequelize/sequelize");

const getMaterials = async (req) => {
  const test = await material.findAll({
    attributes: ["name"],
  });
  const test2 = await sequelize.query("SELECT * FROM material", {
    type: sequelize.QueryTypes.SELECT,
  });
  return { test, test2 };
};

module.exports = {
  getMaterials,
};
