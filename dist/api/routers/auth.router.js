"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _auth = require("../controllers/auth.controller");
var _index = require("../../utils/index");
var _index2 = require("../../interfaces/index");
var _auth2 = require("../middlewares/jwt/auth.jwt");
var router = (0, _express.Router)();
var _default = function _default(app) {
  app.use(_index2.ROUTES.auth, router);
  router.route(_index2.ROUTES_AUTH.signUp).post(_auth2.verifyUser, (0, _index.catchAsync)(_auth.SignUp));
  router.route(_index2.ROUTES_AUTH.signIn).post((0, _index.catchAsync)(_auth.SignIn));
};
exports["default"] = _default;