(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["react-syntax-highlighter_languages_highlight_dsconfig"],{

/***/ "./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/dsconfig.js":
/*!***************************************************************************************************!*\
  !*** ./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/dsconfig.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function(hljs) {\n  var QUOTED_PROPERTY = {\n    className: 'string',\n    begin: /\"/, end: /\"/\n  };\n  var APOS_PROPERTY = {\n    className: 'string',\n    begin: /'/, end: /'/\n  };\n  var UNQUOTED_PROPERTY = {\n    className: 'string',\n    begin: '[\\\\w-?]+:\\\\w+', end: '\\\\W',\n    relevance: 0\n  };\n  var VALUELESS_PROPERTY = {\n    className: 'string',\n    begin: '\\\\w+-?\\\\w+', end: '\\\\W',\n    relevance: 0\n  };\n\n  return {\n    keywords: 'dsconfig',\n    contains: [\n      {\n        className: 'keyword',\n        begin: '^dsconfig', end: '\\\\s', excludeEnd: true,\n        relevance: 10\n      },\n      {\n        className: 'built_in',\n        begin: '(list|create|get|set|delete)-(\\\\w+)', end: '\\\\s', excludeEnd: true,\n        illegal: '!@#$%^&*()',\n        relevance: 10\n      },\n      {\n        className: 'built_in',\n        begin: '--(\\\\w+)', end: '\\\\s', excludeEnd: true\n      },\n      QUOTED_PROPERTY,\n      APOS_PROPERTY,\n      UNQUOTED_PROPERTY,\n      VALUELESS_PROPERTY,\n      hljs.HASH_COMMENT_MODE\n    ]\n  };\n};\n\n//# sourceURL=webpack:///./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/dsconfig.js?");

/***/ })

}]);