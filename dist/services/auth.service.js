"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signUp = exports.signIn = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _index = require("../models/index");

var _logger = _interopRequireDefault(require("../loaders/logger"));

var _appError = require("../utils/appError");

var _index2 = require("../utils/index");

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _secret = _interopRequireDefault(require("../configs/secret.config"));

var _index3 = require("../interfaces/index");

var _user = require("./user.service");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var users = _index.models.users;

var signUp = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(params, userName) {
    var dateParameter, createdBy, image, result;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;

            if (!(!params.userName || !params.password || !params.email)) {
              _context.next = 3;
              break;
            }

            throw new _appError.BadRequest('Wrong parameter!');

          case 3:
            dateParameter = (0, _index2.dateLocal)();
            createdBy = userName || _index3.USER_ATTRIBUTES.anonymous;
            image = params.image ? (0, _index2.base64ToImage)(params.image, params.imageName || (0, _index2.generateString)(8), _index3.FOLDER_NAME.USER) : '';
            params.password = _bcrypt["default"].hashSync(params.password, 8);

            _logger["default"].info("Creating ".concat(_index3.MODEL_NAME.user, "..."));

            _context.next = 10;
            return users.create(_objectSpread(_objectSpread({}, params), {}, {
              image: image,
              createdBy: createdBy,
              archived: false
            }, dateParameter));

          case 10:
            result = _context.sent;

            _logger["default"].info("".concat(_index3.MODEL_NAME.user, " with id: ").concat(params.userName, " has been created successfuly."));

            return _context.abrupt("return", result);

          case 15:
            _context.prev = 15;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", (0, _index2.catchError)(_context.t0.name, _context.t0.message));

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 15]]);
  }));

  return function signUp(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.signUp = signUp;

var signIn = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(params) {
    var _yield$checkPassword, userName, email, name, flagRoles, passwordIsValid, token;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;

            if (!(!params.userName || !params.password)) {
              _context2.next = 3;
              break;
            }

            throw new _appError.BadRequest('username or password cannot be empty!');

          case 3:
            _logger["default"].info("Login Username: ".concat(params.userName, "..."));

            _context2.next = 6;
            return (0, _user.checkPassword)(params.password, params.userName);

          case 6:
            _yield$checkPassword = _context2.sent;
            userName = _yield$checkPassword.userName;
            email = _yield$checkPassword.email;
            name = _yield$checkPassword.name;
            flagRoles = _yield$checkPassword.flagRoles;
            passwordIsValid = _yield$checkPassword.passwordIsValid;
            token = _jsonwebtoken["default"].sign({
              userName: userName,
              email: email,
              name: name
            }, _secret["default"], {
              expiresIn: 86400 // 24 hours

            });

            if (passwordIsValid) {
              _context2.next = 15;
              break;
            }

            throw new _appError.BadRequest('Wrong password!');

          case 15:
            _logger["default"].info("Username: ".concat(userName, " login successfully."));

            return _context2.abrupt("return", {
              flagRoles: flagRoles,
              name: name,
              token: token
            });

          case 19:
            _context2.prev = 19;
            _context2.t0 = _context2["catch"](0);
            return _context2.abrupt("return", (0, _index2.catchError)(_context2.t0.name, _context2.t0.message));

          case 22:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 19]]);
  }));

  return function signIn(_x3) {
    return _ref2.apply(this, arguments);
  };
}();

exports.signIn = signIn;