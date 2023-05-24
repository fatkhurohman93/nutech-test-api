"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateString = void 0;
var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

var generateString = function generateString(length) {
  var result = '';
  var charactersLength = characters.length;

  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};

exports.generateString = generateString;