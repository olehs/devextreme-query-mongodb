"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var replaceIds = function replaceIds(item) {
  return Object.entries(item).reduce(function (r, _ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        k = _ref2[0],
        v = _ref2[1];

    return v && v.constructor.name === "ObjectID" ? _extends({}, r, _defineProperty({}, k, v.toHexString())) : r;
  }, item);
};

var createSummaryQueryExecutor = function createSummaryQueryExecutor(limit) {
  var queriesExecuted = 0;

  return function (fn) {
    return !limit || ++queriesExecuted <= limit ? fn() : Promise.resolve();
  };
};

var merge = function merge(os) {
  return Object.assign.apply(Object, [{}].concat(_toConsumableArray(os)));
};

var debug = function debug(id, f) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var output = options.output || console.log;
  var processResult = options.processResult || function (result) {
    return result;
  };
  var processArgs = options.processArgs || function (args) {
    return args;
  };
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    output("DEBUG(" + id + "): ", processArgs(args));
    var result = f.apply(undefined, args);
    output("DEBUG(" + id + "/result): ", processResult(result));
    return result;
  };
};

module.exports = { replaceIds: replaceIds, createSummaryQueryExecutor: createSummaryQueryExecutor, merge: merge, debug: debug };