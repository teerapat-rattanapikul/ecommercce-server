const ShopModel = require("../models/shop");
const UserShopModel = require("../models/user_shop");
const ProductModel = require("../models/product");
const { Op } = require("sequelize");
module.exports = {
  addShop: async (req, res) => {
    try {
      // to check that user can only open 1 shop and shopname must different
      const checkNameShop = await ShopModel.findOne({
        where: { name: req.body.shopName },
      });

      const checkSameId = await UserShopModel.findOne({
        where: { [Op.and]: [{ userId: req.body.id }, { role: "admin" }] },
      });
      if (checkNameShop !== null || checkSameId !== null) {
        return res.json(false);
      }
      const createShop = await ShopModel.create({
        name: req.body.shopName,
      });
      await UserShopModel.create({
        userId: req.body.id,
        shopId: createShop.id,
        role: "admin",
      });
      res.json(true);
    } catch (error) {
      throw error;
    }
  },
  getShop: async (req, res) => {
    try {
      const shopList = await UserShopModel.findAll({
        include: { model: ShopModel, attributes: ["name"] },
        where: { userId: req.body.id },
      });
      if (shopList === null) {
        return res.json([]);
      }
      res.json(shopList);
    } catch (error) {}
  },
  getShopbyId: async (req, res) => {
    try {
      const shop = await UserShopModel.findOne({
        include: { model: ShopModel, attributes: ["name"] },
        where: {
          [Op.and]: [{ shopId: req.body.shopId }, { userId: req.body.userId }],
        },
      });
      res.json(shop);
    } catch (error) {
      throw error;
    }
  },
  getAllShop: async (req, res) => {
    try {
      const ShopList = await ShopModel.findAll();
      res.json(ShopList);
    } catch (error) {}
  },
  search: async (req, res) => {
    const shopList = await ShopModel.findAll({
      where: { name: { [Op.like]: `%${req.body.search}%` } },
    });
    const productList = await ProductModel.findAll({
      where: {
        [Op.and]: [
          { name: { [Op.like]: `%${req.body.search}%` } },
          { status: true },
        ],
      },
    });
    res.json({ shopList: shopList, productList: productList });
  },
};
