const router = require("./router");
const reservationController = require("../controller/reservationController");
const reservation = require("../db/modele/reservation");

router.post("/reservation", reservationController.addReservation)
router.get("/reservation/test", reservationController.test)
router.get("/reservation/:id", reservationController.getOneReservation)
router.get("/reservation", reservationController.getAllReservation)
router.put("/reservation/:id", reservationController.updateReservation)
router.delete("/reservation/:id", reservationController.deleteReservation)



module.exports = router;