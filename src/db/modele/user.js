module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
      "User",
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        lastname: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false
        },
        phone_number: {
          type: DataTypes.STRING,
          unique: true
        },
        authorization: {
          type: DataTypes.ENUM,
          values: ['user','moderator','admin'],
          allowNull: false,
        },
      },
      {
        tableName: "User",
        timestamps: false,
      }
    );
  };
  