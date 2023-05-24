"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyUser = exports.verifyToken = exports.isUser = exports.isRoot = exports.isAdmin = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _secret = _interopRequireDefault(require("../../../configs/secret.config"));

var User = _interopRequireWildcard(require("../../../services/user.service"));

var _index = require("../../../utils/index");

var _index2 = require("../../../interfaces/index");

var _logger = _interopRequireDefault(require("../../../loaders/logger"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var verifyUser = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var token;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            token = req.headers.token;

            _logger["default"].info('Verifying token...');

            if (!token) {
              next();
            } else {
              _jsonwebtoken["default"].verify(token, _secret["default"], function (err, decoded) {
                if (err) {
                  next();
                }

                if (decoded !== null && decoded !== void 0 && decoded.userName) {
                  req.headers.userName = decoded.userName;
                }

                return next();
              });
            }

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function verifyUser(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.verifyUser = verifyUser;

var verifyToken = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var token;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            token = req.headers.token;

            _logger["default"].info('Verifying token...');

            if (token) {
              _context2.next = 4;
              break;
            }

            return _context2.abrupt("return", res.status(403).send({
              message: 'No token provided.'
            }));

          case 4:
            _jsonwebtoken["default"].verify(token, _secret["default"], function (err, decoded) {
              if (err) {
                _logger["default"].error('Unauthorized!');

                return res.status(401).send({
                  message: 'Unauthorized!'
                });
              }

              if (decoded !== null && decoded !== void 0 && decoded.userName) {
                req.headers.userName = decoded.userName;
              }

              _logger["default"].info('Token verified!');

              return next();
            });

            return _context2.abrupt("return");

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function verifyToken(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

exports.verifyToken = verifyToken;

var isRoot = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    var userName;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            userName = req.headers.userName;
            _context3.next = 3;
            return checkingAuthorities(userName, _index2.USER_ROLES_NAME.ROOT, res, next);

          case 3:
            return _context3.abrupt("return");

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function isRoot(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

exports.isRoot = isRoot;

var isAdmin = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
    var userName;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            userName = req.headers.userName;
            _context4.next = 3;
            return checkingAuthorities(userName, _index2.USER_ROLES_NAME.ADMIN, res, next);

          case 3:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function isAdmin(_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();

exports.isAdmin = isAdmin;

var isUser = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res, next) {
    var userName;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            userName = req.headers.userName;
            _context5.next = 3;
            return checkingAuthorities(userName, _index2.USER_ROLES_NAME.USER, res, next);

          case 3:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function isUser(_x13, _x14, _x15) {
    return _ref5.apply(this, arguments);
  };
}();

exports.isUser = isUser;

var checkingAuthorities = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(userName, ROLE, res, next) {
    var result, authorities;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _logger["default"].info('Verifying token...');

            _context6.next = 3;
            return User.findOne(userName);

          case 3:
            result = _context6.sent;
            authorities = (0, _index.setupAuthorities)(result.toJSON().flagRoles);

            if (!authorities.includes(ROLE)) {
              _context6.next = 10;
              break;
            }

            _logger["default"].info("Authority granted as ".concat(ROLE));

            return _context6.abrupt("return", next());

          case 10:
            _logger["default"].error("Require ".concat(ROLE));

            return _context6.abrupt("return", res.status(403).send({
              message: "Require ".concat(ROLE)
            }));

          case 12:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function checkingAuthorities(_x16, _x17, _x18, _x19) {
    return _ref6.apply(this, arguments);
  };
}();