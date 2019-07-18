(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["react-syntax-highlighter_languages_highlight_clean"],{

/***/ "./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/clean.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/clean.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function(hljs) {\n  return {\n    aliases: ['clean','icl','dcl'],\n    keywords: {\n      keyword:\n        'if let in with where case of class instance otherwise ' +\n        'implementation definition system module from import qualified as ' +\n        'special code inline foreign export ccall stdcall generic derive ' +\n        'infix infixl infixr',\n      literal:\n        'True False'\n    },\n    contains: [\n\n      hljs.C_LINE_COMMENT_MODE,\n      hljs.C_BLOCK_COMMENT_MODE,\n      hljs.APOS_STRING_MODE,\n      hljs.QUOTE_STRING_MODE,\n      hljs.C_NUMBER_MODE,\n\n      {begin: '->|<-[|:]?|::|#!?|>>=|\\\\{\\\\||\\\\|\\\\}|:==|=:|\\\\.\\\\.|<>|`'} // relevance booster\n    ]\n  };\n};\n\n//# sourceURL=webpack:///./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/clean.js?");

/***/ })

}]);