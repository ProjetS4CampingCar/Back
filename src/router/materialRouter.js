const router = require("./router");
const materialsController = require("../controller/materialController");

router.get("/materials", async (req, res) => {
  const getMaterials = await materialsController.getMaterials(req);
  res.json(getMaterials);
});

module.exports = router;
