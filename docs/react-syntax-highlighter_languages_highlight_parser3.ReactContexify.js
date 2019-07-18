(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["react-syntax-highlighter_languages_highlight_parser3"],{

/***/ "./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/parser3.js":
/*!**************************************************************************************************!*\
  !*** ./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/parser3.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function(hljs) {\n  var CURLY_SUBCOMMENT = hljs.COMMENT(\n    '{',\n    '}',\n    {\n      contains: ['self']\n    }\n  );\n  return {\n    subLanguage: 'xml', relevance: 0,\n    contains: [\n      hljs.COMMENT('^#', '$'),\n      hljs.COMMENT(\n        '\\\\^rem{',\n        '}',\n        {\n          relevance: 10,\n          contains: [\n            CURLY_SUBCOMMENT\n          ]\n        }\n      ),\n      {\n        className: 'meta',\n        begin: '^@(?:BASE|USE|CLASS|OPTIONS)$',\n        relevance: 10\n      },\n      {\n        className: 'title',\n        begin: '@[\\\\w\\\\-]+\\\\[[\\\\w^;\\\\-]*\\\\](?:\\\\[[\\\\w^;\\\\-]*\\\\])?(?:.*)$'\n      },\n      {\n        className: 'variable',\n        begin: '\\\\$\\\\{?[\\\\w\\\\-\\\\.\\\\:]+\\\\}?'\n      },\n      {\n        className: 'keyword',\n        begin: '\\\\^[\\\\w\\\\-\\\\.\\\\:]+'\n      },\n      {\n        className: 'number',\n        begin: '\\\\^#[0-9a-fA-F]+'\n      },\n      hljs.C_NUMBER_MODE\n    ]\n  };\n};\n\n//# sourceURL=webpack:///./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/parser3.js?");

/***/ })

}]);