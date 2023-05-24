"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dateLocal = void 0;

var _moment = _interopRequireDefault(require("moment"));

var dateLocal = function dateLocal(value) {
  var stateDate = value ? new Date(value) : new Date();
  var createdTime = (0, _moment["default"])(stateDate).format();
  var createdDate = (0, _moment["default"])(stateDate).format('YYYY-MM-DD');
  var lastUpdatedTime = (0, _moment["default"])(stateDate).format();
  var year = parseInt((0, _moment["default"])(stateDate).format('YYYY'));
  var month = parseInt((0, _moment["default"])(stateDate).format('MM'));
  var date = parseInt((0, _moment["default"])(stateDate).format('YYYY'));
  return {
    createdTime: createdTime,
    lastUpdatedTime: lastUpdatedTime,
    createdDate: createdDate,
    year: year,
    month: month,
    date: date
  };
};

exports.dateLocal = dateLocal;