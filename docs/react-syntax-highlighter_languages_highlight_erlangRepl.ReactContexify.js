(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["react-syntax-highlighter_languages_highlight_erlangRepl"],{

/***/ "./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/erlang-repl.js":
/*!******************************************************************************************************!*\
  !*** ./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/erlang-repl.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function(hljs) {\n  return {\n    keywords: {\n      built_in:\n        'spawn spawn_link self',\n      keyword:\n        'after and andalso|10 band begin bnot bor bsl bsr bxor case catch cond div end fun if ' +\n        'let not of or orelse|10 query receive rem try when xor'\n    },\n    contains: [\n      {\n        className: 'meta', begin: '^[0-9]+> ',\n        relevance: 10\n      },\n      hljs.COMMENT('%', '$'),\n      {\n        className: 'number',\n        begin: '\\\\b(\\\\d+#[a-fA-F0-9]+|\\\\d+(\\\\.\\\\d+)?([eE][-+]?\\\\d+)?)',\n        relevance: 0\n      },\n      hljs.APOS_STRING_MODE,\n      hljs.QUOTE_STRING_MODE,\n      {\n        begin: '\\\\?(::)?([A-Z]\\\\w*(::)?)+'\n      },\n      {\n        begin: '->'\n      },\n      {\n        begin: 'ok'\n      },\n      {\n        begin: '!'\n      },\n      {\n        begin: '(\\\\b[a-z\\'][a-zA-Z0-9_\\']*:[a-z\\'][a-zA-Z0-9_\\']*)|(\\\\b[a-z\\'][a-zA-Z0-9_\\']*)',\n        relevance: 0\n      },\n      {\n        begin: '[A-Z][a-zA-Z0-9_\\']*',\n        relevance: 0\n      }\n    ]\n  };\n};\n\n//# sourceURL=webpack:///./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/erlang-repl.js?");

/***/ })

}]);