const router = require("express").Router();
const UserController = require("../controllers/user");
const verifyJWT = require("../middlewares/verifyJWT");

router.post("/login", UserController.login);
router.post("/register", UserController.register);
router.post("/getUsertoHire", verifyJWT(), UserController.getUsertoHire);
router.post("/hireStaff", UserController.hireUser);
router.post("/unHireStaff", UserController.unHireUser);
router.post("/log", verifyJWT(), UserController.log);
router.get("/tokenCheck", verifyJWT(), UserController.tokenCheck);
router.post("/buy", UserController.customerBuyProduct);
router.post("/cancle", UserController.customerCancleProduct);

module.exports = router;
