const router = require("./router");
const userController = require("../controller/userController");
const multer = require("multer");
const upload = multer();
const { verifyTokenMiddleware, verifyToken } = require("../middleware/auth");

router.post("/login", upload.none(), userController.login);
router.post("/register", upload.none(), userController.register);
router.post("/infoUser", verifyTokenMiddleware, userController.infoUser);
router.post("/verifyToken", verifyToken);
router.post("/encryptCookie", upload.none(), userController.encryptCookie);
router.post("/decryptCookie", upload.none(), userController.decryptCookie);

router.delete("/infoUser/:token", userController.removeToken);

module.exports = router;
