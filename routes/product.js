const router = require("express").Router();
const ProductController = require("../controllers/product");
const upload = require("../multer/config");
const verifyJWT = require("../middlewares/verifyJWT");

router.post(
  "/merChantGetAll",
  verifyJWT(),
  ProductController.merChantGetAllProduct
);
router.post("/getDetail", verifyJWT(), ProductController.getProductDetail);
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
