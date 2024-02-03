const { reservation, user } = require("../db/sequelize/sequelize");
// req.params -> /:id
// req.query -> ?key=value
//

// create
// WARNING , NOT FINISH FOR AUTHENTIFICATION AND AUTHORIZATION
let addReservation = async (req, res) => {
    try {
        // should check for authentification
        let resUser = await user.findByPk(req.body.id_user);

        if (!resUser) {
            return res.status(400).json({message: "wrong id_user"});
        }

        let data = {
            start: req.body.start,
            end: req.body.end,
            total_price: parseInt(req.body.total_price),
            // should verifiy that the user is connected
            id_user: req.body.id_user
        }

        let reservationWanted = await reservation.create(data);

        res.status(200).json(reservationWanted);

    } catch (err) {

        res.status(500).json(err);

    }
}

// read one

let getOneReservation = async (req, res) => {

    let idReservation = req.params.id;

    let result = await reservation.findByPk(idReservation);

    res.status(200).json(result || []);

}

// read all
let getAllReservation = async (req, res) => {

    let page = parseInt(req.query.page) || 1;

    let pageSize = parseInt(req.query.size) || 10;

    let offset = (page - 1) * pageSize;

    let results = await reservation.findAndCountAll({
        limit: pageSize,
        offset: offset,
        order: ['id']
    })

    res.status(200).json(results);
}

// update 
// WARNING , NOT FINISH FOR AUTHENTIFICATION AND AUTHORIZATION
let updateReservation = async (req, res) => {
    try {

        let id = req.params.id;

        let data = {
            start: req.body.start,
            end: req.body.end,
            total_price: req.body.total_price,
        };

        let result = await reservation.update(data, {
            where : {
                id : id
            }
        })

        res.status(200).json(result);

    } catch (err) {

        res.status(500).json(err);

    }
}

// delete

let deleteReservation = async (req, res) => {
    try {

        let idReservation = req.params.id

        let result = await reservation.destroy({
            where: {
                id: idReservation
            }
        });

        res.status(204).end();

    } catch (err) {

        res.status(500).json(err);

    }
}

module.exports = {
    addReservation,
    getOneReservation,
    getAllReservation,
    updateReservation,
    deleteReservation
};