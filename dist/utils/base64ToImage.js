"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.base64ToImage = void 0;
var _fs = _interopRequireDefault(require("fs"));
var _logger = _interopRequireDefault(require("../loaders/logger"));
var _appError = require("./appError");
var base64ToImage = function base64ToImage(data, name, folderName) {
  try {
    _logger["default"].info('Saving image...');
    var time = new Date().getTime();
    var fileName = "".concat(name, "-").concat(time, ".png");
    var processData = data.split(',')[1];
    _fs["default"].writeFileSync("public/images/".concat(folderName, "/").concat(fileName), processData, 'base64');
    _logger["default"].info('Image saved successfully');
    return fileName;
  } catch (err) {
    _logger["default"].error("Failed to save image. ".concat(err.name, ": ").concat(err.message));
    throw new _appError.ServerError('Failed to save image.');
  }
};
exports.base64ToImage = base64ToImage;