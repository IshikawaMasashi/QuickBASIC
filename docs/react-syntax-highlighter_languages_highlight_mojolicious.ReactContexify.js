(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["react-syntax-highlighter_languages_highlight_mojolicious"],{

/***/ "./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/mojolicious.js":
/*!******************************************************************************************************!*\
  !*** ./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/mojolicious.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function(hljs) {\n  return {\n    subLanguage: 'xml',\n    contains: [\n      {\n        className: 'meta',\n        begin: '^__(END|DATA)__$'\n      },\n    // mojolicious line\n      {\n        begin: \"^\\\\s*%{1,2}={0,2}\", end: '$',\n        subLanguage: 'perl'\n      },\n    // mojolicious block\n      {\n        begin: \"<%{1,2}={0,2}\",\n        end: \"={0,1}%>\",\n        subLanguage: 'perl',\n        excludeBegin: true,\n        excludeEnd: true\n      }\n    ]\n  };\n};\n\n//# sourceURL=webpack:///./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/mojolicious.js?");

/***/ })

}]);