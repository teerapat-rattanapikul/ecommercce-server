const Sequelize = require("sequelize");
const sequelize = require("../utils/database");
const ShopModel = require("./shop");
const ProductModel = require("./product");
const UserModel = require("./user");

const OrderModel = sequelize.define("order", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  totalPrice: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  totalAmount: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false,
  }, //Paid, Shipping, Success, Cancel
});
OrderModel.belongsTo(ProductModel, { constraints: true, onDelete: "CASCADE" });
ProductModel.hasMany(OrderModel);
OrderModel.belongsTo(UserModel, { constraints: true, onDelete: "CASCADE" });
UserModel.hasMany(OrderModel);
OrderModel.belongsTo(ShopModel, { constraints: true, onDelete: "CASCADE" });
ShopModel.hasMany(OrderModel);

module.exports = OrderModel;
