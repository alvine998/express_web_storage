var DataTypes = require("sequelize").DataTypes;
var _apps = require("./apps");
var _categories = require("./categories");
var _prices = require("./prices");
var _products = require("./products");
var _stocks = require("./stocks");
var _transactions = require("./transactions");
var _users = require("./users");

function initModels(sequelize) {
  var apps = _apps(sequelize, DataTypes);
  var categories = _categories(sequelize, DataTypes);
  var prices = _prices(sequelize, DataTypes);
  var products = _products(sequelize, DataTypes);
  var stocks = _stocks(sequelize, DataTypes);
  var transactions = _transactions(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  transactions.belongsTo(prices, { as: "price", foreignKey: "price_id"});
  prices.hasMany(transactions, { as: "transactions", foreignKey: "price_id"});
  prices.belongsTo(products, { as: "product", foreignKey: "product_id"});
  products.hasMany(prices, { as: "prices", foreignKey: "product_id"});
  prices.belongsTo(products, { as: "product_name_product", foreignKey: "product_name"});
  products.hasMany(prices, { as: "product_name_prices", foreignKey: "product_name"});
  stocks.belongsTo(products, { as: "product", foreignKey: "product_id"});
  products.hasMany(stocks, { as: "stocks", foreignKey: "product_id"});
  transactions.belongsTo(stocks, { as: "stock", foreignKey: "stock_id"});
  stocks.hasMany(transactions, { as: "transactions", foreignKey: "stock_id"});

  return {
    apps,
    categories,
    prices,
    products,
    stocks,
    transactions,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
