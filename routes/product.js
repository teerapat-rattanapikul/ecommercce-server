const router = require("express").Router();
const ProductController = require("../controllers/product");
const ProductModel = require("../models/product");
const upload = require("../multer/config");

router.post("/merChantGetAll", ProductController.merChantGetAllProduct);
router.post("/getDetail", ProductController.getProductDetail);
router.post(
  "/addProduct",
  upload.single("productImage"),
  ProductController.addProdcut
);
router.post(
  "/updateProduct",
  upload.single("productImage"),
  ProductController.updateProduct
);
router.post("/customerGet", ProductController.customerGetproductByShopID);
router.post("/customerGetDetail", ProductController.customerGetproductDetail);
module.exports = router;
