const router = require("express").Router();
const OrderController = require("../controllers/order");
const verifyJWT = require("../middlewares/verifyJWT");

router.post("/updateStatus", OrderController.updateStatus);
router.post("/addOrder", OrderController.addOrder);
router.post("/merChantGetOrder", verifyJWT(), OrderController.merChantGetOrder);
router.post("/logDetail", OrderController.getLogDetail);
router.get("/test", OrderController.testAddorder);
router.post("/getByShopId", verifyJWT(), OrderController.getOrderbyShopId);
router.post("/cartOrder", OrderController.getOrderinCart);
router.post("/cartOrderDetail", OrderController.getOrderDetailById);
router.post("/customerLog", OrderController.customerLogOrder);
module.exports = router;
