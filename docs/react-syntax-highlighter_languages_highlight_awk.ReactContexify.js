(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["react-syntax-highlighter_languages_highlight_awk"],{

/***/ "./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/awk.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/awk.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function(hljs) {\n  var VARIABLE = {\n    className: 'variable',\n    variants: [\n      {begin: /\\$[\\w\\d#@][\\w\\d_]*/},\n      {begin: /\\$\\{(.*?)}/}\n    ]\n  };\n  var KEYWORDS = 'BEGIN END if else while do for in break continue delete next nextfile function func exit|10';\n  var STRING = {\n    className: 'string',\n    contains: [hljs.BACKSLASH_ESCAPE],\n    variants: [\n      {\n        begin: /(u|b)?r?'''/, end: /'''/,\n        relevance: 10\n      },\n      {\n        begin: /(u|b)?r?\"\"\"/, end: /\"\"\"/,\n        relevance: 10\n      },\n      {\n        begin: /(u|r|ur)'/, end: /'/,\n        relevance: 10\n      },\n      {\n        begin: /(u|r|ur)\"/, end: /\"/,\n        relevance: 10\n      },\n      {\n        begin: /(b|br)'/, end: /'/\n      },\n      {\n        begin: /(b|br)\"/, end: /\"/\n      },\n      hljs.APOS_STRING_MODE,\n      hljs.QUOTE_STRING_MODE\n    ]\n  };\n  return {\n\t keywords: {\n\t   keyword: KEYWORDS\n    },\n    contains: [\n      VARIABLE,\n      STRING,\n      hljs.REGEXP_MODE,\n      hljs.HASH_COMMENT_MODE,\n      hljs.NUMBER_MODE\n    ]\n  }\n};\n\n//# sourceURL=webpack:///./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/awk.js?");

/***/ })

}]);