(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["react-syntax-highlighter_languages_highlight_subunit"],{

/***/ "./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/subunit.js":
/*!**************************************************************************************************!*\
  !*** ./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/subunit.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function(hljs) {\n  var DETAILS = {\n    className: 'string',\n    begin: '\\\\[\\n(multipart)?', end: '\\\\]\\n'\n  };\n  var TIME = {\n    className: 'string',\n    begin: '\\\\d{4}-\\\\d{2}-\\\\d{2}(\\\\s+)\\\\d{2}:\\\\d{2}:\\\\d{2}\\.\\\\d+Z'\n  };\n  var PROGRESSVALUE = {\n    className: 'string',\n    begin: '(\\\\+|-)\\\\d+'\n  };\n  var KEYWORDS = {\n    className: 'keyword',\n    relevance: 10,\n    variants: [\n      { begin: '^(test|testing|success|successful|failure|error|skip|xfail|uxsuccess)(:?)\\\\s+(test)?' },\n      { begin: '^progress(:?)(\\\\s+)?(pop|push)?' },\n      { begin: '^tags:' },\n      { begin: '^time:' }\n    ],\n  };\n  return {\n    case_insensitive: true,\n    contains: [\n      DETAILS,\n      TIME,\n      PROGRESSVALUE,\n      KEYWORDS\n    ]\n  };\n};\n\n//# sourceURL=webpack:///./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/subunit.js?");

/***/ })

}]);