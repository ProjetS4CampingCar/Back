const { material } = require("../db/sequelize/sequelize");

const getMaterials = async (req) => {
  const test = await material.findAll();
  return test;
};

module.exports = {
  getMaterials,
};
