const ProductModel = require("../models/product");
const { Op } = require("sequelize");
const fs = require("fs");
module.exports = {
  getAllListProduct: async (req, res) => {
    const productList = await ProductModel.findAll(
      { where: { shopId: req.body.shopId } },
      {
        attribues: ["id", "name"],
      }
    );
    res.json(productList);
  },
  getProductDetail: async (req, res) => {
    console.log(req.body.productId);
    const product = await ProductModel.findOne({
      where: { id: req.body.productId },
    });
    res.json(product);
  },
  addProdcut: async (req, res) => {
    await ProductModel.create({
      shopId: req.body.shopId,
      name: req.body.productName,
      detail: req.body.productDetail,
      price: req.body.productPrice,
      amount: req.body.productAmount,
      image: req.file.path,
    });
    res.json(true);
  },
  updateProduct: async (req, res) => {
    console.log(req.body.image);
    if (req.file !== undefined) {
      fs.unlinkSync(req.body.image);
      req.body.image = req.file.path;
    }
    await ProductModel.update(
      {
        name: req.body.productName,
        detail: req.body.productDetail,
        price: req.body.productPrice,
        amount: req.body.productAmount,
        image: req.body.image,
      },
      { where: { id: req.body.productId } }
    );
    res.json(true);
  },
};
