const OrderModel = require("../models/order");
const OrderLogModel = require("../models/orderLog");
const ProductModel = require("../models/product");
const UserModel = require("../models/user");
const { Op } = require("sequelize");
module.exports = {
  addOrder: async (req, res) => {
    const order = await OrderModel.create({
      totalPrice: req.body.totalPrice,
      totalAmount: req.body.totalAmount,
      status: "Paid",
      productId: req.body.productId,
      userId: req.body.userId,
      shopId: req.body.shopId,
    });

    res.json(order);
  },
  getAllOrder: async (req, res) => {
    try {
      console.log(req.body);
      const order = await OrderModel.findAll({
        include: { model: ProductModel },
        where: { shopId: req.body.shopId },
      });
      res.json(order);
      // res.json(true);
    } catch (error) {
      throw error;
    }
  },
  updateStatus: async (req, res) => {
    const order = await OrderModel.findOne({ where: { id: req.body.orderId } });
    await OrderModel.update(
      { status: req.body.status },
      { where: { id: req.body.orderId } }
    );
    await OrderLogModel.create({
      orderId: req.body.orderId,
      userId: order.userId,
      oldStatus: order.status,
      newStatus: req.body.status,
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
    const order = await OrderModel.create({
      totalPrice: 249000.0,
      totalAmount: 10,
      status: "Paid",
      productId: 1,
      userId: 3,
      shopId: 1,
    });
    res.json(order);
  },
};
