const { material, sequelize } = require("../db/sequelize/sequelize");
const {
  createMaterial,
  deleteMaterial,
  updateMaterial,
} = require("../db/crud/materialCrud");

const getMaterials = async (req) => {
  const test = await material.findAll();
  const test2 = await sequelize.query("SELECT * FROM material", {
    type: sequelize.QueryTypes.SELECT,
  });
  return { test, test2 };
};

const newMaterialGet = async (req) => {
  const url = req.params;

  const name = url.name;
  const description = url.description;
  const category = url.category;
  const price = parseInt(url.price);
  const state = url.state;

  if (isNaN(price) || price < 0) {
    return res
      .status(400)
      .send("L'ID du matériel doit être un entier positif.");
  }

  const data = {
    name: name,
    description: description,
    category: category,
    price: price,
    state: state,
  };

  const m = await createMaterial(material, data);
  return m ? true : false;
};

const removeMaterialGet = async (req, res) => {
  const materialId = parseInt(req.params.id);

  if (isNaN(materialId) || materialId < 0) {
    return res
      .status(400)
      .send("L'ID du matériel doit être un entier positif.");
  }

  const m = await deleteMaterial(material, materialId);
  return m ? true : false;
};

const modifyMaterialGet = async (req, res) => {
  const url = req.params;

  const materialId = parseInt(url.id);
  const name = url.name;
  const description = url.description;
  const category = url.category;
  const price = parseInt(url.price);
  const state = url.state;

  if (isNaN(materialId) || (materialId < 0 && isNaN(price)) || price < 0) {
    return res
      .status(400)
      .send("L'ID du matériel doit être un entier positif.");
  }

  const data = {
    name: name,
    description: description,
    category: category,
    price: price,
    state: state,
  };

  const m = await updateMaterial(material, materialId, data);
  return m ? true : false;
};

const newMaterial = async (req) => {
  const body = req.body;

  const name = body.name;
  const description = body.description;
  const category = body.category;
  const price = parseInt(body.price);
  const state = body.state;

  if (isNaN(price) || price < 0) {
    return res
      .status(400)
      .send("L'ID du matériel doit être un entier positif.");
  }

  const data = {
    name: name,
    description: description,
    category: category,
    price: price,
    state: state,
  };

  const m = await createMaterial(material, data);
  return m ? true : false;
};

const removeMaterial = async (req, res) => {
  const materialId = parseInt(req.params.id);

  if (isNaN(materialId) || materialId < 0) {
    return res
      .status(400)
      .send("L'ID du matériel doit être un entier positif.");
  }

  const m = await deleteMaterial(material, materialId);
  return m ? true : false;
};

const modifyMaterial = async (req, res) => {
  const body = req.body;

  const materialId = parseInt(body.id);
  const name = body.name;
  const description = body.description;
  const category = body.category;
  const price = parseInt(body.price);
  const state = body.state;

  if (isNaN(materialId) || (materialId < 0 && isNaN(price)) || price < 0) {
    return res
      .status(400)
      .send("L'ID du matériel doit être un entier positif.");
  }

  const data = {
    name: name,
    description: description,
    category: category,
    price: price,
    state: state,
  };

  const m = await updateMaterial(material, materialId, data);
  return m ? true : false;
};

module.exports = {
  getMaterials,
  newMaterialGet,
  removeMaterialGet,
  modifyMaterialGet,
  newMaterial,
  removeMaterial,
  modifyMaterial,
};
