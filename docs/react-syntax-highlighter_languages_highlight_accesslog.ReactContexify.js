(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["react-syntax-highlighter_languages_highlight_accesslog"],{

/***/ "./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/accesslog.js":
/*!****************************************************************************************************!*\
  !*** ./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/accesslog.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function(hljs) {\n  return {\n    contains: [\n      // IP\n      {\n        className: 'number',\n        begin: '\\\\b\\\\d{1,3}\\\\.\\\\d{1,3}\\\\.\\\\d{1,3}\\\\.\\\\d{1,3}(:\\\\d{1,5})?\\\\b'\n      },\n      // Other numbers\n      {\n        className: 'number',\n        begin: '\\\\b\\\\d+\\\\b',\n        relevance: 0\n      },\n      // Requests\n      {\n        className: 'string',\n        begin: '\"(GET|POST|HEAD|PUT|DELETE|CONNECT|OPTIONS|PATCH|TRACE)', end: '\"',\n        keywords: 'GET POST HEAD PUT DELETE CONNECT OPTIONS PATCH TRACE',\n        illegal: '\\\\n',\n        relevance: 10\n      },\n      // Dates\n      {\n        className: 'string',\n        begin: /\\[/, end: /\\]/,\n        illegal: '\\\\n'\n      },\n      // Strings\n      {\n        className: 'string',\n        begin: '\"', end: '\"',\n        illegal: '\\\\n'\n      }\n    ]\n  };\n};\n\n//# sourceURL=webpack:///./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/accesslog.js?");

/***/ })

}]);