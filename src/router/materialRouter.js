const router = require("./router");
const materialsController = require("../controller/materialController");

const multer  = require('multer');
const material = require("../db/modele/material");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Spécifiez le dossier de destination
    cb(null, './src/pictures/materials');
  },
   filename: function (req, file, cb) {
      cb(null, file.originalname);
}
});

const upload = multer({storage: storage});

router.get("/materials", async (req, res) => {
  const getMaterials = await materialsController.getMaterials(req);
  res.json(getMaterials.test);
});

router.get(
  "/materials/create/:name/:description/:category/:price/:state",
  async (req, res) => {
    const createMaterials = await materialsController.newMaterialGet(req);
    res.json(createMaterials);
  }
);

router.get("/materials/delete/:id", async (req, res) => {
  const deleteMaterials = await materialsController.removeMaterialGet(req, res);
  res.json(deleteMaterials);
});

router.get(
  "/materials/update/:id/:name/:description/:category/:price/:state",
  async (req, res) => {
    const updateMaterials = await materialsController.modifyMaterialGet(
      req,
      res
    );
    res.json(updateMaterials);
  }
);

router.post("/materials", upload.single("file"), async  (req, res) => {
  const createMaterials = await materialsController.newMaterial(req);
  res.json(createMaterials);
});



router.delete("/materials/:id", async (req, res) => {
  const deleteMaterials = await materialsController.removeMaterial(req, res);
  res.json(deleteMaterials);
});

router.put("/materials", async (req, res) => {
  const updateMaterials = await materialsController.modifyMaterial(req, res);
  res.json(updateMaterials);
});

module.exports = router;
