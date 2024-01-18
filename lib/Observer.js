"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _utils = require("./utils");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var Observer = function Observer(obj) {
  var defaultKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'zh-CN';
  Object.keys(obj.__data__ || obj).forEach(function (key) {
    defineReactive(obj, key, defaultKey);
  });
  return obj;
};
var observe = function observe(value) {
  // 判断是否为object类型，是就继续执行Observer
  if (!value || _typeof(value) !== 'object') {
    return;
  }
  Observer(value);
};
var defineReactive = function defineReactive(obj, key, defaultKey) {
  var childObj = observe(obj[key]);
  Object.defineProperty(obj, key, {
    get: function get() {
      if (obj.__data__[key]) {
        return (0, _utils.getProxyObj)(obj.__data__[key]);
      } else if (obj.__metas__[defaultKey][key]) {
        return (0, _utils.getProxyObj)(obj.__metas__[defaultKey][key]);
      } else {
        return (0, _utils.getDefaultProxyString)();
      }
    },
    set: function set(newVal) {
      if (obj[key] === newVal) {
        return;
      }
      // 如果值有变化的话，做一些操作
      obj[key] = newVal;
      // 执行回调
      var cb = obj.callback[key];
      cb.call(obj);
      // 如果set进来的值为复杂类型，再递归它，加上set/get
      childObj = observe(newVal);
    }
  });
};
var _default = exports["default"] = Observer;