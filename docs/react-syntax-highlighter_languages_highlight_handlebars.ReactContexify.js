(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["react-syntax-highlighter_languages_highlight_handlebars"],{

/***/ "./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/handlebars.js":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/handlebars.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function(hljs) {\n  var BUILT_INS = {'builtin-name': 'each in with if else unless bindattr action collection debugger log outlet template unbound view yield'};\n  return {\n    aliases: ['hbs', 'html.hbs', 'html.handlebars'],\n    case_insensitive: true,\n    subLanguage: 'xml',\n    contains: [\n    hljs.COMMENT('{{!(--)?', '(--)?}}'),\n      {\n        className: 'template-tag',\n        begin: /\\{\\{[#\\/]/, end: /\\}\\}/,\n        contains: [\n          {\n            className: 'name',\n            begin: /[a-zA-Z\\.-]+/,\n            keywords: BUILT_INS,\n            starts: {\n              endsWithParent: true, relevance: 0,\n              contains: [\n                hljs.QUOTE_STRING_MODE\n              ]\n            }\n          }\n        ]\n      },\n      {\n        className: 'template-variable',\n        begin: /\\{\\{/, end: /\\}\\}/,\n        keywords: BUILT_INS\n      }\n    ]\n  };\n};\n\n//# sourceURL=webpack:///./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/handlebars.js?");

/***/ })

}]);