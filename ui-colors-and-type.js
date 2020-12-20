/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 51);
/******/ })
/************************************************************************/
/******/ ({

/***/ 3:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ }),

/***/ 4:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ }),

/***/ 5:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var pug_has_own_property = Object.prototype.hasOwnProperty;

/**
 * Merge two attribute objects giving precedence
 * to values in object `b`. Classes are special-cased
 * allowing for arrays and merging/joining appropriately
 * resulting in a string.
 *
 * @param {Object} a
 * @param {Object} b
 * @return {Object} a
 * @api private
 */

exports.merge = pug_merge;
function pug_merge(a, b) {
  if (arguments.length === 1) {
    var attrs = a[0];
    for (var i = 1; i < a.length; i++) {
      attrs = pug_merge(attrs, a[i]);
    }
    return attrs;
  }

  for (var key in b) {
    if (key === 'class') {
      var valA = a[key] || [];
      a[key] = (Array.isArray(valA) ? valA : [valA]).concat(b[key] || []);
    } else if (key === 'style') {
      var valA = pug_style(a[key]);
      valA = valA && valA[valA.length - 1] !== ';' ? valA + ';' : valA;
      var valB = pug_style(b[key]);
      valB = valB && valB[valB.length - 1] !== ';' ? valB + ';' : valB;
      a[key] = valA + valB;
    } else {
      a[key] = b[key];
    }
  }

  return a;
}

/**
 * Process array, object, or string as a string of classes delimited by a space.
 *
 * If `val` is an array, all members of it and its subarrays are counted as
 * classes. If `escaping` is an array, then whether or not the item in `val` is
 * escaped depends on the corresponding item in `escaping`. If `escaping` is
 * not an array, no escaping is done.
 *
 * If `val` is an object, all the keys whose value is truthy are counted as
 * classes. No escaping is done.
 *
 * If `val` is a string, it is counted as a class. No escaping is done.
 *
 * @param {(Array.<string>|Object.<string, boolean>|string)} val
 * @param {?Array.<string>} escaping
 * @return {String}
 */
exports.classes = pug_classes;
function pug_classes_array(val, escaping) {
  var classString = '',
    className,
    padding = '',
    escapeEnabled = Array.isArray(escaping);
  for (var i = 0; i < val.length; i++) {
    className = pug_classes(val[i]);
    if (!className) continue;
    escapeEnabled && escaping[i] && (className = pug_escape(className));
    classString = classString + padding + className;
    padding = ' ';
  }
  return classString;
}
function pug_classes_object(val) {
  var classString = '',
    padding = '';
  for (var key in val) {
    if (key && val[key] && pug_has_own_property.call(val, key)) {
      classString = classString + padding + key;
      padding = ' ';
    }
  }
  return classString;
}
function pug_classes(val, escaping) {
  if (Array.isArray(val)) {
    return pug_classes_array(val, escaping);
  } else if (val && typeof val === 'object') {
    return pug_classes_object(val);
  } else {
    return val || '';
  }
}

/**
 * Convert object or string to a string of CSS styles delimited by a semicolon.
 *
 * @param {(Object.<string, string>|string)} val
 * @return {String}
 */

exports.style = pug_style;
function pug_style(val) {
  if (!val) return '';
  if (typeof val === 'object') {
    var out = '';
    for (var style in val) {
      /* istanbul ignore else */
      if (pug_has_own_property.call(val, style)) {
        out = out + style + ':' + val[style] + ';';
      }
    }
    return out;
  } else {
    return val + '';
  }
}

/**
 * Render the given attribute.
 *
 * @param {String} key
 * @param {String} val
 * @param {Boolean} escaped
 * @param {Boolean} terse
 * @return {String}
 */
