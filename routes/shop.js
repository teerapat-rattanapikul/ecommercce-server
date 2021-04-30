const router = require("express").Router();
const ShopController = require("../controllers/shop");

router.post("/addShop", ShopController.addShop);
router.post("/getShop", ShopController.getShop);
router.post("/getShopById", ShopController.getShopbyId);

module.exports = router;
