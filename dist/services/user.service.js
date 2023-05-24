"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updatePassword = exports.update = exports.findOne = exports.findAll = exports.destroy = exports.checkPassword = exports.archivedAndUnarchived = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _index = require("../models/index");
var _logger = _interopRequireDefault(require("../loaders/logger"));
var _appError = require("../utils/appError");
var _index2 = require("../utils/index");
var _index3 = require("../interfaces/index");
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var and = _index.sequelize.and;
var users = _index.models.users;
var findAll = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(params) {
    var page, size, name, archived, orderParams, _getPagination, limit, offset, orderBy, result, finalResult;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          page = params.page, size = params.size, name = params.name, archived = params.archived, orderParams = params.orderParams;
          _getPagination = (0, _index2.getPagination)(page, size), limit = _getPagination.limit, offset = _getPagination.offset;
          _logger["default"].info("Fetching ".concat(_index3.MODEL_NAME.user, "..."));
          orderBy = (0, _index2.sortingData)(orderParams);
          _context.next = 7;
          return users.findAndCountAll({
            where: and((0, _index2.filterByName)(name), (0, _index2.filterAny)({
              archived: archived
            })),
            attributes: {
              exclude: [_index3.USER_ATTRIBUTES.password]
            },
            limit: limit,
            offset: offset,
            order: [orderBy]
          });
        case 7:
          result = _context.sent;
          finalResult = (0, _index2.getPagingData)(result, limit, page);
          _logger["default"].info("".concat(finalResult.totalItems, " ").concat(_index3.MODEL_NAME.user, "(s) fetched."));
          return _context.abrupt("return", finalResult);
        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](0);
          return _context.abrupt("return", (0, _index2.catchError)(_context.t0.name, _context.t0.message));
        case 16:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 13]]);
  }));
  return function findAll(_x) {
    return _ref.apply(this, arguments);
  };
}();
exports.findAll = findAll;
var findOne = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(userName) {
    var result;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          if (userName) {
            _context2.next = 3;
            break;
          }
          throw new _appError.BadRequest('Wrong userName!');
        case 3:
          _logger["default"].info("Fetching ".concat(_index3.MODEL_NAME.user, " data by id: ").concat(userName, "..."));
          _context2.next = 6;
          return users.findOne({
            where: {
              userName: userName
            },
            attributes: {
              exclude: [_index3.USER_ATTRIBUTES.password]
            }
          });
        case 6:
          result = _context2.sent;
          if (result) {
            _context2.next = 9;
            break;
          }
          throw new _appError.BadRequest("".concat(_index3.MODEL_NAME.user, " not found!"));
        case 9:
          _logger["default"].info("".concat(_index3.MODEL_NAME.user, " id: ").concat(userName, " has been fetched successfully."));
          return _context2.abrupt("return", result);
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
  return function findOne(_x2) {
    return _ref2.apply(this, arguments);
  };
}();
exports.findOne = findOne;
var update = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(data, whoIsAccess, userName) {
    var _dateLocal, lastUpdatedTime, lastUpdatedBy, name, email, flagRoles, image, result;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          if (userName) {
            _context3.next = 3;
            break;
          }
          throw new _appError.BadRequest('Wrong userName!');
        case 3:
          _dateLocal = (0, _index2.dateLocal)(), lastUpdatedTime = _dateLocal.lastUpdatedTime;
          lastUpdatedBy = whoIsAccess || _index3.USER_ATTRIBUTES.anonymous;
          _logger["default"].info("Updating ".concat(_index3.MODEL_NAME.user, " data by id: ").concat(userName, "..."));
          name = data.name, email = data.email, flagRoles = data.flagRoles;
          image = data.image ? (0, _index2.base64ToImage)(data.image, data.imageName || (0, _index2.generateString)(8), _index3.FOLDER_NAME.USER) : '';
          _context3.next = 10;
          return users.update({
            name: name,
            email: email,
            image: image,
            flagRoles: flagRoles,
            lastUpdatedBy: lastUpdatedBy,
            lastUpdatedTime: lastUpdatedTime
          }, {
            where: {
              userName: userName
            }
          });
        case 10:
          result = _context3.sent;
          if (result[0]) {
            _context3.next = 13;
            break;
          }
          throw new _appError.BadRequest('No data has been updated!');
        case 13:
          _logger["default"].info("".concat(result[0], " data ").concat(result[0] > 1 ? 'has' : 'have', " been updated successfully."));
          return _context3.abrupt("return", "".concat(result[0], " data ").concat(result[0] > 1 ? 'has' : 'have', " been updated successfully."));
        case 17:
          _context3.prev = 17;
          _context3.t0 = _context3["catch"](0);
          return _context3.abrupt("return", (0, _index2.catchError)(_context3.t0.name, _context3.t0.message));
        case 20:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 17]]);
  }));
  return function update(_x3, _x4, _x5) {
    return _ref3.apply(this, arguments);
  };
}();
exports.update = update;
var checkPassword = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(password, userName) {
    var userResult, userResultToJSON, passwordIsValid;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _logger["default"].info("Checking password for ".concat(userName, "..."));
          if (!(!userName || !password)) {
            _context4.next = 4;
            break;
          }
          throw new _appError.BadRequest('Wrong parameter!');
        case 4:
          _context4.next = 6;
          return users.findOne({
            where: {
              userName: userName
            }
          });
        case 6:
          userResult = _context4.sent;
          if (userResult) {
            _context4.next = 9;
            break;
          }
          throw new _appError.BadRequest("".concat(_index3.MODEL_NAME.user, " not found!"));
        case 9:
          userResultToJSON = userResult.toJSON();
          passwordIsValid = _bcrypt["default"].compareSync(password, userResultToJSON.password);
          return _context4.abrupt("return", {
            passwordIsValid: passwordIsValid,
            userName: userResultToJSON.userName,
            name: userResultToJSON.name,
            email: userResultToJSON.email,
            flagRoles: userResultToJSON.flagRoles
          });
        case 14:
          _context4.prev = 14;
          _context4.t0 = _context4["catch"](0);
          throw _context4.t0;
        case 17:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 14]]);
  }));
  return function checkPassword(_x6, _x7) {
    return _ref4.apply(this, arguments);
  };
}();
exports.checkPassword = checkPassword;
var updatePassword = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(oldPassword, newPassword, userName) {
    var _yield$checkPassword, passwordIsValid, password, updatePasswordResult;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          if (!(!oldPassword || !newPassword || !userName)) {
            _context5.next = 3;
            break;
          }
          throw new _appError.BadRequest('Wrong parameter!');
        case 3:
          _context5.next = 5;
          return checkPassword(oldPassword, userName);
        case 5:
          _yield$checkPassword = _context5.sent;
          passwordIsValid = _yield$checkPassword.passwordIsValid;
          if (passwordIsValid) {
            _context5.next = 9;
            break;
          }
          throw new _appError.BadRequest('Wrong password!');
        case 9:
          password = _bcrypt["default"].hashSync(newPassword, 8);
          _context5.next = 12;
          return users.update({
            password: password
          }, {
            where: {
              userName: userName
            }
          });
        case 12:
          updatePasswordResult = _context5.sent;
          if (updatePasswordResult[0]) {
            _context5.next = 15;
            break;
          }
          throw new _appError.BadRequest('Password failed to update!');
        case 15:
          return _context5.abrupt("return", 'Password has been updated successfully.');
        case 18:
          _context5.prev = 18;
          _context5.t0 = _context5["catch"](0);
          return _context5.abrupt("return", (0, _index2.catchError)(_context5.t0.name, _context5.t0.message));
        case 21:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 18]]);
  }));
  return function updatePassword(_x8, _x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
exports.updatePassword = updatePassword;
var archivedAndUnarchived = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(whoIsAccess, userName, status) {
    var _dateLocal2, lastUpdatedTime, lastUpdatedBy, result, ARCHIVED_SUCCESS, UNARCHIVED_SUCCESS;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _dateLocal2 = (0, _index2.dateLocal)(), lastUpdatedTime = _dateLocal2.lastUpdatedTime;
          lastUpdatedBy = whoIsAccess || _index3.USER_ATTRIBUTES.anonymous;
          _logger["default"].info(_index3.ARCHIVING_STATUS.archived ? "Archiving ".concat(_index3.MODEL_NAME.user, ". id: ").concat(userName) : "Unarchiving ".concat(_index3.MODEL_NAME.user, ". id: ").concat(userName));
          _context6.next = 6;
          return users.update({
            archived: status === _index3.ARCHIVING_STATUS.archived,
            lastUpdatedTime: lastUpdatedTime,
            lastUpdatedBy: lastUpdatedBy
          }, {
            where: {
              userName: userName
            }
          });
        case 6:
          result = _context6.sent;
          if (result[0]) {
            _context6.next = 11;
            break;
          }
          if (!(status === _index3.ARCHIVING_STATUS.archived)) {
            _context6.next = 10;
            break;
          }
          throw new _appError.BadRequest('Failed to archived!');
        case 10:
          throw new _appError.BadRequest('Failed to unarchived!');
        case 11:
          ARCHIVED_SUCCESS = "".concat(_index3.MODEL_NAME.user, " with id: ").concat(userName, " has been archived successfully");
          UNARCHIVED_SUCCESS = "".concat(_index3.MODEL_NAME.user, " with id: ").concat(userName, " has been unarchived successfully");
          if (!(status === _index3.ARCHIVING_STATUS.archived)) {
            _context6.next = 18;
            break;
          }
          _logger["default"].info(ARCHIVED_SUCCESS);
          return _context6.abrupt("return", ARCHIVED_SUCCESS);
        case 18:
          _logger["default"].info(UNARCHIVED_SUCCESS);
          return _context6.abrupt("return", UNARCHIVED_SUCCESS);
        case 20:
          _context6.next = 25;
          break;
        case 22:
          _context6.prev = 22;
          _context6.t0 = _context6["catch"](0);
          return _context6.abrupt("return", (0, _index2.catchError)(_context6.t0.name, _context6.t0.message));
        case 25:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 22]]);
  }));
  return function archivedAndUnarchived(_x11, _x12, _x13) {
    return _ref6.apply(this, arguments);
  };
}();
exports.archivedAndUnarchived = archivedAndUnarchived;
var destroy = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(userName) {
    var result;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          if (userName) {
            _context7.next = 3;
            break;
          }
          throw new _appError.BadRequest('Wrong userName!');
        case 3:
          _logger["default"].info("Deleting ".concat(_index3.MODEL_NAME.user, " by id: ").concat(userName, "..."));
          _context7.next = 6;
          return users.destroy({
            where: {
              userName: userName
            }
          });
        case 6:
          result = _context7.sent;
          if (result) {
            _context7.next = 9;
            break;
          }
          throw new _appError.BadRequest('No data has been deleted!');
        case 9:
          _logger["default"].info("".concat(result, " data ").concat(result > 1 ? 'has' : 'have', " been deleted successfully."));
          return _context7.abrupt("return", result);
        case 13:
          _context7.prev = 13;
          _context7.t0 = _context7["catch"](0);
          return _context7.abrupt("return", (0, _index2.catchError)(_context7.t0.name, _context7.t0.message));
        case 16:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 13]]);
  }));
  return function destroy(_x14) {
    return _ref7.apply(this, arguments);
  };
}();
exports.destroy = destroy;