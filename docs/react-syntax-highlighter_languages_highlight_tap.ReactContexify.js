(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["react-syntax-highlighter_languages_highlight_tap"],{

/***/ "./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/tap.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/tap.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function(hljs) {\n  return {\n    case_insensitive: true,\n    contains: [\n      hljs.HASH_COMMENT_MODE,\n      // version of format and total amount of testcases\n      {\n        className: 'meta',\n        variants: [\n          { begin: '^TAP version (\\\\d+)$' },\n          { begin: '^1\\\\.\\\\.(\\\\d+)$' }\n        ],\n      },\n      // YAML block\n      {\n        begin: '(\\s+)?---$', end: '\\\\.\\\\.\\\\.$',\n        subLanguage: 'yaml',\n        relevance: 0\n      },\n\t  // testcase number\n      {\n        className: 'number',\n        begin: ' (\\\\d+) '\n      },\n\t  // testcase status and description\n      {\n        className: 'symbol',\n        variants: [\n          { begin: '^ok' },\n          { begin: '^not ok' }\n        ],\n      },\n    ]\n  };\n};\n\n//# sourceURL=webpack:///./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/tap.js?");

/***/ })

}]);