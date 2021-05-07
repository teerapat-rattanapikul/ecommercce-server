const router = require("express").Router();
const ShopController = require("../controllers/shop");
const verifyJWT = require("../middlewares/verifyJWT");
router.post("/addShop", ShopController.addShop);
router.get("/getShop", verifyJWT(), ShopController.getShop);
router.post("/getShopById", verifyJWT(), ShopController.getShopbyId);
router.get("/allShop", ShopController.getAllShop);
router.post("/search", ShopController.search);
module.exports = router;
