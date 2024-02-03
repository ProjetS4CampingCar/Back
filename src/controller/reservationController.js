const {reservation} = require('../db/modele/reservation');

// create

const addReservation = async (req, res) => {

}

// read one

const getOneReservation = async (req, res) => {
    res.status(200).send("ta reservation");
}

// read all

// update 

// delete

module.exports = {
    getOneReservation,
};