const OrderModel = require("../models/order");
const OrderLogModel = require("../models/orderLog");
const ProductModel = require("../models/product");
const UserModel = require("../models/user");
const ShopModel = require("../models/shop");
const UserShopModel = require("../models/user_shop");
const sendEmail = require("../services/mail");
const { Op } = require("sequelize");
module.exports = {
  addOrder: async (req, res) => {
    const order = await OrderModel.create({
      totalPrice: req.body.totalPrice,
      totalAmount: req.body.totalAmount,
      status: "Waiting",
      productId: req.body.productId,
      userId: req.body.userId,
      shopId: req.body.shopId,
    });
    res.json(order);
  },
  merChantGetOrder: async (req, res) => {
    try {
      if (req.id !== null) {
        const order = await OrderModel.findAll({
          include: { model: ProductModel },
          where: {
            [Op.and]: [
              { shopId: req.body.shopId },
              {
                [Op.and]: [
                  { status: { [Op.not]: "Waiting" } },
                  { status: { [Op.not]: "Paid" } },
                ],
              },
            ],
          },
        });
        res.json(order);
      } else {
        res.json({ status: false });
      }
    } catch (error) {
      throw error;
    }
  },
  getOrderbyShopId: async (req, res) => {
    try {
      if (req.id !== null) {
        const shop = await UserShopModel.findOne({
          include: {
            model: ShopModel,
            include: { model: OrderModel, include: { model: ProductModel } },
          },
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
  updateStatus: async (req, res) => {
    const order = await OrderModel.findOne({
      include: { model: UserModel, attributes: ["email"] },
      where: { id: req.body.orderId },
    });
    const staff = await UserModel.findOne({
      where: { id: req.body.staffId },
      attribute: ["name"],
    });
    await OrderModel.update(
      { status: req.body.status },
      { where: { id: req.body.orderId } }
    );
    if (order.status === "Paid" && req.body.status === "Shipping") {
      sendEmail(order.user.email);
      await ProductModel.decrement(
        { amount: order.totalAmount },
        { where: { id: order.productId } }
      );
    }

    if (order.status === "Shipping" && req.body.status === "Cancle") {
      await ProductModel.increment(
        { amount: order.totalAmount },
        { where: { id: order.productId } }
      );
    }
    await OrderLogModel.create({
      orderId: req.body.orderId,
      userId: order.userId,
      oldStatus: order.status,
      newStatus: req.body.status,
      staff: staff.name,
    });
    res.json(true);
  },
  getLogDetail: async (req, res) => {
    const orderLog = await OrderLogModel.findAll({
      include: { model: UserModel },
      where: { orderId: req.body.orderId },
      order: [["createdAt", "DESC"]],
    });
    res.json(orderLog);
  },
  testAddorder: async (req, res) => {
    sendEmail("teerapatrattanapikul@gmail.com");
    res.json(true);
  },
  getOrderinCart: async (req, res) => {
    const order = await OrderModel.findAll({
      include: { model: ProductModel, include: ShopModel },
      where: { [Op.and]: [{ userId: req.body.userId }, { status: "Waiting" }] },
      order: [["createdAt", "DESC"]],
    });
    res.json(order);
  },
  getOrderDetailById: async (req, res) => {
    const order = await OrderModel.findOne({
      include: { model: ProductModel, include: ShopModel },
      where: { id: req.body.orderId },
    });
    res.json(order);
  },
  customerLogOrder: async (req, res) => {
    const order = await OrderModel.findAll({
      include: { model: ProductModel, include: { model: ShopModel } },
      where: {
        [Op.and]: [
          { status: { [Op.not]: "Waiting" } },
          { userId: req.body.userId },
        ],
      },
      order: [["createdAt", "DESC"]],
    });
    res.json(order);
  },
};
