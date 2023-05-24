"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.update = exports.findOne = exports.findAll = exports.destroy = exports.create = exports.archivedAndUnarchived = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _index = require("../models/index");
var _logger = _interopRequireDefault(require("../loaders/logger"));
var _appError = require("../utils/appError");
var _index2 = require("../utils/index");
var _index3 = require("../interfaces/index");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var and = _index.sequelize.and;
var products = _index.models.products;
var create = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(data, whoIsAccess) {
    var image, dateParameter, createdBy, result;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          if (data.name) {
            _context.next = 3;
            break;
          }
          throw new _appError.BadRequest('Wrong parameter!');
        case 3:
          _logger["default"].info("Creating ".concat(_index3.MODEL_NAME.product, "..."));
          image = data.image ? (0, _index2.base64ToImage)(data.image, data.imageName || (0, _index2.generateString)(8), _index3.FOLDER_NAME.PRODUCT) : '';
          dateParameter = (0, _index2.dateLocal)();
          createdBy = whoIsAccess || _index3.USER_ATTRIBUTES.anonymous;
          _context.next = 9;
          return products.create(_objectSpread(_objectSpread(_objectSpread({}, data), dateParameter), {}, {
            image: image,
            createdBy: createdBy,
            archived: false
          }));
        case 9:
          result = _context.sent;
          _logger["default"].info("".concat(_index3.MODEL_NAME.product, " with id: ").concat(result.toJSON().id, " has been created successfuly."));
          return _context.abrupt("return", result);
        case 14:
          _context.prev = 14;
          _context.t0 = _context["catch"](0);
          return _context.abrupt("return", (0, _index2.catchError)(_context.t0.name, _context.t0.message));
        case 17:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 14]]);
  }));
  return function create(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.create = create;
var findAll = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(params) {
    var page, size, name, archived, orderParams, _getPagination, limit, offset, orderBy, result, finalResult;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          page = params.page, size = params.size, name = params.name, archived = params.archived, orderParams = params.orderParams;
          _getPagination = (0, _index2.getPagination)(page, size), limit = _getPagination.limit, offset = _getPagination.offset;
          _logger["default"].info("Fetching ".concat(_index3.MODEL_NAME.product, "..."));
          orderBy = (0, _index2.sortingData)(orderParams);
          _context2.next = 7;
          return products.findAndCountAll({
            where: and((0, _index2.filterByName)(name), (0, _index2.filterAny)({
              archived: archived
            })),
            order: [orderBy]
          });
        case 7:
          result = _context2.sent;
          finalResult = (0, _index2.getPagingData)(result, limit, page);
          _logger["default"].info("".concat(finalResult.totalItems, " ").concat(_index3.MODEL_NAME.product, "(s) fetched."));
          return _context2.abrupt("return", {
            items: finalResult.items
          });
        case 13:
          _context2.prev = 13;
          _context2.t0 = _context2["catch"](0);
          return _context2.abrupt("return", (0, _index2.catchError)(_context2.t0.name, _context2.t0.message));
        case 16:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 13]]);
  }));
  return function findAll(_x3) {
    return _ref2.apply(this, arguments);
  };
}();
exports.findAll = findAll;
var findOne = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(id) {
    var result;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          if (id) {
            _context3.next = 3;
            break;
          }
          throw new _appError.BadRequest('Wrong id!');
        case 3:
          _logger["default"].info("Fetching ".concat(_index3.MODEL_NAME.product, " data by id: ").concat(id, "..."));
          _context3.next = 6;
          return products.findOne({
            where: {
              id: id
            }
          });
        case 6:
          result = _context3.sent;
          if (result) {
            _context3.next = 9;
            break;
          }
          throw new _appError.BadRequest("".concat(_index3.MODEL_NAME.product, " not found!"));
        case 9:
          _logger["default"].info("".concat(_index3.MODEL_NAME.product, " id: ").concat(id, " has been fetched successfully."));
          return _context3.abrupt("return", result);
        case 13:
          _context3.prev = 13;
          _context3.t0 = _context3["catch"](0);
          return _context3.abrupt("return", (0, _index2.catchError)(_context3.t0.name, _context3.t0.message));
        case 16:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 13]]);
  }));
  return function findOne(_x4) {
    return _ref3.apply(this, arguments);
  };
}();
exports.findOne = findOne;
var update = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(data, whoIsAccess, id) {
    var _dateLocal, lastUpdatedTime, lastUpdatedBy, name, sellPrice, buyPrice, quantity, image, result;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          if (id) {
            _context4.next = 3;
            break;
          }
          throw new _appError.BadRequest('Wrong id!');
        case 3:
          _dateLocal = (0, _index2.dateLocal)(), lastUpdatedTime = _dateLocal.lastUpdatedTime;
          lastUpdatedBy = whoIsAccess || _index3.USER_ATTRIBUTES.anonymous;
          _logger["default"].info("Updating ".concat(_index3.MODEL_NAME.product, " data by id: ").concat(id, "..."));
          name = data.name, sellPrice = data.sellPrice, buyPrice = data.buyPrice, quantity = data.quantity;
          image = data.image ? (0, _index2.base64ToImage)(data.image, data.imageName || (0, _index2.generateString)(8), _index3.FOLDER_NAME.PRODUCT) : '';
          _context4.next = 10;
          return products.update({
            name: name,
            sellPrice: sellPrice,
            buyPrice: buyPrice,
            quantity: quantity,
            image: image ? image : undefined,
            lastUpdatedBy: lastUpdatedBy,
            lastUpdatedTime: lastUpdatedTime
          }, {
            where: {
              id: id
            }
          });
        case 10:
          result = _context4.sent;
          if (result[0]) {
            _context4.next = 13;
            break;
          }
          throw new _appError.BadRequest('No data has been updated!');
        case 13:
          _logger["default"].info("".concat(result[0], " data ").concat(result[0] > 1 ? 'has' : 'have', " been updated successfully."));
          return _context4.abrupt("return", "".concat(result[0], " data ").concat(result[0] > 1 ? 'has' : 'have', " been updated successfully."));
        case 17:
          _context4.prev = 17;
          _context4.t0 = _context4["catch"](0);
          return _context4.abrupt("return", (0, _index2.catchError)(_context4.t0.name, _context4.t0.message));
        case 20:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 17]]);
  }));
  return function update(_x5, _x6, _x7) {
    return _ref4.apply(this, arguments);
  };
}();
exports.update = update;
var archivedAndUnarchived = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(whoIsAccess, id, status) {
    var _dateLocal2, lastUpdatedTime, lastUpdatedBy, result, ARCHIVED_SUCCESS, UNARCHIVED_SUCCESS;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _dateLocal2 = (0, _index2.dateLocal)(), lastUpdatedTime = _dateLocal2.lastUpdatedTime;
          lastUpdatedBy = whoIsAccess || _index3.USER_ATTRIBUTES.anonymous;
          _logger["default"].info(_index3.ARCHIVING_STATUS.archived ? "Archiving ".concat(_index3.MODEL_NAME.product, ". id: ").concat(id) : "Unarchiving ".concat(_index3.MODEL_NAME.product, ". id: ").concat(id));
          _context5.next = 6;
          return products.update({
            archived: status === _index3.ARCHIVING_STATUS.archived,
            lastUpdatedTime: lastUpdatedTime,
            lastUpdatedBy: lastUpdatedBy
          }, {
            where: {
              id: id
            }
          });
        case 6:
          result = _context5.sent;
          if (result[0]) {
            _context5.next = 11;
            break;
          }
          if (!(status === _index3.ARCHIVING_STATUS.archived)) {
            _context5.next = 10;
            break;
          }
          throw new _appError.BadRequest('Failed to archived!');
        case 10:
          throw new _appError.BadRequest('Failed to unarchived!');
        case 11:
          ARCHIVED_SUCCESS = "".concat(_index3.MODEL_NAME.product, " with id: ").concat(id, " has been archived successfully");
          UNARCHIVED_SUCCESS = "".concat(_index3.MODEL_NAME.product, " with id: ").concat(id, " has been unarchived successfully");
          if (!(status === _index3.ARCHIVING_STATUS.archived)) {
            _context5.next = 18;
            break;
          }
          _logger["default"].info(ARCHIVED_SUCCESS);
          return _context5.abrupt("return", ARCHIVED_SUCCESS);
        case 18:
          _logger["default"].info(UNARCHIVED_SUCCESS);
          return _context5.abrupt("return", UNARCHIVED_SUCCESS);
        case 20:
          _context5.next = 25;
          break;
        case 22:
          _context5.prev = 22;
          _context5.t0 = _context5["catch"](0);
          return _context5.abrupt("return", (0, _index2.catchError)(_context5.t0.name, _context5.t0.message));
        case 25:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 22]]);
  }));
  return function archivedAndUnarchived(_x8, _x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
exports.archivedAndUnarchived = archivedAndUnarchived;
var destroy = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(id) {
    var result;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          if (id) {
            _context6.next = 3;
            break;
          }
          throw new _appError.BadRequest('Wrong id!');
        case 3:
          _logger["default"].info("Deleting ".concat(_index3.MODEL_NAME.product, " by id: ").concat(id, "..."));
          _context6.next = 6;
          return products.destroy({
            where: {
              id: id
            }
          });
        case 6:
          result = _context6.sent;
          if (result) {
            _context6.next = 9;
            break;
          }
          throw new _appError.BadRequest('No data has been deleted!');
        case 9:
          _logger["default"].info("".concat(result, " data ").concat(result > 1 ? 'has' : 'have', " been deleted successfully."));
          return _context6.abrupt("return", result);
        case 13:
          _context6.prev = 13;
          _context6.t0 = _context6["catch"](0);
          return _context6.abrupt("return", (0, _index2.catchError)(_context6.t0.name, _context6.t0.message));
        case 16:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 13]]);
  }));
  return function destroy(_x11) {
    return _ref6.apply(this, arguments);
  };
}();
exports.destroy = destroy;