"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.catchError = void 0;

var _logger = _interopRequireDefault(require("../loaders/logger"));

var _appError = require("./appError");

var catchError = function catchError(errName, errMessage) {
  _logger["default"].error("".concat(errName, ": ").concat(errMessage));

  throw new _appError.ServerError("".concat(errName, ": ").concat(errMessage));
};

exports.catchError = catchError;