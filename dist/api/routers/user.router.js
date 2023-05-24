"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _user = require("../controllers/user.controller");

var _index = require("../../utils/index");

var _index2 = require("../../interfaces/index");

var _auth = require("../middlewares/jwt/auth.jwt");

var router = (0, _express.Router)();

var _default = function _default(app) {
  app.use(_index2.ROUTES.user, router);
  router.route(_index2.ROUTES_USER.findAll).post(_auth.verifyToken, _auth.isRoot, (0, _index.catchAsync)(_user.FindAll));
  router.route(_index2.ROUTES_USER.update).put(_auth.verifyToken, _auth.isUser, (0, _index.catchAsync)(_user.Update));
  router.route(_index2.ROUTES_USER.updatePassword).put(_auth.verifyToken, _auth.isUser, (0, _index.catchAsync)(_user.UpdatePassword));
  router.route(_index2.ROUTES_USER.findOne).post(_auth.verifyToken, _auth.isUser, (0, _index.catchAsync)(_user.FindOne));
  router.route(_index2.ROUTES_USER.archived).put(_auth.verifyToken, _auth.isAdmin, (0, _index.catchAsync)(_user.Archived));
  router.route(_index2.ROUTES_USER.unarchived).put(_auth.verifyToken, _auth.isAdmin, (0, _index.catchAsync)(_user.Unarchived));
  router.route(_index2.ROUTES_USER.destroy)["delete"](_auth.verifyToken, _auth.isRoot, (0, _index.catchAsync)(_user.Destroy));
};

exports["default"] = _default;