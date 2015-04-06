"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _slicedToArray = function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; for (var _iterator = arr[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) { _arr.push(_step.value); if (i && _arr.length === i) break; } return _arr; } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } };

var fs = _interopRequire(require("fs"));

var path = _interopRequire(require("path"));

var exists = fs.existsSync;

function isObject(obj) {
  return typeof obj === "object" && !Array.isArray(obj);
}

// Deep assign
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

function getPackageJson(dir) {
  var pkg = path.join(dir, "package.json");
  return exists(pkg) ? require(pkg) : false;
}

function getRoot() {
  var pkgJson = false;

  if (!! ~__dirname.indexOf("node_modules")) {
    var _dir = module.id;

    while (path.basename(_dir) !== "node_modules") {
      _dir = path.dirname(_dir);
    }
    return [path.dirname(_dir), pkgJson];
  }

  var dir = module;

  while (dir.parent && !pkgJson) {
    dir = dir.parent;
    pkgJson = getPackageJson(path.dirname(dir.filename));
  }
  return [path.dirname(dir.filename), pkgJson];
}

function getBaseInfo() {
  var _getRoot = getRoot();

  var _getRoot2 = _slicedToArray(_getRoot, 2);

  var rootPath = _getRoot2[0];
  var pkgJson = _getRoot2[1];

  return [process.env.NODE_ENV || "development", rootPath, pkgJson || getPackageJson(rootPath)];
}

function deling() {
  var _getBaseInfo = getBaseInfo();

  var _getBaseInfo2 = _slicedToArray(_getBaseInfo, 3);

  var env = _getBaseInfo2[0];
  var root = _getBaseInfo2[1];
  var pkgJson = _getBaseInfo2[2];

  var config = {
    //    pkgJson,
    root: root,
    env: env,
    name: pkgJson.name || "",
    version: pkgJson.version || ""
  };

  var files = [];

  // Located in config-directory
  if (exists(path.join(root, "config"))) {
    files.push(path.join(root, "config", "default"), path.join(root, "config", env), path.join(root, "config", "local"));
  }
  // Located in root
  else {
    files.push(path.join(root, "config"), path.join(root, "config." + env), path.join(root, "config.local"));
  }

  function readFile(file) {
    try {
      return require(file);
    } catch (err) {
      return {};
    }
  }

  files.map(readFile).reduce(assign, config);

  return config;
}

module.exports = deling();
