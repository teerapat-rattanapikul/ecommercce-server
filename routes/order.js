const router = require("express").Router();
const OrderController = require("../controllers/order");

router.post("/updateStatus", OrderController.updateStatus);
router.post("/addOrder", OrderController.addOrder);
router.post("/getAll", OrderController.getAllOrder);

module.exports = router;