exports.attr = pug_attr;
function pug_attr(key, val, escaped, terse) {
  if (
    val === false ||
    val == null ||
    (!val && (key === 'class' || key === 'style'))
  ) {
    return '';
  }
  if (val === true) {
    return ' ' + (terse ? key : key + '="' + key + '"');
  }
  var type = typeof val;
  if (
    (type === 'object' || type === 'function') &&
    typeof val.toJSON === 'function'
  ) {
    val = val.toJSON();
  }
  if (typeof val !== 'string') {
    val = JSON.stringify(val);
    if (!escaped && val.indexOf('"') !== -1) {
      return ' ' + key + "='" + val.replace(/'/g, '&#39;') + "'";
    }
  }
  if (escaped) val = pug_escape(val);
  return ' ' + key + '="' + val + '"';
}

/**
 * Render the given attributes object.
 *
 * @param {Object} obj
 * @param {Object} terse whether to use HTML5 terse boolean attributes
 * @return {String}
 */
exports.attrs = pug_attrs;
function pug_attrs(obj, terse) {
  var attrs = '';

  for (var key in obj) {
    if (pug_has_own_property.call(obj, key)) {
      var val = obj[key];

      if ('class' === key) {
        val = pug_classes(val);
        attrs = pug_attr(key, val, false, terse) + attrs;
        continue;
      }
      if ('style' === key) {
        val = pug_style(val);
      }
      attrs += pug_attr(key, val, false, terse);
    }
  }

  return attrs;
}

/**
 * Escape the given string of `html`.
 *
 * @param {String} html
 * @return {String}
 * @api private
 */

var pug_match_html = /["&<>]/;
exports.escape = pug_escape;
function pug_escape(_html) {
  var html = '' + _html;
  var regexResult = pug_match_html.exec(html);
  if (!regexResult) return _html;

  var result = '';
  var i, lastIndex, escape;
  for (i = regexResult.index, lastIndex = 0; i < html.length; i++) {
    switch (html.charCodeAt(i)) {
      case 34:
        escape = '&quot;';
        break;
      case 38:
        escape = '&amp;';
        break;
      case 60:
        escape = '&lt;';
        break;
      case 62:
        escape = '&gt;';
        break;
      default:
        continue;
    }
    if (lastIndex !== i) result += html.substring(lastIndex, i);
    lastIndex = i + 1;
    result += escape;
  }
  if (lastIndex !== i) return result + html.substring(lastIndex, i);
  else return result;
}

/**
 * Re-throw the given `err` in context to the
 * the pug in `filename` at the given `lineno`.
 *
 * @param {Error} err
 * @param {String} filename
 * @param {String} lineno
 * @param {String} str original source
 * @api private
 */

exports.rethrow = pug_rethrow;
function pug_rethrow(err, filename, lineno, str) {
  if (!(err instanceof Error)) throw err;
  if ((typeof window != 'undefined' || !filename) && !str) {
    err.message += ' on line ' + lineno;
    throw err;
  }
  try {
    str = str || __webpack_require__(6).readFileSync(filename, 'utf8');
  } catch (ex) {
    pug_rethrow(err, null, lineno);
  }
  var context = 3,
    lines = str.split('\n'),
    start = Math.max(lineno - context, 0),
    end = Math.min(lines.length, lineno + context);

  // Error context
  var context = lines
    .slice(start, end)
    .map(function(line, i) {
      var curr = i + start + 1;
      return (curr == lineno ? '  > ' : '    ') + curr + '| ' + line;
    })
    .join('\n');

  // Alter exception message
  err.path = filename;
  try {
    err.message =
      (filename || 'Pug') +
      ':' +
      lineno +
      '\n' +
      context +
      '\n\n' +
      err.message;
  } catch (e) {}
  throw err;
}


/***/ }),

/***/ 51:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _sass_main_sass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _sass_main_sass__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_sass_main_sass__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _sass_ui_kit_sass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var _sass_ui_kit_sass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_sass_ui_kit_sass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _colors_and_type_sass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(57);
/* harmony import */ var _colors_and_type_sass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_colors_and_type_sass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _colors_and_type_pug__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(58);
/* harmony import */ var _colors_and_type_pug__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_colors_and_type_pug__WEBPACK_IMPORTED_MODULE_3__);





/***/ }),

/***/ 57:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ }),

