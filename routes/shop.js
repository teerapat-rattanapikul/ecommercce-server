const router = require("express").Router();
const ShopController = require("../controllers/shop");

router.post("/addShop", ShopController.addShop);
router.post("/getShop", ShopController.getShop);

module.exports = router;
