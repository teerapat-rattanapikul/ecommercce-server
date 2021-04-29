const router = require("express").Router();
const OrderController = require("../controllers/order");

router.post("/updateStatus", OrderController.updateStatus);
router.post("/addOrder", OrderController.addOrder);
router.post("/getAll", OrderController.getAllOrder);
router.post("/logDetail", OrderController.getLogDetail);
router.get("/test", OrderController.testAddorder);
module.exports = router;
