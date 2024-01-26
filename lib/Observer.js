"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var Observer = function Observer(obj) {
  var defaultKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'zh-CN';
  Object.keys(obj.__data__ || obj).forEach(function (key) {
    defineReactive(obj, key, defaultKey);
  });
  return obj;
};
var observe = function observe(value) {
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
        return obj.__data__[key];
      } else if (obj.__metas__[defaultKey][key]) {
        return obj.__metas__[defaultKey][key];
      }
    },
    set: function set(newVal) {
      if (obj[key] === newVal) {
        return;
      }
      obj[key] = newVal;
      var cb = obj.callback[key];
      cb.call(obj);
      childObj = observe(newVal);
    }
  });
};
var _default = exports["default"] = Observer;