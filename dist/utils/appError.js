"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ValidationError = exports.ServerError = exports.HTTPUnauthorized = exports.HTTPNotFound = exports.BadRequest = exports.AppError = void 0;
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _wrapNativeSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/wrapNativeSuper"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var HTTPStatusCode = /*#__PURE__*/function (HTTPStatusCode) {
  HTTPStatusCode[HTTPStatusCode["OK"] = 200] = "OK";
  HTTPStatusCode[HTTPStatusCode["BAD_REQUEST"] = 400] = "BAD_REQUEST";
  HTTPStatusCode[HTTPStatusCode["NOT_FOUND"] = 404] = "NOT_FOUND";
  HTTPStatusCode[HTTPStatusCode["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
  HTTPStatusCode[HTTPStatusCode["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
  HTTPStatusCode[HTTPStatusCode["VALIDATION_ERROR"] = 403] = "VALIDATION_ERROR";
  return HTTPStatusCode;
}(HTTPStatusCode || {});
var AppError = /*#__PURE__*/function (_Error) {
  (0, _inherits2["default"])(AppError, _Error);
  var _super = _createSuper(AppError);
  function AppError(message, statusCode, error) {
    var _this;
    (0, _classCallCheck2["default"])(this, AppError);
    _this = _super.call(this, message);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "statusCode", void 0);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "error", void 0);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "isOperational", void 0);
    Object.setPrototypeOf((0, _assertThisInitialized2["default"])(_this), (this instanceof AppError ? this.constructor : void 0).prototype);
    _this.statusCode = statusCode;
    _this.isOperational = true;
    if (error) {
      _this.error = error;
    }
    Error.captureStackTrace((0, _assertThisInitialized2["default"])(_this));
    return _this;
  }
  return (0, _createClass2["default"])(AppError);
}( /*#__PURE__*/(0, _wrapNativeSuper2["default"])(Error));
exports.AppError = AppError;
var ServerError = /*#__PURE__*/function (_AppError) {
  (0, _inherits2["default"])(ServerError, _AppError);
  var _super2 = _createSuper(ServerError);
  function ServerError(message, error) {
    (0, _classCallCheck2["default"])(this, ServerError);
    return _super2.call(this, message, HTTPStatusCode.INTERNAL_SERVER_ERROR, error);
  }
  return (0, _createClass2["default"])(ServerError);
}(AppError);
exports.ServerError = ServerError;
var HTTPNotFound = /*#__PURE__*/function (_AppError2) {
  (0, _inherits2["default"])(HTTPNotFound, _AppError2);
  var _super3 = _createSuper(HTTPNotFound);
  function HTTPNotFound(message, error) {
    (0, _classCallCheck2["default"])(this, HTTPNotFound);
    return _super3.call(this, message, HTTPStatusCode.NOT_FOUND, error);
  }
  return (0, _createClass2["default"])(HTTPNotFound);
}(AppError);
exports.HTTPNotFound = HTTPNotFound;
var BadRequest = /*#__PURE__*/function (_AppError3) {
  (0, _inherits2["default"])(BadRequest, _AppError3);
  var _super4 = _createSuper(BadRequest);
  function BadRequest(message, error) {
    (0, _classCallCheck2["default"])(this, BadRequest);
    return _super4.call(this, message, HTTPStatusCode.BAD_REQUEST, error);
  }
  return (0, _createClass2["default"])(BadRequest);
}(AppError);
exports.BadRequest = BadRequest;
var HTTPUnauthorized = /*#__PURE__*/function (_AppError4) {
  (0, _inherits2["default"])(HTTPUnauthorized, _AppError4);
  var _super5 = _createSuper(HTTPUnauthorized);
  function HTTPUnauthorized(message, error) {
    (0, _classCallCheck2["default"])(this, HTTPUnauthorized);
    return _super5.call(this, message, HTTPStatusCode.UNAUTHORIZED, error);
  }
  return (0, _createClass2["default"])(HTTPUnauthorized);
}(AppError);
exports.HTTPUnauthorized = HTTPUnauthorized;
var ValidationError = /*#__PURE__*/function (_AppError5) {
  (0, _inherits2["default"])(ValidationError, _AppError5);
  var _super6 = _createSuper(ValidationError);
  function ValidationError(message, error) {
    (0, _classCallCheck2["default"])(this, ValidationError);
    return _super6.call(this, message, HTTPStatusCode.VALIDATION_ERROR, error);
  }
  return (0, _createClass2["default"])(ValidationError);
}(AppError);
exports.ValidationError = ValidationError;