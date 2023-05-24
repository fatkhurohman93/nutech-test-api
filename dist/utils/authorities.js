"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setupAuthorities = void 0;
var _index = require("../interfaces/index");
var setupAuthorities = function setupAuthorities(flagRoles) {
  var data = [];
  if (flagRoles & _index.USER_ROLES.ROOT) {
    data.push(_index.USER_ROLES_NAME.ROOT);
  }
  if (flagRoles & _index.USER_ROLES.ADMIN) {
    data.push(_index.USER_ROLES_NAME.ADMIN);
  }
  if (flagRoles & _index.USER_ROLES.USER) {
    data.push(_index.USER_ROLES_NAME.USER);
  }
  return data;
};
exports.setupAuthorities = setupAuthorities;