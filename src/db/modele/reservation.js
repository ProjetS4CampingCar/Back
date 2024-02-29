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
          allowNull: false,
          validate : {
            isDate: true,
            notTooSoon(value) {
              let d = new Date(value); // date to compare
              let c = new Date(); // current date
              c = c.setDate(c.getDate() + 1); // add one day
              if (d < c) {
                throw new Error("The starting date must be at least one day from today");
              }
            }
          }
        },
        end: {
          type: DataTypes.DATE,
          allowNull: false,
          validate : {
            isDate: true
          }
        },
        total_price: {
          type: DataTypes.DECIMAL(10,2),
          allowNull: false,
          validate: {
            isFloat: {
              msg: "The total price must be a float number."
            },
            min: {
              args: [0.0],
              msg : "The total price must be at least 0.0."
            },
            max: {
              args: [20000.0],
              msq: "The total price must be at maximum 20000.0."
            }
          }
        },
        payment_status: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
          allowNull: false,
          validate : {
            isBool(value) {
              if (value !== true && value !== false) {
                throw new Error("The payment status must be true or false");
              }
            }
          }
        },
        id_user: {
          type: DataTypes.INTEGER,
          model: 'User',
          key: 'id'
        }
      },
      {
        tableName: "Reservation",
        timestamps: false,
        validate: {
          endAfterStart(){
            if (this.end <= this.start){
              throw new Error("The end of the reservation cannot be before the start.")
            }
          },
          minimumReservationTime(){
            if (this.end - this.start < 24 * 60 * 60 * 1000 ){
              throw new Error("The reservation must last at least a day.");
            }
          },
          maximumReservationTime(){
            if (this.end - this.start > 31 * 24 * 60 * 60 * 1000 ){
              throw new Error("The reservation must last less that 31 days.");
            }
          },
        }
      }
    );
  };
  



  /*
  * the start of the reservation need to verify the following condition :
  *   - the soonest is X time from today
  * the end of the reservation need to verify the following condition :
  *   - after the start
  * the start and end of reservation need to verify the following condition :
  *   - minimum reservation time of X
  *   - maximum reservation time of Y
  * the total price need to verify the following condition :
  *   - minimum X
  *   - maximum Y
  * 
  */
