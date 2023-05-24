"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Update = exports.Unarchived = exports.FindOne = exports.FindAll = exports.Destroy = exports.Create = exports.BulkCreate = exports.Archived = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var Product = _interopRequireWildcard(require("../../services/product.service"));
var _index = require("../../interfaces/index");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var Create = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var data, whoIsAccess, result;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          data = req.body;
          whoIsAccess = req.headers.userName;
          _context.next = 4;
          return Product.create(data, whoIsAccess);
        case 4:
          result = _context.sent;
          res.status(200).json({
            message: 'Success',
            data: result
          });
        case 6:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function Create(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
exports.Create = Create;
var BulkCreate = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    var data, whoIsAccess, result;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          data = req.body;
          whoIsAccess = req.headers.userName;
          _context3.next = 4;
          return Promise.all(data.map( /*#__PURE__*/function () {
            var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(product) {
              var response;
              return _regenerator["default"].wrap(function _callee2$(_context2) {
                while (1) switch (_context2.prev = _context2.next) {
                  case 0:
                    _context2.next = 2;
                    return Product.create(product, whoIsAccess);
                  case 2:
                    response = _context2.sent;
                    return _context2.abrupt("return", response);
                  case 4:
                  case "end":
                    return _context2.stop();
                }
              }, _callee2);
            }));
            return function (_x7) {
              return _ref3.apply(this, arguments);
            };
          }()));
        case 4:
          result = _context3.sent;
          res.status(200).json({
            message: 'Success',
            data: result
          });
        case 6:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function BulkCreate(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();
exports.BulkCreate = BulkCreate;
var FindAll = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
    var params, result;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          params = req.body;
          _context4.next = 3;
          return Product.findAll(params);
        case 3:
          result = _context4.sent;
          res.status(200).json({
            message: 'Success',
            data: result
          });
        case 5:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function FindAll(_x8, _x9, _x10) {
    return _ref4.apply(this, arguments);
  };
}();
exports.FindAll = FindAll;
var FindOne = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res, next) {
    var id, result;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          id = req.params.id;
          _context5.next = 3;
          return Product.findOne(id);
        case 3:
          result = _context5.sent;
          res.status(200).json({
            message: 'Success',
            data: result
          });
        case 5:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function FindOne(_x11, _x12, _x13) {
    return _ref5.apply(this, arguments);
  };
}();
exports.FindOne = FindOne;
var Update = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res, next) {
    var data, id, whoIsAccess, result;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          data = req.body;
          id = req.params.id;
          whoIsAccess = req.headers.userName;
          _context6.next = 5;
          return Product.update(data, whoIsAccess, id);
        case 5:
          result = _context6.sent;
          res.status(200).json({
            message: 'Success',
            data: result
          });
        case 7:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return function Update(_x14, _x15, _x16) {
    return _ref6.apply(this, arguments);
  };
}();
exports.Update = Update;
var Archived = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res, next) {
    var id, whoIsAccess, result;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          id = req.params.id;
          whoIsAccess = req.headers.userName;
          _context7.next = 4;
          return Product.archivedAndUnarchived(whoIsAccess, id, _index.ARCHIVING_STATUS.archived);
        case 4:
          result = _context7.sent;
          res.status(200).json({
            message: 'Success',
            data: result
          });
        case 6:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  }));
  return function Archived(_x17, _x18, _x19) {
    return _ref7.apply(this, arguments);
  };
}();
exports.Archived = Archived;
var Unarchived = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res, next) {
    var id, whoIsAccess, result;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          id = req.params.id;
          whoIsAccess = req.headers.userName;
          _context8.next = 4;
          return Product.archivedAndUnarchived(whoIsAccess, id, _index.ARCHIVING_STATUS.unarchived);
        case 4:
          result = _context8.sent;
          res.status(200).json({
            message: 'Success',
            data: result
          });
        case 6:
        case "end":
          return _context8.stop();
      }
    }, _callee8);
  }));
  return function Unarchived(_x20, _x21, _x22) {
    return _ref8.apply(this, arguments);
  };
}();
exports.Unarchived = Unarchived;
var Destroy = /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(req, res, next) {
    var id, result;
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          id = req.params.id;
          _context9.next = 3;
          return Product.destroy(id);
        case 3:
          result = _context9.sent;
          res.status(200).json({
            message: 'Success',
            data: "".concat(result, " data ").concat(result > 1 ? 'has' : 'have', " been deleted successfully.")
          });
        case 5:
        case "end":
          return _context9.stop();
      }
    }, _callee9);
  }));
  return function Destroy(_x23, _x24, _x25) {
    return _ref9.apply(this, arguments);
  };
}();
exports.Destroy = Destroy;