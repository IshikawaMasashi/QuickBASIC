(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["react-syntax-highlighter_languages_highlight_diff"],{

/***/ "./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/diff.js":
/*!***********************************************************************************************!*\
  !*** ./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/diff.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function(hljs) {\n  return {\n    aliases: ['patch'],\n    contains: [\n      {\n        className: 'meta',\n        relevance: 10,\n        variants: [\n          {begin: /^@@ +\\-\\d+,\\d+ +\\+\\d+,\\d+ +@@$/},\n          {begin: /^\\*\\*\\* +\\d+,\\d+ +\\*\\*\\*\\*$/},\n          {begin: /^\\-\\-\\- +\\d+,\\d+ +\\-\\-\\-\\-$/}\n        ]\n      },\n      {\n        className: 'comment',\n        variants: [\n          {begin: /Index: /, end: /$/},\n          {begin: /={3,}/, end: /$/},\n          {begin: /^\\-{3}/, end: /$/},\n          {begin: /^\\*{3} /, end: /$/},\n          {begin: /^\\+{3}/, end: /$/},\n          {begin: /\\*{5}/, end: /\\*{5}$/}\n        ]\n      },\n      {\n        className: 'addition',\n        begin: '^\\\\+', end: '$'\n      },\n      {\n        className: 'deletion',\n        begin: '^\\\\-', end: '$'\n      },\n      {\n        className: 'addition',\n        begin: '^\\\\!', end: '$'\n      }\n    ]\n  };\n};\n\n//# sourceURL=webpack:///./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/diff.js?");

/***/ })

}]);