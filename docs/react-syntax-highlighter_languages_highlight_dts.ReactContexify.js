(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["react-syntax-highlighter_languages_highlight_dts"],{

/***/ "./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/dts.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/dts.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function(hljs) {\n  var STRINGS = {\n    className: 'string',\n    variants: [\n      hljs.inherit(hljs.QUOTE_STRING_MODE, { begin: '((u8?|U)|L)?\"' }),\n      {\n        begin: '(u8?|U)?R\"', end: '\"',\n        contains: [hljs.BACKSLASH_ESCAPE]\n      },\n      {\n        begin: '\\'\\\\\\\\?.', end: '\\'',\n        illegal: '.'\n      }\n    ]\n  };\n\n  var NUMBERS = {\n    className: 'number',\n    variants: [\n      { begin: '\\\\b(\\\\d+(\\\\.\\\\d*)?|\\\\.\\\\d+)(u|U|l|L|ul|UL|f|F)' },\n      { begin: hljs.C_NUMBER_RE }\n    ],\n    relevance: 0\n  };\n\n  var PREPROCESSOR = {\n    className: 'meta',\n    begin: '#', end: '$',\n    keywords: {'meta-keyword': 'if else elif endif define undef ifdef ifndef'},\n    contains: [\n      {\n        begin: /\\\\\\n/, relevance: 0\n      },\n      {\n        beginKeywords: 'include', end: '$',\n        keywords: {'meta-keyword': 'include'},\n        contains: [\n          hljs.inherit(STRINGS, {className: 'meta-string'}),\n          {\n            className: 'meta-string',\n            begin: '<', end: '>',\n            illegal: '\\\\n'\n          }\n        ]\n      },\n      STRINGS,\n      hljs.C_LINE_COMMENT_MODE,\n      hljs.C_BLOCK_COMMENT_MODE\n    ]\n  };\n\n  var DTS_REFERENCE = {\n    className: 'variable',\n    begin: '\\\\&[a-z\\\\d_]*\\\\b'\n  };\n\n  var DTS_KEYWORD = {\n    className: 'meta-keyword',\n    begin: '/[a-z][a-z\\\\d-]*/'\n  };\n\n  var DTS_LABEL = {\n    className: 'symbol',\n    begin: '^\\\\s*[a-zA-Z_][a-zA-Z\\\\d_]*:'\n  };\n\n  var DTS_CELL_PROPERTY = {\n    className: 'params',\n    begin: '<',\n    end: '>',\n    contains: [\n      NUMBERS,\n      DTS_REFERENCE\n    ]\n  };\n\n  var DTS_NODE = {\n    className: 'class',\n    begin: /[a-zA-Z_][a-zA-Z\\d_@]*\\s{/,\n    end: /[{;=]/,\n    returnBegin: true,\n    excludeEnd: true\n  };\n\n  var DTS_ROOT_NODE = {\n    className: 'class',\n    begin: '/\\\\s*{',\n    end: '};',\n    relevance: 10,\n    contains: [\n      DTS_REFERENCE,\n      DTS_KEYWORD,\n      DTS_LABEL,\n      DTS_NODE,\n      DTS_CELL_PROPERTY,\n      hljs.C_LINE_COMMENT_MODE,\n      hljs.C_BLOCK_COMMENT_MODE,\n      NUMBERS,\n      STRINGS\n    ]\n  };\n\n  return {\n    keywords: \"\",\n    contains: [\n      DTS_ROOT_NODE,\n      DTS_REFERENCE,\n      DTS_KEYWORD,\n      DTS_LABEL,\n      DTS_NODE,\n      DTS_CELL_PROPERTY,\n      hljs.C_LINE_COMMENT_MODE,\n      hljs.C_BLOCK_COMMENT_MODE,\n      NUMBERS,\n      STRINGS,\n      PREPROCESSOR,\n      {\n        begin: hljs.IDENT_RE + '::',\n        keywords: \"\"\n      }\n    ]\n  };\n};\n\n//# sourceURL=webpack:///./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/dts.js?");

/***/ })

}]);