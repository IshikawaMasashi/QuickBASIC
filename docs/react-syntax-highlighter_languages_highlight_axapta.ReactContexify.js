(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["react-syntax-highlighter_languages_highlight_axapta"],{

/***/ "./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/axapta.js":
/*!*************************************************************************************************!*\
  !*** ./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/axapta.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function(hljs) {\n  return {\n    keywords: 'false int abstract private char boolean static null if for true ' +\n      'while long throw finally protected final return void enum else ' +\n      'break new catch byte super case short default double public try this switch ' +\n      'continue reverse firstfast firstonly forupdate nofetch sum avg minof maxof count ' +\n      'order group by asc desc index hint like dispaly edit client server ttsbegin ' +\n      'ttscommit str real date container anytype common div mod',\n    contains: [\n      hljs.C_LINE_COMMENT_MODE,\n      hljs.C_BLOCK_COMMENT_MODE,\n      hljs.APOS_STRING_MODE,\n      hljs.QUOTE_STRING_MODE,\n      hljs.C_NUMBER_MODE,\n      {\n        className: 'meta',\n        begin: '#', end: '$'\n      },\n      {\n        className: 'class',\n        beginKeywords: 'class interface', end: '{', excludeEnd: true,\n        illegal: ':',\n        contains: [\n          {beginKeywords: 'extends implements'},\n          hljs.UNDERSCORE_TITLE_MODE\n        ]\n      }\n    ]\n  };\n};\n\n//# sourceURL=webpack:///./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/axapta.js?");

/***/ })

}]);