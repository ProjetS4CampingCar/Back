const express = require("express");
const sequelize = require("../db/sequelize/sequelize");

const router = new express.Router();

router.get("/materials", async (req, res) => {
  const test = await sequelize.material.findAll();
  res.json(test);
});

module.exports = router;
