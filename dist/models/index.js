"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sequelize = exports.models = void 0;

var _sequelize = require("sequelize");

var _users = _interopRequireDefault(require("./users.model"));

var _products = _interopRequireDefault(require("./products.model"));

var sequelize = new _sequelize.Sequelize({
  dialect: 'sqlite',
  storage: './database/database.sqlite',
  logging: false,
  dialectOptions: {
    decimalNumbers: true
  }
});
exports.sequelize = sequelize;
var models = {
  users: (0, _users["default"])(sequelize),
  products: (0, _products["default"])(sequelize)
};
exports.models = models;