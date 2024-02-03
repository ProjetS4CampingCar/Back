module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
      "Reservation",
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        }, 
        start: {
          type: DataTypes.DATE,
          allowNull: false
        },
        end: {
          type: DataTypes.DATE,
          allowNull: false
        },
        total_price: {
          type: DataTypes.FLOAT(11,2),
          allowNull: false
        },
        payment_status: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
          allowNull: false
          
        },
        id_user: {
          type: DataTypes.INTEGER,
          model: 'User',
          key: 'id'
        }
      },
      {
        tableName: "Reservation",
        timestamps: false
      }
    );
  };
  