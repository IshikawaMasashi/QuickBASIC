(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["react-syntax-highlighter_languages_highlight_flix"],{

/***/ "./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/flix.js":
/*!***********************************************************************************************!*\
  !*** ./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/flix.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function (hljs) {\n\n    var CHAR = {\n        className: 'string',\n        begin: /'(.|\\\\[xXuU][a-zA-Z0-9]+)'/\n    };\n\n    var STRING = {\n        className: 'string',\n        variants: [\n            {\n                begin: '\"', end: '\"'\n            }\n        ]\n    };\n\n    var NAME = {\n        className: 'title',\n        begin: /[^0-9\\n\\t \"'(),.`{}\\[\\]:;][^\\n\\t \"'(),.`{}\\[\\]:;]+|[^0-9\\n\\t \"'(),.`{}\\[\\]:;=]/\n    };\n\n    var METHOD = {\n        className: 'function',\n        beginKeywords: 'def',\n        end: /[:={\\[(\\n;]/,\n        excludeEnd: true,\n        contains: [NAME]\n    };\n\n    return {\n        keywords: {\n            literal: 'true false',\n            keyword: 'case class def else enum if impl import in lat rel index let match namespace switch type yield with'\n        },\n        contains: [\n            hljs.C_LINE_COMMENT_MODE,\n            hljs.C_BLOCK_COMMENT_MODE,\n            CHAR,\n            STRING,\n            METHOD,\n            hljs.C_NUMBER_MODE\n        ]\n    };\n};\n\n//# sourceURL=webpack:///./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/flix.js?");

/***/ })

}]);