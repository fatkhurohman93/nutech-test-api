"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  SortingOption: true,
  SortingType: true,
  FOLDER_NAME: true
};
exports.SortingType = exports.SortingOption = exports.FOLDER_NAME = void 0;
var _users = require("./users.interface");
Object.keys(_users).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _users[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _users[key];
    }
  });
});
var _products = require("./products.interface");
Object.keys(_products).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _products[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _products[key];
    }
  });
});
var _config = require("./config");
Object.keys(_config).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _config[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _config[key];
    }
  });
});
var _routes = require("./routes");
Object.keys(_routes).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _routes[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _routes[key];
    }
  });
});
var _modelName = require("./modelName.interface");
Object.keys(_modelName).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _modelName[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _modelName[key];
    }
  });
});
var _common = require("./common.interface");
Object.keys(_common).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _common[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _common[key];
    }
  });
});
var SortingOption = /*#__PURE__*/function (SortingOption) {
  SortingOption["name"] = "name";
  SortingOption["userName"] = "userName";
  SortingOption["createdTime"] = "createdTime";
  return SortingOption;
}({});
exports.SortingOption = SortingOption;
var SortingType = /*#__PURE__*/function (SortingType) {
  SortingType["ASC"] = "asc";
  SortingType["DESC"] = "desc";
  return SortingType;
}({});
exports.SortingType = SortingType;
var FOLDER_NAME = /*#__PURE__*/function (FOLDER_NAME) {
  FOLDER_NAME["USER"] = "user";
  FOLDER_NAME["PRODUCT"] = "product";
  return FOLDER_NAME;
}({});
exports.FOLDER_NAME = FOLDER_NAME;