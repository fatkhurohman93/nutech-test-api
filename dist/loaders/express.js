"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _appError = require("../utils/appError");

var _database = _interopRequireDefault(require("./database"));

var _index = _interopRequireDefault(require("../api/index"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _path = _interopRequireDefault(require("path"));

var _whitelist = require("../configs/whitelist.config");

var _index2 = require("../interfaces/index");

_dotenv["default"].config();

var _default = function _default(_ref) {
  var app = _ref.app;
  app.use(_index2.ROUTES.rootPath, _express["default"]["static"](_path["default"].join(__dirname, _index2.ROUTES["public"])));
  app.get(_index2.ROUTES.rootPath, function (req, res) {
    res.status(200).send('Nutech Test 2023');
  });
  app.enable('trust proxy');
  /**
   * Cors
   */

  app.use((0, _cors["default"])({
    origin: function origin(_origin, callback) {
      if (!_origin) {
        return callback(null, true);
      }

      if (_whitelist.whiteList.indexOf(_origin) === -1 && _whitelist.whiteList.indexOf('*') === -1) {
        var msg = "The CORS policy for this site does not allow access from this ".concat(_origin, " specified origin");
        return callback(new _appError.BadRequest(msg), false);
      }

      return callback(null, true);
    },
    credentials: true
  }));
  /**
   * Body Parser
   */

  app.use(_express["default"].json({
    limit: '1mb'
  }));
  app.use(_express["default"].urlencoded({
    extended: true
  }));
  /**
   * Check Status
   */

  app.get(_index2.ROUTES.status, function (req, res) {
    res.status(200).send({
      message: 'OK'
    });
  });
  /**
   * Reset Database
   */

  if (process.env.ENVIRONMENT === _index2.ENVIRONMENT.development) app.get(_index2.ROUTES.clearDB, /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _database["default"].clearDatabase();

            case 2:
              res.status(200).send({
                message: 'Database reset.'
              });

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x, _x2) {
      return _ref2.apply(this, arguments);
    };
  }());
  /**
   * Load Route
   */

  app.use(_index2.ROUTES.apiPrefix, (0, _index["default"])());
  /**
   * HTTP NOT Found Handler
   */

  app.use(function (req, res, next) {
    throw new _appError.HTTPNotFound("Page you are looking ".concat(req.originalUrl, " not found"));
  });
  /**
   * Global Error Catcher
   */

  app.use(function (err, req, res, next) {
    if (err instanceof _appError.AppError) {
      return res.status(err.statusCode).json({
        status: 'Error',
        statusCode: err.statusCode,
        message: err.message,
        errors: err.error
      });
    }

    var statusCode;

    if (err.message === 'JWT expired.') {
      statusCode = 401;
    }

    return res.status(statusCode || 500).json({
      status: 'Error',
      statusCode: statusCode,
      message: err.message,
      errors: err
    });
  });
};

exports["default"] = _default;