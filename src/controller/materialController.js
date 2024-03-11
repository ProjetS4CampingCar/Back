const fs = require('fs')
const { material, sequelize } = require("../db/sequelize/sequelize");
const {
  createMaterial,
  deleteMaterial,
  updateMaterial,
} = require("../db/crud/materialCrud");

const getMaterials = async (req) => {
  const res = await material.findAll();
  return res;
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
  const old_path = req.file.path
  const name = body.name;
  const description = body.description;
  const category = body.category;
  const price = parseInt(body.price);
  const state = body.state;

  if (isNaN(price) || price < 0) {
    return res
      .status(400)
      .send('Le prix doit être positif')
  }

  const data = {
    name: name,
    description: description,
    category: category,
    price: price,
    state: state,
  };

  console.log(req.body)
  const m = await createMaterial(material, data);
  const newpath = "./src/pictures/materials/" + m.id + ".jpeg"
  console.log(old_path, newpath);
  await fs.rename(old_path, newpath, (e) => {
    if (e) throw e;
    console.log("File rename");
  });
  return m;
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
