(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["react-syntax-highlighter_languages_highlight_step21"],{

/***/ "./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/step21.js":
/*!*************************************************************************************************!*\
  !*** ./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/step21.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function(hljs) {\n  var STEP21_IDENT_RE = '[A-Z_][A-Z0-9_.]*';\n  var STEP21_KEYWORDS = {\n    keyword: 'HEADER ENDSEC DATA'\n  };\n  var STEP21_START = {\n    className: 'meta',\n    begin: 'ISO-10303-21;',\n    relevance: 10\n  };\n  var STEP21_CLOSE = {\n    className: 'meta',\n    begin: 'END-ISO-10303-21;',\n    relevance: 10\n  };\n\n  return {\n    aliases: ['p21', 'step', 'stp'],\n    case_insensitive: true, // STEP 21 is case insensitive in theory, in practice all non-comments are capitalized.\n    lexemes: STEP21_IDENT_RE,\n    keywords: STEP21_KEYWORDS,\n    contains: [\n      STEP21_START,\n      STEP21_CLOSE,\n      hljs.C_LINE_COMMENT_MODE,\n      hljs.C_BLOCK_COMMENT_MODE,\n      hljs.COMMENT('/\\\\*\\\\*!', '\\\\*/'),\n      hljs.C_NUMBER_MODE,\n      hljs.inherit(hljs.APOS_STRING_MODE, {illegal: null}),\n      hljs.inherit(hljs.QUOTE_STRING_MODE, {illegal: null}),\n      {\n        className: 'string',\n        begin: \"'\", end: \"'\"\n      },\n      {\n        className: 'symbol',\n        variants: [\n          {\n            begin: '#', end: '\\\\d+',\n            illegal: '\\\\W'\n          }\n        ]\n      }\n    ]\n  };\n};\n\n//# sourceURL=webpack:///./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/step21.js?");

/***/ })

}]);