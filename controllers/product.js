const ProductModel = require("../models/product");
const ShopModel = require("../models/shop");
const UserShopModel = require("../models/user_shop");
const { Op } = require("sequelize");
const fs = require("fs");
module.exports = {
  merChantGetAllProduct: async (req, res) => {
    const validMerchant = await UserShopModel.findOne({
      where: {
        [Op.and]: [{ userId: req.body.userId }, { shopId: req.body.shopId }],
      },
    });
    if (validMerchant === null) return res.json(null);
    const productList = await ProductModel.findAll(
      {
        include: {
          model: ShopModel,
        },
        where: { shopId: req.body.shopId },
      },
      {
        attribues: ["id", "name"],
      }
    );
    res.json(productList);
  },
  customerGetproductByShopID: async (req, res) => {
    const productList = await ProductModel.findAll({
      where: { shopId: req.body.shopId, status: true },
    });
    res.json(productList);
  },
  customerGetproductDetail: async (req, res) => {
    const detail = await ProductModel.findOne({
      where: { id: req.body.productId },
    });
    res.json(detail);
  },
  getProductDetail: async (req, res) => {
    const validMerchant = await UserShopModel.findOne({
      where: {
        [Op.and]: [{ userId: req.body.userId }, { shopId: req.body.shopId }],
      },
    });
    if (validMerchant === null) return res.json(null);
    const product = await ProductModel.findOne({
      include: {
        model: ShopModel,
      },
      where: { id: req.body.productId },
    });
    res.json(product);
  },
  addProdcut: async (req, res) => {
    console.log("path", req.file);
    await ProductModel.create({
      shopId: req.body.shopId,
      name: req.body.productName,
      detail: req.body.productDetail,
      price: req.body.productPrice,
      amount: req.body.productAmount,
      image: req.file.path,
      status: false,
    });
    res.json(true);
  },
  updateProduct: async (req, res) => {
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
        status: req.body.productStatus,
      },
      { where: { id: req.body.productId } }
    );
    res.json(true);
  },
};
