(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["react-syntax-highlighter_languages_highlight_profile"],{

/***/ "./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/profile.js":
/*!**************************************************************************************************!*\
  !*** ./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/profile.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function(hljs) {\n  return {\n    contains: [\n      hljs.C_NUMBER_MODE,\n      {\n        begin: '[a-zA-Z_][\\\\da-zA-Z_]+\\\\.[\\\\da-zA-Z_]{1,3}', end: ':',\n        excludeEnd: true\n      },\n      {\n        begin: '(ncalls|tottime|cumtime)', end: '$',\n        keywords: 'ncalls tottime|10 cumtime|10 filename',\n        relevance: 10\n      },\n      {\n        begin: 'function calls', end: '$',\n        contains: [hljs.C_NUMBER_MODE],\n        relevance: 10\n      },\n      hljs.APOS_STRING_MODE,\n      hljs.QUOTE_STRING_MODE,\n      {\n        className: 'string',\n        begin: '\\\\(', end: '\\\\)$',\n        excludeBegin: true, excludeEnd: true,\n        relevance: 0\n      }\n    ]\n  };\n};\n\n//# sourceURL=webpack:///./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/profile.js?");

/***/ })

}]);