"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getProxyObj = exports.getDefaultProxyString = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
/**
 * 对string进行属性拦截的通用方法，返回一个ProxyString
 * 对所有值为undefined的属性读取，会返回一个空的ProxyString
 * 拦截了String下的valueOf和toString方法，使得该ProxyString可以正常转换成原始值
 * @param str
 */
var getDefaultProxyString = exports.getDefaultProxyString = function getDefaultProxyString() {
  var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var emptyStr = new Proxy(new String(str), {
    get: function get(target, property) {
      if (typeof property === 'string' && ['valueOf', 'toString'].includes(property)) {
        return function () {
          return str;
        };
      }
      if (typeof property === 'string' && target[property] === undefined) {
        return getDefaultProxyString();
      }
      return target[property];
    }
  });
  return emptyStr;
};

/**
 * 对普通对象进行属性拦截，如果属性值为undefined，则会返回一个ProxyString
 * @param obj
 */
var getProxyObj = exports.getProxyObj = function getProxyObj(obj) {
  return new Proxy(obj, {
    get: function get(target, property) {
      var val = target[property];
      if (typeof property === 'string' && val === undefined) {
        return getDefaultProxyString();
      }
      if (typeof property === 'string' && _typeof(val) === 'object') {
        return getProxyObj(val);
      }
      return target[property];
    }
  });
};