"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _product = require("../controllers/product.controller");

var _index = require("../../utils/index");

var _index2 = require("../../interfaces/index");

var _auth = require("../middlewares/jwt/auth.jwt");

var router = (0, _express.Router)();

var _default = function _default(app) {
  app.use(_index2.ROUTES.product, router);
  router.route(_index2.ROUTES_CRUD.create).post(_auth.verifyToken, _auth.isAdmin, (0, _index.catchAsync)(_product.Create));
  router.route(_index2.ROUTES_CRUD.bulkCreate).post(_auth.verifyToken, _auth.isAdmin, (0, _index.catchAsync)(_product.BulkCreate));
  router.route(_index2.ROUTES_CRUD.findAll).post(_auth.verifyToken, _auth.isUser, (0, _index.catchAsync)(_product.FindAll));
  router.route(_index2.ROUTES_CRUD.findOne).post(_auth.verifyToken, _auth.isUser, (0, _index.catchAsync)(_product.FindOne));
  router.route(_index2.ROUTES_CRUD.update).put(_auth.verifyToken, _auth.isAdmin, (0, _index.catchAsync)(_product.Update));
  router.route(_index2.ROUTES_CRUD.archived).put(_auth.verifyToken, _auth.isAdmin, (0, _index.catchAsync)(_product.Archived));
  router.route(_index2.ROUTES_CRUD.unarchived).put(_auth.verifyToken, _auth.isAdmin, (0, _index.catchAsync)(_product.Unarchived));
  router.route(_index2.ROUTES_CRUD.destroy)["delete"](_auth.verifyToken, _auth.isRoot, (0, _index.catchAsync)(_product.Destroy));
};

exports["default"] = _default;