(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["react-syntax-highlighter_languages_highlight_dockerfile"],{

/***/ "./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/dockerfile.js":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/dockerfile.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function(hljs) {\n  return {\n    aliases: ['docker'],\n    case_insensitive: true,\n    keywords: 'from maintainer expose env arg user onbuild stopsignal',\n    contains: [\n      hljs.HASH_COMMENT_MODE,\n      hljs.APOS_STRING_MODE,\n      hljs.QUOTE_STRING_MODE,\n      hljs.NUMBER_MODE,\n      {\n        beginKeywords: 'run cmd entrypoint volume add copy workdir label healthcheck shell',\n        starts: {\n          end: /[^\\\\]\\n/,\n          subLanguage: 'bash'\n        }\n      }\n    ],\n    illegal: '</'\n  }\n};\n\n//# sourceURL=webpack:///./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/dockerfile.js?");

/***/ })

}]);