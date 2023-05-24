"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.USER_ROLES_NAME = exports.USER_ROLES = exports.USER_ATTRIBUTES = void 0;
var USER_ATTRIBUTES = /*#__PURE__*/function (USER_ATTRIBUTES) {
  USER_ATTRIBUTES["id"] = "id";
  USER_ATTRIBUTES["userName"] = "userName";
  USER_ATTRIBUTES["name"] = "name";
  USER_ATTRIBUTES["image"] = "image";
  USER_ATTRIBUTES["imageName"] = "imageName";
  USER_ATTRIBUTES["email"] = "email";
  USER_ATTRIBUTES["password"] = "password";
  USER_ATTRIBUTES["flagRoles"] = "flagRoles";
  USER_ATTRIBUTES["oldPassword"] = "oldPassword";
  USER_ATTRIBUTES["newPassword"] = "newPassword";
  USER_ATTRIBUTES["anonymous"] = "anonymous";
  return USER_ATTRIBUTES;
}({});
exports.USER_ATTRIBUTES = USER_ATTRIBUTES;
var USER_ROLES = /*#__PURE__*/function (USER_ROLES) {
  USER_ROLES[USER_ROLES["ROOT"] = 1] = "ROOT";
  USER_ROLES[USER_ROLES["ADMIN"] = 2] = "ADMIN";
  USER_ROLES[USER_ROLES["USER"] = 4] = "USER";
  return USER_ROLES;
}({});
exports.USER_ROLES = USER_ROLES;
var USER_ROLES_NAME = /*#__PURE__*/function (USER_ROLES_NAME) {
  USER_ROLES_NAME["ROOT"] = "ROLE_ROOT";
  USER_ROLES_NAME["ADMIN"] = "ROLE_ADMIN";
  USER_ROLES_NAME["USER"] = "ROLE_USER";
  return USER_ROLES_NAME;
}({});
exports.USER_ROLES_NAME = USER_ROLES_NAME;