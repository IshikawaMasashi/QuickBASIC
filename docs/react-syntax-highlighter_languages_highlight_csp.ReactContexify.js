(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["react-syntax-highlighter_languages_highlight_csp"],{

/***/ "./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/csp.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/csp.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function(hljs) {\n  return {\n    case_insensitive: false,\n    lexemes: '[a-zA-Z][a-zA-Z0-9_-]*',\n    keywords: {\n      keyword: 'base-uri child-src connect-src default-src font-src form-action' +\n        ' frame-ancestors frame-src img-src media-src object-src plugin-types' +\n        ' report-uri sandbox script-src style-src', \n    },\n    contains: [\n    {\n      className: 'string',\n      begin: \"'\", end: \"'\"\n    },\n    {\n      className: 'attribute',\n      begin: '^Content', end: ':', excludeEnd: true,\n    },\n    ]\n  };\n};\n\n//# sourceURL=webpack:///./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/csp.js?");

/***/ })

}]);