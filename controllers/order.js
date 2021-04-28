const OrderModel = require("../models/order");
const ProductModel = require("../models/product");
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
    const order = await OrderModel.findAll({
      include: { model: ProductModel },
      where: { shopId: req.body.shopId },
    });
    res.json(order);
  },
  updateStatus: async (req, res) => {
    await OrderModel.update(
      { status: req.body.status },
      { where: { id: req.body.orderId } }
    );
    res.json(true);
  },
};
