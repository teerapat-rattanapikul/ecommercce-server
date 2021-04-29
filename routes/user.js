const router = require("express").Router();
const UserController = require("../controllers/user");

router.post("/login", UserController.login);
router.post("/register", UserController.register);
router.post("/getUsertoHire", UserController.getUsertoHire);
router.post("/hireStaff", UserController.hireUser);
router.post("/log", UserController.log);

module.exports = router;
