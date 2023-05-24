"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sortingData = void 0;

var _index = require("../interfaces/index");

var sortingData = function sortingData(orderParams) {
  var orderBy = [];

  switch (orderParams === null || orderParams === void 0 ? void 0 : orderParams.orderOption) {
    case _index.SortingOption.name:
      orderBy.push(_index.SortingOption.name);
      break;

    case _index.SortingOption.userName:
      orderBy.push(_index.SortingOption.userName);
      break;

    default:
      orderBy.push(_index.SortingOption.createdTime);
  }

  switch (orderParams === null || orderParams === void 0 ? void 0 : orderParams.orderType) {
    case _index.SortingType.ASC:
      orderBy.push(_index.SortingType.ASC);
      break;

    default:
      orderBy.push(_index.SortingType.DESC);
  }

  return orderBy;
};

exports.sortingData = sortingData;