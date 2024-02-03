// const material = require("../sequelize/sequelize");

const createMaterial = async (material, data) => {
  try {
    return await material.create(data);
  } catch (error) {
    console.log(error);
  }
};

const deleteMaterial = async (material, materialId) => {
  try {
    return await material.destroy({
      where: {
        id: materialId,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const updateMaterial = async (material, materialId, data) => {
  try {
    return await material.update(data, {
      where: {
        id: materialId,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createMaterial, deleteMaterial, updateMaterial };