/***/ 58:
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(5);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;
    var locals_for_with = (locals || {});
    
    (function (pug_indent) {
      var pug_indent = [];
pug_mixins["color"] = pug_interp = function(name, hex, className){
var block = (this && this.block), attributes = (this && this.attributes) || {};
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"color\"\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv" + (pug.attr("class", pug.classes([`color__demo ${className}`], [true]), false, true)) + "\u003E\u003C\u002Fdiv\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"color__info\"\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Ch2 class=\"color__name\"\u003E" + (pug.escape(null == (pug_interp = name) ? "" : pug_interp)) + "\u003C\u002Fh2\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"color__hex\"\u003E" + (pug.escape(null == (pug_interp = hex) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
};
pug_mixins["type"] = pug_interp = function(name, text, tag){
var block = (this && this.block), attributes = (this && this.attributes) || {};
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"type\"\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C" + (tag) + " class=\"type__name\"\u003E" + (pug.escape(null == (pug_interp = name) ? "" : pug_interp)) + "\u003C\u002F" + (tag) + "\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C" + (tag) + " class=\"type__text\"\u003E" + (null == (pug_interp = text) ? "" : pug_interp) + "\u003C\u002F" + (tag) + "\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
};

































pug_mixins["popup"] = pug_interp = function(options){
var block = (this && this.block), attributes = (this && this.attributes) || {};
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"items-popup\"\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"items-popup__items\"\u003E";
// iterate options
;(function(){
  var $$obj = options;
  if ('number' == typeof $$obj.length) {
      for (var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++) {
        var val = $$obj[pug_index0];
// iterate val
;(function(){
  var $$obj = val;
  if ('number' == typeof $$obj.length) {
      for (var pug_index1 = 0, $$l = $$obj.length; pug_index1 < $$l; pug_index1++) {
        var item = $$obj[pug_index1];
if (item.name) {
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"items-popup__item\"\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Ch3 class=\"items-popup__title\"\u003E" + (pug.escape(null == (pug_interp = item.name) ? "" : pug_interp)) + "\u003C\u002Fh3\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"items-popup__value\"\u003E\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"items-popup__change-value items-popup__remove-value\"\u003E-\u003C\u002Fdiv\u003E\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Ch3\u003E" + (pug.escape(null == (pug_interp = item.value) ? "" : pug_interp)) + "\u003C\u002Fh3\u003E\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"items-popup__change-value items-popup__add-value\"\u003E+\u003C\u002Fdiv\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
      }
  } else {
    var $$l = 0;
    for (var pug_index1 in $$obj) {
      $$l++;
      var item = $$obj[pug_index1];
if (item.name) {
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"items-popup__item\"\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Ch3 class=\"items-popup__title\"\u003E" + (pug.escape(null == (pug_interp = item.name) ? "" : pug_interp)) + "\u003C\u002Fh3\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"items-popup__value\"\u003E\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"items-popup__change-value items-popup__remove-value\"\u003E-\u003C\u002Fdiv\u003E\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Ch3\u003E" + (pug.escape(null == (pug_interp = item.value) ? "" : pug_interp)) + "\u003C\u002Fh3\u003E\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"items-popup__change-value items-popup__add-value\"\u003E+\u003C\u002Fdiv\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
    }
  }
}).call(this);

      }
  } else {
    var $$l = 0;
    for (var pug_index0 in $$obj) {
      $$l++;
      var val = $$obj[pug_index0];
// iterate val
;(function(){
  var $$obj = val;
  if ('number' == typeof $$obj.length) {
      for (var pug_index2 = 0, $$l = $$obj.length; pug_index2 < $$l; pug_index2++) {
        var item = $$obj[pug_index2];
if (item.name) {
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"items-popup__item\"\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Ch3 class=\"items-popup__title\"\u003E" + (pug.escape(null == (pug_interp = item.name) ? "" : pug_interp)) + "\u003C\u002Fh3\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"items-popup__value\"\u003E\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"items-popup__change-value items-popup__remove-value\"\u003E-\u003C\u002Fdiv\u003E\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Ch3\u003E" + (pug.escape(null == (pug_interp = item.value) ? "" : pug_interp)) + "\u003C\u002Fh3\u003E\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"items-popup__change-value items-popup__add-value\"\u003E+\u003C\u002Fdiv\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
      }
  } else {
    var $$l = 0;
    for (var pug_index2 in $$obj) {
      $$l++;
      var item = $$obj[pug_index2];
if (item.name) {
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"items-popup__item\"\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Ch3 class=\"items-popup__title\"\u003E" + (pug.escape(null == (pug_interp = item.name) ? "" : pug_interp)) + "\u003C\u002Fh3\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"items-popup__value\"\u003E\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"items-popup__change-value items-popup__remove-value\"\u003E-\u003C\u002Fdiv\u003E\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Ch3\u003E" + (pug.escape(null == (pug_interp = item.value) ? "" : pug_interp)) + "\u003C\u002Fh3\u003E\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"items-popup__change-value items-popup__add-value\"\u003E+\u003C\u002Fdiv\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
    }
  }
}).call(this);

    }
  }
}).call(this);

pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"items-popup__button-pane\"\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Ch3 class=\"items-popup__clear\"\u003EОчистить\u003C\u002Fh3\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Ch3 class=\"items-popup__confirm\"\u003EПрименить\u003C\u002Fh3\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
};





































































pug_mixins["checkbox-buttons"] = pug_interp = function(title, checkboxes, rich){
var block = (this && this.block), attributes = (this && this.attributes) || {};
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv" + (pug.attr("class", pug.classes(["checkboxes",`${rich ? 'checkboxes_rich' : ''}`], [false,true]), false, true)) + "\u003E";
if (title) {
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Ch3 class=\"checkboxes__title\"\u003E" + (pug.escape(null == (pug_interp = title) ? "" : pug_interp)) + "\u003C\u002Fh3\u003E";
}
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"checkboxes__buttons\"\u003E";
// iterate checkboxes
;(function(){
  var $$obj = checkboxes;
  if ('number' == typeof $$obj.length) {
      for (var pug_index3 = 0, $$l = $$obj.length; pug_index3 < $$l; pug_index3++) {
        var elem = $$obj[pug_index3];
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Clabel class=\"checkboxes__button checkbox-button\"\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cinput" + (" class=\"checkbox-button__input\""+" type=\"checkbox\""+pug.attr("checked", elem.checked, true, true)) + "\u003E\u003Cspan class=\"checkbox-button__name\"\u003E" + (null == (pug_interp = elem.name) ? "" : pug_interp) + "\u003C\u002Fspan\u003E";
if ((rich)) {
pug_html = pug_html + "\u003Cspan class=\"checkbox-button__description\"\u003E" + (null == (pug_interp = elem.description) ? "" : pug_interp) + "\u003C\u002Fspan\u003E";
}
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Flabel\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index3 in $$obj) {
      $$l++;
      var elem = $$obj[pug_index3];
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Clabel class=\"checkboxes__button checkbox-button\"\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cinput" + (" class=\"checkbox-button__input\""+" type=\"checkbox\""+pug.attr("checked", elem.checked, true, true)) + "\u003E\u003Cspan class=\"checkbox-button__name\"\u003E" + (null == (pug_interp = elem.name) ? "" : pug_interp) + "\u003C\u002Fspan\u003E";
if ((rich)) {
pug_html = pug_html + "\u003Cspan class=\"checkbox-button__description\"\u003E" + (null == (pug_interp = elem.description) ? "" : pug_interp) + "\u003C\u002Fspan\u003E";
}
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Flabel\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
};
















































































pug_mixins["like-button"] = pug_interp = function(likesNum, active){
var block = (this && this.block), attributes = (this && this.attributes) || {};
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv" + (pug.attr("class", pug.classes(["like-button","js-like-button",`${active ? 'like-button_active' : ''}`], [false,false,true]), false, true)) + "\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"like-button__heart material-icons\"\u003E\u003C\u002Fdiv\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"like-button__like-num\"\u003E" + (pug.escape(null == (pug_interp = likesNum) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
};






















































pug_mixins["checkbox-buttons"] = pug_interp = function(title, checkboxes, rich){
var block = (this && this.block), attributes = (this && this.attributes) || {};
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv" + (pug.attr("class", pug.classes(["checkboxes",`${rich ? 'checkboxes_rich' : ''}`], [false,true]), false, true)) + "\u003E";
if (title) {
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Ch3 class=\"checkboxes__title\"\u003E" + (pug.escape(null == (pug_interp = title) ? "" : pug_interp)) + "\u003C\u002Fh3\u003E";
}
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"checkboxes__buttons\"\u003E";
// iterate checkboxes
;(function(){
  var $$obj = checkboxes;
  if ('number' == typeof $$obj.length) {
      for (var pug_index6 = 0, $$l = $$obj.length; pug_index6 < $$l; pug_index6++) {
        var elem = $$obj[pug_index6];
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Clabel class=\"checkboxes__button checkbox-button\"\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cinput" + (" class=\"checkbox-button__input\""+" type=\"checkbox\""+pug.attr("checked", elem.checked, true, true)) + "\u003E\u003Cspan class=\"checkbox-button__name\"\u003E" + (null == (pug_interp = elem.name) ? "" : pug_interp) + "\u003C\u002Fspan\u003E";
if ((rich)) {
pug_html = pug_html + "\u003Cspan class=\"checkbox-button__description\"\u003E" + (null == (pug_interp = elem.description) ? "" : pug_interp) + "\u003C\u002Fspan\u003E";
}
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Flabel\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index6 in $$obj) {
      $$l++;
      var elem = $$obj[pug_index6];
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Clabel class=\"checkboxes__button checkbox-button\"\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cinput" + (" class=\"checkbox-button__input\""+" type=\"checkbox\""+pug.attr("checked", elem.checked, true, true)) + "\u003E\u003Cspan class=\"checkbox-button__name\"\u003E" + (null == (pug_interp = elem.name) ? "" : pug_interp) + "\u003C\u002Fspan\u003E";
if ((rich)) {
pug_html = pug_html + "\u003Cspan class=\"checkbox-button__description\"\u003E" + (null == (pug_interp = elem.description) ? "" : pug_interp) + "\u003C\u002Fspan\u003E";
}
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Flabel\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
};

































































































pug_mixins["like-button"] = pug_interp = function(likesNum, active){
var block = (this && this.block), attributes = (this && this.attributes) || {};
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv" + (pug.attr("class", pug.classes(["like-button","js-like-button",`${active ? 'like-button_active' : ''}`], [false,false,true]), false, true)) + "\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"like-button__heart material-icons\"\u003E\u003C\u002Fdiv\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"like-button__like-num\"\u003E" + (pug.escape(null == (pug_interp = likesNum) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
};
































let name = 'colors-and-type'
pug_html = pug_html + "\u003C!DOCTYPE html\u003E\n\u003Chtml lang=\"ru\"\u003E\n  \u003Chead\u003E\n    \u003Cmeta charset=\"utf-8\"\u003E\n    \u003Cmeta name=\"viewport\" content=\"initial-scale=1.0, width=device-width\"\u003E\n    \u003Clink rel=\"shortcut icon\" href=\"images\u002Flogo-icon.svg\"\u003E\n    \u003Clink" + (" rel=\"stylesheet\" type=\"text\u002Fcss\""+pug.attr("href", "ui-"+name+".css", true, true)) + "\u003E\n    \u003Ctitle\u003E" + (pug.escape(null == (pug_interp = name) ? "" : pug_interp)) + "\u003C\u002Ftitle\u003E\n  \u003C\u002Fhead\u003E\n  \u003Cbody\u003E\n    \u003Cdiv class=\"ui-logo-container\"\u003E\u003Cimg class=\"ui-logo-container__logo\" src=\"images\u002Flogo-icon.svg\" alt=\"logo\"\u003E\u003C\u002Fdiv\u003E\n    \u003Cdiv class=\"container\"\u003E\n      \u003Cdiv class=\"colors-and-type\"\u003E\n        \u003Cdiv class=\"colors\"\u003E";
pug_indent.push('          ');
pug_mixins["color"]("Dark Shade 100%", "#1F2041", "color__demo_dark-shade-100");
pug_indent.pop();
pug_indent.push('          ');
pug_mixins["color"]("Dark Shade 75%", "#1F2041", "color__demo_dark-shade-75");
pug_indent.pop();
pug_indent.push('          ');
pug_mixins["color"]("Dark Shade 50%", "#1F2041", "color__demo_dark-shade-50");
pug_indent.pop();
pug_indent.push('          ');
pug_mixins["color"]("Dark Shade 25%", "#1F2041", "color__demo_dark-shade-25");
pug_indent.pop();
pug_indent.push('          ');
pug_mixins["color"]("Dark Shade 5%", "#1F2041", "color__demo_dark-shade-5");
pug_indent.pop();
pug_indent.push('          ');
pug_mixins["color"]("Purple", "#BC9CFF", "color__demo_purple");
pug_indent.pop();
pug_indent.push('          ');
pug_mixins["color"]("Green", "#6FCF97", "color__demo_green");
pug_indent.pop();
pug_html = pug_html + "\n        \u003C\u002Fdiv\u003E\n        \u003Cdiv class=\"types\"\u003E";
pug_indent.push('          ');
pug_mixins["type"]("H1",
                    "This one is the sub-section or widget title",
                    "h1");
pug_indent.pop();
pug_indent.push('          ');
pug_mixins["type"]("H2",
                    "Next one is the item title inside widgets",
                    "h2");
pug_indent.pop();
pug_indent.push('          ');
pug_mixins["type"]("H3",
                    "This is a label or CTA text",
                    "h3");
pug_indent.pop();
pug_indent.push('          ');
pug_mixins["type"]("Body",
                    "This is the body text which is used for most<br>of the design, like paragraphs, lists, etc.",
                    "p");
pug_indent.pop();
pug_html = pug_html + "\n        \u003C\u002Fdiv\u003E\n      \u003C\u002Fdiv\u003E\n    \u003C\u002Fdiv\u003E\n    \u003Cscript" + (pug.attr("src", "ui-"+name+".js", true, true)) + "\u003E\u003C\u002Fscript\u003E\n  \u003C\u002Fbody\u003E\n\u003C\u002Fhtml\u003E";
    }.call(this, "pug_indent" in locals_for_with ?
        locals_for_with.pug_indent :
        typeof pug_indent !== 'undefined' ? pug_indent : undefined));
    ;;return pug_html;};
module.exports = template;

/***/ }),

/***/ 6:
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

/******/ });