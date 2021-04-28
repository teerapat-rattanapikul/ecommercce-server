const Sequelize = require("sequelize");
const sequelize = require("../utils/database");
const UserModel = require("./user");
const ShopModel = require("./shop");

const UserShopModel = sequelize.define("userShop", {
  // user_id: {
  //   type: Sequelize.INTEGER,
  //   allowNull: false,
  // },
  // shop_id: {
  //   type: Sequelize.INTEGER,
  //   allowNull: false,
  // },
  role: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});
UserShopModel.belongsTo(UserModel, { constraints: true, onDelete: "CASCADE" });
UserModel.hasMany(UserShopModel);
UserShopModel.belongsTo(ShopModel, { constraints: true, onDelete: "CASCADE" });
ShopModel.hasMany(UserShopModel);
module.exports = UserShopModel;
