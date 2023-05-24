"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _logger = _interopRequireDefault(require("./logger"));
var _index = require("../models/index");
var getConnection = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _logger["default"].info('Begin database connection...');
          _context.next = 4;
          return _index.sequelize.sync();
        case 4:
          _context.next = 6;
          return _index.sequelize.authenticate();
        case 6:
          _logger["default"].info('Connect to database successfully');
          _context.next = 12;
          break;
        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          _logger["default"].error("\uD83D\uDD25 failed connect to database, message: ".concat(_context.t0.message));
        case 12:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 9]]);
  }));
  return function getConnection() {
    return _ref.apply(this, arguments);
  };
}();
var clearDatabase = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return _index.sequelize.sync({
            force: true
          });
        case 3:
          _logger["default"].info('Database reset.');
          _context2.next = 9;
          break;
        case 6:
          _context2.prev = 6;
          _context2.t0 = _context2["catch"](0);
          _logger["default"].error('Unable to clear the database.');
        case 9:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 6]]);
  }));
  return function clearDatabase() {
    return _ref2.apply(this, arguments);
  };
}();
var connectionManager = {
  getConnection: getConnection,
  clearDatabase: clearDatabase
};
var _default = connectionManager;
exports["default"] = _default;