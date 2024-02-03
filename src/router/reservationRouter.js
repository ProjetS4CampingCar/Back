const router = require("./router");
const reservationController = require("../controller/reservationController");
const reservation = require("../db/modele/reservation");

router.post("/reservation", reservationController.addReservation)
router.get("/reservation/:id", reservationController.getOneReservation)
router.get("/reservation", reservationController.getAllReservation)
router.put("/reservation/:id", reservationController.upadteReservation)


module.exports = router;