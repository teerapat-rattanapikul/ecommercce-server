const router = require("express").Router();
const UserRoute = require("./user");
const ShopRoute = require("./shop");
const ProductRoute = require("./product");
const OrderRoute = require("./order");
router.get("/", (req, res) => {
  res.json("This is api route");
});

router.use("/user", UserRoute);
router.use("/shop", ShopRoute);
router.use("/product", ProductRoute);
router.use("/order", OrderRoute);
module.exports = router;
