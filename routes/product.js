const router = require("express").Router();
const ProductController = require("../controllers/product");
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

module.exports = router;
