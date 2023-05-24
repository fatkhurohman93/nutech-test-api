"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.catchAsync = void 0;
var catchAsync = function catchAsync(fn) {
  return function (req, res, next) {
    fn(req, res, next)["catch"](function (err) {
      return next(err);
    }); // catch(next)
  };
};
exports.catchAsync = catchAsync;