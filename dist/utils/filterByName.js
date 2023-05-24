"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filterByName = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _sequelize = require("sequelize");
var filterByName = function filterByName(name) {
  var condition = name ? {
    name: (0, _defineProperty2["default"])({}, _sequelize.Op.like, "%".concat(name, "%"))
  } : {};
  return condition;
};
exports.filterByName = filterByName;