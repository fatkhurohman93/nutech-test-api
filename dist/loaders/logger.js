"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _winston = _interopRequireDefault(require("winston"));
var _dotenv = _interopRequireDefault(require("dotenv"));
_dotenv["default"].config();
var colorsLogger = {
  error: 'white redBG',
  warn: 'black yellowBG',
  info: 'yellow blueBG',
  debug: 'black whiteBG'
};
_winston["default"].addColors(colorsLogger);
var alignColorsAndTime = _winston["default"].format.combine(_winston["default"].format.colorize({
  level: true
}), _winston["default"].format.printf(function (info) {
  return "[ ".concat(info.level, " ] : ").concat(info.message);
}));
var logger = _winston["default"].createLogger({
  transports: [new _winston["default"].transports.File({
    filename: 'combined.log'
  })]
});
if (process.env.ENVIRONMENT !== 'PROD') {
  logger.add(new _winston["default"].transports.Console({
    format: _winston["default"].format.combine(alignColorsAndTime)
  }));
}
var _default = logger;
exports["default"] = _default;