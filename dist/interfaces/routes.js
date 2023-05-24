"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ROUTES_USER = exports.ROUTES_CRUD = exports.ROUTES_AUTH = exports.ROUTES = void 0;
var ROUTES = /*#__PURE__*/function (ROUTES) {
  ROUTES["apiPrefix"] = "/api";
  ROUTES["rootPath"] = "/";
  ROUTES["clearDB"] = "/clear-db";
  ROUTES["status"] = "/status";
  ROUTES["public"] = "../../public";
  ROUTES["auth"] = "/auth";
  ROUTES["user"] = "/user";
  ROUTES["product"] = "/product";
  return ROUTES;
}({});
exports.ROUTES = ROUTES;
var ROUTES_AUTH = /*#__PURE__*/function (ROUTES_AUTH) {
  ROUTES_AUTH["signUp"] = "/signup";
  ROUTES_AUTH["signIn"] = "/signin";
  return ROUTES_AUTH;
}({});
exports.ROUTES_AUTH = ROUTES_AUTH;
var ROUTES_USER = /*#__PURE__*/function (ROUTES_USER) {
  ROUTES_USER["findAll"] = "/findall";
  ROUTES_USER["findOne"] = "/findone/:userName";
  ROUTES_USER["update"] = "/update/:userName";
  ROUTES_USER["updatePassword"] = "/update-password";
  ROUTES_USER["archived"] = "/archived/:userName";
  ROUTES_USER["destroy"] = "/destroy/:userName";
  ROUTES_USER["unarchived"] = "/unarchived/:userName";
  return ROUTES_USER;
}({});
exports.ROUTES_USER = ROUTES_USER;
var ROUTES_CRUD = /*#__PURE__*/function (ROUTES_CRUD) {
  ROUTES_CRUD["create"] = "/create";
  ROUTES_CRUD["bulkCreate"] = "/bulk-create";
  ROUTES_CRUD["findAll"] = "/findall";
  ROUTES_CRUD["findOne"] = "/findone/:id";
  ROUTES_CRUD["update"] = "/update/:id";
  ROUTES_CRUD["destroy"] = "/destroy/:id";
  ROUTES_CRUD["archived"] = "/archived/:id";
  ROUTES_CRUD["unarchived"] = "/unarchived/:id";
  return ROUTES_CRUD;
}({});
exports.ROUTES_CRUD = ROUTES_CRUD;