const Sequelize = require("sequelize");
const sequelize = require("../utils/database");
const OrderModel = require("./order");
const UserModel = require("./user");

const OrderLogModel = sequelize.define("orderLog", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  oldStatus: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  newStatus: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});
OrderLogModel.belongsTo(OrderModel, { constraints: true, onDelete: "CASCADE" });
OrderModel.hasMany(OrderLogModel);
OrderLogModel.belongsTo(UserModel, { constraints: true, onDelete: "CASCADE" });
UserModel.hasMany(OrderLogModel);

module.exports = OrderLogModel;
