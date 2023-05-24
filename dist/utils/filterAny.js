"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filterAny = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var filterAny = function filterAny(params) {
  var key = Object.keys(params)[0];
  if (params[key] !== undefined) return (0, _defineProperty2["default"])({}, key, params[key]);else return {};
};
exports.filterAny = filterAny;