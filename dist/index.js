"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

var _logger = _interopRequireDefault(require("./loaders/logger"));

var _index = _interopRequireDefault(require("./loaders/index"));

var _index2 = require("./utils/index");

var startServer = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var app, port, environment;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            app = (0, _express["default"])();
            port = process.env.PORT || 8080;
            environment = process.env.ENVIRONMENT;
            _context.next = 5;
            return (0, _index["default"])(app);

          case 5:
            app.listen({
              port: port
            }, function () {
              if (environment === 'DEV') _logger["default"].info("\uD83D\uDE80 Server listening at http://".concat((0, _index2.getLocalIP)() || 'localhost', ":").concat(port));else console.log("\uD83D\uDE80 Server listening at http://".concat((0, _index2.getLocalIP)() || 'localhost', ":").concat(port));
            });

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function startServer() {
    return _ref.apply(this, arguments);
  };
}();

startServer();