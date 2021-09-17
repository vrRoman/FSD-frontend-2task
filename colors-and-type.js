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
/******/ 	return __webpack_require__(__webpack_require__.s = 181);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */,
/* 2 */
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
    str = str || __webpack_require__(57).readFileSync(filename, 'utf8');
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
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "favicons/apple-touch-icon.png");

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "favicons/favicon-16x16.png");

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "favicons/favicon-32x32.png");

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "favicons/favicon.ico");

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "favicons/safari-pinned-tab.svg");

/***/ }),
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var importAll = function importAll() {
  for (var _len = arguments.length, requireContexts = new Array(_len), _key = 0; _key < _len; _key++) {
    requireContexts[_key] = arguments[_key];
  }

  requireContexts.forEach(function (context) {
    return context.keys().forEach(context);
  });
};

/* harmony default export */ __webpack_exports__["a"] = (importAll);

/***/ }),
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// extracted by mini-css-extract-plugin


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./favicons/android-chrome-192x192.png": 46,
	"./favicons/android-chrome-512x512.png": 47,
	"./favicons/apple-touch-icon.png": 6,
	"./favicons/favicon-16x16.png": 7,
	"./favicons/favicon-32x32.png": 8,
	"./favicons/favicon.ico": 9,
	"./favicons/mstile-144x144.png": 48,
	"./favicons/mstile-150x150.png": 49,
	"./favicons/mstile-310x150.png": 50,
	"./favicons/mstile-310x310.png": 51,
	"./favicons/mstile-70x70.png": 52,
	"./favicons/safari-pinned-tab.svg": 10,
	"./images/logo-icon.svg": 53,
	"./images/logo.svg": 54
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 45;

/***/ }),
/* 46 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "favicons/android-chrome-192x192.png");

/***/ }),
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "favicons/android-chrome-512x512.png");

/***/ }),
/* 48 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "favicons/mstile-144x144.png");

/***/ }),
/* 49 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "favicons/mstile-150x150.png");

/***/ }),
/* 50 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "favicons/mstile-310x150.png");

/***/ }),
/* 51 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "favicons/mstile-310x310.png");

/***/ }),
/* 52 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "favicons/mstile-70x70.png");

/***/ }),
/* 53 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "images/logo-icon.svg");

/***/ }),
/* 54 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "images/logo.svg");

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./common.blocks/arrow/arrow.pug": 56,
	"./common.blocks/booking-card/booking-card.pug": 58,
	"./common.blocks/bullet-list/bullet-list.pug": 59,
	"./common.blocks/button/button.pug": 60,
	"./common.blocks/checkbox-buttons/checkbox-buttons.pug": 61,
	"./common.blocks/color-demo/color-demo.pug": 62,
	"./common.blocks/comment/comment.pug": 63,
	"./common.blocks/counting-item/counting-item.pug": 64,
	"./common.blocks/date-picker/date-picker.pug": 65,
	"./common.blocks/donut-chart/donut-chart.pug": 66,
	"./common.blocks/dropdown/dropdown.pug": 67,
	"./common.blocks/elem-info/elem-info.pug": 68,
	"./common.blocks/expandable-checkboxes/expandable-checkboxes.pug": 69,
	"./common.blocks/footer/footer.pug": 70,
	"./common.blocks/header/header.pug": 71,
	"./common.blocks/heading/heading.pug": 72,
	"./common.blocks/icon-text-list/icon-text-list.pug": 73,
	"./common.blocks/items-counter/items-counter.pug": 74,
	"./common.blocks/like-button/like-button.pug": 75,
	"./common.blocks/navigation/navigation.pug": 76,
	"./common.blocks/pagination/pagination.pug": 77,
	"./common.blocks/radio-buttons/radio-buttons.pug": 78,
	"./common.blocks/range-slider/range-slider.pug": 79,
	"./common.blocks/rate-button/rate-button.pug": 80,
	"./common.blocks/room-card/room-card.pug": 81,
	"./common.blocks/room-info/room-info.pug": 82,
	"./common.blocks/search-card/search-card.pug": 83,
	"./common.blocks/signin-card/signin-card.pug": 84,
	"./common.blocks/signup-card/signup-card.pug": 85,
	"./common.blocks/social-links/social-links.pug": 86,
	"./common.blocks/text-field/text-field.pug": 87,
	"./common.blocks/type-demo/type-demo.pug": 88,
	"./pages/index.pug": 89,
	"./pages/ui-kit/cards/cards.pug": 90,
	"./pages/ui-kit/colors-and-type/colors-and-type.pug": 91,
	"./pages/ui-kit/form-elements/form-elements.pug": 92,
	"./pages/ui-kit/headers-and-footers/headers-and-footers.pug": 93,
	"./pages/website-pages/landing-page/landing-page.pug": 94,
	"./pages/website-pages/login/login.pug": 95,
	"./pages/website-pages/registration/registration.pug": 96,
	"./pages/website-pages/room-details/room-details.pug": 97,
	"./pages/website-pages/search-room/search-room.pug": 98,
	"./templates/ui-kit.pug": 99,
	"./templates/website-pages.pug": 100
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 55;

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(2);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_indent = [];




;return pug_html;};
module.exports = template;

/***/ }),
/* 57 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(2);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;
    var locals_for_with = (locals || {});
    
    (function (Array, Date, JSON, pug_indent) {
      var pug_indent = [];
pug_mixins["heading"] = pug_interp = function({ text = '', type = 'h3', color, withJs = false }){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'heading';
let tag;

switch (type) {
    case 'h3':
        className += ' heading_type_h3';
        tag = 'h3';
        break;
    case 'h2':
        className += ' heading_type_h2';
        tag = 'h2';
        break;
    case 'inline':
        className += ' heading_type_h3';
        tag = 'span';
        break;
    default:
        tag = 'h1';
        break;
}
switch (color) {
    case 'white':
        className += ' heading_color_white';
        break;
    case 'purple':
        className += ' heading_color_purple';
        break;
    case 'gray':
        className += ' heading_color_gray';
        break;
    case 'inherit':
        className += ' heading_color_inherit';
        break;
    default:
        break;
}
if (withJs) {
  className += ' js-heading';
}

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C" + (tag) + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = text) ? "" : pug_interp)) + "\u003C\u002F" + (tag) + "\u003E";
};
pug_mixins["room-info"] = pug_interp = function({ number, type, price, isNameBig = false }){
var block = (this && this.block), attributes = (this && this.attributes) || {};
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv" + (pug.attr("class", pug.classes([`room-info${isNameBig ? ' room-info_size_big' : ''}`], [true]), false, true)) + "\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cheader class=\"room-info__name\"\u003E\u003Cspan class=\"room-info__number-sign\"\u003E№\u003C\u002Fspan\u003E";
if ((isNameBig)) {
pug_indent.push('    ');
pug_mixins["heading"]({
                  text: number,
                  type: 'h1',
                });
pug_indent.pop();
}
else {
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Ch3 class=\"room-info__number\"\u003E" + (pug.escape(null == (pug_interp = number) ? "" : pug_interp)) + "\u003C\u002Fh3\u003E";
}
if ((type)) {
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"room-info__type\"\u003E";
pug_indent.push('      ');
pug_mixins["heading"]({
                        text: type,
                        color: 'purple',
                    });
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fheader\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cp class=\"room-info__price\"\u003E" + (pug.escape(null == (pug_interp = `${price}₽`) ? "" : pug_interp)) + "\u003Cspan class=\"room-info__price-measure\"\u003Eв сутки\u003C\u002Fspan\u003E\u003C\u002Fp\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
};
pug_mixins["arrow"] = pug_interp = function({ type, color, withoutPadding = false } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'arrow';
let iconName = 'expand_more';

switch (type) {
    case 'expand-less':
        iconName = 'expand_less';
        break;
    case 'forward':
        iconName = 'arrow_forward';
        break;
    default:
        break;
}

switch (color) {
    case 'white':
        className += ' arrow_color_white';
        break;
    case 'purple-gradient':
        className += ' arrow_color_purple-gradient';
        break;
    default:
        break;
}

if (withoutPadding) {
    className += ' arrow_without-padding';
}

pug_html = pug_html + "\u003Cspan" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = iconName) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
};
pug_mixins["heading"] = pug_interp = function({ text = '', type = 'h3', color, withJs = false }){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'heading';
let tag;

switch (type) {
    case 'h3':
        className += ' heading_type_h3';
        tag = 'h3';
        break;
    case 'h2':
        className += ' heading_type_h2';
        tag = 'h2';
        break;
    case 'inline':
        className += ' heading_type_h3';
        tag = 'span';
        break;
    default:
        tag = 'h1';
        break;
}
switch (color) {
    case 'white':
        className += ' heading_color_white';
        break;
    case 'purple':
        className += ' heading_color_purple';
        break;
    case 'gray':
        className += ' heading_color_gray';
        break;
    case 'inherit':
        className += ' heading_color_inherit';
        break;
    default:
        break;
}
if (withJs) {
  className += ' js-heading';
}

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C" + (tag) + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = text) ? "" : pug_interp)) + "\u003C\u002F" + (tag) + "\u003E";
};
pug_mixins["button"] = pug_interp = function(options = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
const {
    text = 'click me',
    hasLink = false,
    isSubmit = false,
    link = 'change-me',
    modifiers = {},
    withJs = false,
} = options;

let className = 'button';
let headingOptions = {
    text,
    type: 'inline',
    color: 'white',
};

if (hasLink) {
    headingOptions.type = 'h3';
}

if (modifiers.isSecondary) {
    className += ' button_secondary';
    headingOptions.color = 'purple';
}
if (modifiers.withoutFrame) {
    headingOptions.color = 'inherit';
    className += ' button_without-frame';
}
if (modifiers.isLong) {
    className += ' button_long';
}
if (modifiers.isHovered) {
    className += ' button_hovered';
}
if (modifiers.isNarrow) {
    className += ' button_narrow';
}
if (modifiers.isWide) {
    className += ' button_wide';
}
if (withJs) {
  className += ' js-button';
}

switch (modifiers.textColor) {
    case 'white':
        headingOptions.color = 'white';
        break;
    case 'purple':
        headingOptions.color = 'purple';
        break;
    case 'gray':
        headingOptions.color = 'gray';
        break;
    default:
        break;
}

if ((hasLink)) {
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E\u003Ca" + (" class=\"button__text\""+pug.attr("href", link, true, true)) + "\u003E";
pug_indent.push('    ');
pug_mixins["heading"](headingOptions);
pug_indent.pop();
pug_html = pug_html + "\u003C\u002Fa\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"button__arrow\"\u003E";
pug_indent.push('    ');
pug_mixins["arrow"]({
                  type: 'forward',
                  color: 'white',
                });
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
else {
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cbutton" + (pug.attr("class", pug.classes([className], [true]), false, true)+pug.attr("type", isSubmit ? 'submit' : 'button', true, true)) + "\u003E\u003Cspan class=\"button__text\"\u003E";
pug_indent.push('    ');
pug_mixins["heading"](headingOptions);
pug_indent.pop();
pug_html = pug_html + "\u003C\u002Fspan\u003E\u003Cspan class=\"button__arrow\"\u003E";
pug_indent.push('    ');
pug_mixins["arrow"]({
                    type: 'forward',
                    color: 'white',
                });
pug_indent.pop();
pug_html = pug_html + "\u003C\u002Fspan\u003E\u003C\u002Fbutton\u003E";
}
};
pug_mixins["date-picker"] = pug_interp = function(options = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
const {
    withBorder = false,
    dateFormat = null,
    initialDate = [null, null],
    isTextDouble = false,
} = options;

let className = 'date-picker js-date-picker';
if (withBorder) {
    className += ' date-picker_with-border';
}
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv" + (pug.attr("class", pug.classes([className], [true]), false, true)+pug.attr("data-date-format", dateFormat, true, true)+pug.attr("data-initial-date", initialDate, true, true)+pug.attr("data-is-text-double", isTextDouble ? 'true' : 'false', true, true)) + "\u003E\u003C\u002Fdiv\u003E";
};
pug_mixins["heading"] = pug_interp = function({ text = '', type = 'h3', color, withJs = false }){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'heading';
let tag;

switch (type) {
    case 'h3':
        className += ' heading_type_h3';
        tag = 'h3';
        break;
    case 'h2':
        className += ' heading_type_h2';
        tag = 'h2';
        break;
    case 'inline':
        className += ' heading_type_h3';
        tag = 'span';
        break;
    default:
        tag = 'h1';
        break;
}
switch (color) {
    case 'white':
        className += ' heading_color_white';
        break;
    case 'purple':
        className += ' heading_color_purple';
        break;
    case 'gray':
        className += ' heading_color_gray';
        break;
    case 'inherit':
        className += ' heading_color_inherit';
        break;
    default:
        break;
}
if (withJs) {
  className += ' js-heading';
}

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C" + (tag) + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = text) ? "" : pug_interp)) + "\u003C\u002F" + (tag) + "\u003E";
};
pug_mixins["counting-item"] = pug_interp = function({ name = '', value = 0, nameDeclensions } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv" + (" class=\"counting-item js-counting-item\""+pug.attr("data-words", nameDeclensions ? JSON.stringify(nameDeclensions) : false, true, true)) + "\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"counting-item__name js-counting-item__name\"\u003E";
pug_indent.push('    ');
pug_mixins["heading"]({
                text: name,
                withJs: true,
            });
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"counting-item__counter\"\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cbutton class=\"counting-item__change-button counting-item__change-button_action_decrease js-counting-item__change-button_action_decrease\" type=\"button\"\u003E-\u003C\u002Fbutton\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"counting-item__value js-counting-item__value\"\u003E";
pug_indent.push('      ');
pug_mixins["heading"]({
                    text: value,
                    withJs: true,
                });
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cbutton class=\"counting-item__change-button counting-item__change-button_action_increase js-counting-item__change-button_action_increase\" type=\"button\"\u003E+\u003C\u002Fbutton\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
};
pug_mixins["arrow"] = pug_interp = function({ type, color, withoutPadding = false } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'arrow';
let iconName = 'expand_more';

switch (type) {
    case 'expand-less':
        iconName = 'expand_less';
        break;
    case 'forward':
        iconName = 'arrow_forward';
        break;
    default:
        break;
}

switch (color) {
    case 'white':
        className += ' arrow_color_white';
        break;
    case 'purple-gradient':
        className += ' arrow_color_purple-gradient';
        break;
    default:
        break;
}

if (withoutPadding) {
    className += ' arrow_without-padding';
}

pug_html = pug_html + "\u003Cspan" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = iconName) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
};
pug_mixins["heading"] = pug_interp = function({ text = '', type = 'h3', color, withJs = false }){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'heading';
let tag;

switch (type) {
    case 'h3':
        className += ' heading_type_h3';
        tag = 'h3';
        break;
    case 'h2':
        className += ' heading_type_h2';
        tag = 'h2';
        break;
    case 'inline':
        className += ' heading_type_h3';
        tag = 'span';
        break;
    default:
        tag = 'h1';
        break;
}
switch (color) {
    case 'white':
        className += ' heading_color_white';
        break;
    case 'purple':
        className += ' heading_color_purple';
        break;
    case 'gray':
        className += ' heading_color_gray';
        break;
    case 'inherit':
        className += ' heading_color_inherit';
        break;
    default:
        break;
}
if (withJs) {
  className += ' js-heading';
}

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C" + (tag) + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = text) ? "" : pug_interp)) + "\u003C\u002F" + (tag) + "\u003E";
};
pug_mixins["button"] = pug_interp = function(options = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
const {
    text = 'click me',
    hasLink = false,
    isSubmit = false,
    link = 'change-me',
    modifiers = {},
    withJs = false,
} = options;

let className = 'button';
let headingOptions = {
    text,
    type: 'inline',
    color: 'white',
};

if (hasLink) {
    headingOptions.type = 'h3';
}

if (modifiers.isSecondary) {
    className += ' button_secondary';
    headingOptions.color = 'purple';
}
if (modifiers.withoutFrame) {
    headingOptions.color = 'inherit';
    className += ' button_without-frame';
}
if (modifiers.isLong) {
    className += ' button_long';
}
if (modifiers.isHovered) {
    className += ' button_hovered';
}
if (modifiers.isNarrow) {
    className += ' button_narrow';
}
if (modifiers.isWide) {
    className += ' button_wide';
}
if (withJs) {
  className += ' js-button';
}

switch (modifiers.textColor) {
    case 'white':
        headingOptions.color = 'white';
        break;
    case 'purple':
        headingOptions.color = 'purple';
        break;
    case 'gray':
        headingOptions.color = 'gray';
        break;
    default:
        break;
}

if ((hasLink)) {
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E\u003Ca" + (" class=\"button__text\""+pug.attr("href", link, true, true)) + "\u003E";
pug_indent.push('    ');
pug_mixins["heading"](headingOptions);
pug_indent.pop();
pug_html = pug_html + "\u003C\u002Fa\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"button__arrow\"\u003E";
pug_indent.push('    ');
pug_mixins["arrow"]({
                  type: 'forward',
                  color: 'white',
                });
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
else {
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cbutton" + (pug.attr("class", pug.classes([className], [true]), false, true)+pug.attr("type", isSubmit ? 'submit' : 'button', true, true)) + "\u003E\u003Cspan class=\"button__text\"\u003E";
pug_indent.push('    ');
pug_mixins["heading"](headingOptions);
pug_indent.pop();
pug_html = pug_html + "\u003C\u002Fspan\u003E\u003Cspan class=\"button__arrow\"\u003E";
pug_indent.push('    ');
pug_mixins["arrow"]({
                    type: 'forward',
                    color: 'white',
                });
pug_indent.pop();
pug_html = pug_html + "\u003C\u002Fspan\u003E\u003C\u002Fbutton\u003E";
}
};
pug_mixins["items-counter"] = pug_interp = function(options = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
const {
    items,
    withoutButtons = false,
    wordForValueTextReplacing = null,
    itemIndexForSeparateCount = null,
} = options;

let className = 'items-counter js-items-counter';
if (withoutButtons) {
    className += ' items-counter_without-buttons';
}
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv" + (pug.attr("class", pug.classes([className], [true]), false, true)+pug.attr("data-replace-text", JSON.stringify(wordForValueTextReplacing), true, true)+pug.attr("data-separate-item", JSON.stringify(itemIndexForSeparateCount), true, true)) + "\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cul class=\"items-counter__items-list\"\u003E";
// iterate items
;(function(){
  var $$obj = items;
  if ('number' == typeof $$obj.length) {
      for (var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++) {
        var item = $$obj[pug_index0];
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"items-counter__item\"\u003E";
pug_indent.push('      ');
pug_mixins["counting-item"]({
                        name: item.name,
                        value: item.value,
                        nameDeclensions: item.nameDeclensions,
                    });
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index0 in $$obj) {
      $$l++;
      var item = $$obj[pug_index0];
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"items-counter__item\"\u003E";
pug_indent.push('      ');
pug_mixins["counting-item"]({
                        name: item.name,
                        value: item.value,
                        nameDeclensions: item.nameDeclensions,
                    });
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Ful\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"items-counter__button-panel\"\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"items-counter__clear-button js-items-counter__clear-button\"\u003E";
pug_indent.push('      ');
pug_mixins["button"]({
                    text: 'Очистить',
                    hasLink: false,
                    modifiers: {
                        withoutFrame: true,
                    }
                });
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"items-counter__apply-button js-items-counter__apply-button\"\u003E";
pug_indent.push('      ');
pug_mixins["button"]({
                    text: 'Применить',
                    hasLink: false,
                    modifiers: {
                        withoutFrame: true,
                    }
                });
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
};
pug_mixins["arrow"] = pug_interp = function({ type, color, withoutPadding = false } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'arrow';
let iconName = 'expand_more';

switch (type) {
    case 'expand-less':
        iconName = 'expand_less';
        break;
    case 'forward':
        iconName = 'arrow_forward';
        break;
    default:
        break;
}

switch (color) {
    case 'white':
        className += ' arrow_color_white';
        break;
    case 'purple-gradient':
        className += ' arrow_color_purple-gradient';
        break;
    default:
        break;
}

if (withoutPadding) {
    className += ' arrow_without-padding';
}

pug_html = pug_html + "\u003Cspan" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = iconName) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
};
pug_mixins["text-field"] = pug_interp = function({ inputOptions = {}, arrowOptions, modifiers = {}, withJs = false } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'text-field';

if (modifiers.isFocused) {
    className += ' text-field_focused';
}
if (modifiers.isShort) {
    className += ' text-field_short';
}
if (modifiers.isBottomFlat) {
    className += ' text-field_flat-bottom';
}
if (modifiers.isClickable) {
    className += ' text-field_clickable';
}

if (withJs) {
    className += ' js-text-field';
}

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E";
let inputClassName = 'text-field__input';
if (arrowOptions) {
    inputClassName += ' text-field__input_with-arrow';
}
if (inputOptions.isMaskedDate) {
    inputClassName += ' text-field__input_masked-date js-text-field__input_masked-date'
}
if (inputOptions.withJs) {
    inputClassName += ' js-text-field__input';
}

pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cinput" + (pug.attr("class", pug.classes([inputClassName], [true]), false, true)+pug.attr("type", inputOptions.type, true, true)+pug.attr("placeholder", inputOptions.placeholder, true, true)+pug.attr("value", inputOptions.value, true, true)+pug.attr("readonly", inputOptions.isReadonly, true, true)) + "\u003E";
if ((arrowOptions)) {
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cbutton" + (" class=\"text-field__arrow\""+pug.attr("type", inputOptions.isSubmit ? 'submit' : 'button', true, true)) + "\u003E";
pug_indent.push('    ');
pug_mixins["arrow"](arrowOptions);
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fbutton\u003E";
}
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
};
pug_mixins["dropdown"] = pug_interp = function(options = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let {
    inputOptions = {},
    popupMixinOptions = {},
    popupHidden = true,
    title,
    isDouble = false,
    isShort = false,
    isPopupDistant = false,
    defaultInputValue = '',
} = options;

let className = 'dropdown js-dropdown';
if (isDouble) {
    className += ' dropdown_double';
}
if (isShort) {
  className += ' dropdown_short';
}
if (isPopupDistant) {
  className += ' dropdown_with-distant-popup';
}

if (isDouble) {
    if (!Array.isArray(title)) {
        title = [title, title];
    }
    if (!Array.isArray(inputOptions)) {
        inputOptions = [inputOptions, inputOptions];
    }
}
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Csection" + (pug.attr("class", pug.classes([className], [true]), false, true)+pug.attr("data-default-value", JSON.stringify(defaultInputValue), true, true)) + "\u003E";
if ((isDouble)) {
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"dropdown__text-field js-dropdown__text-field\"\u003E";
if ((title[0])) {
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"dropdown__title\"\u003E";
pug_indent.push('      ');
pug_mixins["heading"]({
                            text: title[0],
                        });
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
pug_indent.push('    ');
pug_mixins["text-field"]({
                    inputOptions: {
                        ...inputOptions[0],
                        isMaskedDate: false,
                        isReadonly: true,
                        withJs: true,
                    },
                    arrowOptions: {},
                    modifiers: {
                        isFocused: !popupHidden,
                        isBottomFlat: !popupHidden,
                        isClickable: true,
                    },
                    withJs: true,
                });
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"dropdown__text-field js-dropdown__text-field\"\u003E";
if ((title[1])) {
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"dropdown__title\"\u003E";
pug_indent.push('      ');
pug_mixins["heading"]({
                            text: title[1],
                        });
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
pug_indent.push('    ');
pug_mixins["text-field"]({
                    inputOptions: {
                        ...inputOptions[1],
                        isMaskedDate: false,
                        isReadonly: true,
                        withJs: true,
                    },
                    arrowOptions: {},
                    modifiers: {
                        isFocused: !popupHidden,
                        isBottomFlat: !popupHidden,
                        isClickable: true,
                    },
                    withJs: true,
                });
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
else {
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"dropdown__text-field js-dropdown__text-field\"\u003E";
if ((title)) {
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"dropdown__title\"\u003E";
pug_indent.push('      ');
pug_mixins["heading"]({
                            text: title,
                        });
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
pug_indent.push('    ');
pug_mixins["text-field"]({
                    inputOptions: {
                        ...inputOptions,
                        isMaskedDate: false,
                        isReadonly: true,
                        withJs: true,
                    },
                    arrowOptions: {},
                    modifiers: {
                        isFocused: !popupHidden,
                        isBottomFlat: !popupHidden,
                        isClickable: true,
                    },
                    withJs: true,
                });
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv" + (pug.attr("class", pug.classes(["dropdown__popup","js-dropdown__popup",`${popupHidden ? 'dropdown__popup_hidden' : false}`], [false,false,true]), false, true)) + "\u003E";
if ((popupMixinOptions.name)) {
pug_indent.push('    ');
pug_mixins[popupMixinOptions.name](popupMixinOptions.params);
pug_indent.pop();
}
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fsection\u003E";
};
pug_mixins["heading"] = pug_interp = function({ text = '', type = 'h3', color, withJs = false }){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'heading';
let tag;

switch (type) {
    case 'h3':
        className += ' heading_type_h3';
        tag = 'h3';
        break;
    case 'h2':
        className += ' heading_type_h2';
        tag = 'h2';
        break;
    case 'inline':
        className += ' heading_type_h3';
        tag = 'span';
        break;
    default:
        tag = 'h1';
        break;
}
switch (color) {
    case 'white':
        className += ' heading_color_white';
        break;
    case 'purple':
        className += ' heading_color_purple';
        break;
    case 'gray':
        className += ' heading_color_gray';
        break;
    case 'inherit':
        className += ' heading_color_inherit';
        break;
    default:
        break;
}
if (withJs) {
  className += ' js-heading';
}

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C" + (tag) + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = text) ? "" : pug_interp)) + "\u003C\u002F" + (tag) + "\u003E";
};
pug_mixins["booking-card"] = pug_interp = function({ roomInfo, bookingItems, totalPrice } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Carticle class=\"booking-card js-booking-card\"\u003E";
pug_indent.push('  ');
pug_mixins["room-info"](roomInfo);
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cform\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"booking-card__dates\"\u003E";
pug_indent.push('      ');
pug_mixins["dropdown"]({
                    isDouble: true,
                    title: ['Прибытие', 'Выезд'],
                    inputOptions: [
                        {
                            value: '19.08.2019',
                            placeholder: 'ДД.ММ.ГГГГ',
                        },
                        {
                            value: '23.08.2019',
                            placeholder: 'ДД.ММ.ГГГГ',
                        },
                    ],
                    popupMixinOptions: {
                        name: 'date-picker',
                        params: {
                          initialDate: [new Date(2019, 7, 19), new Date(2019, 7, 23)],
                          isTextDouble: true,
                        },
                    },
                    isPopupDistant: true,
                    defaultInputValue: 'ДД.ММ.ГГГГ',
                });
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"booking-card__guests\"\u003E";
pug_indent.push('      ');
pug_mixins["dropdown"]({
                    inputOptions: {
                        value: '3 гостя',
                        placeholder: 'Сколько гостей',
                    },
                    popupMixinOptions: {
                        name: 'items-counter',
                        params: {
                            items: [
                                {
                                    name: 'Взрослые',
                                    value: 2,
                                },
                                {
                                    name: 'Дети',
                                    value: 1,
                                },
                                {
                                    name: 'Младенцы',
                                    value: 0,
                                    nameDeclensions: ['младенец', 'младенца', 'младенцев'],
                                },
                            ],
                            wordForValueTextReplacing: ['гость', 'гостя', 'гостей'],
                            itemIndexForSeparateCount: 2,
                        },
                    },
                    title: 'Гости',
                    defaultInputValue: 'Сколько гостей',
                });
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cul class=\"booking-card__items\"\u003E";
// iterate bookingItems
;(function(){
  var $$obj = bookingItems;
  if ('number' == typeof $$obj.length) {
      for (var pug_index1 = 0, $$l = $$obj.length; pug_index1 < $$l; pug_index1++) {
        var item = $$obj[pug_index1];
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"booking-card__item\"\u003E\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + ("\u003Cp class=\"booking-card__item-text\"\u003E" + (null == (pug_interp = item.text) ? "" : pug_interp));
if ((item.tooltip)) {
pug_html = pug_html + "\u003Cspan" + (" class=\"booking-card__tooltip\""+pug.attr("data-text", item.tooltip, true, true)) + "\u003Ei\u003C\u002Fspan\u003E";
}
pug_html = pug_html + "\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fp\u003E\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Coutput class=\"booking-card__item-price\"\u003E" + (pug.escape(null == (pug_interp = `${item.price}₽`) ? "" : pug_interp)) + "\u003C\u002Foutput\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index1 in $$obj) {
      $$l++;
      var item = $$obj[pug_index1];
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"booking-card__item\"\u003E\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + ("\u003Cp class=\"booking-card__item-text\"\u003E" + (null == (pug_interp = item.text) ? "" : pug_interp));
if ((item.tooltip)) {
pug_html = pug_html + "\u003Cspan" + (" class=\"booking-card__tooltip\""+pug.attr("data-text", item.tooltip, true, true)) + "\u003Ei\u003C\u002Fspan\u003E";
}
pug_html = pug_html + "\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fp\u003E\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Coutput class=\"booking-card__item-price\"\u003E" + (pug.escape(null == (pug_interp = `${item.price}₽`) ? "" : pug_interp)) + "\u003C\u002Foutput\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Ful\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"booking-card__total\"\u003E";
pug_indent.push('      ');
pug_mixins["heading"]({
                    text: 'Итого',
                    type: 'h2',
                });
pug_indent.pop();
pug_html = pug_html + "\u003Cspan class=\"booking-card__dots\"\u003E\u003C\u002Fspan\u003E";
pug_indent.push('      ');
pug_mixins["heading"]({
                    text: `${totalPrice}₽`,
                    type: 'h2',
                });
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
pug_indent.push('    ');
pug_mixins["button"]({
                text: 'Забронировать',
                hasLink: true,
                link: 'landing-page.html',
                modifiers: {
                    isLong: true,
                    textColor: 'white',
                }
            });
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fform\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Farticle\u003E";
};
    }.call(this, "Array" in locals_for_with ?
        locals_for_with.Array :
        typeof Array !== 'undefined' ? Array : undefined, "Date" in locals_for_with ?
        locals_for_with.Date :
        typeof Date !== 'undefined' ? Date : undefined, "JSON" in locals_for_with ?
        locals_for_with.JSON :
        typeof JSON !== 'undefined' ? JSON : undefined, "pug_indent" in locals_for_with ?
        locals_for_with.pug_indent :
        typeof pug_indent !== 'undefined' ? pug_indent : undefined));
    ;;return pug_html;};
module.exports = template;

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(2);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_indent = [];




















;return pug_html;};
module.exports = template;

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(2);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;
    var locals_for_with = (locals || {});
    
    (function (pug_indent) {
      var pug_indent = [];
pug_mixins["arrow"] = pug_interp = function({ type, color, withoutPadding = false } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'arrow';
let iconName = 'expand_more';

switch (type) {
    case 'expand-less':
        iconName = 'expand_less';
        break;
    case 'forward':
        iconName = 'arrow_forward';
        break;
    default:
        break;
}

switch (color) {
    case 'white':
        className += ' arrow_color_white';
        break;
    case 'purple-gradient':
        className += ' arrow_color_purple-gradient';
        break;
    default:
        break;
}

if (withoutPadding) {
    className += ' arrow_without-padding';
}

pug_html = pug_html + "\u003Cspan" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = iconName) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
};
pug_mixins["heading"] = pug_interp = function({ text = '', type = 'h3', color, withJs = false }){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'heading';
let tag;

switch (type) {
    case 'h3':
        className += ' heading_type_h3';
        tag = 'h3';
        break;
    case 'h2':
        className += ' heading_type_h2';
        tag = 'h2';
        break;
    case 'inline':
        className += ' heading_type_h3';
        tag = 'span';
        break;
    default:
        tag = 'h1';
        break;
}
switch (color) {
    case 'white':
        className += ' heading_color_white';
        break;
    case 'purple':
        className += ' heading_color_purple';
        break;
    case 'gray':
        className += ' heading_color_gray';
        break;
    case 'inherit':
        className += ' heading_color_inherit';
        break;
    default:
        break;
}
if (withJs) {
  className += ' js-heading';
}

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C" + (tag) + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = text) ? "" : pug_interp)) + "\u003C\u002F" + (tag) + "\u003E";
};




































    }.call(this, "pug_indent" in locals_for_with ?
        locals_for_with.pug_indent :
        typeof pug_indent !== 'undefined' ? pug_indent : undefined));
    ;;return pug_html;};
module.exports = template;

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(2);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_indent = [];













































;return pug_html;};
module.exports = template;

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(2);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;
    var locals_for_with = (locals || {});
    
    (function (pug_indent) {
      var pug_indent = [];
pug_mixins["heading"] = pug_interp = function({ text = '', type = 'h3', color, withJs = false }){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'heading';
let tag;

switch (type) {
    case 'h3':
        className += ' heading_type_h3';
        tag = 'h3';
        break;
    case 'h2':
        className += ' heading_type_h2';
        tag = 'h2';
        break;
    case 'inline':
        className += ' heading_type_h3';
        tag = 'span';
        break;
    default:
        tag = 'h1';
        break;
}
switch (color) {
    case 'white':
        className += ' heading_color_white';
        break;
    case 'purple':
        className += ' heading_color_purple';
        break;
    case 'gray':
        className += ' heading_color_gray';
        break;
    case 'inherit':
        className += ' heading_color_inherit';
        break;
    default:
        break;
}
if (withJs) {
  className += ' js-heading';
}

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C" + (tag) + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = text) ? "" : pug_interp)) + "\u003C\u002F" + (tag) + "\u003E";
};

























    }.call(this, "pug_indent" in locals_for_with ?
        locals_for_with.pug_indent :
        typeof pug_indent !== 'undefined' ? pug_indent : undefined));
    ;;return pug_html;};
module.exports = template;

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(2);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;
    var locals_for_with = (locals || {});
    
    (function (pug_indent) {
      var pug_indent = [];
pug_mixins["like-button"] = pug_interp = function({ likesNum = 0, isActive = false } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'like-button js-like-button';
if (isActive) {
    className += ' like-button_active';
}
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cbutton" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E\u003Cspan class=\"like-button__heart material-icons\"\u003E\u003C\u002Fspan\u003E\u003Cspan class=\"like-button__number js-like-button__number\"\u003E" + (pug.escape(null == (pug_interp = likesNum) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003C\u002Fbutton\u003E";
};































    }.call(this, "pug_indent" in locals_for_with ?
        locals_for_with.pug_indent :
        typeof pug_indent !== 'undefined' ? pug_indent : undefined));
    ;;return pug_html;};
module.exports = template;

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(2);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;
    var locals_for_with = (locals || {});
    
    (function (pug_indent) {
      var pug_indent = [];
pug_mixins["heading"] = pug_interp = function({ text = '', type = 'h3', color, withJs = false }){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'heading';
let tag;

switch (type) {
    case 'h3':
        className += ' heading_type_h3';
        tag = 'h3';
        break;
    case 'h2':
        className += ' heading_type_h2';
        tag = 'h2';
        break;
    case 'inline':
        className += ' heading_type_h3';
        tag = 'span';
        break;
    default:
        tag = 'h1';
        break;
}
switch (color) {
    case 'white':
        className += ' heading_color_white';
        break;
    case 'purple':
        className += ' heading_color_purple';
        break;
    case 'gray':
        className += ' heading_color_gray';
        break;
    case 'inherit':
        className += ' heading_color_inherit';
        break;
    default:
        break;
}
if (withJs) {
  className += ' js-heading';
}

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C" + (tag) + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = text) ? "" : pug_interp)) + "\u003C\u002F" + (tag) + "\u003E";
};
































    }.call(this, "pug_indent" in locals_for_with ?
        locals_for_with.pug_indent :
        typeof pug_indent !== 'undefined' ? pug_indent : undefined));
    ;;return pug_html;};
module.exports = template;

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(2);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_indent = [];






;return pug_html;};
module.exports = template;

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(2);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;
    var locals_for_with = (locals || {});
    
    (function (pug_indent) {
      var pug_indent = [];
pug_mixins["heading"] = pug_interp = function({ text = '', type = 'h3', color, withJs = false }){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'heading';
let tag;

switch (type) {
    case 'h3':
        className += ' heading_type_h3';
        tag = 'h3';
        break;
    case 'h2':
        className += ' heading_type_h2';
        tag = 'h2';
        break;
    case 'inline':
        className += ' heading_type_h3';
        tag = 'span';
        break;
    default:
        tag = 'h1';
        break;
}
switch (color) {
    case 'white':
        className += ' heading_color_white';
        break;
    case 'purple':
        className += ' heading_color_purple';
        break;
    case 'gray':
        className += ' heading_color_gray';
        break;
    case 'inherit':
        className += ' heading_color_inherit';
        break;
    default:
        break;
}
if (withJs) {
  className += ' js-heading';
}

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C" + (tag) + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = text) ? "" : pug_interp)) + "\u003C\u002F" + (tag) + "\u003E";
};










































    }.call(this, "pug_indent" in locals_for_with ?
        locals_for_with.pug_indent :
        typeof pug_indent !== 'undefined' ? pug_indent : undefined));
    ;;return pug_html;};
module.exports = template;

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(2);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;
    var locals_for_with = (locals || {});
    
    (function (Array, JSON, pug_indent) {
      var pug_indent = [];
pug_mixins["arrow"] = pug_interp = function({ type, color, withoutPadding = false } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'arrow';
let iconName = 'expand_more';

switch (type) {
    case 'expand-less':
        iconName = 'expand_less';
        break;
    case 'forward':
        iconName = 'arrow_forward';
        break;
    default:
        break;
}

switch (color) {
    case 'white':
        className += ' arrow_color_white';
        break;
    case 'purple-gradient':
        className += ' arrow_color_purple-gradient';
        break;
    default:
        break;
}

if (withoutPadding) {
    className += ' arrow_without-padding';
}

pug_html = pug_html + "\u003Cspan" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = iconName) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
};
pug_mixins["text-field"] = pug_interp = function({ inputOptions = {}, arrowOptions, modifiers = {}, withJs = false } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'text-field';

if (modifiers.isFocused) {
    className += ' text-field_focused';
}
if (modifiers.isShort) {
    className += ' text-field_short';
}
if (modifiers.isBottomFlat) {
    className += ' text-field_flat-bottom';
}
if (modifiers.isClickable) {
    className += ' text-field_clickable';
}

if (withJs) {
    className += ' js-text-field';
}

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E";
let inputClassName = 'text-field__input';
if (arrowOptions) {
    inputClassName += ' text-field__input_with-arrow';
}
if (inputOptions.isMaskedDate) {
    inputClassName += ' text-field__input_masked-date js-text-field__input_masked-date'
}
if (inputOptions.withJs) {
    inputClassName += ' js-text-field__input';
}

pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cinput" + (pug.attr("class", pug.classes([inputClassName], [true]), false, true)+pug.attr("type", inputOptions.type, true, true)+pug.attr("placeholder", inputOptions.placeholder, true, true)+pug.attr("value", inputOptions.value, true, true)+pug.attr("readonly", inputOptions.isReadonly, true, true)) + "\u003E";
if ((arrowOptions)) {
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cbutton" + (" class=\"text-field__arrow\""+pug.attr("type", inputOptions.isSubmit ? 'submit' : 'button', true, true)) + "\u003E";
pug_indent.push('    ');
pug_mixins["arrow"](arrowOptions);
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fbutton\u003E";
}
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
};
pug_mixins["dropdown"] = pug_interp = function(options = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let {
    inputOptions = {},
    popupMixinOptions = {},
    popupHidden = true,
    title,
    isDouble = false,
    isShort = false,
    isPopupDistant = false,
    defaultInputValue = '',
} = options;

let className = 'dropdown js-dropdown';
if (isDouble) {
    className += ' dropdown_double';
}
if (isShort) {
  className += ' dropdown_short';
}
if (isPopupDistant) {
  className += ' dropdown_with-distant-popup';
}

if (isDouble) {
    if (!Array.isArray(title)) {
        title = [title, title];
    }
    if (!Array.isArray(inputOptions)) {
        inputOptions = [inputOptions, inputOptions];
    }
}
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Csection" + (pug.attr("class", pug.classes([className], [true]), false, true)+pug.attr("data-default-value", JSON.stringify(defaultInputValue), true, true)) + "\u003E";
if ((isDouble)) {
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"dropdown__text-field js-dropdown__text-field\"\u003E";
if ((title[0])) {
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"dropdown__title\"\u003E";
pug_indent.push('      ');
pug_mixins["heading"]({
                            text: title[0],
                        });
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
pug_indent.push('    ');
pug_mixins["text-field"]({
                    inputOptions: {
                        ...inputOptions[0],
                        isMaskedDate: false,
                        isReadonly: true,
                        withJs: true,
                    },
                    arrowOptions: {},
                    modifiers: {
                        isFocused: !popupHidden,
                        isBottomFlat: !popupHidden,
                        isClickable: true,
                    },
                    withJs: true,
                });
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"dropdown__text-field js-dropdown__text-field\"\u003E";
if ((title[1])) {
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"dropdown__title\"\u003E";
pug_indent.push('      ');
pug_mixins["heading"]({
                            text: title[1],
                        });
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
pug_indent.push('    ');
pug_mixins["text-field"]({
                    inputOptions: {
                        ...inputOptions[1],
                        isMaskedDate: false,
                        isReadonly: true,
                        withJs: true,
                    },
                    arrowOptions: {},
                    modifiers: {
                        isFocused: !popupHidden,
                        isBottomFlat: !popupHidden,
                        isClickable: true,
                    },
                    withJs: true,
                });
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
else {
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"dropdown__text-field js-dropdown__text-field\"\u003E";
if ((title)) {
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"dropdown__title\"\u003E";
pug_indent.push('      ');
pug_mixins["heading"]({
                            text: title,
                        });
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
pug_indent.push('    ');
pug_mixins["text-field"]({
                    inputOptions: {
                        ...inputOptions,
                        isMaskedDate: false,
                        isReadonly: true,
                        withJs: true,
                    },
                    arrowOptions: {},
                    modifiers: {
                        isFocused: !popupHidden,
                        isBottomFlat: !popupHidden,
                        isClickable: true,
                    },
                    withJs: true,
                });
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv" + (pug.attr("class", pug.classes(["dropdown__popup","js-dropdown__popup",`${popupHidden ? 'dropdown__popup_hidden' : false}`], [false,false,true]), false, true)) + "\u003E";
if ((popupMixinOptions.name)) {
pug_indent.push('    ');
pug_mixins[popupMixinOptions.name](popupMixinOptions.params);
pug_indent.pop();
}
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fsection\u003E";
};
    }.call(this, "Array" in locals_for_with ?
        locals_for_with.Array :
        typeof Array !== 'undefined' ? Array : undefined, "JSON" in locals_for_with ?
        locals_for_with.JSON :
        typeof JSON !== 'undefined' ? JSON : undefined, "pug_indent" in locals_for_with ?
        locals_for_with.pug_indent :
        typeof pug_indent !== 'undefined' ? pug_indent : undefined));
    ;;return pug_html;};
module.exports = template;

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(2);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;
    var locals_for_with = (locals || {});
    
    (function (pug_indent) {
      var pug_indent = [];
pug_mixins["heading"] = pug_interp = function({ text = '', type = 'h3', color, withJs = false }){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'heading';
let tag;

switch (type) {
    case 'h3':
        className += ' heading_type_h3';
        tag = 'h3';
        break;
    case 'h2':
        className += ' heading_type_h2';
        tag = 'h2';
        break;
    case 'inline':
        className += ' heading_type_h3';
        tag = 'span';
        break;
    default:
        tag = 'h1';
        break;
}
switch (color) {
    case 'white':
        className += ' heading_color_white';
        break;
    case 'purple':
        className += ' heading_color_purple';
        break;
    case 'gray':
        className += ' heading_color_gray';
        break;
    case 'inherit':
        className += ' heading_color_inherit';
        break;
    default:
        break;
}
if (withJs) {
  className += ' js-heading';
}

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C" + (tag) + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = text) ? "" : pug_interp)) + "\u003C\u002F" + (tag) + "\u003E";
};






















    }.call(this, "pug_indent" in locals_for_with ?
        locals_for_with.pug_indent :
        typeof pug_indent !== 'undefined' ? pug_indent : undefined));
    ;;return pug_html;};
module.exports = template;

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(2);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;
    var locals_for_with = (locals || {});
    
    (function (pug_indent) {
      var pug_indent = [];
pug_mixins["heading"] = pug_interp = function({ text = '', type = 'h3', color, withJs = false }){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'heading';
let tag;

switch (type) {
    case 'h3':
        className += ' heading_type_h3';
        tag = 'h3';
        break;
    case 'h2':
        className += ' heading_type_h2';
        tag = 'h2';
        break;
    case 'inline':
        className += ' heading_type_h3';
        tag = 'span';
        break;
    default:
        tag = 'h1';
        break;
}
switch (color) {
    case 'white':
        className += ' heading_color_white';
        break;
    case 'purple':
        className += ' heading_color_purple';
        break;
    case 'gray':
        className += ' heading_color_gray';
        break;
    case 'inherit':
        className += ' heading_color_inherit';
        break;
    default:
        break;
}
if (withJs) {
  className += ' js-heading';
}

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C" + (tag) + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = text) ? "" : pug_interp)) + "\u003C\u002F" + (tag) + "\u003E";
};
pug_mixins["arrow"] = pug_interp = function({ type, color, withoutPadding = false } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'arrow';
let iconName = 'expand_more';

switch (type) {
    case 'expand-less':
        iconName = 'expand_less';
        break;
    case 'forward':
        iconName = 'arrow_forward';
        break;
    default:
        break;
}

switch (color) {
    case 'white':
        className += ' arrow_color_white';
        break;
    case 'purple-gradient':
        className += ' arrow_color_purple-gradient';
        break;
    default:
        break;
}

if (withoutPadding) {
    className += ' arrow_without-padding';
}

pug_html = pug_html + "\u003Cspan" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = iconName) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
};
pug_mixins["checkbox-buttons"] = pug_interp = function({ items, isRich = false, theme }){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'checkbox-buttons';
if (isRich) {
    className += ' checkbox-buttons_rich';
}
if (theme === 'toggle') {
    className += ' checkbox-buttons_theme_toggle';
}
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cul" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E";
// iterate items
;(function(){
  var $$obj = items;
  if ('number' == typeof $$obj.length) {
      for (var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++) {
        var item = $$obj[pug_index0];
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"checkbox-buttons__item\"\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Clabel class=\"checkbox-buttons__button\"\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cinput" + (" class=\"checkbox-buttons__input\""+" type=\"checkbox\""+pug.attr("checked", item.checked, true, true)) + "\u003E\u003Cspan class=\"checkbox-buttons__name\"\u003E" + (null == (pug_interp = item.name) ? "" : pug_interp) + "\u003C\u002Fspan\u003E";
if ((isRich)) {
pug_html = pug_html + "\u003Cspan class=\"checkbox-buttons__description\"\u003E" + (null == (pug_interp = item.description) ? "" : pug_interp) + "\u003C\u002Fspan\u003E";
}
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Flabel\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index0 in $$obj) {
      $$l++;
      var item = $$obj[pug_index0];
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"checkbox-buttons__item\"\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Clabel class=\"checkbox-buttons__button\"\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cinput" + (" class=\"checkbox-buttons__input\""+" type=\"checkbox\""+pug.attr("checked", item.checked, true, true)) + "\u003E\u003Cspan class=\"checkbox-buttons__name\"\u003E" + (null == (pug_interp = item.name) ? "" : pug_interp) + "\u003C\u002Fspan\u003E";
if ((isRich)) {
pug_html = pug_html + "\u003Cspan class=\"checkbox-buttons__description\"\u003E" + (null == (pug_interp = item.description) ? "" : pug_interp) + "\u003C\u002Fspan\u003E";
}
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Flabel\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Ful\u003E";
};

































    }.call(this, "pug_indent" in locals_for_with ?
        locals_for_with.pug_indent :
        typeof pug_indent !== 'undefined' ? pug_indent : undefined));
    ;;return pug_html;};
module.exports = template;

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(2);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;
    var locals_for_with = (locals || {});
    
    (function (pug_indent) {
      var pug_indent = [];
pug_mixins["arrow"] = pug_interp = function({ type, color, withoutPadding = false } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'arrow';
let iconName = 'expand_more';

switch (type) {
    case 'expand-less':
        iconName = 'expand_less';
        break;
    case 'forward':
        iconName = 'arrow_forward';
        break;
    default:
        break;
}

switch (color) {
    case 'white':
        className += ' arrow_color_white';
        break;
    case 'purple-gradient':
        className += ' arrow_color_purple-gradient';
        break;
    default:
        break;
}

if (withoutPadding) {
    className += ' arrow_without-padding';
}

pug_html = pug_html + "\u003Cspan" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = iconName) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
};
pug_mixins["navigation"] = pug_interp = function({ items, activeLinkIndex, inColumn = false, withJs = false }){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'navigation';
if (inColumn) {
    className += ' navigation_in-column';
}
if (withJs) {
    className += ' js-navigation';
}
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cnav" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cul class=\"navigation__list\"\u003E";
// iterate items
;(function(){
  var $$obj = items;
  if ('number' == typeof $$obj.length) {
      for (var itemIndex = 0, $$l = $$obj.length; itemIndex < $$l; itemIndex++) {
        var item = $$obj[itemIndex];
const link = item.link || 'change-me';

let itemClassName = 'navigation__item';
if (item.isActive) {
    itemClassName += ' navigation__item_active';
}

pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli" + (pug.attr("class", pug.classes([itemClassName], [true]), false, true)) + "\u003E";
if ((item.subitems)) {
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + ("\u003Cbutton class=\"navigation__link\"\u003E" + (pug.escape(null == (pug_interp = item.name) ? "" : pug_interp)));
pug_indent.push('        ');
pug_mixins["arrow"]({ withoutPadding: true });
pug_indent.pop();
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fbutton\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cul class=\"navigation__subitems\"\u003E";
// iterate item.subitems
;(function(){
  var $$obj = item.subitems;
  if ('number' == typeof $$obj.length) {
      for (var pug_index1 = 0, $$l = $$obj.length; pug_index1 < $$l; pug_index1++) {
        var subitem = $$obj[pug_index1];
pug_html = pug_html + "\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"navigation__subitem\"\u003E\u003Ca" + (" class=\"navigation__link\""+pug.attr("href", subitem.link || 'change-me', true, true)) + "\u003E" + (pug.escape(null == (pug_interp = subitem.name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index1 in $$obj) {
      $$l++;
      var subitem = $$obj[pug_index1];
pug_html = pug_html + "\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"navigation__subitem\"\u003E\u003Ca" + (" class=\"navigation__link\""+pug.attr("href", subitem.link || 'change-me', true, true)) + "\u003E" + (pug.escape(null == (pug_interp = subitem.name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Ful\u003E";
}
else {
pug_html = pug_html + "\u003Ca" + (" class=\"navigation__link\""+pug.attr("href", link, true, true)) + "\u003E" + (pug.escape(null == (pug_interp = item.name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E";
}
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var itemIndex in $$obj) {
      $$l++;
      var item = $$obj[itemIndex];
const link = item.link || 'change-me';

let itemClassName = 'navigation__item';
if (item.isActive) {
    itemClassName += ' navigation__item_active';
}

pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli" + (pug.attr("class", pug.classes([itemClassName], [true]), false, true)) + "\u003E";
if ((item.subitems)) {
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + ("\u003Cbutton class=\"navigation__link\"\u003E" + (pug.escape(null == (pug_interp = item.name) ? "" : pug_interp)));
pug_indent.push('        ');
pug_mixins["arrow"]({ withoutPadding: true });
pug_indent.pop();
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fbutton\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cul class=\"navigation__subitems\"\u003E";
// iterate item.subitems
;(function(){
  var $$obj = item.subitems;
  if ('number' == typeof $$obj.length) {
      for (var pug_index2 = 0, $$l = $$obj.length; pug_index2 < $$l; pug_index2++) {
        var subitem = $$obj[pug_index2];
pug_html = pug_html + "\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"navigation__subitem\"\u003E\u003Ca" + (" class=\"navigation__link\""+pug.attr("href", subitem.link || 'change-me', true, true)) + "\u003E" + (pug.escape(null == (pug_interp = subitem.name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index2 in $$obj) {
      $$l++;
      var subitem = $$obj[pug_index2];
pug_html = pug_html + "\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"navigation__subitem\"\u003E\u003Ca" + (" class=\"navigation__link\""+pug.attr("href", subitem.link || 'change-me', true, true)) + "\u003E" + (pug.escape(null == (pug_interp = subitem.name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Ful\u003E";
}
else {
pug_html = pug_html + "\u003Ca" + (" class=\"navigation__link\""+pug.attr("href", link, true, true)) + "\u003E" + (pug.escape(null == (pug_interp = item.name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E";
}
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Ful\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fnav\u003E";
};
pug_mixins["heading"] = pug_interp = function({ text = '', type = 'h3', color, withJs = false }){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'heading';
let tag;

switch (type) {
    case 'h3':
        className += ' heading_type_h3';
        tag = 'h3';
        break;
    case 'h2':
        className += ' heading_type_h2';
        tag = 'h2';
        break;
    case 'inline':
        className += ' heading_type_h3';
        tag = 'span';
        break;
    default:
        tag = 'h1';
        break;
}
switch (color) {
    case 'white':
        className += ' heading_color_white';
        break;
    case 'purple':
        className += ' heading_color_purple';
        break;
    case 'gray':
        className += ' heading_color_gray';
        break;
    case 'inherit':
        className += ' heading_color_inherit';
        break;
    default:
        break;
}
if (withJs) {
  className += ' js-heading';
}

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C" + (tag) + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = text) ? "" : pug_interp)) + "\u003C\u002F" + (tag) + "\u003E";
};
pug_mixins["arrow"] = pug_interp = function({ type, color, withoutPadding = false } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'arrow';
let iconName = 'expand_more';

switch (type) {
    case 'expand-less':
        iconName = 'expand_less';
        break;
    case 'forward':
        iconName = 'arrow_forward';
        break;
    default:
        break;
}

switch (color) {
    case 'white':
        className += ' arrow_color_white';
        break;
    case 'purple-gradient':
        className += ' arrow_color_purple-gradient';
        break;
    default:
        break;
}

if (withoutPadding) {
    className += ' arrow_without-padding';
}

pug_html = pug_html + "\u003Cspan" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = iconName) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
};
pug_mixins["text-field"] = pug_interp = function({ inputOptions = {}, arrowOptions, modifiers = {}, withJs = false } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'text-field';

if (modifiers.isFocused) {
    className += ' text-field_focused';
}
if (modifiers.isShort) {
    className += ' text-field_short';
}
if (modifiers.isBottomFlat) {
    className += ' text-field_flat-bottom';
}
if (modifiers.isClickable) {
    className += ' text-field_clickable';
}

if (withJs) {
    className += ' js-text-field';
}

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E";
let inputClassName = 'text-field__input';
if (arrowOptions) {
    inputClassName += ' text-field__input_with-arrow';
}
if (inputOptions.isMaskedDate) {
    inputClassName += ' text-field__input_masked-date js-text-field__input_masked-date'
}
if (inputOptions.withJs) {
    inputClassName += ' js-text-field__input';
}

pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cinput" + (pug.attr("class", pug.classes([inputClassName], [true]), false, true)+pug.attr("type", inputOptions.type, true, true)+pug.attr("placeholder", inputOptions.placeholder, true, true)+pug.attr("value", inputOptions.value, true, true)+pug.attr("readonly", inputOptions.isReadonly, true, true)) + "\u003E";
if ((arrowOptions)) {
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cbutton" + (" class=\"text-field__arrow\""+pug.attr("type", inputOptions.isSubmit ? 'submit' : 'button', true, true)) + "\u003E";
pug_indent.push('    ');
pug_mixins["arrow"](arrowOptions);
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fbutton\u003E";
}
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
};
pug_mixins["social-links"] = pug_interp = function(){
var block = (this && this.block), attributes = (this && this.attributes) || {};
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cul class=\"social-links\"\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"social-links__item\"\u003E\u003Ca class=\"social-links__link\" href=\"change-me\"\u003E\u003Cspan class=\"social-links__icon fab fa-twitter\"\u003E\u003C\u002Fspan\u003E\u003C\u002Fa\u003E\u003C\u002Fli\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"social-links__item\"\u003E\u003Ca class=\"social-links__link\" href=\"change-me\"\u003E\u003Cspan class=\"social-links__icon fab fa-facebook-square\"\u003E\u003C\u002Fspan\u003E\u003C\u002Fa\u003E\u003C\u002Fli\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"social-links__item\"\u003E\u003Ca class=\"social-links__link\" href=\"change-me\"\u003E\u003Cspan class=\"social-links__icon fab fa-instagram\"\u003E\u003C\u002Fspan\u003E\u003C\u002Fa\u003E\u003C\u002Fli\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Ful\u003E";
};




































































































    }.call(this, "pug_indent" in locals_for_with ?
        locals_for_with.pug_indent :
        typeof pug_indent !== 'undefined' ? pug_indent : undefined));
    ;;return pug_html;};
module.exports = template;

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(2);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;
    var locals_for_with = (locals || {});
    
    (function (pug_indent) {
      var pug_indent = [];
pug_mixins["arrow"] = pug_interp = function({ type, color, withoutPadding = false } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'arrow';
let iconName = 'expand_more';

switch (type) {
    case 'expand-less':
        iconName = 'expand_less';
        break;
    case 'forward':
        iconName = 'arrow_forward';
        break;
    default:
        break;
}

switch (color) {
    case 'white':
        className += ' arrow_color_white';
        break;
    case 'purple-gradient':
        className += ' arrow_color_purple-gradient';
        break;
    default:
        break;
}

if (withoutPadding) {
    className += ' arrow_without-padding';
}

pug_html = pug_html + "\u003Cspan" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = iconName) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
};
pug_mixins["heading"] = pug_interp = function({ text = '', type = 'h3', color, withJs = false }){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'heading';
let tag;

switch (type) {
    case 'h3':
        className += ' heading_type_h3';
        tag = 'h3';
        break;
    case 'h2':
        className += ' heading_type_h2';
        tag = 'h2';
        break;
    case 'inline':
        className += ' heading_type_h3';
        tag = 'span';
        break;
    default:
        tag = 'h1';
        break;
}
switch (color) {
    case 'white':
        className += ' heading_color_white';
        break;
    case 'purple':
        className += ' heading_color_purple';
        break;
    case 'gray':
        className += ' heading_color_gray';
        break;
    case 'inherit':
        className += ' heading_color_inherit';
        break;
    default:
        break;
}
if (withJs) {
  className += ' js-heading';
}

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C" + (tag) + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = text) ? "" : pug_interp)) + "\u003C\u002F" + (tag) + "\u003E";
};
pug_mixins["button"] = pug_interp = function(options = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
const {
    text = 'click me',
    hasLink = false,
    isSubmit = false,
    link = 'change-me',
    modifiers = {},
    withJs = false,
} = options;

let className = 'button';
let headingOptions = {
    text,
    type: 'inline',
    color: 'white',
};

if (hasLink) {
    headingOptions.type = 'h3';
}

if (modifiers.isSecondary) {
    className += ' button_secondary';
    headingOptions.color = 'purple';
}
if (modifiers.withoutFrame) {
    headingOptions.color = 'inherit';
    className += ' button_without-frame';
}
if (modifiers.isLong) {
    className += ' button_long';
}
if (modifiers.isHovered) {
    className += ' button_hovered';
}
if (modifiers.isNarrow) {
    className += ' button_narrow';
}
if (modifiers.isWide) {
    className += ' button_wide';
}
if (withJs) {
  className += ' js-button';
}

switch (modifiers.textColor) {
    case 'white':
        headingOptions.color = 'white';
        break;
    case 'purple':
        headingOptions.color = 'purple';
        break;
    case 'gray':
        headingOptions.color = 'gray';
        break;
    default:
        break;
}

if ((hasLink)) {
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E\u003Ca" + (" class=\"button__text\""+pug.attr("href", link, true, true)) + "\u003E";
pug_indent.push('    ');
pug_mixins["heading"](headingOptions);
pug_indent.pop();
pug_html = pug_html + "\u003C\u002Fa\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"button__arrow\"\u003E";
pug_indent.push('    ');
pug_mixins["arrow"]({
                  type: 'forward',
                  color: 'white',
                });
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
else {
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cbutton" + (pug.attr("class", pug.classes([className], [true]), false, true)+pug.attr("type", isSubmit ? 'submit' : 'button', true, true)) + "\u003E\u003Cspan class=\"button__text\"\u003E";
pug_indent.push('    ');
pug_mixins["heading"](headingOptions);
pug_indent.pop();
pug_html = pug_html + "\u003C\u002Fspan\u003E\u003Cspan class=\"button__arrow\"\u003E";
pug_indent.push('    ');
pug_mixins["arrow"]({
                    type: 'forward',
                    color: 'white',
                });
pug_indent.pop();
pug_html = pug_html + "\u003C\u002Fspan\u003E\u003C\u002Fbutton\u003E";
}
};
pug_mixins["arrow"] = pug_interp = function({ type, color, withoutPadding = false } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'arrow';
let iconName = 'expand_more';

switch (type) {
    case 'expand-less':
        iconName = 'expand_less';
        break;
    case 'forward':
        iconName = 'arrow_forward';
        break;
    default:
        break;
}

switch (color) {
    case 'white':
        className += ' arrow_color_white';
        break;
    case 'purple-gradient':
        className += ' arrow_color_purple-gradient';
        break;
    default:
        break;
}

if (withoutPadding) {
    className += ' arrow_without-padding';
}

pug_html = pug_html + "\u003Cspan" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = iconName) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
};
pug_mixins["navigation"] = pug_interp = function({ items, activeLinkIndex, inColumn = false, withJs = false }){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'navigation';
if (inColumn) {
    className += ' navigation_in-column';
}
if (withJs) {
    className += ' js-navigation';
}
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cnav" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cul class=\"navigation__list\"\u003E";
// iterate items
;(function(){
  var $$obj = items;
  if ('number' == typeof $$obj.length) {
      for (var itemIndex = 0, $$l = $$obj.length; itemIndex < $$l; itemIndex++) {
        var item = $$obj[itemIndex];
const link = item.link || 'change-me';

let itemClassName = 'navigation__item';
if (item.isActive) {
    itemClassName += ' navigation__item_active';
}

pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli" + (pug.attr("class", pug.classes([itemClassName], [true]), false, true)) + "\u003E";
if ((item.subitems)) {
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + ("\u003Cbutton class=\"navigation__link\"\u003E" + (pug.escape(null == (pug_interp = item.name) ? "" : pug_interp)));
pug_indent.push('        ');
pug_mixins["arrow"]({ withoutPadding: true });
pug_indent.pop();
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fbutton\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cul class=\"navigation__subitems\"\u003E";
// iterate item.subitems
;(function(){
  var $$obj = item.subitems;
  if ('number' == typeof $$obj.length) {
      for (var pug_index1 = 0, $$l = $$obj.length; pug_index1 < $$l; pug_index1++) {
        var subitem = $$obj[pug_index1];
pug_html = pug_html + "\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"navigation__subitem\"\u003E\u003Ca" + (" class=\"navigation__link\""+pug.attr("href", subitem.link || 'change-me', true, true)) + "\u003E" + (pug.escape(null == (pug_interp = subitem.name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index1 in $$obj) {
      $$l++;
      var subitem = $$obj[pug_index1];
pug_html = pug_html + "\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"navigation__subitem\"\u003E\u003Ca" + (" class=\"navigation__link\""+pug.attr("href", subitem.link || 'change-me', true, true)) + "\u003E" + (pug.escape(null == (pug_interp = subitem.name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Ful\u003E";
}
else {
pug_html = pug_html + "\u003Ca" + (" class=\"navigation__link\""+pug.attr("href", link, true, true)) + "\u003E" + (pug.escape(null == (pug_interp = item.name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E";
}
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var itemIndex in $$obj) {
      $$l++;
      var item = $$obj[itemIndex];
const link = item.link || 'change-me';

let itemClassName = 'navigation__item';
if (item.isActive) {
    itemClassName += ' navigation__item_active';
}

pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli" + (pug.attr("class", pug.classes([itemClassName], [true]), false, true)) + "\u003E";
if ((item.subitems)) {
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + ("\u003Cbutton class=\"navigation__link\"\u003E" + (pug.escape(null == (pug_interp = item.name) ? "" : pug_interp)));
pug_indent.push('        ');
pug_mixins["arrow"]({ withoutPadding: true });
pug_indent.pop();
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fbutton\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cul class=\"navigation__subitems\"\u003E";
// iterate item.subitems
;(function(){
  var $$obj = item.subitems;
  if ('number' == typeof $$obj.length) {
      for (var pug_index2 = 0, $$l = $$obj.length; pug_index2 < $$l; pug_index2++) {
        var subitem = $$obj[pug_index2];
pug_html = pug_html + "\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"navigation__subitem\"\u003E\u003Ca" + (" class=\"navigation__link\""+pug.attr("href", subitem.link || 'change-me', true, true)) + "\u003E" + (pug.escape(null == (pug_interp = subitem.name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index2 in $$obj) {
      $$l++;
      var subitem = $$obj[pug_index2];
pug_html = pug_html + "\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"navigation__subitem\"\u003E\u003Ca" + (" class=\"navigation__link\""+pug.attr("href", subitem.link || 'change-me', true, true)) + "\u003E" + (pug.escape(null == (pug_interp = subitem.name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Ful\u003E";
}
else {
pug_html = pug_html + "\u003Ca" + (" class=\"navigation__link\""+pug.attr("href", link, true, true)) + "\u003E" + (pug.escape(null == (pug_interp = item.name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E";
}
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Ful\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fnav\u003E";
};


















































    }.call(this, "pug_indent" in locals_for_with ?
        locals_for_with.pug_indent :
        typeof pug_indent !== 'undefined' ? pug_indent : undefined));
    ;;return pug_html;};
module.exports = template;

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(2);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_indent = [];






;return pug_html;};
module.exports = template;

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(2);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_indent = [];
































;return pug_html;};
module.exports = template;

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(2);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;
    var locals_for_with = (locals || {});
    
    (function (JSON, pug_indent) {
      var pug_indent = [];
pug_mixins["heading"] = pug_interp = function({ text = '', type = 'h3', color, withJs = false }){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'heading';
let tag;

switch (type) {
    case 'h3':
        className += ' heading_type_h3';
        tag = 'h3';
        break;
    case 'h2':
        className += ' heading_type_h2';
        tag = 'h2';
        break;
    case 'inline':
        className += ' heading_type_h3';
        tag = 'span';
        break;
    default:
        tag = 'h1';
        break;
}
switch (color) {
    case 'white':
        className += ' heading_color_white';
        break;
    case 'purple':
        className += ' heading_color_purple';
        break;
    case 'gray':
        className += ' heading_color_gray';
        break;
    case 'inherit':
        className += ' heading_color_inherit';
        break;
    default:
        break;
}
if (withJs) {
  className += ' js-heading';
}

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C" + (tag) + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = text) ? "" : pug_interp)) + "\u003C\u002F" + (tag) + "\u003E";
};
pug_mixins["counting-item"] = pug_interp = function({ name = '', value = 0, nameDeclensions } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv" + (" class=\"counting-item js-counting-item\""+pug.attr("data-words", nameDeclensions ? JSON.stringify(nameDeclensions) : false, true, true)) + "\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"counting-item__name js-counting-item__name\"\u003E";
pug_indent.push('    ');
pug_mixins["heading"]({
                text: name,
                withJs: true,
            });
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"counting-item__counter\"\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cbutton class=\"counting-item__change-button counting-item__change-button_action_decrease js-counting-item__change-button_action_decrease\" type=\"button\"\u003E-\u003C\u002Fbutton\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"counting-item__value js-counting-item__value\"\u003E";
pug_indent.push('      ');
pug_mixins["heading"]({
                    text: value,
                    withJs: true,
                });
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cbutton class=\"counting-item__change-button counting-item__change-button_action_increase js-counting-item__change-button_action_increase\" type=\"button\"\u003E+\u003C\u002Fbutton\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
};
pug_mixins["arrow"] = pug_interp = function({ type, color, withoutPadding = false } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'arrow';
let iconName = 'expand_more';

switch (type) {
    case 'expand-less':
        iconName = 'expand_less';
        break;
    case 'forward':
        iconName = 'arrow_forward';
        break;
    default:
        break;
}

switch (color) {
    case 'white':
        className += ' arrow_color_white';
        break;
    case 'purple-gradient':
        className += ' arrow_color_purple-gradient';
        break;
    default:
        break;
}

if (withoutPadding) {
    className += ' arrow_without-padding';
}

pug_html = pug_html + "\u003Cspan" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = iconName) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
};
pug_mixins["heading"] = pug_interp = function({ text = '', type = 'h3', color, withJs = false }){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'heading';
let tag;

switch (type) {
    case 'h3':
        className += ' heading_type_h3';
        tag = 'h3';
        break;
    case 'h2':
        className += ' heading_type_h2';
        tag = 'h2';
        break;
    case 'inline':
        className += ' heading_type_h3';
        tag = 'span';
        break;
    default:
        tag = 'h1';
        break;
}
switch (color) {
    case 'white':
        className += ' heading_color_white';
        break;
    case 'purple':
        className += ' heading_color_purple';
        break;
    case 'gray':
        className += ' heading_color_gray';
        break;
    case 'inherit':
        className += ' heading_color_inherit';
        break;
    default:
        break;
}
if (withJs) {
  className += ' js-heading';
}

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C" + (tag) + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = text) ? "" : pug_interp)) + "\u003C\u002F" + (tag) + "\u003E";
};
pug_mixins["button"] = pug_interp = function(options = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
const {
    text = 'click me',
    hasLink = false,
    isSubmit = false,
    link = 'change-me',
    modifiers = {},
    withJs = false,
} = options;

let className = 'button';
let headingOptions = {
    text,
    type: 'inline',
    color: 'white',
};

if (hasLink) {
    headingOptions.type = 'h3';
}

if (modifiers.isSecondary) {
    className += ' button_secondary';
    headingOptions.color = 'purple';
}
if (modifiers.withoutFrame) {
    headingOptions.color = 'inherit';
    className += ' button_without-frame';
}
if (modifiers.isLong) {
    className += ' button_long';
}
if (modifiers.isHovered) {
    className += ' button_hovered';
}
if (modifiers.isNarrow) {
    className += ' button_narrow';
}
if (modifiers.isWide) {
    className += ' button_wide';
}
if (withJs) {
  className += ' js-button';
}

switch (modifiers.textColor) {
    case 'white':
        headingOptions.color = 'white';
        break;
    case 'purple':
        headingOptions.color = 'purple';
        break;
    case 'gray':
        headingOptions.color = 'gray';
        break;
    default:
        break;
}

if ((hasLink)) {
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E\u003Ca" + (" class=\"button__text\""+pug.attr("href", link, true, true)) + "\u003E";
pug_indent.push('    ');
pug_mixins["heading"](headingOptions);
pug_indent.pop();
pug_html = pug_html + "\u003C\u002Fa\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"button__arrow\"\u003E";
pug_indent.push('    ');
pug_mixins["arrow"]({
                  type: 'forward',
                  color: 'white',
                });
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
else {
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cbutton" + (pug.attr("class", pug.classes([className], [true]), false, true)+pug.attr("type", isSubmit ? 'submit' : 'button', true, true)) + "\u003E\u003Cspan class=\"button__text\"\u003E";
pug_indent.push('    ');
pug_mixins["heading"](headingOptions);
pug_indent.pop();
pug_html = pug_html + "\u003C\u002Fspan\u003E\u003Cspan class=\"button__arrow\"\u003E";
pug_indent.push('    ');
pug_mixins["arrow"]({
                    type: 'forward',
                    color: 'white',
                });
pug_indent.pop();
pug_html = pug_html + "\u003C\u002Fspan\u003E\u003C\u002Fbutton\u003E";
}
};


























































    }.call(this, "JSON" in locals_for_with ?
        locals_for_with.JSON :
        typeof JSON !== 'undefined' ? JSON : undefined, "pug_indent" in locals_for_with ?
        locals_for_with.pug_indent :
        typeof pug_indent !== 'undefined' ? pug_indent : undefined));
    ;;return pug_html;};
module.exports = template;

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(2);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_indent = [];






;return pug_html;};
module.exports = template;

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(2);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_indent = [];
pug_mixins["arrow"] = pug_interp = function({ type, color, withoutPadding = false } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'arrow';
let iconName = 'expand_more';

switch (type) {
    case 'expand-less':
        iconName = 'expand_less';
        break;
    case 'forward':
        iconName = 'arrow_forward';
        break;
    default:
        break;
}

switch (color) {
    case 'white':
        className += ' arrow_color_white';
        break;
    case 'purple-gradient':
        className += ' arrow_color_purple-gradient';
        break;
    default:
        break;
}

if (withoutPadding) {
    className += ' arrow_without-padding';
}

pug_html = pug_html + "\u003Cspan" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = iconName) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
};































































































;return pug_html;};
module.exports = template;

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(2);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_indent = [];











;return pug_html;};
module.exports = template;

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(2);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_indent = [];


































;return pug_html;};
module.exports = template;

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(2);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;
    var locals_for_with = (locals || {});
    
    (function (pug_indent) {
      var pug_indent = [];
pug_mixins["heading"] = pug_interp = function({ text = '', type = 'h3', color, withJs = false }){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'heading';
let tag;

switch (type) {
    case 'h3':
        className += ' heading_type_h3';
        tag = 'h3';
        break;
    case 'h2':
        className += ' heading_type_h2';
        tag = 'h2';
        break;
    case 'inline':
        className += ' heading_type_h3';
        tag = 'span';
        break;
    default:
        tag = 'h1';
        break;
}
switch (color) {
    case 'white':
        className += ' heading_color_white';
        break;
    case 'purple':
        className += ' heading_color_purple';
        break;
    case 'gray':
        className += ' heading_color_gray';
        break;
    case 'inherit':
        className += ' heading_color_inherit';
        break;
    default:
        break;
}
if (withJs) {
  className += ' js-heading';
}

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C" + (tag) + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = text) ? "" : pug_interp)) + "\u003C\u002F" + (tag) + "\u003E";
};


























    }.call(this, "pug_indent" in locals_for_with ?
        locals_for_with.pug_indent :
        typeof pug_indent !== 'undefined' ? pug_indent : undefined));
    ;;return pug_html;};
module.exports = template;

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(2);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_indent = [];















;return pug_html;};
module.exports = template;

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(2);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;
    var locals_for_with = (locals || {});
    
    (function (pug_indent) {
      var pug_indent = [];
pug_mixins["heading"] = pug_interp = function({ text = '', type = 'h3', color, withJs = false }){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'heading';
let tag;

switch (type) {
    case 'h3':
        className += ' heading_type_h3';
        tag = 'h3';
        break;
    case 'h2':
        className += ' heading_type_h2';
        tag = 'h2';
        break;
    case 'inline':
        className += ' heading_type_h3';
        tag = 'span';
        break;
    default:
        tag = 'h1';
        break;
}
switch (color) {
    case 'white':
        className += ' heading_color_white';
        break;
    case 'purple':
        className += ' heading_color_purple';
        break;
    case 'gray':
        className += ' heading_color_gray';
        break;
    case 'inherit':
        className += ' heading_color_inherit';
        break;
    default:
        break;
}
if (withJs) {
  className += ' js-heading';
}

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C" + (tag) + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = text) ? "" : pug_interp)) + "\u003C\u002F" + (tag) + "\u003E";
};
pug_mixins["room-info"] = pug_interp = function({ number, type, price, isNameBig = false }){
var block = (this && this.block), attributes = (this && this.attributes) || {};
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv" + (pug.attr("class", pug.classes([`room-info${isNameBig ? ' room-info_size_big' : ''}`], [true]), false, true)) + "\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cheader class=\"room-info__name\"\u003E\u003Cspan class=\"room-info__number-sign\"\u003E№\u003C\u002Fspan\u003E";
if ((isNameBig)) {
pug_indent.push('    ');
pug_mixins["heading"]({
                  text: number,
                  type: 'h1',
                });
pug_indent.pop();
}
else {
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Ch3 class=\"room-info__number\"\u003E" + (pug.escape(null == (pug_interp = number) ? "" : pug_interp)) + "\u003C\u002Fh3\u003E";
}
if ((type)) {
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"room-info__type\"\u003E";
pug_indent.push('      ');
pug_mixins["heading"]({
                        text: type,
                        color: 'purple',
                    });
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fheader\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cp class=\"room-info__price\"\u003E" + (pug.escape(null == (pug_interp = `${price}₽`) ? "" : pug_interp)) + "\u003Cspan class=\"room-info__price-measure\"\u003Eв сутки\u003C\u002Fspan\u003E\u003C\u002Fp\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
};
pug_mixins["rate-button"] = pug_interp = function(currentRating){
var block = (this && this.block), attributes = (this && this.attributes) || {};
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cul class=\"rate-button\"\u003E";
for (let i = 1; i <= 5; i += 1)
{
const active = i <= currentRating;
let className = 'material-icons rate-button__star';
if (active) {
    className += ' rate-button__star_active';
}
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E\u003C\u002Fli\u003E";
}
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Ful\u003E";
};










































    }.call(this, "pug_indent" in locals_for_with ?
        locals_for_with.pug_indent :
        typeof pug_indent !== 'undefined' ? pug_indent : undefined));
    ;;return pug_html;};
module.exports = template;

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(2);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;
    var locals_for_with = (locals || {});
    
    (function (pug_indent) {
      var pug_indent = [];
pug_mixins["heading"] = pug_interp = function({ text = '', type = 'h3', color, withJs = false }){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'heading';
let tag;

switch (type) {
    case 'h3':
        className += ' heading_type_h3';
        tag = 'h3';
        break;
    case 'h2':
        className += ' heading_type_h2';
        tag = 'h2';
        break;
    case 'inline':
        className += ' heading_type_h3';
        tag = 'span';
        break;
    default:
        tag = 'h1';
        break;
}
switch (color) {
    case 'white':
        className += ' heading_color_white';
        break;
    case 'purple':
        className += ' heading_color_purple';
        break;
    case 'gray':
        className += ' heading_color_gray';
        break;
    case 'inherit':
        className += ' heading_color_inherit';
        break;
    default:
        break;
}
if (withJs) {
  className += ' js-heading';
}

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C" + (tag) + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = text) ? "" : pug_interp)) + "\u003C\u002F" + (tag) + "\u003E";
};




































    }.call(this, "pug_indent" in locals_for_with ?
        locals_for_with.pug_indent :
        typeof pug_indent !== 'undefined' ? pug_indent : undefined));
    ;;return pug_html;};
module.exports = template;

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(2);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;
    var locals_for_with = (locals || {});
    
    (function (Array, JSON, pug_indent) {
      var pug_indent = [];
pug_mixins["heading"] = pug_interp = function({ text = '', type = 'h3', color, withJs = false }){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'heading';
let tag;

switch (type) {
    case 'h3':
        className += ' heading_type_h3';
        tag = 'h3';
        break;
    case 'h2':
        className += ' heading_type_h2';
        tag = 'h2';
        break;
    case 'inline':
        className += ' heading_type_h3';
        tag = 'span';
        break;
    default:
        tag = 'h1';
        break;
}
switch (color) {
    case 'white':
        className += ' heading_color_white';
        break;
    case 'purple':
        className += ' heading_color_purple';
        break;
    case 'gray':
        className += ' heading_color_gray';
        break;
    case 'inherit':
        className += ' heading_color_inherit';
        break;
    default:
        break;
}
if (withJs) {
  className += ' js-heading';
}

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C" + (tag) + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = text) ? "" : pug_interp)) + "\u003C\u002F" + (tag) + "\u003E";
};
pug_mixins["arrow"] = pug_interp = function({ type, color, withoutPadding = false } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'arrow';
let iconName = 'expand_more';

switch (type) {
    case 'expand-less':
        iconName = 'expand_less';
        break;
    case 'forward':
        iconName = 'arrow_forward';
        break;
    default:
        break;
}

switch (color) {
    case 'white':
        className += ' arrow_color_white';
        break;
    case 'purple-gradient':
        className += ' arrow_color_purple-gradient';
        break;
    default:
        break;
}

if (withoutPadding) {
    className += ' arrow_without-padding';
}

pug_html = pug_html + "\u003Cspan" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = iconName) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
};
pug_mixins["heading"] = pug_interp = function({ text = '', type = 'h3', color, withJs = false }){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'heading';
let tag;

switch (type) {
    case 'h3':
        className += ' heading_type_h3';
        tag = 'h3';
        break;
    case 'h2':
        className += ' heading_type_h2';
        tag = 'h2';
        break;
    case 'inline':
        className += ' heading_type_h3';
        tag = 'span';
        break;
    default:
        tag = 'h1';
        break;
}
switch (color) {
    case 'white':
        className += ' heading_color_white';
        break;
    case 'purple':
        className += ' heading_color_purple';
        break;
    case 'gray':
        className += ' heading_color_gray';
        break;
    case 'inherit':
        className += ' heading_color_inherit';
        break;
    default:
        break;
}
if (withJs) {
  className += ' js-heading';
}

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C" + (tag) + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = text) ? "" : pug_interp)) + "\u003C\u002F" + (tag) + "\u003E";
};
pug_mixins["button"] = pug_interp = function(options = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
const {
    text = 'click me',
    hasLink = false,
    isSubmit = false,
    link = 'change-me',
    modifiers = {},
    withJs = false,
} = options;

let className = 'button';
let headingOptions = {
    text,
    type: 'inline',
    color: 'white',
};

if (hasLink) {
    headingOptions.type = 'h3';
}

if (modifiers.isSecondary) {
    className += ' button_secondary';
    headingOptions.color = 'purple';
}
if (modifiers.withoutFrame) {
    headingOptions.color = 'inherit';
    className += ' button_without-frame';
}
if (modifiers.isLong) {
    className += ' button_long';
}
if (modifiers.isHovered) {
    className += ' button_hovered';
}
if (modifiers.isNarrow) {
    className += ' button_narrow';
}
if (modifiers.isWide) {
    className += ' button_wide';
}
if (withJs) {
  className += ' js-button';
}

switch (modifiers.textColor) {
    case 'white':
        headingOptions.color = 'white';
        break;
    case 'purple':
        headingOptions.color = 'purple';
        break;
    case 'gray':
        headingOptions.color = 'gray';
        break;
    default:
        break;
}

if ((hasLink)) {
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E\u003Ca" + (" class=\"button__text\""+pug.attr("href", link, true, true)) + "\u003E";
pug_indent.push('    ');
pug_mixins["heading"](headingOptions);
pug_indent.pop();
pug_html = pug_html + "\u003C\u002Fa\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"button__arrow\"\u003E";
pug_indent.push('    ');
pug_mixins["arrow"]({
                  type: 'forward',
                  color: 'white',
                });
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
else {
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cbutton" + (pug.attr("class", pug.classes([className], [true]), false, true)+pug.attr("type", isSubmit ? 'submit' : 'button', true, true)) + "\u003E\u003Cspan class=\"button__text\"\u003E";
pug_indent.push('    ');
pug_mixins["heading"](headingOptions);
pug_indent.pop();
pug_html = pug_html + "\u003C\u002Fspan\u003E\u003Cspan class=\"button__arrow\"\u003E";
pug_indent.push('    ');
pug_mixins["arrow"]({
                    type: 'forward',
                    color: 'white',
                });
pug_indent.pop();
pug_html = pug_html + "\u003C\u002Fspan\u003E\u003C\u002Fbutton\u003E";
}
};
pug_mixins["date-picker"] = pug_interp = function(options = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
const {
    withBorder = false,
    dateFormat = null,
    initialDate = [null, null],
    isTextDouble = false,
} = options;

let className = 'date-picker js-date-picker';
if (withBorder) {
    className += ' date-picker_with-border';
}
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv" + (pug.attr("class", pug.classes([className], [true]), false, true)+pug.attr("data-date-format", dateFormat, true, true)+pug.attr("data-initial-date", initialDate, true, true)+pug.attr("data-is-text-double", isTextDouble ? 'true' : 'false', true, true)) + "\u003E\u003C\u002Fdiv\u003E";
};
pug_mixins["heading"] = pug_interp = function({ text = '', type = 'h3', color, withJs = false }){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'heading';
let tag;

switch (type) {
    case 'h3':
        className += ' heading_type_h3';
        tag = 'h3';
        break;
    case 'h2':
        className += ' heading_type_h2';
        tag = 'h2';
        break;
    case 'inline':
        className += ' heading_type_h3';
        tag = 'span';
        break;
    default:
        tag = 'h1';
        break;
}
switch (color) {
    case 'white':
        className += ' heading_color_white';
        break;
    case 'purple':
        className += ' heading_color_purple';
        break;
    case 'gray':
        className += ' heading_color_gray';
        break;
    case 'inherit':
        className += ' heading_color_inherit';
        break;
    default:
        break;
}
if (withJs) {
  className += ' js-heading';
}

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C" + (tag) + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = text) ? "" : pug_interp)) + "\u003C\u002F" + (tag) + "\u003E";
};
pug_mixins["counting-item"] = pug_interp = function({ name = '', value = 0, nameDeclensions } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv" + (" class=\"counting-item js-counting-item\""+pug.attr("data-words", nameDeclensions ? JSON.stringify(nameDeclensions) : false, true, true)) + "\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"counting-item__name js-counting-item__name\"\u003E";
pug_indent.push('    ');
pug_mixins["heading"]({
                text: name,
                withJs: true,
            });
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"counting-item__counter\"\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cbutton class=\"counting-item__change-button counting-item__change-button_action_decrease js-counting-item__change-button_action_decrease\" type=\"button\"\u003E-\u003C\u002Fbutton\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"counting-item__value js-counting-item__value\"\u003E";
pug_indent.push('      ');
pug_mixins["heading"]({
                    text: value,
                    withJs: true,
                });
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cbutton class=\"counting-item__change-button counting-item__change-button_action_increase js-counting-item__change-button_action_increase\" type=\"button\"\u003E+\u003C\u002Fbutton\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
};
pug_mixins["arrow"] = pug_interp = function({ type, color, withoutPadding = false } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'arrow';
let iconName = 'expand_more';

switch (type) {
    case 'expand-less':
        iconName = 'expand_less';
        break;
    case 'forward':
        iconName = 'arrow_forward';
        break;
    default:
        break;
}

switch (color) {
    case 'white':
        className += ' arrow_color_white';
        break;
    case 'purple-gradient':
        className += ' arrow_color_purple-gradient';
        break;
    default:
        break;
}

if (withoutPadding) {
    className += ' arrow_without-padding';
}

pug_html = pug_html + "\u003Cspan" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = iconName) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
};
pug_mixins["heading"] = pug_interp = function({ text = '', type = 'h3', color, withJs = false }){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'heading';
let tag;

switch (type) {
    case 'h3':
        className += ' heading_type_h3';
        tag = 'h3';
        break;
    case 'h2':
        className += ' heading_type_h2';
        tag = 'h2';
        break;
    case 'inline':
        className += ' heading_type_h3';
        tag = 'span';
        break;
    default:
        tag = 'h1';
        break;
}
switch (color) {
    case 'white':
        className += ' heading_color_white';
        break;
    case 'purple':
        className += ' heading_color_purple';
        break;
    case 'gray':
        className += ' heading_color_gray';
        break;
    case 'inherit':
        className += ' heading_color_inherit';
        break;
    default:
        break;
}
if (withJs) {
  className += ' js-heading';
}

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C" + (tag) + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = text) ? "" : pug_interp)) + "\u003C\u002F" + (tag) + "\u003E";
};
pug_mixins["button"] = pug_interp = function(options = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
const {
    text = 'click me',
    hasLink = false,
    isSubmit = false,
    link = 'change-me',
    modifiers = {},
    withJs = false,
} = options;

let className = 'button';
let headingOptions = {
    text,
    type: 'inline',
    color: 'white',
};

if (hasLink) {
    headingOptions.type = 'h3';
}

if (modifiers.isSecondary) {
    className += ' button_secondary';
    headingOptions.color = 'purple';
}
if (modifiers.withoutFrame) {
    headingOptions.color = 'inherit';
    className += ' button_without-frame';
}
if (modifiers.isLong) {
    className += ' button_long';
}
if (modifiers.isHovered) {
    className += ' button_hovered';
}
if (modifiers.isNarrow) {
    className += ' button_narrow';
}
if (modifiers.isWide) {
    className += ' button_wide';
}
if (withJs) {
  className += ' js-button';
}

switch (modifiers.textColor) {
    case 'white':
        headingOptions.color = 'white';
        break;
    case 'purple':
        headingOptions.color = 'purple';
        break;
    case 'gray':
        headingOptions.color = 'gray';
        break;
    default:
        break;
}

if ((hasLink)) {
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E\u003Ca" + (" class=\"button__text\""+pug.attr("href", link, true, true)) + "\u003E";
pug_indent.push('    ');
pug_mixins["heading"](headingOptions);
pug_indent.pop();
pug_html = pug_html + "\u003C\u002Fa\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"button__arrow\"\u003E";
pug_indent.push('    ');
pug_mixins["arrow"]({
                  type: 'forward',
                  color: 'white',
                });
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
else {
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cbutton" + (pug.attr("class", pug.classes([className], [true]), false, true)+pug.attr("type", isSubmit ? 'submit' : 'button', true, true)) + "\u003E\u003Cspan class=\"button__text\"\u003E";
pug_indent.push('    ');
pug_mixins["heading"](headingOptions);
pug_indent.pop();
pug_html = pug_html + "\u003C\u002Fspan\u003E\u003Cspan class=\"button__arrow\"\u003E";
pug_indent.push('    ');
pug_mixins["arrow"]({
                    type: 'forward',
                    color: 'white',
                });
pug_indent.pop();
pug_html = pug_html + "\u003C\u002Fspan\u003E\u003C\u002Fbutton\u003E";
}
};
pug_mixins["items-counter"] = pug_interp = function(options = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
const {
    items,
    withoutButtons = false,
    wordForValueTextReplacing = null,
    itemIndexForSeparateCount = null,
} = options;

let className = 'items-counter js-items-counter';
if (withoutButtons) {
    className += ' items-counter_without-buttons';
}
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv" + (pug.attr("class", pug.classes([className], [true]), false, true)+pug.attr("data-replace-text", JSON.stringify(wordForValueTextReplacing), true, true)+pug.attr("data-separate-item", JSON.stringify(itemIndexForSeparateCount), true, true)) + "\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cul class=\"items-counter__items-list\"\u003E";
// iterate items
;(function(){
  var $$obj = items;
  if ('number' == typeof $$obj.length) {
      for (var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++) {
        var item = $$obj[pug_index0];
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"items-counter__item\"\u003E";
pug_indent.push('      ');
pug_mixins["counting-item"]({
                        name: item.name,
                        value: item.value,
                        nameDeclensions: item.nameDeclensions,
                    });
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index0 in $$obj) {
      $$l++;
      var item = $$obj[pug_index0];
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"items-counter__item\"\u003E";
pug_indent.push('      ');
pug_mixins["counting-item"]({
                        name: item.name,
                        value: item.value,
                        nameDeclensions: item.nameDeclensions,
                    });
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Ful\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"items-counter__button-panel\"\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"items-counter__clear-button js-items-counter__clear-button\"\u003E";
pug_indent.push('      ');
pug_mixins["button"]({
                    text: 'Очистить',
                    hasLink: false,
                    modifiers: {
                        withoutFrame: true,
                    }
                });
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"items-counter__apply-button js-items-counter__apply-button\"\u003E";
pug_indent.push('      ');
pug_mixins["button"]({
                    text: 'Применить',
                    hasLink: false,
                    modifiers: {
                        withoutFrame: true,
                    }
                });
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
};
pug_mixins["arrow"] = pug_interp = function({ type, color, withoutPadding = false } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'arrow';
let iconName = 'expand_more';

switch (type) {
    case 'expand-less':
        iconName = 'expand_less';
        break;
    case 'forward':
        iconName = 'arrow_forward';
        break;
    default:
        break;
}

switch (color) {
    case 'white':
        className += ' arrow_color_white';
        break;
    case 'purple-gradient':
        className += ' arrow_color_purple-gradient';
        break;
    default:
        break;
}

if (withoutPadding) {
    className += ' arrow_without-padding';
}

pug_html = pug_html + "\u003Cspan" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = iconName) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
};
pug_mixins["text-field"] = pug_interp = function({ inputOptions = {}, arrowOptions, modifiers = {}, withJs = false } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'text-field';

if (modifiers.isFocused) {
    className += ' text-field_focused';
}
if (modifiers.isShort) {
    className += ' text-field_short';
}
if (modifiers.isBottomFlat) {
    className += ' text-field_flat-bottom';
}
if (modifiers.isClickable) {
    className += ' text-field_clickable';
}

if (withJs) {
    className += ' js-text-field';
}

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E";
let inputClassName = 'text-field__input';
if (arrowOptions) {
    inputClassName += ' text-field__input_with-arrow';
}
if (inputOptions.isMaskedDate) {
    inputClassName += ' text-field__input_masked-date js-text-field__input_masked-date'
}
if (inputOptions.withJs) {
    inputClassName += ' js-text-field__input';
}

pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cinput" + (pug.attr("class", pug.classes([inputClassName], [true]), false, true)+pug.attr("type", inputOptions.type, true, true)+pug.attr("placeholder", inputOptions.placeholder, true, true)+pug.attr("value", inputOptions.value, true, true)+pug.attr("readonly", inputOptions.isReadonly, true, true)) + "\u003E";
if ((arrowOptions)) {
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cbutton" + (" class=\"text-field__arrow\""+pug.attr("type", inputOptions.isSubmit ? 'submit' : 'button', true, true)) + "\u003E";
pug_indent.push('    ');
pug_mixins["arrow"](arrowOptions);
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fbutton\u003E";
}
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
};
pug_mixins["dropdown"] = pug_interp = function(options = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let {
    inputOptions = {},
    popupMixinOptions = {},
    popupHidden = true,
    title,
    isDouble = false,
    isShort = false,
    isPopupDistant = false,
    defaultInputValue = '',
} = options;

let className = 'dropdown js-dropdown';
if (isDouble) {
    className += ' dropdown_double';
}
if (isShort) {
  className += ' dropdown_short';
}
if (isPopupDistant) {
  className += ' dropdown_with-distant-popup';
}

if (isDouble) {
    if (!Array.isArray(title)) {
        title = [title, title];
    }
    if (!Array.isArray(inputOptions)) {
        inputOptions = [inputOptions, inputOptions];
    }
}
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Csection" + (pug.attr("class", pug.classes([className], [true]), false, true)+pug.attr("data-default-value", JSON.stringify(defaultInputValue), true, true)) + "\u003E";
if ((isDouble)) {
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"dropdown__text-field js-dropdown__text-field\"\u003E";
if ((title[0])) {
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"dropdown__title\"\u003E";
pug_indent.push('      ');
pug_mixins["heading"]({
                            text: title[0],
                        });
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
pug_indent.push('    ');
pug_mixins["text-field"]({
                    inputOptions: {
                        ...inputOptions[0],
                        isMaskedDate: false,
                        isReadonly: true,
                        withJs: true,
                    },
                    arrowOptions: {},
                    modifiers: {
                        isFocused: !popupHidden,
                        isBottomFlat: !popupHidden,
                        isClickable: true,
                    },
                    withJs: true,
                });
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"dropdown__text-field js-dropdown__text-field\"\u003E";
if ((title[1])) {
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"dropdown__title\"\u003E";
pug_indent.push('      ');
pug_mixins["heading"]({
                            text: title[1],
                        });
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
pug_indent.push('    ');
pug_mixins["text-field"]({
                    inputOptions: {
                        ...inputOptions[1],
                        isMaskedDate: false,
                        isReadonly: true,
                        withJs: true,
                    },
                    arrowOptions: {},
                    modifiers: {
                        isFocused: !popupHidden,
                        isBottomFlat: !popupHidden,
                        isClickable: true,
                    },
                    withJs: true,
                });
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
else {
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"dropdown__text-field js-dropdown__text-field\"\u003E";
if ((title)) {
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"dropdown__title\"\u003E";
pug_indent.push('      ');
pug_mixins["heading"]({
                            text: title,
                        });
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
pug_indent.push('    ');
pug_mixins["text-field"]({
                    inputOptions: {
                        ...inputOptions,
                        isMaskedDate: false,
                        isReadonly: true,
                        withJs: true,
                    },
                    arrowOptions: {},
                    modifiers: {
                        isFocused: !popupHidden,
                        isBottomFlat: !popupHidden,
                        isClickable: true,
                    },
                    withJs: true,
                });
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv" + (pug.attr("class", pug.classes(["dropdown__popup","js-dropdown__popup",`${popupHidden ? 'dropdown__popup_hidden' : false}`], [false,false,true]), false, true)) + "\u003E";
if ((popupMixinOptions.name)) {
pug_indent.push('    ');
pug_mixins[popupMixinOptions.name](popupMixinOptions.params);
pug_indent.pop();
}
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fsection\u003E";
};
pug_mixins["search-card"] = pug_interp = function(){
var block = (this && this.block), attributes = (this && this.attributes) || {};
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Carticle class=\"search-card js-search-card\"\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cform\u003E";
pug_indent.push('    ');
pug_mixins["heading"]({
                type: 'h1',
                text: 'Найдём номера под ваши пожелания',
            });
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"search-card__dates js-search-card__dates\"\u003E";
pug_indent.push('      ');
pug_mixins["dropdown"]({
                    inputOptions: {
                        value: 'ДД.ММ.ГГГГ',
                        placeholder: 'ДД.ММ.ГГГГ',
                    },
                    popupMixinOptions: {
                        name: 'date-picker',
                        params: {
                            isTextDouble: true,
                        },
                    },
                    title: ['Прибытие', 'Выезд'],
                    isDouble: true,
                    isPopupDistant: true,
                    defaultInputValue: 'ДД.ММ.ГГГГ',
                });
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"search-card__guests js-search-card__guests\"\u003E";
pug_indent.push('      ');
pug_mixins["dropdown"]({
                    inputOptions: {
                        value: 'Сколько гостей',
                        placeholder: 'Сколько гостей',
                    },
                    popupMixinOptions: {
                        name: 'items-counter',
                        params: {
                            items: [
                                {
                                    name: 'Взрослые',
                                    value: '0',
                                },
                                {
                                    name: 'Дети',
                                    value: '0',
                                },
                                {
                                    name: 'Младенцы',
                                    value: '0',
                                    nameDeclensions: ['младенец', 'младенца', 'младенцев'],
                                },
                            ],
                            wordForValueTextReplacing: ['гость', 'гостя', 'гостей'],
                            itemIndexForSeparateCount: 2,
                        },
                    },
                    title: 'Гости',
                    defaultInputValue: 'Сколько гостей',
                });
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
pug_indent.push('    ');
pug_mixins["button"]({
                text: 'Подобрать номер',
                hasLink: true,
                link: 'search-room.html',
                modifiers: {
                    isLong: true,
                    textColor: 'white',
                },
            });
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fform\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Farticle\u003E";
};
    }.call(this, "Array" in locals_for_with ?
        locals_for_with.Array :
        typeof Array !== 'undefined' ? Array : undefined, "JSON" in locals_for_with ?
        locals_for_with.JSON :
        typeof JSON !== 'undefined' ? JSON : undefined, "pug_indent" in locals_for_with ?
        locals_for_with.pug_indent :
        typeof pug_indent !== 'undefined' ? pug_indent : undefined));
    ;;return pug_html;};
module.exports = template;

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(2);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;
    var locals_for_with = (locals || {});
    
    (function (pug_indent) {
      var pug_indent = [];
pug_mixins["heading"] = pug_interp = function({ text = '', type = 'h3', color, withJs = false }){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'heading';
let tag;

switch (type) {
    case 'h3':
        className += ' heading_type_h3';
        tag = 'h3';
        break;
    case 'h2':
        className += ' heading_type_h2';
        tag = 'h2';
        break;
    case 'inline':
        className += ' heading_type_h3';
        tag = 'span';
        break;
    default:
        tag = 'h1';
        break;
}
switch (color) {
    case 'white':
        className += ' heading_color_white';
        break;
    case 'purple':
        className += ' heading_color_purple';
        break;
    case 'gray':
        className += ' heading_color_gray';
        break;
    case 'inherit':
        className += ' heading_color_inherit';
        break;
    default:
        break;
}
if (withJs) {
  className += ' js-heading';
}

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C" + (tag) + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = text) ? "" : pug_interp)) + "\u003C\u002F" + (tag) + "\u003E";
};
pug_mixins["arrow"] = pug_interp = function({ type, color, withoutPadding = false } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'arrow';
let iconName = 'expand_more';

switch (type) {
    case 'expand-less':
        iconName = 'expand_less';
        break;
    case 'forward':
        iconName = 'arrow_forward';
        break;
    default:
        break;
}

switch (color) {
    case 'white':
        className += ' arrow_color_white';
        break;
    case 'purple-gradient':
        className += ' arrow_color_purple-gradient';
        break;
    default:
        break;
}

if (withoutPadding) {
    className += ' arrow_without-padding';
}

pug_html = pug_html + "\u003Cspan" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = iconName) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
};
pug_mixins["heading"] = pug_interp = function({ text = '', type = 'h3', color, withJs = false }){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'heading';
let tag;

switch (type) {
    case 'h3':
        className += ' heading_type_h3';
        tag = 'h3';
        break;
    case 'h2':
        className += ' heading_type_h2';
        tag = 'h2';
        break;
    case 'inline':
        className += ' heading_type_h3';
        tag = 'span';
        break;
    default:
        tag = 'h1';
        break;
}
switch (color) {
    case 'white':
        className += ' heading_color_white';
        break;
    case 'purple':
        className += ' heading_color_purple';
        break;
    case 'gray':
        className += ' heading_color_gray';
        break;
    case 'inherit':
        className += ' heading_color_inherit';
        break;
    default:
        break;
}
if (withJs) {
  className += ' js-heading';
}

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C" + (tag) + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = text) ? "" : pug_interp)) + "\u003C\u002F" + (tag) + "\u003E";
};
pug_mixins["button"] = pug_interp = function(options = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
const {
    text = 'click me',
    hasLink = false,
    isSubmit = false,
    link = 'change-me',
    modifiers = {},
    withJs = false,
} = options;

let className = 'button';
let headingOptions = {
    text,
    type: 'inline',
    color: 'white',
};

if (hasLink) {
    headingOptions.type = 'h3';
}

if (modifiers.isSecondary) {
    className += ' button_secondary';
    headingOptions.color = 'purple';
}
if (modifiers.withoutFrame) {
    headingOptions.color = 'inherit';
    className += ' button_without-frame';
}
if (modifiers.isLong) {
    className += ' button_long';
}
if (modifiers.isHovered) {
    className += ' button_hovered';
}
if (modifiers.isNarrow) {
    className += ' button_narrow';
}
if (modifiers.isWide) {
    className += ' button_wide';
}
if (withJs) {
  className += ' js-button';
}

switch (modifiers.textColor) {
    case 'white':
        headingOptions.color = 'white';
        break;
    case 'purple':
        headingOptions.color = 'purple';
        break;
    case 'gray':
        headingOptions.color = 'gray';
        break;
    default:
        break;
}

if ((hasLink)) {
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E\u003Ca" + (" class=\"button__text\""+pug.attr("href", link, true, true)) + "\u003E";
pug_indent.push('    ');
pug_mixins["heading"](headingOptions);
pug_indent.pop();
pug_html = pug_html + "\u003C\u002Fa\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"button__arrow\"\u003E";
pug_indent.push('    ');
pug_mixins["arrow"]({
                  type: 'forward',
                  color: 'white',
                });
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
else {
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cbutton" + (pug.attr("class", pug.classes([className], [true]), false, true)+pug.attr("type", isSubmit ? 'submit' : 'button', true, true)) + "\u003E\u003Cspan class=\"button__text\"\u003E";
pug_indent.push('    ');
pug_mixins["heading"](headingOptions);
pug_indent.pop();
pug_html = pug_html + "\u003C\u002Fspan\u003E\u003Cspan class=\"button__arrow\"\u003E";
pug_indent.push('    ');
pug_mixins["arrow"]({
                    type: 'forward',
                    color: 'white',
                });
pug_indent.pop();
pug_html = pug_html + "\u003C\u002Fspan\u003E\u003C\u002Fbutton\u003E";
}
};
pug_mixins["arrow"] = pug_interp = function({ type, color, withoutPadding = false } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'arrow';
let iconName = 'expand_more';

switch (type) {
    case 'expand-less':
        iconName = 'expand_less';
        break;
    case 'forward':
        iconName = 'arrow_forward';
        break;
    default:
        break;
}

switch (color) {
    case 'white':
        className += ' arrow_color_white';
        break;
    case 'purple-gradient':
        className += ' arrow_color_purple-gradient';
        break;
    default:
        break;
}

if (withoutPadding) {
    className += ' arrow_without-padding';
}

pug_html = pug_html + "\u003Cspan" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = iconName) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
};
pug_mixins["text-field"] = pug_interp = function({ inputOptions = {}, arrowOptions, modifiers = {}, withJs = false } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'text-field';

if (modifiers.isFocused) {
    className += ' text-field_focused';
}
if (modifiers.isShort) {
    className += ' text-field_short';
}
if (modifiers.isBottomFlat) {
    className += ' text-field_flat-bottom';
}
if (modifiers.isClickable) {
    className += ' text-field_clickable';
}

if (withJs) {
    className += ' js-text-field';
}

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E";
let inputClassName = 'text-field__input';
if (arrowOptions) {
    inputClassName += ' text-field__input_with-arrow';
}
if (inputOptions.isMaskedDate) {
    inputClassName += ' text-field__input_masked-date js-text-field__input_masked-date'
}
if (inputOptions.withJs) {
    inputClassName += ' js-text-field__input';
}

pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cinput" + (pug.attr("class", pug.classes([inputClassName], [true]), false, true)+pug.attr("type", inputOptions.type, true, true)+pug.attr("placeholder", inputOptions.placeholder, true, true)+pug.attr("value", inputOptions.value, true, true)+pug.attr("readonly", inputOptions.isReadonly, true, true)) + "\u003E";
if ((arrowOptions)) {
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cbutton" + (" class=\"text-field__arrow\""+pug.attr("type", inputOptions.isSubmit ? 'submit' : 'button', true, true)) + "\u003E";
pug_indent.push('    ');
pug_mixins["arrow"](arrowOptions);
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fbutton\u003E";
}
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
};








































    }.call(this, "pug_indent" in locals_for_with ?
        locals_for_with.pug_indent :
        typeof pug_indent !== 'undefined' ? pug_indent : undefined));
    ;;return pug_html;};
module.exports = template;

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(2);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;
    var locals_for_with = (locals || {});
    
    (function (pug_indent) {
      var pug_indent = [];
pug_mixins["heading"] = pug_interp = function({ text = '', type = 'h3', color, withJs = false }){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'heading';
let tag;

switch (type) {
    case 'h3':
        className += ' heading_type_h3';
        tag = 'h3';
        break;
    case 'h2':
        className += ' heading_type_h2';
        tag = 'h2';
        break;
    case 'inline':
        className += ' heading_type_h3';
        tag = 'span';
        break;
    default:
        tag = 'h1';
        break;
}
switch (color) {
    case 'white':
        className += ' heading_color_white';
        break;
    case 'purple':
        className += ' heading_color_purple';
        break;
    case 'gray':
        className += ' heading_color_gray';
        break;
    case 'inherit':
        className += ' heading_color_inherit';
        break;
    default:
        break;
}
if (withJs) {
  className += ' js-heading';
}

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C" + (tag) + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = text) ? "" : pug_interp)) + "\u003C\u002F" + (tag) + "\u003E";
};
pug_mixins["arrow"] = pug_interp = function({ type, color, withoutPadding = false } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'arrow';
let iconName = 'expand_more';

switch (type) {
    case 'expand-less':
        iconName = 'expand_less';
        break;
    case 'forward':
        iconName = 'arrow_forward';
        break;
    default:
        break;
}

switch (color) {
    case 'white':
        className += ' arrow_color_white';
        break;
    case 'purple-gradient':
        className += ' arrow_color_purple-gradient';
        break;
    default:
        break;
}

if (withoutPadding) {
    className += ' arrow_without-padding';
}

pug_html = pug_html + "\u003Cspan" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = iconName) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
};
pug_mixins["heading"] = pug_interp = function({ text = '', type = 'h3', color, withJs = false }){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'heading';
let tag;

switch (type) {
    case 'h3':
        className += ' heading_type_h3';
        tag = 'h3';
        break;
    case 'h2':
        className += ' heading_type_h2';
        tag = 'h2';
        break;
    case 'inline':
        className += ' heading_type_h3';
        tag = 'span';
        break;
    default:
        tag = 'h1';
        break;
}
switch (color) {
    case 'white':
        className += ' heading_color_white';
        break;
    case 'purple':
        className += ' heading_color_purple';
        break;
    case 'gray':
        className += ' heading_color_gray';
        break;
    case 'inherit':
        className += ' heading_color_inherit';
        break;
    default:
        break;
}
if (withJs) {
  className += ' js-heading';
}

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C" + (tag) + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = text) ? "" : pug_interp)) + "\u003C\u002F" + (tag) + "\u003E";
};
pug_mixins["button"] = pug_interp = function(options = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
const {
    text = 'click me',
    hasLink = false,
    isSubmit = false,
    link = 'change-me',
    modifiers = {},
    withJs = false,
} = options;

let className = 'button';
let headingOptions = {
    text,
    type: 'inline',
    color: 'white',
};

if (hasLink) {
    headingOptions.type = 'h3';
}

if (modifiers.isSecondary) {
    className += ' button_secondary';
    headingOptions.color = 'purple';
}
if (modifiers.withoutFrame) {
    headingOptions.color = 'inherit';
    className += ' button_without-frame';
}
if (modifiers.isLong) {
    className += ' button_long';
}
if (modifiers.isHovered) {
    className += ' button_hovered';
}
if (modifiers.isNarrow) {
    className += ' button_narrow';
}
if (modifiers.isWide) {
    className += ' button_wide';
}
if (withJs) {
  className += ' js-button';
}

switch (modifiers.textColor) {
    case 'white':
        headingOptions.color = 'white';
        break;
    case 'purple':
        headingOptions.color = 'purple';
        break;
    case 'gray':
        headingOptions.color = 'gray';
        break;
    default:
        break;
}

if ((hasLink)) {
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E\u003Ca" + (" class=\"button__text\""+pug.attr("href", link, true, true)) + "\u003E";
pug_indent.push('    ');
pug_mixins["heading"](headingOptions);
pug_indent.pop();
pug_html = pug_html + "\u003C\u002Fa\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"button__arrow\"\u003E";
pug_indent.push('    ');
pug_mixins["arrow"]({
                  type: 'forward',
                  color: 'white',
                });
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
else {
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cbutton" + (pug.attr("class", pug.classes([className], [true]), false, true)+pug.attr("type", isSubmit ? 'submit' : 'button', true, true)) + "\u003E\u003Cspan class=\"button__text\"\u003E";
pug_indent.push('    ');
pug_mixins["heading"](headingOptions);
pug_indent.pop();
pug_html = pug_html + "\u003C\u002Fspan\u003E\u003Cspan class=\"button__arrow\"\u003E";
pug_indent.push('    ');
pug_mixins["arrow"]({
                    type: 'forward',
                    color: 'white',
                });
pug_indent.pop();
pug_html = pug_html + "\u003C\u002Fspan\u003E\u003C\u002Fbutton\u003E";
}
};
pug_mixins["arrow"] = pug_interp = function({ type, color, withoutPadding = false } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'arrow';
let iconName = 'expand_more';

switch (type) {
    case 'expand-less':
        iconName = 'expand_less';
        break;
    case 'forward':
        iconName = 'arrow_forward';
        break;
    default:
        break;
}

switch (color) {
    case 'white':
        className += ' arrow_color_white';
        break;
    case 'purple-gradient':
        className += ' arrow_color_purple-gradient';
        break;
    default:
        break;
}

if (withoutPadding) {
    className += ' arrow_without-padding';
}

pug_html = pug_html + "\u003Cspan" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = iconName) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
};
pug_mixins["text-field"] = pug_interp = function({ inputOptions = {}, arrowOptions, modifiers = {}, withJs = false } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'text-field';

if (modifiers.isFocused) {
    className += ' text-field_focused';
}
if (modifiers.isShort) {
    className += ' text-field_short';
}
if (modifiers.isBottomFlat) {
    className += ' text-field_flat-bottom';
}
if (modifiers.isClickable) {
    className += ' text-field_clickable';
}

if (withJs) {
    className += ' js-text-field';
}

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E";
let inputClassName = 'text-field__input';
if (arrowOptions) {
    inputClassName += ' text-field__input_with-arrow';
}
if (inputOptions.isMaskedDate) {
    inputClassName += ' text-field__input_masked-date js-text-field__input_masked-date'
}
if (inputOptions.withJs) {
    inputClassName += ' js-text-field__input';
}

pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cinput" + (pug.attr("class", pug.classes([inputClassName], [true]), false, true)+pug.attr("type", inputOptions.type, true, true)+pug.attr("placeholder", inputOptions.placeholder, true, true)+pug.attr("value", inputOptions.value, true, true)+pug.attr("readonly", inputOptions.isReadonly, true, true)) + "\u003E";
if ((arrowOptions)) {
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cbutton" + (" class=\"text-field__arrow\""+pug.attr("type", inputOptions.isSubmit ? 'submit' : 'button', true, true)) + "\u003E";
pug_indent.push('    ');
pug_mixins["arrow"](arrowOptions);
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fbutton\u003E";
}
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
};
pug_mixins["checkbox-buttons"] = pug_interp = function({ items, isRich = false, theme }){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'checkbox-buttons';
if (isRich) {
    className += ' checkbox-buttons_rich';
}
if (theme === 'toggle') {
    className += ' checkbox-buttons_theme_toggle';
}
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cul" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E";
// iterate items
;(function(){
  var $$obj = items;
  if ('number' == typeof $$obj.length) {
      for (var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++) {
        var item = $$obj[pug_index0];
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"checkbox-buttons__item\"\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Clabel class=\"checkbox-buttons__button\"\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cinput" + (" class=\"checkbox-buttons__input\""+" type=\"checkbox\""+pug.attr("checked", item.checked, true, true)) + "\u003E\u003Cspan class=\"checkbox-buttons__name\"\u003E" + (null == (pug_interp = item.name) ? "" : pug_interp) + "\u003C\u002Fspan\u003E";
if ((isRich)) {
pug_html = pug_html + "\u003Cspan class=\"checkbox-buttons__description\"\u003E" + (null == (pug_interp = item.description) ? "" : pug_interp) + "\u003C\u002Fspan\u003E";
}
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Flabel\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index0 in $$obj) {
      $$l++;
      var item = $$obj[pug_index0];
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"checkbox-buttons__item\"\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Clabel class=\"checkbox-buttons__button\"\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cinput" + (" class=\"checkbox-buttons__input\""+" type=\"checkbox\""+pug.attr("checked", item.checked, true, true)) + "\u003E\u003Cspan class=\"checkbox-buttons__name\"\u003E" + (null == (pug_interp = item.name) ? "" : pug_interp) + "\u003C\u002Fspan\u003E";
if ((isRich)) {
pug_html = pug_html + "\u003Cspan class=\"checkbox-buttons__description\"\u003E" + (null == (pug_interp = item.description) ? "" : pug_interp) + "\u003C\u002Fspan\u003E";
}
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Flabel\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Ful\u003E";
};
pug_mixins["radio-buttons"] = pug_interp = function({ items, itemsName }){
var block = (this && this.block), attributes = (this && this.attributes) || {};
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"radio-buttons\"\u003E";
// iterate items
;(function(){
  var $$obj = items;
  if ('number' == typeof $$obj.length) {
      for (var index = 0, $$l = $$obj.length; index < $$l; index++) {
        var text = $$obj[index];
const checked = index === 0;
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Clabel class=\"radio-buttons__button\"\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cinput" + (" class=\"radio-buttons__input\""+" type=\"radio\""+pug.attr("name", itemsName, true, true)+pug.attr("checked", checked, true, true)) + "\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cp class=\"radio-buttons__button-text\"\u003E" + (pug.escape(null == (pug_interp = text) ? "" : pug_interp)) + "\u003C\u002Fp\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Flabel\u003E";
      }
  } else {
    var $$l = 0;
    for (var index in $$obj) {
      $$l++;
      var text = $$obj[index];
const checked = index === 0;
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Clabel class=\"radio-buttons__button\"\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cinput" + (" class=\"radio-buttons__input\""+" type=\"radio\""+pug.attr("name", itemsName, true, true)+pug.attr("checked", checked, true, true)) + "\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cp class=\"radio-buttons__button-text\"\u003E" + (pug.escape(null == (pug_interp = text) ? "" : pug_interp)) + "\u003C\u002Fp\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Flabel\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
};




































































































    }.call(this, "pug_indent" in locals_for_with ?
        locals_for_with.pug_indent :
        typeof pug_indent !== 'undefined' ? pug_indent : undefined));
    ;;return pug_html;};
module.exports = template;

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(2);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_indent = [];













;return pug_html;};
module.exports = template;

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(2);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_indent = [];
pug_mixins["arrow"] = pug_interp = function({ type, color, withoutPadding = false } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'arrow';
let iconName = 'expand_more';

switch (type) {
    case 'expand-less':
        iconName = 'expand_less';
        break;
    case 'forward':
        iconName = 'arrow_forward';
        break;
    default:
        break;
}

switch (color) {
    case 'white':
        className += ' arrow_color_white';
        break;
    case 'purple-gradient':
        className += ' arrow_color_purple-gradient';
        break;
    default:
        break;
}

if (withoutPadding) {
    className += ' arrow_without-padding';
}

pug_html = pug_html + "\u003Cspan" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = iconName) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
};
























;return pug_html;};
module.exports = template;

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(2);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;
    var locals_for_with = (locals || {});
    
    (function (pug_indent) {
      var pug_indent = [];
pug_mixins["heading"] = pug_interp = function({ text = '', type = 'h3', color, withJs = false }){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'heading';
let tag;

switch (type) {
    case 'h3':
        className += ' heading_type_h3';
        tag = 'h3';
        break;
    case 'h2':
        className += ' heading_type_h2';
        tag = 'h2';
        break;
    case 'inline':
        className += ' heading_type_h3';
        tag = 'span';
        break;
    default:
        tag = 'h1';
        break;
}
switch (color) {
    case 'white':
        className += ' heading_color_white';
        break;
    case 'purple':
        className += ' heading_color_purple';
        break;
    case 'gray':
        className += ' heading_color_gray';
        break;
    case 'inherit':
        className += ' heading_color_inherit';
        break;
    default:
        break;
}
if (withJs) {
  className += ' js-heading';
}

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C" + (tag) + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = text) ? "" : pug_interp)) + "\u003C\u002F" + (tag) + "\u003E";
};


























    }.call(this, "pug_indent" in locals_for_with ?
        locals_for_with.pug_indent :
        typeof pug_indent !== 'undefined' ? pug_indent : undefined));
    ;;return pug_html;};
module.exports = template;

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(2);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_indent = [];
pug_html = pug_html + "\u003C!DOCTYPE html\u003E\n\u003Chtml lang=\"ru\"\u003E\n  \u003Chead\u003E\n    \u003Cmeta charset=\"utf-8\"\u003E\n    \u003Cmeta name=\"description\" content=\"Toxin Hotel. Room reservations. Навигация по страницам\"\u003E\n    \u003Cmeta name=\"keywords\" content=\"toxin, hotel, навигация\"\u003E\n    \u003Cmeta name=\"viewport\" content=\"initial-scale=1.0, width=device-width\"\u003E\n    \u003Clink" + (" rel=\"apple-touch-icon\" sizes=\"180x180\""+pug.attr("href", __webpack_require__(6).default, true, true)) + "\u003E\n    \u003Clink" + (" rel=\"icon\" type=\"image\u002Fpng\" sizes=\"32x32\""+pug.attr("href", __webpack_require__(8).default, true, true)) + "\u003E\n    \u003Clink" + (" rel=\"icon\" type=\"image\u002Fpng\" sizes=\"16x16\""+pug.attr("href", __webpack_require__(7).default, true, true)) + "\u003E\n    \u003Clink rel=\"manifest\" href=\".\u002Fsite.webmanifest\"\u003E\n    \u003Clink" + (" rel=\"mask-icon\""+pug.attr("href", __webpack_require__(10).default, true, true)+" color=\"#bc9cff\"") + "\u003E\n    \u003Clink" + (" rel=\"shortcut icon\""+pug.attr("href", __webpack_require__(9).default, true, true)) + "\u003E\n    \u003Cmeta name=\"msapplication-TileColor\" content=\"#603cba\"\u003E\n    \u003Cmeta name=\"msapplication-config\" content=\".\u002Fbrowserconfig.xml\"\u003E\n    \u003Cmeta name=\"theme-color\" content=\"#ffffff\"\u003E\n    \u003Ctitle\u003EНавигация по проекту\u003C\u002Ftitle\u003E\n  \u003C\u002Fhead\u003E\n  \u003Cbody\u003E\n    \u003Cmain\u003E\n      \u003Cnav\u003E\n        \u003Ch1\u003EWebsite Pages\n          \u003Cul\u003E\n            \u003Cli\u003E\u003Ca href=\"\u002Flanding-page.html\"\u003EГлавная страница\u003C\u002Fa\u003E\u003C\u002Fli\u003E\n            \u003Cli\u003E\u003Ca href=\"\u002Flogin.html\"\u003EВход\u003C\u002Fa\u003E\u003C\u002Fli\u003E\n            \u003Cli\u003E\u003Ca href=\"\u002Fregistration.html\"\u003EРегистрация\u003C\u002Fa\u003E\u003C\u002Fli\u003E\n            \u003Cli\u003E\u003Ca href=\"\u002Froom-details.html\"\u003EСтраница комнаты\u003C\u002Fa\u003E\u003C\u002Fli\u003E\n            \u003Cli\u003E\u003Ca href=\"\u002Fsearch-room.html\"\u003EПоиск комнат\u003C\u002Fa\u003E\u003C\u002Fli\u003E\n          \u003C\u002Ful\u003E\n        \u003C\u002Fh1\u003E\n        \u003Ch1\u003EUi Kit\n          \u003Cli\u003E\u003Ca href=\"\u002Fcards.html\"\u003ECards\u003C\u002Fa\u003E\u003C\u002Fli\u003E\n          \u003Cli\u003E\u003Ca href=\"\u002Fcolors-and-type.html\"\u003EColors and type\u003C\u002Fa\u003E\u003C\u002Fli\u003E\n          \u003Cli\u003E\u003Ca href=\"\u002Fform-elements.html\"\u003EForm elements\u003C\u002Fa\u003E\u003C\u002Fli\u003E\n          \u003Cli\u003E\u003Ca href=\"\u002Fheaders-and-footers.html\"\u003EHeaders and footers\u003C\u002Fa\u003E\u003C\u002Fli\u003E\n        \u003C\u002Fh1\u003E\n      \u003C\u002Fnav\u003E\n    \u003C\u002Fmain\u003E\n  \u003C\u002Fbody\u003E\n\u003C\u002Fhtml\u003E";;return pug_html;};
module.exports = template;

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(2);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;
    var locals_for_with = (locals || {});
    
    (function (Array, Date, JSON, pug_indent) {
      var pug_indent = [];
pug_mixins["heading"] = pug_interp = function({ text = '', type = 'h3', color, withJs = false }){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'heading';
let tag;

switch (type) {
    case 'h3':
        className += ' heading_type_h3';
        tag = 'h3';
        break;
    case 'h2':
        className += ' heading_type_h2';
        tag = 'h2';
        break;
    case 'inline':
        className += ' heading_type_h3';
        tag = 'span';
        break;
    default:
        tag = 'h1';
        break;
}
switch (color) {
    case 'white':
        className += ' heading_color_white';
        break;
    case 'purple':
        className += ' heading_color_purple';
        break;
    case 'gray':
        className += ' heading_color_gray';
        break;
    case 'inherit':
        className += ' heading_color_inherit';
        break;
    default:
        break;
}
if (withJs) {
  className += ' js-heading';
}

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C" + (tag) + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = text) ? "" : pug_interp)) + "\u003C\u002F" + (tag) + "\u003E";
};
pug_mixins["arrow"] = pug_interp = function({ type, color, withoutPadding = false } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'arrow';
let iconName = 'expand_more';

switch (type) {
    case 'expand-less':
        iconName = 'expand_less';
        break;
    case 'forward':
        iconName = 'arrow_forward';
        break;
    default:
        break;
}

switch (color) {
    case 'white':
        className += ' arrow_color_white';
        break;
    case 'purple-gradient':
        className += ' arrow_color_purple-gradient';
        break;
    default:
        break;
}

if (withoutPadding) {
    className += ' arrow_without-padding';
}

pug_html = pug_html + "\u003Cspan" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = iconName) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
};
pug_mixins["heading"] = pug_interp = function({ text = '', type = 'h3', color, withJs = false }){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'heading';
let tag;

switch (type) {
    case 'h3':
        className += ' heading_type_h3';
        tag = 'h3';
        break;
    case 'h2':
        className += ' heading_type_h2';
        tag = 'h2';
        break;
    case 'inline':
        className += ' heading_type_h3';
        tag = 'span';
        break;
    default:
        tag = 'h1';
        break;
}
switch (color) {
    case 'white':
        className += ' heading_color_white';
        break;
    case 'purple':
        className += ' heading_color_purple';
        break;
    case 'gray':
        className += ' heading_color_gray';
        break;
    case 'inherit':
        className += ' heading_color_inherit';
        break;
    default:
        break;
}
if (withJs) {
  className += ' js-heading';
}

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C" + (tag) + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = text) ? "" : pug_interp)) + "\u003C\u002F" + (tag) + "\u003E";
};
pug_mixins["button"] = pug_interp = function(options = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
const {
    text = 'click me',
    hasLink = false,
    isSubmit = false,
    link = 'change-me',
    modifiers = {},
    withJs = false,
} = options;

let className = 'button';
let headingOptions = {
    text,
    type: 'inline',
    color: 'white',
};

if (hasLink) {
    headingOptions.type = 'h3';
}

if (modifiers.isSecondary) {
    className += ' button_secondary';
    headingOptions.color = 'purple';
}
if (modifiers.withoutFrame) {
    headingOptions.color = 'inherit';
    className += ' button_without-frame';
}
if (modifiers.isLong) {
    className += ' button_long';
}
if (modifiers.isHovered) {
    className += ' button_hovered';
}
if (modifiers.isNarrow) {
    className += ' button_narrow';
}
if (modifiers.isWide) {
    className += ' button_wide';
}
if (withJs) {
  className += ' js-button';
}

switch (modifiers.textColor) {
    case 'white':
        headingOptions.color = 'white';
        break;
    case 'purple':
        headingOptions.color = 'purple';
        break;
    case 'gray':
        headingOptions.color = 'gray';
        break;
    default:
        break;
}

if ((hasLink)) {
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E\u003Ca" + (" class=\"button__text\""+pug.attr("href", link, true, true)) + "\u003E";
pug_indent.push('    ');
pug_mixins["heading"](headingOptions);
pug_indent.pop();
pug_html = pug_html + "\u003C\u002Fa\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"button__arrow\"\u003E";
pug_indent.push('    ');
pug_mixins["arrow"]({
                  type: 'forward',
                  color: 'white',
                });
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
else {
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cbutton" + (pug.attr("class", pug.classes([className], [true]), false, true)+pug.attr("type", isSubmit ? 'submit' : 'button', true, true)) + "\u003E\u003Cspan class=\"button__text\"\u003E";
pug_indent.push('    ');
pug_mixins["heading"](headingOptions);
pug_indent.pop();
pug_html = pug_html + "\u003C\u002Fspan\u003E\u003Cspan class=\"button__arrow\"\u003E";
pug_indent.push('    ');
pug_mixins["arrow"]({
                    type: 'forward',
                    color: 'white',
                });
pug_indent.pop();
pug_html = pug_html + "\u003C\u002Fspan\u003E\u003C\u002Fbutton\u003E";
}
};
pug_mixins["date-picker"] = pug_interp = function(options = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
const {
    withBorder = false,
    dateFormat = null,
    initialDate = [null, null],
    isTextDouble = false,
} = options;

let className = 'date-picker js-date-picker';
if (withBorder) {
    className += ' date-picker_with-border';
}
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv" + (pug.attr("class", pug.classes([className], [true]), false, true)+pug.attr("data-date-format", dateFormat, true, true)+pug.attr("data-initial-date", initialDate, true, true)+pug.attr("data-is-text-double", isTextDouble ? 'true' : 'false', true, true)) + "\u003E\u003C\u002Fdiv\u003E";
};
pug_mixins["heading"] = pug_interp = function({ text = '', type = 'h3', color, withJs = false }){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'heading';
let tag;

switch (type) {
    case 'h3':
        className += ' heading_type_h3';
        tag = 'h3';
        break;
    case 'h2':
        className += ' heading_type_h2';
        tag = 'h2';
        break;
    case 'inline':
        className += ' heading_type_h3';
        tag = 'span';
        break;
    default:
        tag = 'h1';
        break;
}
switch (color) {
    case 'white':
        className += ' heading_color_white';
        break;
    case 'purple':
        className += ' heading_color_purple';
        break;
    case 'gray':
        className += ' heading_color_gray';
        break;
    case 'inherit':
        className += ' heading_color_inherit';
        break;
    default:
        break;
}
if (withJs) {
  className += ' js-heading';
}

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C" + (tag) + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = text) ? "" : pug_interp)) + "\u003C\u002F" + (tag) + "\u003E";
};
pug_mixins["counting-item"] = pug_interp = function({ name = '', value = 0, nameDeclensions } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv" + (" class=\"counting-item js-counting-item\""+pug.attr("data-words", nameDeclensions ? JSON.stringify(nameDeclensions) : false, true, true)) + "\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"counting-item__name js-counting-item__name\"\u003E";
pug_indent.push('    ');
pug_mixins["heading"]({
                text: name,
                withJs: true,
            });
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"counting-item__counter\"\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cbutton class=\"counting-item__change-button counting-item__change-button_action_decrease js-counting-item__change-button_action_decrease\" type=\"button\"\u003E-\u003C\u002Fbutton\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"counting-item__value js-counting-item__value\"\u003E";
pug_indent.push('      ');
pug_mixins["heading"]({
                    text: value,
                    withJs: true,
                });
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cbutton class=\"counting-item__change-button counting-item__change-button_action_increase js-counting-item__change-button_action_increase\" type=\"button\"\u003E+\u003C\u002Fbutton\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
};
pug_mixins["arrow"] = pug_interp = function({ type, color, withoutPadding = false } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'arrow';
let iconName = 'expand_more';

switch (type) {
    case 'expand-less':
        iconName = 'expand_less';
        break;
    case 'forward':
        iconName = 'arrow_forward';
        break;
    default:
        break;
}

switch (color) {
    case 'white':
        className += ' arrow_color_white';
        break;
    case 'purple-gradient':
        className += ' arrow_color_purple-gradient';
        break;
    default:
        break;
}

if (withoutPadding) {
    className += ' arrow_without-padding';
}

pug_html = pug_html + "\u003Cspan" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = iconName) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
};
pug_mixins["heading"] = pug_interp = function({ text = '', type = 'h3', color, withJs = false }){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'heading';
let tag;

switch (type) {
    case 'h3':
        className += ' heading_type_h3';
        tag = 'h3';
        break;
    case 'h2':
        className += ' heading_type_h2';
        tag = 'h2';
        break;
    case 'inline':
        className += ' heading_type_h3';
        tag = 'span';
        break;
    default:
        tag = 'h1';
        break;
}
switch (color) {
    case 'white':
        className += ' heading_color_white';
        break;
    case 'purple':
        className += ' heading_color_purple';
        break;
    case 'gray':
        className += ' heading_color_gray';
        break;
    case 'inherit':
        className += ' heading_color_inherit';
        break;
    default:
        break;
}
if (withJs) {
  className += ' js-heading';
}

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C" + (tag) + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = text) ? "" : pug_interp)) + "\u003C\u002F" + (tag) + "\u003E";
};
pug_mixins["button"] = pug_interp = function(options = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
const {
    text = 'click me',
    hasLink = false,
    isSubmit = false,
    link = 'change-me',
    modifiers = {},
    withJs = false,
} = options;

let className = 'button';
let headingOptions = {
    text,
    type: 'inline',
    color: 'white',
};

if (hasLink) {
    headingOptions.type = 'h3';
}

if (modifiers.isSecondary) {
    className += ' button_secondary';
    headingOptions.color = 'purple';
}
if (modifiers.withoutFrame) {
    headingOptions.color = 'inherit';
    className += ' button_without-frame';
}
if (modifiers.isLong) {
    className += ' button_long';
}
if (modifiers.isHovered) {
    className += ' button_hovered';
}
if (modifiers.isNarrow) {
    className += ' button_narrow';
}
if (modifiers.isWide) {
    className += ' button_wide';
}
if (withJs) {
  className += ' js-button';
}

switch (modifiers.textColor) {
    case 'white':
        headingOptions.color = 'white';
        break;
    case 'purple':
        headingOptions.color = 'purple';
        break;
    case 'gray':
        headingOptions.color = 'gray';
        break;
    default:
        break;
}

if ((hasLink)) {
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E\u003Ca" + (" class=\"button__text\""+pug.attr("href", link, true, true)) + "\u003E";
pug_indent.push('    ');
pug_mixins["heading"](headingOptions);
pug_indent.pop();
pug_html = pug_html + "\u003C\u002Fa\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"button__arrow\"\u003E";
pug_indent.push('    ');
pug_mixins["arrow"]({
                  type: 'forward',
                  color: 'white',
                });
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
else {
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cbutton" + (pug.attr("class", pug.classes([className], [true]), false, true)+pug.attr("type", isSubmit ? 'submit' : 'button', true, true)) + "\u003E\u003Cspan class=\"button__text\"\u003E";
pug_indent.push('    ');
pug_mixins["heading"](headingOptions);
pug_indent.pop();
pug_html = pug_html + "\u003C\u002Fspan\u003E\u003Cspan class=\"button__arrow\"\u003E";
pug_indent.push('    ');
pug_mixins["arrow"]({
                    type: 'forward',
                    color: 'white',
                });
pug_indent.pop();
pug_html = pug_html + "\u003C\u002Fspan\u003E\u003C\u002Fbutton\u003E";
}
};
pug_mixins["items-counter"] = pug_interp = function(options = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
const {
    items,
    withoutButtons = false,
    wordForValueTextReplacing = null,
    itemIndexForSeparateCount = null,
} = options;

let className = 'items-counter js-items-counter';
if (withoutButtons) {
    className += ' items-counter_without-buttons';
}
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv" + (pug.attr("class", pug.classes([className], [true]), false, true)+pug.attr("data-replace-text", JSON.stringify(wordForValueTextReplacing), true, true)+pug.attr("data-separate-item", JSON.stringify(itemIndexForSeparateCount), true, true)) + "\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cul class=\"items-counter__items-list\"\u003E";
// iterate items
;(function(){
  var $$obj = items;
  if ('number' == typeof $$obj.length) {
      for (var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++) {
        var item = $$obj[pug_index0];
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"items-counter__item\"\u003E";
pug_indent.push('      ');
pug_mixins["counting-item"]({
                        name: item.name,
                        value: item.value,
                        nameDeclensions: item.nameDeclensions,
                    });
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index0 in $$obj) {
      $$l++;
      var item = $$obj[pug_index0];
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"items-counter__item\"\u003E";
pug_indent.push('      ');
pug_mixins["counting-item"]({
                        name: item.name,
                        value: item.value,
                        nameDeclensions: item.nameDeclensions,
                    });
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Ful\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"items-counter__button-panel\"\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"items-counter__clear-button js-items-counter__clear-button\"\u003E";
pug_indent.push('      ');
pug_mixins["button"]({
                    text: 'Очистить',
                    hasLink: false,
                    modifiers: {
                        withoutFrame: true,
                    }
                });
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"items-counter__apply-button js-items-counter__apply-button\"\u003E";
pug_indent.push('      ');
pug_mixins["button"]({
                    text: 'Применить',
                    hasLink: false,
                    modifiers: {
                        withoutFrame: true,
                    }
                });
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
};
pug_mixins["arrow"] = pug_interp = function({ type, color, withoutPadding = false } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'arrow';
let iconName = 'expand_more';

switch (type) {
    case 'expand-less':
        iconName = 'expand_less';
        break;
    case 'forward':
        iconName = 'arrow_forward';
        break;
    default:
        break;
}

switch (color) {
    case 'white':
        className += ' arrow_color_white';
        break;
    case 'purple-gradient':
        className += ' arrow_color_purple-gradient';
        break;
    default:
        break;
}

if (withoutPadding) {
    className += ' arrow_without-padding';
}

pug_html = pug_html + "\u003Cspan" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = iconName) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
};
pug_mixins["text-field"] = pug_interp = function({ inputOptions = {}, arrowOptions, modifiers = {}, withJs = false } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'text-field';

if (modifiers.isFocused) {
    className += ' text-field_focused';
}
if (modifiers.isShort) {
    className += ' text-field_short';
}
if (modifiers.isBottomFlat) {
    className += ' text-field_flat-bottom';
}
if (modifiers.isClickable) {
    className += ' text-field_clickable';
}

if (withJs) {
    className += ' js-text-field';
}

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E";
let inputClassName = 'text-field__input';
if (arrowOptions) {
    inputClassName += ' text-field__input_with-arrow';
}
if (inputOptions.isMaskedDate) {
    inputClassName += ' text-field__input_masked-date js-text-field__input_masked-date'
}
if (inputOptions.withJs) {
    inputClassName += ' js-text-field__input';
}

pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cinput" + (pug.attr("class", pug.classes([inputClassName], [true]), false, true)+pug.attr("type", inputOptions.type, true, true)+pug.attr("placeholder", inputOptions.placeholder, true, true)+pug.attr("value", inputOptions.value, true, true)+pug.attr("readonly", inputOptions.isReadonly, true, true)) + "\u003E";
if ((arrowOptions)) {
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cbutton" + (" class=\"text-field__arrow\""+pug.attr("type", inputOptions.isSubmit ? 'submit' : 'button', true, true)) + "\u003E";
pug_indent.push('    ');
pug_mixins["arrow"](arrowOptions);
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fbutton\u003E";
}
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
};
pug_mixins["dropdown"] = pug_interp = function(options = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let {
    inputOptions = {},
    popupMixinOptions = {},
    popupHidden = true,
    title,
    isDouble = false,
    isShort = false,
    isPopupDistant = false,
    defaultInputValue = '',
} = options;

let className = 'dropdown js-dropdown';
if (isDouble) {
    className += ' dropdown_double';
}
if (isShort) {
  className += ' dropdown_short';
}
if (isPopupDistant) {
  className += ' dropdown_with-distant-popup';
}

if (isDouble) {
    if (!Array.isArray(title)) {
        title = [title, title];
    }
    if (!Array.isArray(inputOptions)) {
        inputOptions = [inputOptions, inputOptions];
    }
}
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Csection" + (pug.attr("class", pug.classes([className], [true]), false, true)+pug.attr("data-default-value", JSON.stringify(defaultInputValue), true, true)) + "\u003E";
if ((isDouble)) {
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"dropdown__text-field js-dropdown__text-field\"\u003E";
if ((title[0])) {
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"dropdown__title\"\u003E";
pug_indent.push('      ');
pug_mixins["heading"]({
                            text: title[0],
                        });
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
pug_indent.push('    ');
pug_mixins["text-field"]({
                    inputOptions: {
                        ...inputOptions[0],
                        isMaskedDate: false,
                        isReadonly: true,
                        withJs: true,
                    },
                    arrowOptions: {},
                    modifiers: {
                        isFocused: !popupHidden,
                        isBottomFlat: !popupHidden,
                        isClickable: true,
                    },
                    withJs: true,
                });
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"dropdown__text-field js-dropdown__text-field\"\u003E";
if ((title[1])) {
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"dropdown__title\"\u003E";
pug_indent.push('      ');
pug_mixins["heading"]({
                            text: title[1],
                        });
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
pug_indent.push('    ');
pug_mixins["text-field"]({
                    inputOptions: {
                        ...inputOptions[1],
                        isMaskedDate: false,
                        isReadonly: true,
                        withJs: true,
                    },
                    arrowOptions: {},
                    modifiers: {
                        isFocused: !popupHidden,
                        isBottomFlat: !popupHidden,
                        isClickable: true,
                    },
                    withJs: true,
                });
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
else {
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"dropdown__text-field js-dropdown__text-field\"\u003E";
if ((title)) {
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"dropdown__title\"\u003E";
pug_indent.push('      ');
pug_mixins["heading"]({
                            text: title,
                        });
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
pug_indent.push('    ');
pug_mixins["text-field"]({
                    inputOptions: {
                        ...inputOptions,
                        isMaskedDate: false,
                        isReadonly: true,
                        withJs: true,
                    },
                    arrowOptions: {},
                    modifiers: {
                        isFocused: !popupHidden,
                        isBottomFlat: !popupHidden,
                        isClickable: true,
                    },
                    withJs: true,
                });
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv" + (pug.attr("class", pug.classes(["dropdown__popup","js-dropdown__popup",`${popupHidden ? 'dropdown__popup_hidden' : false}`], [false,false,true]), false, true)) + "\u003E";
if ((popupMixinOptions.name)) {
pug_indent.push('    ');
pug_mixins[popupMixinOptions.name](popupMixinOptions.params);
pug_indent.pop();
}
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fsection\u003E";
};
pug_mixins["search-card"] = pug_interp = function(){
var block = (this && this.block), attributes = (this && this.attributes) || {};
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Carticle class=\"search-card js-search-card\"\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cform\u003E";
pug_indent.push('    ');
pug_mixins["heading"]({
                type: 'h1',
                text: 'Найдём номера под ваши пожелания',
            });
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"search-card__dates js-search-card__dates\"\u003E";
pug_indent.push('      ');
pug_mixins["dropdown"]({
                    inputOptions: {
                        value: 'ДД.ММ.ГГГГ',
                        placeholder: 'ДД.ММ.ГГГГ',
                    },
                    popupMixinOptions: {
                        name: 'date-picker',
                        params: {
                            isTextDouble: true,
                        },
                    },
                    title: ['Прибытие', 'Выезд'],
                    isDouble: true,
                    isPopupDistant: true,
                    defaultInputValue: 'ДД.ММ.ГГГГ',
                });
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"search-card__guests js-search-card__guests\"\u003E";
pug_indent.push('      ');
pug_mixins["dropdown"]({
                    inputOptions: {
                        value: 'Сколько гостей',
                        placeholder: 'Сколько гостей',
                    },
                    popupMixinOptions: {
                        name: 'items-counter',
                        params: {
                            items: [
                                {
                                    name: 'Взрослые',
                                    value: '0',
                                },
                                {
                                    name: 'Дети',
                                    value: '0',
                                },
                                {
                                    name: 'Младенцы',
                                    value: '0',
                                    nameDeclensions: ['младенец', 'младенца', 'младенцев'],
                                },
                            ],
                            wordForValueTextReplacing: ['гость', 'гостя', 'гостей'],
                            itemIndexForSeparateCount: 2,
                        },
                    },
                    title: 'Гости',
                    defaultInputValue: 'Сколько гостей',
                });
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
pug_indent.push('    ');
pug_mixins["button"]({
                text: 'Подобрать номер',
                hasLink: true,
                link: 'search-room.html',
                modifiers: {
                    isLong: true,
                    textColor: 'white',
                },
            });
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fform\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Farticle\u003E";
};
pug_mixins["heading"] = pug_interp = function({ text = '', type = 'h3', color, withJs = false }){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'heading';
let tag;

switch (type) {
    case 'h3':
        className += ' heading_type_h3';
        tag = 'h3';
        break;
    case 'h2':
        className += ' heading_type_h2';
        tag = 'h2';
        break;
    case 'inline':
        className += ' heading_type_h3';
        tag = 'span';
        break;
    default:
        tag = 'h1';
        break;
}
switch (color) {
    case 'white':
        className += ' heading_color_white';
        break;
    case 'purple':
        className += ' heading_color_purple';
        break;
    case 'gray':
        className += ' heading_color_gray';
        break;
    case 'inherit':
        className += ' heading_color_inherit';
        break;
    default:
        break;
}
if (withJs) {
  className += ' js-heading';
}

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C" + (tag) + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = text) ? "" : pug_interp)) + "\u003C\u002F" + (tag) + "\u003E";
};
pug_mixins["arrow"] = pug_interp = function({ type, color, withoutPadding = false } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'arrow';
let iconName = 'expand_more';

switch (type) {
    case 'expand-less':
        iconName = 'expand_less';
        break;
    case 'forward':
        iconName = 'arrow_forward';
        break;
    default:
        break;
}

switch (color) {
    case 'white':
        className += ' arrow_color_white';
        break;
    case 'purple-gradient':
        className += ' arrow_color_purple-gradient';
        break;
    default:
        break;
}

if (withoutPadding) {
    className += ' arrow_without-padding';
}

pug_html = pug_html + "\u003Cspan" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = iconName) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
};
pug_mixins["heading"] = pug_interp = function({ text = '', type = 'h3', color, withJs = false }){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'heading';
let tag;

switch (type) {
    case 'h3':
        className += ' heading_type_h3';
        tag = 'h3';
        break;
    case 'h2':
        className += ' heading_type_h2';
        tag = 'h2';
        break;
    case 'inline':
        className += ' heading_type_h3';
        tag = 'span';
        break;
    default:
        tag = 'h1';
        break;
}
switch (color) {
    case 'white':
        className += ' heading_color_white';
        break;
    case 'purple':
        className += ' heading_color_purple';
        break;
    case 'gray':
        className += ' heading_color_gray';
        break;
    case 'inherit':
        className += ' heading_color_inherit';
        break;
    default:
        break;
}
if (withJs) {
  className += ' js-heading';
}

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C" + (tag) + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = text) ? "" : pug_interp)) + "\u003C\u002F" + (tag) + "\u003E";
};
pug_mixins["button"] = pug_interp = function(options = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
const {
    text = 'click me',
    hasLink = false,
    isSubmit = false,
    link = 'change-me',
    modifiers = {},
    withJs = false,
} = options;

let className = 'button';
let headingOptions = {
    text,
    type: 'inline',
    color: 'white',
};

if (hasLink) {
    headingOptions.type = 'h3';
}

if (modifiers.isSecondary) {
    className += ' button_secondary';
    headingOptions.color = 'purple';
}
if (modifiers.withoutFrame) {
    headingOptions.color = 'inherit';
    className += ' button_without-frame';
}
if (modifiers.isLong) {
    className += ' button_long';
}
if (modifiers.isHovered) {
    className += ' button_hovered';
}
if (modifiers.isNarrow) {
    className += ' button_narrow';
}
if (modifiers.isWide) {
    className += ' button_wide';
}
if (withJs) {
  className += ' js-button';
}

switch (modifiers.textColor) {
    case 'white':
        headingOptions.color = 'white';
        break;
    case 'purple':
        headingOptions.color = 'purple';
        break;
    case 'gray':
        headingOptions.color = 'gray';
        break;
    default:
        break;
}

if ((hasLink)) {
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E\u003Ca" + (" class=\"button__text\""+pug.attr("href", link, true, true)) + "\u003E";
pug_indent.push('    ');
pug_mixins["heading"](headingOptions);
pug_indent.pop();
pug_html = pug_html + "\u003C\u002Fa\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"button__arrow\"\u003E";
pug_indent.push('    ');
pug_mixins["arrow"]({
                  type: 'forward',
                  color: 'white',
                });
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
else {
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cbutton" + (pug.attr("class", pug.classes([className], [true]), false, true)+pug.attr("type", isSubmit ? 'submit' : 'button', true, true)) + "\u003E\u003Cspan class=\"button__text\"\u003E";
pug_indent.push('    ');
pug_mixins["heading"](headingOptions);
pug_indent.pop();
pug_html = pug_html + "\u003C\u002Fspan\u003E\u003Cspan class=\"button__arrow\"\u003E";
pug_indent.push('    ');
pug_mixins["arrow"]({
                    type: 'forward',
                    color: 'white',
                });
pug_indent.pop();
pug_html = pug_html + "\u003C\u002Fspan\u003E\u003C\u002Fbutton\u003E";
}
};
pug_mixins["arrow"] = pug_interp = function({ type, color, withoutPadding = false } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'arrow';
let iconName = 'expand_more';

switch (type) {
    case 'expand-less':
        iconName = 'expand_less';
        break;
    case 'forward':
        iconName = 'arrow_forward';
        break;
    default:
        break;
}

switch (color) {
    case 'white':
        className += ' arrow_color_white';
        break;
    case 'purple-gradient':
        className += ' arrow_color_purple-gradient';
        break;
    default:
        break;
}

if (withoutPadding) {
    className += ' arrow_without-padding';
}

pug_html = pug_html + "\u003Cspan" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = iconName) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
};
pug_mixins["text-field"] = pug_interp = function({ inputOptions = {}, arrowOptions, modifiers = {}, withJs = false } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'text-field';

if (modifiers.isFocused) {
    className += ' text-field_focused';
}
if (modifiers.isShort) {
    className += ' text-field_short';
}
if (modifiers.isBottomFlat) {
    className += ' text-field_flat-bottom';
}
if (modifiers.isClickable) {
    className += ' text-field_clickable';
}

if (withJs) {
    className += ' js-text-field';
}

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E";
let inputClassName = 'text-field__input';
if (arrowOptions) {
    inputClassName += ' text-field__input_with-arrow';
}
if (inputOptions.isMaskedDate) {
    inputClassName += ' text-field__input_masked-date js-text-field__input_masked-date'
}
if (inputOptions.withJs) {
    inputClassName += ' js-text-field__input';
}

pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cinput" + (pug.attr("class", pug.classes([inputClassName], [true]), false, true)+pug.attr("type", inputOptions.type, true, true)+pug.attr("placeholder", inputOptions.placeholder, true, true)+pug.attr("value", inputOptions.value, true, true)+pug.attr("readonly", inputOptions.isReadonly, true, true)) + "\u003E";
if ((arrowOptions)) {
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cbutton" + (" class=\"text-field__arrow\""+pug.attr("type", inputOptions.isSubmit ? 'submit' : 'button', true, true)) + "\u003E";
pug_indent.push('    ');
pug_mixins["arrow"](arrowOptions);
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fbutton\u003E";
}
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
};
pug_mixins["checkbox-buttons"] = pug_interp = function({ items, isRich = false, theme }){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'checkbox-buttons';
if (isRich) {
    className += ' checkbox-buttons_rich';
}
if (theme === 'toggle') {
    className += ' checkbox-buttons_theme_toggle';
}
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cul" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E";
// iterate items
;(function(){
  var $$obj = items;
  if ('number' == typeof $$obj.length) {
      for (var pug_index1 = 0, $$l = $$obj.length; pug_index1 < $$l; pug_index1++) {
        var item = $$obj[pug_index1];
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"checkbox-buttons__item\"\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Clabel class=\"checkbox-buttons__button\"\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cinput" + (" class=\"checkbox-buttons__input\""+" type=\"checkbox\""+pug.attr("checked", item.checked, true, true)) + "\u003E\u003Cspan class=\"checkbox-buttons__name\"\u003E" + (null == (pug_interp = item.name) ? "" : pug_interp) + "\u003C\u002Fspan\u003E";
if ((isRich)) {
pug_html = pug_html + "\u003Cspan class=\"checkbox-buttons__description\"\u003E" + (null == (pug_interp = item.description) ? "" : pug_interp) + "\u003C\u002Fspan\u003E";
}
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Flabel\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index1 in $$obj) {
      $$l++;
      var item = $$obj[pug_index1];
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"checkbox-buttons__item\"\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Clabel class=\"checkbox-buttons__button\"\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cinput" + (" class=\"checkbox-buttons__input\""+" type=\"checkbox\""+pug.attr("checked", item.checked, true, true)) + "\u003E\u003Cspan class=\"checkbox-buttons__name\"\u003E" + (null == (pug_interp = item.name) ? "" : pug_interp) + "\u003C\u002Fspan\u003E";
if ((isRich)) {
pug_html = pug_html + "\u003Cspan class=\"checkbox-buttons__description\"\u003E" + (null == (pug_interp = item.description) ? "" : pug_interp) + "\u003C\u002Fspan\u003E";
}
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Flabel\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Ful\u003E";
};
pug_mixins["radio-buttons"] = pug_interp = function({ items, itemsName }){
var block = (this && this.block), attributes = (this && this.attributes) || {};
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"radio-buttons\"\u003E";
// iterate items
;(function(){
  var $$obj = items;
  if ('number' == typeof $$obj.length) {
      for (var index = 0, $$l = $$obj.length; index < $$l; index++) {
        var text = $$obj[index];
const checked = index === 0;
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Clabel class=\"radio-buttons__button\"\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cinput" + (" class=\"radio-buttons__input\""+" type=\"radio\""+pug.attr("name", itemsName, true, true)+pug.attr("checked", checked, true, true)) + "\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cp class=\"radio-buttons__button-text\"\u003E" + (pug.escape(null == (pug_interp = text) ? "" : pug_interp)) + "\u003C\u002Fp\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Flabel\u003E";
      }
  } else {
    var $$l = 0;
    for (var index in $$obj) {
      $$l++;
      var text = $$obj[index];
const checked = index === 0;
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Clabel class=\"radio-buttons__button\"\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cinput" + (" class=\"radio-buttons__input\""+" type=\"radio\""+pug.attr("name", itemsName, true, true)+pug.attr("checked", checked, true, true)) + "\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cp class=\"radio-buttons__button-text\"\u003E" + (pug.escape(null == (pug_interp = text) ? "" : pug_interp)) + "\u003C\u002Fp\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Flabel\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
};
pug_mixins["signup-card"] = pug_interp = function(){
var block = (this && this.block), attributes = (this && this.attributes) || {};
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cform class=\"signup-card\"\u003E";
pug_indent.push('  ');
pug_mixins["heading"]({
            type: 'h1',
            text: 'Регистрация аккаунта',
        });
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"signup-card__name\"\u003E";
pug_indent.push('    ');
pug_mixins["text-field"]({
                inputOptions: {
                    type: 'text',
                    placeholder: 'Имя',
                }
            });
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"signup-card__surname\"\u003E";
pug_indent.push('    ');
pug_mixins["text-field"]({
                inputOptions: {
                    type: 'text',
                    placeholder: 'Фамилия',
                }
            });
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"signup-card__gender\"\u003E";
pug_indent.push('    ');
pug_mixins["radio-buttons"]({
                items: ['Мужчина', 'Женщина'],
                itemsName: 'gender',
            });
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"signup-card__birth\"\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"signup-card__subtitle\"\u003E";
pug_indent.push('      ');
pug_mixins["heading"]({
                    text: 'Дата рождения',
                    type: 'h3',
                });
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
pug_indent.push('    ');
pug_mixins["text-field"]({
                inputOptions: {
                    placeholder: 'ДД.ММ.ГГГГ',
                    type: 'text',
                    isMaskedDate: true
                }
            });
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"signup-card__login-details\"\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"signup-card__subtitle\"\u003E";
pug_indent.push('      ');
pug_mixins["heading"]({
                    text: 'Данные для входа в сервис',
                    type: 'h3',
                });
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"signup-card__email\"\u003E";
pug_indent.push('      ');
pug_mixins["text-field"]({
                    inputOptions: {
                        type: 'email',
                        placeholder: 'Email',
                    }
                });
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"signup-card__password\"\u003E";
pug_indent.push('      ');
pug_mixins["text-field"]({
                    inputOptions: {
                        type: 'password',
                        placeholder: 'Пароль',
                    }
                });
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"signup-card__offers\"\u003E";
pug_indent.push('    ');
pug_mixins["checkbox-buttons"]({
                items: [{ name: 'Получать спецпредложения' }],
                theme: 'toggle',
            });
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
pug_indent.push('  ');
pug_mixins["button"]({
            text: 'Зарегистрироваться',
            hasLink: true,
            link: 'landing-page.html',
            modifiers: {
                isLong: true,
                textColor: 'white',
            }
        });
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"signup-card__account-exists js-signup-card__account-exists\"\u003E\u003Cspan\u003EУже есть аккаунт на Toxin\u003C\u002Fspan\u003E";
pug_indent.push('    ');
pug_mixins["button"]({
                text: 'Войти',
                hasLink: true,
                link: 'login.html',
                modifiers: {
                    isSecondary: true,
                    isWide: true,
                },
            });
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fform\u003E";
};
pug_mixins["heading"] = pug_interp = function({ text = '', type = 'h3', color, withJs = false }){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'heading';
let tag;

switch (type) {
    case 'h3':
        className += ' heading_type_h3';
        tag = 'h3';
        break;
    case 'h2':
        className += ' heading_type_h2';
        tag = 'h2';
        break;
    case 'inline':
        className += ' heading_type_h3';
        tag = 'span';
        break;
    default:
        tag = 'h1';
        break;
}
switch (color) {
    case 'white':
        className += ' heading_color_white';
        break;
    case 'purple':
        className += ' heading_color_purple';
        break;
    case 'gray':
        className += ' heading_color_gray';
        break;
    case 'inherit':
        className += ' heading_color_inherit';
        break;
    default:
        break;
}
if (withJs) {
  className += ' js-heading';
}

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C" + (tag) + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = text) ? "" : pug_interp)) + "\u003C\u002F" + (tag) + "\u003E";
};
pug_mixins["room-info"] = pug_interp = function({ number, type, price, isNameBig = false }){
var block = (this && this.block), attributes = (this && this.attributes) || {};
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv" + (pug.attr("class", pug.classes([`room-info${isNameBig ? ' room-info_size_big' : ''}`], [true]), false, true)) + "\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cheader class=\"room-info__name\"\u003E\u003Cspan class=\"room-info__number-sign\"\u003E№\u003C\u002Fspan\u003E";
if ((isNameBig)) {
pug_indent.push('    ');
pug_mixins["heading"]({
                  text: number,
                  type: 'h1',
                });
pug_indent.pop();
}
else {
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Ch3 class=\"room-info__number\"\u003E" + (pug.escape(null == (pug_interp = number) ? "" : pug_interp)) + "\u003C\u002Fh3\u003E";
}
if ((type)) {
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"room-info__type\"\u003E";
pug_indent.push('      ');
pug_mixins["heading"]({
                        text: type,
                        color: 'purple',
                    });
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fheader\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cp class=\"room-info__price\"\u003E" + (pug.escape(null == (pug_interp = `${price}₽`) ? "" : pug_interp)) + "\u003Cspan class=\"room-info__price-measure\"\u003Eв сутки\u003C\u002Fspan\u003E\u003C\u002Fp\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
};
pug_mixins["arrow"] = pug_interp = function({ type, color, withoutPadding = false } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'arrow';
let iconName = 'expand_more';

switch (type) {
    case 'expand-less':
        iconName = 'expand_less';
        break;
    case 'forward':
        iconName = 'arrow_forward';
        break;
    default:
        break;
}

switch (color) {
    case 'white':
        className += ' arrow_color_white';
        break;
    case 'purple-gradient':
        className += ' arrow_color_purple-gradient';
        break;
    default:
        break;
}

if (withoutPadding) {
    className += ' arrow_without-padding';
}

pug_html = pug_html + "\u003Cspan" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = iconName) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
};
pug_mixins["heading"] = pug_interp = function({ text = '', type = 'h3', color, withJs = false }){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'heading';
let tag;

switch (type) {
    case 'h3':
        className += ' heading_type_h3';
        tag = 'h3';
        break;
    case 'h2':
        className += ' heading_type_h2';
        tag = 'h2';
        break;
    case 'inline':
        className += ' heading_type_h3';
        tag = 'span';
        break;
    default:
        tag = 'h1';
        break;
}
switch (color) {
    case 'white':
        className += ' heading_color_white';
        break;
    case 'purple':
        className += ' heading_color_purple';
        break;
    case 'gray':
        className += ' heading_color_gray';
        break;
    case 'inherit':
        className += ' heading_color_inherit';
        break;
    default:
        break;
}
if (withJs) {
  className += ' js-heading';
}

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C" + (tag) + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = text) ? "" : pug_interp)) + "\u003C\u002F" + (tag) + "\u003E";
};
pug_mixins["button"] = pug_interp = function(options = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
const {
    text = 'click me',
    hasLink = false,
    isSubmit = false,
    link = 'change-me',
    modifiers = {},
    withJs = false,
} = options;

let className = 'button';
let headingOptions = {
    text,
    type: 'inline',
    color: 'white',
};

if (hasLink) {
    headingOptions.type = 'h3';
}

if (modifiers.isSecondary) {
    className += ' button_secondary';
    headingOptions.color = 'purple';
}
if (modifiers.withoutFrame) {
    headingOptions.color = 'inherit';
    className += ' button_without-frame';
}
if (modifiers.isLong) {
    className += ' button_long';
}
if (modifiers.isHovered) {
    className += ' button_hovered';
}
if (modifiers.isNarrow) {
    className += ' button_narrow';
}
if (modifiers.isWide) {
    className += ' button_wide';
}
if (withJs) {
  className += ' js-button';
}

switch (modifiers.textColor) {
    case 'white':
        headingOptions.color = 'white';
        break;
    case 'purple':
        headingOptions.color = 'purple';
        break;
    case 'gray':
        headingOptions.color = 'gray';
        break;
    default:
        break;
}

if ((hasLink)) {
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E\u003Ca" + (" class=\"button__text\""+pug.attr("href", link, true, true)) + "\u003E";
pug_indent.push('    ');
pug_mixins["heading"](headingOptions);
pug_indent.pop();
pug_html = pug_html + "\u003C\u002Fa\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"button__arrow\"\u003E";
pug_indent.push('    ');
pug_mixins["arrow"]({
                  type: 'forward',
                  color: 'white',
                });
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
else {
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cbutton" + (pug.attr("class", pug.classes([className], [true]), false, true)+pug.attr("type", isSubmit ? 'submit' : 'button', true, true)) + "\u003E\u003Cspan class=\"button__text\"\u003E";
pug_indent.push('    ');
pug_mixins["heading"](headingOptions);
pug_indent.pop();
pug_html = pug_html + "\u003C\u002Fspan\u003E\u003Cspan class=\"button__arrow\"\u003E";
pug_indent.push('    ');
pug_mixins["arrow"]({
                    type: 'forward',
                    color: 'white',
                });
pug_indent.pop();
pug_html = pug_html + "\u003C\u002Fspan\u003E\u003C\u002Fbutton\u003E";
}
};
pug_mixins["date-picker"] = pug_interp = function(options = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
const {
    withBorder = false,
    dateFormat = null,
    initialDate = [null, null],
    isTextDouble = false,
} = options;

let className = 'date-picker js-date-picker';
if (withBorder) {
    className += ' date-picker_with-border';
}
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv" + (pug.attr("class", pug.classes([className], [true]), false, true)+pug.attr("data-date-format", dateFormat, true, true)+pug.attr("data-initial-date", initialDate, true, true)+pug.attr("data-is-text-double", isTextDouble ? 'true' : 'false', true, true)) + "\u003E\u003C\u002Fdiv\u003E";
};
pug_mixins["heading"] = pug_interp = function({ text = '', type = 'h3', color, withJs = false }){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'heading';
let tag;

switch (type) {
    case 'h3':
        className += ' heading_type_h3';
        tag = 'h3';
        break;
    case 'h2':
        className += ' heading_type_h2';
        tag = 'h2';
        break;
    case 'inline':
        className += ' heading_type_h3';
        tag = 'span';
        break;
    default:
        tag = 'h1';
        break;
}
switch (color) {
    case 'white':
        className += ' heading_color_white';
        break;
    case 'purple':
        className += ' heading_color_purple';
        break;
    case 'gray':
        className += ' heading_color_gray';
        break;
    case 'inherit':
        className += ' heading_color_inherit';
        break;
    default:
        break;
}
if (withJs) {
  className += ' js-heading';
}

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C" + (tag) + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = text) ? "" : pug_interp)) + "\u003C\u002F" + (tag) + "\u003E";
};
pug_mixins["counting-item"] = pug_interp = function({ name = '', value = 0, nameDeclensions } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv" + (" class=\"counting-item js-counting-item\""+pug.attr("data-words", nameDeclensions ? JSON.stringify(nameDeclensions) : false, true, true)) + "\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"counting-item__name js-counting-item__name\"\u003E";
pug_indent.push('    ');
pug_mixins["heading"]({
                text: name,
                withJs: true,
            });
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"counting-item__counter\"\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cbutton class=\"counting-item__change-button counting-item__change-button_action_decrease js-counting-item__change-button_action_decrease\" type=\"button\"\u003E-\u003C\u002Fbutton\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"counting-item__value js-counting-item__value\"\u003E";
pug_indent.push('      ');
pug_mixins["heading"]({
                    text: value,
                    withJs: true,
                });
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cbutton class=\"counting-item__change-button counting-item__change-button_action_increase js-counting-item__change-button_action_increase\" type=\"button\"\u003E+\u003C\u002Fbutton\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
};
pug_mixins["arrow"] = pug_interp = function({ type, color, withoutPadding = false } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'arrow';
let iconName = 'expand_more';

switch (type) {
    case 'expand-less':
        iconName = 'expand_less';
        break;
    case 'forward':
        iconName = 'arrow_forward';
        break;
    default:
        break;
}

switch (color) {
    case 'white':
        className += ' arrow_color_white';
        break;
    case 'purple-gradient':
        className += ' arrow_color_purple-gradient';
        break;
    default:
        break;
}

if (withoutPadding) {
    className += ' arrow_without-padding';
}

pug_html = pug_html + "\u003Cspan" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = iconName) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
};
pug_mixins["heading"] = pug_interp = function({ text = '', type = 'h3', color, withJs = false }){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'heading';
let tag;

switch (type) {
    case 'h3':
        className += ' heading_type_h3';
        tag = 'h3';
        break;
    case 'h2':
        className += ' heading_type_h2';
        tag = 'h2';
        break;
    case 'inline':
        className += ' heading_type_h3';
        tag = 'span';
        break;
    default:
        tag = 'h1';
        break;
}
switch (color) {
    case 'white':
        className += ' heading_color_white';
        break;
    case 'purple':
        className += ' heading_color_purple';
        break;
    case 'gray':
        className += ' heading_color_gray';
        break;
    case 'inherit':
        className += ' heading_color_inherit';
        break;
    default:
        break;
}
if (withJs) {
  className += ' js-heading';
}

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C" + (tag) + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = text) ? "" : pug_interp)) + "\u003C\u002F" + (tag) + "\u003E";
};
pug_mixins["button"] = pug_interp = function(options = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
const {
    text = 'click me',
    hasLink = false,
    isSubmit = false,
    link = 'change-me',
    modifiers = {},
    withJs = false,
} = options;

let className = 'button';
let headingOptions = {
    text,
    type: 'inline',
    color: 'white',
};

if (hasLink) {
    headingOptions.type = 'h3';
}

if (modifiers.isSecondary) {
    className += ' button_secondary';
    headingOptions.color = 'purple';
}
if (modifiers.withoutFrame) {
    headingOptions.color = 'inherit';
    className += ' button_without-frame';
}
if (modifiers.isLong) {
    className += ' button_long';
}
if (modifiers.isHovered) {
    className += ' button_hovered';
}
if (modifiers.isNarrow) {
    className += ' button_narrow';
}
if (modifiers.isWide) {
    className += ' button_wide';
}
if (withJs) {
  className += ' js-button';
}

switch (modifiers.textColor) {
    case 'white':
        headingOptions.color = 'white';
        break;
    case 'purple':
        headingOptions.color = 'purple';
        break;
    case 'gray':
        headingOptions.color = 'gray';
        break;
    default:
        break;
}

if ((hasLink)) {
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E\u003Ca" + (" class=\"button__text\""+pug.attr("href", link, true, true)) + "\u003E";
pug_indent.push('    ');
pug_mixins["heading"](headingOptions);
pug_indent.pop();
pug_html = pug_html + "\u003C\u002Fa\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"button__arrow\"\u003E";
pug_indent.push('    ');
pug_mixins["arrow"]({
                  type: 'forward',
                  color: 'white',
                });
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
else {
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cbutton" + (pug.attr("class", pug.classes([className], [true]), false, true)+pug.attr("type", isSubmit ? 'submit' : 'button', true, true)) + "\u003E\u003Cspan class=\"button__text\"\u003E";
pug_indent.push('    ');
pug_mixins["heading"](headingOptions);
pug_indent.pop();
pug_html = pug_html + "\u003C\u002Fspan\u003E\u003Cspan class=\"button__arrow\"\u003E";
pug_indent.push('    ');
pug_mixins["arrow"]({
                    type: 'forward',
                    color: 'white',
                });
pug_indent.pop();
pug_html = pug_html + "\u003C\u002Fspan\u003E\u003C\u002Fbutton\u003E";
}
};
pug_mixins["items-counter"] = pug_interp = function(options = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
const {
    items,
    withoutButtons = false,
    wordForValueTextReplacing = null,
    itemIndexForSeparateCount = null,
} = options;

let className = 'items-counter js-items-counter';
if (withoutButtons) {
    className += ' items-counter_without-buttons';
}
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv" + (pug.attr("class", pug.classes([className], [true]), false, true)+pug.attr("data-replace-text", JSON.stringify(wordForValueTextReplacing), true, true)+pug.attr("data-separate-item", JSON.stringify(itemIndexForSeparateCount), true, true)) + "\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cul class=\"items-counter__items-list\"\u003E";
// iterate items
;(function(){
  var $$obj = items;
  if ('number' == typeof $$obj.length) {
      for (var pug_index3 = 0, $$l = $$obj.length; pug_index3 < $$l; pug_index3++) {
        var item = $$obj[pug_index3];
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"items-counter__item\"\u003E";
pug_indent.push('      ');
pug_mixins["counting-item"]({
                        name: item.name,
                        value: item.value,
                        nameDeclensions: item.nameDeclensions,
                    });
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index3 in $$obj) {
      $$l++;
      var item = $$obj[pug_index3];
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"items-counter__item\"\u003E";
pug_indent.push('      ');
pug_mixins["counting-item"]({
                        name: item.name,
                        value: item.value,
                        nameDeclensions: item.nameDeclensions,
                    });
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Ful\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"items-counter__button-panel\"\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"items-counter__clear-button js-items-counter__clear-button\"\u003E";
pug_indent.push('      ');
pug_mixins["button"]({
                    text: 'Очистить',
                    hasLink: false,
                    modifiers: {
                        withoutFrame: true,
                    }
                });
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"items-counter__apply-button js-items-counter__apply-button\"\u003E";
pug_indent.push('      ');
pug_mixins["button"]({
                    text: 'Применить',
                    hasLink: false,
                    modifiers: {
                        withoutFrame: true,
                    }
                });
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
};
pug_mixins["arrow"] = pug_interp = function({ type, color, withoutPadding = false } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'arrow';
let iconName = 'expand_more';

switch (type) {
    case 'expand-less':
        iconName = 'expand_less';
        break;
    case 'forward':
        iconName = 'arrow_forward';
        break;
    default:
        break;
}

switch (color) {
    case 'white':
        className += ' arrow_color_white';
        break;
    case 'purple-gradient':
        className += ' arrow_color_purple-gradient';
        break;
    default:
        break;
}

if (withoutPadding) {
    className += ' arrow_without-padding';
}

pug_html = pug_html + "\u003Cspan" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = iconName) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
};
pug_mixins["text-field"] = pug_interp = function({ inputOptions = {}, arrowOptions, modifiers = {}, withJs = false } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'text-field';

if (modifiers.isFocused) {
    className += ' text-field_focused';
}
if (modifiers.isShort) {
    className += ' text-field_short';
}
if (modifiers.isBottomFlat) {
    className += ' text-field_flat-bottom';
}
if (modifiers.isClickable) {
    className += ' text-field_clickable';
}

if (withJs) {
    className += ' js-text-field';
}

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E";
let inputClassName = 'text-field__input';
if (arrowOptions) {
    inputClassName += ' text-field__input_with-arrow';
}
if (inputOptions.isMaskedDate) {
    inputClassName += ' text-field__input_masked-date js-text-field__input_masked-date'
}
if (inputOptions.withJs) {
    inputClassName += ' js-text-field__input';
}

pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cinput" + (pug.attr("class", pug.classes([inputClassName], [true]), false, true)+pug.attr("type", inputOptions.type, true, true)+pug.attr("placeholder", inputOptions.placeholder, true, true)+pug.attr("value", inputOptions.value, true, true)+pug.attr("readonly", inputOptions.isReadonly, true, true)) + "\u003E";
if ((arrowOptions)) {
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cbutton" + (" class=\"text-field__arrow\""+pug.attr("type", inputOptions.isSubmit ? 'submit' : 'button', true, true)) + "\u003E";
pug_indent.push('    ');
pug_mixins["arrow"](arrowOptions);
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fbutton\u003E";
}
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
};
pug_mixins["dropdown"] = pug_interp = function(options = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let {
    inputOptions = {},
    popupMixinOptions = {},
    popupHidden = true,
    title,
    isDouble = false,
    isShort = false,
    isPopupDistant = false,
    defaultInputValue = '',
} = options;

let className = 'dropdown js-dropdown';
if (isDouble) {
    className += ' dropdown_double';
}
if (isShort) {
  className += ' dropdown_short';
}
if (isPopupDistant) {
  className += ' dropdown_with-distant-popup';
}

if (isDouble) {
    if (!Array.isArray(title)) {
        title = [title, title];
    }
    if (!Array.isArray(inputOptions)) {
        inputOptions = [inputOptions, inputOptions];
    }
}
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Csection" + (pug.attr("class", pug.classes([className], [true]), false, true)+pug.attr("data-default-value", JSON.stringify(defaultInputValue), true, true)) + "\u003E";
if ((isDouble)) {
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"dropdown__text-field js-dropdown__text-field\"\u003E";
if ((title[0])) {
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"dropdown__title\"\u003E";
pug_indent.push('      ');
pug_mixins["heading"]({
                            text: title[0],
                        });
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
pug_indent.push('    ');
pug_mixins["text-field"]({
                    inputOptions: {
                        ...inputOptions[0],
                        isMaskedDate: false,
                        isReadonly: true,
                        withJs: true,
                    },
                    arrowOptions: {},
                    modifiers: {
                        isFocused: !popupHidden,
                        isBottomFlat: !popupHidden,
                        isClickable: true,
                    },
                    withJs: true,
                });
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"dropdown__text-field js-dropdown__text-field\"\u003E";
if ((title[1])) {
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"dropdown__title\"\u003E";
pug_indent.push('      ');
pug_mixins["heading"]({
                            text: title[1],
                        });
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
pug_indent.push('    ');
pug_mixins["text-field"]({
                    inputOptions: {
                        ...inputOptions[1],
                        isMaskedDate: false,
                        isReadonly: true,
                        withJs: true,
                    },
                    arrowOptions: {},
                    modifiers: {
                        isFocused: !popupHidden,
                        isBottomFlat: !popupHidden,
                        isClickable: true,
                    },
                    withJs: true,
                });
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
else {
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"dropdown__text-field js-dropdown__text-field\"\u003E";
if ((title)) {
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"dropdown__title\"\u003E";
pug_indent.push('      ');
pug_mixins["heading"]({
                            text: title,
                        });
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
pug_indent.push('    ');
pug_mixins["text-field"]({
                    inputOptions: {
                        ...inputOptions,
                        isMaskedDate: false,
                        isReadonly: true,
                        withJs: true,
                    },
                    arrowOptions: {},
                    modifiers: {
                        isFocused: !popupHidden,
                        isBottomFlat: !popupHidden,
                        isClickable: true,
                    },
                    withJs: true,
                });
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv" + (pug.attr("class", pug.classes(["dropdown__popup","js-dropdown__popup",`${popupHidden ? 'dropdown__popup_hidden' : false}`], [false,false,true]), false, true)) + "\u003E";
if ((popupMixinOptions.name)) {
pug_indent.push('    ');
pug_mixins[popupMixinOptions.name](popupMixinOptions.params);
pug_indent.pop();
}
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fsection\u003E";
};
pug_mixins["heading"] = pug_interp = function({ text = '', type = 'h3', color, withJs = false }){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'heading';
let tag;

switch (type) {
    case 'h3':
        className += ' heading_type_h3';
        tag = 'h3';
        break;
    case 'h2':
        className += ' heading_type_h2';
        tag = 'h2';
        break;
    case 'inline':
        className += ' heading_type_h3';
        tag = 'span';
        break;
    default:
        tag = 'h1';
        break;
}
switch (color) {
    case 'white':
        className += ' heading_color_white';
        break;
    case 'purple':
        className += ' heading_color_purple';
        break;
    case 'gray':
        className += ' heading_color_gray';
        break;
    case 'inherit':
        className += ' heading_color_inherit';
        break;
    default:
        break;
}
if (withJs) {
  className += ' js-heading';
}

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C" + (tag) + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = text) ? "" : pug_interp)) + "\u003C\u002F" + (tag) + "\u003E";
};
pug_mixins["booking-card"] = pug_interp = function({ roomInfo, bookingItems, totalPrice } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Carticle class=\"booking-card js-booking-card\"\u003E";
pug_indent.push('  ');
pug_mixins["room-info"](roomInfo);
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cform\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"booking-card__dates\"\u003E";
pug_indent.push('      ');
pug_mixins["dropdown"]({
                    isDouble: true,
                    title: ['Прибытие', 'Выезд'],
                    inputOptions: [
                        {
                            value: '19.08.2019',
                            placeholder: 'ДД.ММ.ГГГГ',
                        },
                        {
                            value: '23.08.2019',
                            placeholder: 'ДД.ММ.ГГГГ',
                        },
                    ],
                    popupMixinOptions: {
                        name: 'date-picker',
                        params: {
                          initialDate: [new Date(2019, 7, 19), new Date(2019, 7, 23)],
                          isTextDouble: true,
                        },
                    },
                    isPopupDistant: true,
                    defaultInputValue: 'ДД.ММ.ГГГГ',
                });
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"booking-card__guests\"\u003E";
pug_indent.push('      ');
pug_mixins["dropdown"]({
                    inputOptions: {
                        value: '3 гостя',
                        placeholder: 'Сколько гостей',
                    },
                    popupMixinOptions: {
                        name: 'items-counter',
                        params: {
                            items: [
                                {
                                    name: 'Взрослые',
                                    value: 2,
                                },
                                {
                                    name: 'Дети',
                                    value: 1,
                                },
                                {
                                    name: 'Младенцы',
                                    value: 0,
                                    nameDeclensions: ['младенец', 'младенца', 'младенцев'],
                                },
                            ],
                            wordForValueTextReplacing: ['гость', 'гостя', 'гостей'],
                            itemIndexForSeparateCount: 2,
                        },
                    },
                    title: 'Гости',
                    defaultInputValue: 'Сколько гостей',
                });
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cul class=\"booking-card__items\"\u003E";
// iterate bookingItems
;(function(){
  var $$obj = bookingItems;
  if ('number' == typeof $$obj.length) {
      for (var pug_index4 = 0, $$l = $$obj.length; pug_index4 < $$l; pug_index4++) {
        var item = $$obj[pug_index4];
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"booking-card__item\"\u003E\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + ("\u003Cp class=\"booking-card__item-text\"\u003E" + (null == (pug_interp = item.text) ? "" : pug_interp));
if ((item.tooltip)) {
pug_html = pug_html + "\u003Cspan" + (" class=\"booking-card__tooltip\""+pug.attr("data-text", item.tooltip, true, true)) + "\u003Ei\u003C\u002Fspan\u003E";
}
pug_html = pug_html + "\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fp\u003E\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Coutput class=\"booking-card__item-price\"\u003E" + (pug.escape(null == (pug_interp = `${item.price}₽`) ? "" : pug_interp)) + "\u003C\u002Foutput\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index4 in $$obj) {
      $$l++;
      var item = $$obj[pug_index4];
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"booking-card__item\"\u003E\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + ("\u003Cp class=\"booking-card__item-text\"\u003E" + (null == (pug_interp = item.text) ? "" : pug_interp));
if ((item.tooltip)) {
pug_html = pug_html + "\u003Cspan" + (" class=\"booking-card__tooltip\""+pug.attr("data-text", item.tooltip, true, true)) + "\u003Ei\u003C\u002Fspan\u003E";
}
pug_html = pug_html + "\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fp\u003E\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Coutput class=\"booking-card__item-price\"\u003E" + (pug.escape(null == (pug_interp = `${item.price}₽`) ? "" : pug_interp)) + "\u003C\u002Foutput\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Ful\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"booking-card__total\"\u003E";
pug_indent.push('      ');
pug_mixins["heading"]({
                    text: 'Итого',
                    type: 'h2',
                });
pug_indent.pop();
pug_html = pug_html + "\u003Cspan class=\"booking-card__dots\"\u003E\u003C\u002Fspan\u003E";
pug_indent.push('      ');
pug_mixins["heading"]({
                    text: `${totalPrice}₽`,
                    type: 'h2',
                });
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
pug_indent.push('    ');
pug_mixins["button"]({
                text: 'Забронировать',
                hasLink: true,
                link: 'landing-page.html',
                modifiers: {
                    isLong: true,
                    textColor: 'white',
                }
            });
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fform\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Farticle\u003E";
};
pug_mixins["heading"] = pug_interp = function({ text = '', type = 'h3', color, withJs = false }){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'heading';
let tag;

switch (type) {
    case 'h3':
        className += ' heading_type_h3';
        tag = 'h3';
        break;
    case 'h2':
        className += ' heading_type_h2';
        tag = 'h2';
        break;
    case 'inline':
        className += ' heading_type_h3';
        tag = 'span';
        break;
    default:
        tag = 'h1';
        break;
}
switch (color) {
    case 'white':
        className += ' heading_color_white';
        break;
    case 'purple':
        className += ' heading_color_purple';
        break;
    case 'gray':
        className += ' heading_color_gray';
        break;
    case 'inherit':
        className += ' heading_color_inherit';
        break;
    default:
        break;
}
if (withJs) {
  className += ' js-heading';
}

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C" + (tag) + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = text) ? "" : pug_interp)) + "\u003C\u002F" + (tag) + "\u003E";
};
pug_mixins["arrow"] = pug_interp = function({ type, color, withoutPadding = false } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'arrow';
let iconName = 'expand_more';

switch (type) {
    case 'expand-less':
        iconName = 'expand_less';
        break;
    case 'forward':
        iconName = 'arrow_forward';
        break;
    default:
        break;
}

switch (color) {
    case 'white':
        className += ' arrow_color_white';
        break;
    case 'purple-gradient':
        className += ' arrow_color_purple-gradient';
        break;
    default:
        break;
}

if (withoutPadding) {
    className += ' arrow_without-padding';
}

pug_html = pug_html + "\u003Cspan" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = iconName) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
};
pug_mixins["heading"] = pug_interp = function({ text = '', type = 'h3', color, withJs = false }){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'heading';
let tag;

switch (type) {
    case 'h3':
        className += ' heading_type_h3';
        tag = 'h3';
        break;
    case 'h2':
        className += ' heading_type_h2';
        tag = 'h2';
        break;
    case 'inline':
        className += ' heading_type_h3';
        tag = 'span';
        break;
    default:
        tag = 'h1';
        break;
}
switch (color) {
    case 'white':
        className += ' heading_color_white';
        break;
    case 'purple':
        className += ' heading_color_purple';
        break;
    case 'gray':
        className += ' heading_color_gray';
        break;
    case 'inherit':
        className += ' heading_color_inherit';
        break;
    default:
        break;
}
if (withJs) {
  className += ' js-heading';
}

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C" + (tag) + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = text) ? "" : pug_interp)) + "\u003C\u002F" + (tag) + "\u003E";
};
pug_mixins["button"] = pug_interp = function(options = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
const {
    text = 'click me',
    hasLink = false,
    isSubmit = false,
    link = 'change-me',
    modifiers = {},
    withJs = false,
} = options;

let className = 'button';
let headingOptions = {
    text,
    type: 'inline',
    color: 'white',
};

if (hasLink) {
    headingOptions.type = 'h3';
}

if (modifiers.isSecondary) {
    className += ' button_secondary';
    headingOptions.color = 'purple';
}
if (modifiers.withoutFrame) {
    headingOptions.color = 'inherit';
    className += ' button_without-frame';
}
if (modifiers.isLong) {
    className += ' button_long';
}
if (modifiers.isHovered) {
    className += ' button_hovered';
}
if (modifiers.isNarrow) {
    className += ' button_narrow';
}
if (modifiers.isWide) {
    className += ' button_wide';
}
if (withJs) {
  className += ' js-button';
}

switch (modifiers.textColor) {
    case 'white':
        headingOptions.color = 'white';
        break;
    case 'purple':
        headingOptions.color = 'purple';
        break;
    case 'gray':
        headingOptions.color = 'gray';
        break;
    default:
        break;
}

if ((hasLink)) {
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E\u003Ca" + (" class=\"button__text\""+pug.attr("href", link, true, true)) + "\u003E";
pug_indent.push('    ');
pug_mixins["heading"](headingOptions);
pug_indent.pop();
pug_html = pug_html + "\u003C\u002Fa\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"button__arrow\"\u003E";
pug_indent.push('    ');
pug_mixins["arrow"]({
                  type: 'forward',
                  color: 'white',
                });
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
else {
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cbutton" + (pug.attr("class", pug.classes([className], [true]), false, true)+pug.attr("type", isSubmit ? 'submit' : 'button', true, true)) + "\u003E\u003Cspan class=\"button__text\"\u003E";
pug_indent.push('    ');
pug_mixins["heading"](headingOptions);
pug_indent.pop();
pug_html = pug_html + "\u003C\u002Fspan\u003E\u003Cspan class=\"button__arrow\"\u003E";
pug_indent.push('    ');
pug_mixins["arrow"]({
                    type: 'forward',
                    color: 'white',
                });
pug_indent.pop();
pug_html = pug_html + "\u003C\u002Fspan\u003E\u003C\u002Fbutton\u003E";
}
};
pug_mixins["arrow"] = pug_interp = function({ type, color, withoutPadding = false } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'arrow';
let iconName = 'expand_more';

switch (type) {
    case 'expand-less':
        iconName = 'expand_less';
        break;
    case 'forward':
        iconName = 'arrow_forward';
        break;
    default:
        break;
}

switch (color) {
    case 'white':
        className += ' arrow_color_white';
        break;
    case 'purple-gradient':
        className += ' arrow_color_purple-gradient';
        break;
    default:
        break;
}

if (withoutPadding) {
    className += ' arrow_without-padding';
}

pug_html = pug_html + "\u003Cspan" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = iconName) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
};
pug_mixins["text-field"] = pug_interp = function({ inputOptions = {}, arrowOptions, modifiers = {}, withJs = false } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'text-field';

if (modifiers.isFocused) {
    className += ' text-field_focused';
}
if (modifiers.isShort) {
    className += ' text-field_short';
}
if (modifiers.isBottomFlat) {
    className += ' text-field_flat-bottom';
}
if (modifiers.isClickable) {
    className += ' text-field_clickable';
}

if (withJs) {
    className += ' js-text-field';
}

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E";
let inputClassName = 'text-field__input';
if (arrowOptions) {
    inputClassName += ' text-field__input_with-arrow';
}
if (inputOptions.isMaskedDate) {
    inputClassName += ' text-field__input_masked-date js-text-field__input_masked-date'
}
if (inputOptions.withJs) {
    inputClassName += ' js-text-field__input';
}

pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cinput" + (pug.attr("class", pug.classes([inputClassName], [true]), false, true)+pug.attr("type", inputOptions.type, true, true)+pug.attr("placeholder", inputOptions.placeholder, true, true)+pug.attr("value", inputOptions.value, true, true)+pug.attr("readonly", inputOptions.isReadonly, true, true)) + "\u003E";
if ((arrowOptions)) {
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cbutton" + (" class=\"text-field__arrow\""+pug.attr("type", inputOptions.isSubmit ? 'submit' : 'button', true, true)) + "\u003E";
pug_indent.push('    ');
pug_mixins["arrow"](arrowOptions);
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fbutton\u003E";
}
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
};
pug_mixins["signin-card"] = pug_interp = function(){
var block = (this && this.block), attributes = (this && this.attributes) || {};
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cform class=\"signin-card\"\u003E";
pug_indent.push('  ');
pug_mixins["heading"]({
            type: 'h1',
            text: 'Войти',
        });
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"signin-card__email\"\u003E";
pug_indent.push('    ');
pug_mixins["text-field"]({
                inputOptions: {
                    placeholder: 'Email',
                    type: 'email',
                },
            });
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"signin-card__password\"\u003E";
pug_indent.push('    ');
pug_mixins["text-field"]({
                inputOptions: {
                    type: 'password',
                    placeholder: 'Пароль',
                },
            });
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
pug_indent.push('  ');
pug_mixins["button"]({
            text: 'Войти',
            hasLink: true,
            link: 'landing-page.html',
            modifiers: {
                isLong: true,
                textColor: 'white',
            },
        });
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"signin-card__account-not-exists js-signin-card__account-not-exists\"\u003E\u003Cspan\u003EНет аккаунта на Toxin?\u003C\u002Fspan\u003E";
pug_indent.push('    ');
pug_mixins["button"]({
                text: 'Создать',
                hasLink: true,
                link: 'registration.html',
                modifiers: {
                    isSecondary: true,
                },
            });
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fform\u003E";
};
pug_mixins["heading"] = pug_interp = function({ text = '', type = 'h3', color, withJs = false }){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'heading';
let tag;

switch (type) {
    case 'h3':
        className += ' heading_type_h3';
        tag = 'h3';
        break;
    case 'h2':
        className += ' heading_type_h2';
        tag = 'h2';
        break;
    case 'inline':
        className += ' heading_type_h3';
        tag = 'span';
        break;
    default:
        tag = 'h1';
        break;
}
switch (color) {
    case 'white':
        className += ' heading_color_white';
        break;
    case 'purple':
        className += ' heading_color_purple';
        break;
    case 'gray':
        className += ' heading_color_gray';
        break;
    case 'inherit':
        className += ' heading_color_inherit';
        break;
    default:
        break;
}
if (withJs) {
  className += ' js-heading';
}

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C" + (tag) + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = text) ? "" : pug_interp)) + "\u003C\u002F" + (tag) + "\u003E";
};
pug_mixins["room-info"] = pug_interp = function({ number, type, price, isNameBig = false }){
var block = (this && this.block), attributes = (this && this.attributes) || {};
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv" + (pug.attr("class", pug.classes([`room-info${isNameBig ? ' room-info_size_big' : ''}`], [true]), false, true)) + "\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cheader class=\"room-info__name\"\u003E\u003Cspan class=\"room-info__number-sign\"\u003E№\u003C\u002Fspan\u003E";
if ((isNameBig)) {
pug_indent.push('    ');
pug_mixins["heading"]({
                  text: number,
                  type: 'h1',
                });
pug_indent.pop();
}
else {
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Ch3 class=\"room-info__number\"\u003E" + (pug.escape(null == (pug_interp = number) ? "" : pug_interp)) + "\u003C\u002Fh3\u003E";
}
if ((type)) {
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"room-info__type\"\u003E";
pug_indent.push('      ');
pug_mixins["heading"]({
                        text: type,
                        color: 'purple',
                    });
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fheader\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cp class=\"room-info__price\"\u003E" + (pug.escape(null == (pug_interp = `${price}₽`) ? "" : pug_interp)) + "\u003Cspan class=\"room-info__price-measure\"\u003Eв сутки\u003C\u002Fspan\u003E\u003C\u002Fp\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
};
pug_mixins["rate-button"] = pug_interp = function(currentRating){
var block = (this && this.block), attributes = (this && this.attributes) || {};
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cul class=\"rate-button\"\u003E";
for (let i = 1; i <= 5; i += 1)
{
const active = i <= currentRating;
let className = 'material-icons rate-button__star';
if (active) {
    className += ' rate-button__star_active';
}
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E\u003C\u002Fli\u003E";
}
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Ful\u003E";
};
pug_mixins["room-card"] = pug_interp = function(options = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
const {
    imagesSrc,
    hasSliderArrows = false,
    roomInfo,
    rating,
    numOfComments,
    link = 'room-details.html',
} = options;

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Carticle class=\"room-card js-room-card\"\u003E";
let sliderClassName = 'room-card__slider js-room-card__slider';
if (hasSliderArrows) {
    sliderClassName += ' room-card__slider_with-arrows';
}
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv" + (pug.attr("class", pug.classes([sliderClassName], [true]), false, true)) + "\u003E";
// iterate imagesSrc
;(function(){
  var $$obj = imagesSrc;
  if ('number' == typeof $$obj.length) {
      for (var pug_index5 = 0, $$l = $$obj.length; pug_index5 < $$l; pug_index5++) {
        var src = $$obj[pug_index5];
pug_html = pug_html + "\u003Cimg" + (" class=\"room-card__img\""+pug.attr("src", src, true, true)+" alt=\"room-image\"") + "\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index5 in $$obj) {
      $$l++;
      var src = $$obj[pug_index5];
pug_html = pug_html + "\u003Cimg" + (" class=\"room-card__img\""+pug.attr("src", src, true, true)+" alt=\"room-image\"") + "\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"room-card__content\"\u003E\u003Ca" + (" class=\"room-card__room-info\""+pug.attr("href", link, true, true)) + "\u003E";
pug_indent.push('      ');
pug_mixins["room-info"](roomInfo);
pug_indent.pop();
pug_html = pug_html + "\u003C\u002Fa\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"room-card__footer\"\u003E";
pug_indent.push('      ');
pug_mixins["rate-button"](rating);
pug_indent.pop();
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cp class=\"room-card__comments\"\u003E" + (pug.escape(null == (pug_interp = numOfComments) ? "" : pug_interp)) + "\u003Cspan class=\"room-card__comments-measure\"\u003EОтзывов\u003C\u002Fspan\u003E\u003C\u002Fp\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Farticle\u003E";
};
pug_mixins["date-picker"] = pug_interp = function(options = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
const {
    withBorder = false,
    dateFormat = null,
    initialDate = [null, null],
    isTextDouble = false,
} = options;

let className = 'date-picker js-date-picker';
if (withBorder) {
    className += ' date-picker_with-border';
}
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv" + (pug.attr("class", pug.classes([className], [true]), false, true)+pug.attr("data-date-format", dateFormat, true, true)+pug.attr("data-initial-date", initialDate, true, true)+pug.attr("data-is-text-double", isTextDouble ? 'true' : 'false', true, true)) + "\u003E\u003C\u002Fdiv\u003E";
};
const name = 'cards';
pug_html = pug_html + "\u003C!DOCTYPE html\u003E\n\u003Chtml lang=\"ru\"\u003E\n  \u003Chead\u003E\n    \u003Cmeta charset=\"utf-8\"\u003E\n    \u003Cmeta" + (" name=\"description\""+pug.attr("content", `UI Kit for Toxin Hotel pages (${name})`, true, true)) + "\u003E\n    \u003Cmeta" + (" name=\"keywords\""+pug.attr("content", `toxin, ui-kit ${name}`, true, true)) + "\u003E\n    \u003Cmeta name=\"viewport\" content=\"initial-scale=1.0, width=device-width\"\u003E\n    \u003Clink" + (" rel=\"apple-touch-icon\" sizes=\"180x180\""+pug.attr("href", __webpack_require__(6).default, true, true)) + "\u003E\n    \u003Clink" + (" rel=\"icon\" type=\"image\u002Fpng\" sizes=\"32x32\""+pug.attr("href", __webpack_require__(8).default, true, true)) + "\u003E\n    \u003Clink" + (" rel=\"icon\" type=\"image\u002Fpng\" sizes=\"16x16\""+pug.attr("href", __webpack_require__(7).default, true, true)) + "\u003E\n    \u003Clink rel=\"manifest\" href=\".\u002Fsite.webmanifest\"\u003E\n    \u003Clink" + (" rel=\"mask-icon\""+pug.attr("href", __webpack_require__(10).default, true, true)+" color=\"#bc9cff\"") + "\u003E\n    \u003Clink" + (" rel=\"shortcut icon\""+pug.attr("href", __webpack_require__(9).default, true, true)) + "\u003E\n    \u003Cmeta name=\"msapplication-TileColor\" content=\"#603cba\"\u003E\n    \u003Cmeta name=\"msapplication-config\" content=\".\u002Fbrowserconfig.xml\"\u003E\n    \u003Cmeta name=\"theme-color\" content=\"#ffffff\"\u003E\n    \u003Ctitle\u003E" + (pug.escape(null == (pug_interp = name) ? "" : pug_interp)) + "\u003C\u002Ftitle\u003E\n  \u003C\u002Fhead\u003E\n  \u003Cbody\u003E\n    \u003Cdiv class=\"ui-logo-container\"\u003E\u003Cimg class=\"ui-logo-container__logo\" src=\"images\u002Flogo-icon.svg\" alt=\"logo\"\u003E\u003C\u002Fdiv\u003E\n    \u003Cdiv class=\"cards\"\u003E\n      \u003Cdiv class=\"cards__column\"\u003E\n        \u003Cdiv class=\"cards__elem\"\u003E";
pug_indent.push('          ');
pug_mixins["search-card"]();
pug_indent.pop();
pug_html = pug_html + "\n        \u003C\u002Fdiv\u003E\n        \u003Cdiv class=\"cards__elem\"\u003E";
pug_indent.push('          ');
pug_mixins["signup-card"]();
pug_indent.pop();
pug_html = pug_html + "\n        \u003C\u002Fdiv\u003E\n      \u003C\u002Fdiv\u003E\n      \u003Cdiv class=\"cards__column\"\u003E\n        \u003Cdiv class=\"cards__elem\"\u003E";
pug_indent.push('          ');
pug_mixins["booking-card"]({
                    roomInfo: {
                        number: 888,
                        type: 'люкс',
                        price: '9 990',
                    },
                    bookingItems: [
                        {
                            text: '9 990₽ х 4 суток',
                            price: '39 960',
                        },
                        {
                            text: 'Сбор за услуги: скидка 2 179₽',
                            price: 0,
                            tooltip: 'Питание',
                        },
                        {
                            text: 'Сбор за дополнительные услуги',
                            price: '300',
                            tooltip: 'Постельное белье',
                        }
                    ],
                    totalPrice: '38 081',
                });
pug_indent.pop();
pug_html = pug_html + "\n        \u003C\u002Fdiv\u003E\n        \u003Cdiv class=\"cards__elem\"\u003E";
pug_indent.push('          ');
pug_mixins["signin-card"]();
pug_indent.pop();
pug_html = pug_html + "\n        \u003C\u002Fdiv\u003E\n      \u003C\u002Fdiv\u003E\n      \u003Cdiv class=\"cards__column cards__column_size_small\"\u003E\n        \u003Cdiv class=\"cards__elem\"\u003E";
pug_indent.push('          ');
pug_mixins["date-picker"]({
                    withBorder: true,
                    initialDate: [new Date(2019, 7, 19), new Date(2019, 7, 23)],
                });
pug_indent.pop();
pug_html = pug_html + "\n        \u003C\u002Fdiv\u003E\n        \u003Cdiv class=\"cards__elem\"\u003E";
pug_indent.push('          ');
pug_mixins["room-card"]({
                    imagesSrc: ['images/room-img_1.jpg', 'images/room-img_2.jpg',
                      'images/room-img_3.jpg', 'images/room-img_4.jpg'],
                    hasSliderArrows: true,
                    roomInfo: {
                        number: 888,
                        type: 'Люкс',
                        price: '9 900',
                    },
                    numOfComments: 145,
                    rating: 5,
                });
pug_indent.pop();
pug_html = pug_html + "\n        \u003C\u002Fdiv\u003E\n        \u003Cdiv class=\"cards__elem\"\u003E";
pug_indent.push('          ');
pug_mixins["room-card"]({
                    imagesSrc: ['images/room-img_2.jpg', 'images/room-img_3.jpg',
                      'images/room-img_4.jpg', 'images/room-img_5.jpg'],
                    hasSliderArrows: false,
                    roomInfo: {
                        number: 840,
                        price: '9 900',
                    },
                    numOfComments: 65,
                    rating: 4,
                });
pug_indent.pop();
pug_html = pug_html + "\n        \u003C\u002Fdiv\u003E\n      \u003C\u002Fdiv\u003E\n    \u003C\u002Fdiv\u003E\n  \u003C\u002Fbody\u003E\n\u003C\u002Fhtml\u003E";
    }.call(this, "Array" in locals_for_with ?
        locals_for_with.Array :
        typeof Array !== 'undefined' ? Array : undefined, "Date" in locals_for_with ?
        locals_for_with.Date :
        typeof Date !== 'undefined' ? Date : undefined, "JSON" in locals_for_with ?
        locals_for_with.JSON :
        typeof JSON !== 'undefined' ? JSON : undefined, "pug_indent" in locals_for_with ?
        locals_for_with.pug_indent :
        typeof pug_indent !== 'undefined' ? pug_indent : undefined));
    ;;return pug_html;};
module.exports = template;

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(2);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;
    var locals_for_with = (locals || {});
    
    (function (pug_indent) {
      var pug_indent = [];
pug_mixins["heading"] = pug_interp = function({ text = '', type = 'h3', color, withJs = false }){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'heading';
let tag;

switch (type) {
    case 'h3':
        className += ' heading_type_h3';
        tag = 'h3';
        break;
    case 'h2':
        className += ' heading_type_h2';
        tag = 'h2';
        break;
    case 'inline':
        className += ' heading_type_h3';
        tag = 'span';
        break;
    default:
        tag = 'h1';
        break;
}
switch (color) {
    case 'white':
        className += ' heading_color_white';
        break;
    case 'purple':
        className += ' heading_color_purple';
        break;
    case 'gray':
        className += ' heading_color_gray';
        break;
    case 'inherit':
        className += ' heading_color_inherit';
        break;
    default:
        break;
}
if (withJs) {
  className += ' js-heading';
}

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C" + (tag) + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = text) ? "" : pug_interp)) + "\u003C\u002F" + (tag) + "\u003E";
};
pug_mixins["color-demo"] = pug_interp = function(name, hex, color){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let demoClassName = `color-demo__demo color-demo__demo_color_${color}`;
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Csection class=\"color-demo\"\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv" + (pug.attr("class", pug.classes([demoClassName], [true]), false, true)) + "\u003E\u003C\u002Fdiv\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"color-demo__info\"\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cheader\u003E";
pug_indent.push('      ');
pug_mixins["heading"]({
                    type: 'h2',
                    text: name,
                });
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fheader\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cp class=\"color-demo__hex\"\u003E" + (pug.escape(null == (pug_interp = hex) ? "" : pug_interp)) + "\u003C\u002Fp\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fsection\u003E";
};
pug_mixins["heading"] = pug_interp = function({ text = '', type = 'h3', color, withJs = false }){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'heading';
let tag;

switch (type) {
    case 'h3':
        className += ' heading_type_h3';
        tag = 'h3';
        break;
    case 'h2':
        className += ' heading_type_h2';
        tag = 'h2';
        break;
    case 'inline':
        className += ' heading_type_h3';
        tag = 'span';
        break;
    default:
        tag = 'h1';
        break;
}
switch (color) {
    case 'white':
        className += ' heading_color_white';
        break;
    case 'purple':
        className += ' heading_color_purple';
        break;
    case 'gray':
        className += ' heading_color_gray';
        break;
    case 'inherit':
        className += ' heading_color_inherit';
        break;
    default:
        break;
}
if (withJs) {
  className += ' js-heading';
}

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C" + (tag) + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = text) ? "" : pug_interp)) + "\u003C\u002F" + (tag) + "\u003E";
};
pug_mixins["type-demo"] = pug_interp = function(name, text, headerType){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let nameClassName = 'type-demo__name';
if (headerType) {
    nameClassName += ` type-demo__name_type_${headerType}`;
}
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"type-demo\"\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cp" + (pug.attr("class", pug.classes([nameClassName], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = name) ? "" : pug_interp)) + "\u003C\u002Fp\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"type-demo__text-container\"\u003E";
if ((headerType)) {
pug_indent.push('    ');
pug_mixins["heading"]({
                  text,
                  type: headerType,
                });
pug_indent.pop();
}
else {
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cp class=\"type-demo__text\"\u003E" + (null == (pug_interp = text) ? "" : pug_interp) + "\u003C\u002Fp\u003E";
}
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
};
const name = 'colors-and-type';
pug_html = pug_html + "\u003C!DOCTYPE html\u003E\n\u003Chtml lang=\"ru\"\u003E\n  \u003Chead\u003E\n    \u003Cmeta charset=\"utf-8\"\u003E\n    \u003Cmeta" + (" name=\"description\""+pug.attr("content", `UI Kit for Toxin Hotel pages (${name})`, true, true)) + "\u003E\n    \u003Cmeta" + (" name=\"keywords\""+pug.attr("content", `toxin, ui-kit ${name}`, true, true)) + "\u003E\n    \u003Cmeta name=\"viewport\" content=\"initial-scale=1.0, width=device-width\"\u003E\n    \u003Clink" + (" rel=\"apple-touch-icon\" sizes=\"180x180\""+pug.attr("href", __webpack_require__(6).default, true, true)) + "\u003E\n    \u003Clink" + (" rel=\"icon\" type=\"image\u002Fpng\" sizes=\"32x32\""+pug.attr("href", __webpack_require__(8).default, true, true)) + "\u003E\n    \u003Clink" + (" rel=\"icon\" type=\"image\u002Fpng\" sizes=\"16x16\""+pug.attr("href", __webpack_require__(7).default, true, true)) + "\u003E\n    \u003Clink rel=\"manifest\" href=\".\u002Fsite.webmanifest\"\u003E\n    \u003Clink" + (" rel=\"mask-icon\""+pug.attr("href", __webpack_require__(10).default, true, true)+" color=\"#bc9cff\"") + "\u003E\n    \u003Clink" + (" rel=\"shortcut icon\""+pug.attr("href", __webpack_require__(9).default, true, true)) + "\u003E\n    \u003Cmeta name=\"msapplication-TileColor\" content=\"#603cba\"\u003E\n    \u003Cmeta name=\"msapplication-config\" content=\".\u002Fbrowserconfig.xml\"\u003E\n    \u003Cmeta name=\"theme-color\" content=\"#ffffff\"\u003E\n    \u003Ctitle\u003E" + (pug.escape(null == (pug_interp = name) ? "" : pug_interp)) + "\u003C\u002Ftitle\u003E\n  \u003C\u002Fhead\u003E\n  \u003Cbody\u003E\n    \u003Cdiv class=\"ui-logo-container\"\u003E\u003Cimg class=\"ui-logo-container__logo\" src=\"images\u002Flogo-icon.svg\" alt=\"logo\"\u003E\u003C\u002Fdiv\u003E\n    \u003Cdiv class=\"colors-and-type\"\u003E\n      \u003Cdiv class=\"container\"\u003E\n        \u003Cdiv class=\"colors-and-type__container\"\u003E\n          \u003Cul class=\"colors-and-type__elements-list\"\u003E\n            \u003Cli class=\"colors-and-type__color\"\u003E";
pug_indent.push('              ');
pug_mixins["color-demo"]('Dark Shade 100%', '#1F2041', 'dark-shade-100');
pug_indent.pop();
pug_html = pug_html + "\n            \u003C\u002Fli\u003E\n            \u003Cli class=\"colors-and-type__color\"\u003E";
pug_indent.push('              ');
pug_mixins["color-demo"]('Dark Shade 75%', '#1F2041', 'dark-shade-75');
pug_indent.pop();
pug_html = pug_html + "\n            \u003C\u002Fli\u003E\n            \u003Cli class=\"colors-and-type__color\"\u003E";
pug_indent.push('              ');
pug_mixins["color-demo"]('Dark Shade 50%', '#1F2041', 'dark-shade-50');
pug_indent.pop();
pug_html = pug_html + "\n            \u003C\u002Fli\u003E\n            \u003Cli class=\"colors-and-type__color\"\u003E";
pug_indent.push('              ');
pug_mixins["color-demo"]('Dark Shade 25%', '#1F2041', 'dark-shade-25');
pug_indent.pop();
pug_html = pug_html + "\n            \u003C\u002Fli\u003E\n            \u003Cli class=\"colors-and-type__color\"\u003E";
pug_indent.push('              ');
pug_mixins["color-demo"]('Dark Shade 5%', '#1F2041', 'dark-shade-5');
pug_indent.pop();
pug_html = pug_html + "\n            \u003C\u002Fli\u003E\n            \u003Cli class=\"colors-and-type__color\"\u003E";
pug_indent.push('              ');
pug_mixins["color-demo"]('Purple', '#BC9CFF', 'purple');
pug_indent.pop();
pug_html = pug_html + "\n            \u003C\u002Fli\u003E\n            \u003Cli class=\"colors-and-type__color\"\u003E";
pug_indent.push('              ');
pug_mixins["color-demo"]('Green', '#6FCF97', 'green');
pug_indent.pop();
pug_html = pug_html + "\n            \u003C\u002Fli\u003E\n          \u003C\u002Ful\u003E\n          \u003Cul class=\"colors-and-type__elements-list\"\u003E\n            \u003Cli class=\"colors-and-type__type\"\u003E";
pug_indent.push('              ');
pug_mixins["type-demo"]('H1',
                            'This one is the sub-section or widget title', 'h1');
pug_indent.pop();
pug_html = pug_html + "\n            \u003C\u002Fli\u003E\n            \u003Cli class=\"colors-and-type__type\"\u003E";
pug_indent.push('              ');
pug_mixins["type-demo"]('H2',
                            'Next one is the item title inside widgets', 'h2');
pug_indent.pop();
pug_html = pug_html + "\n            \u003C\u002Fli\u003E\n            \u003Cli class=\"colors-and-type__type\"\u003E";
pug_indent.push('              ');
pug_mixins["type-demo"]('H3',
                            'This is a label or CTA text', 'h3');
pug_indent.pop();
pug_html = pug_html + "\n            \u003C\u002Fli\u003E\n            \u003Cli class=\"colors-and-type__type\"\u003E";
pug_indent.push('              ');
pug_mixins["type-demo"]('Body',
                            'This is the body text which is used for most<br>of the design, like paragraphs, lists, etc.');
pug_indent.pop();
pug_html = pug_html + "\n            \u003C\u002Fli\u003E\n          \u003C\u002Ful\u003E\n        \u003C\u002Fdiv\u003E\n      \u003C\u002Fdiv\u003E\n    \u003C\u002Fdiv\u003E\n  \u003C\u002Fbody\u003E\n\u003C\u002Fhtml\u003E";
    }.call(this, "pug_indent" in locals_for_with ?
        locals_for_with.pug_indent :
        typeof pug_indent !== 'undefined' ? pug_indent : undefined));
    ;;return pug_html;};
module.exports = template;

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(2);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;
    var locals_for_with = (locals || {});
    
    (function (Array, JSON, pug_indent) {
      var pug_indent = [];
pug_mixins["heading"] = pug_interp = function({ text = '', type = 'h3', color, withJs = false }){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'heading';
let tag;

switch (type) {
    case 'h3':
        className += ' heading_type_h3';
        tag = 'h3';
        break;
    case 'h2':
        className += ' heading_type_h2';
        tag = 'h2';
        break;
    case 'inline':
        className += ' heading_type_h3';
        tag = 'span';
        break;
    default:
        tag = 'h1';
        break;
}
switch (color) {
    case 'white':
        className += ' heading_color_white';
        break;
    case 'purple':
        className += ' heading_color_purple';
        break;
    case 'gray':
        className += ' heading_color_gray';
        break;
    case 'inherit':
        className += ' heading_color_inherit';
        break;
    default:
        break;
}
if (withJs) {
  className += ' js-heading';
}

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C" + (tag) + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = text) ? "" : pug_interp)) + "\u003C\u002F" + (tag) + "\u003E";
};
pug_mixins["elem-info"] = pug_interp = function(title, state, isShort = false){
var block = (this && this.block), attributes = (this && this.attributes) || {};
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv" + (pug.attr("class", pug.classes(["elem-info",isShort ? 'elem-info_short' : false], [false,true]), false, true)) + "\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"elem-info__title\"\u003E";
pug_indent.push('    ');
pug_mixins["heading"]({text: title});
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
if ((state)) {
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cp class=\"elem-info__state\"\u003E" + (pug.escape(null == (pug_interp = state) ? "" : pug_interp)) + "\u003C\u002Fp\u003E";
}
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
};
pug_mixins["arrow"] = pug_interp = function({ type, color, withoutPadding = false } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'arrow';
let iconName = 'expand_more';

switch (type) {
    case 'expand-less':
        iconName = 'expand_less';
        break;
    case 'forward':
        iconName = 'arrow_forward';
        break;
    default:
        break;
}

switch (color) {
    case 'white':
        className += ' arrow_color_white';
        break;
    case 'purple-gradient':
        className += ' arrow_color_purple-gradient';
        break;
    default:
        break;
}

if (withoutPadding) {
    className += ' arrow_without-padding';
}

pug_html = pug_html + "\u003Cspan" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = iconName) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
};
pug_mixins["text-field"] = pug_interp = function({ inputOptions = {}, arrowOptions, modifiers = {}, withJs = false } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'text-field';

if (modifiers.isFocused) {
    className += ' text-field_focused';
}
if (modifiers.isShort) {
    className += ' text-field_short';
}
if (modifiers.isBottomFlat) {
    className += ' text-field_flat-bottom';
}
if (modifiers.isClickable) {
    className += ' text-field_clickable';
}

if (withJs) {
    className += ' js-text-field';
}

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E";
let inputClassName = 'text-field__input';
if (arrowOptions) {
    inputClassName += ' text-field__input_with-arrow';
}
if (inputOptions.isMaskedDate) {
    inputClassName += ' text-field__input_masked-date js-text-field__input_masked-date'
}
if (inputOptions.withJs) {
    inputClassName += ' js-text-field__input';
}

pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cinput" + (pug.attr("class", pug.classes([inputClassName], [true]), false, true)+pug.attr("type", inputOptions.type, true, true)+pug.attr("placeholder", inputOptions.placeholder, true, true)+pug.attr("value", inputOptions.value, true, true)+pug.attr("readonly", inputOptions.isReadonly, true, true)) + "\u003E";
if ((arrowOptions)) {
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cbutton" + (" class=\"text-field__arrow\""+pug.attr("type", inputOptions.isSubmit ? 'submit' : 'button', true, true)) + "\u003E";
pug_indent.push('    ');
pug_mixins["arrow"](arrowOptions);
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fbutton\u003E";
}
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
};
pug_mixins["arrow"] = pug_interp = function({ type, color, withoutPadding = false } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'arrow';
let iconName = 'expand_more';

switch (type) {
    case 'expand-less':
        iconName = 'expand_less';
        break;
    case 'forward':
        iconName = 'arrow_forward';
        break;
    default:
        break;
}

switch (color) {
    case 'white':
        className += ' arrow_color_white';
        break;
    case 'purple-gradient':
        className += ' arrow_color_purple-gradient';
        break;
    default:
        break;
}

if (withoutPadding) {
    className += ' arrow_without-padding';
}

pug_html = pug_html + "\u003Cspan" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = iconName) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
};
pug_mixins["text-field"] = pug_interp = function({ inputOptions = {}, arrowOptions, modifiers = {}, withJs = false } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'text-field';

if (modifiers.isFocused) {
    className += ' text-field_focused';
}
if (modifiers.isShort) {
    className += ' text-field_short';
}
if (modifiers.isBottomFlat) {
    className += ' text-field_flat-bottom';
}
if (modifiers.isClickable) {
    className += ' text-field_clickable';
}

if (withJs) {
    className += ' js-text-field';
}

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E";
let inputClassName = 'text-field__input';
if (arrowOptions) {
    inputClassName += ' text-field__input_with-arrow';
}
if (inputOptions.isMaskedDate) {
    inputClassName += ' text-field__input_masked-date js-text-field__input_masked-date'
}
if (inputOptions.withJs) {
    inputClassName += ' js-text-field__input';
}

pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cinput" + (pug.attr("class", pug.classes([inputClassName], [true]), false, true)+pug.attr("type", inputOptions.type, true, true)+pug.attr("placeholder", inputOptions.placeholder, true, true)+pug.attr("value", inputOptions.value, true, true)+pug.attr("readonly", inputOptions.isReadonly, true, true)) + "\u003E";
if ((arrowOptions)) {
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cbutton" + (" class=\"text-field__arrow\""+pug.attr("type", inputOptions.isSubmit ? 'submit' : 'button', true, true)) + "\u003E";
pug_indent.push('    ');
pug_mixins["arrow"](arrowOptions);
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fbutton\u003E";
}
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
};
pug_mixins["dropdown"] = pug_interp = function(options = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let {
    inputOptions = {},
    popupMixinOptions = {},
    popupHidden = true,
    title,
    isDouble = false,
    isShort = false,
    isPopupDistant = false,
    defaultInputValue = '',
} = options;

let className = 'dropdown js-dropdown';
if (isDouble) {
    className += ' dropdown_double';
}
if (isShort) {
  className += ' dropdown_short';
}
if (isPopupDistant) {
  className += ' dropdown_with-distant-popup';
}

if (isDouble) {
    if (!Array.isArray(title)) {
        title = [title, title];
    }
    if (!Array.isArray(inputOptions)) {
        inputOptions = [inputOptions, inputOptions];
    }
}
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Csection" + (pug.attr("class", pug.classes([className], [true]), false, true)+pug.attr("data-default-value", JSON.stringify(defaultInputValue), true, true)) + "\u003E";
if ((isDouble)) {
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"dropdown__text-field js-dropdown__text-field\"\u003E";
if ((title[0])) {
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"dropdown__title\"\u003E";
pug_indent.push('      ');
pug_mixins["heading"]({
                            text: title[0],
                        });
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
pug_indent.push('    ');
pug_mixins["text-field"]({
                    inputOptions: {
                        ...inputOptions[0],
                        isMaskedDate: false,
                        isReadonly: true,
                        withJs: true,
                    },
                    arrowOptions: {},
                    modifiers: {
                        isFocused: !popupHidden,
                        isBottomFlat: !popupHidden,
                        isClickable: true,
                    },
                    withJs: true,
                });
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"dropdown__text-field js-dropdown__text-field\"\u003E";
if ((title[1])) {
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"dropdown__title\"\u003E";
pug_indent.push('      ');
pug_mixins["heading"]({
                            text: title[1],
                        });
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
pug_indent.push('    ');
pug_mixins["text-field"]({
                    inputOptions: {
                        ...inputOptions[1],
                        isMaskedDate: false,
                        isReadonly: true,
                        withJs: true,
                    },
                    arrowOptions: {},
                    modifiers: {
                        isFocused: !popupHidden,
                        isBottomFlat: !popupHidden,
                        isClickable: true,
                    },
                    withJs: true,
                });
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
else {
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"dropdown__text-field js-dropdown__text-field\"\u003E";
if ((title)) {
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"dropdown__title\"\u003E";
pug_indent.push('      ');
pug_mixins["heading"]({
                            text: title,
                        });
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
pug_indent.push('    ');
pug_mixins["text-field"]({
                    inputOptions: {
                        ...inputOptions,
                        isMaskedDate: false,
                        isReadonly: true,
                        withJs: true,
                    },
                    arrowOptions: {},
                    modifiers: {
                        isFocused: !popupHidden,
                        isBottomFlat: !popupHidden,
                        isClickable: true,
                    },
                    withJs: true,
                });
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv" + (pug.attr("class", pug.classes(["dropdown__popup","js-dropdown__popup",`${popupHidden ? 'dropdown__popup_hidden' : false}`], [false,false,true]), false, true)) + "\u003E";
if ((popupMixinOptions.name)) {
pug_indent.push('    ');
pug_mixins[popupMixinOptions.name](popupMixinOptions.params);
pug_indent.pop();
}
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fsection\u003E";
};
pug_mixins["heading"] = pug_interp = function({ text = '', type = 'h3', color, withJs = false }){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'heading';
let tag;

switch (type) {
    case 'h3':
        className += ' heading_type_h3';
        tag = 'h3';
        break;
    case 'h2':
        className += ' heading_type_h2';
        tag = 'h2';
        break;
    case 'inline':
        className += ' heading_type_h3';
        tag = 'span';
        break;
    default:
        tag = 'h1';
        break;
}
switch (color) {
    case 'white':
        className += ' heading_color_white';
        break;
    case 'purple':
        className += ' heading_color_purple';
        break;
    case 'gray':
        className += ' heading_color_gray';
        break;
    case 'inherit':
        className += ' heading_color_inherit';
        break;
    default:
        break;
}
if (withJs) {
  className += ' js-heading';
}

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C" + (tag) + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = text) ? "" : pug_interp)) + "\u003C\u002F" + (tag) + "\u003E";
};
pug_mixins["counting-item"] = pug_interp = function({ name = '', value = 0, nameDeclensions } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv" + (" class=\"counting-item js-counting-item\""+pug.attr("data-words", nameDeclensions ? JSON.stringify(nameDeclensions) : false, true, true)) + "\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"counting-item__name js-counting-item__name\"\u003E";
pug_indent.push('    ');
pug_mixins["heading"]({
                text: name,
                withJs: true,
            });
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"counting-item__counter\"\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cbutton class=\"counting-item__change-button counting-item__change-button_action_decrease js-counting-item__change-button_action_decrease\" type=\"button\"\u003E-\u003C\u002Fbutton\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"counting-item__value js-counting-item__value\"\u003E";
pug_indent.push('      ');
pug_mixins["heading"]({
                    text: value,
                    withJs: true,
                });
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cbutton class=\"counting-item__change-button counting-item__change-button_action_increase js-counting-item__change-button_action_increase\" type=\"button\"\u003E+\u003C\u002Fbutton\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
};
pug_mixins["arrow"] = pug_interp = function({ type, color, withoutPadding = false } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'arrow';
let iconName = 'expand_more';

switch (type) {
    case 'expand-less':
        iconName = 'expand_less';
        break;
    case 'forward':
        iconName = 'arrow_forward';
        break;
    default:
        break;
}

switch (color) {
    case 'white':
        className += ' arrow_color_white';
        break;
    case 'purple-gradient':
        className += ' arrow_color_purple-gradient';
        break;
    default:
        break;
}

if (withoutPadding) {
    className += ' arrow_without-padding';
}

pug_html = pug_html + "\u003Cspan" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = iconName) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
};
pug_mixins["heading"] = pug_interp = function({ text = '', type = 'h3', color, withJs = false }){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'heading';
let tag;

switch (type) {
    case 'h3':
        className += ' heading_type_h3';
        tag = 'h3';
        break;
    case 'h2':
        className += ' heading_type_h2';
        tag = 'h2';
        break;
    case 'inline':
        className += ' heading_type_h3';
        tag = 'span';
        break;
    default:
        tag = 'h1';
        break;
}
switch (color) {
    case 'white':
        className += ' heading_color_white';
        break;
    case 'purple':
        className += ' heading_color_purple';
        break;
    case 'gray':
        className += ' heading_color_gray';
        break;
    case 'inherit':
        className += ' heading_color_inherit';
        break;
    default:
        break;
}
if (withJs) {
  className += ' js-heading';
}

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C" + (tag) + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = text) ? "" : pug_interp)) + "\u003C\u002F" + (tag) + "\u003E";
};
pug_mixins["button"] = pug_interp = function(options = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
const {
    text = 'click me',
    hasLink = false,
    isSubmit = false,
    link = 'change-me',
    modifiers = {},
    withJs = false,
} = options;

let className = 'button';
let headingOptions = {
    text,
    type: 'inline',
    color: 'white',
};

if (hasLink) {
    headingOptions.type = 'h3';
}

if (modifiers.isSecondary) {
    className += ' button_secondary';
    headingOptions.color = 'purple';
}
if (modifiers.withoutFrame) {
    headingOptions.color = 'inherit';
    className += ' button_without-frame';
}
if (modifiers.isLong) {
    className += ' button_long';
}
if (modifiers.isHovered) {
    className += ' button_hovered';
}
if (modifiers.isNarrow) {
    className += ' button_narrow';
}
if (modifiers.isWide) {
    className += ' button_wide';
}
if (withJs) {
  className += ' js-button';
}

switch (modifiers.textColor) {
    case 'white':
        headingOptions.color = 'white';
        break;
    case 'purple':
        headingOptions.color = 'purple';
        break;
    case 'gray':
        headingOptions.color = 'gray';
        break;
    default:
        break;
}

if ((hasLink)) {
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E\u003Ca" + (" class=\"button__text\""+pug.attr("href", link, true, true)) + "\u003E";
pug_indent.push('    ');
pug_mixins["heading"](headingOptions);
pug_indent.pop();
pug_html = pug_html + "\u003C\u002Fa\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"button__arrow\"\u003E";
pug_indent.push('    ');
pug_mixins["arrow"]({
                  type: 'forward',
                  color: 'white',
                });
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
else {
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cbutton" + (pug.attr("class", pug.classes([className], [true]), false, true)+pug.attr("type", isSubmit ? 'submit' : 'button', true, true)) + "\u003E\u003Cspan class=\"button__text\"\u003E";
pug_indent.push('    ');
pug_mixins["heading"](headingOptions);
pug_indent.pop();
pug_html = pug_html + "\u003C\u002Fspan\u003E\u003Cspan class=\"button__arrow\"\u003E";
pug_indent.push('    ');
pug_mixins["arrow"]({
                    type: 'forward',
                    color: 'white',
                });
pug_indent.pop();
pug_html = pug_html + "\u003C\u002Fspan\u003E\u003C\u002Fbutton\u003E";
}
};
pug_mixins["items-counter"] = pug_interp = function(options = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
const {
    items,
    withoutButtons = false,
    wordForValueTextReplacing = null,
    itemIndexForSeparateCount = null,
} = options;

let className = 'items-counter js-items-counter';
if (withoutButtons) {
    className += ' items-counter_without-buttons';
}
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv" + (pug.attr("class", pug.classes([className], [true]), false, true)+pug.attr("data-replace-text", JSON.stringify(wordForValueTextReplacing), true, true)+pug.attr("data-separate-item", JSON.stringify(itemIndexForSeparateCount), true, true)) + "\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cul class=\"items-counter__items-list\"\u003E";
// iterate items
;(function(){
  var $$obj = items;
  if ('number' == typeof $$obj.length) {
      for (var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++) {
        var item = $$obj[pug_index0];
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"items-counter__item\"\u003E";
pug_indent.push('      ');
pug_mixins["counting-item"]({
                        name: item.name,
                        value: item.value,
                        nameDeclensions: item.nameDeclensions,
                    });
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index0 in $$obj) {
      $$l++;
      var item = $$obj[pug_index0];
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"items-counter__item\"\u003E";
pug_indent.push('      ');
pug_mixins["counting-item"]({
                        name: item.name,
                        value: item.value,
                        nameDeclensions: item.nameDeclensions,
                    });
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Ful\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"items-counter__button-panel\"\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"items-counter__clear-button js-items-counter__clear-button\"\u003E";
pug_indent.push('      ');
pug_mixins["button"]({
                    text: 'Очистить',
                    hasLink: false,
                    modifiers: {
                        withoutFrame: true,
                    }
                });
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"items-counter__apply-button js-items-counter__apply-button\"\u003E";
pug_indent.push('      ');
pug_mixins["button"]({
                    text: 'Применить',
                    hasLink: false,
                    modifiers: {
                        withoutFrame: true,
                    }
                });
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
};
pug_mixins["date-picker"] = pug_interp = function(options = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
const {
    withBorder = false,
    dateFormat = null,
    initialDate = [null, null],
    isTextDouble = false,
} = options;

let className = 'date-picker js-date-picker';
if (withBorder) {
    className += ' date-picker_with-border';
}
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv" + (pug.attr("class", pug.classes([className], [true]), false, true)+pug.attr("data-date-format", dateFormat, true, true)+pug.attr("data-initial-date", initialDate, true, true)+pug.attr("data-is-text-double", isTextDouble ? 'true' : 'false', true, true)) + "\u003E\u003C\u002Fdiv\u003E";
};
pug_mixins["checkbox-buttons"] = pug_interp = function({ items, isRich = false, theme }){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'checkbox-buttons';
if (isRich) {
    className += ' checkbox-buttons_rich';
}
if (theme === 'toggle') {
    className += ' checkbox-buttons_theme_toggle';
}
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cul" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E";
// iterate items
;(function(){
  var $$obj = items;
  if ('number' == typeof $$obj.length) {
      for (var pug_index1 = 0, $$l = $$obj.length; pug_index1 < $$l; pug_index1++) {
        var item = $$obj[pug_index1];
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"checkbox-buttons__item\"\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Clabel class=\"checkbox-buttons__button\"\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cinput" + (" class=\"checkbox-buttons__input\""+" type=\"checkbox\""+pug.attr("checked", item.checked, true, true)) + "\u003E\u003Cspan class=\"checkbox-buttons__name\"\u003E" + (null == (pug_interp = item.name) ? "" : pug_interp) + "\u003C\u002Fspan\u003E";
if ((isRich)) {
pug_html = pug_html + "\u003Cspan class=\"checkbox-buttons__description\"\u003E" + (null == (pug_interp = item.description) ? "" : pug_interp) + "\u003C\u002Fspan\u003E";
}
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Flabel\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index1 in $$obj) {
      $$l++;
      var item = $$obj[pug_index1];
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"checkbox-buttons__item\"\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Clabel class=\"checkbox-buttons__button\"\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cinput" + (" class=\"checkbox-buttons__input\""+" type=\"checkbox\""+pug.attr("checked", item.checked, true, true)) + "\u003E\u003Cspan class=\"checkbox-buttons__name\"\u003E" + (null == (pug_interp = item.name) ? "" : pug_interp) + "\u003C\u002Fspan\u003E";
if ((isRich)) {
pug_html = pug_html + "\u003Cspan class=\"checkbox-buttons__description\"\u003E" + (null == (pug_interp = item.description) ? "" : pug_interp) + "\u003C\u002Fspan\u003E";
}
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Flabel\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Ful\u003E";
};
pug_mixins["radio-buttons"] = pug_interp = function({ items, itemsName }){
var block = (this && this.block), attributes = (this && this.attributes) || {};
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"radio-buttons\"\u003E";
// iterate items
;(function(){
  var $$obj = items;
  if ('number' == typeof $$obj.length) {
      for (var index = 0, $$l = $$obj.length; index < $$l; index++) {
        var text = $$obj[index];
const checked = index === 0;
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Clabel class=\"radio-buttons__button\"\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cinput" + (" class=\"radio-buttons__input\""+" type=\"radio\""+pug.attr("name", itemsName, true, true)+pug.attr("checked", checked, true, true)) + "\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cp class=\"radio-buttons__button-text\"\u003E" + (pug.escape(null == (pug_interp = text) ? "" : pug_interp)) + "\u003C\u002Fp\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Flabel\u003E";
      }
  } else {
    var $$l = 0;
    for (var index in $$obj) {
      $$l++;
      var text = $$obj[index];
const checked = index === 0;
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Clabel class=\"radio-buttons__button\"\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cinput" + (" class=\"radio-buttons__input\""+" type=\"radio\""+pug.attr("name", itemsName, true, true)+pug.attr("checked", checked, true, true)) + "\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cp class=\"radio-buttons__button-text\"\u003E" + (pug.escape(null == (pug_interp = text) ? "" : pug_interp)) + "\u003C\u002Fp\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Flabel\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
};
pug_mixins["like-button"] = pug_interp = function({ likesNum = 0, isActive = false } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'like-button js-like-button';
if (isActive) {
    className += ' like-button_active';
}
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cbutton" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E\u003Cspan class=\"like-button__heart material-icons\"\u003E\u003C\u002Fspan\u003E\u003Cspan class=\"like-button__number js-like-button__number\"\u003E" + (pug.escape(null == (pug_interp = likesNum) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003C\u002Fbutton\u003E";
};
pug_mixins["rate-button"] = pug_interp = function(currentRating){
var block = (this && this.block), attributes = (this && this.attributes) || {};
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cul class=\"rate-button\"\u003E";
for (let i = 1; i <= 5; i += 1)
{
const active = i <= currentRating;
let className = 'material-icons rate-button__star';
if (active) {
    className += ' rate-button__star_active';
}
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E\u003C\u002Fli\u003E";
}
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Ful\u003E";
};
pug_mixins["heading"] = pug_interp = function({ text = '', type = 'h3', color, withJs = false }){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'heading';
let tag;

switch (type) {
    case 'h3':
        className += ' heading_type_h3';
        tag = 'h3';
        break;
    case 'h2':
        className += ' heading_type_h2';
        tag = 'h2';
        break;
    case 'inline':
        className += ' heading_type_h3';
        tag = 'span';
        break;
    default:
        tag = 'h1';
        break;
}
switch (color) {
    case 'white':
        className += ' heading_color_white';
        break;
    case 'purple':
        className += ' heading_color_purple';
        break;
    case 'gray':
        className += ' heading_color_gray';
        break;
    case 'inherit':
        className += ' heading_color_inherit';
        break;
    default:
        break;
}
if (withJs) {
  className += ' js-heading';
}

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C" + (tag) + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = text) ? "" : pug_interp)) + "\u003C\u002F" + (tag) + "\u003E";
};
pug_mixins["range-slider"] = pug_interp = function(title, description = false){
var block = (this && this.block), attributes = (this && this.attributes) || {};
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"range-slider js-range-slider\"\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"range-slider__info\"\u003E";
pug_indent.push('    ');
pug_mixins["heading"]({ text: title });
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Coutput class=\"range-slider__value js-range-slider__value\"\u003E\u003C\u002Foutput\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"range-slider__slider js-range-slider__slider\"\u003E\u003C\u002Fdiv\u003E";
if (description) {
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cp class=\"range-slider__description\"\u003E" + (pug.escape(null == (pug_interp = description) ? "" : pug_interp)) + "\u003C\u002Fp\u003E";
}
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
};
pug_mixins["arrow"] = pug_interp = function({ type, color, withoutPadding = false } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'arrow';
let iconName = 'expand_more';

switch (type) {
    case 'expand-less':
        iconName = 'expand_less';
        break;
    case 'forward':
        iconName = 'arrow_forward';
        break;
    default:
        break;
}

switch (color) {
    case 'white':
        className += ' arrow_color_white';
        break;
    case 'purple-gradient':
        className += ' arrow_color_purple-gradient';
        break;
    default:
        break;
}

if (withoutPadding) {
    className += ' arrow_without-padding';
}

pug_html = pug_html + "\u003Cspan" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = iconName) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
};
pug_mixins["heading"] = pug_interp = function({ text = '', type = 'h3', color, withJs = false }){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'heading';
let tag;

switch (type) {
    case 'h3':
        className += ' heading_type_h3';
        tag = 'h3';
        break;
    case 'h2':
        className += ' heading_type_h2';
        tag = 'h2';
        break;
    case 'inline':
        className += ' heading_type_h3';
        tag = 'span';
        break;
    default:
        tag = 'h1';
        break;
}
switch (color) {
    case 'white':
        className += ' heading_color_white';
        break;
    case 'purple':
        className += ' heading_color_purple';
        break;
    case 'gray':
        className += ' heading_color_gray';
        break;
    case 'inherit':
        className += ' heading_color_inherit';
        break;
    default:
        break;
}
if (withJs) {
  className += ' js-heading';
}

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C" + (tag) + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = text) ? "" : pug_interp)) + "\u003C\u002F" + (tag) + "\u003E";
};
pug_mixins["button"] = pug_interp = function(options = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
const {
    text = 'click me',
    hasLink = false,
    isSubmit = false,
    link = 'change-me',
    modifiers = {},
    withJs = false,
} = options;

let className = 'button';
let headingOptions = {
    text,
    type: 'inline',
    color: 'white',
};

if (hasLink) {
    headingOptions.type = 'h3';
}

if (modifiers.isSecondary) {
    className += ' button_secondary';
    headingOptions.color = 'purple';
}
if (modifiers.withoutFrame) {
    headingOptions.color = 'inherit';
    className += ' button_without-frame';
}
if (modifiers.isLong) {
    className += ' button_long';
}
if (modifiers.isHovered) {
    className += ' button_hovered';
}
if (modifiers.isNarrow) {
    className += ' button_narrow';
}
if (modifiers.isWide) {
    className += ' button_wide';
}
if (withJs) {
  className += ' js-button';
}

switch (modifiers.textColor) {
    case 'white':
        headingOptions.color = 'white';
        break;
    case 'purple':
        headingOptions.color = 'purple';
        break;
    case 'gray':
        headingOptions.color = 'gray';
        break;
    default:
        break;
}

if ((hasLink)) {
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E\u003Ca" + (" class=\"button__text\""+pug.attr("href", link, true, true)) + "\u003E";
pug_indent.push('    ');
pug_mixins["heading"](headingOptions);
pug_indent.pop();
pug_html = pug_html + "\u003C\u002Fa\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"button__arrow\"\u003E";
pug_indent.push('    ');
pug_mixins["arrow"]({
                  type: 'forward',
                  color: 'white',
                });
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
else {
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cbutton" + (pug.attr("class", pug.classes([className], [true]), false, true)+pug.attr("type", isSubmit ? 'submit' : 'button', true, true)) + "\u003E\u003Cspan class=\"button__text\"\u003E";
pug_indent.push('    ');
pug_mixins["heading"](headingOptions);
pug_indent.pop();
pug_html = pug_html + "\u003C\u002Fspan\u003E\u003Cspan class=\"button__arrow\"\u003E";
pug_indent.push('    ');
pug_mixins["arrow"]({
                    type: 'forward',
                    color: 'white',
                });
pug_indent.pop();
pug_html = pug_html + "\u003C\u002Fspan\u003E\u003C\u002Fbutton\u003E";
}
};
pug_mixins["pagination"] = pug_interp = function(desc){
var block = (this && this.block), attributes = (this && this.attributes) || {};
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"pagination js-pagination\"\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"pagination__pages js-pagination__pages\"\u003E\u003C\u002Fdiv\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cp class=\"pagination__desc\"\u003E" + (null == (pug_interp = desc) ? "" : pug_interp) + "\u003C\u002Fp\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
};
pug_mixins["heading"] = pug_interp = function({ text = '', type = 'h3', color, withJs = false }){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'heading';
let tag;

switch (type) {
    case 'h3':
        className += ' heading_type_h3';
        tag = 'h3';
        break;
    case 'h2':
        className += ' heading_type_h2';
        tag = 'h2';
        break;
    case 'inline':
        className += ' heading_type_h3';
        tag = 'span';
        break;
    default:
        tag = 'h1';
        break;
}
switch (color) {
    case 'white':
        className += ' heading_color_white';
        break;
    case 'purple':
        className += ' heading_color_purple';
        break;
    case 'gray':
        className += ' heading_color_gray';
        break;
    case 'inherit':
        className += ' heading_color_inherit';
        break;
    default:
        break;
}
if (withJs) {
  className += ' js-heading';
}

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C" + (tag) + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = text) ? "" : pug_interp)) + "\u003C\u002F" + (tag) + "\u003E";
};
pug_mixins["arrow"] = pug_interp = function({ type, color, withoutPadding = false } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'arrow';
let iconName = 'expand_more';

switch (type) {
    case 'expand-less':
        iconName = 'expand_less';
        break;
    case 'forward':
        iconName = 'arrow_forward';
        break;
    default:
        break;
}

switch (color) {
    case 'white':
        className += ' arrow_color_white';
        break;
    case 'purple-gradient':
        className += ' arrow_color_purple-gradient';
        break;
    default:
        break;
}

if (withoutPadding) {
    className += ' arrow_without-padding';
}

pug_html = pug_html + "\u003Cspan" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = iconName) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
};
pug_mixins["checkbox-buttons"] = pug_interp = function({ items, isRich = false, theme }){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'checkbox-buttons';
if (isRich) {
    className += ' checkbox-buttons_rich';
}
if (theme === 'toggle') {
    className += ' checkbox-buttons_theme_toggle';
}
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cul" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E";
// iterate items
;(function(){
  var $$obj = items;
  if ('number' == typeof $$obj.length) {
      for (var pug_index3 = 0, $$l = $$obj.length; pug_index3 < $$l; pug_index3++) {
        var item = $$obj[pug_index3];
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"checkbox-buttons__item\"\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Clabel class=\"checkbox-buttons__button\"\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cinput" + (" class=\"checkbox-buttons__input\""+" type=\"checkbox\""+pug.attr("checked", item.checked, true, true)) + "\u003E\u003Cspan class=\"checkbox-buttons__name\"\u003E" + (null == (pug_interp = item.name) ? "" : pug_interp) + "\u003C\u002Fspan\u003E";
if ((isRich)) {
pug_html = pug_html + "\u003Cspan class=\"checkbox-buttons__description\"\u003E" + (null == (pug_interp = item.description) ? "" : pug_interp) + "\u003C\u002Fspan\u003E";
}
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Flabel\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index3 in $$obj) {
      $$l++;
      var item = $$obj[pug_index3];
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"checkbox-buttons__item\"\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Clabel class=\"checkbox-buttons__button\"\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cinput" + (" class=\"checkbox-buttons__input\""+" type=\"checkbox\""+pug.attr("checked", item.checked, true, true)) + "\u003E\u003Cspan class=\"checkbox-buttons__name\"\u003E" + (null == (pug_interp = item.name) ? "" : pug_interp) + "\u003C\u002Fspan\u003E";
if ((isRich)) {
pug_html = pug_html + "\u003Cspan class=\"checkbox-buttons__description\"\u003E" + (null == (pug_interp = item.description) ? "" : pug_interp) + "\u003C\u002Fspan\u003E";
}
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Flabel\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Ful\u003E";
};
pug_mixins["expandable-checkboxes"] = pug_interp = function({ title = 'Expandable checkbox list', items, expanded = false }){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'expandable-checkboxes js-expandable-checkboxes';
if (expanded) {
    className += ' expandable-checkboxes_expanded';
}
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"expandable-checkboxes__title js-expandable-checkboxes__title\" role=\"button\"\u003E";
pug_indent.push('    ');
pug_mixins["heading"]({ text: title });
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"expandable-checkboxes__arrow\"\u003E";
pug_indent.push('      ');
pug_mixins["arrow"]();
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"expandable-checkboxes__checkboxes js-expandable-checkboxes__checkboxes\"\u003E";
pug_indent.push('    ');
pug_mixins["checkbox-buttons"]({ items });
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
};
pug_mixins["bullet-list"] = pug_interp = function(itemTexts){
var block = (this && this.block), attributes = (this && this.attributes) || {};
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cul class=\"bullet-list\"\u003E";
// iterate itemTexts
;(function(){
  var $$obj = itemTexts;
  if ('number' == typeof $$obj.length) {
      for (var pug_index4 = 0, $$l = $$obj.length; pug_index4 < $$l; pug_index4++) {
        var text = $$obj[pug_index4];
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"bullet-list__item\"\u003E" + (null == (pug_interp = text) ? "" : pug_interp) + "\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index4 in $$obj) {
      $$l++;
      var text = $$obj[pug_index4];
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"bullet-list__item\"\u003E" + (null == (pug_interp = text) ? "" : pug_interp) + "\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Ful\u003E";
};
pug_mixins["icon-text-list"] = pug_interp = function(items){
var block = (this && this.block), attributes = (this && this.attributes) || {};
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cul class=\"icon-text-list\"\u003E";
// iterate items
;(function(){
  var $$obj = items;
  if ('number' == typeof $$obj.length) {
      for (var pug_index5 = 0, $$l = $$obj.length; pug_index5 < $$l; pug_index5++) {
        var item = $$obj[pug_index5];
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"icon-text-list__item\"\u003E\u003Cspan class=\"icon-text-list__icon material-icons\"\u003E" + (pug.escape(null == (pug_interp = item.iconName) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Ch4 class=\"icon-text-list__title\"\u003E" + (pug.escape(null == (pug_interp = item.title) ? "" : pug_interp)) + "\u003C\u002Fh4\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cp class=\"icon-text-list__description\"\u003E" + (pug.escape(null == (pug_interp = item.description) ? "" : pug_interp)) + "\u003C\u002Fp\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index5 in $$obj) {
      $$l++;
      var item = $$obj[pug_index5];
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"icon-text-list__item\"\u003E\u003Cspan class=\"icon-text-list__icon material-icons\"\u003E" + (pug.escape(null == (pug_interp = item.iconName) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Ch4 class=\"icon-text-list__title\"\u003E" + (pug.escape(null == (pug_interp = item.title) ? "" : pug_interp)) + "\u003C\u002Fh4\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cp class=\"icon-text-list__description\"\u003E" + (pug.escape(null == (pug_interp = item.description) ? "" : pug_interp)) + "\u003C\u002Fp\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Ful\u003E";
};
pug_mixins["like-button"] = pug_interp = function({ likesNum = 0, isActive = false } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'like-button js-like-button';
if (isActive) {
    className += ' like-button_active';
}
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cbutton" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E\u003Cspan class=\"like-button__heart material-icons\"\u003E\u003C\u002Fspan\u003E\u003Cspan class=\"like-button__number js-like-button__number\"\u003E" + (pug.escape(null == (pug_interp = likesNum) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003C\u002Fbutton\u003E";
};
pug_mixins["comment"] = pug_interp = function(options = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
const {
    avatarLink,
    userName,
    dateText,
    dateTime,
    text,
    likeOptions,
    href = 'change-me',
} = options;
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Carticle class=\"comment\"\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"comment__header\"\u003E\u003Cimg" + (" class=\"comment__avatar\""+pug.attr("src", avatarLink, true, true)+" alt=\"user-avatar\"") + "\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Caddress\u003E\u003Ca" + (" class=\"comment__user-name\""+pug.attr("href", href, true, true)) + "\u003E" + (pug.escape(null == (pug_interp = userName) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Faddress\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Ctime" + (" class=\"comment__date\""+pug.attr("datetime", dateTime, true, true)) + "\u003E" + (pug.escape(null == (pug_interp = dateText) ? "" : pug_interp)) + "\u003C\u002Ftime\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"comment__content\"\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"comment__likes\"\u003E";
pug_indent.push('      ');
pug_mixins["like-button"](likeOptions);
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cp class=\"comment__text\"\u003E" + (pug.escape(null == (pug_interp = text) ? "" : pug_interp)) + "\u003C\u002Fp\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Farticle\u003E";
};
const name = 'form-elements'
pug_html = pug_html + "\u003C!DOCTYPE html\u003E\n\u003Chtml lang=\"ru\"\u003E\n  \u003Chead\u003E\n    \u003Cmeta charset=\"utf-8\"\u003E\n    \u003Cmeta" + (" name=\"description\""+pug.attr("content", `UI Kit for Toxin Hotel pages (${name})`, true, true)) + "\u003E\n    \u003Cmeta" + (" name=\"keywords\""+pug.attr("content", `toxin, ui-kit ${name}`, true, true)) + "\u003E\n    \u003Cmeta name=\"viewport\" content=\"initial-scale=1.0, width=device-width\"\u003E\n    \u003Clink" + (" rel=\"apple-touch-icon\" sizes=\"180x180\""+pug.attr("href", __webpack_require__(6).default, true, true)) + "\u003E\n    \u003Clink" + (" rel=\"icon\" type=\"image\u002Fpng\" sizes=\"32x32\""+pug.attr("href", __webpack_require__(8).default, true, true)) + "\u003E\n    \u003Clink" + (" rel=\"icon\" type=\"image\u002Fpng\" sizes=\"16x16\""+pug.attr("href", __webpack_require__(7).default, true, true)) + "\u003E\n    \u003Clink rel=\"manifest\" href=\".\u002Fsite.webmanifest\"\u003E\n    \u003Clink" + (" rel=\"mask-icon\""+pug.attr("href", __webpack_require__(10).default, true, true)+" color=\"#bc9cff\"") + "\u003E\n    \u003Clink" + (" rel=\"shortcut icon\""+pug.attr("href", __webpack_require__(9).default, true, true)) + "\u003E\n    \u003Cmeta name=\"msapplication-TileColor\" content=\"#603cba\"\u003E\n    \u003Cmeta name=\"msapplication-config\" content=\".\u002Fbrowserconfig.xml\"\u003E\n    \u003Cmeta name=\"theme-color\" content=\"#ffffff\"\u003E\n    \u003Ctitle\u003E" + (pug.escape(null == (pug_interp = name) ? "" : pug_interp)) + "\u003C\u002Ftitle\u003E\n  \u003C\u002Fhead\u003E\n  \u003Cbody\u003E\n    \u003Cdiv class=\"ui-logo-container\"\u003E\u003Cimg class=\"ui-logo-container__logo\" src=\"images\u002Flogo-icon.svg\" alt=\"logo\"\u003E\u003C\u002Fdiv\u003E";
const facilitiesDropdownItems = [
    {
        name: 'Спальни',
        value: '2',
        nameDeclensions: ['спальня', 'спальни', 'спален'],
    },
    {
        name: 'Кровати',
        value: '2',
        nameDeclensions: ['кровать', 'кровати', 'кроватей'],
    },
    {
        name: 'Ванные комнаты',
        value: '0',
        nameDeclensions: ['ванная комната', 'ванные комнаты', 'ванных комнат'],
    },
]

const listCheckboxes = [
    {
        name: 'Завтрак',
        checked: false,
    },
    {
        name: 'Письменный стол',
        checked: true,
    },
    {
        name: 'Стул для кормления',
        checked: true,
    },
    {
        name: 'Кроватка',
        checked: true,
    },
    {
        name: 'Телевизор',
        checked: false,
    },
    {
        name: 'Шампунь',
        checked: false,
    },
]
pug_html = pug_html + "\n    \u003Cdiv class=\"container\"\u003E\n      \u003Cdiv class=\"form-elements\"\u003E\n        \u003Cdiv class=\"form-elements__elements-container\"\u003E\n          \u003Cdiv class=\"form-elements__field-wrapper\"\u003E\n            \u003Cdiv class=\"form-elements__field-elem-info\"\u003E";
pug_indent.push('              ');
pug_mixins["elem-info"]('Text field', 'default');
pug_indent.pop();
pug_html = pug_html + "\n            \u003C\u002Fdiv\u003E";
pug_indent.push('            ');
pug_mixins["text-field"]({
                        inputOptions: {
                            placeholder: 'Email',
                            type: 'email',
                        }
                    });
pug_indent.pop();
pug_html = pug_html + "\n          \u003C\u002Fdiv\u003E\n          \u003Cdiv class=\"form-elements__field-wrapper\"\u003E\n            \u003Cdiv class=\"form-elements__field-elem-info\"\u003E";
pug_indent.push('              ');
pug_mixins["elem-info"]('Text field', 'hover / focus');
pug_indent.pop();
pug_html = pug_html + "\n            \u003C\u002Fdiv\u003E";
pug_indent.push('            ');
pug_mixins["text-field"]({
                        inputOptions: {
                            placeholder: 'This is pretty awesome',
                            type: 'text',
                            value: 'This is pretty awesome',
                        },
                        modifiers: {
                            isFocused: true,
                        }
                    });
pug_indent.pop();
pug_html = pug_html + "\n          \u003C\u002Fdiv\u003E\n          \u003Cdiv class=\"form-elements__field-wrapper\"\u003E\n            \u003Cdiv class=\"form-elements__guests-dropdown\"\u003E";
pug_indent.push('              ');
pug_mixins["dropdown"]({
                            title: 'Dropdown',
                            inputOptions: {
                                value: 'Сколько гостей',
                                placeholder: 'Сколько гостей',
                            },
                            popupMixinOptions: {
                                name: 'items-counter',
                                params: {
                                    items: [
                                        {
                                            name: 'Взрослые',
                                            value: 0,
                                        },
                                        {
                                            name: 'Дети',
                                            value: 0,
                                        },
                                        {
                                            name: 'Младенцы',
                                            value: 0,
                                            nameDeclensions: ['младенец', 'младенца', 'младенцев'],
                                        },
                                    ],
                                    wordForValueTextReplacing: ['гость', 'гостя', 'гостей'],
                                    itemIndexForSeparateCount: 2,
                                },
                            },
                            defaultInputValue: 'Сколько гостей',
                        });
pug_indent.pop();
pug_html = pug_html + "\n            \u003C\u002Fdiv\u003E\n          \u003C\u002Fdiv\u003E\n          \u003Cdiv class=\"form-elements__field-wrapper\"\u003E\n            \u003Cdiv class=\"form-elements__field-elem-info\"\u003E";
pug_indent.push('              ');
pug_mixins["elem-info"]('Masked text field');
pug_indent.pop();
pug_html = pug_html + "\n            \u003C\u002Fdiv\u003E";
pug_indent.push('            ');
pug_mixins["text-field"]({
                        inputOptions: {
                            placeholder: 'ДД.ММ.ГГГГ',
                            type: 'text',
                            isMaskedDate: true,
                        },
                    });
pug_indent.pop();
pug_html = pug_html + "\n          \u003C\u002Fdiv\u003E\n          \u003Cdiv class=\"form-elements__dropdown-wrapper\"\u003E\n            \u003Cdiv class=\"form-elements__date-dropdown\"\u003E";
pug_indent.push('              ');
pug_mixins["dropdown"]({
                            title: 'Date dropdown',
                            inputOptions: [
                                {
                                    value: 'ДД.ММ.ГГГГ',
                                    placeholder: 'ДД.ММ.ГГГГ',
                                },
                                {
                                    value: '19.08.2019',
                                    placeholder: 'ДД.ММ.ГГГГ',
                                },
                            ],
                            popupMixinOptions: {
                                name: 'date-picker',
                                params: {
                                    isTextDouble: true,
                                    initialDate: [null, '2019.08.19'],
                                },
                            },
                            isDouble: true,
                            defaultInputValue: 'ДД.ММ.ГГГГ',
                        });
pug_indent.pop();
pug_html = pug_html + "\n            \u003C\u002Fdiv\u003E\n          \u003C\u002Fdiv\u003E\n          \u003Cdiv class=\"form-elements__dropdown-wrapper\"\u003E\n            \u003Cdiv class=\"form-elements__filter-date-dropdown\"\u003E";
pug_indent.push('              ');
pug_mixins["dropdown"]({
                            title: 'Filter date dropdown',
                            inputOptions: {
                                value: '19 авг - 23 авг',
                                placeholder: 'Дата',
                            },
                            popupMixinOptions: {
                                name: 'date-picker',
                                params: {
                                    dateFormat: 'd M',
                                    initialDate: ['2019.08.19', '2019.08.23'],
                                },
                            },
                            isShort: true,
                            defaultInputValue: 'Дата',
                        });
pug_indent.pop();
pug_html = pug_html + "\n            \u003C\u002Fdiv\u003E\n          \u003C\u002Fdiv\u003E\n          \u003Cdiv class=\"form-elements__field-wrapper\"\u003E\n            \u003Cdiv class=\"form-elements__field-elem-info\"\u003E";
pug_indent.push('              ');
pug_mixins["elem-info"]('Subscription text field');
pug_indent.pop();
pug_html = pug_html + "\n            \u003C\u002Fdiv\u003E";
pug_indent.push('            ');
pug_mixins["text-field"]({
                        inputOptions: {
                            placeholder: 'Email',
                            type: 'email',
                        },
                        arrowOptions: {
                            type: 'forward',
                            color: 'purple-gradient',
                        },
                        modifiers: {
                            isShort: true,
                        },
                    });
pug_indent.pop();
pug_html = pug_html + "\n          \u003C\u002Fdiv\u003E\n        \u003C\u002Fdiv\u003E\n        \u003Cdiv class=\"form-elements__elements-container\"\u003E\n          \u003Cdiv class=\"form-elements__button-wrapper\"\u003E\n            \u003Cdiv class=\"form-elements__button-elem-info\"\u003E";
pug_indent.push('              ');
pug_mixins["elem-info"]('Checkbox buttons');
pug_indent.pop();
pug_html = pug_html + "\n            \u003C\u002Fdiv\u003E";
pug_indent.push('            ');
pug_mixins["checkbox-buttons"]({
                        items: [
                            {
                                name: 'Можно курить',
                                checked: false,
                            },
                            {
                                name: 'Можно с питомцами',
                                checked: true,
                            },
                            {
                                name: 'Можно пригласить гостей<br>(до 10 человек)',
                                checked: true,
                            }
                        ],
                    });
pug_indent.pop();
pug_html = pug_html + "\n          \u003C\u002Fdiv\u003E\n          \u003Cdiv class=\"form-elements__button-wrapper\"\u003E\n            \u003Cdiv class=\"form-elements__button-elem-info\"\u003E";
pug_indent.push('              ');
pug_mixins["elem-info"]('Radio buttons');
pug_indent.pop();
pug_html = pug_html + "\n            \u003C\u002Fdiv\u003E";
pug_indent.push('            ');
pug_mixins["radio-buttons"]({
                        items: ['Мужчина', 'Женщина'],
                        itemsName: 'gender',
                    });
pug_indent.pop();
pug_html = pug_html + "\n          \u003C\u002Fdiv\u003E\n          \u003Cdiv class=\"form-elements__button-wrapper\"\u003E\n            \u003Cdiv class=\"form-elements__button-elem-info\"\u003E";
pug_indent.push('              ');
pug_mixins["elem-info"]('Toggle');
pug_indent.pop();
pug_html = pug_html + "\n            \u003C\u002Fdiv\u003E\n            \u003Cdiv class=\"form-elements__toggle-button\"\u003E";
pug_indent.push('              ');
pug_mixins["checkbox-buttons"]({
                            items: [{ name: 'Получать спецпредложения', checked: true }],
                            theme: 'toggle',
                        });
pug_indent.pop();
pug_html = pug_html + "\n            \u003C\u002Fdiv\u003E\n            \u003Cdiv class=\"form-elements__toggle-button\"\u003E";
pug_indent.push('              ');
pug_mixins["checkbox-buttons"]({
                            items: [{ name: 'Получать спецпредложения' }],
                            theme: 'toggle',
                        });
pug_indent.pop();
pug_html = pug_html + "\n            \u003C\u002Fdiv\u003E\n          \u003C\u002Fdiv\u003E\n          \u003Cdiv class=\"form-elements__like-buttons-wrapper\"\u003E\n            \u003Cdiv class=\"form-elements__button-elem-info\"\u003E";
pug_indent.push('              ');
pug_mixins["elem-info"]('Like button');
pug_indent.pop();
pug_html = pug_html + "\n            \u003C\u002Fdiv\u003E\n            \u003Cdiv class=\"form-elements__like-button\"\u003E";
pug_indent.push('              ');
pug_mixins["like-button"]({
                            likesNum: 2,
                        });
pug_indent.pop();
pug_html = pug_html + "\n            \u003C\u002Fdiv\u003E\n            \u003Cdiv class=\"form-elements__like-button\"\u003E";
pug_indent.push('              ');
pug_mixins["like-button"]({
                            likesNum: 12,
                            isActive: true,
                        });
pug_indent.pop();
pug_html = pug_html + "\n            \u003C\u002Fdiv\u003E\n          \u003C\u002Fdiv\u003E\n          \u003Cdiv class=\"form-elements__rate-buttons-wrapper\"\u003E\n            \u003Cdiv class=\"form-elements__button-elem-info\"\u003E";
pug_indent.push('              ');
pug_mixins["elem-info"]('Rate button');
pug_indent.pop();
pug_html = pug_html + "\n            \u003C\u002Fdiv\u003E\n            \u003Cdiv class=\"form-elements__rate-button\"\u003E";
pug_indent.push('              ');
pug_mixins["rate-button"](4);
pug_indent.pop();
pug_html = pug_html + "\n            \u003C\u002Fdiv\u003E\n            \u003Cdiv class=\"form-elements__rate-button\"\u003E";
pug_indent.push('              ');
pug_mixins["rate-button"](5);
pug_indent.pop();
pug_html = pug_html + "\n            \u003C\u002Fdiv\u003E\n          \u003C\u002Fdiv\u003E\n        \u003C\u002Fdiv\u003E\n        \u003Cdiv class=\"form-elements__elements-container\"\u003E\n          \u003Cdiv class=\"form-elements__range-slider-wrapper\"\u003E";
pug_indent.push('            ');
pug_mixins["range-slider"]('Range slider');
pug_indent.pop();
pug_html = pug_html + "\n          \u003C\u002Fdiv\u003E\n          \u003Cdiv class=\"form-elements__button-wrapper\"\u003E\n            \u003Cdiv class=\"form-elements__button-elem-info\"\u003E";
pug_indent.push('              ');
pug_mixins["elem-info"]('Buttons');
pug_indent.pop();
pug_html = pug_html + "\n            \u003C\u002Fdiv\u003E\n            \u003Cdiv class=\"form-elements__button\"\u003E";
pug_indent.push('              ');
pug_mixins["button"]();
pug_indent.pop();
pug_html = pug_html + "\n            \u003C\u002Fdiv\u003E\n            \u003Cdiv class=\"form-elements__button\"\u003E";
pug_indent.push('              ');
pug_mixins["button"]({
                            modifiers: {
                                isHovered: true,
                            },
                        });
pug_indent.pop();
pug_html = pug_html + "\n            \u003C\u002Fdiv\u003E\n            \u003Cdiv class=\"form-elements__button\"\u003E";
pug_indent.push('              ');
pug_mixins["button"]({
                            modifiers: {
                                isSecondary: true,
                            },
                        });
pug_indent.pop();
pug_html = pug_html + "\n            \u003C\u002Fdiv\u003E\n            \u003Cdiv class=\"form-elements__button\"\u003E";
pug_indent.push('              ');
pug_mixins["button"]({
                            modifiers: {
                                isSecondary: true,
                                isHovered: true,
                            },
                        });
pug_indent.pop();
pug_html = pug_html + "\n            \u003C\u002Fdiv\u003E\n            \u003Cdiv class=\"form-elements__button\"\u003E";
pug_indent.push('              ');
pug_mixins["button"]({
                            modifiers: {
                                withoutFrame: true,
                                textColor: 'purple',
                            },
                        });
pug_indent.pop();
pug_html = pug_html + "\n            \u003C\u002Fdiv\u003E\n            \u003Cdiv class=\"form-elements__button\"\u003E";
pug_indent.push('              ');
pug_mixins["button"]({
                            modifiers: {
                                withoutFrame: true,
                                textColor: 'gray',
                            },
                        });
pug_indent.pop();
pug_html = pug_html + "\n            \u003C\u002Fdiv\u003E\n            \u003Cdiv class=\"form-elements__button\"\u003E";
pug_indent.push('              ');
pug_mixins["button"]({
                            text: 'Перейти к оплате',
                            modifiers: {
                                isLong: true,
                            },
                        });
pug_indent.pop();
pug_html = pug_html + "\n            \u003C\u002Fdiv\u003E\n          \u003C\u002Fdiv\u003E\n          \u003Cdiv class=\"form-elements__button-wrapper\"\u003E\n            \u003Cdiv class=\"form-elements__button-elem-info\"\u003E";
pug_indent.push('              ');
pug_mixins["elem-info"]('Pagination');
pug_indent.pop();
pug_html = pug_html + "\n            \u003C\u002Fdiv\u003E";
pug_indent.push('            ');
pug_mixins["pagination"]('1 &ndash; 12 из 100+ вариантов аренды');
pug_indent.pop();
pug_html = pug_html + "\n          \u003C\u002Fdiv\u003E\n        \u003C\u002Fdiv\u003E\n        \u003Cdiv class=\"form-elements__elements-container\"\u003E\n          \u003Cdiv class=\"form-elements__field-wrapper\"\u003E\n            \u003Cdiv class=\"form-elements__facilities-dropdown\"\u003E\n              \u003Cdiv class=\"form-elements__field-elem-info\"\u003E";
pug_indent.push('                ');
pug_mixins["elem-info"]('Dropdown', 'Default', true);
pug_indent.pop();
pug_html = pug_html + "\n              \u003C\u002Fdiv\u003E";
pug_indent.push('              ');
pug_mixins["dropdown"]({
                            inputOptions: {
                                value: '2 спальни, 2 кровати',
                                placeholder: 'Удобства',
                            },
                            popupMixinOptions: {
                                name: 'items-counter',
                                params: {
                                    items: facilitiesDropdownItems,
                                    withoutButtons: true,
                                },
                            },
                            isShort: true,
                            defaultInputValue: 'Удобства',
                        });
pug_indent.pop();
pug_html = pug_html + "\n            \u003C\u002Fdiv\u003E\n          \u003C\u002Fdiv\u003E\n          \u003Cdiv class=\"form-elements__field-wrapper\"\u003E\n            \u003Cdiv class=\"form-elements__facilities-dropdown form-elements__facilities-dropdown_expanded\"\u003E\n              \u003Cdiv class=\"form-elements__field-elem-info\"\u003E";
pug_indent.push('                ');
pug_mixins["elem-info"]('Dropdown', 'Expanded', true);
pug_indent.pop();
pug_html = pug_html + "\n              \u003C\u002Fdiv\u003E";
pug_indent.push('              ');
pug_mixins["dropdown"]({
                            inputOptions: {
                                value: '2 спальни, 2 кровати',
                                placeholder: 'Удобства',
                            },
                            popupMixinOptions: {
                                name: 'items-counter',
                                params: {
                                    items: facilitiesDropdownItems,
                                    withoutButtons: true,
                                },
                            },
                            isShort: true,
                            popupHidden: false,
                            defaultInputValue: 'Удобства',
                        });
pug_indent.pop();
pug_html = pug_html + "\n            \u003C\u002Fdiv\u003E\n          \u003C\u002Fdiv\u003E\n        \u003C\u002Fdiv\u003E\n        \u003Cdiv class=\"form-elements__elements-container\"\u003E\n          \u003Cdiv class=\"form-elements__guests-dropdown\"\u003E";
pug_indent.push('            ');
pug_mixins["dropdown"]({
                        title: 'Dropdown',
                        inputOptions: {
                            value: 'Сколько гостей',
                            placeholder: 'Сколько гостей'
                        },
                        popupMixinOptions: {
                            name: 'items-counter',
                            params: {
                                items: [
                                    {
                                        name: 'Взрослые',
                                        value: 0,
                                    },
                                    {
                                        name: 'Дети',
                                        value: 0,
                                    },
                                    {
                                        name: 'Младенцы',
                                        value: 0,
                                        nameDeclensions: ['младенец', 'младенца', 'младенцев'],
                                    }
                                ],
                                wordForValueTextReplacing: ['гость', 'гостя', 'гостей'],
                                itemIndexForSeparateCount: 2,
                            },
                        },
                        popupHidden: false,
                        defaultInputValue: 'Сколько гостей',
                    });
pug_indent.pop();
pug_html = pug_html + "\n          \u003C\u002Fdiv\u003E\n        \u003C\u002Fdiv\u003E\n        \u003Cdiv class=\"form-elements__elements-container\"\u003E\n          \u003Cdiv class=\"form-elements__guests-dropdown\"\u003E";
pug_indent.push('            ');
pug_mixins["dropdown"]({
                        title: 'Dropdown',
                        inputOptions: {
                            value: '3 гостя',
                            placeholder: 'Сколько гостей',
                        },
                        popupMixinOptions: {
                            name: 'items-counter',
                            params: {
                                items: [
                                    {
                                        name: 'Взрослые',
                                        value: 2,
                                    },
                                    {
                                        name: 'Дети',
                                        value: 1,
                                    },
                                    {
                                        name: 'Младенцы',
                                        value: 0,
                                        nameDeclensions: ['младенец', 'младенца', 'младенцев'],
                                    },
                                ],
                                wordForValueTextReplacing: ['гость', 'гостя', 'гостей'],
                                itemIndexForSeparateCount: 2,
                            },
                        },
                        popupHidden: false,
                        defaultInputValue: 'Сколько гостей',
                    });
pug_indent.pop();
pug_html = pug_html + "\n          \u003C\u002Fdiv\u003E\n        \u003C\u002Fdiv\u003E\n        \u003Cdiv class=\"form-elements__elements-container form-elements__elements-container_with-top-margin\"\u003E\n          \u003Cdiv class=\"form-elements__expandable-checkboxes-wrapper\"\u003E";
pug_indent.push('            ');
pug_mixins["expandable-checkboxes"]({
                        items: listCheckboxes
                    });
pug_indent.pop();
pug_html = pug_html + "\n          \u003C\u002Fdiv\u003E\n          \u003Cdiv class=\"form-elements__expandable-checkboxes-wrapper\"\u003E";
pug_indent.push('            ');
pug_mixins["expandable-checkboxes"]({
                        items: listCheckboxes,
                        expanded: true
                    });
pug_indent.pop();
pug_html = pug_html + "\n          \u003C\u002Fdiv\u003E\n        \u003C\u002Fdiv\u003E\n        \u003Cdiv class=\"form-elements__elements-container form-elements__elements-container_with-top-margin\"\u003E\n          \u003Cdiv class=\"form-elements__rich-checkboxes-wrapper\"\u003E\n            \u003Cdiv class=\"form-elements__button-elem-info\"\u003E";
pug_indent.push('              ');
pug_mixins["elem-info"]('Rich checkbox buttons');
pug_indent.pop();
pug_html = pug_html + "\n            \u003C\u002Fdiv\u003E";
pug_indent.push('            ');
pug_mixins["checkbox-buttons"]({
                        items: [
                            {
                                name: 'Широкий коридор',
                                description: 'Ширина коридоров в номере<br>не менее 91 см.',
                                checked: false,
                            },
                            {
                                name: 'Помощник для инвалидов',
                                description: 'На 1 этаже вас встретит специалист<br>и проводит до номера.',
                                checked: false,
                            }
                        ],
                        isRich: true,
                    });
pug_indent.pop();
pug_html = pug_html + "\n          \u003C\u002Fdiv\u003E\n        \u003C\u002Fdiv\u003E\n        \u003Cdiv class=\"form-elements__elements-container form-elements__elements-container_with-top-margin\"\u003E\n          \u003Cdiv class=\"form-elements__bullet-list-wrapper\"\u003E\n            \u003Cdiv class=\"form-elements__bullet-elem-info\"\u003E";
pug_indent.push('              ');
pug_mixins["elem-info"]('Bullet list');
pug_indent.pop();
pug_html = pug_html + "\n            \u003C\u002Fdiv\u003E";
pug_indent.push('            ');
pug_mixins["bullet-list"]([
                      'Нельзя с питомцами',
                      'Без вечеринок и мероприятий',
                      'Время прибытия — после 13:00,<br>а выезд до 12:00',
                    ]);
pug_indent.pop();
pug_html = pug_html + "\n          \u003C\u002Fdiv\u003E\n        \u003C\u002Fdiv\u003E\n        \u003Cdiv class=\"form-elements__icon-text-list-wrapper\"\u003E";
pug_indent.push('          ');
pug_mixins["icon-text-list"]([
                    {
                        title: 'Комфорт',
                        description: 'Шумопоглощающие стены',
                        iconName: 'insert_emoticon',
                    },
                    {
                        title: 'Удобство',
                        description: 'Окно в каждой из спален',
                        iconName: 'location_city',
                    },
                ]);
pug_indent.pop();
pug_html = pug_html + "\n        \u003C\u002Fdiv\u003E\n        \u003Cdiv class=\"form-elements__comment-wrapper\"\u003E";
pug_indent.push('          ');
pug_mixins["comment"]({
                    avatarLink: 'images/avatar_murad.png',
                    userName: 'Мурад Сарафанов',
                    dateText: '5 дней назад',
                    dateTime: '2021-05-15 19:00',
                    text: `Великолепный матрас на кровати в основной спальне! А пуфик вообще потрясающий.
                        И стены, действительно, шумоподавляющие. Выкрикивал комплименты повару — никто не жаловался из соседей.`,
                    likeOptions: {
                        likesNum: 12,
                        isActive: true,
                    },
                });
pug_indent.pop();
pug_html = pug_html + "\n        \u003C\u002Fdiv\u003E\n      \u003C\u002Fdiv\u003E\n    \u003C\u002Fdiv\u003E\n  \u003C\u002Fbody\u003E\n\u003C\u002Fhtml\u003E";
    }.call(this, "Array" in locals_for_with ?
        locals_for_with.Array :
        typeof Array !== 'undefined' ? Array : undefined, "JSON" in locals_for_with ?
        locals_for_with.JSON :
        typeof JSON !== 'undefined' ? JSON : undefined, "pug_indent" in locals_for_with ?
        locals_for_with.pug_indent :
        typeof pug_indent !== 'undefined' ? pug_indent : undefined));
    ;;return pug_html;};
module.exports = template;

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(2);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;
    var locals_for_with = (locals || {});
    
    (function (pug_indent) {
      var pug_indent = [];
pug_mixins["arrow"] = pug_interp = function({ type, color, withoutPadding = false } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'arrow';
let iconName = 'expand_more';

switch (type) {
    case 'expand-less':
        iconName = 'expand_less';
        break;
    case 'forward':
        iconName = 'arrow_forward';
        break;
    default:
        break;
}

switch (color) {
    case 'white':
        className += ' arrow_color_white';
        break;
    case 'purple-gradient':
        className += ' arrow_color_purple-gradient';
        break;
    default:
        break;
}

if (withoutPadding) {
    className += ' arrow_without-padding';
}

pug_html = pug_html + "\u003Cspan" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = iconName) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
};
pug_mixins["heading"] = pug_interp = function({ text = '', type = 'h3', color, withJs = false }){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'heading';
let tag;

switch (type) {
    case 'h3':
        className += ' heading_type_h3';
        tag = 'h3';
        break;
    case 'h2':
        className += ' heading_type_h2';
        tag = 'h2';
        break;
    case 'inline':
        className += ' heading_type_h3';
        tag = 'span';
        break;
    default:
        tag = 'h1';
        break;
}
switch (color) {
    case 'white':
        className += ' heading_color_white';
        break;
    case 'purple':
        className += ' heading_color_purple';
        break;
    case 'gray':
        className += ' heading_color_gray';
        break;
    case 'inherit':
        className += ' heading_color_inherit';
        break;
    default:
        break;
}
if (withJs) {
  className += ' js-heading';
}

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C" + (tag) + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = text) ? "" : pug_interp)) + "\u003C\u002F" + (tag) + "\u003E";
};
pug_mixins["button"] = pug_interp = function(options = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
const {
    text = 'click me',
    hasLink = false,
    isSubmit = false,
    link = 'change-me',
    modifiers = {},
    withJs = false,
} = options;

let className = 'button';
let headingOptions = {
    text,
    type: 'inline',
    color: 'white',
};

if (hasLink) {
    headingOptions.type = 'h3';
}

if (modifiers.isSecondary) {
    className += ' button_secondary';
    headingOptions.color = 'purple';
}
if (modifiers.withoutFrame) {
    headingOptions.color = 'inherit';
    className += ' button_without-frame';
}
if (modifiers.isLong) {
    className += ' button_long';
}
if (modifiers.isHovered) {
    className += ' button_hovered';
}
if (modifiers.isNarrow) {
    className += ' button_narrow';
}
if (modifiers.isWide) {
    className += ' button_wide';
}
if (withJs) {
  className += ' js-button';
}

switch (modifiers.textColor) {
    case 'white':
        headingOptions.color = 'white';
        break;
    case 'purple':
        headingOptions.color = 'purple';
        break;
    case 'gray':
        headingOptions.color = 'gray';
        break;
    default:
        break;
}

if ((hasLink)) {
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E\u003Ca" + (" class=\"button__text\""+pug.attr("href", link, true, true)) + "\u003E";
pug_indent.push('    ');
pug_mixins["heading"](headingOptions);
pug_indent.pop();
pug_html = pug_html + "\u003C\u002Fa\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"button__arrow\"\u003E";
pug_indent.push('    ');
pug_mixins["arrow"]({
                  type: 'forward',
                  color: 'white',
                });
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
else {
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cbutton" + (pug.attr("class", pug.classes([className], [true]), false, true)+pug.attr("type", isSubmit ? 'submit' : 'button', true, true)) + "\u003E\u003Cspan class=\"button__text\"\u003E";
pug_indent.push('    ');
pug_mixins["heading"](headingOptions);
pug_indent.pop();
pug_html = pug_html + "\u003C\u002Fspan\u003E\u003Cspan class=\"button__arrow\"\u003E";
pug_indent.push('    ');
pug_mixins["arrow"]({
                    type: 'forward',
                    color: 'white',
                });
pug_indent.pop();
pug_html = pug_html + "\u003C\u002Fspan\u003E\u003C\u002Fbutton\u003E";
}
};
pug_mixins["arrow"] = pug_interp = function({ type, color, withoutPadding = false } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'arrow';
let iconName = 'expand_more';

switch (type) {
    case 'expand-less':
        iconName = 'expand_less';
        break;
    case 'forward':
        iconName = 'arrow_forward';
        break;
    default:
        break;
}

switch (color) {
    case 'white':
        className += ' arrow_color_white';
        break;
    case 'purple-gradient':
        className += ' arrow_color_purple-gradient';
        break;
    default:
        break;
}

if (withoutPadding) {
    className += ' arrow_without-padding';
}

pug_html = pug_html + "\u003Cspan" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = iconName) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
};
pug_mixins["navigation"] = pug_interp = function({ items, activeLinkIndex, inColumn = false, withJs = false }){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'navigation';
if (inColumn) {
    className += ' navigation_in-column';
}
if (withJs) {
    className += ' js-navigation';
}
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cnav" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cul class=\"navigation__list\"\u003E";
// iterate items
;(function(){
  var $$obj = items;
  if ('number' == typeof $$obj.length) {
      for (var itemIndex = 0, $$l = $$obj.length; itemIndex < $$l; itemIndex++) {
        var item = $$obj[itemIndex];
const link = item.link || 'change-me';

let itemClassName = 'navigation__item';
if (item.isActive) {
    itemClassName += ' navigation__item_active';
}

pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli" + (pug.attr("class", pug.classes([itemClassName], [true]), false, true)) + "\u003E";
if ((item.subitems)) {
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + ("\u003Cbutton class=\"navigation__link\"\u003E" + (pug.escape(null == (pug_interp = item.name) ? "" : pug_interp)));
pug_indent.push('        ');
pug_mixins["arrow"]({ withoutPadding: true });
pug_indent.pop();
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fbutton\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cul class=\"navigation__subitems\"\u003E";
// iterate item.subitems
;(function(){
  var $$obj = item.subitems;
  if ('number' == typeof $$obj.length) {
      for (var pug_index1 = 0, $$l = $$obj.length; pug_index1 < $$l; pug_index1++) {
        var subitem = $$obj[pug_index1];
pug_html = pug_html + "\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"navigation__subitem\"\u003E\u003Ca" + (" class=\"navigation__link\""+pug.attr("href", subitem.link || 'change-me', true, true)) + "\u003E" + (pug.escape(null == (pug_interp = subitem.name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index1 in $$obj) {
      $$l++;
      var subitem = $$obj[pug_index1];
pug_html = pug_html + "\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"navigation__subitem\"\u003E\u003Ca" + (" class=\"navigation__link\""+pug.attr("href", subitem.link || 'change-me', true, true)) + "\u003E" + (pug.escape(null == (pug_interp = subitem.name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Ful\u003E";
}
else {
pug_html = pug_html + "\u003Ca" + (" class=\"navigation__link\""+pug.attr("href", link, true, true)) + "\u003E" + (pug.escape(null == (pug_interp = item.name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E";
}
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var itemIndex in $$obj) {
      $$l++;
      var item = $$obj[itemIndex];
const link = item.link || 'change-me';

let itemClassName = 'navigation__item';
if (item.isActive) {
    itemClassName += ' navigation__item_active';
}

pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli" + (pug.attr("class", pug.classes([itemClassName], [true]), false, true)) + "\u003E";
if ((item.subitems)) {
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + ("\u003Cbutton class=\"navigation__link\"\u003E" + (pug.escape(null == (pug_interp = item.name) ? "" : pug_interp)));
pug_indent.push('        ');
pug_mixins["arrow"]({ withoutPadding: true });
pug_indent.pop();
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fbutton\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cul class=\"navigation__subitems\"\u003E";
// iterate item.subitems
;(function(){
  var $$obj = item.subitems;
  if ('number' == typeof $$obj.length) {
      for (var pug_index2 = 0, $$l = $$obj.length; pug_index2 < $$l; pug_index2++) {
        var subitem = $$obj[pug_index2];
pug_html = pug_html + "\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"navigation__subitem\"\u003E\u003Ca" + (" class=\"navigation__link\""+pug.attr("href", subitem.link || 'change-me', true, true)) + "\u003E" + (pug.escape(null == (pug_interp = subitem.name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index2 in $$obj) {
      $$l++;
      var subitem = $$obj[pug_index2];
pug_html = pug_html + "\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"navigation__subitem\"\u003E\u003Ca" + (" class=\"navigation__link\""+pug.attr("href", subitem.link || 'change-me', true, true)) + "\u003E" + (pug.escape(null == (pug_interp = subitem.name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Ful\u003E";
}
else {
pug_html = pug_html + "\u003Ca" + (" class=\"navigation__link\""+pug.attr("href", link, true, true)) + "\u003E" + (pug.escape(null == (pug_interp = item.name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E";
}
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Ful\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fnav\u003E";
};
pug_mixins["header"] = pug_interp = function({ userName, activeLink } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cheader class=\"header js-header\"\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"header__container\"\u003E\u003Ca class=\"header__logo\" href=\"landing-page.html\"\u003E\u003Cimg src=\"images\u002Flogo.svg\" alt=\"logo\"\u003E\u003C\u002Fa\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"header__menu js-header__menu\"\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"header__nav-container\"\u003E";
pug_indent.push('        ');
pug_mixins["navigation"]({
                        activeLinkIndex: activeLink,
                        items: [
                            {
                                name: 'О нас',
                            },
                            {
                                name: 'Услуги',
                                subitems: [{ name: 'Заказ комнаты' }],
                            },
                            {
                                name: 'Вакансии',
                            },
                            {
                                name: 'Новости',
                            },
                            {
                                name: 'Соглашения',
                                subitems: [
                                    { name: 'Правила' },
                                    { name: 'Конфиденциальность' },
                                ],
                            },
                        ].map((item, index) => ({ ...item, isActive: activeLink === index })),
                        withJs: true,
                    });
pug_indent.pop();
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
if (userName) {
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"header__user\"\u003E" + (pug.escape(null == (pug_interp = userName) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E";
}
else {
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"header__buttons\"\u003E";
pug_indent.push('        ');
pug_mixins["button"]({
                            text: 'Войти',
                            hasLink: true,
                            link: 'login.html',
                            modifiers: {
                                isSecondary: true,
                                isNarrow: true,
                            },
                        });
pug_indent.pop();
pug_indent.push('        ');
pug_mixins["button"]({
                            text: 'Зарегистрироваться',
                            hasLink: true,
                            link: 'registration.html',
                            modifiers: {
                              isNarrow: true,
                            },
                        });
pug_indent.pop();
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cbutton class=\"header__hamburger js-header__hamburger\"\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"header__hamburger-icon\"\u003E\u003C\u002Fdiv\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fbutton\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fheader\u003E";
};
pug_mixins["arrow"] = pug_interp = function({ type, color, withoutPadding = false } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'arrow';
let iconName = 'expand_more';

switch (type) {
    case 'expand-less':
        iconName = 'expand_less';
        break;
    case 'forward':
        iconName = 'arrow_forward';
        break;
    default:
        break;
}

switch (color) {
    case 'white':
        className += ' arrow_color_white';
        break;
    case 'purple-gradient':
        className += ' arrow_color_purple-gradient';
        break;
    default:
        break;
}

if (withoutPadding) {
    className += ' arrow_without-padding';
}

pug_html = pug_html + "\u003Cspan" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = iconName) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
};
pug_mixins["navigation"] = pug_interp = function({ items, activeLinkIndex, inColumn = false, withJs = false }){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'navigation';
if (inColumn) {
    className += ' navigation_in-column';
}
if (withJs) {
    className += ' js-navigation';
}
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cnav" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cul class=\"navigation__list\"\u003E";
// iterate items
;(function(){
  var $$obj = items;
  if ('number' == typeof $$obj.length) {
      for (var itemIndex = 0, $$l = $$obj.length; itemIndex < $$l; itemIndex++) {
        var item = $$obj[itemIndex];
const link = item.link || 'change-me';

let itemClassName = 'navigation__item';
if (item.isActive) {
    itemClassName += ' navigation__item_active';
}

pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli" + (pug.attr("class", pug.classes([itemClassName], [true]), false, true)) + "\u003E";
if ((item.subitems)) {
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + ("\u003Cbutton class=\"navigation__link\"\u003E" + (pug.escape(null == (pug_interp = item.name) ? "" : pug_interp)));
pug_indent.push('        ');
pug_mixins["arrow"]({ withoutPadding: true });
pug_indent.pop();
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fbutton\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cul class=\"navigation__subitems\"\u003E";
// iterate item.subitems
;(function(){
  var $$obj = item.subitems;
  if ('number' == typeof $$obj.length) {
      for (var pug_index4 = 0, $$l = $$obj.length; pug_index4 < $$l; pug_index4++) {
        var subitem = $$obj[pug_index4];
pug_html = pug_html + "\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"navigation__subitem\"\u003E\u003Ca" + (" class=\"navigation__link\""+pug.attr("href", subitem.link || 'change-me', true, true)) + "\u003E" + (pug.escape(null == (pug_interp = subitem.name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index4 in $$obj) {
      $$l++;
      var subitem = $$obj[pug_index4];
pug_html = pug_html + "\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"navigation__subitem\"\u003E\u003Ca" + (" class=\"navigation__link\""+pug.attr("href", subitem.link || 'change-me', true, true)) + "\u003E" + (pug.escape(null == (pug_interp = subitem.name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Ful\u003E";
}
else {
pug_html = pug_html + "\u003Ca" + (" class=\"navigation__link\""+pug.attr("href", link, true, true)) + "\u003E" + (pug.escape(null == (pug_interp = item.name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E";
}
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var itemIndex in $$obj) {
      $$l++;
      var item = $$obj[itemIndex];
const link = item.link || 'change-me';

let itemClassName = 'navigation__item';
if (item.isActive) {
    itemClassName += ' navigation__item_active';
}

pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli" + (pug.attr("class", pug.classes([itemClassName], [true]), false, true)) + "\u003E";
if ((item.subitems)) {
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + ("\u003Cbutton class=\"navigation__link\"\u003E" + (pug.escape(null == (pug_interp = item.name) ? "" : pug_interp)));
pug_indent.push('        ');
pug_mixins["arrow"]({ withoutPadding: true });
pug_indent.pop();
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fbutton\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cul class=\"navigation__subitems\"\u003E";
// iterate item.subitems
;(function(){
  var $$obj = item.subitems;
  if ('number' == typeof $$obj.length) {
      for (var pug_index5 = 0, $$l = $$obj.length; pug_index5 < $$l; pug_index5++) {
        var subitem = $$obj[pug_index5];
pug_html = pug_html + "\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"navigation__subitem\"\u003E\u003Ca" + (" class=\"navigation__link\""+pug.attr("href", subitem.link || 'change-me', true, true)) + "\u003E" + (pug.escape(null == (pug_interp = subitem.name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index5 in $$obj) {
      $$l++;
      var subitem = $$obj[pug_index5];
pug_html = pug_html + "\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"navigation__subitem\"\u003E\u003Ca" + (" class=\"navigation__link\""+pug.attr("href", subitem.link || 'change-me', true, true)) + "\u003E" + (pug.escape(null == (pug_interp = subitem.name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Ful\u003E";
}
else {
pug_html = pug_html + "\u003Ca" + (" class=\"navigation__link\""+pug.attr("href", link, true, true)) + "\u003E" + (pug.escape(null == (pug_interp = item.name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E";
}
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Ful\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fnav\u003E";
};
pug_mixins["heading"] = pug_interp = function({ text = '', type = 'h3', color, withJs = false }){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'heading';
let tag;

switch (type) {
    case 'h3':
        className += ' heading_type_h3';
        tag = 'h3';
        break;
    case 'h2':
        className += ' heading_type_h2';
        tag = 'h2';
        break;
    case 'inline':
        className += ' heading_type_h3';
        tag = 'span';
        break;
    default:
        tag = 'h1';
        break;
}
switch (color) {
    case 'white':
        className += ' heading_color_white';
        break;
    case 'purple':
        className += ' heading_color_purple';
        break;
    case 'gray':
        className += ' heading_color_gray';
        break;
    case 'inherit':
        className += ' heading_color_inherit';
        break;
    default:
        break;
}
if (withJs) {
  className += ' js-heading';
}

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C" + (tag) + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = text) ? "" : pug_interp)) + "\u003C\u002F" + (tag) + "\u003E";
};
pug_mixins["arrow"] = pug_interp = function({ type, color, withoutPadding = false } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'arrow';
let iconName = 'expand_more';

switch (type) {
    case 'expand-less':
        iconName = 'expand_less';
        break;
    case 'forward':
        iconName = 'arrow_forward';
        break;
    default:
        break;
}

switch (color) {
    case 'white':
        className += ' arrow_color_white';
        break;
    case 'purple-gradient':
        className += ' arrow_color_purple-gradient';
        break;
    default:
        break;
}

if (withoutPadding) {
    className += ' arrow_without-padding';
}

pug_html = pug_html + "\u003Cspan" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = iconName) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
};
pug_mixins["text-field"] = pug_interp = function({ inputOptions = {}, arrowOptions, modifiers = {}, withJs = false } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'text-field';

if (modifiers.isFocused) {
    className += ' text-field_focused';
}
if (modifiers.isShort) {
    className += ' text-field_short';
}
if (modifiers.isBottomFlat) {
    className += ' text-field_flat-bottom';
}
if (modifiers.isClickable) {
    className += ' text-field_clickable';
}

if (withJs) {
    className += ' js-text-field';
}

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E";
let inputClassName = 'text-field__input';
if (arrowOptions) {
    inputClassName += ' text-field__input_with-arrow';
}
if (inputOptions.isMaskedDate) {
    inputClassName += ' text-field__input_masked-date js-text-field__input_masked-date'
}
if (inputOptions.withJs) {
    inputClassName += ' js-text-field__input';
}

pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cinput" + (pug.attr("class", pug.classes([inputClassName], [true]), false, true)+pug.attr("type", inputOptions.type, true, true)+pug.attr("placeholder", inputOptions.placeholder, true, true)+pug.attr("value", inputOptions.value, true, true)+pug.attr("readonly", inputOptions.isReadonly, true, true)) + "\u003E";
if ((arrowOptions)) {
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cbutton" + (" class=\"text-field__arrow\""+pug.attr("type", inputOptions.isSubmit ? 'submit' : 'button', true, true)) + "\u003E";
pug_indent.push('    ');
pug_mixins["arrow"](arrowOptions);
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fbutton\u003E";
}
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
};
pug_mixins["social-links"] = pug_interp = function(){
var block = (this && this.block), attributes = (this && this.attributes) || {};
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cul class=\"social-links\"\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"social-links__item\"\u003E\u003Ca class=\"social-links__link\" href=\"change-me\"\u003E\u003Cspan class=\"social-links__icon fab fa-twitter\"\u003E\u003C\u002Fspan\u003E\u003C\u002Fa\u003E\u003C\u002Fli\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"social-links__item\"\u003E\u003Ca class=\"social-links__link\" href=\"change-me\"\u003E\u003Cspan class=\"social-links__icon fab fa-facebook-square\"\u003E\u003C\u002Fspan\u003E\u003C\u002Fa\u003E\u003C\u002Fli\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"social-links__item\"\u003E\u003Ca class=\"social-links__link\" href=\"change-me\"\u003E\u003Cspan class=\"social-links__icon fab fa-instagram\"\u003E\u003C\u002Fspan\u003E\u003C\u002Fa\u003E\u003C\u002Fli\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Ful\u003E";
};
pug_mixins["footer"] = pug_interp = function(){
var block = (this && this.block), attributes = (this && this.attributes) || {};
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cfooter class=\"footer\"\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"footer__body\"\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"footer__main-info\"\u003E\u003Ca href=\"landing-page.html\"\u003E\u003Cimg src=\"images\u002Flogo.svg\" alt=\"logo\"\u003E\u003C\u002Fa\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cp class=\"footer__description\"\u003EБронирование номеров в лучшем отеле 2019 года по версии ассоциации «Отельные взгляды»\u003C\u002Fp\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"footer__menu\"\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"footer__nav\"\u003E\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"footer__subtitle\"\u003E";
pug_indent.push('          ');
pug_mixins["heading"]({ text: 'Навигация' });
pug_indent.pop();
pug_html = pug_html + "\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
pug_indent.push('        ');
pug_mixins["navigation"]({
                        items: [
                            { name: 'О нас' },
                            { name: 'Новости' },
                            { name: 'Служба поддержки' },
                            { name: 'Услуги' },
                        ],
                        inColumn: true,
                    });
pug_indent.pop();
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"footer__nav\"\u003E\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"footer__subtitle\"\u003E";
pug_indent.push('          ');
pug_mixins["heading"]({ text: 'О нас' });
pug_indent.pop();
pug_html = pug_html + "\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
pug_indent.push('        ');
pug_mixins["navigation"]({
                        items: [
                            { name: 'О сервисе' },
                            { name: 'Наша команда' },
                            { name: 'Вакансии' },
                            { name: 'Инвесторы' },
                        ],
                        inColumn: true,
                    });
pug_indent.pop();
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"footer__nav\"\u003E\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"footer__subtitle\"\u003E";
pug_indent.push('          ');
pug_mixins["heading"]({ text: 'Служба поддержки' });
pug_indent.pop();
pug_html = pug_html + "\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
pug_indent.push('        ');
pug_mixins["navigation"]({
                        items: [
                            { name: 'Соглашения' },
                            { name: 'Сообщества' },
                            { name: 'Связь с нами' },
                        ],
                        inColumn: true,
                    });
pug_indent.pop();
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cform class=\"footer__subscription\"\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"footer__subtitle footer__subtitle_without-margin-bottom\"\u003E";
pug_indent.push('        ');
pug_mixins["heading"]({ text: 'Подписка' });
pug_indent.pop();
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"footer__subscription-text\"\u003EПолучайте специальные предложения и новости сервиса\u003C\u002Fdiv\u003E";
pug_indent.push('      ');
pug_mixins["text-field"]({
                    inputOptions: {
                        placeholder: 'Email',
                        type: 'email',
                        isSubmit: true,
                    },
                    modifiers: {
                        isShort: true,
                    },
                    arrowOptions: {
                        type: 'forward',
                        color: 'purple-gradient',
                    },
                });
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fform\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"footer__bottom\"\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"footer__bottom-container\"\u003E\u003Cspan class=\"footer__copyright\"\u003ECopyright © 2018 Toxin отель. Все права защищены.\u003C\u002Fspan\u003E";
pug_indent.push('      ');
pug_mixins["social-links"]();
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Ffooter\u003E";
};
const name = 'headers-and-footers';
pug_html = pug_html + "\u003C!DOCTYPE html\u003E\n\u003Chtml lang=\"ru\"\u003E\n  \u003Chead\u003E\n    \u003Cmeta charset=\"utf-8\"\u003E\n    \u003Cmeta" + (" name=\"description\""+pug.attr("content", `UI Kit for Toxin Hotel pages (${name})`, true, true)) + "\u003E\n    \u003Cmeta" + (" name=\"keywords\""+pug.attr("content", `toxin, ui-kit ${name}`, true, true)) + "\u003E\n    \u003Cmeta name=\"viewport\" content=\"initial-scale=1.0, width=device-width\"\u003E\n    \u003Clink" + (" rel=\"apple-touch-icon\" sizes=\"180x180\""+pug.attr("href", __webpack_require__(6).default, true, true)) + "\u003E\n    \u003Clink" + (" rel=\"icon\" type=\"image\u002Fpng\" sizes=\"32x32\""+pug.attr("href", __webpack_require__(8).default, true, true)) + "\u003E\n    \u003Clink" + (" rel=\"icon\" type=\"image\u002Fpng\" sizes=\"16x16\""+pug.attr("href", __webpack_require__(7).default, true, true)) + "\u003E\n    \u003Clink rel=\"manifest\" href=\".\u002Fsite.webmanifest\"\u003E\n    \u003Clink" + (" rel=\"mask-icon\""+pug.attr("href", __webpack_require__(10).default, true, true)+" color=\"#bc9cff\"") + "\u003E\n    \u003Clink" + (" rel=\"shortcut icon\""+pug.attr("href", __webpack_require__(9).default, true, true)) + "\u003E\n    \u003Cmeta name=\"msapplication-TileColor\" content=\"#603cba\"\u003E\n    \u003Cmeta name=\"msapplication-config\" content=\".\u002Fbrowserconfig.xml\"\u003E\n    \u003Cmeta name=\"theme-color\" content=\"#ffffff\"\u003E\n    \u003Ctitle\u003E" + (pug.escape(null == (pug_interp = name) ? "" : pug_interp)) + "\u003C\u002Ftitle\u003E\n  \u003C\u002Fhead\u003E\n  \u003Cbody\u003E\n    \u003Cdiv class=\"ui-logo-container\"\u003E\u003Cimg class=\"ui-logo-container__logo\" src=\"images\u002Flogo-icon.svg\" alt=\"logo\"\u003E\u003C\u002Fdiv\u003E\n    \u003Cdiv class=\"headers-and-footers\"\u003E\n      \u003Cdiv class=\"headers-and-footers__header\"\u003E";
pug_indent.push('        ');
pug_mixins["header"]({
                activeLink: 0,
            });
pug_indent.pop();
pug_html = pug_html + "\n      \u003C\u002Fdiv\u003E\n      \u003Cdiv class=\"headers-and-footers__header\"\u003E";
pug_indent.push('        ');
pug_mixins["header"]({
                userName: 'Юлий Цезарь',
                activeLink: 0,
            });
pug_indent.pop();
pug_html = pug_html + "\n      \u003C\u002Fdiv\u003E\n      \u003Cdiv class=\"headers-and-footers__footer\"\u003E";
pug_indent.push('        ');
pug_mixins["footer"]();
pug_indent.pop();
pug_html = pug_html + "\n      \u003C\u002Fdiv\u003E\n    \u003C\u002Fdiv\u003E\n  \u003C\u002Fbody\u003E\n\u003C\u002Fhtml\u003E";
    }.call(this, "pug_indent" in locals_for_with ?
        locals_for_with.pug_indent :
        typeof pug_indent !== 'undefined' ? pug_indent : undefined));
    ;;return pug_html;};
module.exports = template;

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(2);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;
    var locals_for_with = (locals || {});
    
    (function (Array, JSON, activeLink, pug_indent) {
      var pug_indent = [];
pug_mixins["heading"] = pug_interp = function({ text = '', type = 'h3', color, withJs = false }){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'heading';
let tag;

switch (type) {
    case 'h3':
        className += ' heading_type_h3';
        tag = 'h3';
        break;
    case 'h2':
        className += ' heading_type_h2';
        tag = 'h2';
        break;
    case 'inline':
        className += ' heading_type_h3';
        tag = 'span';
        break;
    default:
        tag = 'h1';
        break;
}
switch (color) {
    case 'white':
        className += ' heading_color_white';
        break;
    case 'purple':
        className += ' heading_color_purple';
        break;
    case 'gray':
        className += ' heading_color_gray';
        break;
    case 'inherit':
        className += ' heading_color_inherit';
        break;
    default:
        break;
}
if (withJs) {
  className += ' js-heading';
}

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C" + (tag) + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = text) ? "" : pug_interp)) + "\u003C\u002F" + (tag) + "\u003E";
};
pug_mixins["arrow"] = pug_interp = function({ type, color, withoutPadding = false } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'arrow';
let iconName = 'expand_more';

switch (type) {
    case 'expand-less':
        iconName = 'expand_less';
        break;
    case 'forward':
        iconName = 'arrow_forward';
        break;
    default:
        break;
}

switch (color) {
    case 'white':
        className += ' arrow_color_white';
        break;
    case 'purple-gradient':
        className += ' arrow_color_purple-gradient';
        break;
    default:
        break;
}

if (withoutPadding) {
    className += ' arrow_without-padding';
}

pug_html = pug_html + "\u003Cspan" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = iconName) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
};
pug_mixins["heading"] = pug_interp = function({ text = '', type = 'h3', color, withJs = false }){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'heading';
let tag;

switch (type) {
    case 'h3':
        className += ' heading_type_h3';
        tag = 'h3';
        break;
    case 'h2':
        className += ' heading_type_h2';
        tag = 'h2';
        break;
    case 'inline':
        className += ' heading_type_h3';
        tag = 'span';
        break;
    default:
        tag = 'h1';
        break;
}
switch (color) {
    case 'white':
        className += ' heading_color_white';
        break;
    case 'purple':
        className += ' heading_color_purple';
        break;
    case 'gray':
        className += ' heading_color_gray';
        break;
    case 'inherit':
        className += ' heading_color_inherit';
        break;
    default:
        break;
}
if (withJs) {
  className += ' js-heading';
}

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C" + (tag) + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = text) ? "" : pug_interp)) + "\u003C\u002F" + (tag) + "\u003E";
};
pug_mixins["button"] = pug_interp = function(options = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
const {
    text = 'click me',
    hasLink = false,
    isSubmit = false,
    link = 'change-me',
    modifiers = {},
    withJs = false,
} = options;

let className = 'button';
let headingOptions = {
    text,
    type: 'inline',
    color: 'white',
};

if (hasLink) {
    headingOptions.type = 'h3';
}

if (modifiers.isSecondary) {
    className += ' button_secondary';
    headingOptions.color = 'purple';
}
if (modifiers.withoutFrame) {
    headingOptions.color = 'inherit';
    className += ' button_without-frame';
}
if (modifiers.isLong) {
    className += ' button_long';
}
if (modifiers.isHovered) {
    className += ' button_hovered';
}
if (modifiers.isNarrow) {
    className += ' button_narrow';
}
if (modifiers.isWide) {
    className += ' button_wide';
}
if (withJs) {
  className += ' js-button';
}

switch (modifiers.textColor) {
    case 'white':
        headingOptions.color = 'white';
        break;
    case 'purple':
        headingOptions.color = 'purple';
        break;
    case 'gray':
        headingOptions.color = 'gray';
        break;
    default:
        break;
}

if ((hasLink)) {
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E\u003Ca" + (" class=\"button__text\""+pug.attr("href", link, true, true)) + "\u003E";
pug_indent.push('    ');
pug_mixins["heading"](headingOptions);
pug_indent.pop();
pug_html = pug_html + "\u003C\u002Fa\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"button__arrow\"\u003E";
pug_indent.push('    ');
pug_mixins["arrow"]({
                  type: 'forward',
                  color: 'white',
                });
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
else {
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cbutton" + (pug.attr("class", pug.classes([className], [true]), false, true)+pug.attr("type", isSubmit ? 'submit' : 'button', true, true)) + "\u003E\u003Cspan class=\"button__text\"\u003E";
pug_indent.push('    ');
pug_mixins["heading"](headingOptions);
pug_indent.pop();
pug_html = pug_html + "\u003C\u002Fspan\u003E\u003Cspan class=\"button__arrow\"\u003E";
pug_indent.push('    ');
pug_mixins["arrow"]({
                    type: 'forward',
                    color: 'white',
                });
pug_indent.pop();
pug_html = pug_html + "\u003C\u002Fspan\u003E\u003C\u002Fbutton\u003E";
}
};
pug_mixins["date-picker"] = pug_interp = function(options = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
const {
    withBorder = false,
    dateFormat = null,
    initialDate = [null, null],
    isTextDouble = false,
} = options;

let className = 'date-picker js-date-picker';
if (withBorder) {
    className += ' date-picker_with-border';
}
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv" + (pug.attr("class", pug.classes([className], [true]), false, true)+pug.attr("data-date-format", dateFormat, true, true)+pug.attr("data-initial-date", initialDate, true, true)+pug.attr("data-is-text-double", isTextDouble ? 'true' : 'false', true, true)) + "\u003E\u003C\u002Fdiv\u003E";
};
pug_mixins["heading"] = pug_interp = function({ text = '', type = 'h3', color, withJs = false }){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'heading';
let tag;

switch (type) {
    case 'h3':
        className += ' heading_type_h3';
        tag = 'h3';
        break;
    case 'h2':
        className += ' heading_type_h2';
        tag = 'h2';
        break;
    case 'inline':
        className += ' heading_type_h3';
        tag = 'span';
        break;
    default:
        tag = 'h1';
        break;
}
switch (color) {
    case 'white':
        className += ' heading_color_white';
        break;
    case 'purple':
        className += ' heading_color_purple';
        break;
    case 'gray':
        className += ' heading_color_gray';
        break;
    case 'inherit':
        className += ' heading_color_inherit';
        break;
    default:
        break;
}
if (withJs) {
  className += ' js-heading';
}

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C" + (tag) + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = text) ? "" : pug_interp)) + "\u003C\u002F" + (tag) + "\u003E";
};
pug_mixins["counting-item"] = pug_interp = function({ name = '', value = 0, nameDeclensions } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv" + (" class=\"counting-item js-counting-item\""+pug.attr("data-words", nameDeclensions ? JSON.stringify(nameDeclensions) : false, true, true)) + "\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"counting-item__name js-counting-item__name\"\u003E";
pug_indent.push('    ');
pug_mixins["heading"]({
                text: name,
                withJs: true,
            });
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"counting-item__counter\"\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cbutton class=\"counting-item__change-button counting-item__change-button_action_decrease js-counting-item__change-button_action_decrease\" type=\"button\"\u003E-\u003C\u002Fbutton\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"counting-item__value js-counting-item__value\"\u003E";
pug_indent.push('      ');
pug_mixins["heading"]({
                    text: value,
                    withJs: true,
                });
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cbutton class=\"counting-item__change-button counting-item__change-button_action_increase js-counting-item__change-button_action_increase\" type=\"button\"\u003E+\u003C\u002Fbutton\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
};
pug_mixins["arrow"] = pug_interp = function({ type, color, withoutPadding = false } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'arrow';
let iconName = 'expand_more';

switch (type) {
    case 'expand-less':
        iconName = 'expand_less';
        break;
    case 'forward':
        iconName = 'arrow_forward';
        break;
    default:
        break;
}

switch (color) {
    case 'white':
        className += ' arrow_color_white';
        break;
    case 'purple-gradient':
        className += ' arrow_color_purple-gradient';
        break;
    default:
        break;
}

if (withoutPadding) {
    className += ' arrow_without-padding';
}

pug_html = pug_html + "\u003Cspan" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = iconName) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
};
pug_mixins["heading"] = pug_interp = function({ text = '', type = 'h3', color, withJs = false }){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'heading';
let tag;

switch (type) {
    case 'h3':
        className += ' heading_type_h3';
        tag = 'h3';
        break;
    case 'h2':
        className += ' heading_type_h2';
        tag = 'h2';
        break;
    case 'inline':
        className += ' heading_type_h3';
        tag = 'span';
        break;
    default:
        tag = 'h1';
        break;
}
switch (color) {
    case 'white':
        className += ' heading_color_white';
        break;
    case 'purple':
        className += ' heading_color_purple';
        break;
    case 'gray':
        className += ' heading_color_gray';
        break;
    case 'inherit':
        className += ' heading_color_inherit';
        break;
    default:
        break;
}
if (withJs) {
  className += ' js-heading';
}

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C" + (tag) + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = text) ? "" : pug_interp)) + "\u003C\u002F" + (tag) + "\u003E";
};
pug_mixins["button"] = pug_interp = function(options = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
const {
    text = 'click me',
    hasLink = false,
    isSubmit = false,
    link = 'change-me',
    modifiers = {},
    withJs = false,
} = options;

let className = 'button';
let headingOptions = {
    text,
    type: 'inline',
    color: 'white',
};

if (hasLink) {
    headingOptions.type = 'h3';
}

if (modifiers.isSecondary) {
    className += ' button_secondary';
    headingOptions.color = 'purple';
}
if (modifiers.withoutFrame) {
    headingOptions.color = 'inherit';
    className += ' button_without-frame';
}
if (modifiers.isLong) {
    className += ' button_long';
}
if (modifiers.isHovered) {
    className += ' button_hovered';
}
if (modifiers.isNarrow) {
    className += ' button_narrow';
}
if (modifiers.isWide) {
    className += ' button_wide';
}
if (withJs) {
  className += ' js-button';
}

switch (modifiers.textColor) {
    case 'white':
        headingOptions.color = 'white';
        break;
    case 'purple':
        headingOptions.color = 'purple';
        break;
    case 'gray':
        headingOptions.color = 'gray';
        break;
    default:
        break;
}

if ((hasLink)) {
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E\u003Ca" + (" class=\"button__text\""+pug.attr("href", link, true, true)) + "\u003E";
pug_indent.push('    ');
pug_mixins["heading"](headingOptions);
pug_indent.pop();
pug_html = pug_html + "\u003C\u002Fa\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"button__arrow\"\u003E";
pug_indent.push('    ');
pug_mixins["arrow"]({
                  type: 'forward',
                  color: 'white',
                });
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
else {
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cbutton" + (pug.attr("class", pug.classes([className], [true]), false, true)+pug.attr("type", isSubmit ? 'submit' : 'button', true, true)) + "\u003E\u003Cspan class=\"button__text\"\u003E";
pug_indent.push('    ');
pug_mixins["heading"](headingOptions);
pug_indent.pop();
pug_html = pug_html + "\u003C\u002Fspan\u003E\u003Cspan class=\"button__arrow\"\u003E";
pug_indent.push('    ');
pug_mixins["arrow"]({
                    type: 'forward',
                    color: 'white',
                });
pug_indent.pop();
pug_html = pug_html + "\u003C\u002Fspan\u003E\u003C\u002Fbutton\u003E";
}
};
pug_mixins["items-counter"] = pug_interp = function(options = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
const {
    items,
    withoutButtons = false,
    wordForValueTextReplacing = null,
    itemIndexForSeparateCount = null,
} = options;

let className = 'items-counter js-items-counter';
if (withoutButtons) {
    className += ' items-counter_without-buttons';
}
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv" + (pug.attr("class", pug.classes([className], [true]), false, true)+pug.attr("data-replace-text", JSON.stringify(wordForValueTextReplacing), true, true)+pug.attr("data-separate-item", JSON.stringify(itemIndexForSeparateCount), true, true)) + "\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cul class=\"items-counter__items-list\"\u003E";
// iterate items
;(function(){
  var $$obj = items;
  if ('number' == typeof $$obj.length) {
      for (var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++) {
        var item = $$obj[pug_index0];
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"items-counter__item\"\u003E";
pug_indent.push('      ');
pug_mixins["counting-item"]({
                        name: item.name,
                        value: item.value,
                        nameDeclensions: item.nameDeclensions,
                    });
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index0 in $$obj) {
      $$l++;
      var item = $$obj[pug_index0];
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"items-counter__item\"\u003E";
pug_indent.push('      ');
pug_mixins["counting-item"]({
                        name: item.name,
                        value: item.value,
                        nameDeclensions: item.nameDeclensions,
                    });
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Ful\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"items-counter__button-panel\"\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"items-counter__clear-button js-items-counter__clear-button\"\u003E";
pug_indent.push('      ');
pug_mixins["button"]({
                    text: 'Очистить',
                    hasLink: false,
                    modifiers: {
                        withoutFrame: true,
                    }
                });
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"items-counter__apply-button js-items-counter__apply-button\"\u003E";
pug_indent.push('      ');
pug_mixins["button"]({
                    text: 'Применить',
                    hasLink: false,
                    modifiers: {
                        withoutFrame: true,
                    }
                });
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
};
pug_mixins["arrow"] = pug_interp = function({ type, color, withoutPadding = false } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'arrow';
let iconName = 'expand_more';

switch (type) {
    case 'expand-less':
        iconName = 'expand_less';
        break;
    case 'forward':
        iconName = 'arrow_forward';
        break;
    default:
        break;
}

switch (color) {
    case 'white':
        className += ' arrow_color_white';
        break;
    case 'purple-gradient':
        className += ' arrow_color_purple-gradient';
        break;
    default:
        break;
}

if (withoutPadding) {
    className += ' arrow_without-padding';
}

pug_html = pug_html + "\u003Cspan" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = iconName) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
};
pug_mixins["text-field"] = pug_interp = function({ inputOptions = {}, arrowOptions, modifiers = {}, withJs = false } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'text-field';

if (modifiers.isFocused) {
    className += ' text-field_focused';
}
if (modifiers.isShort) {
    className += ' text-field_short';
}
if (modifiers.isBottomFlat) {
    className += ' text-field_flat-bottom';
}
if (modifiers.isClickable) {
    className += ' text-field_clickable';
}

if (withJs) {
    className += ' js-text-field';
}

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E";
let inputClassName = 'text-field__input';
if (arrowOptions) {
    inputClassName += ' text-field__input_with-arrow';
}
if (inputOptions.isMaskedDate) {
    inputClassName += ' text-field__input_masked-date js-text-field__input_masked-date'
}
if (inputOptions.withJs) {
    inputClassName += ' js-text-field__input';
}

pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cinput" + (pug.attr("class", pug.classes([inputClassName], [true]), false, true)+pug.attr("type", inputOptions.type, true, true)+pug.attr("placeholder", inputOptions.placeholder, true, true)+pug.attr("value", inputOptions.value, true, true)+pug.attr("readonly", inputOptions.isReadonly, true, true)) + "\u003E";
if ((arrowOptions)) {
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cbutton" + (" class=\"text-field__arrow\""+pug.attr("type", inputOptions.isSubmit ? 'submit' : 'button', true, true)) + "\u003E";
pug_indent.push('    ');
pug_mixins["arrow"](arrowOptions);
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fbutton\u003E";
}
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
};
pug_mixins["dropdown"] = pug_interp = function(options = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let {
    inputOptions = {},
    popupMixinOptions = {},
    popupHidden = true,
    title,
    isDouble = false,
    isShort = false,
    isPopupDistant = false,
    defaultInputValue = '',
} = options;

let className = 'dropdown js-dropdown';
if (isDouble) {
    className += ' dropdown_double';
}
if (isShort) {
  className += ' dropdown_short';
}
if (isPopupDistant) {
  className += ' dropdown_with-distant-popup';
}

if (isDouble) {
    if (!Array.isArray(title)) {
        title = [title, title];
    }
    if (!Array.isArray(inputOptions)) {
        inputOptions = [inputOptions, inputOptions];
    }
}
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Csection" + (pug.attr("class", pug.classes([className], [true]), false, true)+pug.attr("data-default-value", JSON.stringify(defaultInputValue), true, true)) + "\u003E";
if ((isDouble)) {
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"dropdown__text-field js-dropdown__text-field\"\u003E";
if ((title[0])) {
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"dropdown__title\"\u003E";
pug_indent.push('      ');
pug_mixins["heading"]({
                            text: title[0],
                        });
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
pug_indent.push('    ');
pug_mixins["text-field"]({
                    inputOptions: {
                        ...inputOptions[0],
                        isMaskedDate: false,
                        isReadonly: true,
                        withJs: true,
                    },
                    arrowOptions: {},
                    modifiers: {
                        isFocused: !popupHidden,
                        isBottomFlat: !popupHidden,
                        isClickable: true,
                    },
                    withJs: true,
                });
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"dropdown__text-field js-dropdown__text-field\"\u003E";
if ((title[1])) {
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"dropdown__title\"\u003E";
pug_indent.push('      ');
pug_mixins["heading"]({
                            text: title[1],
                        });
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
pug_indent.push('    ');
pug_mixins["text-field"]({
                    inputOptions: {
                        ...inputOptions[1],
                        isMaskedDate: false,
                        isReadonly: true,
                        withJs: true,
                    },
                    arrowOptions: {},
                    modifiers: {
                        isFocused: !popupHidden,
                        isBottomFlat: !popupHidden,
                        isClickable: true,
                    },
                    withJs: true,
                });
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
else {
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"dropdown__text-field js-dropdown__text-field\"\u003E";
if ((title)) {
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"dropdown__title\"\u003E";
pug_indent.push('      ');
pug_mixins["heading"]({
                            text: title,
                        });
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
pug_indent.push('    ');
pug_mixins["text-field"]({
                    inputOptions: {
                        ...inputOptions,
                        isMaskedDate: false,
                        isReadonly: true,
                        withJs: true,
                    },
                    arrowOptions: {},
                    modifiers: {
                        isFocused: !popupHidden,
                        isBottomFlat: !popupHidden,
                        isClickable: true,
                    },
                    withJs: true,
                });
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv" + (pug.attr("class", pug.classes(["dropdown__popup","js-dropdown__popup",`${popupHidden ? 'dropdown__popup_hidden' : false}`], [false,false,true]), false, true)) + "\u003E";
if ((popupMixinOptions.name)) {
pug_indent.push('    ');
pug_mixins[popupMixinOptions.name](popupMixinOptions.params);
pug_indent.pop();
}
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fsection\u003E";
};
pug_mixins["search-card"] = pug_interp = function(){
var block = (this && this.block), attributes = (this && this.attributes) || {};
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Carticle class=\"search-card js-search-card\"\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cform\u003E";
pug_indent.push('    ');
pug_mixins["heading"]({
                type: 'h1',
                text: 'Найдём номера под ваши пожелания',
            });
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"search-card__dates js-search-card__dates\"\u003E";
pug_indent.push('      ');
pug_mixins["dropdown"]({
                    inputOptions: {
                        value: 'ДД.ММ.ГГГГ',
                        placeholder: 'ДД.ММ.ГГГГ',
                    },
                    popupMixinOptions: {
                        name: 'date-picker',
                        params: {
                            isTextDouble: true,
                        },
                    },
                    title: ['Прибытие', 'Выезд'],
                    isDouble: true,
                    isPopupDistant: true,
                    defaultInputValue: 'ДД.ММ.ГГГГ',
                });
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"search-card__guests js-search-card__guests\"\u003E";
pug_indent.push('      ');
pug_mixins["dropdown"]({
                    inputOptions: {
                        value: 'Сколько гостей',
                        placeholder: 'Сколько гостей',
                    },
                    popupMixinOptions: {
                        name: 'items-counter',
                        params: {
                            items: [
                                {
                                    name: 'Взрослые',
                                    value: '0',
                                },
                                {
                                    name: 'Дети',
                                    value: '0',
                                },
                                {
                                    name: 'Младенцы',
                                    value: '0',
                                    nameDeclensions: ['младенец', 'младенца', 'младенцев'],
                                },
                            ],
                            wordForValueTextReplacing: ['гость', 'гостя', 'гостей'],
                            itemIndexForSeparateCount: 2,
                        },
                    },
                    title: 'Гости',
                    defaultInputValue: 'Сколько гостей',
                });
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
pug_indent.push('    ');
pug_mixins["button"]({
                text: 'Подобрать номер',
                hasLink: true,
                link: 'search-room.html',
                modifiers: {
                    isLong: true,
                    textColor: 'white',
                },
            });
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fform\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Farticle\u003E";
};
pug_mixins["arrow"] = pug_interp = function({ type, color, withoutPadding = false } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'arrow';
let iconName = 'expand_more';

switch (type) {
    case 'expand-less':
        iconName = 'expand_less';
        break;
    case 'forward':
        iconName = 'arrow_forward';
        break;
    default:
        break;
}

switch (color) {
    case 'white':
        className += ' arrow_color_white';
        break;
    case 'purple-gradient':
        className += ' arrow_color_purple-gradient';
        break;
    default:
        break;
}

if (withoutPadding) {
    className += ' arrow_without-padding';
}

pug_html = pug_html + "\u003Cspan" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = iconName) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
};
pug_mixins["heading"] = pug_interp = function({ text = '', type = 'h3', color, withJs = false }){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'heading';
let tag;

switch (type) {
    case 'h3':
        className += ' heading_type_h3';
        tag = 'h3';
        break;
    case 'h2':
        className += ' heading_type_h2';
        tag = 'h2';
        break;
    case 'inline':
        className += ' heading_type_h3';
        tag = 'span';
        break;
    default:
        tag = 'h1';
        break;
}
switch (color) {
    case 'white':
        className += ' heading_color_white';
        break;
    case 'purple':
        className += ' heading_color_purple';
        break;
    case 'gray':
        className += ' heading_color_gray';
        break;
    case 'inherit':
        className += ' heading_color_inherit';
        break;
    default:
        break;
}
if (withJs) {
  className += ' js-heading';
}

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C" + (tag) + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = text) ? "" : pug_interp)) + "\u003C\u002F" + (tag) + "\u003E";
};
pug_mixins["button"] = pug_interp = function(options = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
const {
    text = 'click me',
    hasLink = false,
    isSubmit = false,
    link = 'change-me',
    modifiers = {},
    withJs = false,
} = options;

let className = 'button';
let headingOptions = {
    text,
    type: 'inline',
    color: 'white',
};

if (hasLink) {
    headingOptions.type = 'h3';
}

if (modifiers.isSecondary) {
    className += ' button_secondary';
    headingOptions.color = 'purple';
}
if (modifiers.withoutFrame) {
    headingOptions.color = 'inherit';
    className += ' button_without-frame';
}
if (modifiers.isLong) {
    className += ' button_long';
}
if (modifiers.isHovered) {
    className += ' button_hovered';
}
if (modifiers.isNarrow) {
    className += ' button_narrow';
}
if (modifiers.isWide) {
    className += ' button_wide';
}
if (withJs) {
  className += ' js-button';
}

switch (modifiers.textColor) {
    case 'white':
        headingOptions.color = 'white';
        break;
    case 'purple':
        headingOptions.color = 'purple';
        break;
    case 'gray':
        headingOptions.color = 'gray';
        break;
    default:
        break;
}

if ((hasLink)) {
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E\u003Ca" + (" class=\"button__text\""+pug.attr("href", link, true, true)) + "\u003E";
pug_indent.push('    ');
pug_mixins["heading"](headingOptions);
pug_indent.pop();
pug_html = pug_html + "\u003C\u002Fa\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"button__arrow\"\u003E";
pug_indent.push('    ');
pug_mixins["arrow"]({
                  type: 'forward',
                  color: 'white',
                });
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
else {
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cbutton" + (pug.attr("class", pug.classes([className], [true]), false, true)+pug.attr("type", isSubmit ? 'submit' : 'button', true, true)) + "\u003E\u003Cspan class=\"button__text\"\u003E";
pug_indent.push('    ');
pug_mixins["heading"](headingOptions);
pug_indent.pop();
pug_html = pug_html + "\u003C\u002Fspan\u003E\u003Cspan class=\"button__arrow\"\u003E";
pug_indent.push('    ');
pug_mixins["arrow"]({
                    type: 'forward',
                    color: 'white',
                });
pug_indent.pop();
pug_html = pug_html + "\u003C\u002Fspan\u003E\u003C\u002Fbutton\u003E";
}
};
pug_mixins["arrow"] = pug_interp = function({ type, color, withoutPadding = false } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'arrow';
let iconName = 'expand_more';

switch (type) {
    case 'expand-less':
        iconName = 'expand_less';
        break;
    case 'forward':
        iconName = 'arrow_forward';
        break;
    default:
        break;
}

switch (color) {
    case 'white':
        className += ' arrow_color_white';
        break;
    case 'purple-gradient':
        className += ' arrow_color_purple-gradient';
        break;
    default:
        break;
}

if (withoutPadding) {
    className += ' arrow_without-padding';
}

pug_html = pug_html + "\u003Cspan" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = iconName) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
};
pug_mixins["navigation"] = pug_interp = function({ items, activeLinkIndex, inColumn = false, withJs = false }){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'navigation';
if (inColumn) {
    className += ' navigation_in-column';
}
if (withJs) {
    className += ' js-navigation';
}
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cnav" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cul class=\"navigation__list\"\u003E";
// iterate items
;(function(){
  var $$obj = items;
  if ('number' == typeof $$obj.length) {
      for (var itemIndex = 0, $$l = $$obj.length; itemIndex < $$l; itemIndex++) {
        var item = $$obj[itemIndex];
const link = item.link || 'change-me';

let itemClassName = 'navigation__item';
if (item.isActive) {
    itemClassName += ' navigation__item_active';
}

pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli" + (pug.attr("class", pug.classes([itemClassName], [true]), false, true)) + "\u003E";
if ((item.subitems)) {
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + ("\u003Cbutton class=\"navigation__link\"\u003E" + (pug.escape(null == (pug_interp = item.name) ? "" : pug_interp)));
pug_indent.push('        ');
pug_mixins["arrow"]({ withoutPadding: true });
pug_indent.pop();
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fbutton\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cul class=\"navigation__subitems\"\u003E";
// iterate item.subitems
;(function(){
  var $$obj = item.subitems;
  if ('number' == typeof $$obj.length) {
      for (var pug_index2 = 0, $$l = $$obj.length; pug_index2 < $$l; pug_index2++) {
        var subitem = $$obj[pug_index2];
pug_html = pug_html + "\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"navigation__subitem\"\u003E\u003Ca" + (" class=\"navigation__link\""+pug.attr("href", subitem.link || 'change-me', true, true)) + "\u003E" + (pug.escape(null == (pug_interp = subitem.name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index2 in $$obj) {
      $$l++;
      var subitem = $$obj[pug_index2];
pug_html = pug_html + "\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"navigation__subitem\"\u003E\u003Ca" + (" class=\"navigation__link\""+pug.attr("href", subitem.link || 'change-me', true, true)) + "\u003E" + (pug.escape(null == (pug_interp = subitem.name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Ful\u003E";
}
else {
pug_html = pug_html + "\u003Ca" + (" class=\"navigation__link\""+pug.attr("href", link, true, true)) + "\u003E" + (pug.escape(null == (pug_interp = item.name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E";
}
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var itemIndex in $$obj) {
      $$l++;
      var item = $$obj[itemIndex];
const link = item.link || 'change-me';

let itemClassName = 'navigation__item';
if (item.isActive) {
    itemClassName += ' navigation__item_active';
}

pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli" + (pug.attr("class", pug.classes([itemClassName], [true]), false, true)) + "\u003E";
if ((item.subitems)) {
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + ("\u003Cbutton class=\"navigation__link\"\u003E" + (pug.escape(null == (pug_interp = item.name) ? "" : pug_interp)));
pug_indent.push('        ');
pug_mixins["arrow"]({ withoutPadding: true });
pug_indent.pop();
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fbutton\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cul class=\"navigation__subitems\"\u003E";
// iterate item.subitems
;(function(){
  var $$obj = item.subitems;
  if ('number' == typeof $$obj.length) {
      for (var pug_index3 = 0, $$l = $$obj.length; pug_index3 < $$l; pug_index3++) {
        var subitem = $$obj[pug_index3];
pug_html = pug_html + "\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"navigation__subitem\"\u003E\u003Ca" + (" class=\"navigation__link\""+pug.attr("href", subitem.link || 'change-me', true, true)) + "\u003E" + (pug.escape(null == (pug_interp = subitem.name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index3 in $$obj) {
      $$l++;
      var subitem = $$obj[pug_index3];
pug_html = pug_html + "\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"navigation__subitem\"\u003E\u003Ca" + (" class=\"navigation__link\""+pug.attr("href", subitem.link || 'change-me', true, true)) + "\u003E" + (pug.escape(null == (pug_interp = subitem.name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Ful\u003E";
}
else {
pug_html = pug_html + "\u003Ca" + (" class=\"navigation__link\""+pug.attr("href", link, true, true)) + "\u003E" + (pug.escape(null == (pug_interp = item.name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E";
}
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Ful\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fnav\u003E";
};
pug_mixins["header"] = pug_interp = function({ userName, activeLink } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cheader class=\"header js-header\"\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"header__container\"\u003E\u003Ca class=\"header__logo\" href=\"landing-page.html\"\u003E\u003Cimg src=\"images\u002Flogo.svg\" alt=\"logo\"\u003E\u003C\u002Fa\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"header__menu js-header__menu\"\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"header__nav-container\"\u003E";
pug_indent.push('        ');
pug_mixins["navigation"]({
                        activeLinkIndex: activeLink,
                        items: [
                            {
                                name: 'О нас',
                            },
                            {
                                name: 'Услуги',
                                subitems: [{ name: 'Заказ комнаты' }],
                            },
                            {
                                name: 'Вакансии',
                            },
                            {
                                name: 'Новости',
                            },
                            {
                                name: 'Соглашения',
                                subitems: [
                                    { name: 'Правила' },
                                    { name: 'Конфиденциальность' },
                                ],
                            },
                        ].map((item, index) => ({ ...item, isActive: activeLink === index })),
                        withJs: true,
                    });
pug_indent.pop();
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
if (userName) {
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"header__user\"\u003E" + (pug.escape(null == (pug_interp = userName) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E";
}
else {
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"header__buttons\"\u003E";
pug_indent.push('        ');
pug_mixins["button"]({
                            text: 'Войти',
                            hasLink: true,
                            link: 'login.html',
                            modifiers: {
                                isSecondary: true,
                                isNarrow: true,
                            },
                        });
pug_indent.pop();
pug_indent.push('        ');
pug_mixins["button"]({
                            text: 'Зарегистрироваться',
                            hasLink: true,
                            link: 'registration.html',
                            modifiers: {
                              isNarrow: true,
                            },
                        });
pug_indent.pop();
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cbutton class=\"header__hamburger js-header__hamburger\"\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"header__hamburger-icon\"\u003E\u003C\u002Fdiv\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fbutton\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fheader\u003E";
};
pug_mixins["arrow"] = pug_interp = function({ type, color, withoutPadding = false } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'arrow';
let iconName = 'expand_more';

switch (type) {
    case 'expand-less':
        iconName = 'expand_less';
        break;
    case 'forward':
        iconName = 'arrow_forward';
        break;
    default:
        break;
}

switch (color) {
    case 'white':
        className += ' arrow_color_white';
        break;
    case 'purple-gradient':
        className += ' arrow_color_purple-gradient';
        break;
    default:
        break;
}

if (withoutPadding) {
    className += ' arrow_without-padding';
}

pug_html = pug_html + "\u003Cspan" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = iconName) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
};
pug_mixins["navigation"] = pug_interp = function({ items, activeLinkIndex, inColumn = false, withJs = false }){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'navigation';
if (inColumn) {
    className += ' navigation_in-column';
}
if (withJs) {
    className += ' js-navigation';
}
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cnav" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cul class=\"navigation__list\"\u003E";
// iterate items
;(function(){
  var $$obj = items;
  if ('number' == typeof $$obj.length) {
      for (var itemIndex = 0, $$l = $$obj.length; itemIndex < $$l; itemIndex++) {
        var item = $$obj[itemIndex];
const link = item.link || 'change-me';

let itemClassName = 'navigation__item';
if (item.isActive) {
    itemClassName += ' navigation__item_active';
}

pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli" + (pug.attr("class", pug.classes([itemClassName], [true]), false, true)) + "\u003E";
if ((item.subitems)) {
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + ("\u003Cbutton class=\"navigation__link\"\u003E" + (pug.escape(null == (pug_interp = item.name) ? "" : pug_interp)));
pug_indent.push('        ');
pug_mixins["arrow"]({ withoutPadding: true });
pug_indent.pop();
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fbutton\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cul class=\"navigation__subitems\"\u003E";
// iterate item.subitems
;(function(){
  var $$obj = item.subitems;
  if ('number' == typeof $$obj.length) {
      for (var pug_index5 = 0, $$l = $$obj.length; pug_index5 < $$l; pug_index5++) {
        var subitem = $$obj[pug_index5];
pug_html = pug_html + "\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"navigation__subitem\"\u003E\u003Ca" + (" class=\"navigation__link\""+pug.attr("href", subitem.link || 'change-me', true, true)) + "\u003E" + (pug.escape(null == (pug_interp = subitem.name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index5 in $$obj) {
      $$l++;
      var subitem = $$obj[pug_index5];
pug_html = pug_html + "\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"navigation__subitem\"\u003E\u003Ca" + (" class=\"navigation__link\""+pug.attr("href", subitem.link || 'change-me', true, true)) + "\u003E" + (pug.escape(null == (pug_interp = subitem.name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Ful\u003E";
}
else {
pug_html = pug_html + "\u003Ca" + (" class=\"navigation__link\""+pug.attr("href", link, true, true)) + "\u003E" + (pug.escape(null == (pug_interp = item.name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E";
}
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var itemIndex in $$obj) {
      $$l++;
      var item = $$obj[itemIndex];
const link = item.link || 'change-me';

let itemClassName = 'navigation__item';
if (item.isActive) {
    itemClassName += ' navigation__item_active';
}

pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli" + (pug.attr("class", pug.classes([itemClassName], [true]), false, true)) + "\u003E";
if ((item.subitems)) {
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + ("\u003Cbutton class=\"navigation__link\"\u003E" + (pug.escape(null == (pug_interp = item.name) ? "" : pug_interp)));
pug_indent.push('        ');
pug_mixins["arrow"]({ withoutPadding: true });
pug_indent.pop();
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fbutton\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cul class=\"navigation__subitems\"\u003E";
// iterate item.subitems
;(function(){
  var $$obj = item.subitems;
  if ('number' == typeof $$obj.length) {
      for (var pug_index6 = 0, $$l = $$obj.length; pug_index6 < $$l; pug_index6++) {
        var subitem = $$obj[pug_index6];
pug_html = pug_html + "\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"navigation__subitem\"\u003E\u003Ca" + (" class=\"navigation__link\""+pug.attr("href", subitem.link || 'change-me', true, true)) + "\u003E" + (pug.escape(null == (pug_interp = subitem.name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index6 in $$obj) {
      $$l++;
      var subitem = $$obj[pug_index6];
pug_html = pug_html + "\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"navigation__subitem\"\u003E\u003Ca" + (" class=\"navigation__link\""+pug.attr("href", subitem.link || 'change-me', true, true)) + "\u003E" + (pug.escape(null == (pug_interp = subitem.name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Ful\u003E";
}
else {
pug_html = pug_html + "\u003Ca" + (" class=\"navigation__link\""+pug.attr("href", link, true, true)) + "\u003E" + (pug.escape(null == (pug_interp = item.name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E";
}
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Ful\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fnav\u003E";
};
pug_mixins["heading"] = pug_interp = function({ text = '', type = 'h3', color, withJs = false }){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'heading';
let tag;

switch (type) {
    case 'h3':
        className += ' heading_type_h3';
        tag = 'h3';
        break;
    case 'h2':
        className += ' heading_type_h2';
        tag = 'h2';
        break;
    case 'inline':
        className += ' heading_type_h3';
        tag = 'span';
        break;
    default:
        tag = 'h1';
        break;
}
switch (color) {
    case 'white':
        className += ' heading_color_white';
        break;
    case 'purple':
        className += ' heading_color_purple';
        break;
    case 'gray':
        className += ' heading_color_gray';
        break;
    case 'inherit':
        className += ' heading_color_inherit';
        break;
    default:
        break;
}
if (withJs) {
  className += ' js-heading';
}

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C" + (tag) + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = text) ? "" : pug_interp)) + "\u003C\u002F" + (tag) + "\u003E";
};
pug_mixins["arrow"] = pug_interp = function({ type, color, withoutPadding = false } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'arrow';
let iconName = 'expand_more';

switch (type) {
    case 'expand-less':
        iconName = 'expand_less';
        break;
    case 'forward':
        iconName = 'arrow_forward';
        break;
    default:
        break;
}

switch (color) {
    case 'white':
        className += ' arrow_color_white';
        break;
    case 'purple-gradient':
        className += ' arrow_color_purple-gradient';
        break;
    default:
        break;
}

if (withoutPadding) {
    className += ' arrow_without-padding';
}

pug_html = pug_html + "\u003Cspan" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = iconName) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
};
pug_mixins["text-field"] = pug_interp = function({ inputOptions = {}, arrowOptions, modifiers = {}, withJs = false } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'text-field';

if (modifiers.isFocused) {
    className += ' text-field_focused';
}
if (modifiers.isShort) {
    className += ' text-field_short';
}
if (modifiers.isBottomFlat) {
    className += ' text-field_flat-bottom';
}
if (modifiers.isClickable) {
    className += ' text-field_clickable';
}

if (withJs) {
    className += ' js-text-field';
}

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E";
let inputClassName = 'text-field__input';
if (arrowOptions) {
    inputClassName += ' text-field__input_with-arrow';
}
if (inputOptions.isMaskedDate) {
    inputClassName += ' text-field__input_masked-date js-text-field__input_masked-date'
}
if (inputOptions.withJs) {
    inputClassName += ' js-text-field__input';
}

pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cinput" + (pug.attr("class", pug.classes([inputClassName], [true]), false, true)+pug.attr("type", inputOptions.type, true, true)+pug.attr("placeholder", inputOptions.placeholder, true, true)+pug.attr("value", inputOptions.value, true, true)+pug.attr("readonly", inputOptions.isReadonly, true, true)) + "\u003E";
if ((arrowOptions)) {
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cbutton" + (" class=\"text-field__arrow\""+pug.attr("type", inputOptions.isSubmit ? 'submit' : 'button', true, true)) + "\u003E";
pug_indent.push('    ');
pug_mixins["arrow"](arrowOptions);
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fbutton\u003E";
}
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
};
pug_mixins["social-links"] = pug_interp = function(){
var block = (this && this.block), attributes = (this && this.attributes) || {};
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cul class=\"social-links\"\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"social-links__item\"\u003E\u003Ca class=\"social-links__link\" href=\"change-me\"\u003E\u003Cspan class=\"social-links__icon fab fa-twitter\"\u003E\u003C\u002Fspan\u003E\u003C\u002Fa\u003E\u003C\u002Fli\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"social-links__item\"\u003E\u003Ca class=\"social-links__link\" href=\"change-me\"\u003E\u003Cspan class=\"social-links__icon fab fa-facebook-square\"\u003E\u003C\u002Fspan\u003E\u003C\u002Fa\u003E\u003C\u002Fli\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"social-links__item\"\u003E\u003Ca class=\"social-links__link\" href=\"change-me\"\u003E\u003Cspan class=\"social-links__icon fab fa-instagram\"\u003E\u003C\u002Fspan\u003E\u003C\u002Fa\u003E\u003C\u002Fli\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Ful\u003E";
};
pug_mixins["footer"] = pug_interp = function(){
var block = (this && this.block), attributes = (this && this.attributes) || {};
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cfooter class=\"footer\"\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"footer__body\"\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"footer__main-info\"\u003E\u003Ca href=\"landing-page.html\"\u003E\u003Cimg src=\"images\u002Flogo.svg\" alt=\"logo\"\u003E\u003C\u002Fa\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cp class=\"footer__description\"\u003EБронирование номеров в лучшем отеле 2019 года по версии ассоциации «Отельные взгляды»\u003C\u002Fp\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"footer__menu\"\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"footer__nav\"\u003E\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"footer__subtitle\"\u003E";
pug_indent.push('          ');
pug_mixins["heading"]({ text: 'Навигация' });
pug_indent.pop();
pug_html = pug_html + "\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
pug_indent.push('        ');
pug_mixins["navigation"]({
                        items: [
                            { name: 'О нас' },
                            { name: 'Новости' },
                            { name: 'Служба поддержки' },
                            { name: 'Услуги' },
                        ],
                        inColumn: true,
                    });
pug_indent.pop();
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"footer__nav\"\u003E\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"footer__subtitle\"\u003E";
pug_indent.push('          ');
pug_mixins["heading"]({ text: 'О нас' });
pug_indent.pop();
pug_html = pug_html + "\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
pug_indent.push('        ');
pug_mixins["navigation"]({
                        items: [
                            { name: 'О сервисе' },
                            { name: 'Наша команда' },
                            { name: 'Вакансии' },
                            { name: 'Инвесторы' },
                        ],
                        inColumn: true,
                    });
pug_indent.pop();
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"footer__nav\"\u003E\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"footer__subtitle\"\u003E";
pug_indent.push('          ');
pug_mixins["heading"]({ text: 'Служба поддержки' });
pug_indent.pop();
pug_html = pug_html + "\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
pug_indent.push('        ');
pug_mixins["navigation"]({
                        items: [
                            { name: 'Соглашения' },
                            { name: 'Сообщества' },
                            { name: 'Связь с нами' },
                        ],
                        inColumn: true,
                    });
pug_indent.pop();
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cform class=\"footer__subscription\"\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"footer__subtitle footer__subtitle_without-margin-bottom\"\u003E";
pug_indent.push('        ');
pug_mixins["heading"]({ text: 'Подписка' });
pug_indent.pop();
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"footer__subscription-text\"\u003EПолучайте специальные предложения и новости сервиса\u003C\u002Fdiv\u003E";
pug_indent.push('      ');
pug_mixins["text-field"]({
                    inputOptions: {
                        placeholder: 'Email',
                        type: 'email',
                        isSubmit: true,
                    },
                    modifiers: {
                        isShort: true,
                    },
                    arrowOptions: {
                        type: 'forward',
                        color: 'purple-gradient',
                    },
                });
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fform\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"footer__bottom\"\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"footer__bottom-container\"\u003E\u003Cspan class=\"footer__copyright\"\u003ECopyright © 2018 Toxin отель. Все права защищены.\u003C\u002Fspan\u003E";
pug_indent.push('      ');
pug_mixins["social-links"]();
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Ffooter\u003E";
};
const title = 'Landing page';
const name = 'landing-page';
pug_html = pug_html + "\u003C!DOCTYPE html\u003E\n\u003Chtml lang=\"ru\"\u003E\n  \u003Chead\u003E\n    \u003Cmeta charset=\"utf-8\"\u003E\n    \u003Cmeta" + (" name=\"description\""+pug.attr("content", `Toxin Hotel. Room reservations. ${title}`, true, true)) + "\u003E\n    \u003Cmeta name=\"keywords\" content=\"toxin, hotel, отель, забронировать, room, комнаты, book, reservation\"\u003E\n    \u003Cmeta name=\"viewport\" content=\"initial-scale=1.0, width=device-width\"\u003E\n    \u003Clink" + (" rel=\"apple-touch-icon\" sizes=\"180x180\""+pug.attr("href", __webpack_require__(6).default, true, true)) + "\u003E\n    \u003Clink" + (" rel=\"icon\" type=\"image\u002Fpng\" sizes=\"32x32\""+pug.attr("href", __webpack_require__(8).default, true, true)) + "\u003E\n    \u003Clink" + (" rel=\"icon\" type=\"image\u002Fpng\" sizes=\"16x16\""+pug.attr("href", __webpack_require__(7).default, true, true)) + "\u003E\n    \u003Clink rel=\"manifest\" href=\".\u002Fsite.webmanifest\"\u003E\n    \u003Clink" + (" rel=\"mask-icon\""+pug.attr("href", __webpack_require__(10).default, true, true)+" color=\"#bc9cff\"") + "\u003E\n    \u003Clink" + (" rel=\"shortcut icon\""+pug.attr("href", __webpack_require__(9).default, true, true)) + "\u003E\n    \u003Cmeta name=\"msapplication-TileColor\" content=\"#603cba\"\u003E\n    \u003Cmeta name=\"msapplication-config\" content=\".\u002Fbrowserconfig.xml\"\u003E\n    \u003Cmeta name=\"theme-color\" content=\"#ffffff\"\u003E\n    \u003Ctitle\u003E" + (pug.escape(null == (pug_interp = title) ? "" : pug_interp)) + "\u003C\u002Ftitle\u003E\n  \u003C\u002Fhead\u003E\n  \u003Cbody\u003E";
pug_indent.push('    ');
pug_mixins["header"]({ activeLink });
pug_indent.pop();
pug_html = pug_html + "\n    \u003Cmain\u003E\n      \u003Cmain class=\"landing-page\"\u003E\n        \u003Cdiv class=\"container\"\u003E\n          \u003Cdiv class=\"landing-page__search-card\"\u003E";
pug_indent.push('            ');
pug_mixins["search-card"]();
pug_indent.pop();
pug_html = pug_html + "\n          \u003C\u002Fdiv\u003E\n          \u003Cp class=\"landing-page__tagline\"\u003EЛучшие номера для вашей работы, отдыха и просто вдохновения\u003C\u002Fp\u003E\n        \u003C\u002Fdiv\u003E\n      \u003C\u002Fmain\u003E\n    \u003C\u002Fmain\u003E";
pug_indent.push('    ');
pug_mixins["footer"]();
pug_indent.pop();
pug_html = pug_html + "\n  \u003C\u002Fbody\u003E\n\u003C\u002Fhtml\u003E";
    }.call(this, "Array" in locals_for_with ?
        locals_for_with.Array :
        typeof Array !== 'undefined' ? Array : undefined, "JSON" in locals_for_with ?
        locals_for_with.JSON :
        typeof JSON !== 'undefined' ? JSON : undefined, "activeLink" in locals_for_with ?
        locals_for_with.activeLink :
        typeof activeLink !== 'undefined' ? activeLink : undefined, "pug_indent" in locals_for_with ?
        locals_for_with.pug_indent :
        typeof pug_indent !== 'undefined' ? pug_indent : undefined));
    ;;return pug_html;};
module.exports = template;

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(2);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;
    var locals_for_with = (locals || {});
    
    (function (activeLink, pug_indent) {
      var pug_indent = [];
pug_mixins["heading"] = pug_interp = function({ text = '', type = 'h3', color, withJs = false }){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'heading';
let tag;

switch (type) {
    case 'h3':
        className += ' heading_type_h3';
        tag = 'h3';
        break;
    case 'h2':
        className += ' heading_type_h2';
        tag = 'h2';
        break;
    case 'inline':
        className += ' heading_type_h3';
        tag = 'span';
        break;
    default:
        tag = 'h1';
        break;
}
switch (color) {
    case 'white':
        className += ' heading_color_white';
        break;
    case 'purple':
        className += ' heading_color_purple';
        break;
    case 'gray':
        className += ' heading_color_gray';
        break;
    case 'inherit':
        className += ' heading_color_inherit';
        break;
    default:
        break;
}
if (withJs) {
  className += ' js-heading';
}

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C" + (tag) + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = text) ? "" : pug_interp)) + "\u003C\u002F" + (tag) + "\u003E";
};
pug_mixins["arrow"] = pug_interp = function({ type, color, withoutPadding = false } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'arrow';
let iconName = 'expand_more';

switch (type) {
    case 'expand-less':
        iconName = 'expand_less';
        break;
    case 'forward':
        iconName = 'arrow_forward';
        break;
    default:
        break;
}

switch (color) {
    case 'white':
        className += ' arrow_color_white';
        break;
    case 'purple-gradient':
        className += ' arrow_color_purple-gradient';
        break;
    default:
        break;
}

if (withoutPadding) {
    className += ' arrow_without-padding';
}

pug_html = pug_html + "\u003Cspan" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = iconName) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
};
pug_mixins["heading"] = pug_interp = function({ text = '', type = 'h3', color, withJs = false }){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'heading';
let tag;

switch (type) {
    case 'h3':
        className += ' heading_type_h3';
        tag = 'h3';
        break;
    case 'h2':
        className += ' heading_type_h2';
        tag = 'h2';
        break;
    case 'inline':
        className += ' heading_type_h3';
        tag = 'span';
        break;
    default:
        tag = 'h1';
        break;
}
switch (color) {
    case 'white':
        className += ' heading_color_white';
        break;
    case 'purple':
        className += ' heading_color_purple';
        break;
    case 'gray':
        className += ' heading_color_gray';
        break;
    case 'inherit':
        className += ' heading_color_inherit';
        break;
    default:
        break;
}
if (withJs) {
  className += ' js-heading';
}

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C" + (tag) + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = text) ? "" : pug_interp)) + "\u003C\u002F" + (tag) + "\u003E";
};
pug_mixins["button"] = pug_interp = function(options = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
const {
    text = 'click me',
    hasLink = false,
    isSubmit = false,
    link = 'change-me',
    modifiers = {},
    withJs = false,
} = options;

let className = 'button';
let headingOptions = {
    text,
    type: 'inline',
    color: 'white',
};

if (hasLink) {
    headingOptions.type = 'h3';
}

if (modifiers.isSecondary) {
    className += ' button_secondary';
    headingOptions.color = 'purple';
}
if (modifiers.withoutFrame) {
    headingOptions.color = 'inherit';
    className += ' button_without-frame';
}
if (modifiers.isLong) {
    className += ' button_long';
}
if (modifiers.isHovered) {
    className += ' button_hovered';
}
if (modifiers.isNarrow) {
    className += ' button_narrow';
}
if (modifiers.isWide) {
    className += ' button_wide';
}
if (withJs) {
  className += ' js-button';
}

switch (modifiers.textColor) {
    case 'white':
        headingOptions.color = 'white';
        break;
    case 'purple':
        headingOptions.color = 'purple';
        break;
    case 'gray':
        headingOptions.color = 'gray';
        break;
    default:
        break;
}

if ((hasLink)) {
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E\u003Ca" + (" class=\"button__text\""+pug.attr("href", link, true, true)) + "\u003E";
pug_indent.push('    ');
pug_mixins["heading"](headingOptions);
pug_indent.pop();
pug_html = pug_html + "\u003C\u002Fa\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"button__arrow\"\u003E";
pug_indent.push('    ');
pug_mixins["arrow"]({
                  type: 'forward',
                  color: 'white',
                });
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
else {
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cbutton" + (pug.attr("class", pug.classes([className], [true]), false, true)+pug.attr("type", isSubmit ? 'submit' : 'button', true, true)) + "\u003E\u003Cspan class=\"button__text\"\u003E";
pug_indent.push('    ');
pug_mixins["heading"](headingOptions);
pug_indent.pop();
pug_html = pug_html + "\u003C\u002Fspan\u003E\u003Cspan class=\"button__arrow\"\u003E";
pug_indent.push('    ');
pug_mixins["arrow"]({
                    type: 'forward',
                    color: 'white',
                });
pug_indent.pop();
pug_html = pug_html + "\u003C\u002Fspan\u003E\u003C\u002Fbutton\u003E";
}
};
pug_mixins["arrow"] = pug_interp = function({ type, color, withoutPadding = false } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'arrow';
let iconName = 'expand_more';

switch (type) {
    case 'expand-less':
        iconName = 'expand_less';
        break;
    case 'forward':
        iconName = 'arrow_forward';
        break;
    default:
        break;
}

switch (color) {
    case 'white':
        className += ' arrow_color_white';
        break;
    case 'purple-gradient':
        className += ' arrow_color_purple-gradient';
        break;
    default:
        break;
}

if (withoutPadding) {
    className += ' arrow_without-padding';
}

pug_html = pug_html + "\u003Cspan" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = iconName) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
};
pug_mixins["text-field"] = pug_interp = function({ inputOptions = {}, arrowOptions, modifiers = {}, withJs = false } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'text-field';

if (modifiers.isFocused) {
    className += ' text-field_focused';
}
if (modifiers.isShort) {
    className += ' text-field_short';
}
if (modifiers.isBottomFlat) {
    className += ' text-field_flat-bottom';
}
if (modifiers.isClickable) {
    className += ' text-field_clickable';
}

if (withJs) {
    className += ' js-text-field';
}

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E";
let inputClassName = 'text-field__input';
if (arrowOptions) {
    inputClassName += ' text-field__input_with-arrow';
}
if (inputOptions.isMaskedDate) {
    inputClassName += ' text-field__input_masked-date js-text-field__input_masked-date'
}
if (inputOptions.withJs) {
    inputClassName += ' js-text-field__input';
}

pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cinput" + (pug.attr("class", pug.classes([inputClassName], [true]), false, true)+pug.attr("type", inputOptions.type, true, true)+pug.attr("placeholder", inputOptions.placeholder, true, true)+pug.attr("value", inputOptions.value, true, true)+pug.attr("readonly", inputOptions.isReadonly, true, true)) + "\u003E";
if ((arrowOptions)) {
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cbutton" + (" class=\"text-field__arrow\""+pug.attr("type", inputOptions.isSubmit ? 'submit' : 'button', true, true)) + "\u003E";
pug_indent.push('    ');
pug_mixins["arrow"](arrowOptions);
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fbutton\u003E";
}
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
};
pug_mixins["signin-card"] = pug_interp = function(){
var block = (this && this.block), attributes = (this && this.attributes) || {};
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cform class=\"signin-card\"\u003E";
pug_indent.push('  ');
pug_mixins["heading"]({
            type: 'h1',
            text: 'Войти',
        });
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"signin-card__email\"\u003E";
pug_indent.push('    ');
pug_mixins["text-field"]({
                inputOptions: {
                    placeholder: 'Email',
                    type: 'email',
                },
            });
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"signin-card__password\"\u003E";
pug_indent.push('    ');
pug_mixins["text-field"]({
                inputOptions: {
                    type: 'password',
                    placeholder: 'Пароль',
                },
            });
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
pug_indent.push('  ');
pug_mixins["button"]({
            text: 'Войти',
            hasLink: true,
            link: 'landing-page.html',
            modifiers: {
                isLong: true,
                textColor: 'white',
            },
        });
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"signin-card__account-not-exists js-signin-card__account-not-exists\"\u003E\u003Cspan\u003EНет аккаунта на Toxin?\u003C\u002Fspan\u003E";
pug_indent.push('    ');
pug_mixins["button"]({
                text: 'Создать',
                hasLink: true,
                link: 'registration.html',
                modifiers: {
                    isSecondary: true,
                },
            });
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fform\u003E";
};
pug_mixins["arrow"] = pug_interp = function({ type, color, withoutPadding = false } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'arrow';
let iconName = 'expand_more';

switch (type) {
    case 'expand-less':
        iconName = 'expand_less';
        break;
    case 'forward':
        iconName = 'arrow_forward';
        break;
    default:
        break;
}

switch (color) {
    case 'white':
        className += ' arrow_color_white';
        break;
    case 'purple-gradient':
        className += ' arrow_color_purple-gradient';
        break;
    default:
        break;
}

if (withoutPadding) {
    className += ' arrow_without-padding';
}

pug_html = pug_html + "\u003Cspan" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = iconName) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
};
pug_mixins["heading"] = pug_interp = function({ text = '', type = 'h3', color, withJs = false }){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'heading';
let tag;

switch (type) {
    case 'h3':
        className += ' heading_type_h3';
        tag = 'h3';
        break;
    case 'h2':
        className += ' heading_type_h2';
        tag = 'h2';
        break;
    case 'inline':
        className += ' heading_type_h3';
        tag = 'span';
        break;
    default:
        tag = 'h1';
        break;
}
switch (color) {
    case 'white':
        className += ' heading_color_white';
        break;
    case 'purple':
        className += ' heading_color_purple';
        break;
    case 'gray':
        className += ' heading_color_gray';
        break;
    case 'inherit':
        className += ' heading_color_inherit';
        break;
    default:
        break;
}
if (withJs) {
  className += ' js-heading';
}

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C" + (tag) + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = text) ? "" : pug_interp)) + "\u003C\u002F" + (tag) + "\u003E";
};
pug_mixins["button"] = pug_interp = function(options = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
const {
    text = 'click me',
    hasLink = false,
    isSubmit = false,
    link = 'change-me',
    modifiers = {},
    withJs = false,
} = options;

let className = 'button';
let headingOptions = {
    text,
    type: 'inline',
    color: 'white',
};

if (hasLink) {
    headingOptions.type = 'h3';
}

if (modifiers.isSecondary) {
    className += ' button_secondary';
    headingOptions.color = 'purple';
}
if (modifiers.withoutFrame) {
    headingOptions.color = 'inherit';
    className += ' button_without-frame';
}
if (modifiers.isLong) {
    className += ' button_long';
}
if (modifiers.isHovered) {
    className += ' button_hovered';
}
if (modifiers.isNarrow) {
    className += ' button_narrow';
}
if (modifiers.isWide) {
    className += ' button_wide';
}
if (withJs) {
  className += ' js-button';
}

switch (modifiers.textColor) {
    case 'white':
        headingOptions.color = 'white';
        break;
    case 'purple':
        headingOptions.color = 'purple';
        break;
    case 'gray':
        headingOptions.color = 'gray';
        break;
    default:
        break;
}

if ((hasLink)) {
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E\u003Ca" + (" class=\"button__text\""+pug.attr("href", link, true, true)) + "\u003E";
pug_indent.push('    ');
pug_mixins["heading"](headingOptions);
pug_indent.pop();
pug_html = pug_html + "\u003C\u002Fa\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"button__arrow\"\u003E";
pug_indent.push('    ');
pug_mixins["arrow"]({
                  type: 'forward',
                  color: 'white',
                });
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
else {
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cbutton" + (pug.attr("class", pug.classes([className], [true]), false, true)+pug.attr("type", isSubmit ? 'submit' : 'button', true, true)) + "\u003E\u003Cspan class=\"button__text\"\u003E";
pug_indent.push('    ');
pug_mixins["heading"](headingOptions);
pug_indent.pop();
pug_html = pug_html + "\u003C\u002Fspan\u003E\u003Cspan class=\"button__arrow\"\u003E";
pug_indent.push('    ');
pug_mixins["arrow"]({
                    type: 'forward',
                    color: 'white',
                });
pug_indent.pop();
pug_html = pug_html + "\u003C\u002Fspan\u003E\u003C\u002Fbutton\u003E";
}
};
pug_mixins["arrow"] = pug_interp = function({ type, color, withoutPadding = false } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'arrow';
let iconName = 'expand_more';

switch (type) {
    case 'expand-less':
        iconName = 'expand_less';
        break;
    case 'forward':
        iconName = 'arrow_forward';
        break;
    default:
        break;
}

switch (color) {
    case 'white':
        className += ' arrow_color_white';
        break;
    case 'purple-gradient':
        className += ' arrow_color_purple-gradient';
        break;
    default:
        break;
}

if (withoutPadding) {
    className += ' arrow_without-padding';
}

pug_html = pug_html + "\u003Cspan" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = iconName) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
};
pug_mixins["navigation"] = pug_interp = function({ items, activeLinkIndex, inColumn = false, withJs = false }){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'navigation';
if (inColumn) {
    className += ' navigation_in-column';
}
if (withJs) {
    className += ' js-navigation';
}
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cnav" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cul class=\"navigation__list\"\u003E";
// iterate items
;(function(){
  var $$obj = items;
  if ('number' == typeof $$obj.length) {
      for (var itemIndex = 0, $$l = $$obj.length; itemIndex < $$l; itemIndex++) {
        var item = $$obj[itemIndex];
const link = item.link || 'change-me';

let itemClassName = 'navigation__item';
if (item.isActive) {
    itemClassName += ' navigation__item_active';
}

pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli" + (pug.attr("class", pug.classes([itemClassName], [true]), false, true)) + "\u003E";
if ((item.subitems)) {
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + ("\u003Cbutton class=\"navigation__link\"\u003E" + (pug.escape(null == (pug_interp = item.name) ? "" : pug_interp)));
pug_indent.push('        ');
pug_mixins["arrow"]({ withoutPadding: true });
pug_indent.pop();
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fbutton\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cul class=\"navigation__subitems\"\u003E";
// iterate item.subitems
;(function(){
  var $$obj = item.subitems;
  if ('number' == typeof $$obj.length) {
      for (var pug_index1 = 0, $$l = $$obj.length; pug_index1 < $$l; pug_index1++) {
        var subitem = $$obj[pug_index1];
pug_html = pug_html + "\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"navigation__subitem\"\u003E\u003Ca" + (" class=\"navigation__link\""+pug.attr("href", subitem.link || 'change-me', true, true)) + "\u003E" + (pug.escape(null == (pug_interp = subitem.name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index1 in $$obj) {
      $$l++;
      var subitem = $$obj[pug_index1];
pug_html = pug_html + "\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"navigation__subitem\"\u003E\u003Ca" + (" class=\"navigation__link\""+pug.attr("href", subitem.link || 'change-me', true, true)) + "\u003E" + (pug.escape(null == (pug_interp = subitem.name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Ful\u003E";
}
else {
pug_html = pug_html + "\u003Ca" + (" class=\"navigation__link\""+pug.attr("href", link, true, true)) + "\u003E" + (pug.escape(null == (pug_interp = item.name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E";
}
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var itemIndex in $$obj) {
      $$l++;
      var item = $$obj[itemIndex];
const link = item.link || 'change-me';

let itemClassName = 'navigation__item';
if (item.isActive) {
    itemClassName += ' navigation__item_active';
}

pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli" + (pug.attr("class", pug.classes([itemClassName], [true]), false, true)) + "\u003E";
if ((item.subitems)) {
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + ("\u003Cbutton class=\"navigation__link\"\u003E" + (pug.escape(null == (pug_interp = item.name) ? "" : pug_interp)));
pug_indent.push('        ');
pug_mixins["arrow"]({ withoutPadding: true });
pug_indent.pop();
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fbutton\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cul class=\"navigation__subitems\"\u003E";
// iterate item.subitems
;(function(){
  var $$obj = item.subitems;
  if ('number' == typeof $$obj.length) {
      for (var pug_index2 = 0, $$l = $$obj.length; pug_index2 < $$l; pug_index2++) {
        var subitem = $$obj[pug_index2];
pug_html = pug_html + "\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"navigation__subitem\"\u003E\u003Ca" + (" class=\"navigation__link\""+pug.attr("href", subitem.link || 'change-me', true, true)) + "\u003E" + (pug.escape(null == (pug_interp = subitem.name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index2 in $$obj) {
      $$l++;
      var subitem = $$obj[pug_index2];
pug_html = pug_html + "\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"navigation__subitem\"\u003E\u003Ca" + (" class=\"navigation__link\""+pug.attr("href", subitem.link || 'change-me', true, true)) + "\u003E" + (pug.escape(null == (pug_interp = subitem.name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Ful\u003E";
}
else {
pug_html = pug_html + "\u003Ca" + (" class=\"navigation__link\""+pug.attr("href", link, true, true)) + "\u003E" + (pug.escape(null == (pug_interp = item.name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E";
}
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Ful\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fnav\u003E";
};
pug_mixins["header"] = pug_interp = function({ userName, activeLink } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cheader class=\"header js-header\"\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"header__container\"\u003E\u003Ca class=\"header__logo\" href=\"landing-page.html\"\u003E\u003Cimg src=\"images\u002Flogo.svg\" alt=\"logo\"\u003E\u003C\u002Fa\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"header__menu js-header__menu\"\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"header__nav-container\"\u003E";
pug_indent.push('        ');
pug_mixins["navigation"]({
                        activeLinkIndex: activeLink,
                        items: [
                            {
                                name: 'О нас',
                            },
                            {
                                name: 'Услуги',
                                subitems: [{ name: 'Заказ комнаты' }],
                            },
                            {
                                name: 'Вакансии',
                            },
                            {
                                name: 'Новости',
                            },
                            {
                                name: 'Соглашения',
                                subitems: [
                                    { name: 'Правила' },
                                    { name: 'Конфиденциальность' },
                                ],
                            },
                        ].map((item, index) => ({ ...item, isActive: activeLink === index })),
                        withJs: true,
                    });
pug_indent.pop();
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
if (userName) {
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"header__user\"\u003E" + (pug.escape(null == (pug_interp = userName) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E";
}
else {
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"header__buttons\"\u003E";
pug_indent.push('        ');
pug_mixins["button"]({
                            text: 'Войти',
                            hasLink: true,
                            link: 'login.html',
                            modifiers: {
                                isSecondary: true,
                                isNarrow: true,
                            },
                        });
pug_indent.pop();
pug_indent.push('        ');
pug_mixins["button"]({
                            text: 'Зарегистрироваться',
                            hasLink: true,
                            link: 'registration.html',
                            modifiers: {
                              isNarrow: true,
                            },
                        });
pug_indent.pop();
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cbutton class=\"header__hamburger js-header__hamburger\"\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"header__hamburger-icon\"\u003E\u003C\u002Fdiv\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fbutton\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fheader\u003E";
};
pug_mixins["arrow"] = pug_interp = function({ type, color, withoutPadding = false } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'arrow';
let iconName = 'expand_more';

switch (type) {
    case 'expand-less':
        iconName = 'expand_less';
        break;
    case 'forward':
        iconName = 'arrow_forward';
        break;
    default:
        break;
}

switch (color) {
    case 'white':
        className += ' arrow_color_white';
        break;
    case 'purple-gradient':
        className += ' arrow_color_purple-gradient';
        break;
    default:
        break;
}

if (withoutPadding) {
    className += ' arrow_without-padding';
}

pug_html = pug_html + "\u003Cspan" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = iconName) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
};
pug_mixins["navigation"] = pug_interp = function({ items, activeLinkIndex, inColumn = false, withJs = false }){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'navigation';
if (inColumn) {
    className += ' navigation_in-column';
}
if (withJs) {
    className += ' js-navigation';
}
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cnav" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cul class=\"navigation__list\"\u003E";
// iterate items
;(function(){
  var $$obj = items;
  if ('number' == typeof $$obj.length) {
      for (var itemIndex = 0, $$l = $$obj.length; itemIndex < $$l; itemIndex++) {
        var item = $$obj[itemIndex];
const link = item.link || 'change-me';

let itemClassName = 'navigation__item';
if (item.isActive) {
    itemClassName += ' navigation__item_active';
}

pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli" + (pug.attr("class", pug.classes([itemClassName], [true]), false, true)) + "\u003E";
if ((item.subitems)) {
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + ("\u003Cbutton class=\"navigation__link\"\u003E" + (pug.escape(null == (pug_interp = item.name) ? "" : pug_interp)));
pug_indent.push('        ');
pug_mixins["arrow"]({ withoutPadding: true });
pug_indent.pop();
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fbutton\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cul class=\"navigation__subitems\"\u003E";
// iterate item.subitems
;(function(){
  var $$obj = item.subitems;
  if ('number' == typeof $$obj.length) {
      for (var pug_index4 = 0, $$l = $$obj.length; pug_index4 < $$l; pug_index4++) {
        var subitem = $$obj[pug_index4];
pug_html = pug_html + "\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"navigation__subitem\"\u003E\u003Ca" + (" class=\"navigation__link\""+pug.attr("href", subitem.link || 'change-me', true, true)) + "\u003E" + (pug.escape(null == (pug_interp = subitem.name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index4 in $$obj) {
      $$l++;
      var subitem = $$obj[pug_index4];
pug_html = pug_html + "\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"navigation__subitem\"\u003E\u003Ca" + (" class=\"navigation__link\""+pug.attr("href", subitem.link || 'change-me', true, true)) + "\u003E" + (pug.escape(null == (pug_interp = subitem.name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Ful\u003E";
}
else {
pug_html = pug_html + "\u003Ca" + (" class=\"navigation__link\""+pug.attr("href", link, true, true)) + "\u003E" + (pug.escape(null == (pug_interp = item.name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E";
}
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var itemIndex in $$obj) {
      $$l++;
      var item = $$obj[itemIndex];
const link = item.link || 'change-me';

let itemClassName = 'navigation__item';
if (item.isActive) {
    itemClassName += ' navigation__item_active';
}

pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli" + (pug.attr("class", pug.classes([itemClassName], [true]), false, true)) + "\u003E";
if ((item.subitems)) {
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + ("\u003Cbutton class=\"navigation__link\"\u003E" + (pug.escape(null == (pug_interp = item.name) ? "" : pug_interp)));
pug_indent.push('        ');
pug_mixins["arrow"]({ withoutPadding: true });
pug_indent.pop();
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fbutton\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cul class=\"navigation__subitems\"\u003E";
// iterate item.subitems
;(function(){
  var $$obj = item.subitems;
  if ('number' == typeof $$obj.length) {
      for (var pug_index5 = 0, $$l = $$obj.length; pug_index5 < $$l; pug_index5++) {
        var subitem = $$obj[pug_index5];
pug_html = pug_html + "\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"navigation__subitem\"\u003E\u003Ca" + (" class=\"navigation__link\""+pug.attr("href", subitem.link || 'change-me', true, true)) + "\u003E" + (pug.escape(null == (pug_interp = subitem.name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index5 in $$obj) {
      $$l++;
      var subitem = $$obj[pug_index5];
pug_html = pug_html + "\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"navigation__subitem\"\u003E\u003Ca" + (" class=\"navigation__link\""+pug.attr("href", subitem.link || 'change-me', true, true)) + "\u003E" + (pug.escape(null == (pug_interp = subitem.name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Ful\u003E";
}
else {
pug_html = pug_html + "\u003Ca" + (" class=\"navigation__link\""+pug.attr("href", link, true, true)) + "\u003E" + (pug.escape(null == (pug_interp = item.name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E";
}
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Ful\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fnav\u003E";
};
pug_mixins["heading"] = pug_interp = function({ text = '', type = 'h3', color, withJs = false }){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'heading';
let tag;

switch (type) {
    case 'h3':
        className += ' heading_type_h3';
        tag = 'h3';
        break;
    case 'h2':
        className += ' heading_type_h2';
        tag = 'h2';
        break;
    case 'inline':
        className += ' heading_type_h3';
        tag = 'span';
        break;
    default:
        tag = 'h1';
        break;
}
switch (color) {
    case 'white':
        className += ' heading_color_white';
        break;
    case 'purple':
        className += ' heading_color_purple';
        break;
    case 'gray':
        className += ' heading_color_gray';
        break;
    case 'inherit':
        className += ' heading_color_inherit';
        break;
    default:
        break;
}
if (withJs) {
  className += ' js-heading';
}

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C" + (tag) + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = text) ? "" : pug_interp)) + "\u003C\u002F" + (tag) + "\u003E";
};
pug_mixins["arrow"] = pug_interp = function({ type, color, withoutPadding = false } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'arrow';
let iconName = 'expand_more';

switch (type) {
    case 'expand-less':
        iconName = 'expand_less';
        break;
    case 'forward':
        iconName = 'arrow_forward';
        break;
    default:
        break;
}

switch (color) {
    case 'white':
        className += ' arrow_color_white';
        break;
    case 'purple-gradient':
        className += ' arrow_color_purple-gradient';
        break;
    default:
        break;
}

if (withoutPadding) {
    className += ' arrow_without-padding';
}

pug_html = pug_html + "\u003Cspan" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = iconName) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
};
pug_mixins["text-field"] = pug_interp = function({ inputOptions = {}, arrowOptions, modifiers = {}, withJs = false } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'text-field';

if (modifiers.isFocused) {
    className += ' text-field_focused';
}
if (modifiers.isShort) {
    className += ' text-field_short';
}
if (modifiers.isBottomFlat) {
    className += ' text-field_flat-bottom';
}
if (modifiers.isClickable) {
    className += ' text-field_clickable';
}

if (withJs) {
    className += ' js-text-field';
}

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E";
let inputClassName = 'text-field__input';
if (arrowOptions) {
    inputClassName += ' text-field__input_with-arrow';
}
if (inputOptions.isMaskedDate) {
    inputClassName += ' text-field__input_masked-date js-text-field__input_masked-date'
}
if (inputOptions.withJs) {
    inputClassName += ' js-text-field__input';
}

pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cinput" + (pug.attr("class", pug.classes([inputClassName], [true]), false, true)+pug.attr("type", inputOptions.type, true, true)+pug.attr("placeholder", inputOptions.placeholder, true, true)+pug.attr("value", inputOptions.value, true, true)+pug.attr("readonly", inputOptions.isReadonly, true, true)) + "\u003E";
if ((arrowOptions)) {
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cbutton" + (" class=\"text-field__arrow\""+pug.attr("type", inputOptions.isSubmit ? 'submit' : 'button', true, true)) + "\u003E";
pug_indent.push('    ');
pug_mixins["arrow"](arrowOptions);
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fbutton\u003E";
}
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
};
pug_mixins["social-links"] = pug_interp = function(){
var block = (this && this.block), attributes = (this && this.attributes) || {};
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cul class=\"social-links\"\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"social-links__item\"\u003E\u003Ca class=\"social-links__link\" href=\"change-me\"\u003E\u003Cspan class=\"social-links__icon fab fa-twitter\"\u003E\u003C\u002Fspan\u003E\u003C\u002Fa\u003E\u003C\u002Fli\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"social-links__item\"\u003E\u003Ca class=\"social-links__link\" href=\"change-me\"\u003E\u003Cspan class=\"social-links__icon fab fa-facebook-square\"\u003E\u003C\u002Fspan\u003E\u003C\u002Fa\u003E\u003C\u002Fli\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"social-links__item\"\u003E\u003Ca class=\"social-links__link\" href=\"change-me\"\u003E\u003Cspan class=\"social-links__icon fab fa-instagram\"\u003E\u003C\u002Fspan\u003E\u003C\u002Fa\u003E\u003C\u002Fli\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Ful\u003E";
};
pug_mixins["footer"] = pug_interp = function(){
var block = (this && this.block), attributes = (this && this.attributes) || {};
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cfooter class=\"footer\"\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"footer__body\"\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"footer__main-info\"\u003E\u003Ca href=\"landing-page.html\"\u003E\u003Cimg src=\"images\u002Flogo.svg\" alt=\"logo\"\u003E\u003C\u002Fa\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cp class=\"footer__description\"\u003EБронирование номеров в лучшем отеле 2019 года по версии ассоциации «Отельные взгляды»\u003C\u002Fp\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"footer__menu\"\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"footer__nav\"\u003E\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"footer__subtitle\"\u003E";
pug_indent.push('          ');
pug_mixins["heading"]({ text: 'Навигация' });
pug_indent.pop();
pug_html = pug_html + "\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
pug_indent.push('        ');
pug_mixins["navigation"]({
                        items: [
                            { name: 'О нас' },
                            { name: 'Новости' },
                            { name: 'Служба поддержки' },
                            { name: 'Услуги' },
                        ],
                        inColumn: true,
                    });
pug_indent.pop();
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"footer__nav\"\u003E\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"footer__subtitle\"\u003E";
pug_indent.push('          ');
pug_mixins["heading"]({ text: 'О нас' });
pug_indent.pop();
pug_html = pug_html + "\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
pug_indent.push('        ');
pug_mixins["navigation"]({
                        items: [
                            { name: 'О сервисе' },
                            { name: 'Наша команда' },
                            { name: 'Вакансии' },
                            { name: 'Инвесторы' },
                        ],
                        inColumn: true,
                    });
pug_indent.pop();
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"footer__nav\"\u003E\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"footer__subtitle\"\u003E";
pug_indent.push('          ');
pug_mixins["heading"]({ text: 'Служба поддержки' });
pug_indent.pop();
pug_html = pug_html + "\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
pug_indent.push('        ');
pug_mixins["navigation"]({
                        items: [
                            { name: 'Соглашения' },
                            { name: 'Сообщества' },
                            { name: 'Связь с нами' },
                        ],
                        inColumn: true,
                    });
pug_indent.pop();
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cform class=\"footer__subscription\"\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"footer__subtitle footer__subtitle_without-margin-bottom\"\u003E";
pug_indent.push('        ');
pug_mixins["heading"]({ text: 'Подписка' });
pug_indent.pop();
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"footer__subscription-text\"\u003EПолучайте специальные предложения и новости сервиса\u003C\u002Fdiv\u003E";
pug_indent.push('      ');
pug_mixins["text-field"]({
                    inputOptions: {
                        placeholder: 'Email',
                        type: 'email',
                        isSubmit: true,
                    },
                    modifiers: {
                        isShort: true,
                    },
                    arrowOptions: {
                        type: 'forward',
                        color: 'purple-gradient',
                    },
                });
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fform\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"footer__bottom\"\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"footer__bottom-container\"\u003E\u003Cspan class=\"footer__copyright\"\u003ECopyright © 2018 Toxin отель. Все права защищены.\u003C\u002Fspan\u003E";
pug_indent.push('      ');
pug_mixins["social-links"]();
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Ffooter\u003E";
};
const title = 'Login';
const name = 'login';
pug_html = pug_html + "\u003C!DOCTYPE html\u003E\n\u003Chtml lang=\"ru\"\u003E\n  \u003Chead\u003E\n    \u003Cmeta charset=\"utf-8\"\u003E\n    \u003Cmeta" + (" name=\"description\""+pug.attr("content", `Toxin Hotel. Room reservations. ${title}`, true, true)) + "\u003E\n    \u003Cmeta name=\"keywords\" content=\"toxin, hotel, отель, забронировать, room, комнаты, book, reservation\"\u003E\n    \u003Cmeta name=\"viewport\" content=\"initial-scale=1.0, width=device-width\"\u003E\n    \u003Clink" + (" rel=\"apple-touch-icon\" sizes=\"180x180\""+pug.attr("href", __webpack_require__(6).default, true, true)) + "\u003E\n    \u003Clink" + (" rel=\"icon\" type=\"image\u002Fpng\" sizes=\"32x32\""+pug.attr("href", __webpack_require__(8).default, true, true)) + "\u003E\n    \u003Clink" + (" rel=\"icon\" type=\"image\u002Fpng\" sizes=\"16x16\""+pug.attr("href", __webpack_require__(7).default, true, true)) + "\u003E\n    \u003Clink rel=\"manifest\" href=\".\u002Fsite.webmanifest\"\u003E\n    \u003Clink" + (" rel=\"mask-icon\""+pug.attr("href", __webpack_require__(10).default, true, true)+" color=\"#bc9cff\"") + "\u003E\n    \u003Clink" + (" rel=\"shortcut icon\""+pug.attr("href", __webpack_require__(9).default, true, true)) + "\u003E\n    \u003Cmeta name=\"msapplication-TileColor\" content=\"#603cba\"\u003E\n    \u003Cmeta name=\"msapplication-config\" content=\".\u002Fbrowserconfig.xml\"\u003E\n    \u003Cmeta name=\"theme-color\" content=\"#ffffff\"\u003E\n    \u003Ctitle\u003E" + (pug.escape(null == (pug_interp = title) ? "" : pug_interp)) + "\u003C\u002Ftitle\u003E\n  \u003C\u002Fhead\u003E\n  \u003Cbody\u003E";
pug_indent.push('    ');
pug_mixins["header"]({ activeLink });
pug_indent.pop();
pug_html = pug_html + "\n    \u003Cmain\u003E\n      \u003Cmain class=\"login\"\u003E\n        \u003Cdiv class=\"login__card\"\u003E";
pug_indent.push('          ');
pug_mixins["signin-card"]();
pug_indent.pop();
pug_html = pug_html + "\n        \u003C\u002Fdiv\u003E\n      \u003C\u002Fmain\u003E\n    \u003C\u002Fmain\u003E";
pug_indent.push('    ');
pug_mixins["footer"]();
pug_indent.pop();
pug_html = pug_html + "\n  \u003C\u002Fbody\u003E\n\u003C\u002Fhtml\u003E";
    }.call(this, "activeLink" in locals_for_with ?
        locals_for_with.activeLink :
        typeof activeLink !== 'undefined' ? activeLink : undefined, "pug_indent" in locals_for_with ?
        locals_for_with.pug_indent :
        typeof pug_indent !== 'undefined' ? pug_indent : undefined));
    ;;return pug_html;};
module.exports = template;

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(2);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;
    var locals_for_with = (locals || {});
    
    (function (activeLink, pug_indent) {
      var pug_indent = [];
pug_mixins["heading"] = pug_interp = function({ text = '', type = 'h3', color, withJs = false }){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'heading';
let tag;

switch (type) {
    case 'h3':
        className += ' heading_type_h3';
        tag = 'h3';
        break;
    case 'h2':
        className += ' heading_type_h2';
        tag = 'h2';
        break;
    case 'inline':
        className += ' heading_type_h3';
        tag = 'span';
        break;
    default:
        tag = 'h1';
        break;
}
switch (color) {
    case 'white':
        className += ' heading_color_white';
        break;
    case 'purple':
        className += ' heading_color_purple';
        break;
    case 'gray':
        className += ' heading_color_gray';
        break;
    case 'inherit':
        className += ' heading_color_inherit';
        break;
    default:
        break;
}
if (withJs) {
  className += ' js-heading';
}

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C" + (tag) + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = text) ? "" : pug_interp)) + "\u003C\u002F" + (tag) + "\u003E";
};
pug_mixins["arrow"] = pug_interp = function({ type, color, withoutPadding = false } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'arrow';
let iconName = 'expand_more';

switch (type) {
    case 'expand-less':
        iconName = 'expand_less';
        break;
    case 'forward':
        iconName = 'arrow_forward';
        break;
    default:
        break;
}

switch (color) {
    case 'white':
        className += ' arrow_color_white';
        break;
    case 'purple-gradient':
        className += ' arrow_color_purple-gradient';
        break;
    default:
        break;
}

if (withoutPadding) {
    className += ' arrow_without-padding';
}

pug_html = pug_html + "\u003Cspan" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = iconName) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
};
pug_mixins["heading"] = pug_interp = function({ text = '', type = 'h3', color, withJs = false }){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'heading';
let tag;

switch (type) {
    case 'h3':
        className += ' heading_type_h3';
        tag = 'h3';
        break;
    case 'h2':
        className += ' heading_type_h2';
        tag = 'h2';
        break;
    case 'inline':
        className += ' heading_type_h3';
        tag = 'span';
        break;
    default:
        tag = 'h1';
        break;
}
switch (color) {
    case 'white':
        className += ' heading_color_white';
        break;
    case 'purple':
        className += ' heading_color_purple';
        break;
    case 'gray':
        className += ' heading_color_gray';
        break;
    case 'inherit':
        className += ' heading_color_inherit';
        break;
    default:
        break;
}
if (withJs) {
  className += ' js-heading';
}

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C" + (tag) + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = text) ? "" : pug_interp)) + "\u003C\u002F" + (tag) + "\u003E";
};
pug_mixins["button"] = pug_interp = function(options = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
const {
    text = 'click me',
    hasLink = false,
    isSubmit = false,
    link = 'change-me',
    modifiers = {},
    withJs = false,
} = options;

let className = 'button';
let headingOptions = {
    text,
    type: 'inline',
    color: 'white',
};

if (hasLink) {
    headingOptions.type = 'h3';
}

if (modifiers.isSecondary) {
    className += ' button_secondary';
    headingOptions.color = 'purple';
}
if (modifiers.withoutFrame) {
    headingOptions.color = 'inherit';
    className += ' button_without-frame';
}
if (modifiers.isLong) {
    className += ' button_long';
}
if (modifiers.isHovered) {
    className += ' button_hovered';
}
if (modifiers.isNarrow) {
    className += ' button_narrow';
}
if (modifiers.isWide) {
    className += ' button_wide';
}
if (withJs) {
  className += ' js-button';
}

switch (modifiers.textColor) {
    case 'white':
        headingOptions.color = 'white';
        break;
    case 'purple':
        headingOptions.color = 'purple';
        break;
    case 'gray':
        headingOptions.color = 'gray';
        break;
    default:
        break;
}

if ((hasLink)) {
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E\u003Ca" + (" class=\"button__text\""+pug.attr("href", link, true, true)) + "\u003E";
pug_indent.push('    ');
pug_mixins["heading"](headingOptions);
pug_indent.pop();
pug_html = pug_html + "\u003C\u002Fa\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"button__arrow\"\u003E";
pug_indent.push('    ');
pug_mixins["arrow"]({
                  type: 'forward',
                  color: 'white',
                });
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
else {
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cbutton" + (pug.attr("class", pug.classes([className], [true]), false, true)+pug.attr("type", isSubmit ? 'submit' : 'button', true, true)) + "\u003E\u003Cspan class=\"button__text\"\u003E";
pug_indent.push('    ');
pug_mixins["heading"](headingOptions);
pug_indent.pop();
pug_html = pug_html + "\u003C\u002Fspan\u003E\u003Cspan class=\"button__arrow\"\u003E";
pug_indent.push('    ');
pug_mixins["arrow"]({
                    type: 'forward',
                    color: 'white',
                });
pug_indent.pop();
pug_html = pug_html + "\u003C\u002Fspan\u003E\u003C\u002Fbutton\u003E";
}
};
pug_mixins["arrow"] = pug_interp = function({ type, color, withoutPadding = false } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'arrow';
let iconName = 'expand_more';

switch (type) {
    case 'expand-less':
        iconName = 'expand_less';
        break;
    case 'forward':
        iconName = 'arrow_forward';
        break;
    default:
        break;
}

switch (color) {
    case 'white':
        className += ' arrow_color_white';
        break;
    case 'purple-gradient':
        className += ' arrow_color_purple-gradient';
        break;
    default:
        break;
}

if (withoutPadding) {
    className += ' arrow_without-padding';
}

pug_html = pug_html + "\u003Cspan" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = iconName) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
};
pug_mixins["text-field"] = pug_interp = function({ inputOptions = {}, arrowOptions, modifiers = {}, withJs = false } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'text-field';

if (modifiers.isFocused) {
    className += ' text-field_focused';
}
if (modifiers.isShort) {
    className += ' text-field_short';
}
if (modifiers.isBottomFlat) {
    className += ' text-field_flat-bottom';
}
if (modifiers.isClickable) {
    className += ' text-field_clickable';
}

if (withJs) {
    className += ' js-text-field';
}

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E";
let inputClassName = 'text-field__input';
if (arrowOptions) {
    inputClassName += ' text-field__input_with-arrow';
}
if (inputOptions.isMaskedDate) {
    inputClassName += ' text-field__input_masked-date js-text-field__input_masked-date'
}
if (inputOptions.withJs) {
    inputClassName += ' js-text-field__input';
}

pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cinput" + (pug.attr("class", pug.classes([inputClassName], [true]), false, true)+pug.attr("type", inputOptions.type, true, true)+pug.attr("placeholder", inputOptions.placeholder, true, true)+pug.attr("value", inputOptions.value, true, true)+pug.attr("readonly", inputOptions.isReadonly, true, true)) + "\u003E";
if ((arrowOptions)) {
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cbutton" + (" class=\"text-field__arrow\""+pug.attr("type", inputOptions.isSubmit ? 'submit' : 'button', true, true)) + "\u003E";
pug_indent.push('    ');
pug_mixins["arrow"](arrowOptions);
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fbutton\u003E";
}
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
};
pug_mixins["checkbox-buttons"] = pug_interp = function({ items, isRich = false, theme }){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'checkbox-buttons';
if (isRich) {
    className += ' checkbox-buttons_rich';
}
if (theme === 'toggle') {
    className += ' checkbox-buttons_theme_toggle';
}
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cul" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E";
// iterate items
;(function(){
  var $$obj = items;
  if ('number' == typeof $$obj.length) {
      for (var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++) {
        var item = $$obj[pug_index0];
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"checkbox-buttons__item\"\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Clabel class=\"checkbox-buttons__button\"\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cinput" + (" class=\"checkbox-buttons__input\""+" type=\"checkbox\""+pug.attr("checked", item.checked, true, true)) + "\u003E\u003Cspan class=\"checkbox-buttons__name\"\u003E" + (null == (pug_interp = item.name) ? "" : pug_interp) + "\u003C\u002Fspan\u003E";
if ((isRich)) {
pug_html = pug_html + "\u003Cspan class=\"checkbox-buttons__description\"\u003E" + (null == (pug_interp = item.description) ? "" : pug_interp) + "\u003C\u002Fspan\u003E";
}
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Flabel\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index0 in $$obj) {
      $$l++;
      var item = $$obj[pug_index0];
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"checkbox-buttons__item\"\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Clabel class=\"checkbox-buttons__button\"\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cinput" + (" class=\"checkbox-buttons__input\""+" type=\"checkbox\""+pug.attr("checked", item.checked, true, true)) + "\u003E\u003Cspan class=\"checkbox-buttons__name\"\u003E" + (null == (pug_interp = item.name) ? "" : pug_interp) + "\u003C\u002Fspan\u003E";
if ((isRich)) {
pug_html = pug_html + "\u003Cspan class=\"checkbox-buttons__description\"\u003E" + (null == (pug_interp = item.description) ? "" : pug_interp) + "\u003C\u002Fspan\u003E";
}
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Flabel\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Ful\u003E";
};
pug_mixins["radio-buttons"] = pug_interp = function({ items, itemsName }){
var block = (this && this.block), attributes = (this && this.attributes) || {};
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"radio-buttons\"\u003E";
// iterate items
;(function(){
  var $$obj = items;
  if ('number' == typeof $$obj.length) {
      for (var index = 0, $$l = $$obj.length; index < $$l; index++) {
        var text = $$obj[index];
const checked = index === 0;
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Clabel class=\"radio-buttons__button\"\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cinput" + (" class=\"radio-buttons__input\""+" type=\"radio\""+pug.attr("name", itemsName, true, true)+pug.attr("checked", checked, true, true)) + "\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cp class=\"radio-buttons__button-text\"\u003E" + (pug.escape(null == (pug_interp = text) ? "" : pug_interp)) + "\u003C\u002Fp\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Flabel\u003E";
      }
  } else {
    var $$l = 0;
    for (var index in $$obj) {
      $$l++;
      var text = $$obj[index];
const checked = index === 0;
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Clabel class=\"radio-buttons__button\"\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cinput" + (" class=\"radio-buttons__input\""+" type=\"radio\""+pug.attr("name", itemsName, true, true)+pug.attr("checked", checked, true, true)) + "\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cp class=\"radio-buttons__button-text\"\u003E" + (pug.escape(null == (pug_interp = text) ? "" : pug_interp)) + "\u003C\u002Fp\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Flabel\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
};
pug_mixins["signup-card"] = pug_interp = function(){
var block = (this && this.block), attributes = (this && this.attributes) || {};
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cform class=\"signup-card\"\u003E";
pug_indent.push('  ');
pug_mixins["heading"]({
            type: 'h1',
            text: 'Регистрация аккаунта',
        });
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"signup-card__name\"\u003E";
pug_indent.push('    ');
pug_mixins["text-field"]({
                inputOptions: {
                    type: 'text',
                    placeholder: 'Имя',
                }
            });
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"signup-card__surname\"\u003E";
pug_indent.push('    ');
pug_mixins["text-field"]({
                inputOptions: {
                    type: 'text',
                    placeholder: 'Фамилия',
                }
            });
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"signup-card__gender\"\u003E";
pug_indent.push('    ');
pug_mixins["radio-buttons"]({
                items: ['Мужчина', 'Женщина'],
                itemsName: 'gender',
            });
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"signup-card__birth\"\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"signup-card__subtitle\"\u003E";
pug_indent.push('      ');
pug_mixins["heading"]({
                    text: 'Дата рождения',
                    type: 'h3',
                });
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
pug_indent.push('    ');
pug_mixins["text-field"]({
                inputOptions: {
                    placeholder: 'ДД.ММ.ГГГГ',
                    type: 'text',
                    isMaskedDate: true
                }
            });
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"signup-card__login-details\"\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"signup-card__subtitle\"\u003E";
pug_indent.push('      ');
pug_mixins["heading"]({
                    text: 'Данные для входа в сервис',
                    type: 'h3',
                });
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"signup-card__email\"\u003E";
pug_indent.push('      ');
pug_mixins["text-field"]({
                    inputOptions: {
                        type: 'email',
                        placeholder: 'Email',
                    }
                });
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"signup-card__password\"\u003E";
pug_indent.push('      ');
pug_mixins["text-field"]({
                    inputOptions: {
                        type: 'password',
                        placeholder: 'Пароль',
                    }
                });
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"signup-card__offers\"\u003E";
pug_indent.push('    ');
pug_mixins["checkbox-buttons"]({
                items: [{ name: 'Получать спецпредложения' }],
                theme: 'toggle',
            });
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
pug_indent.push('  ');
pug_mixins["button"]({
            text: 'Зарегистрироваться',
            hasLink: true,
            link: 'landing-page.html',
            modifiers: {
                isLong: true,
                textColor: 'white',
            }
        });
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"signup-card__account-exists js-signup-card__account-exists\"\u003E\u003Cspan\u003EУже есть аккаунт на Toxin\u003C\u002Fspan\u003E";
pug_indent.push('    ');
pug_mixins["button"]({
                text: 'Войти',
                hasLink: true,
                link: 'login.html',
                modifiers: {
                    isSecondary: true,
                    isWide: true,
                },
            });
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fform\u003E";
};
pug_mixins["arrow"] = pug_interp = function({ type, color, withoutPadding = false } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'arrow';
let iconName = 'expand_more';

switch (type) {
    case 'expand-less':
        iconName = 'expand_less';
        break;
    case 'forward':
        iconName = 'arrow_forward';
        break;
    default:
        break;
}

switch (color) {
    case 'white':
        className += ' arrow_color_white';
        break;
    case 'purple-gradient':
        className += ' arrow_color_purple-gradient';
        break;
    default:
        break;
}

if (withoutPadding) {
    className += ' arrow_without-padding';
}

pug_html = pug_html + "\u003Cspan" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = iconName) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
};
pug_mixins["heading"] = pug_interp = function({ text = '', type = 'h3', color, withJs = false }){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'heading';
let tag;

switch (type) {
    case 'h3':
        className += ' heading_type_h3';
        tag = 'h3';
        break;
    case 'h2':
        className += ' heading_type_h2';
        tag = 'h2';
        break;
    case 'inline':
        className += ' heading_type_h3';
        tag = 'span';
        break;
    default:
        tag = 'h1';
        break;
}
switch (color) {
    case 'white':
        className += ' heading_color_white';
        break;
    case 'purple':
        className += ' heading_color_purple';
        break;
    case 'gray':
        className += ' heading_color_gray';
        break;
    case 'inherit':
        className += ' heading_color_inherit';
        break;
    default:
        break;
}
if (withJs) {
  className += ' js-heading';
}

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C" + (tag) + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = text) ? "" : pug_interp)) + "\u003C\u002F" + (tag) + "\u003E";
};
pug_mixins["button"] = pug_interp = function(options = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
const {
    text = 'click me',
    hasLink = false,
    isSubmit = false,
    link = 'change-me',
    modifiers = {},
    withJs = false,
} = options;

let className = 'button';
let headingOptions = {
    text,
    type: 'inline',
    color: 'white',
};

if (hasLink) {
    headingOptions.type = 'h3';
}

if (modifiers.isSecondary) {
    className += ' button_secondary';
    headingOptions.color = 'purple';
}
if (modifiers.withoutFrame) {
    headingOptions.color = 'inherit';
    className += ' button_without-frame';
}
if (modifiers.isLong) {
    className += ' button_long';
}
if (modifiers.isHovered) {
    className += ' button_hovered';
}
if (modifiers.isNarrow) {
    className += ' button_narrow';
}
if (modifiers.isWide) {
    className += ' button_wide';
}
if (withJs) {
  className += ' js-button';
}

switch (modifiers.textColor) {
    case 'white':
        headingOptions.color = 'white';
        break;
    case 'purple':
        headingOptions.color = 'purple';
        break;
    case 'gray':
        headingOptions.color = 'gray';
        break;
    default:
        break;
}

if ((hasLink)) {
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E\u003Ca" + (" class=\"button__text\""+pug.attr("href", link, true, true)) + "\u003E";
pug_indent.push('    ');
pug_mixins["heading"](headingOptions);
pug_indent.pop();
pug_html = pug_html + "\u003C\u002Fa\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"button__arrow\"\u003E";
pug_indent.push('    ');
pug_mixins["arrow"]({
                  type: 'forward',
                  color: 'white',
                });
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
else {
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cbutton" + (pug.attr("class", pug.classes([className], [true]), false, true)+pug.attr("type", isSubmit ? 'submit' : 'button', true, true)) + "\u003E\u003Cspan class=\"button__text\"\u003E";
pug_indent.push('    ');
pug_mixins["heading"](headingOptions);
pug_indent.pop();
pug_html = pug_html + "\u003C\u002Fspan\u003E\u003Cspan class=\"button__arrow\"\u003E";
pug_indent.push('    ');
pug_mixins["arrow"]({
                    type: 'forward',
                    color: 'white',
                });
pug_indent.pop();
pug_html = pug_html + "\u003C\u002Fspan\u003E\u003C\u002Fbutton\u003E";
}
};
pug_mixins["arrow"] = pug_interp = function({ type, color, withoutPadding = false } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'arrow';
let iconName = 'expand_more';

switch (type) {
    case 'expand-less':
        iconName = 'expand_less';
        break;
    case 'forward':
        iconName = 'arrow_forward';
        break;
    default:
        break;
}

switch (color) {
    case 'white':
        className += ' arrow_color_white';
        break;
    case 'purple-gradient':
        className += ' arrow_color_purple-gradient';
        break;
    default:
        break;
}

if (withoutPadding) {
    className += ' arrow_without-padding';
}

pug_html = pug_html + "\u003Cspan" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = iconName) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
};
pug_mixins["navigation"] = pug_interp = function({ items, activeLinkIndex, inColumn = false, withJs = false }){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'navigation';
if (inColumn) {
    className += ' navigation_in-column';
}
if (withJs) {
    className += ' js-navigation';
}
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cnav" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cul class=\"navigation__list\"\u003E";
// iterate items
;(function(){
  var $$obj = items;
  if ('number' == typeof $$obj.length) {
      for (var itemIndex = 0, $$l = $$obj.length; itemIndex < $$l; itemIndex++) {
        var item = $$obj[itemIndex];
const link = item.link || 'change-me';

let itemClassName = 'navigation__item';
if (item.isActive) {
    itemClassName += ' navigation__item_active';
}

pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli" + (pug.attr("class", pug.classes([itemClassName], [true]), false, true)) + "\u003E";
if ((item.subitems)) {
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + ("\u003Cbutton class=\"navigation__link\"\u003E" + (pug.escape(null == (pug_interp = item.name) ? "" : pug_interp)));
pug_indent.push('        ');
pug_mixins["arrow"]({ withoutPadding: true });
pug_indent.pop();
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fbutton\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cul class=\"navigation__subitems\"\u003E";
// iterate item.subitems
;(function(){
  var $$obj = item.subitems;
  if ('number' == typeof $$obj.length) {
      for (var pug_index3 = 0, $$l = $$obj.length; pug_index3 < $$l; pug_index3++) {
        var subitem = $$obj[pug_index3];
pug_html = pug_html + "\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"navigation__subitem\"\u003E\u003Ca" + (" class=\"navigation__link\""+pug.attr("href", subitem.link || 'change-me', true, true)) + "\u003E" + (pug.escape(null == (pug_interp = subitem.name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index3 in $$obj) {
      $$l++;
      var subitem = $$obj[pug_index3];
pug_html = pug_html + "\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"navigation__subitem\"\u003E\u003Ca" + (" class=\"navigation__link\""+pug.attr("href", subitem.link || 'change-me', true, true)) + "\u003E" + (pug.escape(null == (pug_interp = subitem.name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Ful\u003E";
}
else {
pug_html = pug_html + "\u003Ca" + (" class=\"navigation__link\""+pug.attr("href", link, true, true)) + "\u003E" + (pug.escape(null == (pug_interp = item.name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E";
}
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var itemIndex in $$obj) {
      $$l++;
      var item = $$obj[itemIndex];
const link = item.link || 'change-me';

let itemClassName = 'navigation__item';
if (item.isActive) {
    itemClassName += ' navigation__item_active';
}

pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli" + (pug.attr("class", pug.classes([itemClassName], [true]), false, true)) + "\u003E";
if ((item.subitems)) {
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + ("\u003Cbutton class=\"navigation__link\"\u003E" + (pug.escape(null == (pug_interp = item.name) ? "" : pug_interp)));
pug_indent.push('        ');
pug_mixins["arrow"]({ withoutPadding: true });
pug_indent.pop();
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fbutton\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cul class=\"navigation__subitems\"\u003E";
// iterate item.subitems
;(function(){
  var $$obj = item.subitems;
  if ('number' == typeof $$obj.length) {
      for (var pug_index4 = 0, $$l = $$obj.length; pug_index4 < $$l; pug_index4++) {
        var subitem = $$obj[pug_index4];
pug_html = pug_html + "\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"navigation__subitem\"\u003E\u003Ca" + (" class=\"navigation__link\""+pug.attr("href", subitem.link || 'change-me', true, true)) + "\u003E" + (pug.escape(null == (pug_interp = subitem.name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index4 in $$obj) {
      $$l++;
      var subitem = $$obj[pug_index4];
pug_html = pug_html + "\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"navigation__subitem\"\u003E\u003Ca" + (" class=\"navigation__link\""+pug.attr("href", subitem.link || 'change-me', true, true)) + "\u003E" + (pug.escape(null == (pug_interp = subitem.name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Ful\u003E";
}
else {
pug_html = pug_html + "\u003Ca" + (" class=\"navigation__link\""+pug.attr("href", link, true, true)) + "\u003E" + (pug.escape(null == (pug_interp = item.name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E";
}
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Ful\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fnav\u003E";
};
pug_mixins["header"] = pug_interp = function({ userName, activeLink } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cheader class=\"header js-header\"\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"header__container\"\u003E\u003Ca class=\"header__logo\" href=\"landing-page.html\"\u003E\u003Cimg src=\"images\u002Flogo.svg\" alt=\"logo\"\u003E\u003C\u002Fa\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"header__menu js-header__menu\"\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"header__nav-container\"\u003E";
pug_indent.push('        ');
pug_mixins["navigation"]({
                        activeLinkIndex: activeLink,
                        items: [
                            {
                                name: 'О нас',
                            },
                            {
                                name: 'Услуги',
                                subitems: [{ name: 'Заказ комнаты' }],
                            },
                            {
                                name: 'Вакансии',
                            },
                            {
                                name: 'Новости',
                            },
                            {
                                name: 'Соглашения',
                                subitems: [
                                    { name: 'Правила' },
                                    { name: 'Конфиденциальность' },
                                ],
                            },
                        ].map((item, index) => ({ ...item, isActive: activeLink === index })),
                        withJs: true,
                    });
pug_indent.pop();
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
if (userName) {
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"header__user\"\u003E" + (pug.escape(null == (pug_interp = userName) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E";
}
else {
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"header__buttons\"\u003E";
pug_indent.push('        ');
pug_mixins["button"]({
                            text: 'Войти',
                            hasLink: true,
                            link: 'login.html',
                            modifiers: {
                                isSecondary: true,
                                isNarrow: true,
                            },
                        });
pug_indent.pop();
pug_indent.push('        ');
pug_mixins["button"]({
                            text: 'Зарегистрироваться',
                            hasLink: true,
                            link: 'registration.html',
                            modifiers: {
                              isNarrow: true,
                            },
                        });
pug_indent.pop();
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cbutton class=\"header__hamburger js-header__hamburger\"\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"header__hamburger-icon\"\u003E\u003C\u002Fdiv\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fbutton\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fheader\u003E";
};
pug_mixins["arrow"] = pug_interp = function({ type, color, withoutPadding = false } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'arrow';
let iconName = 'expand_more';

switch (type) {
    case 'expand-less':
        iconName = 'expand_less';
        break;
    case 'forward':
        iconName = 'arrow_forward';
        break;
    default:
        break;
}

switch (color) {
    case 'white':
        className += ' arrow_color_white';
        break;
    case 'purple-gradient':
        className += ' arrow_color_purple-gradient';
        break;
    default:
        break;
}

if (withoutPadding) {
    className += ' arrow_without-padding';
}

pug_html = pug_html + "\u003Cspan" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = iconName) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
};
pug_mixins["navigation"] = pug_interp = function({ items, activeLinkIndex, inColumn = false, withJs = false }){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'navigation';
if (inColumn) {
    className += ' navigation_in-column';
}
if (withJs) {
    className += ' js-navigation';
}
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cnav" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cul class=\"navigation__list\"\u003E";
// iterate items
;(function(){
  var $$obj = items;
  if ('number' == typeof $$obj.length) {
      for (var itemIndex = 0, $$l = $$obj.length; itemIndex < $$l; itemIndex++) {
        var item = $$obj[itemIndex];
const link = item.link || 'change-me';

let itemClassName = 'navigation__item';
if (item.isActive) {
    itemClassName += ' navigation__item_active';
}

pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli" + (pug.attr("class", pug.classes([itemClassName], [true]), false, true)) + "\u003E";
if ((item.subitems)) {
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + ("\u003Cbutton class=\"navigation__link\"\u003E" + (pug.escape(null == (pug_interp = item.name) ? "" : pug_interp)));
pug_indent.push('        ');
pug_mixins["arrow"]({ withoutPadding: true });
pug_indent.pop();
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fbutton\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cul class=\"navigation__subitems\"\u003E";
// iterate item.subitems
;(function(){
  var $$obj = item.subitems;
  if ('number' == typeof $$obj.length) {
      for (var pug_index6 = 0, $$l = $$obj.length; pug_index6 < $$l; pug_index6++) {
        var subitem = $$obj[pug_index6];
pug_html = pug_html + "\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"navigation__subitem\"\u003E\u003Ca" + (" class=\"navigation__link\""+pug.attr("href", subitem.link || 'change-me', true, true)) + "\u003E" + (pug.escape(null == (pug_interp = subitem.name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index6 in $$obj) {
      $$l++;
      var subitem = $$obj[pug_index6];
pug_html = pug_html + "\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"navigation__subitem\"\u003E\u003Ca" + (" class=\"navigation__link\""+pug.attr("href", subitem.link || 'change-me', true, true)) + "\u003E" + (pug.escape(null == (pug_interp = subitem.name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Ful\u003E";
}
else {
pug_html = pug_html + "\u003Ca" + (" class=\"navigation__link\""+pug.attr("href", link, true, true)) + "\u003E" + (pug.escape(null == (pug_interp = item.name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E";
}
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var itemIndex in $$obj) {
      $$l++;
      var item = $$obj[itemIndex];
const link = item.link || 'change-me';

let itemClassName = 'navigation__item';
if (item.isActive) {
    itemClassName += ' navigation__item_active';
}

pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli" + (pug.attr("class", pug.classes([itemClassName], [true]), false, true)) + "\u003E";
if ((item.subitems)) {
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + ("\u003Cbutton class=\"navigation__link\"\u003E" + (pug.escape(null == (pug_interp = item.name) ? "" : pug_interp)));
pug_indent.push('        ');
pug_mixins["arrow"]({ withoutPadding: true });
pug_indent.pop();
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fbutton\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cul class=\"navigation__subitems\"\u003E";
// iterate item.subitems
;(function(){
  var $$obj = item.subitems;
  if ('number' == typeof $$obj.length) {
      for (var pug_index7 = 0, $$l = $$obj.length; pug_index7 < $$l; pug_index7++) {
        var subitem = $$obj[pug_index7];
pug_html = pug_html + "\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"navigation__subitem\"\u003E\u003Ca" + (" class=\"navigation__link\""+pug.attr("href", subitem.link || 'change-me', true, true)) + "\u003E" + (pug.escape(null == (pug_interp = subitem.name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index7 in $$obj) {
      $$l++;
      var subitem = $$obj[pug_index7];
pug_html = pug_html + "\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"navigation__subitem\"\u003E\u003Ca" + (" class=\"navigation__link\""+pug.attr("href", subitem.link || 'change-me', true, true)) + "\u003E" + (pug.escape(null == (pug_interp = subitem.name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Ful\u003E";
}
else {
pug_html = pug_html + "\u003Ca" + (" class=\"navigation__link\""+pug.attr("href", link, true, true)) + "\u003E" + (pug.escape(null == (pug_interp = item.name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E";
}
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Ful\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fnav\u003E";
};
pug_mixins["heading"] = pug_interp = function({ text = '', type = 'h3', color, withJs = false }){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'heading';
let tag;

switch (type) {
    case 'h3':
        className += ' heading_type_h3';
        tag = 'h3';
        break;
    case 'h2':
        className += ' heading_type_h2';
        tag = 'h2';
        break;
    case 'inline':
        className += ' heading_type_h3';
        tag = 'span';
        break;
    default:
        tag = 'h1';
        break;
}
switch (color) {
    case 'white':
        className += ' heading_color_white';
        break;
    case 'purple':
        className += ' heading_color_purple';
        break;
    case 'gray':
        className += ' heading_color_gray';
        break;
    case 'inherit':
        className += ' heading_color_inherit';
        break;
    default:
        break;
}
if (withJs) {
  className += ' js-heading';
}

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C" + (tag) + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = text) ? "" : pug_interp)) + "\u003C\u002F" + (tag) + "\u003E";
};
pug_mixins["arrow"] = pug_interp = function({ type, color, withoutPadding = false } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'arrow';
let iconName = 'expand_more';

switch (type) {
    case 'expand-less':
        iconName = 'expand_less';
        break;
    case 'forward':
        iconName = 'arrow_forward';
        break;
    default:
        break;
}

switch (color) {
    case 'white':
        className += ' arrow_color_white';
        break;
    case 'purple-gradient':
        className += ' arrow_color_purple-gradient';
        break;
    default:
        break;
}

if (withoutPadding) {
    className += ' arrow_without-padding';
}

pug_html = pug_html + "\u003Cspan" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = iconName) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
};
pug_mixins["text-field"] = pug_interp = function({ inputOptions = {}, arrowOptions, modifiers = {}, withJs = false } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'text-field';

if (modifiers.isFocused) {
    className += ' text-field_focused';
}
if (modifiers.isShort) {
    className += ' text-field_short';
}
if (modifiers.isBottomFlat) {
    className += ' text-field_flat-bottom';
}
if (modifiers.isClickable) {
    className += ' text-field_clickable';
}

if (withJs) {
    className += ' js-text-field';
}

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E";
let inputClassName = 'text-field__input';
if (arrowOptions) {
    inputClassName += ' text-field__input_with-arrow';
}
if (inputOptions.isMaskedDate) {
    inputClassName += ' text-field__input_masked-date js-text-field__input_masked-date'
}
if (inputOptions.withJs) {
    inputClassName += ' js-text-field__input';
}

pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cinput" + (pug.attr("class", pug.classes([inputClassName], [true]), false, true)+pug.attr("type", inputOptions.type, true, true)+pug.attr("placeholder", inputOptions.placeholder, true, true)+pug.attr("value", inputOptions.value, true, true)+pug.attr("readonly", inputOptions.isReadonly, true, true)) + "\u003E";
if ((arrowOptions)) {
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cbutton" + (" class=\"text-field__arrow\""+pug.attr("type", inputOptions.isSubmit ? 'submit' : 'button', true, true)) + "\u003E";
pug_indent.push('    ');
pug_mixins["arrow"](arrowOptions);
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fbutton\u003E";
}
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
};
pug_mixins["social-links"] = pug_interp = function(){
var block = (this && this.block), attributes = (this && this.attributes) || {};
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cul class=\"social-links\"\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"social-links__item\"\u003E\u003Ca class=\"social-links__link\" href=\"change-me\"\u003E\u003Cspan class=\"social-links__icon fab fa-twitter\"\u003E\u003C\u002Fspan\u003E\u003C\u002Fa\u003E\u003C\u002Fli\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"social-links__item\"\u003E\u003Ca class=\"social-links__link\" href=\"change-me\"\u003E\u003Cspan class=\"social-links__icon fab fa-facebook-square\"\u003E\u003C\u002Fspan\u003E\u003C\u002Fa\u003E\u003C\u002Fli\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"social-links__item\"\u003E\u003Ca class=\"social-links__link\" href=\"change-me\"\u003E\u003Cspan class=\"social-links__icon fab fa-instagram\"\u003E\u003C\u002Fspan\u003E\u003C\u002Fa\u003E\u003C\u002Fli\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Ful\u003E";
};
pug_mixins["footer"] = pug_interp = function(){
var block = (this && this.block), attributes = (this && this.attributes) || {};
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cfooter class=\"footer\"\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"footer__body\"\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"footer__main-info\"\u003E\u003Ca href=\"landing-page.html\"\u003E\u003Cimg src=\"images\u002Flogo.svg\" alt=\"logo\"\u003E\u003C\u002Fa\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cp class=\"footer__description\"\u003EБронирование номеров в лучшем отеле 2019 года по версии ассоциации «Отельные взгляды»\u003C\u002Fp\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"footer__menu\"\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"footer__nav\"\u003E\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"footer__subtitle\"\u003E";
pug_indent.push('          ');
pug_mixins["heading"]({ text: 'Навигация' });
pug_indent.pop();
pug_html = pug_html + "\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
pug_indent.push('        ');
pug_mixins["navigation"]({
                        items: [
                            { name: 'О нас' },
                            { name: 'Новости' },
                            { name: 'Служба поддержки' },
                            { name: 'Услуги' },
                        ],
                        inColumn: true,
                    });
pug_indent.pop();
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"footer__nav\"\u003E\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"footer__subtitle\"\u003E";
pug_indent.push('          ');
pug_mixins["heading"]({ text: 'О нас' });
pug_indent.pop();
pug_html = pug_html + "\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
pug_indent.push('        ');
pug_mixins["navigation"]({
                        items: [
                            { name: 'О сервисе' },
                            { name: 'Наша команда' },
                            { name: 'Вакансии' },
                            { name: 'Инвесторы' },
                        ],
                        inColumn: true,
                    });
pug_indent.pop();
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"footer__nav\"\u003E\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"footer__subtitle\"\u003E";
pug_indent.push('          ');
pug_mixins["heading"]({ text: 'Служба поддержки' });
pug_indent.pop();
pug_html = pug_html + "\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
pug_indent.push('        ');
pug_mixins["navigation"]({
                        items: [
                            { name: 'Соглашения' },
                            { name: 'Сообщества' },
                            { name: 'Связь с нами' },
                        ],
                        inColumn: true,
                    });
pug_indent.pop();
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cform class=\"footer__subscription\"\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"footer__subtitle footer__subtitle_without-margin-bottom\"\u003E";
pug_indent.push('        ');
pug_mixins["heading"]({ text: 'Подписка' });
pug_indent.pop();
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"footer__subscription-text\"\u003EПолучайте специальные предложения и новости сервиса\u003C\u002Fdiv\u003E";
pug_indent.push('      ');
pug_mixins["text-field"]({
                    inputOptions: {
                        placeholder: 'Email',
                        type: 'email',
                        isSubmit: true,
                    },
                    modifiers: {
                        isShort: true,
                    },
                    arrowOptions: {
                        type: 'forward',
                        color: 'purple-gradient',
                    },
                });
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fform\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"footer__bottom\"\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"footer__bottom-container\"\u003E\u003Cspan class=\"footer__copyright\"\u003ECopyright © 2018 Toxin отель. Все права защищены.\u003C\u002Fspan\u003E";
pug_indent.push('      ');
pug_mixins["social-links"]();
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Ffooter\u003E";
};
const title = 'Registration';
const name = 'registration';
pug_html = pug_html + "\u003C!DOCTYPE html\u003E\n\u003Chtml lang=\"ru\"\u003E\n  \u003Chead\u003E\n    \u003Cmeta charset=\"utf-8\"\u003E\n    \u003Cmeta" + (" name=\"description\""+pug.attr("content", `Toxin Hotel. Room reservations. ${title}`, true, true)) + "\u003E\n    \u003Cmeta name=\"keywords\" content=\"toxin, hotel, отель, забронировать, room, комнаты, book, reservation\"\u003E\n    \u003Cmeta name=\"viewport\" content=\"initial-scale=1.0, width=device-width\"\u003E\n    \u003Clink" + (" rel=\"apple-touch-icon\" sizes=\"180x180\""+pug.attr("href", __webpack_require__(6).default, true, true)) + "\u003E\n    \u003Clink" + (" rel=\"icon\" type=\"image\u002Fpng\" sizes=\"32x32\""+pug.attr("href", __webpack_require__(8).default, true, true)) + "\u003E\n    \u003Clink" + (" rel=\"icon\" type=\"image\u002Fpng\" sizes=\"16x16\""+pug.attr("href", __webpack_require__(7).default, true, true)) + "\u003E\n    \u003Clink rel=\"manifest\" href=\".\u002Fsite.webmanifest\"\u003E\n    \u003Clink" + (" rel=\"mask-icon\""+pug.attr("href", __webpack_require__(10).default, true, true)+" color=\"#bc9cff\"") + "\u003E\n    \u003Clink" + (" rel=\"shortcut icon\""+pug.attr("href", __webpack_require__(9).default, true, true)) + "\u003E\n    \u003Cmeta name=\"msapplication-TileColor\" content=\"#603cba\"\u003E\n    \u003Cmeta name=\"msapplication-config\" content=\".\u002Fbrowserconfig.xml\"\u003E\n    \u003Cmeta name=\"theme-color\" content=\"#ffffff\"\u003E\n    \u003Ctitle\u003E" + (pug.escape(null == (pug_interp = title) ? "" : pug_interp)) + "\u003C\u002Ftitle\u003E\n  \u003C\u002Fhead\u003E\n  \u003Cbody\u003E";
pug_indent.push('    ');
pug_mixins["header"]({ activeLink });
pug_indent.pop();
pug_html = pug_html + "\n    \u003Cmain\u003E\n      \u003Cmain class=\"registration\"\u003E\n        \u003Cdiv class=\"registration__card\"\u003E";
pug_indent.push('          ');
pug_mixins["signup-card"]();
pug_indent.pop();
pug_html = pug_html + "\n        \u003C\u002Fdiv\u003E\n      \u003C\u002Fmain\u003E\n    \u003C\u002Fmain\u003E";
pug_indent.push('    ');
pug_mixins["footer"]();
pug_indent.pop();
pug_html = pug_html + "\n  \u003C\u002Fbody\u003E\n\u003C\u002Fhtml\u003E";
    }.call(this, "activeLink" in locals_for_with ?
        locals_for_with.activeLink :
        typeof activeLink !== 'undefined' ? activeLink : undefined, "pug_indent" in locals_for_with ?
        locals_for_with.pug_indent :
        typeof pug_indent !== 'undefined' ? pug_indent : undefined));
    ;;return pug_html;};
module.exports = template;

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(2);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;
    var locals_for_with = (locals || {});
    
    (function (Array, Date, JSON, activeLink, pug_indent) {
      var pug_indent = [];
pug_mixins["heading"] = pug_interp = function({ text = '', type = 'h3', color, withJs = false }){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'heading';
let tag;

switch (type) {
    case 'h3':
        className += ' heading_type_h3';
        tag = 'h3';
        break;
    case 'h2':
        className += ' heading_type_h2';
        tag = 'h2';
        break;
    case 'inline':
        className += ' heading_type_h3';
        tag = 'span';
        break;
    default:
        tag = 'h1';
        break;
}
switch (color) {
    case 'white':
        className += ' heading_color_white';
        break;
    case 'purple':
        className += ' heading_color_purple';
        break;
    case 'gray':
        className += ' heading_color_gray';
        break;
    case 'inherit':
        className += ' heading_color_inherit';
        break;
    default:
        break;
}
if (withJs) {
  className += ' js-heading';
}

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C" + (tag) + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = text) ? "" : pug_interp)) + "\u003C\u002F" + (tag) + "\u003E";
};
pug_mixins["icon-text-list"] = pug_interp = function(items){
var block = (this && this.block), attributes = (this && this.attributes) || {};
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cul class=\"icon-text-list\"\u003E";
// iterate items
;(function(){
  var $$obj = items;
  if ('number' == typeof $$obj.length) {
      for (var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++) {
        var item = $$obj[pug_index0];
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"icon-text-list__item\"\u003E\u003Cspan class=\"icon-text-list__icon material-icons\"\u003E" + (pug.escape(null == (pug_interp = item.iconName) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Ch4 class=\"icon-text-list__title\"\u003E" + (pug.escape(null == (pug_interp = item.title) ? "" : pug_interp)) + "\u003C\u002Fh4\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cp class=\"icon-text-list__description\"\u003E" + (pug.escape(null == (pug_interp = item.description) ? "" : pug_interp)) + "\u003C\u002Fp\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index0 in $$obj) {
      $$l++;
      var item = $$obj[pug_index0];
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"icon-text-list__item\"\u003E\u003Cspan class=\"icon-text-list__icon material-icons\"\u003E" + (pug.escape(null == (pug_interp = item.iconName) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Ch4 class=\"icon-text-list__title\"\u003E" + (pug.escape(null == (pug_interp = item.title) ? "" : pug_interp)) + "\u003C\u002Fh4\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cp class=\"icon-text-list__description\"\u003E" + (pug.escape(null == (pug_interp = item.description) ? "" : pug_interp)) + "\u003C\u002Fp\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Ful\u003E";
};
pug_mixins["heading"] = pug_interp = function({ text = '', type = 'h3', color, withJs = false }){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'heading';
let tag;

switch (type) {
    case 'h3':
        className += ' heading_type_h3';
        tag = 'h3';
        break;
    case 'h2':
        className += ' heading_type_h2';
        tag = 'h2';
        break;
    case 'inline':
        className += ' heading_type_h3';
        tag = 'span';
        break;
    default:
        tag = 'h1';
        break;
}
switch (color) {
    case 'white':
        className += ' heading_color_white';
        break;
    case 'purple':
        className += ' heading_color_purple';
        break;
    case 'gray':
        className += ' heading_color_gray';
        break;
    case 'inherit':
        className += ' heading_color_inherit';
        break;
    default:
        break;
}
if (withJs) {
  className += ' js-heading';
}

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C" + (tag) + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = text) ? "" : pug_interp)) + "\u003C\u002F" + (tag) + "\u003E";
};
pug_mixins["donut-chart"] = pug_interp = function(){
var block = (this && this.block), attributes = (this && this.attributes) || {};
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"donut-chart js-donut-chart\"\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"donut-chart__chart\"\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Ccanvas class=\"donut-chart__canvas js-donut-chart__canvas\" width=\"128\" height=\"128\"\u003E\u003C\u002Fcanvas\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"donut-chart__votes\"\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"donut-chart__value\"\u003E";
pug_indent.push('        ');
pug_mixins["heading"]({
                        type: 'h1',
                        text: 260,
                        color: 'purple',
                    });
pug_indent.pop();
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
pug_indent.push('      ');
pug_mixins["heading"]({
                    type: 'h3',
                    text: 'голосов',
                    color: 'purple',
                });
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cul class=\"donut-chart__list\"\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"donut-chart__item donut-chart__item_color_orange\"\u003EВеликолепно\u003C\u002Fli\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"donut-chart__item donut-chart__item_color_green\"\u003EХорошо\u003C\u002Fli\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"donut-chart__item donut-chart__item_color_purple\"\u003EУдовлетворительно\u003C\u002Fli\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"donut-chart__item donut-chart__item_color_dark\"\u003EРазочарован\u003C\u002Fli\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Ful\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
};
pug_mixins["like-button"] = pug_interp = function({ likesNum = 0, isActive = false } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'like-button js-like-button';
if (isActive) {
    className += ' like-button_active';
}
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cbutton" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E\u003Cspan class=\"like-button__heart material-icons\"\u003E\u003C\u002Fspan\u003E\u003Cspan class=\"like-button__number js-like-button__number\"\u003E" + (pug.escape(null == (pug_interp = likesNum) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003C\u002Fbutton\u003E";
};
pug_mixins["comment"] = pug_interp = function(options = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
const {
    avatarLink,
    userName,
    dateText,
    dateTime,
    text,
    likeOptions,
    href = 'change-me',
} = options;
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Carticle class=\"comment\"\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"comment__header\"\u003E\u003Cimg" + (" class=\"comment__avatar\""+pug.attr("src", avatarLink, true, true)+" alt=\"user-avatar\"") + "\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Caddress\u003E\u003Ca" + (" class=\"comment__user-name\""+pug.attr("href", href, true, true)) + "\u003E" + (pug.escape(null == (pug_interp = userName) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Faddress\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Ctime" + (" class=\"comment__date\""+pug.attr("datetime", dateTime, true, true)) + "\u003E" + (pug.escape(null == (pug_interp = dateText) ? "" : pug_interp)) + "\u003C\u002Ftime\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"comment__content\"\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"comment__likes\"\u003E";
pug_indent.push('      ');
pug_mixins["like-button"](likeOptions);
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cp class=\"comment__text\"\u003E" + (pug.escape(null == (pug_interp = text) ? "" : pug_interp)) + "\u003C\u002Fp\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Farticle\u003E";
};
pug_mixins["bullet-list"] = pug_interp = function(itemTexts){
var block = (this && this.block), attributes = (this && this.attributes) || {};
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cul class=\"bullet-list\"\u003E";
// iterate itemTexts
;(function(){
  var $$obj = itemTexts;
  if ('number' == typeof $$obj.length) {
      for (var pug_index1 = 0, $$l = $$obj.length; pug_index1 < $$l; pug_index1++) {
        var text = $$obj[pug_index1];
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"bullet-list__item\"\u003E" + (null == (pug_interp = text) ? "" : pug_interp) + "\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index1 in $$obj) {
      $$l++;
      var text = $$obj[pug_index1];
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"bullet-list__item\"\u003E" + (null == (pug_interp = text) ? "" : pug_interp) + "\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Ful\u003E";
};
pug_mixins["heading"] = pug_interp = function({ text = '', type = 'h3', color, withJs = false }){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'heading';
let tag;

switch (type) {
    case 'h3':
        className += ' heading_type_h3';
        tag = 'h3';
        break;
    case 'h2':
        className += ' heading_type_h2';
        tag = 'h2';
        break;
    case 'inline':
        className += ' heading_type_h3';
        tag = 'span';
        break;
    default:
        tag = 'h1';
        break;
}
switch (color) {
    case 'white':
        className += ' heading_color_white';
        break;
    case 'purple':
        className += ' heading_color_purple';
        break;
    case 'gray':
        className += ' heading_color_gray';
        break;
    case 'inherit':
        className += ' heading_color_inherit';
        break;
    default:
        break;
}
if (withJs) {
  className += ' js-heading';
}

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C" + (tag) + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = text) ? "" : pug_interp)) + "\u003C\u002F" + (tag) + "\u003E";
};
pug_mixins["room-info"] = pug_interp = function({ number, type, price, isNameBig = false }){
var block = (this && this.block), attributes = (this && this.attributes) || {};
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv" + (pug.attr("class", pug.classes([`room-info${isNameBig ? ' room-info_size_big' : ''}`], [true]), false, true)) + "\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cheader class=\"room-info__name\"\u003E\u003Cspan class=\"room-info__number-sign\"\u003E№\u003C\u002Fspan\u003E";
if ((isNameBig)) {
pug_indent.push('    ');
pug_mixins["heading"]({
                  text: number,
                  type: 'h1',
                });
pug_indent.pop();
}
else {
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Ch3 class=\"room-info__number\"\u003E" + (pug.escape(null == (pug_interp = number) ? "" : pug_interp)) + "\u003C\u002Fh3\u003E";
}
if ((type)) {
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"room-info__type\"\u003E";
pug_indent.push('      ');
pug_mixins["heading"]({
                        text: type,
                        color: 'purple',
                    });
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fheader\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cp class=\"room-info__price\"\u003E" + (pug.escape(null == (pug_interp = `${price}₽`) ? "" : pug_interp)) + "\u003Cspan class=\"room-info__price-measure\"\u003Eв сутки\u003C\u002Fspan\u003E\u003C\u002Fp\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
};
pug_mixins["arrow"] = pug_interp = function({ type, color, withoutPadding = false } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'arrow';
let iconName = 'expand_more';

switch (type) {
    case 'expand-less':
        iconName = 'expand_less';
        break;
    case 'forward':
        iconName = 'arrow_forward';
        break;
    default:
        break;
}

switch (color) {
    case 'white':
        className += ' arrow_color_white';
        break;
    case 'purple-gradient':
        className += ' arrow_color_purple-gradient';
        break;
    default:
        break;
}

if (withoutPadding) {
    className += ' arrow_without-padding';
}

pug_html = pug_html + "\u003Cspan" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = iconName) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
};
pug_mixins["heading"] = pug_interp = function({ text = '', type = 'h3', color, withJs = false }){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'heading';
let tag;

switch (type) {
    case 'h3':
        className += ' heading_type_h3';
        tag = 'h3';
        break;
    case 'h2':
        className += ' heading_type_h2';
        tag = 'h2';
        break;
    case 'inline':
        className += ' heading_type_h3';
        tag = 'span';
        break;
    default:
        tag = 'h1';
        break;
}
switch (color) {
    case 'white':
        className += ' heading_color_white';
        break;
    case 'purple':
        className += ' heading_color_purple';
        break;
    case 'gray':
        className += ' heading_color_gray';
        break;
    case 'inherit':
        className += ' heading_color_inherit';
        break;
    default:
        break;
}
if (withJs) {
  className += ' js-heading';
}

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C" + (tag) + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = text) ? "" : pug_interp)) + "\u003C\u002F" + (tag) + "\u003E";
};
pug_mixins["button"] = pug_interp = function(options = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
const {
    text = 'click me',
    hasLink = false,
    isSubmit = false,
    link = 'change-me',
    modifiers = {},
    withJs = false,
} = options;

let className = 'button';
let headingOptions = {
    text,
    type: 'inline',
    color: 'white',
};

if (hasLink) {
    headingOptions.type = 'h3';
}

if (modifiers.isSecondary) {
    className += ' button_secondary';
    headingOptions.color = 'purple';
}
if (modifiers.withoutFrame) {
    headingOptions.color = 'inherit';
    className += ' button_without-frame';
}
if (modifiers.isLong) {
    className += ' button_long';
}
if (modifiers.isHovered) {
    className += ' button_hovered';
}
if (modifiers.isNarrow) {
    className += ' button_narrow';
}
if (modifiers.isWide) {
    className += ' button_wide';
}
if (withJs) {
  className += ' js-button';
}

switch (modifiers.textColor) {
    case 'white':
        headingOptions.color = 'white';
        break;
    case 'purple':
        headingOptions.color = 'purple';
        break;
    case 'gray':
        headingOptions.color = 'gray';
        break;
    default:
        break;
}

if ((hasLink)) {
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E\u003Ca" + (" class=\"button__text\""+pug.attr("href", link, true, true)) + "\u003E";
pug_indent.push('    ');
pug_mixins["heading"](headingOptions);
pug_indent.pop();
pug_html = pug_html + "\u003C\u002Fa\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"button__arrow\"\u003E";
pug_indent.push('    ');
pug_mixins["arrow"]({
                  type: 'forward',
                  color: 'white',
                });
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
else {
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cbutton" + (pug.attr("class", pug.classes([className], [true]), false, true)+pug.attr("type", isSubmit ? 'submit' : 'button', true, true)) + "\u003E\u003Cspan class=\"button__text\"\u003E";
pug_indent.push('    ');
pug_mixins["heading"](headingOptions);
pug_indent.pop();
pug_html = pug_html + "\u003C\u002Fspan\u003E\u003Cspan class=\"button__arrow\"\u003E";
pug_indent.push('    ');
pug_mixins["arrow"]({
                    type: 'forward',
                    color: 'white',
                });
pug_indent.pop();
pug_html = pug_html + "\u003C\u002Fspan\u003E\u003C\u002Fbutton\u003E";
}
};
pug_mixins["date-picker"] = pug_interp = function(options = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
const {
    withBorder = false,
    dateFormat = null,
    initialDate = [null, null],
    isTextDouble = false,
} = options;

let className = 'date-picker js-date-picker';
if (withBorder) {
    className += ' date-picker_with-border';
}
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv" + (pug.attr("class", pug.classes([className], [true]), false, true)+pug.attr("data-date-format", dateFormat, true, true)+pug.attr("data-initial-date", initialDate, true, true)+pug.attr("data-is-text-double", isTextDouble ? 'true' : 'false', true, true)) + "\u003E\u003C\u002Fdiv\u003E";
};
pug_mixins["heading"] = pug_interp = function({ text = '', type = 'h3', color, withJs = false }){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'heading';
let tag;

switch (type) {
    case 'h3':
        className += ' heading_type_h3';
        tag = 'h3';
        break;
    case 'h2':
        className += ' heading_type_h2';
        tag = 'h2';
        break;
    case 'inline':
        className += ' heading_type_h3';
        tag = 'span';
        break;
    default:
        tag = 'h1';
        break;
}
switch (color) {
    case 'white':
        className += ' heading_color_white';
        break;
    case 'purple':
        className += ' heading_color_purple';
        break;
    case 'gray':
        className += ' heading_color_gray';
        break;
    case 'inherit':
        className += ' heading_color_inherit';
        break;
    default:
        break;
}
if (withJs) {
  className += ' js-heading';
}

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C" + (tag) + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = text) ? "" : pug_interp)) + "\u003C\u002F" + (tag) + "\u003E";
};
pug_mixins["counting-item"] = pug_interp = function({ name = '', value = 0, nameDeclensions } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv" + (" class=\"counting-item js-counting-item\""+pug.attr("data-words", nameDeclensions ? JSON.stringify(nameDeclensions) : false, true, true)) + "\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"counting-item__name js-counting-item__name\"\u003E";
pug_indent.push('    ');
pug_mixins["heading"]({
                text: name,
                withJs: true,
            });
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"counting-item__counter\"\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cbutton class=\"counting-item__change-button counting-item__change-button_action_decrease js-counting-item__change-button_action_decrease\" type=\"button\"\u003E-\u003C\u002Fbutton\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"counting-item__value js-counting-item__value\"\u003E";
pug_indent.push('      ');
pug_mixins["heading"]({
                    text: value,
                    withJs: true,
                });
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cbutton class=\"counting-item__change-button counting-item__change-button_action_increase js-counting-item__change-button_action_increase\" type=\"button\"\u003E+\u003C\u002Fbutton\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
};
pug_mixins["arrow"] = pug_interp = function({ type, color, withoutPadding = false } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'arrow';
let iconName = 'expand_more';

switch (type) {
    case 'expand-less':
        iconName = 'expand_less';
        break;
    case 'forward':
        iconName = 'arrow_forward';
        break;
    default:
        break;
}

switch (color) {
    case 'white':
        className += ' arrow_color_white';
        break;
    case 'purple-gradient':
        className += ' arrow_color_purple-gradient';
        break;
    default:
        break;
}

if (withoutPadding) {
    className += ' arrow_without-padding';
}

pug_html = pug_html + "\u003Cspan" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = iconName) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
};
pug_mixins["heading"] = pug_interp = function({ text = '', type = 'h3', color, withJs = false }){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'heading';
let tag;

switch (type) {
    case 'h3':
        className += ' heading_type_h3';
        tag = 'h3';
        break;
    case 'h2':
        className += ' heading_type_h2';
        tag = 'h2';
        break;
    case 'inline':
        className += ' heading_type_h3';
        tag = 'span';
        break;
    default:
        tag = 'h1';
        break;
}
switch (color) {
    case 'white':
        className += ' heading_color_white';
        break;
    case 'purple':
        className += ' heading_color_purple';
        break;
    case 'gray':
        className += ' heading_color_gray';
        break;
    case 'inherit':
        className += ' heading_color_inherit';
        break;
    default:
        break;
}
if (withJs) {
  className += ' js-heading';
}

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C" + (tag) + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = text) ? "" : pug_interp)) + "\u003C\u002F" + (tag) + "\u003E";
};
pug_mixins["button"] = pug_interp = function(options = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
const {
    text = 'click me',
    hasLink = false,
    isSubmit = false,
    link = 'change-me',
    modifiers = {},
    withJs = false,
} = options;

let className = 'button';
let headingOptions = {
    text,
    type: 'inline',
    color: 'white',
};

if (hasLink) {
    headingOptions.type = 'h3';
}

if (modifiers.isSecondary) {
    className += ' button_secondary';
    headingOptions.color = 'purple';
}
if (modifiers.withoutFrame) {
    headingOptions.color = 'inherit';
    className += ' button_without-frame';
}
if (modifiers.isLong) {
    className += ' button_long';
}
if (modifiers.isHovered) {
    className += ' button_hovered';
}
if (modifiers.isNarrow) {
    className += ' button_narrow';
}
if (modifiers.isWide) {
    className += ' button_wide';
}
if (withJs) {
  className += ' js-button';
}

switch (modifiers.textColor) {
    case 'white':
        headingOptions.color = 'white';
        break;
    case 'purple':
        headingOptions.color = 'purple';
        break;
    case 'gray':
        headingOptions.color = 'gray';
        break;
    default:
        break;
}

if ((hasLink)) {
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E\u003Ca" + (" class=\"button__text\""+pug.attr("href", link, true, true)) + "\u003E";
pug_indent.push('    ');
pug_mixins["heading"](headingOptions);
pug_indent.pop();
pug_html = pug_html + "\u003C\u002Fa\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"button__arrow\"\u003E";
pug_indent.push('    ');
pug_mixins["arrow"]({
                  type: 'forward',
                  color: 'white',
                });
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
else {
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cbutton" + (pug.attr("class", pug.classes([className], [true]), false, true)+pug.attr("type", isSubmit ? 'submit' : 'button', true, true)) + "\u003E\u003Cspan class=\"button__text\"\u003E";
pug_indent.push('    ');
pug_mixins["heading"](headingOptions);
pug_indent.pop();
pug_html = pug_html + "\u003C\u002Fspan\u003E\u003Cspan class=\"button__arrow\"\u003E";
pug_indent.push('    ');
pug_mixins["arrow"]({
                    type: 'forward',
                    color: 'white',
                });
pug_indent.pop();
pug_html = pug_html + "\u003C\u002Fspan\u003E\u003C\u002Fbutton\u003E";
}
};
pug_mixins["items-counter"] = pug_interp = function(options = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
const {
    items,
    withoutButtons = false,
    wordForValueTextReplacing = null,
    itemIndexForSeparateCount = null,
} = options;

let className = 'items-counter js-items-counter';
if (withoutButtons) {
    className += ' items-counter_without-buttons';
}
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv" + (pug.attr("class", pug.classes([className], [true]), false, true)+pug.attr("data-replace-text", JSON.stringify(wordForValueTextReplacing), true, true)+pug.attr("data-separate-item", JSON.stringify(itemIndexForSeparateCount), true, true)) + "\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cul class=\"items-counter__items-list\"\u003E";
// iterate items
;(function(){
  var $$obj = items;
  if ('number' == typeof $$obj.length) {
      for (var pug_index2 = 0, $$l = $$obj.length; pug_index2 < $$l; pug_index2++) {
        var item = $$obj[pug_index2];
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"items-counter__item\"\u003E";
pug_indent.push('      ');
pug_mixins["counting-item"]({
                        name: item.name,
                        value: item.value,
                        nameDeclensions: item.nameDeclensions,
                    });
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index2 in $$obj) {
      $$l++;
      var item = $$obj[pug_index2];
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"items-counter__item\"\u003E";
pug_indent.push('      ');
pug_mixins["counting-item"]({
                        name: item.name,
                        value: item.value,
                        nameDeclensions: item.nameDeclensions,
                    });
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Ful\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"items-counter__button-panel\"\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"items-counter__clear-button js-items-counter__clear-button\"\u003E";
pug_indent.push('      ');
pug_mixins["button"]({
                    text: 'Очистить',
                    hasLink: false,
                    modifiers: {
                        withoutFrame: true,
                    }
                });
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"items-counter__apply-button js-items-counter__apply-button\"\u003E";
pug_indent.push('      ');
pug_mixins["button"]({
                    text: 'Применить',
                    hasLink: false,
                    modifiers: {
                        withoutFrame: true,
                    }
                });
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
};
pug_mixins["arrow"] = pug_interp = function({ type, color, withoutPadding = false } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'arrow';
let iconName = 'expand_more';

switch (type) {
    case 'expand-less':
        iconName = 'expand_less';
        break;
    case 'forward':
        iconName = 'arrow_forward';
        break;
    default:
        break;
}

switch (color) {
    case 'white':
        className += ' arrow_color_white';
        break;
    case 'purple-gradient':
        className += ' arrow_color_purple-gradient';
        break;
    default:
        break;
}

if (withoutPadding) {
    className += ' arrow_without-padding';
}

pug_html = pug_html + "\u003Cspan" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = iconName) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
};
pug_mixins["text-field"] = pug_interp = function({ inputOptions = {}, arrowOptions, modifiers = {}, withJs = false } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'text-field';

if (modifiers.isFocused) {
    className += ' text-field_focused';
}
if (modifiers.isShort) {
    className += ' text-field_short';
}
if (modifiers.isBottomFlat) {
    className += ' text-field_flat-bottom';
}
if (modifiers.isClickable) {
    className += ' text-field_clickable';
}

if (withJs) {
    className += ' js-text-field';
}

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E";
let inputClassName = 'text-field__input';
if (arrowOptions) {
    inputClassName += ' text-field__input_with-arrow';
}
if (inputOptions.isMaskedDate) {
    inputClassName += ' text-field__input_masked-date js-text-field__input_masked-date'
}
if (inputOptions.withJs) {
    inputClassName += ' js-text-field__input';
}

pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cinput" + (pug.attr("class", pug.classes([inputClassName], [true]), false, true)+pug.attr("type", inputOptions.type, true, true)+pug.attr("placeholder", inputOptions.placeholder, true, true)+pug.attr("value", inputOptions.value, true, true)+pug.attr("readonly", inputOptions.isReadonly, true, true)) + "\u003E";
if ((arrowOptions)) {
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cbutton" + (" class=\"text-field__arrow\""+pug.attr("type", inputOptions.isSubmit ? 'submit' : 'button', true, true)) + "\u003E";
pug_indent.push('    ');
pug_mixins["arrow"](arrowOptions);
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fbutton\u003E";
}
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
};
pug_mixins["dropdown"] = pug_interp = function(options = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let {
    inputOptions = {},
    popupMixinOptions = {},
    popupHidden = true,
    title,
    isDouble = false,
    isShort = false,
    isPopupDistant = false,
    defaultInputValue = '',
} = options;

let className = 'dropdown js-dropdown';
if (isDouble) {
    className += ' dropdown_double';
}
if (isShort) {
  className += ' dropdown_short';
}
if (isPopupDistant) {
  className += ' dropdown_with-distant-popup';
}

if (isDouble) {
    if (!Array.isArray(title)) {
        title = [title, title];
    }
    if (!Array.isArray(inputOptions)) {
        inputOptions = [inputOptions, inputOptions];
    }
}
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Csection" + (pug.attr("class", pug.classes([className], [true]), false, true)+pug.attr("data-default-value", JSON.stringify(defaultInputValue), true, true)) + "\u003E";
if ((isDouble)) {
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"dropdown__text-field js-dropdown__text-field\"\u003E";
if ((title[0])) {
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"dropdown__title\"\u003E";
pug_indent.push('      ');
pug_mixins["heading"]({
                            text: title[0],
                        });
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
pug_indent.push('    ');
pug_mixins["text-field"]({
                    inputOptions: {
                        ...inputOptions[0],
                        isMaskedDate: false,
                        isReadonly: true,
                        withJs: true,
                    },
                    arrowOptions: {},
                    modifiers: {
                        isFocused: !popupHidden,
                        isBottomFlat: !popupHidden,
                        isClickable: true,
                    },
                    withJs: true,
                });
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"dropdown__text-field js-dropdown__text-field\"\u003E";
if ((title[1])) {
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"dropdown__title\"\u003E";
pug_indent.push('      ');
pug_mixins["heading"]({
                            text: title[1],
                        });
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
pug_indent.push('    ');
pug_mixins["text-field"]({
                    inputOptions: {
                        ...inputOptions[1],
                        isMaskedDate: false,
                        isReadonly: true,
                        withJs: true,
                    },
                    arrowOptions: {},
                    modifiers: {
                        isFocused: !popupHidden,
                        isBottomFlat: !popupHidden,
                        isClickable: true,
                    },
                    withJs: true,
                });
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
else {
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"dropdown__text-field js-dropdown__text-field\"\u003E";
if ((title)) {
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"dropdown__title\"\u003E";
pug_indent.push('      ');
pug_mixins["heading"]({
                            text: title,
                        });
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
pug_indent.push('    ');
pug_mixins["text-field"]({
                    inputOptions: {
                        ...inputOptions,
                        isMaskedDate: false,
                        isReadonly: true,
                        withJs: true,
                    },
                    arrowOptions: {},
                    modifiers: {
                        isFocused: !popupHidden,
                        isBottomFlat: !popupHidden,
                        isClickable: true,
                    },
                    withJs: true,
                });
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv" + (pug.attr("class", pug.classes(["dropdown__popup","js-dropdown__popup",`${popupHidden ? 'dropdown__popup_hidden' : false}`], [false,false,true]), false, true)) + "\u003E";
if ((popupMixinOptions.name)) {
pug_indent.push('    ');
pug_mixins[popupMixinOptions.name](popupMixinOptions.params);
pug_indent.pop();
}
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fsection\u003E";
};
pug_mixins["heading"] = pug_interp = function({ text = '', type = 'h3', color, withJs = false }){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'heading';
let tag;

switch (type) {
    case 'h3':
        className += ' heading_type_h3';
        tag = 'h3';
        break;
    case 'h2':
        className += ' heading_type_h2';
        tag = 'h2';
        break;
    case 'inline':
        className += ' heading_type_h3';
        tag = 'span';
        break;
    default:
        tag = 'h1';
        break;
}
switch (color) {
    case 'white':
        className += ' heading_color_white';
        break;
    case 'purple':
        className += ' heading_color_purple';
        break;
    case 'gray':
        className += ' heading_color_gray';
        break;
    case 'inherit':
        className += ' heading_color_inherit';
        break;
    default:
        break;
}
if (withJs) {
  className += ' js-heading';
}

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C" + (tag) + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = text) ? "" : pug_interp)) + "\u003C\u002F" + (tag) + "\u003E";
};
pug_mixins["booking-card"] = pug_interp = function({ roomInfo, bookingItems, totalPrice } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Carticle class=\"booking-card js-booking-card\"\u003E";
pug_indent.push('  ');
pug_mixins["room-info"](roomInfo);
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cform\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"booking-card__dates\"\u003E";
pug_indent.push('      ');
pug_mixins["dropdown"]({
                    isDouble: true,
                    title: ['Прибытие', 'Выезд'],
                    inputOptions: [
                        {
                            value: '19.08.2019',
                            placeholder: 'ДД.ММ.ГГГГ',
                        },
                        {
                            value: '23.08.2019',
                            placeholder: 'ДД.ММ.ГГГГ',
                        },
                    ],
                    popupMixinOptions: {
                        name: 'date-picker',
                        params: {
                          initialDate: [new Date(2019, 7, 19), new Date(2019, 7, 23)],
                          isTextDouble: true,
                        },
                    },
                    isPopupDistant: true,
                    defaultInputValue: 'ДД.ММ.ГГГГ',
                });
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"booking-card__guests\"\u003E";
pug_indent.push('      ');
pug_mixins["dropdown"]({
                    inputOptions: {
                        value: '3 гостя',
                        placeholder: 'Сколько гостей',
                    },
                    popupMixinOptions: {
                        name: 'items-counter',
                        params: {
                            items: [
                                {
                                    name: 'Взрослые',
                                    value: 2,
                                },
                                {
                                    name: 'Дети',
                                    value: 1,
                                },
                                {
                                    name: 'Младенцы',
                                    value: 0,
                                    nameDeclensions: ['младенец', 'младенца', 'младенцев'],
                                },
                            ],
                            wordForValueTextReplacing: ['гость', 'гостя', 'гостей'],
                            itemIndexForSeparateCount: 2,
                        },
                    },
                    title: 'Гости',
                    defaultInputValue: 'Сколько гостей',
                });
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cul class=\"booking-card__items\"\u003E";
// iterate bookingItems
;(function(){
  var $$obj = bookingItems;
  if ('number' == typeof $$obj.length) {
      for (var pug_index3 = 0, $$l = $$obj.length; pug_index3 < $$l; pug_index3++) {
        var item = $$obj[pug_index3];
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"booking-card__item\"\u003E\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + ("\u003Cp class=\"booking-card__item-text\"\u003E" + (null == (pug_interp = item.text) ? "" : pug_interp));
if ((item.tooltip)) {
pug_html = pug_html + "\u003Cspan" + (" class=\"booking-card__tooltip\""+pug.attr("data-text", item.tooltip, true, true)) + "\u003Ei\u003C\u002Fspan\u003E";
}
pug_html = pug_html + "\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fp\u003E\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Coutput class=\"booking-card__item-price\"\u003E" + (pug.escape(null == (pug_interp = `${item.price}₽`) ? "" : pug_interp)) + "\u003C\u002Foutput\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index3 in $$obj) {
      $$l++;
      var item = $$obj[pug_index3];
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"booking-card__item\"\u003E\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + ("\u003Cp class=\"booking-card__item-text\"\u003E" + (null == (pug_interp = item.text) ? "" : pug_interp));
if ((item.tooltip)) {
pug_html = pug_html + "\u003Cspan" + (" class=\"booking-card__tooltip\""+pug.attr("data-text", item.tooltip, true, true)) + "\u003Ei\u003C\u002Fspan\u003E";
}
pug_html = pug_html + "\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fp\u003E\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Coutput class=\"booking-card__item-price\"\u003E" + (pug.escape(null == (pug_interp = `${item.price}₽`) ? "" : pug_interp)) + "\u003C\u002Foutput\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Ful\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"booking-card__total\"\u003E";
pug_indent.push('      ');
pug_mixins["heading"]({
                    text: 'Итого',
                    type: 'h2',
                });
pug_indent.pop();
pug_html = pug_html + "\u003Cspan class=\"booking-card__dots\"\u003E\u003C\u002Fspan\u003E";
pug_indent.push('      ');
pug_mixins["heading"]({
                    text: `${totalPrice}₽`,
                    type: 'h2',
                });
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
pug_indent.push('    ');
pug_mixins["button"]({
                text: 'Забронировать',
                hasLink: true,
                link: 'landing-page.html',
                modifiers: {
                    isLong: true,
                    textColor: 'white',
                }
            });
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fform\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Farticle\u003E";
};
pug_mixins["arrow"] = pug_interp = function({ type, color, withoutPadding = false } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'arrow';
let iconName = 'expand_more';

switch (type) {
    case 'expand-less':
        iconName = 'expand_less';
        break;
    case 'forward':
        iconName = 'arrow_forward';
        break;
    default:
        break;
}

switch (color) {
    case 'white':
        className += ' arrow_color_white';
        break;
    case 'purple-gradient':
        className += ' arrow_color_purple-gradient';
        break;
    default:
        break;
}

if (withoutPadding) {
    className += ' arrow_without-padding';
}

pug_html = pug_html + "\u003Cspan" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = iconName) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
};
pug_mixins["heading"] = pug_interp = function({ text = '', type = 'h3', color, withJs = false }){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'heading';
let tag;

switch (type) {
    case 'h3':
        className += ' heading_type_h3';
        tag = 'h3';
        break;
    case 'h2':
        className += ' heading_type_h2';
        tag = 'h2';
        break;
    case 'inline':
        className += ' heading_type_h3';
        tag = 'span';
        break;
    default:
        tag = 'h1';
        break;
}
switch (color) {
    case 'white':
        className += ' heading_color_white';
        break;
    case 'purple':
        className += ' heading_color_purple';
        break;
    case 'gray':
        className += ' heading_color_gray';
        break;
    case 'inherit':
        className += ' heading_color_inherit';
        break;
    default:
        break;
}
if (withJs) {
  className += ' js-heading';
}

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C" + (tag) + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = text) ? "" : pug_interp)) + "\u003C\u002F" + (tag) + "\u003E";
};
pug_mixins["button"] = pug_interp = function(options = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
const {
    text = 'click me',
    hasLink = false,
    isSubmit = false,
    link = 'change-me',
    modifiers = {},
    withJs = false,
} = options;

let className = 'button';
let headingOptions = {
    text,
    type: 'inline',
    color: 'white',
};

if (hasLink) {
    headingOptions.type = 'h3';
}

if (modifiers.isSecondary) {
    className += ' button_secondary';
    headingOptions.color = 'purple';
}
if (modifiers.withoutFrame) {
    headingOptions.color = 'inherit';
    className += ' button_without-frame';
}
if (modifiers.isLong) {
    className += ' button_long';
}
if (modifiers.isHovered) {
    className += ' button_hovered';
}
if (modifiers.isNarrow) {
    className += ' button_narrow';
}
if (modifiers.isWide) {
    className += ' button_wide';
}
if (withJs) {
  className += ' js-button';
}

switch (modifiers.textColor) {
    case 'white':
        headingOptions.color = 'white';
        break;
    case 'purple':
        headingOptions.color = 'purple';
        break;
    case 'gray':
        headingOptions.color = 'gray';
        break;
    default:
        break;
}

if ((hasLink)) {
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E\u003Ca" + (" class=\"button__text\""+pug.attr("href", link, true, true)) + "\u003E";
pug_indent.push('    ');
pug_mixins["heading"](headingOptions);
pug_indent.pop();
pug_html = pug_html + "\u003C\u002Fa\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"button__arrow\"\u003E";
pug_indent.push('    ');
pug_mixins["arrow"]({
                  type: 'forward',
                  color: 'white',
                });
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
else {
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cbutton" + (pug.attr("class", pug.classes([className], [true]), false, true)+pug.attr("type", isSubmit ? 'submit' : 'button', true, true)) + "\u003E\u003Cspan class=\"button__text\"\u003E";
pug_indent.push('    ');
pug_mixins["heading"](headingOptions);
pug_indent.pop();
pug_html = pug_html + "\u003C\u002Fspan\u003E\u003Cspan class=\"button__arrow\"\u003E";
pug_indent.push('    ');
pug_mixins["arrow"]({
                    type: 'forward',
                    color: 'white',
                });
pug_indent.pop();
pug_html = pug_html + "\u003C\u002Fspan\u003E\u003C\u002Fbutton\u003E";
}
};
pug_mixins["arrow"] = pug_interp = function({ type, color, withoutPadding = false } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'arrow';
let iconName = 'expand_more';

switch (type) {
    case 'expand-less':
        iconName = 'expand_less';
        break;
    case 'forward':
        iconName = 'arrow_forward';
        break;
    default:
        break;
}

switch (color) {
    case 'white':
        className += ' arrow_color_white';
        break;
    case 'purple-gradient':
        className += ' arrow_color_purple-gradient';
        break;
    default:
        break;
}

if (withoutPadding) {
    className += ' arrow_without-padding';
}

pug_html = pug_html + "\u003Cspan" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = iconName) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
};
pug_mixins["navigation"] = pug_interp = function({ items, activeLinkIndex, inColumn = false, withJs = false }){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'navigation';
if (inColumn) {
    className += ' navigation_in-column';
}
if (withJs) {
    className += ' js-navigation';
}
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cnav" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cul class=\"navigation__list\"\u003E";
// iterate items
;(function(){
  var $$obj = items;
  if ('number' == typeof $$obj.length) {
      for (var itemIndex = 0, $$l = $$obj.length; itemIndex < $$l; itemIndex++) {
        var item = $$obj[itemIndex];
const link = item.link || 'change-me';

let itemClassName = 'navigation__item';
if (item.isActive) {
    itemClassName += ' navigation__item_active';
}

pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli" + (pug.attr("class", pug.classes([itemClassName], [true]), false, true)) + "\u003E";
if ((item.subitems)) {
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + ("\u003Cbutton class=\"navigation__link\"\u003E" + (pug.escape(null == (pug_interp = item.name) ? "" : pug_interp)));
pug_indent.push('        ');
pug_mixins["arrow"]({ withoutPadding: true });
pug_indent.pop();
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fbutton\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cul class=\"navigation__subitems\"\u003E";
// iterate item.subitems
;(function(){
  var $$obj = item.subitems;
  if ('number' == typeof $$obj.length) {
      for (var pug_index5 = 0, $$l = $$obj.length; pug_index5 < $$l; pug_index5++) {
        var subitem = $$obj[pug_index5];
pug_html = pug_html + "\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"navigation__subitem\"\u003E\u003Ca" + (" class=\"navigation__link\""+pug.attr("href", subitem.link || 'change-me', true, true)) + "\u003E" + (pug.escape(null == (pug_interp = subitem.name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index5 in $$obj) {
      $$l++;
      var subitem = $$obj[pug_index5];
pug_html = pug_html + "\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"navigation__subitem\"\u003E\u003Ca" + (" class=\"navigation__link\""+pug.attr("href", subitem.link || 'change-me', true, true)) + "\u003E" + (pug.escape(null == (pug_interp = subitem.name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Ful\u003E";
}
else {
pug_html = pug_html + "\u003Ca" + (" class=\"navigation__link\""+pug.attr("href", link, true, true)) + "\u003E" + (pug.escape(null == (pug_interp = item.name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E";
}
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var itemIndex in $$obj) {
      $$l++;
      var item = $$obj[itemIndex];
const link = item.link || 'change-me';

let itemClassName = 'navigation__item';
if (item.isActive) {
    itemClassName += ' navigation__item_active';
}

pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli" + (pug.attr("class", pug.classes([itemClassName], [true]), false, true)) + "\u003E";
if ((item.subitems)) {
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + ("\u003Cbutton class=\"navigation__link\"\u003E" + (pug.escape(null == (pug_interp = item.name) ? "" : pug_interp)));
pug_indent.push('        ');
pug_mixins["arrow"]({ withoutPadding: true });
pug_indent.pop();
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fbutton\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cul class=\"navigation__subitems\"\u003E";
// iterate item.subitems
;(function(){
  var $$obj = item.subitems;
  if ('number' == typeof $$obj.length) {
      for (var pug_index6 = 0, $$l = $$obj.length; pug_index6 < $$l; pug_index6++) {
        var subitem = $$obj[pug_index6];
pug_html = pug_html + "\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"navigation__subitem\"\u003E\u003Ca" + (" class=\"navigation__link\""+pug.attr("href", subitem.link || 'change-me', true, true)) + "\u003E" + (pug.escape(null == (pug_interp = subitem.name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index6 in $$obj) {
      $$l++;
      var subitem = $$obj[pug_index6];
pug_html = pug_html + "\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"navigation__subitem\"\u003E\u003Ca" + (" class=\"navigation__link\""+pug.attr("href", subitem.link || 'change-me', true, true)) + "\u003E" + (pug.escape(null == (pug_interp = subitem.name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Ful\u003E";
}
else {
pug_html = pug_html + "\u003Ca" + (" class=\"navigation__link\""+pug.attr("href", link, true, true)) + "\u003E" + (pug.escape(null == (pug_interp = item.name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E";
}
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Ful\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fnav\u003E";
};
pug_mixins["header"] = pug_interp = function({ userName, activeLink } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cheader class=\"header js-header\"\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"header__container\"\u003E\u003Ca class=\"header__logo\" href=\"landing-page.html\"\u003E\u003Cimg src=\"images\u002Flogo.svg\" alt=\"logo\"\u003E\u003C\u002Fa\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"header__menu js-header__menu\"\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"header__nav-container\"\u003E";
pug_indent.push('        ');
pug_mixins["navigation"]({
                        activeLinkIndex: activeLink,
                        items: [
                            {
                                name: 'О нас',
                            },
                            {
                                name: 'Услуги',
                                subitems: [{ name: 'Заказ комнаты' }],
                            },
                            {
                                name: 'Вакансии',
                            },
                            {
                                name: 'Новости',
                            },
                            {
                                name: 'Соглашения',
                                subitems: [
                                    { name: 'Правила' },
                                    { name: 'Конфиденциальность' },
                                ],
                            },
                        ].map((item, index) => ({ ...item, isActive: activeLink === index })),
                        withJs: true,
                    });
pug_indent.pop();
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
if (userName) {
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"header__user\"\u003E" + (pug.escape(null == (pug_interp = userName) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E";
}
else {
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"header__buttons\"\u003E";
pug_indent.push('        ');
pug_mixins["button"]({
                            text: 'Войти',
                            hasLink: true,
                            link: 'login.html',
                            modifiers: {
                                isSecondary: true,
                                isNarrow: true,
                            },
                        });
pug_indent.pop();
pug_indent.push('        ');
pug_mixins["button"]({
                            text: 'Зарегистрироваться',
                            hasLink: true,
                            link: 'registration.html',
                            modifiers: {
                              isNarrow: true,
                            },
                        });
pug_indent.pop();
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cbutton class=\"header__hamburger js-header__hamburger\"\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"header__hamburger-icon\"\u003E\u003C\u002Fdiv\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fbutton\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fheader\u003E";
};
pug_mixins["arrow"] = pug_interp = function({ type, color, withoutPadding = false } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'arrow';
let iconName = 'expand_more';

switch (type) {
    case 'expand-less':
        iconName = 'expand_less';
        break;
    case 'forward':
        iconName = 'arrow_forward';
        break;
    default:
        break;
}

switch (color) {
    case 'white':
        className += ' arrow_color_white';
        break;
    case 'purple-gradient':
        className += ' arrow_color_purple-gradient';
        break;
    default:
        break;
}

if (withoutPadding) {
    className += ' arrow_without-padding';
}

pug_html = pug_html + "\u003Cspan" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = iconName) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
};
pug_mixins["navigation"] = pug_interp = function({ items, activeLinkIndex, inColumn = false, withJs = false }){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'navigation';
if (inColumn) {
    className += ' navigation_in-column';
}
if (withJs) {
    className += ' js-navigation';
}
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cnav" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cul class=\"navigation__list\"\u003E";
// iterate items
;(function(){
  var $$obj = items;
  if ('number' == typeof $$obj.length) {
      for (var itemIndex = 0, $$l = $$obj.length; itemIndex < $$l; itemIndex++) {
        var item = $$obj[itemIndex];
const link = item.link || 'change-me';

let itemClassName = 'navigation__item';
if (item.isActive) {
    itemClassName += ' navigation__item_active';
}

pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli" + (pug.attr("class", pug.classes([itemClassName], [true]), false, true)) + "\u003E";
if ((item.subitems)) {
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + ("\u003Cbutton class=\"navigation__link\"\u003E" + (pug.escape(null == (pug_interp = item.name) ? "" : pug_interp)));
pug_indent.push('        ');
pug_mixins["arrow"]({ withoutPadding: true });
pug_indent.pop();
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fbutton\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cul class=\"navigation__subitems\"\u003E";
// iterate item.subitems
;(function(){
  var $$obj = item.subitems;
  if ('number' == typeof $$obj.length) {
      for (var pug_index8 = 0, $$l = $$obj.length; pug_index8 < $$l; pug_index8++) {
        var subitem = $$obj[pug_index8];
pug_html = pug_html + "\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"navigation__subitem\"\u003E\u003Ca" + (" class=\"navigation__link\""+pug.attr("href", subitem.link || 'change-me', true, true)) + "\u003E" + (pug.escape(null == (pug_interp = subitem.name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index8 in $$obj) {
      $$l++;
      var subitem = $$obj[pug_index8];
pug_html = pug_html + "\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"navigation__subitem\"\u003E\u003Ca" + (" class=\"navigation__link\""+pug.attr("href", subitem.link || 'change-me', true, true)) + "\u003E" + (pug.escape(null == (pug_interp = subitem.name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Ful\u003E";
}
else {
pug_html = pug_html + "\u003Ca" + (" class=\"navigation__link\""+pug.attr("href", link, true, true)) + "\u003E" + (pug.escape(null == (pug_interp = item.name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E";
}
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var itemIndex in $$obj) {
      $$l++;
      var item = $$obj[itemIndex];
const link = item.link || 'change-me';

let itemClassName = 'navigation__item';
if (item.isActive) {
    itemClassName += ' navigation__item_active';
}

pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli" + (pug.attr("class", pug.classes([itemClassName], [true]), false, true)) + "\u003E";
if ((item.subitems)) {
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + ("\u003Cbutton class=\"navigation__link\"\u003E" + (pug.escape(null == (pug_interp = item.name) ? "" : pug_interp)));
pug_indent.push('        ');
pug_mixins["arrow"]({ withoutPadding: true });
pug_indent.pop();
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fbutton\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cul class=\"navigation__subitems\"\u003E";
// iterate item.subitems
;(function(){
  var $$obj = item.subitems;
  if ('number' == typeof $$obj.length) {
      for (var pug_index9 = 0, $$l = $$obj.length; pug_index9 < $$l; pug_index9++) {
        var subitem = $$obj[pug_index9];
pug_html = pug_html + "\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"navigation__subitem\"\u003E\u003Ca" + (" class=\"navigation__link\""+pug.attr("href", subitem.link || 'change-me', true, true)) + "\u003E" + (pug.escape(null == (pug_interp = subitem.name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index9 in $$obj) {
      $$l++;
      var subitem = $$obj[pug_index9];
pug_html = pug_html + "\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"navigation__subitem\"\u003E\u003Ca" + (" class=\"navigation__link\""+pug.attr("href", subitem.link || 'change-me', true, true)) + "\u003E" + (pug.escape(null == (pug_interp = subitem.name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Ful\u003E";
}
else {
pug_html = pug_html + "\u003Ca" + (" class=\"navigation__link\""+pug.attr("href", link, true, true)) + "\u003E" + (pug.escape(null == (pug_interp = item.name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E";
}
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Ful\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fnav\u003E";
};
pug_mixins["heading"] = pug_interp = function({ text = '', type = 'h3', color, withJs = false }){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'heading';
let tag;

switch (type) {
    case 'h3':
        className += ' heading_type_h3';
        tag = 'h3';
        break;
    case 'h2':
        className += ' heading_type_h2';
        tag = 'h2';
        break;
    case 'inline':
        className += ' heading_type_h3';
        tag = 'span';
        break;
    default:
        tag = 'h1';
        break;
}
switch (color) {
    case 'white':
        className += ' heading_color_white';
        break;
    case 'purple':
        className += ' heading_color_purple';
        break;
    case 'gray':
        className += ' heading_color_gray';
        break;
    case 'inherit':
        className += ' heading_color_inherit';
        break;
    default:
        break;
}
if (withJs) {
  className += ' js-heading';
}

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C" + (tag) + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = text) ? "" : pug_interp)) + "\u003C\u002F" + (tag) + "\u003E";
};
pug_mixins["arrow"] = pug_interp = function({ type, color, withoutPadding = false } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'arrow';
let iconName = 'expand_more';

switch (type) {
    case 'expand-less':
        iconName = 'expand_less';
        break;
    case 'forward':
        iconName = 'arrow_forward';
        break;
    default:
        break;
}

switch (color) {
    case 'white':
        className += ' arrow_color_white';
        break;
    case 'purple-gradient':
        className += ' arrow_color_purple-gradient';
        break;
    default:
        break;
}

if (withoutPadding) {
    className += ' arrow_without-padding';
}

pug_html = pug_html + "\u003Cspan" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = iconName) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
};
pug_mixins["text-field"] = pug_interp = function({ inputOptions = {}, arrowOptions, modifiers = {}, withJs = false } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'text-field';

if (modifiers.isFocused) {
    className += ' text-field_focused';
}
if (modifiers.isShort) {
    className += ' text-field_short';
}
if (modifiers.isBottomFlat) {
    className += ' text-field_flat-bottom';
}
if (modifiers.isClickable) {
    className += ' text-field_clickable';
}

if (withJs) {
    className += ' js-text-field';
}

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E";
let inputClassName = 'text-field__input';
if (arrowOptions) {
    inputClassName += ' text-field__input_with-arrow';
}
if (inputOptions.isMaskedDate) {
    inputClassName += ' text-field__input_masked-date js-text-field__input_masked-date'
}
if (inputOptions.withJs) {
    inputClassName += ' js-text-field__input';
}

pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cinput" + (pug.attr("class", pug.classes([inputClassName], [true]), false, true)+pug.attr("type", inputOptions.type, true, true)+pug.attr("placeholder", inputOptions.placeholder, true, true)+pug.attr("value", inputOptions.value, true, true)+pug.attr("readonly", inputOptions.isReadonly, true, true)) + "\u003E";
if ((arrowOptions)) {
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cbutton" + (" class=\"text-field__arrow\""+pug.attr("type", inputOptions.isSubmit ? 'submit' : 'button', true, true)) + "\u003E";
pug_indent.push('    ');
pug_mixins["arrow"](arrowOptions);
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fbutton\u003E";
}
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
};
pug_mixins["social-links"] = pug_interp = function(){
var block = (this && this.block), attributes = (this && this.attributes) || {};
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cul class=\"social-links\"\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"social-links__item\"\u003E\u003Ca class=\"social-links__link\" href=\"change-me\"\u003E\u003Cspan class=\"social-links__icon fab fa-twitter\"\u003E\u003C\u002Fspan\u003E\u003C\u002Fa\u003E\u003C\u002Fli\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"social-links__item\"\u003E\u003Ca class=\"social-links__link\" href=\"change-me\"\u003E\u003Cspan class=\"social-links__icon fab fa-facebook-square\"\u003E\u003C\u002Fspan\u003E\u003C\u002Fa\u003E\u003C\u002Fli\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"social-links__item\"\u003E\u003Ca class=\"social-links__link\" href=\"change-me\"\u003E\u003Cspan class=\"social-links__icon fab fa-instagram\"\u003E\u003C\u002Fspan\u003E\u003C\u002Fa\u003E\u003C\u002Fli\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Ful\u003E";
};
pug_mixins["footer"] = pug_interp = function(){
var block = (this && this.block), attributes = (this && this.attributes) || {};
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cfooter class=\"footer\"\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"footer__body\"\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"footer__main-info\"\u003E\u003Ca href=\"landing-page.html\"\u003E\u003Cimg src=\"images\u002Flogo.svg\" alt=\"logo\"\u003E\u003C\u002Fa\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cp class=\"footer__description\"\u003EБронирование номеров в лучшем отеле 2019 года по версии ассоциации «Отельные взгляды»\u003C\u002Fp\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"footer__menu\"\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"footer__nav\"\u003E\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"footer__subtitle\"\u003E";
pug_indent.push('          ');
pug_mixins["heading"]({ text: 'Навигация' });
pug_indent.pop();
pug_html = pug_html + "\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
pug_indent.push('        ');
pug_mixins["navigation"]({
                        items: [
                            { name: 'О нас' },
                            { name: 'Новости' },
                            { name: 'Служба поддержки' },
                            { name: 'Услуги' },
                        ],
                        inColumn: true,
                    });
pug_indent.pop();
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"footer__nav\"\u003E\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"footer__subtitle\"\u003E";
pug_indent.push('          ');
pug_mixins["heading"]({ text: 'О нас' });
pug_indent.pop();
pug_html = pug_html + "\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
pug_indent.push('        ');
pug_mixins["navigation"]({
                        items: [
                            { name: 'О сервисе' },
                            { name: 'Наша команда' },
                            { name: 'Вакансии' },
                            { name: 'Инвесторы' },
                        ],
                        inColumn: true,
                    });
pug_indent.pop();
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"footer__nav\"\u003E\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"footer__subtitle\"\u003E";
pug_indent.push('          ');
pug_mixins["heading"]({ text: 'Служба поддержки' });
pug_indent.pop();
pug_html = pug_html + "\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
pug_indent.push('        ');
pug_mixins["navigation"]({
                        items: [
                            { name: 'Соглашения' },
                            { name: 'Сообщества' },
                            { name: 'Связь с нами' },
                        ],
                        inColumn: true,
                    });
pug_indent.pop();
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cform class=\"footer__subscription\"\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"footer__subtitle footer__subtitle_without-margin-bottom\"\u003E";
pug_indent.push('        ');
pug_mixins["heading"]({ text: 'Подписка' });
pug_indent.pop();
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"footer__subscription-text\"\u003EПолучайте специальные предложения и новости сервиса\u003C\u002Fdiv\u003E";
pug_indent.push('      ');
pug_mixins["text-field"]({
                    inputOptions: {
                        placeholder: 'Email',
                        type: 'email',
                        isSubmit: true,
                    },
                    modifiers: {
                        isShort: true,
                    },
                    arrowOptions: {
                        type: 'forward',
                        color: 'purple-gradient',
                    },
                });
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fform\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"footer__bottom\"\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"footer__bottom-container\"\u003E\u003Cspan class=\"footer__copyright\"\u003ECopyright © 2018 Toxin отель. Все права защищены.\u003C\u002Fspan\u003E";
pug_indent.push('      ');
pug_mixins["social-links"]();
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Ffooter\u003E";
};
const title = 'Room details';
const name = 'room-details';
pug_html = pug_html + "\u003C!DOCTYPE html\u003E\n\u003Chtml lang=\"ru\"\u003E\n  \u003Chead\u003E\n    \u003Cmeta charset=\"utf-8\"\u003E\n    \u003Cmeta" + (" name=\"description\""+pug.attr("content", `Toxin Hotel. Room reservations. ${title}`, true, true)) + "\u003E\n    \u003Cmeta name=\"keywords\" content=\"toxin, hotel, отель, забронировать, room, комнаты, book, reservation\"\u003E\n    \u003Cmeta name=\"viewport\" content=\"initial-scale=1.0, width=device-width\"\u003E\n    \u003Clink" + (" rel=\"apple-touch-icon\" sizes=\"180x180\""+pug.attr("href", __webpack_require__(6).default, true, true)) + "\u003E\n    \u003Clink" + (" rel=\"icon\" type=\"image\u002Fpng\" sizes=\"32x32\""+pug.attr("href", __webpack_require__(8).default, true, true)) + "\u003E\n    \u003Clink" + (" rel=\"icon\" type=\"image\u002Fpng\" sizes=\"16x16\""+pug.attr("href", __webpack_require__(7).default, true, true)) + "\u003E\n    \u003Clink rel=\"manifest\" href=\".\u002Fsite.webmanifest\"\u003E\n    \u003Clink" + (" rel=\"mask-icon\""+pug.attr("href", __webpack_require__(10).default, true, true)+" color=\"#bc9cff\"") + "\u003E\n    \u003Clink" + (" rel=\"shortcut icon\""+pug.attr("href", __webpack_require__(9).default, true, true)) + "\u003E\n    \u003Cmeta name=\"msapplication-TileColor\" content=\"#603cba\"\u003E\n    \u003Cmeta name=\"msapplication-config\" content=\".\u002Fbrowserconfig.xml\"\u003E\n    \u003Cmeta name=\"theme-color\" content=\"#ffffff\"\u003E\n    \u003Ctitle\u003E" + (pug.escape(null == (pug_interp = title) ? "" : pug_interp)) + "\u003C\u002Ftitle\u003E\n  \u003C\u002Fhead\u003E\n  \u003Cbody\u003E";
pug_indent.push('    ');
pug_mixins["header"]({ activeLink });
pug_indent.pop();
pug_html = pug_html + "\n    \u003Cmain\u003E\n      \u003Cmain class=\"room-details\"\u003E\n        \u003Cheader class=\"room-details__room-images\"\u003E\n          \u003Cdiv class=\"room-details__main-image-container\"\u003E\u003Cimg class=\"room-details__main-image\" src=\"images\u002Froom_1.jpg\" alt=\"room-card-img\"\u003E\u003C\u002Fdiv\u003E\n          \u003Cdiv class=\"room-details__side-image-container\"\u003E\u003Cimg class=\"room-details__side-image\" src=\"images\u002Froom_2.jpg\" alt=\"room-card-img\"\u003E\u003C\u002Fdiv\u003E\n          \u003Cdiv class=\"room-details__side-image-container\"\u003E\u003Cimg class=\"room-details__side-image\" src=\"images\u002Froom_3.jpg\" alt=\"room-card-img\"\u003E\u003C\u002Fdiv\u003E\n        \u003C\u002Fheader\u003E\n        \u003Cdiv class=\"container\"\u003E\n          \u003Cdiv class=\"room-details__container\"\u003E\n            \u003Carticle class=\"room-details__room-info\"\u003E\n              \u003Cdiv class=\"room-details__room-info-title\"\u003E";
pug_indent.push('                ');
pug_mixins["heading"]({
                            type: 'h2',
                            text: 'Сведения о номере',
                        });
pug_indent.pop();
pug_html = pug_html + "\n              \u003C\u002Fdiv\u003E";
pug_indent.push('              ');
pug_mixins["icon-text-list"]([
                        {
                            title: 'Комфорт',
                            description: 'Шумопоглощающие стены',
                            iconName: 'insert_emoticon',
                        },
                        {
                            title: 'Удобство',
                            description: 'Окно в каждой из спален',
                            iconName: 'location_city',
                        },
                        {
                            title: 'Уют',
                            description: 'Номер оснащён камином',
                            iconName: 'whatshot',
                        },
                    ]);
pug_indent.pop();
pug_html = pug_html + "\n            \u003C\u002Farticle\u003E\n            \u003Carticle class=\"room-details__expressions\"\u003E\n              \u003Cdiv class=\"room-details__expressions-title\"\u003E";
pug_indent.push('                ');
pug_mixins["heading"]({
                            type: 'h2',
                            text: 'Впечатления от номера',
                        });
pug_indent.pop();
pug_html = pug_html + "\n              \u003C\u002Fdiv\u003E";
pug_indent.push('              ');
pug_mixins["donut-chart"]();
pug_indent.pop();
pug_html = pug_html + "\n            \u003C\u002Farticle\u003E\n            \u003Carticle class=\"room-details__comments\"\u003E\n              \u003Cdiv class=\"room-details__comments-title\"\u003E";
pug_indent.push('                ');
pug_mixins["heading"]({
                            type: 'h2',
                            text: 'Отзывы посетителей номера',
                        });
pug_indent.pop();
pug_html = pug_html + "\u003Cspan class=\"room-details__comments-number\"\u003E2 отзыва\u003C\u002Fspan\u003E\n              \u003C\u002Fdiv\u003E\n              \u003Cdiv class=\"room-details__comment\"\u003E";
pug_indent.push('                ');
pug_mixins["comment"]({
                            avatarLink: 'images/avatar_murad.png',
                            userName: 'Мурад Сарафанов',
                            dateText: '5 дней назад',
                            dateTime: '2021-05-15 19:00',
                            text: `Великолепный матрас на кровати в основной спальне! А пуфик вообще потрясающий.
                                И стены, действительно, шумоподавляющие. Выкрикивал комплименты повару — никто не жаловался из соседей.`,
                            likeOptions: {
                                likesNum: 12,
                                isActive: true,
                            },
                        });
pug_indent.pop();
pug_html = pug_html + "\n              \u003C\u002Fdiv\u003E\n              \u003Cdiv class=\"room-details__comment\"\u003E";
pug_indent.push('                ');
pug_mixins["comment"]({
                            avatarLink: 'images/avatar_patricia.png',
                            userName: 'Патрисия Стёклышкова',
                            dateText: 'Неделю назад',
                            dateTime: '2021-05-15 19:00',
                            text: `Обслуживание на высоте! Всё аккуратно, чисто. Завтраки в номер советую заказать,
                                каждый день новое блюдо и десерт как комплимент`,
                            likeOptions: {
                                likesNum: 2,
                                isActive: false,
                            },
                        });
pug_indent.pop();
pug_html = pug_html + "\n              \u003C\u002Fdiv\u003E\n            \u003C\u002Farticle\u003E\n            \u003Carticle class=\"room-details__rules\"\u003E\n              \u003Cdiv class=\"room-details__rules-title\"\u003E";
pug_indent.push('                ');
pug_mixins["heading"]({
                          type: 'h2',
                          text: 'Правила',
                        });
pug_indent.pop();
pug_html = pug_html + "\n              \u003C\u002Fdiv\u003E";
pug_indent.push('              ');
pug_mixins["bullet-list"]([
                        'Нельзя с питомцами',
                        'Без вечеринок и мероприятий',
                        'Время прибытия — после 13:00,<br>а выезд до 12:00',
                    ]);
pug_indent.pop();
pug_html = pug_html + "\n            \u003C\u002Farticle\u003E\n            \u003Carticle class=\"room-details__cancel\"\u003E\n              \u003Cdiv class=\"room-details__cancel-title\"\u003E";
pug_indent.push('                ');
pug_mixins["heading"]({
                            type: 'h2',
                            text: 'Отмена',
                        });
pug_indent.pop();
pug_html = pug_html + "\n              \u003C\u002Fdiv\u003E\u003Cspan\u003E\n                Бесплатная отмена в течение 48 ч. После\u003Cbr\u003Eэтого при отмене не позднее чем\n                за 5 дн.\n                до прибытия вы получите полный возврат за вычетом сбора за услуги.\u003C\u002Fspan\u003E\n            \u003C\u002Farticle\u003E\n            \u003Caside class=\"room-details__booking-card\"\u003E";
pug_indent.push('              ');
pug_mixins["booking-card"]({
                        roomInfo: {
                            number: 888,
                            type: 'люкс',
                            price: '9 990',
                            isNameBig: true,
                        },
                        bookingItems: [
                            {
                                text: '9 990₽ х 4 суток',
                                price: '39 960',
                            },
                            {
                                  text: 'Сбор за услуги: скидка 2 179₽',
                                  price: 0,
                                  tooltip: 'Питание',
                            },
                            {
                                  text: 'Сбор за дополнительные услуги',
                                  price: '300',
                                  tooltip: 'Постельное белье',
                            },
                        ],
                        totalPrice: '38 081',
                    });
pug_indent.pop();
pug_html = pug_html + "\n            \u003C\u002Faside\u003E\n          \u003C\u002Fdiv\u003E\n        \u003C\u002Fdiv\u003E\n      \u003C\u002Fmain\u003E\n    \u003C\u002Fmain\u003E";
pug_indent.push('    ');
pug_mixins["footer"]();
pug_indent.pop();
pug_html = pug_html + "\n  \u003C\u002Fbody\u003E\n\u003C\u002Fhtml\u003E";
    }.call(this, "Array" in locals_for_with ?
        locals_for_with.Array :
        typeof Array !== 'undefined' ? Array : undefined, "Date" in locals_for_with ?
        locals_for_with.Date :
        typeof Date !== 'undefined' ? Date : undefined, "JSON" in locals_for_with ?
        locals_for_with.JSON :
        typeof JSON !== 'undefined' ? JSON : undefined, "activeLink" in locals_for_with ?
        locals_for_with.activeLink :
        typeof activeLink !== 'undefined' ? activeLink : undefined, "pug_indent" in locals_for_with ?
        locals_for_with.pug_indent :
        typeof pug_indent !== 'undefined' ? pug_indent : undefined));
    ;;return pug_html;};
module.exports = template;

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(2);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;
    var locals_for_with = (locals || {});
    
    (function (Array, JSON, Math, activeLink, pug_indent) {
      var pug_indent = [];
pug_mixins["arrow"] = pug_interp = function({ type, color, withoutPadding = false } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'arrow';
let iconName = 'expand_more';

switch (type) {
    case 'expand-less':
        iconName = 'expand_less';
        break;
    case 'forward':
        iconName = 'arrow_forward';
        break;
    default:
        break;
}

switch (color) {
    case 'white':
        className += ' arrow_color_white';
        break;
    case 'purple-gradient':
        className += ' arrow_color_purple-gradient';
        break;
    default:
        break;
}

if (withoutPadding) {
    className += ' arrow_without-padding';
}

pug_html = pug_html + "\u003Cspan" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = iconName) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
};
pug_mixins["text-field"] = pug_interp = function({ inputOptions = {}, arrowOptions, modifiers = {}, withJs = false } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'text-field';

if (modifiers.isFocused) {
    className += ' text-field_focused';
}
if (modifiers.isShort) {
    className += ' text-field_short';
}
if (modifiers.isBottomFlat) {
    className += ' text-field_flat-bottom';
}
if (modifiers.isClickable) {
    className += ' text-field_clickable';
}

if (withJs) {
    className += ' js-text-field';
}

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E";
let inputClassName = 'text-field__input';
if (arrowOptions) {
    inputClassName += ' text-field__input_with-arrow';
}
if (inputOptions.isMaskedDate) {
    inputClassName += ' text-field__input_masked-date js-text-field__input_masked-date'
}
if (inputOptions.withJs) {
    inputClassName += ' js-text-field__input';
}

pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cinput" + (pug.attr("class", pug.classes([inputClassName], [true]), false, true)+pug.attr("type", inputOptions.type, true, true)+pug.attr("placeholder", inputOptions.placeholder, true, true)+pug.attr("value", inputOptions.value, true, true)+pug.attr("readonly", inputOptions.isReadonly, true, true)) + "\u003E";
if ((arrowOptions)) {
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cbutton" + (" class=\"text-field__arrow\""+pug.attr("type", inputOptions.isSubmit ? 'submit' : 'button', true, true)) + "\u003E";
pug_indent.push('    ');
pug_mixins["arrow"](arrowOptions);
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fbutton\u003E";
}
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
};
pug_mixins["dropdown"] = pug_interp = function(options = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let {
    inputOptions = {},
    popupMixinOptions = {},
    popupHidden = true,
    title,
    isDouble = false,
    isShort = false,
    isPopupDistant = false,
    defaultInputValue = '',
} = options;

let className = 'dropdown js-dropdown';
if (isDouble) {
    className += ' dropdown_double';
}
if (isShort) {
  className += ' dropdown_short';
}
if (isPopupDistant) {
  className += ' dropdown_with-distant-popup';
}

if (isDouble) {
    if (!Array.isArray(title)) {
        title = [title, title];
    }
    if (!Array.isArray(inputOptions)) {
        inputOptions = [inputOptions, inputOptions];
    }
}
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Csection" + (pug.attr("class", pug.classes([className], [true]), false, true)+pug.attr("data-default-value", JSON.stringify(defaultInputValue), true, true)) + "\u003E";
if ((isDouble)) {
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"dropdown__text-field js-dropdown__text-field\"\u003E";
if ((title[0])) {
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"dropdown__title\"\u003E";
pug_indent.push('      ');
pug_mixins["heading"]({
                            text: title[0],
                        });
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
pug_indent.push('    ');
pug_mixins["text-field"]({
                    inputOptions: {
                        ...inputOptions[0],
                        isMaskedDate: false,
                        isReadonly: true,
                        withJs: true,
                    },
                    arrowOptions: {},
                    modifiers: {
                        isFocused: !popupHidden,
                        isBottomFlat: !popupHidden,
                        isClickable: true,
                    },
                    withJs: true,
                });
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"dropdown__text-field js-dropdown__text-field\"\u003E";
if ((title[1])) {
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"dropdown__title\"\u003E";
pug_indent.push('      ');
pug_mixins["heading"]({
                            text: title[1],
                        });
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
pug_indent.push('    ');
pug_mixins["text-field"]({
                    inputOptions: {
                        ...inputOptions[1],
                        isMaskedDate: false,
                        isReadonly: true,
                        withJs: true,
                    },
                    arrowOptions: {},
                    modifiers: {
                        isFocused: !popupHidden,
                        isBottomFlat: !popupHidden,
                        isClickable: true,
                    },
                    withJs: true,
                });
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
else {
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"dropdown__text-field js-dropdown__text-field\"\u003E";
if ((title)) {
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"dropdown__title\"\u003E";
pug_indent.push('      ');
pug_mixins["heading"]({
                            text: title,
                        });
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
pug_indent.push('    ');
pug_mixins["text-field"]({
                    inputOptions: {
                        ...inputOptions,
                        isMaskedDate: false,
                        isReadonly: true,
                        withJs: true,
                    },
                    arrowOptions: {},
                    modifiers: {
                        isFocused: !popupHidden,
                        isBottomFlat: !popupHidden,
                        isClickable: true,
                    },
                    withJs: true,
                });
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv" + (pug.attr("class", pug.classes(["dropdown__popup","js-dropdown__popup",`${popupHidden ? 'dropdown__popup_hidden' : false}`], [false,false,true]), false, true)) + "\u003E";
if ((popupMixinOptions.name)) {
pug_indent.push('    ');
pug_mixins[popupMixinOptions.name](popupMixinOptions.params);
pug_indent.pop();
}
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fsection\u003E";
};
pug_mixins["heading"] = pug_interp = function({ text = '', type = 'h3', color, withJs = false }){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'heading';
let tag;

switch (type) {
    case 'h3':
        className += ' heading_type_h3';
        tag = 'h3';
        break;
    case 'h2':
        className += ' heading_type_h2';
        tag = 'h2';
        break;
    case 'inline':
        className += ' heading_type_h3';
        tag = 'span';
        break;
    default:
        tag = 'h1';
        break;
}
switch (color) {
    case 'white':
        className += ' heading_color_white';
        break;
    case 'purple':
        className += ' heading_color_purple';
        break;
    case 'gray':
        className += ' heading_color_gray';
        break;
    case 'inherit':
        className += ' heading_color_inherit';
        break;
    default:
        break;
}
if (withJs) {
  className += ' js-heading';
}

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C" + (tag) + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = text) ? "" : pug_interp)) + "\u003C\u002F" + (tag) + "\u003E";
};
pug_mixins["counting-item"] = pug_interp = function({ name = '', value = 0, nameDeclensions } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv" + (" class=\"counting-item js-counting-item\""+pug.attr("data-words", nameDeclensions ? JSON.stringify(nameDeclensions) : false, true, true)) + "\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"counting-item__name js-counting-item__name\"\u003E";
pug_indent.push('    ');
pug_mixins["heading"]({
                text: name,
                withJs: true,
            });
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"counting-item__counter\"\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cbutton class=\"counting-item__change-button counting-item__change-button_action_decrease js-counting-item__change-button_action_decrease\" type=\"button\"\u003E-\u003C\u002Fbutton\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"counting-item__value js-counting-item__value\"\u003E";
pug_indent.push('      ');
pug_mixins["heading"]({
                    text: value,
                    withJs: true,
                });
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cbutton class=\"counting-item__change-button counting-item__change-button_action_increase js-counting-item__change-button_action_increase\" type=\"button\"\u003E+\u003C\u002Fbutton\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
};
pug_mixins["arrow"] = pug_interp = function({ type, color, withoutPadding = false } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'arrow';
let iconName = 'expand_more';

switch (type) {
    case 'expand-less':
        iconName = 'expand_less';
        break;
    case 'forward':
        iconName = 'arrow_forward';
        break;
    default:
        break;
}

switch (color) {
    case 'white':
        className += ' arrow_color_white';
        break;
    case 'purple-gradient':
        className += ' arrow_color_purple-gradient';
        break;
    default:
        break;
}

if (withoutPadding) {
    className += ' arrow_without-padding';
}

pug_html = pug_html + "\u003Cspan" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = iconName) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
};
pug_mixins["heading"] = pug_interp = function({ text = '', type = 'h3', color, withJs = false }){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'heading';
let tag;

switch (type) {
    case 'h3':
        className += ' heading_type_h3';
        tag = 'h3';
        break;
    case 'h2':
        className += ' heading_type_h2';
        tag = 'h2';
        break;
    case 'inline':
        className += ' heading_type_h3';
        tag = 'span';
        break;
    default:
        tag = 'h1';
        break;
}
switch (color) {
    case 'white':
        className += ' heading_color_white';
        break;
    case 'purple':
        className += ' heading_color_purple';
        break;
    case 'gray':
        className += ' heading_color_gray';
        break;
    case 'inherit':
        className += ' heading_color_inherit';
        break;
    default:
        break;
}
if (withJs) {
  className += ' js-heading';
}

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C" + (tag) + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = text) ? "" : pug_interp)) + "\u003C\u002F" + (tag) + "\u003E";
};
pug_mixins["button"] = pug_interp = function(options = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
const {
    text = 'click me',
    hasLink = false,
    isSubmit = false,
    link = 'change-me',
    modifiers = {},
    withJs = false,
} = options;

let className = 'button';
let headingOptions = {
    text,
    type: 'inline',
    color: 'white',
};

if (hasLink) {
    headingOptions.type = 'h3';
}

if (modifiers.isSecondary) {
    className += ' button_secondary';
    headingOptions.color = 'purple';
}
if (modifiers.withoutFrame) {
    headingOptions.color = 'inherit';
    className += ' button_without-frame';
}
if (modifiers.isLong) {
    className += ' button_long';
}
if (modifiers.isHovered) {
    className += ' button_hovered';
}
if (modifiers.isNarrow) {
    className += ' button_narrow';
}
if (modifiers.isWide) {
    className += ' button_wide';
}
if (withJs) {
  className += ' js-button';
}

switch (modifiers.textColor) {
    case 'white':
        headingOptions.color = 'white';
        break;
    case 'purple':
        headingOptions.color = 'purple';
        break;
    case 'gray':
        headingOptions.color = 'gray';
        break;
    default:
        break;
}

if ((hasLink)) {
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E\u003Ca" + (" class=\"button__text\""+pug.attr("href", link, true, true)) + "\u003E";
pug_indent.push('    ');
pug_mixins["heading"](headingOptions);
pug_indent.pop();
pug_html = pug_html + "\u003C\u002Fa\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"button__arrow\"\u003E";
pug_indent.push('    ');
pug_mixins["arrow"]({
                  type: 'forward',
                  color: 'white',
                });
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
else {
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cbutton" + (pug.attr("class", pug.classes([className], [true]), false, true)+pug.attr("type", isSubmit ? 'submit' : 'button', true, true)) + "\u003E\u003Cspan class=\"button__text\"\u003E";
pug_indent.push('    ');
pug_mixins["heading"](headingOptions);
pug_indent.pop();
pug_html = pug_html + "\u003C\u002Fspan\u003E\u003Cspan class=\"button__arrow\"\u003E";
pug_indent.push('    ');
pug_mixins["arrow"]({
                    type: 'forward',
                    color: 'white',
                });
pug_indent.pop();
pug_html = pug_html + "\u003C\u002Fspan\u003E\u003C\u002Fbutton\u003E";
}
};
pug_mixins["items-counter"] = pug_interp = function(options = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
const {
    items,
    withoutButtons = false,
    wordForValueTextReplacing = null,
    itemIndexForSeparateCount = null,
} = options;

let className = 'items-counter js-items-counter';
if (withoutButtons) {
    className += ' items-counter_without-buttons';
}
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv" + (pug.attr("class", pug.classes([className], [true]), false, true)+pug.attr("data-replace-text", JSON.stringify(wordForValueTextReplacing), true, true)+pug.attr("data-separate-item", JSON.stringify(itemIndexForSeparateCount), true, true)) + "\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cul class=\"items-counter__items-list\"\u003E";
// iterate items
;(function(){
  var $$obj = items;
  if ('number' == typeof $$obj.length) {
      for (var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++) {
        var item = $$obj[pug_index0];
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"items-counter__item\"\u003E";
pug_indent.push('      ');
pug_mixins["counting-item"]({
                        name: item.name,
                        value: item.value,
                        nameDeclensions: item.nameDeclensions,
                    });
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index0 in $$obj) {
      $$l++;
      var item = $$obj[pug_index0];
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"items-counter__item\"\u003E";
pug_indent.push('      ');
pug_mixins["counting-item"]({
                        name: item.name,
                        value: item.value,
                        nameDeclensions: item.nameDeclensions,
                    });
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Ful\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"items-counter__button-panel\"\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"items-counter__clear-button js-items-counter__clear-button\"\u003E";
pug_indent.push('      ');
pug_mixins["button"]({
                    text: 'Очистить',
                    hasLink: false,
                    modifiers: {
                        withoutFrame: true,
                    }
                });
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"items-counter__apply-button js-items-counter__apply-button\"\u003E";
pug_indent.push('      ');
pug_mixins["button"]({
                    text: 'Применить',
                    hasLink: false,
                    modifiers: {
                        withoutFrame: true,
                    }
                });
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
};
pug_mixins["date-picker"] = pug_interp = function(options = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
const {
    withBorder = false,
    dateFormat = null,
    initialDate = [null, null],
    isTextDouble = false,
} = options;

let className = 'date-picker js-date-picker';
if (withBorder) {
    className += ' date-picker_with-border';
}
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv" + (pug.attr("class", pug.classes([className], [true]), false, true)+pug.attr("data-date-format", dateFormat, true, true)+pug.attr("data-initial-date", initialDate, true, true)+pug.attr("data-is-text-double", isTextDouble ? 'true' : 'false', true, true)) + "\u003E\u003C\u002Fdiv\u003E";
};
pug_mixins["heading"] = pug_interp = function({ text = '', type = 'h3', color, withJs = false }){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'heading';
let tag;

switch (type) {
    case 'h3':
        className += ' heading_type_h3';
        tag = 'h3';
        break;
    case 'h2':
        className += ' heading_type_h2';
        tag = 'h2';
        break;
    case 'inline':
        className += ' heading_type_h3';
        tag = 'span';
        break;
    default:
        tag = 'h1';
        break;
}
switch (color) {
    case 'white':
        className += ' heading_color_white';
        break;
    case 'purple':
        className += ' heading_color_purple';
        break;
    case 'gray':
        className += ' heading_color_gray';
        break;
    case 'inherit':
        className += ' heading_color_inherit';
        break;
    default:
        break;
}
if (withJs) {
  className += ' js-heading';
}

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C" + (tag) + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = text) ? "" : pug_interp)) + "\u003C\u002F" + (tag) + "\u003E";
};
pug_mixins["range-slider"] = pug_interp = function(title, description = false){
var block = (this && this.block), attributes = (this && this.attributes) || {};
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"range-slider js-range-slider\"\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"range-slider__info\"\u003E";
pug_indent.push('    ');
pug_mixins["heading"]({ text: title });
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Coutput class=\"range-slider__value js-range-slider__value\"\u003E\u003C\u002Foutput\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"range-slider__slider js-range-slider__slider\"\u003E\u003C\u002Fdiv\u003E";
if (description) {
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cp class=\"range-slider__description\"\u003E" + (pug.escape(null == (pug_interp = description) ? "" : pug_interp)) + "\u003C\u002Fp\u003E";
}
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
};
pug_mixins["checkbox-buttons"] = pug_interp = function({ items, isRich = false, theme }){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'checkbox-buttons';
if (isRich) {
    className += ' checkbox-buttons_rich';
}
if (theme === 'toggle') {
    className += ' checkbox-buttons_theme_toggle';
}
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cul" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E";
// iterate items
;(function(){
  var $$obj = items;
  if ('number' == typeof $$obj.length) {
      for (var pug_index1 = 0, $$l = $$obj.length; pug_index1 < $$l; pug_index1++) {
        var item = $$obj[pug_index1];
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"checkbox-buttons__item\"\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Clabel class=\"checkbox-buttons__button\"\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cinput" + (" class=\"checkbox-buttons__input\""+" type=\"checkbox\""+pug.attr("checked", item.checked, true, true)) + "\u003E\u003Cspan class=\"checkbox-buttons__name\"\u003E" + (null == (pug_interp = item.name) ? "" : pug_interp) + "\u003C\u002Fspan\u003E";
if ((isRich)) {
pug_html = pug_html + "\u003Cspan class=\"checkbox-buttons__description\"\u003E" + (null == (pug_interp = item.description) ? "" : pug_interp) + "\u003C\u002Fspan\u003E";
}
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Flabel\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index1 in $$obj) {
      $$l++;
      var item = $$obj[pug_index1];
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"checkbox-buttons__item\"\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Clabel class=\"checkbox-buttons__button\"\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cinput" + (" class=\"checkbox-buttons__input\""+" type=\"checkbox\""+pug.attr("checked", item.checked, true, true)) + "\u003E\u003Cspan class=\"checkbox-buttons__name\"\u003E" + (null == (pug_interp = item.name) ? "" : pug_interp) + "\u003C\u002Fspan\u003E";
if ((isRich)) {
pug_html = pug_html + "\u003Cspan class=\"checkbox-buttons__description\"\u003E" + (null == (pug_interp = item.description) ? "" : pug_interp) + "\u003C\u002Fspan\u003E";
}
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Flabel\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Ful\u003E";
};
pug_mixins["heading"] = pug_interp = function({ text = '', type = 'h3', color, withJs = false }){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'heading';
let tag;

switch (type) {
    case 'h3':
        className += ' heading_type_h3';
        tag = 'h3';
        break;
    case 'h2':
        className += ' heading_type_h2';
        tag = 'h2';
        break;
    case 'inline':
        className += ' heading_type_h3';
        tag = 'span';
        break;
    default:
        tag = 'h1';
        break;
}
switch (color) {
    case 'white':
        className += ' heading_color_white';
        break;
    case 'purple':
        className += ' heading_color_purple';
        break;
    case 'gray':
        className += ' heading_color_gray';
        break;
    case 'inherit':
        className += ' heading_color_inherit';
        break;
    default:
        break;
}
if (withJs) {
  className += ' js-heading';
}

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C" + (tag) + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = text) ? "" : pug_interp)) + "\u003C\u002F" + (tag) + "\u003E";
};
pug_mixins["arrow"] = pug_interp = function({ type, color, withoutPadding = false } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'arrow';
let iconName = 'expand_more';

switch (type) {
    case 'expand-less':
        iconName = 'expand_less';
        break;
    case 'forward':
        iconName = 'arrow_forward';
        break;
    default:
        break;
}

switch (color) {
    case 'white':
        className += ' arrow_color_white';
        break;
    case 'purple-gradient':
        className += ' arrow_color_purple-gradient';
        break;
    default:
        break;
}

if (withoutPadding) {
    className += ' arrow_without-padding';
}

pug_html = pug_html + "\u003Cspan" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = iconName) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
};
pug_mixins["checkbox-buttons"] = pug_interp = function({ items, isRich = false, theme }){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'checkbox-buttons';
if (isRich) {
    className += ' checkbox-buttons_rich';
}
if (theme === 'toggle') {
    className += ' checkbox-buttons_theme_toggle';
}
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cul" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E";
// iterate items
;(function(){
  var $$obj = items;
  if ('number' == typeof $$obj.length) {
      for (var pug_index2 = 0, $$l = $$obj.length; pug_index2 < $$l; pug_index2++) {
        var item = $$obj[pug_index2];
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"checkbox-buttons__item\"\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Clabel class=\"checkbox-buttons__button\"\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cinput" + (" class=\"checkbox-buttons__input\""+" type=\"checkbox\""+pug.attr("checked", item.checked, true, true)) + "\u003E\u003Cspan class=\"checkbox-buttons__name\"\u003E" + (null == (pug_interp = item.name) ? "" : pug_interp) + "\u003C\u002Fspan\u003E";
if ((isRich)) {
pug_html = pug_html + "\u003Cspan class=\"checkbox-buttons__description\"\u003E" + (null == (pug_interp = item.description) ? "" : pug_interp) + "\u003C\u002Fspan\u003E";
}
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Flabel\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index2 in $$obj) {
      $$l++;
      var item = $$obj[pug_index2];
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"checkbox-buttons__item\"\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Clabel class=\"checkbox-buttons__button\"\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cinput" + (" class=\"checkbox-buttons__input\""+" type=\"checkbox\""+pug.attr("checked", item.checked, true, true)) + "\u003E\u003Cspan class=\"checkbox-buttons__name\"\u003E" + (null == (pug_interp = item.name) ? "" : pug_interp) + "\u003C\u002Fspan\u003E";
if ((isRich)) {
pug_html = pug_html + "\u003Cspan class=\"checkbox-buttons__description\"\u003E" + (null == (pug_interp = item.description) ? "" : pug_interp) + "\u003C\u002Fspan\u003E";
}
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Flabel\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Ful\u003E";
};
pug_mixins["expandable-checkboxes"] = pug_interp = function({ title = 'Expandable checkbox list', items, expanded = false }){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'expandable-checkboxes js-expandable-checkboxes';
if (expanded) {
    className += ' expandable-checkboxes_expanded';
}
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"expandable-checkboxes__title js-expandable-checkboxes__title\" role=\"button\"\u003E";
pug_indent.push('    ');
pug_mixins["heading"]({ text: title });
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"expandable-checkboxes__arrow\"\u003E";
pug_indent.push('      ');
pug_mixins["arrow"]();
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"expandable-checkboxes__checkboxes js-expandable-checkboxes__checkboxes\"\u003E";
pug_indent.push('    ');
pug_mixins["checkbox-buttons"]({ items });
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
};
pug_mixins["heading"] = pug_interp = function({ text = '', type = 'h3', color, withJs = false }){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'heading';
let tag;

switch (type) {
    case 'h3':
        className += ' heading_type_h3';
        tag = 'h3';
        break;
    case 'h2':
        className += ' heading_type_h2';
        tag = 'h2';
        break;
    case 'inline':
        className += ' heading_type_h3';
        tag = 'span';
        break;
    default:
        tag = 'h1';
        break;
}
switch (color) {
    case 'white':
        className += ' heading_color_white';
        break;
    case 'purple':
        className += ' heading_color_purple';
        break;
    case 'gray':
        className += ' heading_color_gray';
        break;
    case 'inherit':
        className += ' heading_color_inherit';
        break;
    default:
        break;
}
if (withJs) {
  className += ' js-heading';
}

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C" + (tag) + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = text) ? "" : pug_interp)) + "\u003C\u002F" + (tag) + "\u003E";
};
pug_mixins["room-info"] = pug_interp = function({ number, type, price, isNameBig = false }){
var block = (this && this.block), attributes = (this && this.attributes) || {};
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv" + (pug.attr("class", pug.classes([`room-info${isNameBig ? ' room-info_size_big' : ''}`], [true]), false, true)) + "\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cheader class=\"room-info__name\"\u003E\u003Cspan class=\"room-info__number-sign\"\u003E№\u003C\u002Fspan\u003E";
if ((isNameBig)) {
pug_indent.push('    ');
pug_mixins["heading"]({
                  text: number,
                  type: 'h1',
                });
pug_indent.pop();
}
else {
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Ch3 class=\"room-info__number\"\u003E" + (pug.escape(null == (pug_interp = number) ? "" : pug_interp)) + "\u003C\u002Fh3\u003E";
}
if ((type)) {
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"room-info__type\"\u003E";
pug_indent.push('      ');
pug_mixins["heading"]({
                        text: type,
                        color: 'purple',
                    });
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fheader\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cp class=\"room-info__price\"\u003E" + (pug.escape(null == (pug_interp = `${price}₽`) ? "" : pug_interp)) + "\u003Cspan class=\"room-info__price-measure\"\u003Eв сутки\u003C\u002Fspan\u003E\u003C\u002Fp\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
};
pug_mixins["rate-button"] = pug_interp = function(currentRating){
var block = (this && this.block), attributes = (this && this.attributes) || {};
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cul class=\"rate-button\"\u003E";
for (let i = 1; i <= 5; i += 1)
{
const active = i <= currentRating;
let className = 'material-icons rate-button__star';
if (active) {
    className += ' rate-button__star_active';
}
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E\u003C\u002Fli\u003E";
}
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Ful\u003E";
};
pug_mixins["room-card"] = pug_interp = function(options = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
const {
    imagesSrc,
    hasSliderArrows = false,
    roomInfo,
    rating,
    numOfComments,
    link = 'room-details.html',
} = options;

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Carticle class=\"room-card js-room-card\"\u003E";
let sliderClassName = 'room-card__slider js-room-card__slider';
if (hasSliderArrows) {
    sliderClassName += ' room-card__slider_with-arrows';
}
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv" + (pug.attr("class", pug.classes([sliderClassName], [true]), false, true)) + "\u003E";
// iterate imagesSrc
;(function(){
  var $$obj = imagesSrc;
  if ('number' == typeof $$obj.length) {
      for (var pug_index3 = 0, $$l = $$obj.length; pug_index3 < $$l; pug_index3++) {
        var src = $$obj[pug_index3];
pug_html = pug_html + "\u003Cimg" + (" class=\"room-card__img\""+pug.attr("src", src, true, true)+" alt=\"room-image\"") + "\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index3 in $$obj) {
      $$l++;
      var src = $$obj[pug_index3];
pug_html = pug_html + "\u003Cimg" + (" class=\"room-card__img\""+pug.attr("src", src, true, true)+" alt=\"room-image\"") + "\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"room-card__content\"\u003E\u003Ca" + (" class=\"room-card__room-info\""+pug.attr("href", link, true, true)) + "\u003E";
pug_indent.push('      ');
pug_mixins["room-info"](roomInfo);
pug_indent.pop();
pug_html = pug_html + "\u003C\u002Fa\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"room-card__footer\"\u003E";
pug_indent.push('      ');
pug_mixins["rate-button"](rating);
pug_indent.pop();
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cp class=\"room-card__comments\"\u003E" + (pug.escape(null == (pug_interp = numOfComments) ? "" : pug_interp)) + "\u003Cspan class=\"room-card__comments-measure\"\u003EОтзывов\u003C\u002Fspan\u003E\u003C\u002Fp\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Farticle\u003E";
};
pug_mixins["heading"] = pug_interp = function({ text = '', type = 'h3', color, withJs = false }){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'heading';
let tag;

switch (type) {
    case 'h3':
        className += ' heading_type_h3';
        tag = 'h3';
        break;
    case 'h2':
        className += ' heading_type_h2';
        tag = 'h2';
        break;
    case 'inline':
        className += ' heading_type_h3';
        tag = 'span';
        break;
    default:
        tag = 'h1';
        break;
}
switch (color) {
    case 'white':
        className += ' heading_color_white';
        break;
    case 'purple':
        className += ' heading_color_purple';
        break;
    case 'gray':
        className += ' heading_color_gray';
        break;
    case 'inherit':
        className += ' heading_color_inherit';
        break;
    default:
        break;
}
if (withJs) {
  className += ' js-heading';
}

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C" + (tag) + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = text) ? "" : pug_interp)) + "\u003C\u002F" + (tag) + "\u003E";
};
pug_mixins["pagination"] = pug_interp = function(desc){
var block = (this && this.block), attributes = (this && this.attributes) || {};
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"pagination js-pagination\"\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"pagination__pages js-pagination__pages\"\u003E\u003C\u002Fdiv\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cp class=\"pagination__desc\"\u003E" + (null == (pug_interp = desc) ? "" : pug_interp) + "\u003C\u002Fp\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
};
pug_mixins["arrow"] = pug_interp = function({ type, color, withoutPadding = false } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'arrow';
let iconName = 'expand_more';

switch (type) {
    case 'expand-less':
        iconName = 'expand_less';
        break;
    case 'forward':
        iconName = 'arrow_forward';
        break;
    default:
        break;
}

switch (color) {
    case 'white':
        className += ' arrow_color_white';
        break;
    case 'purple-gradient':
        className += ' arrow_color_purple-gradient';
        break;
    default:
        break;
}

if (withoutPadding) {
    className += ' arrow_without-padding';
}

pug_html = pug_html + "\u003Cspan" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = iconName) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
};
pug_mixins["heading"] = pug_interp = function({ text = '', type = 'h3', color, withJs = false }){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'heading';
let tag;

switch (type) {
    case 'h3':
        className += ' heading_type_h3';
        tag = 'h3';
        break;
    case 'h2':
        className += ' heading_type_h2';
        tag = 'h2';
        break;
    case 'inline':
        className += ' heading_type_h3';
        tag = 'span';
        break;
    default:
        tag = 'h1';
        break;
}
switch (color) {
    case 'white':
        className += ' heading_color_white';
        break;
    case 'purple':
        className += ' heading_color_purple';
        break;
    case 'gray':
        className += ' heading_color_gray';
        break;
    case 'inherit':
        className += ' heading_color_inherit';
        break;
    default:
        break;
}
if (withJs) {
  className += ' js-heading';
}

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C" + (tag) + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = text) ? "" : pug_interp)) + "\u003C\u002F" + (tag) + "\u003E";
};
pug_mixins["button"] = pug_interp = function(options = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
const {
    text = 'click me',
    hasLink = false,
    isSubmit = false,
    link = 'change-me',
    modifiers = {},
    withJs = false,
} = options;

let className = 'button';
let headingOptions = {
    text,
    type: 'inline',
    color: 'white',
};

if (hasLink) {
    headingOptions.type = 'h3';
}

if (modifiers.isSecondary) {
    className += ' button_secondary';
    headingOptions.color = 'purple';
}
if (modifiers.withoutFrame) {
    headingOptions.color = 'inherit';
    className += ' button_without-frame';
}
if (modifiers.isLong) {
    className += ' button_long';
}
if (modifiers.isHovered) {
    className += ' button_hovered';
}
if (modifiers.isNarrow) {
    className += ' button_narrow';
}
if (modifiers.isWide) {
    className += ' button_wide';
}
if (withJs) {
  className += ' js-button';
}

switch (modifiers.textColor) {
    case 'white':
        headingOptions.color = 'white';
        break;
    case 'purple':
        headingOptions.color = 'purple';
        break;
    case 'gray':
        headingOptions.color = 'gray';
        break;
    default:
        break;
}

if ((hasLink)) {
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E\u003Ca" + (" class=\"button__text\""+pug.attr("href", link, true, true)) + "\u003E";
pug_indent.push('    ');
pug_mixins["heading"](headingOptions);
pug_indent.pop();
pug_html = pug_html + "\u003C\u002Fa\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"button__arrow\"\u003E";
pug_indent.push('    ');
pug_mixins["arrow"]({
                  type: 'forward',
                  color: 'white',
                });
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
else {
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cbutton" + (pug.attr("class", pug.classes([className], [true]), false, true)+pug.attr("type", isSubmit ? 'submit' : 'button', true, true)) + "\u003E\u003Cspan class=\"button__text\"\u003E";
pug_indent.push('    ');
pug_mixins["heading"](headingOptions);
pug_indent.pop();
pug_html = pug_html + "\u003C\u002Fspan\u003E\u003Cspan class=\"button__arrow\"\u003E";
pug_indent.push('    ');
pug_mixins["arrow"]({
                    type: 'forward',
                    color: 'white',
                });
pug_indent.pop();
pug_html = pug_html + "\u003C\u002Fspan\u003E\u003C\u002Fbutton\u003E";
}
};
pug_mixins["arrow"] = pug_interp = function({ type, color, withoutPadding = false } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'arrow';
let iconName = 'expand_more';

switch (type) {
    case 'expand-less':
        iconName = 'expand_less';
        break;
    case 'forward':
        iconName = 'arrow_forward';
        break;
    default:
        break;
}

switch (color) {
    case 'white':
        className += ' arrow_color_white';
        break;
    case 'purple-gradient':
        className += ' arrow_color_purple-gradient';
        break;
    default:
        break;
}

if (withoutPadding) {
    className += ' arrow_without-padding';
}

pug_html = pug_html + "\u003Cspan" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = iconName) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
};
pug_mixins["navigation"] = pug_interp = function({ items, activeLinkIndex, inColumn = false, withJs = false }){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'navigation';
if (inColumn) {
    className += ' navigation_in-column';
}
if (withJs) {
    className += ' js-navigation';
}
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cnav" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cul class=\"navigation__list\"\u003E";
// iterate items
;(function(){
  var $$obj = items;
  if ('number' == typeof $$obj.length) {
      for (var itemIndex = 0, $$l = $$obj.length; itemIndex < $$l; itemIndex++) {
        var item = $$obj[itemIndex];
const link = item.link || 'change-me';

let itemClassName = 'navigation__item';
if (item.isActive) {
    itemClassName += ' navigation__item_active';
}

pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli" + (pug.attr("class", pug.classes([itemClassName], [true]), false, true)) + "\u003E";
if ((item.subitems)) {
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + ("\u003Cbutton class=\"navigation__link\"\u003E" + (pug.escape(null == (pug_interp = item.name) ? "" : pug_interp)));
pug_indent.push('        ');
pug_mixins["arrow"]({ withoutPadding: true });
pug_indent.pop();
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fbutton\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cul class=\"navigation__subitems\"\u003E";
// iterate item.subitems
;(function(){
  var $$obj = item.subitems;
  if ('number' == typeof $$obj.length) {
      for (var pug_index5 = 0, $$l = $$obj.length; pug_index5 < $$l; pug_index5++) {
        var subitem = $$obj[pug_index5];
pug_html = pug_html + "\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"navigation__subitem\"\u003E\u003Ca" + (" class=\"navigation__link\""+pug.attr("href", subitem.link || 'change-me', true, true)) + "\u003E" + (pug.escape(null == (pug_interp = subitem.name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index5 in $$obj) {
      $$l++;
      var subitem = $$obj[pug_index5];
pug_html = pug_html + "\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"navigation__subitem\"\u003E\u003Ca" + (" class=\"navigation__link\""+pug.attr("href", subitem.link || 'change-me', true, true)) + "\u003E" + (pug.escape(null == (pug_interp = subitem.name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Ful\u003E";
}
else {
pug_html = pug_html + "\u003Ca" + (" class=\"navigation__link\""+pug.attr("href", link, true, true)) + "\u003E" + (pug.escape(null == (pug_interp = item.name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E";
}
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var itemIndex in $$obj) {
      $$l++;
      var item = $$obj[itemIndex];
const link = item.link || 'change-me';

let itemClassName = 'navigation__item';
if (item.isActive) {
    itemClassName += ' navigation__item_active';
}

pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli" + (pug.attr("class", pug.classes([itemClassName], [true]), false, true)) + "\u003E";
if ((item.subitems)) {
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + ("\u003Cbutton class=\"navigation__link\"\u003E" + (pug.escape(null == (pug_interp = item.name) ? "" : pug_interp)));
pug_indent.push('        ');
pug_mixins["arrow"]({ withoutPadding: true });
pug_indent.pop();
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fbutton\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cul class=\"navigation__subitems\"\u003E";
// iterate item.subitems
;(function(){
  var $$obj = item.subitems;
  if ('number' == typeof $$obj.length) {
      for (var pug_index6 = 0, $$l = $$obj.length; pug_index6 < $$l; pug_index6++) {
        var subitem = $$obj[pug_index6];
pug_html = pug_html + "\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"navigation__subitem\"\u003E\u003Ca" + (" class=\"navigation__link\""+pug.attr("href", subitem.link || 'change-me', true, true)) + "\u003E" + (pug.escape(null == (pug_interp = subitem.name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index6 in $$obj) {
      $$l++;
      var subitem = $$obj[pug_index6];
pug_html = pug_html + "\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"navigation__subitem\"\u003E\u003Ca" + (" class=\"navigation__link\""+pug.attr("href", subitem.link || 'change-me', true, true)) + "\u003E" + (pug.escape(null == (pug_interp = subitem.name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Ful\u003E";
}
else {
pug_html = pug_html + "\u003Ca" + (" class=\"navigation__link\""+pug.attr("href", link, true, true)) + "\u003E" + (pug.escape(null == (pug_interp = item.name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E";
}
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Ful\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fnav\u003E";
};
pug_mixins["header"] = pug_interp = function({ userName, activeLink } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cheader class=\"header js-header\"\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"header__container\"\u003E\u003Ca class=\"header__logo\" href=\"landing-page.html\"\u003E\u003Cimg src=\"images\u002Flogo.svg\" alt=\"logo\"\u003E\u003C\u002Fa\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"header__menu js-header__menu\"\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"header__nav-container\"\u003E";
pug_indent.push('        ');
pug_mixins["navigation"]({
                        activeLinkIndex: activeLink,
                        items: [
                            {
                                name: 'О нас',
                            },
                            {
                                name: 'Услуги',
                                subitems: [{ name: 'Заказ комнаты' }],
                            },
                            {
                                name: 'Вакансии',
                            },
                            {
                                name: 'Новости',
                            },
                            {
                                name: 'Соглашения',
                                subitems: [
                                    { name: 'Правила' },
                                    { name: 'Конфиденциальность' },
                                ],
                            },
                        ].map((item, index) => ({ ...item, isActive: activeLink === index })),
                        withJs: true,
                    });
pug_indent.pop();
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
if (userName) {
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"header__user\"\u003E" + (pug.escape(null == (pug_interp = userName) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E";
}
else {
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"header__buttons\"\u003E";
pug_indent.push('        ');
pug_mixins["button"]({
                            text: 'Войти',
                            hasLink: true,
                            link: 'login.html',
                            modifiers: {
                                isSecondary: true,
                                isNarrow: true,
                            },
                        });
pug_indent.pop();
pug_indent.push('        ');
pug_mixins["button"]({
                            text: 'Зарегистрироваться',
                            hasLink: true,
                            link: 'registration.html',
                            modifiers: {
                              isNarrow: true,
                            },
                        });
pug_indent.pop();
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cbutton class=\"header__hamburger js-header__hamburger\"\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"header__hamburger-icon\"\u003E\u003C\u002Fdiv\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fbutton\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fheader\u003E";
};
pug_mixins["arrow"] = pug_interp = function({ type, color, withoutPadding = false } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'arrow';
let iconName = 'expand_more';

switch (type) {
    case 'expand-less':
        iconName = 'expand_less';
        break;
    case 'forward':
        iconName = 'arrow_forward';
        break;
    default:
        break;
}

switch (color) {
    case 'white':
        className += ' arrow_color_white';
        break;
    case 'purple-gradient':
        className += ' arrow_color_purple-gradient';
        break;
    default:
        break;
}

if (withoutPadding) {
    className += ' arrow_without-padding';
}

pug_html = pug_html + "\u003Cspan" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = iconName) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
};
pug_mixins["navigation"] = pug_interp = function({ items, activeLinkIndex, inColumn = false, withJs = false }){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'navigation';
if (inColumn) {
    className += ' navigation_in-column';
}
if (withJs) {
    className += ' js-navigation';
}
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cnav" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cul class=\"navigation__list\"\u003E";
// iterate items
;(function(){
  var $$obj = items;
  if ('number' == typeof $$obj.length) {
      for (var itemIndex = 0, $$l = $$obj.length; itemIndex < $$l; itemIndex++) {
        var item = $$obj[itemIndex];
const link = item.link || 'change-me';

let itemClassName = 'navigation__item';
if (item.isActive) {
    itemClassName += ' navigation__item_active';
}

pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli" + (pug.attr("class", pug.classes([itemClassName], [true]), false, true)) + "\u003E";
if ((item.subitems)) {
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + ("\u003Cbutton class=\"navigation__link\"\u003E" + (pug.escape(null == (pug_interp = item.name) ? "" : pug_interp)));
pug_indent.push('        ');
pug_mixins["arrow"]({ withoutPadding: true });
pug_indent.pop();
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fbutton\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cul class=\"navigation__subitems\"\u003E";
// iterate item.subitems
;(function(){
  var $$obj = item.subitems;
  if ('number' == typeof $$obj.length) {
      for (var pug_index8 = 0, $$l = $$obj.length; pug_index8 < $$l; pug_index8++) {
        var subitem = $$obj[pug_index8];
pug_html = pug_html + "\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"navigation__subitem\"\u003E\u003Ca" + (" class=\"navigation__link\""+pug.attr("href", subitem.link || 'change-me', true, true)) + "\u003E" + (pug.escape(null == (pug_interp = subitem.name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index8 in $$obj) {
      $$l++;
      var subitem = $$obj[pug_index8];
pug_html = pug_html + "\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"navigation__subitem\"\u003E\u003Ca" + (" class=\"navigation__link\""+pug.attr("href", subitem.link || 'change-me', true, true)) + "\u003E" + (pug.escape(null == (pug_interp = subitem.name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Ful\u003E";
}
else {
pug_html = pug_html + "\u003Ca" + (" class=\"navigation__link\""+pug.attr("href", link, true, true)) + "\u003E" + (pug.escape(null == (pug_interp = item.name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E";
}
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var itemIndex in $$obj) {
      $$l++;
      var item = $$obj[itemIndex];
const link = item.link || 'change-me';

let itemClassName = 'navigation__item';
if (item.isActive) {
    itemClassName += ' navigation__item_active';
}

pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli" + (pug.attr("class", pug.classes([itemClassName], [true]), false, true)) + "\u003E";
if ((item.subitems)) {
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + ("\u003Cbutton class=\"navigation__link\"\u003E" + (pug.escape(null == (pug_interp = item.name) ? "" : pug_interp)));
pug_indent.push('        ');
pug_mixins["arrow"]({ withoutPadding: true });
pug_indent.pop();
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fbutton\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cul class=\"navigation__subitems\"\u003E";
// iterate item.subitems
;(function(){
  var $$obj = item.subitems;
  if ('number' == typeof $$obj.length) {
      for (var pug_index9 = 0, $$l = $$obj.length; pug_index9 < $$l; pug_index9++) {
        var subitem = $$obj[pug_index9];
pug_html = pug_html + "\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"navigation__subitem\"\u003E\u003Ca" + (" class=\"navigation__link\""+pug.attr("href", subitem.link || 'change-me', true, true)) + "\u003E" + (pug.escape(null == (pug_interp = subitem.name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index9 in $$obj) {
      $$l++;
      var subitem = $$obj[pug_index9];
pug_html = pug_html + "\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"navigation__subitem\"\u003E\u003Ca" + (" class=\"navigation__link\""+pug.attr("href", subitem.link || 'change-me', true, true)) + "\u003E" + (pug.escape(null == (pug_interp = subitem.name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Ful\u003E";
}
else {
pug_html = pug_html + "\u003Ca" + (" class=\"navigation__link\""+pug.attr("href", link, true, true)) + "\u003E" + (pug.escape(null == (pug_interp = item.name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E";
}
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Ful\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fnav\u003E";
};
pug_mixins["heading"] = pug_interp = function({ text = '', type = 'h3', color, withJs = false }){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'heading';
let tag;

switch (type) {
    case 'h3':
        className += ' heading_type_h3';
        tag = 'h3';
        break;
    case 'h2':
        className += ' heading_type_h2';
        tag = 'h2';
        break;
    case 'inline':
        className += ' heading_type_h3';
        tag = 'span';
        break;
    default:
        tag = 'h1';
        break;
}
switch (color) {
    case 'white':
        className += ' heading_color_white';
        break;
    case 'purple':
        className += ' heading_color_purple';
        break;
    case 'gray':
        className += ' heading_color_gray';
        break;
    case 'inherit':
        className += ' heading_color_inherit';
        break;
    default:
        break;
}
if (withJs) {
  className += ' js-heading';
}

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C" + (tag) + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = text) ? "" : pug_interp)) + "\u003C\u002F" + (tag) + "\u003E";
};
pug_mixins["arrow"] = pug_interp = function({ type, color, withoutPadding = false } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'arrow';
let iconName = 'expand_more';

switch (type) {
    case 'expand-less':
        iconName = 'expand_less';
        break;
    case 'forward':
        iconName = 'arrow_forward';
        break;
    default:
        break;
}

switch (color) {
    case 'white':
        className += ' arrow_color_white';
        break;
    case 'purple-gradient':
        className += ' arrow_color_purple-gradient';
        break;
    default:
        break;
}

if (withoutPadding) {
    className += ' arrow_without-padding';
}

pug_html = pug_html + "\u003Cspan" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = iconName) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
};
pug_mixins["text-field"] = pug_interp = function({ inputOptions = {}, arrowOptions, modifiers = {}, withJs = false } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'text-field';

if (modifiers.isFocused) {
    className += ' text-field_focused';
}
if (modifiers.isShort) {
    className += ' text-field_short';
}
if (modifiers.isBottomFlat) {
    className += ' text-field_flat-bottom';
}
if (modifiers.isClickable) {
    className += ' text-field_clickable';
}

if (withJs) {
    className += ' js-text-field';
}

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E";
let inputClassName = 'text-field__input';
if (arrowOptions) {
    inputClassName += ' text-field__input_with-arrow';
}
if (inputOptions.isMaskedDate) {
    inputClassName += ' text-field__input_masked-date js-text-field__input_masked-date'
}
if (inputOptions.withJs) {
    inputClassName += ' js-text-field__input';
}

pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cinput" + (pug.attr("class", pug.classes([inputClassName], [true]), false, true)+pug.attr("type", inputOptions.type, true, true)+pug.attr("placeholder", inputOptions.placeholder, true, true)+pug.attr("value", inputOptions.value, true, true)+pug.attr("readonly", inputOptions.isReadonly, true, true)) + "\u003E";
if ((arrowOptions)) {
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cbutton" + (" class=\"text-field__arrow\""+pug.attr("type", inputOptions.isSubmit ? 'submit' : 'button', true, true)) + "\u003E";
pug_indent.push('    ');
pug_mixins["arrow"](arrowOptions);
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fbutton\u003E";
}
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
};
pug_mixins["social-links"] = pug_interp = function(){
var block = (this && this.block), attributes = (this && this.attributes) || {};
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cul class=\"social-links\"\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"social-links__item\"\u003E\u003Ca class=\"social-links__link\" href=\"change-me\"\u003E\u003Cspan class=\"social-links__icon fab fa-twitter\"\u003E\u003C\u002Fspan\u003E\u003C\u002Fa\u003E\u003C\u002Fli\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"social-links__item\"\u003E\u003Ca class=\"social-links__link\" href=\"change-me\"\u003E\u003Cspan class=\"social-links__icon fab fa-facebook-square\"\u003E\u003C\u002Fspan\u003E\u003C\u002Fa\u003E\u003C\u002Fli\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"social-links__item\"\u003E\u003Ca class=\"social-links__link\" href=\"change-me\"\u003E\u003Cspan class=\"social-links__icon fab fa-instagram\"\u003E\u003C\u002Fspan\u003E\u003C\u002Fa\u003E\u003C\u002Fli\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Ful\u003E";
};
pug_mixins["footer"] = pug_interp = function(){
var block = (this && this.block), attributes = (this && this.attributes) || {};
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cfooter class=\"footer\"\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"footer__body\"\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"footer__main-info\"\u003E\u003Ca href=\"landing-page.html\"\u003E\u003Cimg src=\"images\u002Flogo.svg\" alt=\"logo\"\u003E\u003C\u002Fa\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cp class=\"footer__description\"\u003EБронирование номеров в лучшем отеле 2019 года по версии ассоциации «Отельные взгляды»\u003C\u002Fp\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"footer__menu\"\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"footer__nav\"\u003E\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"footer__subtitle\"\u003E";
pug_indent.push('          ');
pug_mixins["heading"]({ text: 'Навигация' });
pug_indent.pop();
pug_html = pug_html + "\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
pug_indent.push('        ');
pug_mixins["navigation"]({
                        items: [
                            { name: 'О нас' },
                            { name: 'Новости' },
                            { name: 'Служба поддержки' },
                            { name: 'Услуги' },
                        ],
                        inColumn: true,
                    });
pug_indent.pop();
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"footer__nav\"\u003E\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"footer__subtitle\"\u003E";
pug_indent.push('          ');
pug_mixins["heading"]({ text: 'О нас' });
pug_indent.pop();
pug_html = pug_html + "\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
pug_indent.push('        ');
pug_mixins["navigation"]({
                        items: [
                            { name: 'О сервисе' },
                            { name: 'Наша команда' },
                            { name: 'Вакансии' },
                            { name: 'Инвесторы' },
                        ],
                        inColumn: true,
                    });
pug_indent.pop();
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"footer__nav\"\u003E\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"footer__subtitle\"\u003E";
pug_indent.push('          ');
pug_mixins["heading"]({ text: 'Служба поддержки' });
pug_indent.pop();
pug_html = pug_html + "\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
pug_indent.push('        ');
pug_mixins["navigation"]({
                        items: [
                            { name: 'Соглашения' },
                            { name: 'Сообщества' },
                            { name: 'Связь с нами' },
                        ],
                        inColumn: true,
                    });
pug_indent.pop();
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cform class=\"footer__subscription\"\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"footer__subtitle footer__subtitle_without-margin-bottom\"\u003E";
pug_indent.push('        ');
pug_mixins["heading"]({ text: 'Подписка' });
pug_indent.pop();
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"footer__subscription-text\"\u003EПолучайте специальные предложения и новости сервиса\u003C\u002Fdiv\u003E";
pug_indent.push('      ');
pug_mixins["text-field"]({
                    inputOptions: {
                        placeholder: 'Email',
                        type: 'email',
                        isSubmit: true,
                    },
                    modifiers: {
                        isShort: true,
                    },
                    arrowOptions: {
                        type: 'forward',
                        color: 'purple-gradient',
                    },
                });
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fform\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"footer__bottom\"\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"footer__bottom-container\"\u003E\u003Cspan class=\"footer__copyright\"\u003ECopyright © 2018 Toxin отель. Все права защищены.\u003C\u002Fspan\u003E";
pug_indent.push('      ');
pug_mixins["social-links"]();
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Ffooter\u003E";
};
const title = 'Search room';
const name = 'search-room';
pug_html = pug_html + "\u003C!DOCTYPE html\u003E\n\u003Chtml lang=\"ru\"\u003E\n  \u003Chead\u003E\n    \u003Cmeta charset=\"utf-8\"\u003E\n    \u003Cmeta" + (" name=\"description\""+pug.attr("content", `Toxin Hotel. Room reservations. ${title}`, true, true)) + "\u003E\n    \u003Cmeta name=\"keywords\" content=\"toxin, hotel, отель, забронировать, room, комнаты, book, reservation\"\u003E\n    \u003Cmeta name=\"viewport\" content=\"initial-scale=1.0, width=device-width\"\u003E\n    \u003Clink" + (" rel=\"apple-touch-icon\" sizes=\"180x180\""+pug.attr("href", __webpack_require__(6).default, true, true)) + "\u003E\n    \u003Clink" + (" rel=\"icon\" type=\"image\u002Fpng\" sizes=\"32x32\""+pug.attr("href", __webpack_require__(8).default, true, true)) + "\u003E\n    \u003Clink" + (" rel=\"icon\" type=\"image\u002Fpng\" sizes=\"16x16\""+pug.attr("href", __webpack_require__(7).default, true, true)) + "\u003E\n    \u003Clink rel=\"manifest\" href=\".\u002Fsite.webmanifest\"\u003E\n    \u003Clink" + (" rel=\"mask-icon\""+pug.attr("href", __webpack_require__(10).default, true, true)+" color=\"#bc9cff\"") + "\u003E\n    \u003Clink" + (" rel=\"shortcut icon\""+pug.attr("href", __webpack_require__(9).default, true, true)) + "\u003E\n    \u003Cmeta name=\"msapplication-TileColor\" content=\"#603cba\"\u003E\n    \u003Cmeta name=\"msapplication-config\" content=\".\u002Fbrowserconfig.xml\"\u003E\n    \u003Cmeta name=\"theme-color\" content=\"#ffffff\"\u003E\n    \u003Ctitle\u003E" + (pug.escape(null == (pug_interp = title) ? "" : pug_interp)) + "\u003C\u002Ftitle\u003E\n  \u003C\u002Fhead\u003E\n  \u003Cbody\u003E";
pug_indent.push('    ');
pug_mixins["header"]({ activeLink });
pug_indent.pop();
pug_html = pug_html + "\n    \u003Cmain\u003E\n      \u003Cmain class=\"search-room\"\u003E\n        \u003Cdiv class=\"container\"\u003E\n          \u003Cdiv class=\"search-room__container\"\u003E\n            \u003Cform class=\"search-room__params\"\u003E\n              \u003Cdiv class=\"search-room__params-date\"\u003E";
pug_indent.push('                ');
pug_mixins["dropdown"]({
                            title: 'Даты пребывания в отеле',
                            inputOptions: {
                                value: '19 авг - 23 авг',
                                placeholder: 'Дата',
                            },
                            popupMixinOptions: {
                                name: 'date-picker',
                                params: {
                                    dateFormat: 'd M',
                                    initialDate: ['2019.08.19', '2019.08.23'],
                                },
                            },
                            isShort: true,
                            isPopupDistant: true,
                            defaultInputValue: 'Даты пребывания в отеле',
                        });
pug_indent.pop();
pug_html = pug_html + "\n              \u003C\u002Fdiv\u003E\n              \u003Cdiv class=\"search-room__params-guests\"\u003E";
pug_indent.push('                ');
pug_mixins["dropdown"]({
                            title: 'Гости',
                            inputOptions: {
                                value: '3 гостя, 1 младенец',
                                placeholder: 'Удобства',
                            },
                            popupMixinOptions: {
                                name: 'items-counter',
                                params: {
                                    items: [
                                        {
                                            name: 'Взрослые',
                                            value: 3,
                                        },
                                        {
                                            name: 'Дети',
                                            value: 0,
                                        },
                                        {
                                            name: 'Младенцы',
                                            value: 1,
                                            nameDeclensions: ['младенец', 'младенца', 'младенцев'],
                                        },
                                    ],
                                    withoutButtons: true,
                                    wordForValueTextReplacing: ['гость', 'гостя', 'гостей'],
                                    itemIndexForSeparateCount: 2,
                                },
                            },
                            isShort: true,
                            defaultInputValue: 'Сколько гостей',
                        });
pug_indent.pop();
pug_html = pug_html + "\n              \u003C\u002Fdiv\u003E\n              \u003Cdiv class=\"search-room__params-price\"\u003E";
pug_indent.push('                ');
pug_mixins["range-slider"]('Диапазон цены', 'Стоимость за сутки пребывания в номере');
pug_indent.pop();
pug_html = pug_html + "\n              \u003C\u002Fdiv\u003E\n              \u003Cdiv class=\"search-room__params-rules\"\u003E\n                \u003Cdiv class=\"search-room__subtitle\"\u003E";
pug_indent.push('                  ');
pug_mixins["heading"]({ text: 'Правила дома' });
pug_indent.pop();
pug_html = pug_html + "\n                \u003C\u002Fdiv\u003E";
pug_indent.push('                ');
pug_mixins["checkbox-buttons"]({
                            items: [
                                {
                                    name: 'Можно курить',
                                    checked: false,
                                },
                                {
                                    name: 'Можно с питомцами',
                                    checked: true,
                                },
                                {
                                    name: 'Можно пригласить гостей<br>(до 10 человек)',
                                    checked: true,
                                },
                            ],
                        });
pug_indent.pop();
pug_html = pug_html + "\n              \u003C\u002Fdiv\u003E\n              \u003Cdiv class=\"search-room__params-availability\"\u003E\n                \u003Cdiv class=\"search-room__subtitle\"\u003E";
pug_indent.push('                  ');
pug_mixins["heading"]({ text: 'Доступность' });
pug_indent.pop();
pug_html = pug_html + "\n                \u003C\u002Fdiv\u003E";
pug_indent.push('                ');
pug_mixins["checkbox-buttons"]({
                            items: [
                                {
                                    name: 'Широкий коридор',
                                    description: 'Ширина коридоров в номере<br>не менее 91 см.',
                                    checked: false,
                                },
                                {
                                    name: 'Помощник для инвалидов',
                                    description: 'На 1 этаже вас встретит специалист<br>и проводит до номера.',
                                    checked: false,
                                },
                            ],
                            isRich: true,
                        });
pug_indent.pop();
pug_html = pug_html + "\n              \u003C\u002Fdiv\u003E\n              \u003Cdiv class=\"search-room__params-facilities\"\u003E";
pug_indent.push('                ');
pug_mixins["dropdown"]({
                            title: 'Удобства номера',
                            inputOptions: {
                                value: '2 спальни, 2 кровати',
                                placeholder: 'Удобства',
                            },
                            popupMixinOptions: {
                                name: 'items-counter',
                                params: {
                                    items: [
                                        {
                                            name: 'Спальни',
                                            value: '2',
                                            nameDeclensions: ['спальня', 'спальни', 'спален'],
                                        },
                                        {
                                            name: 'Кровати',
                                            value: '2',
                                            nameDeclensions: ['кровать', 'кровати', 'кроватей'],
                                        },
                                        {
                                            name: 'Ванные комнаты',
                                            value: '0',
                                            nameDeclensions: ['ванная комната', 'ванные комнаты', 'ванных комнат'],
                                        },
                                    ],
                                    withoutButtons: true,
                                },
                            },
                            isShort: true,
                            defaultInputValue: 'Удобства',
                        });
pug_indent.pop();
pug_html = pug_html + "\n              \u003C\u002Fdiv\u003E\n              \u003Cdiv class=\"search-room__params-list\"\u003E";
pug_indent.push('                ');
pug_mixins["expandable-checkboxes"]({
                            title: 'Дополнительные удобства',
                            items: [
                                {
                                    name: 'Завтрак',
                                    checked: false,
                                },
                                {
                                    name: 'Письменный стол',
                                    checked: true,
                                },
                                {
                                    name: 'Стул для кормления',
                                    checked: true,
                                },
                                {
                                    name: 'Кроватка',
                                    checked: true,
                                },
                                {
                                    name: 'Телевизор',
                                    checked: false,
                                },
                                {
                                    name: 'Шампунь',
                                    checked: false,
                                },
                            ],
                        });
pug_indent.pop();
pug_html = pug_html + "\n              \u003C\u002Fdiv\u003E\n            \u003C\u002Fform\u003E\n            \u003Carticle class=\"search-room__rooms\"\u003E\n              \u003Cdiv class=\"search-room__rooms-title\"\u003E";
pug_indent.push('                ');
pug_mixins["heading"]({
                            type: 'h1',
                            text: 'Номера, которые мы для вас подобрали',
                        });
pug_indent.pop();
pug_html = pug_html + "\n              \u003C\u002Fdiv\u003E\n              \u003Cul class=\"search-room__room-cards\"\u003E";
// iterate Array(12)
;(function(){
  var $$obj = Array(12);
  if ('number' == typeof $$obj.length) {
      for (var i = 0, $$l = $$obj.length; i < $$l; i++) {
        var _ = $$obj[i];
const images = [];
for (let d = 1; d <= 4; d += 1) {
    const imageNumber = i + d > 12 ? i + d - 12 : i + d;
    images.push(`images/room-img_${imageNumber}.jpg`);
}
pug_html = pug_html + "\n                \u003Cli class=\"search-room__room-card\"\u003E";
pug_indent.push('                  ');
pug_mixins["room-card"]({
                                    imagesSrc: images,
                                    roomInfo: {
                                        number: 888,
                                        type: Math.random() > 0.85 ? 'Люкс' : undefined,
                                        price: (Math.floor(Math.random() * (16000 - 5000)) + 5000).toLocaleString('ru'),
                                    },
                                    numOfComments: Math.floor(Math.random() * 1000),
                                    rating: Math.floor(Math.random() * 5) + 1,
                                });
pug_indent.pop();
pug_html = pug_html + "\n                \u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var i in $$obj) {
      $$l++;
      var _ = $$obj[i];
const images = [];
for (let d = 1; d <= 4; d += 1) {
    const imageNumber = i + d > 12 ? i + d - 12 : i + d;
    images.push(`images/room-img_${imageNumber}.jpg`);
}
pug_html = pug_html + "\n                \u003Cli class=\"search-room__room-card\"\u003E";
pug_indent.push('                  ');
pug_mixins["room-card"]({
                                    imagesSrc: images,
                                    roomInfo: {
                                        number: 888,
                                        type: Math.random() > 0.85 ? 'Люкс' : undefined,
                                        price: (Math.floor(Math.random() * (16000 - 5000)) + 5000).toLocaleString('ru'),
                                    },
                                    numOfComments: Math.floor(Math.random() * 1000),
                                    rating: Math.floor(Math.random() * 5) + 1,
                                });
pug_indent.pop();
pug_html = pug_html + "\n                \u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\n              \u003C\u002Ful\u003E\n              \u003Cdiv class=\"search-room__pagination\"\u003E";
pug_indent.push('                ');
pug_mixins["pagination"]('1 – 12 из 100+ вариантов аренды');
pug_indent.pop();
pug_html = pug_html + "\n              \u003C\u002Fdiv\u003E\n            \u003C\u002Farticle\u003E\n          \u003C\u002Fdiv\u003E\n        \u003C\u002Fdiv\u003E\n      \u003C\u002Fmain\u003E\n    \u003C\u002Fmain\u003E";
pug_indent.push('    ');
pug_mixins["footer"]();
pug_indent.pop();
pug_html = pug_html + "\n  \u003C\u002Fbody\u003E\n\u003C\u002Fhtml\u003E";
    }.call(this, "Array" in locals_for_with ?
        locals_for_with.Array :
        typeof Array !== 'undefined' ? Array : undefined, "JSON" in locals_for_with ?
        locals_for_with.JSON :
        typeof JSON !== 'undefined' ? JSON : undefined, "Math" in locals_for_with ?
        locals_for_with.Math :
        typeof Math !== 'undefined' ? Math : undefined, "activeLink" in locals_for_with ?
        locals_for_with.activeLink :
        typeof activeLink !== 'undefined' ? activeLink : undefined, "pug_indent" in locals_for_with ?
        locals_for_with.pug_indent :
        typeof pug_indent !== 'undefined' ? pug_indent : undefined));
    ;;return pug_html;};
module.exports = template;

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(2);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;
    var locals_for_with = (locals || {});
    
    (function (name) {
      var pug_indent = [];
pug_html = pug_html + "\u003C!DOCTYPE html\u003E\n\u003Chtml lang=\"ru\"\u003E\n  \u003Chead\u003E\n    \u003Cmeta charset=\"utf-8\"\u003E\n    \u003Cmeta" + (" name=\"description\""+pug.attr("content", `UI Kit for Toxin Hotel pages (${name})`, true, true)) + "\u003E\n    \u003Cmeta" + (" name=\"keywords\""+pug.attr("content", `toxin, ui-kit ${name}`, true, true)) + "\u003E\n    \u003Cmeta name=\"viewport\" content=\"initial-scale=1.0, width=device-width\"\u003E\n    \u003Clink" + (" rel=\"apple-touch-icon\" sizes=\"180x180\""+pug.attr("href", __webpack_require__(6).default, true, true)) + "\u003E\n    \u003Clink" + (" rel=\"icon\" type=\"image\u002Fpng\" sizes=\"32x32\""+pug.attr("href", __webpack_require__(8).default, true, true)) + "\u003E\n    \u003Clink" + (" rel=\"icon\" type=\"image\u002Fpng\" sizes=\"16x16\""+pug.attr("href", __webpack_require__(7).default, true, true)) + "\u003E\n    \u003Clink rel=\"manifest\" href=\".\u002Fsite.webmanifest\"\u003E\n    \u003Clink" + (" rel=\"mask-icon\""+pug.attr("href", __webpack_require__(10).default, true, true)+" color=\"#bc9cff\"") + "\u003E\n    \u003Clink" + (" rel=\"shortcut icon\""+pug.attr("href", __webpack_require__(9).default, true, true)) + "\u003E\n    \u003Cmeta name=\"msapplication-TileColor\" content=\"#603cba\"\u003E\n    \u003Cmeta name=\"msapplication-config\" content=\".\u002Fbrowserconfig.xml\"\u003E\n    \u003Cmeta name=\"theme-color\" content=\"#ffffff\"\u003E\n    \u003Ctitle\u003E" + (pug.escape(null == (pug_interp = name) ? "" : pug_interp)) + "\u003C\u002Ftitle\u003E\n  \u003C\u002Fhead\u003E\n  \u003Cbody\u003E\n    \u003Cdiv class=\"ui-logo-container\"\u003E\u003Cimg class=\"ui-logo-container__logo\" src=\"images\u002Flogo-icon.svg\" alt=\"logo\"\u003E\u003C\u002Fdiv\u003E\n  \u003C\u002Fbody\u003E\n\u003C\u002Fhtml\u003E";
    }.call(this, "name" in locals_for_with ?
        locals_for_with.name :
        typeof name !== 'undefined' ? name : undefined));
    ;;return pug_html;};
module.exports = template;

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(2);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;
    var locals_for_with = (locals || {});
    
    (function (activeLink, pug_indent, title) {
      var pug_indent = [];
pug_mixins["arrow"] = pug_interp = function({ type, color, withoutPadding = false } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'arrow';
let iconName = 'expand_more';

switch (type) {
    case 'expand-less':
        iconName = 'expand_less';
        break;
    case 'forward':
        iconName = 'arrow_forward';
        break;
    default:
        break;
}

switch (color) {
    case 'white':
        className += ' arrow_color_white';
        break;
    case 'purple-gradient':
        className += ' arrow_color_purple-gradient';
        break;
    default:
        break;
}

if (withoutPadding) {
    className += ' arrow_without-padding';
}

pug_html = pug_html + "\u003Cspan" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = iconName) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
};
pug_mixins["heading"] = pug_interp = function({ text = '', type = 'h3', color, withJs = false }){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'heading';
let tag;

switch (type) {
    case 'h3':
        className += ' heading_type_h3';
        tag = 'h3';
        break;
    case 'h2':
        className += ' heading_type_h2';
        tag = 'h2';
        break;
    case 'inline':
        className += ' heading_type_h3';
        tag = 'span';
        break;
    default:
        tag = 'h1';
        break;
}
switch (color) {
    case 'white':
        className += ' heading_color_white';
        break;
    case 'purple':
        className += ' heading_color_purple';
        break;
    case 'gray':
        className += ' heading_color_gray';
        break;
    case 'inherit':
        className += ' heading_color_inherit';
        break;
    default:
        break;
}
if (withJs) {
  className += ' js-heading';
}

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C" + (tag) + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = text) ? "" : pug_interp)) + "\u003C\u002F" + (tag) + "\u003E";
};
pug_mixins["button"] = pug_interp = function(options = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
const {
    text = 'click me',
    hasLink = false,
    isSubmit = false,
    link = 'change-me',
    modifiers = {},
    withJs = false,
} = options;

let className = 'button';
let headingOptions = {
    text,
    type: 'inline',
    color: 'white',
};

if (hasLink) {
    headingOptions.type = 'h3';
}

if (modifiers.isSecondary) {
    className += ' button_secondary';
    headingOptions.color = 'purple';
}
if (modifiers.withoutFrame) {
    headingOptions.color = 'inherit';
    className += ' button_without-frame';
}
if (modifiers.isLong) {
    className += ' button_long';
}
if (modifiers.isHovered) {
    className += ' button_hovered';
}
if (modifiers.isNarrow) {
    className += ' button_narrow';
}
if (modifiers.isWide) {
    className += ' button_wide';
}
if (withJs) {
  className += ' js-button';
}

switch (modifiers.textColor) {
    case 'white':
        headingOptions.color = 'white';
        break;
    case 'purple':
        headingOptions.color = 'purple';
        break;
    case 'gray':
        headingOptions.color = 'gray';
        break;
    default:
        break;
}

if ((hasLink)) {
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E\u003Ca" + (" class=\"button__text\""+pug.attr("href", link, true, true)) + "\u003E";
pug_indent.push('    ');
pug_mixins["heading"](headingOptions);
pug_indent.pop();
pug_html = pug_html + "\u003C\u002Fa\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"button__arrow\"\u003E";
pug_indent.push('    ');
pug_mixins["arrow"]({
                  type: 'forward',
                  color: 'white',
                });
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
else {
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cbutton" + (pug.attr("class", pug.classes([className], [true]), false, true)+pug.attr("type", isSubmit ? 'submit' : 'button', true, true)) + "\u003E\u003Cspan class=\"button__text\"\u003E";
pug_indent.push('    ');
pug_mixins["heading"](headingOptions);
pug_indent.pop();
pug_html = pug_html + "\u003C\u002Fspan\u003E\u003Cspan class=\"button__arrow\"\u003E";
pug_indent.push('    ');
pug_mixins["arrow"]({
                    type: 'forward',
                    color: 'white',
                });
pug_indent.pop();
pug_html = pug_html + "\u003C\u002Fspan\u003E\u003C\u002Fbutton\u003E";
}
};
pug_mixins["arrow"] = pug_interp = function({ type, color, withoutPadding = false } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'arrow';
let iconName = 'expand_more';

switch (type) {
    case 'expand-less':
        iconName = 'expand_less';
        break;
    case 'forward':
        iconName = 'arrow_forward';
        break;
    default:
        break;
}

switch (color) {
    case 'white':
        className += ' arrow_color_white';
        break;
    case 'purple-gradient':
        className += ' arrow_color_purple-gradient';
        break;
    default:
        break;
}

if (withoutPadding) {
    className += ' arrow_without-padding';
}

pug_html = pug_html + "\u003Cspan" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = iconName) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
};
pug_mixins["navigation"] = pug_interp = function({ items, activeLinkIndex, inColumn = false, withJs = false }){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'navigation';
if (inColumn) {
    className += ' navigation_in-column';
}
if (withJs) {
    className += ' js-navigation';
}
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cnav" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cul class=\"navigation__list\"\u003E";
// iterate items
;(function(){
  var $$obj = items;
  if ('number' == typeof $$obj.length) {
      for (var itemIndex = 0, $$l = $$obj.length; itemIndex < $$l; itemIndex++) {
        var item = $$obj[itemIndex];
const link = item.link || 'change-me';

let itemClassName = 'navigation__item';
if (item.isActive) {
    itemClassName += ' navigation__item_active';
}

pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli" + (pug.attr("class", pug.classes([itemClassName], [true]), false, true)) + "\u003E";
if ((item.subitems)) {
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + ("\u003Cbutton class=\"navigation__link\"\u003E" + (pug.escape(null == (pug_interp = item.name) ? "" : pug_interp)));
pug_indent.push('        ');
pug_mixins["arrow"]({ withoutPadding: true });
pug_indent.pop();
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fbutton\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cul class=\"navigation__subitems\"\u003E";
// iterate item.subitems
;(function(){
  var $$obj = item.subitems;
  if ('number' == typeof $$obj.length) {
      for (var pug_index1 = 0, $$l = $$obj.length; pug_index1 < $$l; pug_index1++) {
        var subitem = $$obj[pug_index1];
pug_html = pug_html + "\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"navigation__subitem\"\u003E\u003Ca" + (" class=\"navigation__link\""+pug.attr("href", subitem.link || 'change-me', true, true)) + "\u003E" + (pug.escape(null == (pug_interp = subitem.name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index1 in $$obj) {
      $$l++;
      var subitem = $$obj[pug_index1];
pug_html = pug_html + "\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"navigation__subitem\"\u003E\u003Ca" + (" class=\"navigation__link\""+pug.attr("href", subitem.link || 'change-me', true, true)) + "\u003E" + (pug.escape(null == (pug_interp = subitem.name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Ful\u003E";
}
else {
pug_html = pug_html + "\u003Ca" + (" class=\"navigation__link\""+pug.attr("href", link, true, true)) + "\u003E" + (pug.escape(null == (pug_interp = item.name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E";
}
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var itemIndex in $$obj) {
      $$l++;
      var item = $$obj[itemIndex];
const link = item.link || 'change-me';

let itemClassName = 'navigation__item';
if (item.isActive) {
    itemClassName += ' navigation__item_active';
}

pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli" + (pug.attr("class", pug.classes([itemClassName], [true]), false, true)) + "\u003E";
if ((item.subitems)) {
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + ("\u003Cbutton class=\"navigation__link\"\u003E" + (pug.escape(null == (pug_interp = item.name) ? "" : pug_interp)));
pug_indent.push('        ');
pug_mixins["arrow"]({ withoutPadding: true });
pug_indent.pop();
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fbutton\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cul class=\"navigation__subitems\"\u003E";
// iterate item.subitems
;(function(){
  var $$obj = item.subitems;
  if ('number' == typeof $$obj.length) {
      for (var pug_index2 = 0, $$l = $$obj.length; pug_index2 < $$l; pug_index2++) {
        var subitem = $$obj[pug_index2];
pug_html = pug_html + "\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"navigation__subitem\"\u003E\u003Ca" + (" class=\"navigation__link\""+pug.attr("href", subitem.link || 'change-me', true, true)) + "\u003E" + (pug.escape(null == (pug_interp = subitem.name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index2 in $$obj) {
      $$l++;
      var subitem = $$obj[pug_index2];
pug_html = pug_html + "\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"navigation__subitem\"\u003E\u003Ca" + (" class=\"navigation__link\""+pug.attr("href", subitem.link || 'change-me', true, true)) + "\u003E" + (pug.escape(null == (pug_interp = subitem.name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Ful\u003E";
}
else {
pug_html = pug_html + "\u003Ca" + (" class=\"navigation__link\""+pug.attr("href", link, true, true)) + "\u003E" + (pug.escape(null == (pug_interp = item.name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E";
}
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Ful\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fnav\u003E";
};
pug_mixins["header"] = pug_interp = function({ userName, activeLink } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cheader class=\"header js-header\"\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"header__container\"\u003E\u003Ca class=\"header__logo\" href=\"landing-page.html\"\u003E\u003Cimg src=\"images\u002Flogo.svg\" alt=\"logo\"\u003E\u003C\u002Fa\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"header__menu js-header__menu\"\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"header__nav-container\"\u003E";
pug_indent.push('        ');
pug_mixins["navigation"]({
                        activeLinkIndex: activeLink,
                        items: [
                            {
                                name: 'О нас',
                            },
                            {
                                name: 'Услуги',
                                subitems: [{ name: 'Заказ комнаты' }],
                            },
                            {
                                name: 'Вакансии',
                            },
                            {
                                name: 'Новости',
                            },
                            {
                                name: 'Соглашения',
                                subitems: [
                                    { name: 'Правила' },
                                    { name: 'Конфиденциальность' },
                                ],
                            },
                        ].map((item, index) => ({ ...item, isActive: activeLink === index })),
                        withJs: true,
                    });
pug_indent.pop();
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
if (userName) {
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"header__user\"\u003E" + (pug.escape(null == (pug_interp = userName) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E";
}
else {
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"header__buttons\"\u003E";
pug_indent.push('        ');
pug_mixins["button"]({
                            text: 'Войти',
                            hasLink: true,
                            link: 'login.html',
                            modifiers: {
                                isSecondary: true,
                                isNarrow: true,
                            },
                        });
pug_indent.pop();
pug_indent.push('        ');
pug_mixins["button"]({
                            text: 'Зарегистрироваться',
                            hasLink: true,
                            link: 'registration.html',
                            modifiers: {
                              isNarrow: true,
                            },
                        });
pug_indent.pop();
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cbutton class=\"header__hamburger js-header__hamburger\"\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"header__hamburger-icon\"\u003E\u003C\u002Fdiv\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fbutton\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fheader\u003E";
};
pug_mixins["arrow"] = pug_interp = function({ type, color, withoutPadding = false } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'arrow';
let iconName = 'expand_more';

switch (type) {
    case 'expand-less':
        iconName = 'expand_less';
        break;
    case 'forward':
        iconName = 'arrow_forward';
        break;
    default:
        break;
}

switch (color) {
    case 'white':
        className += ' arrow_color_white';
        break;
    case 'purple-gradient':
        className += ' arrow_color_purple-gradient';
        break;
    default:
        break;
}

if (withoutPadding) {
    className += ' arrow_without-padding';
}

pug_html = pug_html + "\u003Cspan" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = iconName) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
};
pug_mixins["navigation"] = pug_interp = function({ items, activeLinkIndex, inColumn = false, withJs = false }){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'navigation';
if (inColumn) {
    className += ' navigation_in-column';
}
if (withJs) {
    className += ' js-navigation';
}
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cnav" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cul class=\"navigation__list\"\u003E";
// iterate items
;(function(){
  var $$obj = items;
  if ('number' == typeof $$obj.length) {
      for (var itemIndex = 0, $$l = $$obj.length; itemIndex < $$l; itemIndex++) {
        var item = $$obj[itemIndex];
const link = item.link || 'change-me';

let itemClassName = 'navigation__item';
if (item.isActive) {
    itemClassName += ' navigation__item_active';
}

pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli" + (pug.attr("class", pug.classes([itemClassName], [true]), false, true)) + "\u003E";
if ((item.subitems)) {
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + ("\u003Cbutton class=\"navigation__link\"\u003E" + (pug.escape(null == (pug_interp = item.name) ? "" : pug_interp)));
pug_indent.push('        ');
pug_mixins["arrow"]({ withoutPadding: true });
pug_indent.pop();
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fbutton\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cul class=\"navigation__subitems\"\u003E";
// iterate item.subitems
;(function(){
  var $$obj = item.subitems;
  if ('number' == typeof $$obj.length) {
      for (var pug_index4 = 0, $$l = $$obj.length; pug_index4 < $$l; pug_index4++) {
        var subitem = $$obj[pug_index4];
pug_html = pug_html + "\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"navigation__subitem\"\u003E\u003Ca" + (" class=\"navigation__link\""+pug.attr("href", subitem.link || 'change-me', true, true)) + "\u003E" + (pug.escape(null == (pug_interp = subitem.name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index4 in $$obj) {
      $$l++;
      var subitem = $$obj[pug_index4];
pug_html = pug_html + "\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"navigation__subitem\"\u003E\u003Ca" + (" class=\"navigation__link\""+pug.attr("href", subitem.link || 'change-me', true, true)) + "\u003E" + (pug.escape(null == (pug_interp = subitem.name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Ful\u003E";
}
else {
pug_html = pug_html + "\u003Ca" + (" class=\"navigation__link\""+pug.attr("href", link, true, true)) + "\u003E" + (pug.escape(null == (pug_interp = item.name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E";
}
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var itemIndex in $$obj) {
      $$l++;
      var item = $$obj[itemIndex];
const link = item.link || 'change-me';

let itemClassName = 'navigation__item';
if (item.isActive) {
    itemClassName += ' navigation__item_active';
}

pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli" + (pug.attr("class", pug.classes([itemClassName], [true]), false, true)) + "\u003E";
if ((item.subitems)) {
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + ("\u003Cbutton class=\"navigation__link\"\u003E" + (pug.escape(null == (pug_interp = item.name) ? "" : pug_interp)));
pug_indent.push('        ');
pug_mixins["arrow"]({ withoutPadding: true });
pug_indent.pop();
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fbutton\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cul class=\"navigation__subitems\"\u003E";
// iterate item.subitems
;(function(){
  var $$obj = item.subitems;
  if ('number' == typeof $$obj.length) {
      for (var pug_index5 = 0, $$l = $$obj.length; pug_index5 < $$l; pug_index5++) {
        var subitem = $$obj[pug_index5];
pug_html = pug_html + "\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"navigation__subitem\"\u003E\u003Ca" + (" class=\"navigation__link\""+pug.attr("href", subitem.link || 'change-me', true, true)) + "\u003E" + (pug.escape(null == (pug_interp = subitem.name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index5 in $$obj) {
      $$l++;
      var subitem = $$obj[pug_index5];
pug_html = pug_html + "\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"navigation__subitem\"\u003E\u003Ca" + (" class=\"navigation__link\""+pug.attr("href", subitem.link || 'change-me', true, true)) + "\u003E" + (pug.escape(null == (pug_interp = subitem.name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Ful\u003E";
}
else {
pug_html = pug_html + "\u003Ca" + (" class=\"navigation__link\""+pug.attr("href", link, true, true)) + "\u003E" + (pug.escape(null == (pug_interp = item.name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E";
}
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Ful\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fnav\u003E";
};
pug_mixins["heading"] = pug_interp = function({ text = '', type = 'h3', color, withJs = false }){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'heading';
let tag;

switch (type) {
    case 'h3':
        className += ' heading_type_h3';
        tag = 'h3';
        break;
    case 'h2':
        className += ' heading_type_h2';
        tag = 'h2';
        break;
    case 'inline':
        className += ' heading_type_h3';
        tag = 'span';
        break;
    default:
        tag = 'h1';
        break;
}
switch (color) {
    case 'white':
        className += ' heading_color_white';
        break;
    case 'purple':
        className += ' heading_color_purple';
        break;
    case 'gray':
        className += ' heading_color_gray';
        break;
    case 'inherit':
        className += ' heading_color_inherit';
        break;
    default:
        break;
}
if (withJs) {
  className += ' js-heading';
}

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C" + (tag) + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = text) ? "" : pug_interp)) + "\u003C\u002F" + (tag) + "\u003E";
};
pug_mixins["arrow"] = pug_interp = function({ type, color, withoutPadding = false } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'arrow';
let iconName = 'expand_more';

switch (type) {
    case 'expand-less':
        iconName = 'expand_less';
        break;
    case 'forward':
        iconName = 'arrow_forward';
        break;
    default:
        break;
}

switch (color) {
    case 'white':
        className += ' arrow_color_white';
        break;
    case 'purple-gradient':
        className += ' arrow_color_purple-gradient';
        break;
    default:
        break;
}

if (withoutPadding) {
    className += ' arrow_without-padding';
}

pug_html = pug_html + "\u003Cspan" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E" + (pug.escape(null == (pug_interp = iconName) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
};
pug_mixins["text-field"] = pug_interp = function({ inputOptions = {}, arrowOptions, modifiers = {}, withJs = false } = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
let className = 'text-field';

if (modifiers.isFocused) {
    className += ' text-field_focused';
}
if (modifiers.isShort) {
    className += ' text-field_short';
}
if (modifiers.isBottomFlat) {
    className += ' text-field_flat-bottom';
}
if (modifiers.isClickable) {
    className += ' text-field_clickable';
}

if (withJs) {
    className += ' js-text-field';
}

pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv" + (pug.attr("class", pug.classes([className], [true]), false, true)) + "\u003E";
let inputClassName = 'text-field__input';
if (arrowOptions) {
    inputClassName += ' text-field__input_with-arrow';
}
if (inputOptions.isMaskedDate) {
    inputClassName += ' text-field__input_masked-date js-text-field__input_masked-date'
}
if (inputOptions.withJs) {
    inputClassName += ' js-text-field__input';
}

pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cinput" + (pug.attr("class", pug.classes([inputClassName], [true]), false, true)+pug.attr("type", inputOptions.type, true, true)+pug.attr("placeholder", inputOptions.placeholder, true, true)+pug.attr("value", inputOptions.value, true, true)+pug.attr("readonly", inputOptions.isReadonly, true, true)) + "\u003E";
if ((arrowOptions)) {
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cbutton" + (" class=\"text-field__arrow\""+pug.attr("type", inputOptions.isSubmit ? 'submit' : 'button', true, true)) + "\u003E";
pug_indent.push('    ');
pug_mixins["arrow"](arrowOptions);
pug_indent.pop();
pug_html = pug_html + "\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fbutton\u003E";
}
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
};
pug_mixins["social-links"] = pug_interp = function(){
var block = (this && this.block), attributes = (this && this.attributes) || {};
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cul class=\"social-links\"\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"social-links__item\"\u003E\u003Ca class=\"social-links__link\" href=\"change-me\"\u003E\u003Cspan class=\"social-links__icon fab fa-twitter\"\u003E\u003C\u002Fspan\u003E\u003C\u002Fa\u003E\u003C\u002Fli\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"social-links__item\"\u003E\u003Ca class=\"social-links__link\" href=\"change-me\"\u003E\u003Cspan class=\"social-links__icon fab fa-facebook-square\"\u003E\u003C\u002Fspan\u003E\u003C\u002Fa\u003E\u003C\u002Fli\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cli class=\"social-links__item\"\u003E\u003Ca class=\"social-links__link\" href=\"change-me\"\u003E\u003Cspan class=\"social-links__icon fab fa-instagram\"\u003E\u003C\u002Fspan\u003E\u003C\u002Fa\u003E\u003C\u002Fli\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Ful\u003E";
};
pug_mixins["footer"] = pug_interp = function(){
var block = (this && this.block), attributes = (this && this.attributes) || {};
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cfooter class=\"footer\"\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"footer__body\"\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"footer__main-info\"\u003E\u003Ca href=\"landing-page.html\"\u003E\u003Cimg src=\"images\u002Flogo.svg\" alt=\"logo\"\u003E\u003C\u002Fa\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cp class=\"footer__description\"\u003EБронирование номеров в лучшем отеле 2019 года по версии ассоциации «Отельные взгляды»\u003C\u002Fp\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"footer__menu\"\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"footer__nav\"\u003E\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"footer__subtitle\"\u003E";
pug_indent.push('          ');
pug_mixins["heading"]({ text: 'Навигация' });
pug_indent.pop();
pug_html = pug_html + "\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
pug_indent.push('        ');
pug_mixins["navigation"]({
                        items: [
                            { name: 'О нас' },
                            { name: 'Новости' },
                            { name: 'Служба поддержки' },
                            { name: 'Услуги' },
                        ],
                        inColumn: true,
                    });
pug_indent.pop();
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"footer__nav\"\u003E\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"footer__subtitle\"\u003E";
pug_indent.push('          ');
pug_mixins["heading"]({ text: 'О нас' });
pug_indent.pop();
pug_html = pug_html + "\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
pug_indent.push('        ');
pug_mixins["navigation"]({
                        items: [
                            { name: 'О сервисе' },
                            { name: 'Наша команда' },
                            { name: 'Вакансии' },
                            { name: 'Инвесторы' },
                        ],
                        inColumn: true,
                    });
pug_indent.pop();
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"footer__nav\"\u003E\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"footer__subtitle\"\u003E";
pug_indent.push('          ');
pug_mixins["heading"]({ text: 'Служба поддержки' });
pug_indent.pop();
pug_html = pug_html + "\n        ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
pug_indent.push('        ');
pug_mixins["navigation"]({
                        items: [
                            { name: 'Соглашения' },
                            { name: 'Сообщества' },
                            { name: 'Связь с нами' },
                        ],
                        inColumn: true,
                    });
pug_indent.pop();
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cform class=\"footer__subscription\"\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"footer__subtitle footer__subtitle_without-margin-bottom\"\u003E";
pug_indent.push('        ');
pug_mixins["heading"]({ text: 'Подписка' });
pug_indent.pop();
pug_html = pug_html + "\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n      ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"footer__subscription-text\"\u003EПолучайте специальные предложения и новости сервиса\u003C\u002Fdiv\u003E";
pug_indent.push('      ');
pug_mixins["text-field"]({
                    inputOptions: {
                        placeholder: 'Email',
                        type: 'email',
                        isSubmit: true,
                    },
                    modifiers: {
                        isShort: true,
                    },
                    arrowOptions: {
                        type: 'forward',
                        color: 'purple-gradient',
                    },
                });
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fform\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"footer__bottom\"\u003E\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Cdiv class=\"footer__bottom-container\"\u003E\u003Cspan class=\"footer__copyright\"\u003ECopyright © 2018 Toxin отель. Все права защищены.\u003C\u002Fspan\u003E";
pug_indent.push('      ');
pug_mixins["social-links"]();
pug_indent.pop();
pug_html = pug_html + "\n    ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n  ";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003C\u002Ffooter\u003E";
};
pug_html = pug_html + "\u003C!DOCTYPE html\u003E\n\u003Chtml lang=\"ru\"\u003E\n  \u003Chead\u003E\n    \u003Cmeta charset=\"utf-8\"\u003E\n    \u003Cmeta" + (" name=\"description\""+pug.attr("content", `Toxin Hotel. Room reservations. ${title}`, true, true)) + "\u003E\n    \u003Cmeta name=\"keywords\" content=\"toxin, hotel, отель, забронировать, room, комнаты, book, reservation\"\u003E\n    \u003Cmeta name=\"viewport\" content=\"initial-scale=1.0, width=device-width\"\u003E\n    \u003Clink" + (" rel=\"apple-touch-icon\" sizes=\"180x180\""+pug.attr("href", __webpack_require__(6).default, true, true)) + "\u003E\n    \u003Clink" + (" rel=\"icon\" type=\"image\u002Fpng\" sizes=\"32x32\""+pug.attr("href", __webpack_require__(8).default, true, true)) + "\u003E\n    \u003Clink" + (" rel=\"icon\" type=\"image\u002Fpng\" sizes=\"16x16\""+pug.attr("href", __webpack_require__(7).default, true, true)) + "\u003E\n    \u003Clink rel=\"manifest\" href=\".\u002Fsite.webmanifest\"\u003E\n    \u003Clink" + (" rel=\"mask-icon\""+pug.attr("href", __webpack_require__(10).default, true, true)+" color=\"#bc9cff\"") + "\u003E\n    \u003Clink" + (" rel=\"shortcut icon\""+pug.attr("href", __webpack_require__(9).default, true, true)) + "\u003E\n    \u003Cmeta name=\"msapplication-TileColor\" content=\"#603cba\"\u003E\n    \u003Cmeta name=\"msapplication-config\" content=\".\u002Fbrowserconfig.xml\"\u003E\n    \u003Cmeta name=\"theme-color\" content=\"#ffffff\"\u003E\n    \u003Ctitle\u003E" + (pug.escape(null == (pug_interp = title) ? "" : pug_interp)) + "\u003C\u002Ftitle\u003E\n  \u003C\u002Fhead\u003E\n  \u003Cbody\u003E";
pug_indent.push('    ');
pug_mixins["header"]({ activeLink });
pug_indent.pop();
pug_html = pug_html + "\n    \u003Cmain\u003E\n    \u003C\u002Fmain\u003E";
pug_indent.push('    ');
pug_mixins["footer"]();
pug_indent.pop();
pug_html = pug_html + "\n  \u003C\u002Fbody\u003E\n\u003C\u002Fhtml\u003E";
    }.call(this, "activeLink" in locals_for_with ?
        locals_for_with.activeLink :
        typeof activeLink !== 'undefined' ? activeLink : undefined, "pug_indent" in locals_for_with ?
        locals_for_with.pug_indent :
        typeof pug_indent !== 'undefined' ? pug_indent : undefined, "title" in locals_for_with ?
        locals_for_with.title :
        typeof title !== 'undefined' ? title : undefined));
    ;;return pug_html;};
module.exports = template;

/***/ }),
/* 101 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./src/public/browserconfig.xml
/* harmony default export */ var browserconfig = (__webpack_require__.p + "browserconfig.xml");
// CONCATENATED MODULE: ./src/public/site.webmanifest
/* harmony default export */ var site_webmanifest = (__webpack_require__.p + "site.webmanifest");
// EXTERNAL MODULE: ./src/js/helpers/importAll.js
var importAll = __webpack_require__(24);

// CONCATENATED MODULE: ./src/js/main.js



Object(importAll["a" /* default */])(__webpack_require__(45));
Object(importAll["a" /* default */])(__webpack_require__(55));

/***/ }),
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */,
/* 114 */,
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */,
/* 121 */,
/* 122 */,
/* 123 */,
/* 124 */,
/* 125 */,
/* 126 */,
/* 127 */,
/* 128 */,
/* 129 */,
/* 130 */,
/* 131 */,
/* 132 */,
/* 133 */,
/* 134 */,
/* 135 */,
/* 136 */,
/* 137 */,
/* 138 */,
/* 139 */,
/* 140 */,
/* 141 */,
/* 142 */,
/* 143 */,
/* 144 */,
/* 145 */,
/* 146 */,
/* 147 */,
/* 148 */,
/* 149 */,
/* 150 */,
/* 151 */,
/* 152 */,
/* 153 */,
/* 154 */,
/* 155 */,
/* 156 */,
/* 157 */,
/* 158 */,
/* 159 */,
/* 160 */,
/* 161 */,
/* 162 */,
/* 163 */,
/* 164 */,
/* 165 */,
/* 166 */,
/* 167 */,
/* 168 */,
/* 169 */,
/* 170 */,
/* 171 */,
/* 172 */,
/* 173 */,
/* 174 */,
/* 175 */,
/* 176 */,
/* 177 */,
/* 178 */,
/* 179 */,
/* 180 */,
/* 181 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./src/styles/main.sass
var main = __webpack_require__(44);

// EXTERNAL MODULE: ./src/js/main.js + 2 modules
var js_main = __webpack_require__(101);

// CONCATENATED MODULE: ./src/pages/ui-kit/colors-and-type/colors-and-type.sass
// extracted by mini-css-extract-plugin

// CONCATENATED MODULE: ./src/pages/ui-kit/colors-and-type/colors-and-type.js




/***/ })
/******/ ]);