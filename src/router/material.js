const { material } = require("../db/sequelize/sequelize");
const router = require("./router");

router.get("/materials", async (req, res) => {
  const test = await material.findAll();
  res.json(test);
});

module.exports = router;
