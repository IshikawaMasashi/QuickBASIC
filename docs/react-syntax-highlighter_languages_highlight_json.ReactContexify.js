(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["react-syntax-highlighter_languages_highlight_json"],{

/***/ "./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/json.js":
/*!***********************************************************************************************!*\
  !*** ./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/json.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function(hljs) {\n  var LITERALS = {literal: 'true false null'};\n  var TYPES = [\n    hljs.QUOTE_STRING_MODE,\n    hljs.C_NUMBER_MODE\n  ];\n  var VALUE_CONTAINER = {\n    end: ',', endsWithParent: true, excludeEnd: true,\n    contains: TYPES,\n    keywords: LITERALS\n  };\n  var OBJECT = {\n    begin: '{', end: '}',\n    contains: [\n      {\n        className: 'attr',\n        begin: /\"/, end: /\"/,\n        contains: [hljs.BACKSLASH_ESCAPE],\n        illegal: '\\\\n',\n      },\n      hljs.inherit(VALUE_CONTAINER, {begin: /:/})\n    ],\n    illegal: '\\\\S'\n  };\n  var ARRAY = {\n    begin: '\\\\[', end: '\\\\]',\n    contains: [hljs.inherit(VALUE_CONTAINER)], // inherit is a workaround for a bug that makes shared modes with endsWithParent compile only the ending of one of the parents\n    illegal: '\\\\S'\n  };\n  TYPES.splice(TYPES.length, 0, OBJECT, ARRAY);\n  return {\n    contains: TYPES,\n    keywords: LITERALS,\n    illegal: '\\\\S'\n  };\n};\n\n//# sourceURL=webpack:///./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/json.js?");

/***/ })

}]);