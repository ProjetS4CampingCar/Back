// const user = require("../sequelize/sequelize");

const createUser = async (user, data) => {
  try {
    return await user.create(data);
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (user, userId) => {
  try {
    return await user.destroy({
      where: {
        id: userId,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (user, userId, data) => {
  try {
    return await user.update(data, {
      where: {
        id: userId,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const updateUserToken = async (user, token, data) => {
  try {
    return await user.update(data, {
      where: {
        token,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const selectUserByToken = async (user, token) => {
  try {
    return await user.findOne({
      where: {
        token,
      },
      attributes: ["lastname", "name", "phone_number", "email"],
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createUser,
  deleteUser,
  updateUser,
  selectUserByToken,
  updateUserToken,
};
