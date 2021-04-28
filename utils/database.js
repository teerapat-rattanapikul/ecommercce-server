const Sequelize = require("sequelize");
const sequelize = new Sequelize("ecommerce_database", "root", "29092541", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
