module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
      "Reservation_Material",
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        }
        // id_material: {
        //     type: DataTypes.INTEGER,
        //     references: {
        //         model: material,
        //         key: 'id'
        //     }
        // },
        // id_reservation: {
        //     type: DataTypes.INTEGER,
        //     references: {
        //         model: reservation,
        //         key: 'id'
        //     }
        // }
      },
      {
        tableName: "Reservation_Material",
        timestamps: false,
      }
    );
};