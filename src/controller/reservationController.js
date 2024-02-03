const { reservation } = require("../db/sequelize/sequelize");

// req.params -> /:id
// req.query -> ?key=value
//

// create

let addReservation = async (req, res) => {
    try {
        console.log(req.body.id_user);
        // let data = {
        //     start: req.body.start,
        //     end: req.body.end,
        //     total_price: req.total_price,
        //     // should verifiy that the user is connected
        //     id_user: req.body.id_user
        // }
        // console.log(data);
        //let reservationWanted = await reservation.create(data);
        res.status(200).json({});
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}

// read one

let getOneReservation = async (req, res) => {
    let idReservation = req.params.id;

    let result = await reservation.findByPk(idReservation);

    res.status(200).json(result instanceof reservation || []);
}

// read all
let getAllReservation = async (req, res) => {
    let page = req.query.page || 1;
    let pageSize = req.query.size || 10;

    let offset = (page - 1) * pageSize;

    let results = await reservation.findAndCountAll({
        limit: pageSize,
        offset: offset,
        order: ['id']
    })

    res.status(200).json(results);
}

// update 

let upadteReservation = async (req, res) => {
    try {
        let id = req.params.id;
        let data = req.body;

        await reservation.update(data, {
            where : {
                id : id
            }
        })

        res.status(204);

    } catch (err) {
        res.status(500).json(err);
    }
}

// delete

module.exports = {
    addReservation,
    getOneReservation,
    getAllReservation,
    upadteReservation
};