const { reservation, material, reservationMaterial, sequelize } = require("../db/sequelize/sequelize");
const { QueryTypes, Op } = require('sequelize');

// req.params -> /:id
// req.query -> ?key=value
//

let validateMaterialsToReserve = async (id_material, date_start, date_end) => {
    let sql = "SELECT DISTINCT R_M.id_material FROM Reservation_Material R_M\
                JOIN Reservation R ON\
                    R.id = R_M.id_reservation\
                WHERE\
                    R_M.id_material in(:id_materials) AND (\
                    DATEDIFF(:start, R.end) < :interval AND\
                    DATEDIFF(R.start, :end) < :interval\
                    )\
                ";

    let ids = await sequelize.query(sql, {
        replacements: {
            id_materials: id_material,
            start: date_start,
            end: date_end,
            interval: 1
        },
        type: QueryTypes.SELECT
    })
    // exit if found already reserved material
    if (ids.length > 0) {
        console.log(ids);
        throw new Error("These (by id) articles are already reserved at the time choosen :" + ids.reduce((acc, el) => { return acc + " " + el.id_material.toString() }, ""));
    }


}

// create
let addReservation = async (req, res) => {
    const t = await sequelize.transaction();
    try {

        // validate dates
        let toValidate = await reservation.build({
            start: req.body.start,
            end: req.body.end,
            total_price: 0,
        })
        await toValidate.validate();

        await validateMaterialsToReserve(req.body.id_materials.map(Number), req.body.start, req.body.end);
        // sum of column price of material where id is in array of ids and get the precision to 2 decimal
        let total_price = (await material.sum('price', { where: { id: { [Op.in]: req.body.id_materials } } })).toFixed(2);

        let reservationWanted = await reservation.create({
            start: req.body.start,
            end: req.body.end,
            total_price: total_price,
            id_user: req.body.id_user,
        });

        let mats = await material.findAll({ where: { id: { [Op.in]: req.body.id_materials } } });

        reservationWanted.addMaterials(mats);

        await t.commit();

        res.status(200).json(reservationWanted);


    } catch (err) {
        res.status(500).json({ err: err.toString() });
        await t.rollback();

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
let updateReservation = async (req, res) => {
    try {
        let id = parseInt(req.params.id);

        let reserv = await reservation.findByPk(id);
        if (reserv == null) {
            throw new Error("this reservation does not exist");
        }

        let data = {
            start: reserv.dataValues.start,
            end: reserv.dataValues.end,
            total_price: reserv.dataValues.total_price // here to pass the validate()
        }

        if ("start" in req.body) {
            data["start"] = req.body.start;
        }
        if ("end" in req.body) {
            data["end"] = req.body.end;
        }

        // validate dates
        let toValidate = await reservation.build(data)
        await toValidate.validate();

        if ("id_materials" in req.body) {
            // find out wich material to add and wich to remove

            // array of materials
            let old = await reserv.getMaterials({ joinTableAttributes: [] });
            // array of ids
            let ids_old = old.map((element) => element.dataValues.id);

            // array of id to add
            let add = req.body.id_materials.filter((element) => !ids_old.includes(element));

            // check if these are not already reserved
            if (add.length > 0) {
                await validateMaterialsToReserve(add, data.start, data.end);
            }

            // array of materials
            add = await material.findAll({ where: { id: { [Op.in]: add } } });

            // array of materials to remove
            let del = old.filter((element) => !req.body.id_materials.includes(element.dataValues.id));

            // check price
            let price_to_add = add.reduce((accumulator, currentValue) => {
                return accumulator + currentValue.dataValues.price;
            }, 0.0);
            let price_to_remove = del.reduce((accumulator, currentValue) => {
                return accumulator + currentValue.dataValues.price;
            }, 0.0);

            let total_price = reserv.dataValues.total_price + price_to_add - price_to_remove;

            // check new price !should find another way to do that, it's duplicate with model validator
            if (total_price < 0.0 || 20000.0 < total_price) {
                throw new Error("The total price must be between 0.0 and 20000.0.");
            }
            // put the total_pricet to the data to update
            data["total_price"] = total_price;

            // add & remove 
            reserv.addMaterials(add);
            reserv.removeMaterials(del);

        }

        let result = await reservation.update(data, {
            where: {
                id: id
            }
        })

        res.status(200).json(result);

    } catch (err) {
        res.status(500).json({ err: err.toString() });
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