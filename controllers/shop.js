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

      if (checkNameShop !== null) {
        return res.json({
          status: false,
          errMsg: "คุณไม่สามารถใช้ชื่อร้านนี้ได้",
        });
      }
      const checkSameId = await UserShopModel.findOne({
        where: { [Op.and]: [{ userId: req.body.id }, { role: "admin" }] },
      });
      if (checkSameId !== null) {
        return res.json({
          status: false,
          errMsg: "คุณสามารถตั้งร้านได้แค่ร้านเดียวเท่านั้น",
        });
      }
      const createShop = await ShopModel.create({
        name: req.body.shopName,
      });
      await UserShopModel.create({
        userId: req.body.id,
        shopId: createShop.id,
        role: "admin",
      });
      res.json({ status: true });
    } catch (error) {
      throw error;
    }
  },
  getShop: async (req, res) => {
    try {
      if (req.id !== null) {
        const shopList = await UserShopModel.findAll({
          include: { model: ShopModel, attributes: ["name"] },
          where: { userId: req.id },
          order: [["role", "ASC"]],
        });
        if (shopList === null) {
          return res.json([]);
        }
        res.json(shopList);
      } else {
        res.json({ status: false });
      }
    } catch (error) {}
  },
  getShopbyId: async (req, res) => {
    try {
      if (req.id) {
        const shop = await UserShopModel.findOne({
          include: { model: ShopModel, attributes: ["name"] },
          where: {
            [Op.and]: [{ shopId: req.body.shopId }, { userId: req.id }],
          },
        });
        res.json(shop);
      } else {
        res.json({ status: false });
      }
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
