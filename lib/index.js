"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var path = _interopRequire(require("path"));

var errors = [];

var _utils = require("./utils");

var assign = _utils.assign;
var exists = _utils.exists;

function getPackageJson(dir) {
  var pkg = path.join(dir, "package.json");
  return exists(pkg) ? require(pkg) : false;
}

function getRoot() {
  var pkgJson = false;

  if (__dirname.indexOf("node_modules") !== -1) {
    var _dir = module.id;

    while (path.basename(_dir) !== "node_modules") {
      _dir = path.dirname(_dir);
    }
    return { rootPath: path.dirname(_dir), pkgJson: pkgJson };
  }

  var dir = module;

  while (dir.parent && !pkgJson) {
    dir = dir.parent;
    pkgJson = getPackageJson(path.dirname(dir.filename));
  }
  return { rootPath: path.dirname(dir.filename), pkgJson: pkgJson };
}

function getBaseInfo() {
  var _getRoot = getRoot();

  var rootPath = _getRoot.rootPath;
  var pkgJson = _getRoot.pkgJson;

  return {
    env: process.env.NODE_ENV || "development",
    root: rootPath,
    pkgJson: pkgJson || getPackageJson(rootPath)
  };
}

function deling() {
  var _getBaseInfo = getBaseInfo();

  var env = _getBaseInfo.env;
  var root = _getBaseInfo.root;
  var pkgJson = _getBaseInfo.pkgJson;

  var config = {
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
      errors.push(err);
      return {};
    }
  }

  files.map(readFile).reduce(assign, config);

  return config;
}

var config = deling();

config.includePkgJson = function includePkgJson() {
  var key = arguments[0] === undefined ? "pkgJson" : arguments[0];

  config[key] = getBaseInfo().pkgJson;
};

config.getErrors = function getErrors() {
  return errors;
};

module.exports = config;
