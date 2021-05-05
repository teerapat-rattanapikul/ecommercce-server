const router = require("express").Router();
const OrderController = require("../controllers/order");

router.post("/updateStatus", OrderController.updateStatus);
router.post("/addOrder", OrderController.addOrder);
router.post("/merChantGetOrder", OrderController.merChantGetOrder);
router.post("/logDetail", OrderController.getLogDetail);
router.get("/test", OrderController.testAddorder);
router.post("/getByShopId", OrderController.getOrderbyShopId);
router.post("/cartOrder", OrderController.getOrderinCart);
router.post("/cartOrderDetail", OrderController.getOrderDetailById);
router.post("/customerLog", OrderController.customerLogOrder);
module.exports = router;
