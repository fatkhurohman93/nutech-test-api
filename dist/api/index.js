"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _auth = _interopRequireDefault(require("./routers/auth.router"));

var _user = _interopRequireDefault(require("./routers/user.router"));

var _product = _interopRequireDefault(require("./routers/product.router"));

var _default = function _default() {
  var app = (0, _express.Router)();
  (0, _auth["default"])(app);
  (0, _user["default"])(app);
  (0, _product["default"])(app);
  return app;
};

exports["default"] = _default;