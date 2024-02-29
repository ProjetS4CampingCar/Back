const { reservation, material, reservationMaterial, sequelize } = require("../db/sequelize/sequelize");
const { QueryTypes } = require('sequelize');

// req.params -> /:id
// req.query -> ?key=value
//

// create
let addReservation = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        // search for already reserved material
        let sql = "SELECT R_M.id_material FROM Reservation_Material R_M\
                   JOIN Reservation R ON\
                        R.id = R_M.id_reservation\
                    WHERE\
                        R_M.id_material in(:id_materials) AND (\
                        DATEDIFF(:start, R.end) < :interval OR\
                        DATEDIFF(R.start, :end) < :interval\
                        )\
                    ";

        let ids = await sequelize.query(sql, {
            replacements: {
                id_materials : req.body.id_materials.map(Number),
                start: req.body.start,
                end: req.body.end,
                interval: 1
            },
            type: QueryTypes.SELECT
        })
        
        // exit if found already reserved material
        if (ids.length > 0) {
            throw new Error("These articles are already reserved at the time choosen : " + ids.toString());
        }

        // sum of column price of material where id is in array of ids and get the precision to 2 decimal
        let total_price = (await material.sum('price', {where: { id: {[Op.in]: req.body.id_materials }}})).toFixed(2);


        let reservationWanted = await reservation.create({
            start: req.body.start,
            end: req.body.end,
            total_price: total_price,
            id_user: req.body.id_user,
        });

        // add to Reservation_Material
        let data = req.body.id_materials.map((id) => {
            var ids = {};
            ids["id_material"] = id;
            ids["id_reservation"] = reservationWanted.id;
            return ids;
        })
        await reservationMaterial.bulkCreate(data);
        
        await t.commit();

        res.status(200).json(reservationWanted);


    } catch (err) {
        await t.rollback();
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

        let total_price = (await material.sum('price', {where: { id: {[Op.in]: req.body.id_materials }}})).toFixed(2);

        let data = {
            start: req.body.start,
            end: req.body.end,
            total_price: total_price,
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

let test = async (req, res) => {
    try {
        gt = new Date("2018-04-01T13:34:00.00");
        lt = new Date();
        gt.setDate(gt.getDate() - 1);
        // lt.setDate((new Date(req.body.end)).getDate() - 1);
        res.status(200).send(gt)
    } catch (err) {
        res.status(500).json(err);
    }
    
}

module.exports = {
    addReservation,
    getOneReservation,
    getAllReservation,
    updateReservation,
    deleteReservation,
    test
};



// gt = new Date(req.body.start);
        // lt = new Date(req.body.end);
        // gt.setDate(gt.getDate() - 1);
        // lt.setDate(lt.getDate() - 1);

        // ids = await reservationMaterial.findAll({
        //     where: {
        //         [Op.and] : {
        //             id_material : {
        //                 [Op.in] : req.body.id_materials
        //             },
        //             [Op.or] : {
        //                 end : { // "start - interval"
        //                     [Op.gt] : gt
        //                 },
        //                 start: { // "interval - end"
        //                     [Op.lt] : lt
        //                 }
        //             }
        //         }
        //     },
        //     include: {model : reservation}
        //     ,
        //     attributes: ['id_material']
        // })