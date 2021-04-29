const Sequelize = require("sequelize");
const sequelize = require("../utils/database");
const ShopModel = require("./shop");

const ProductModel = sequelize.define("product", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  detail: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  image: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  amount: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  status: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
});

ProductModel.belongsTo(ShopModel, { constraints: true, onDelete: "CASCADE" });
ShopModel.hasMany(ProductModel);

module.exports = ProductModel;
