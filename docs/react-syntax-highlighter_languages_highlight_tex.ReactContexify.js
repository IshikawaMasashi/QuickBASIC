(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["react-syntax-highlighter_languages_highlight_tex"],{

/***/ "./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/tex.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/tex.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function(hljs) {\n  var COMMAND = {\n    className: 'tag',\n    begin: /\\\\/,\n    relevance: 0,\n    contains: [\n      {\n        className: 'name',\n        variants: [\n          {begin: /[a-zA-Zа-яА-я]+[*]?/},\n          {begin: /[^a-zA-Zа-яА-я0-9]/}\n        ],\n        starts: {\n          endsWithParent: true,\n          relevance: 0,\n          contains: [\n            {\n              className: 'string', // because it looks like attributes in HTML tags\n              variants: [\n                {begin: /\\[/, end: /\\]/},\n                {begin: /\\{/, end: /\\}/}\n              ]\n            },\n            {\n              begin: /\\s*=\\s*/, endsWithParent: true,\n              relevance: 0,\n              contains: [\n                {\n                  className: 'number',\n                  begin: /-?\\d*\\.?\\d+(pt|pc|mm|cm|in|dd|cc|ex|em)?/\n                }\n              ]\n            }\n          ]\n        }\n      }\n    ]\n  };\n\n  return {\n    contains: [\n      COMMAND,\n      {\n        className: 'formula',\n        contains: [COMMAND],\n        relevance: 0,\n        variants: [\n          {begin: /\\$\\$/, end: /\\$\\$/},\n          {begin: /\\$/, end: /\\$/}\n        ]\n      },\n      hljs.COMMENT(\n        '%',\n        '$',\n        {\n          relevance: 0\n        }\n      )\n    ]\n  };\n};\n\n//# sourceURL=webpack:///./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/tex.js?");

/***/ })

}]);