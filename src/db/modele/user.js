module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      lastname: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(320),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING(72),
        allowNull: false,
      },
      phone_number: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      authorization: {
        type: DataTypes.ENUM("user", "moderator", "admin"),
        allowNull: false,
      },
      token: {
        type: DataTypes.TEXT(),
        allowNull: true,
      },
    },
    {
      tableName: "user",
      timestamps: false,
    }
  );
};
