const router = require("express").Router();
const UserController = require("../controllers/user");
const verifyJWT = require("../middlewares/verifyJWT");

router.post("/login", UserController.login);
router.post("/register", UserController.register);
router.post("/getUsertoHire", UserController.getUsertoHire);
router.post("/hireStaff", UserController.hireUser);
router.post("/log", UserController.log);
router.post("/tokenCheck", verifyJWT(), UserController.tokenCheck);

module.exports = router;
