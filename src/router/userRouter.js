const router = require("./router");
const userController = require("../controller/userController");

router.post("/login", userController.login);
router.post("/register", userController.register);

module.exports = router;