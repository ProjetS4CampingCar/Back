const router = require("./router");
const reservationController = require('../controller/reservationController');

router.get("/reservation/:id", reservationController.getOneReservation)

module.exports = router;