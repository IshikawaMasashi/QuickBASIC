(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["react-syntax-highlighter_languages_highlight_ebnf"],{

/***/ "./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/ebnf.js":
/*!***********************************************************************************************!*\
  !*** ./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/ebnf.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function(hljs) {\n    var commentMode = hljs.COMMENT(/\\(\\*/, /\\*\\)/);\n\n    var nonTerminalMode = {\n        className: \"attribute\",\n        begin: /^[ ]*[a-zA-Z][a-zA-Z-]*([\\s-]+[a-zA-Z][a-zA-Z]*)*/\n    };\n\n    var specialSequenceMode = {\n        className: \"meta\",\n        begin: /\\?.*\\?/\n    };\n\n    var ruleBodyMode = {\n        begin: /=/, end: /;/,\n        contains: [\n            commentMode,\n            specialSequenceMode,\n            // terminals\n            hljs.APOS_STRING_MODE, hljs.QUOTE_STRING_MODE\n        ]\n    };\n\n    return {\n        illegal: /\\S/,\n        contains: [\n            commentMode,\n            nonTerminalMode,\n            ruleBodyMode\n        ]\n    };\n};\n\n//# sourceURL=webpack:///./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/ebnf.js?");

/***/ })

}]);