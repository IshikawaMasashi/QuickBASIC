(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["react-syntax-highlighter_languages_highlight_ldif"],{

/***/ "./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/ldif.js":
/*!***********************************************************************************************!*\
  !*** ./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/ldif.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function(hljs) {\n  return {\n    contains: [\n      {\n        className: 'attribute',\n        begin: '^dn', end: ': ', excludeEnd: true,\n        starts: {end: '$', relevance: 0},\n        relevance: 10\n      },\n      {\n        className: 'attribute',\n        begin: '^\\\\w', end: ': ', excludeEnd: true,\n        starts: {end: '$', relevance: 0}\n      },\n      {\n        className: 'literal',\n        begin: '^-', end: '$'\n      },\n      hljs.HASH_COMMENT_MODE\n    ]\n  };\n};\n\n//# sourceURL=webpack:///./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/ldif.js?");

/***/ })

}]);