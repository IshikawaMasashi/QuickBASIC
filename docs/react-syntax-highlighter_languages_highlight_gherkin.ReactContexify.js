(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["react-syntax-highlighter_languages_highlight_gherkin"],{

/***/ "./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/gherkin.js":
/*!**************************************************************************************************!*\
  !*** ./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/gherkin.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function (hljs) {\n  return {\n    aliases: ['feature'],\n    keywords: 'Feature Background Ability Business\\ Need Scenario Scenarios Scenario\\ Outline Scenario\\ Template Examples Given And Then But When',\n    contains: [\n      {\n        className: 'symbol',\n        begin: '\\\\*',\n        relevance: 0\n      },\n      {\n        className: 'meta',\n        begin: '@[^@\\\\s]+'\n      },\n      {\n        begin: '\\\\|', end: '\\\\|\\\\w*$',\n        contains: [\n          {\n            className: 'string',\n            begin: '[^|]+'\n          }\n        ]\n      },\n      {\n        className: 'variable',\n        begin: '<', end: '>'\n      },\n      hljs.HASH_COMMENT_MODE,\n      {\n        className: 'string',\n        begin: '\"\"\"', end: '\"\"\"'\n      },\n      hljs.QUOTE_STRING_MODE\n    ]\n  };\n};\n\n//# sourceURL=webpack:///./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/gherkin.js?");

/***/ })

}]);