(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["react-syntax-highlighter_languages_highlight_r"],{

/***/ "./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/r.js":
/*!********************************************************************************************!*\
  !*** ./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/r.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function(hljs) {\n  var IDENT_RE = '([a-zA-Z]|\\\\.[a-zA-Z.])[a-zA-Z0-9._]*';\n\n  return {\n    contains: [\n      hljs.HASH_COMMENT_MODE,\n      {\n        begin: IDENT_RE,\n        lexemes: IDENT_RE,\n        keywords: {\n          keyword:\n            'function if in break next repeat else for return switch while try tryCatch ' +\n            'stop warning require library attach detach source setMethod setGeneric ' +\n            'setGroupGeneric setClass ...',\n          literal:\n            'NULL NA TRUE FALSE T F Inf NaN NA_integer_|10 NA_real_|10 NA_character_|10 ' +\n            'NA_complex_|10'\n        },\n        relevance: 0\n      },\n      {\n        // hex value\n        className: 'number',\n        begin: \"0[xX][0-9a-fA-F]+[Li]?\\\\b\",\n        relevance: 0\n      },\n      {\n        // explicit integer\n        className: 'number',\n        begin: \"\\\\d+(?:[eE][+\\\\-]?\\\\d*)?L\\\\b\",\n        relevance: 0\n      },\n      {\n        // number with trailing decimal\n        className: 'number',\n        begin: \"\\\\d+\\\\.(?!\\\\d)(?:i\\\\b)?\",\n        relevance: 0\n      },\n      {\n        // number\n        className: 'number',\n        begin: \"\\\\d+(?:\\\\.\\\\d*)?(?:[eE][+\\\\-]?\\\\d*)?i?\\\\b\",\n        relevance: 0\n      },\n      {\n        // number with leading decimal\n        className: 'number',\n        begin: \"\\\\.\\\\d+(?:[eE][+\\\\-]?\\\\d*)?i?\\\\b\",\n        relevance: 0\n      },\n\n      {\n        // escaped identifier\n        begin: '`',\n        end: '`',\n        relevance: 0\n      },\n\n      {\n        className: 'string',\n        contains: [hljs.BACKSLASH_ESCAPE],\n        variants: [\n          {begin: '\"', end: '\"'},\n          {begin: \"'\", end: \"'\"}\n        ]\n      }\n    ]\n  };\n};\n\n//# sourceURL=webpack:///./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/r.js?");

/***/ })

}]);