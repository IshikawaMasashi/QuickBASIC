(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["react-syntax-highlighter_languages_highlight_http"],{

/***/ "./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/http.js":
/*!***********************************************************************************************!*\
  !*** ./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/http.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function(hljs) {\n  var VERSION = 'HTTP/[0-9\\\\.]+';\n  return {\n    aliases: ['https'],\n    illegal: '\\\\S',\n    contains: [\n      {\n        begin: '^' + VERSION, end: '$',\n        contains: [{className: 'number', begin: '\\\\b\\\\d{3}\\\\b'}]\n      },\n      {\n        begin: '^[A-Z]+ (.*?) ' + VERSION + '$', returnBegin: true, end: '$',\n        contains: [\n          {\n            className: 'string',\n            begin: ' ', end: ' ',\n            excludeBegin: true, excludeEnd: true\n          },\n          {\n            begin: VERSION\n          },\n          {\n            className: 'keyword',\n            begin: '[A-Z]+'\n          }\n        ]\n      },\n      {\n        className: 'attribute',\n        begin: '^\\\\w', end: ': ', excludeEnd: true,\n        illegal: '\\\\n|\\\\s|=',\n        starts: {end: '$', relevance: 0}\n      },\n      {\n        begin: '\\\\n\\\\n',\n        starts: {subLanguage: [], endsWithParent: true}\n      }\n    ]\n  };\n};\n\n//# sourceURL=webpack:///./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/http.js?");

/***/ })

}]);