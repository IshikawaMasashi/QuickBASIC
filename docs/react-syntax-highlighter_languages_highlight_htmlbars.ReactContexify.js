(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["react-syntax-highlighter_languages_highlight_htmlbars"],{

/***/ "./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/htmlbars.js":
/*!***************************************************************************************************!*\
  !*** ./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/htmlbars.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function(hljs) {\n  var BUILT_INS = 'action collection component concat debugger each each-in else get hash if input link-to loc log mut outlet partial query-params render textarea unbound unless with yield view';\n\n  var ATTR_ASSIGNMENT = {\n    illegal: /\\}\\}/,\n    begin: /[a-zA-Z0-9_]+=/,\n    returnBegin: true,\n    relevance: 0,\n    contains: [\n      {\n        className: 'attr', begin: /[a-zA-Z0-9_]+/\n      }\n    ]\n  };\n\n  var SUB_EXPR = {\n    illegal: /\\}\\}/,\n    begin: /\\)/, end: /\\)/,\n    contains: [\n      {\n        begin: /[a-zA-Z\\.\\-]+/,\n        keywords: {built_in: BUILT_INS},\n        starts: {\n          endsWithParent: true, relevance: 0,\n          contains: [\n            hljs.QUOTE_STRING_MODE,\n          ]\n        }\n      }\n    ]\n  };\n\n  var TAG_INNARDS = {\n    endsWithParent: true, relevance: 0,\n    keywords: {keyword: 'as', built_in: BUILT_INS},\n    contains: [\n      hljs.QUOTE_STRING_MODE,\n      ATTR_ASSIGNMENT,\n      hljs.NUMBER_MODE\n    ]\n  };\n\n  return {\n    case_insensitive: true,\n    subLanguage: 'xml',\n    contains: [\n      hljs.COMMENT('{{!(--)?', '(--)?}}'),\n      {\n        className: 'template-tag',\n        begin: /\\{\\{[#\\/]/, end: /\\}\\}/,\n        contains: [\n          {\n            className: 'name',\n            begin: /[a-zA-Z\\.\\-]+/,\n            keywords: {'builtin-name': BUILT_INS},\n            starts: TAG_INNARDS\n          }\n        ]\n      },\n      {\n        className: 'template-variable',\n        begin: /\\{\\{[a-zA-Z][a-zA-Z\\-]+/, end: /\\}\\}/,\n        keywords: {keyword: 'as', built_in: BUILT_INS},\n        contains: [\n          hljs.QUOTE_STRING_MODE\n        ]\n      }\n    ]\n  };\n};\n\n//# sourceURL=webpack:///./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/htmlbars.js?");

/***/ })

}]);