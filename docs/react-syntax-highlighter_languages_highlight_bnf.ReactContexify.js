(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["react-syntax-highlighter_languages_highlight_bnf"],{

/***/ "./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/bnf.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/bnf.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function(hljs){\n  return {\n    contains: [\n      // Attribute\n      {\n        className: 'attribute',\n        begin: /</, end: />/\n      },\n      // Specific\n      {\n        begin: /::=/,\n        starts: {\n          end: /$/,\n          contains: [\n            {\n              begin: /</, end: />/\n            },\n            // Common\n            hljs.C_LINE_COMMENT_MODE,\n            hljs.C_BLOCK_COMMENT_MODE,\n            hljs.APOS_STRING_MODE,\n            hljs.QUOTE_STRING_MODE\n          ]\n        }\n      }\n    ]\n  };\n};\n\n//# sourceURL=webpack:///./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/bnf.js?");

/***/ })

}]);