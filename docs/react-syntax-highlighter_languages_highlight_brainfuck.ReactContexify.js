(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["react-syntax-highlighter_languages_highlight_brainfuck"],{

/***/ "./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/brainfuck.js":
/*!****************************************************************************************************!*\
  !*** ./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/brainfuck.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function(hljs){\n  var LITERAL = {\n    className: 'literal',\n    begin: '[\\\\+\\\\-]',\n    relevance: 0\n  };\n  return {\n    aliases: ['bf'],\n    contains: [\n      hljs.COMMENT(\n        '[^\\\\[\\\\]\\\\.,\\\\+\\\\-<> \\r\\n]',\n        '[\\\\[\\\\]\\\\.,\\\\+\\\\-<> \\r\\n]',\n        {\n          returnEnd: true,\n          relevance: 0\n        }\n      ),\n      {\n        className: 'title',\n        begin: '[\\\\[\\\\]]',\n        relevance: 0\n      },\n      {\n        className: 'string',\n        begin: '[\\\\.,]',\n        relevance: 0\n      },\n      {\n        // this mode works as the only relevance counter\n        begin: /\\+\\+|\\-\\-/, returnBegin: true,\n        contains: [LITERAL]\n      },\n      LITERAL\n    ]\n  };\n};\n\n//# sourceURL=webpack:///./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/brainfuck.js?");

/***/ })

}]);