"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.IntlFormat = void 0;
var _intlMessageformat = _interopRequireDefault(require("intl-messageformat"));
var lodashGet = _interopRequireWildcard(require("lodash.get"));
var _Observer = _interopRequireDefault(require("./Observer"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var I18N = /*#__PURE__*/function () {
  function I18N(lang, metas, defaultKey) {
    _classCallCheck(this, I18N);
    this.__lang__ = lang;
    this.__metas__ = metas;
    this.__data__ = metas[lang];
    this.__defaultKey__ = defaultKey;
  }
  _createClass(I18N, [{
    key: "setLang",
    value: function setLang(lang) {
      this.__lang__ = lang;
      this.__data__ = this.__metas__[lang];
    }
  }, {
    key: "setMetas",
    value: function setMetas(metas) {
      this.__metas__ = metas;
      this.__data__ = metas[this.__lang__];
    }
  }, {
    key: "getProp",
    value: function getProp(obj, is, value) {
      if (typeof is === 'string') {
        is = is.split('.');
      }
      if (is.length === 1 && value !== undefined) {
        return obj[is[0]] = value;
      } else if (is.length === 0) {
        return obj;
      } else {
        var prop = is.shift();
        if (value !== undefined && obj[prop] === undefined) {
          obj[prop] = {};
        }
        return this.getProp(obj[prop], is, value);
      }
    }
  }, {
    key: "template",
    value: function template(str, args) {
      var _this = this;
      if (!str) {
        return '';
      }
      return str.replace(/\{(.+?)\}/g, function (match, p1) {
        return _this.getProp(Object.assign({}, _this.__data__, args), p1);
      });
    }
  }, {
    key: "get",
    value: function get(str, args) {
      var msg = lodashGet(this.__data__, str);
      if (!msg) {
        msg = lodashGet(this.__metas__[this.__defaultKey__ || 'zh-CN'], str, str);
      }
      if (args) {
        try {
          msg = new _intlMessageformat["default"](msg, this.__lang__);
          msg = msg.format(args);
          return msg;
        } catch (err) {
          console.warn("kiwi-intl format message failed for key='".concat(str, "'"), err);
          return '';
        }
      } else {
        return msg;
      }
    }
  }]);
  return I18N;
}();
var IntlFormat = exports.IntlFormat = {
  init: function init(lang, metas, defaultKey) {
    var i18n = new I18N(lang, metas, defaultKey);
    return (0, _Observer["default"])(i18n, defaultKey);
  }
};
var _default = exports["default"] = IntlFormat;