(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["react-syntax-highlighter_languages_highlight_apache"],{

/***/ "./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/apache.js":
/*!*************************************************************************************************!*\
  !*** ./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/apache.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function(hljs) {\n  var NUMBER = {className: 'number', begin: '[\\\\$%]\\\\d+'};\n  return {\n    aliases: ['apacheconf'],\n    case_insensitive: true,\n    contains: [\n      hljs.HASH_COMMENT_MODE,\n      {className: 'section', begin: '</?', end: '>'},\n      {\n        className: 'attribute',\n        begin: /\\w+/,\n        relevance: 0,\n        // keywords aren’t needed for highlighting per se, they only boost relevance\n        // for a very generally defined mode (starts with a word, ends with line-end\n        keywords: {\n          nomarkup:\n            'order deny allow setenv rewriterule rewriteengine rewritecond documentroot ' +\n            'sethandler errordocument loadmodule options header listen serverroot ' +\n            'servername'\n        },\n        starts: {\n          end: /$/,\n          relevance: 0,\n          keywords: {\n            literal: 'on off all'\n          },\n          contains: [\n            {\n              className: 'meta',\n              begin: '\\\\s\\\\[', end: '\\\\]$'\n            },\n            {\n              className: 'variable',\n              begin: '[\\\\$%]\\\\{', end: '\\\\}',\n              contains: ['self', NUMBER]\n            },\n            NUMBER,\n            hljs.QUOTE_STRING_MODE\n          ]\n        }\n      }\n    ],\n    illegal: /\\S/\n  };\n};\n\n//# sourceURL=webpack:///./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/apache.js?");

/***/ })

}]);