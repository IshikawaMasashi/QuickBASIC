(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["react-syntax-highlighter_languages_highlight_dust"],{

/***/ "./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/dust.js":
/*!***********************************************************************************************!*\
  !*** ./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/dust.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function(hljs) {\n  var EXPRESSION_KEYWORDS = 'if eq ne lt lte gt gte select default math sep';\n  return {\n    aliases: ['dst'],\n    case_insensitive: true,\n    subLanguage: 'xml',\n    contains: [\n      {\n        className: 'template-tag',\n        begin: /\\{[#\\/]/, end: /\\}/, illegal: /;/,\n        contains: [\n          {\n            className: 'name',\n            begin: /[a-zA-Z\\.-]+/,\n            starts: {\n              endsWithParent: true, relevance: 0,\n              contains: [\n                hljs.QUOTE_STRING_MODE\n              ]\n            }\n          }\n        ]\n      },\n      {\n        className: 'template-variable',\n        begin: /\\{/, end: /\\}/, illegal: /;/,\n        keywords: EXPRESSION_KEYWORDS\n      }\n    ]\n  };\n};\n\n//# sourceURL=webpack:///./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/dust.js?");

/***/ })

}]);