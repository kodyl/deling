"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

// Deep assign
exports.assign = assign;
Object.defineProperty(exports, "__esModule", {
  value: true
});

var fs = _interopRequire(require("fs"));

var exists = fs.existsSync;

exports.exists = exists;
function isObject(obj) {
  return typeof obj === "object" && !Array.isArray(obj);
}
function assign(target, source) {
  if (isObject(target) && isObject(source)) {
    Object.keys(source).reduce(function (target, key) {
      if (!target.hasOwnProperty(key)) {
        target[key] = source[key];
      } else {
        target[key] = isObject(source[key]) ? assign(target[key], source[key]) : source[key];
      }
      return target;
    }, target);
  }

  return target;
}
