(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["react-syntax-highlighter_languages_highlight_fix"],{

/***/ "./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/fix.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/fix.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function(hljs) {\n  return {\n    contains: [\n    {\n      begin: /[^\\u2401\\u0001]+/,\n      end: /[\\u2401\\u0001]/,\n      excludeEnd: true,\n      returnBegin: true,\n      returnEnd: false,\n      contains: [\n      {\n        begin: /([^\\u2401\\u0001=]+)/,\n        end: /=([^\\u2401\\u0001=]+)/,\n        returnEnd: true,\n        returnBegin: false,\n        className: 'attr'\n      },\n      {\n        begin: /=/,\n        end: /([\\u2401\\u0001])/,\n        excludeEnd: true,\n        excludeBegin: true,\n        className: 'string'\n      }]\n    }],\n    case_insensitive: true\n  };\n};\n\n//# sourceURL=webpack:///./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/fix.js?");

/***/ })

}]);