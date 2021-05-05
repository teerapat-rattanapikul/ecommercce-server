const router = require("express").Router();
const ShopController = require("../controllers/shop");

router.post("/addShop", ShopController.addShop);
router.post("/getShop", ShopController.getShop);
router.post("/getShopById", ShopController.getShopbyId);
router.get("/allShop", ShopController.getAllShop);
router.post("/search", ShopController.search);
module.exports = router;
