const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const ShopModel = sequelize.define("shop", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = ShopModel;
