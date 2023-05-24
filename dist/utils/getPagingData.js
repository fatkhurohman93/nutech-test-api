"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPagingData = void 0;
var getPagingData = function getPagingData(data, limit, page) {
  var totalItems = data.count,
    items = data.rows;
  var currentPage = page ? +page : 0;
  var totalPages = Math.ceil(totalItems / limit);
  return {
    totalItems: totalItems,
    items: items,
    totalPages: totalPages,
    currentPage: currentPage
  };
};
exports.getPagingData = getPagingData;