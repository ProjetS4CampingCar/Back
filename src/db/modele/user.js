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
          type: DataTypes.VARCHAR(50),
          allowNull: false,
        },
        lastname: {
            type: DataTypes.VARCHAR(50),
            allowNull: false,
        },
        email: {
            type: DataTypes.VARCHAR(320),
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.VARCHAR(72),
            allowNull: false
        },
        phone_number: {
            type: DataTypes.VARCHAR(50),
            allowNull: false,
            unique: true
        },
        
        authorization: {
            type: DataTypes.ENUM('user', 'moderator', 'admin'),
            allowNull: false,
        }
      },
      {
        tableName: "user",
        timestamps: false,
      }
    );
  };