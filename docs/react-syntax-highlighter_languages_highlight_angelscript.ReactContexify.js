(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["react-syntax-highlighter_languages_highlight_angelscript"],{

/***/ "./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/angelscript.js":
/*!******************************************************************************************************!*\
  !*** ./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/angelscript.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function(hljs) {\n  var builtInTypeMode = {\n    className: 'built_in',\n    begin: '\\\\b(void|bool|int|int8|int16|int32|int64|uint|uint8|uint16|uint32|uint64|string|ref|array|double|float|auto|dictionary)'\n  };\n\n  var objectHandleMode = {\n    className: 'symbol',\n    begin: '[a-zA-Z0-9_]+@'\n  };\n\n  var genericMode = {\n    className: 'keyword',\n    begin: '<', end: '>',\n    contains: [ builtInTypeMode, objectHandleMode ]\n  };\n\n  builtInTypeMode.contains = [ genericMode ];\n  objectHandleMode.contains = [ genericMode ];\n\n  return {\n    aliases: [ 'asc' ],\n\n    keywords:\n      'for in|0 break continue while do|0 return if else case switch namespace is cast ' +\n      'or and xor not get|0 in inout|10 out override set|0 private public const default|0 ' +\n      'final shared external mixin|10 enum typedef funcdef this super import from interface ' +\n      'abstract|0 try catch protected explicit',\n\n    // avoid close detection with C# and JS\n    illegal: '(^using\\\\s+[A-Za-z0-9_\\\\.]+;$|\\\\bfunction\\s*[^\\\\(])',\n\n    contains: [\n      { // 'strings'\n        className: 'string',\n        begin: '\\'', end: '\\'',\n        illegal: '\\\\n',\n        contains: [ hljs.BACKSLASH_ESCAPE ],\n        relevance: 0\n      },\n\n      { // \"strings\"\n        className: 'string',\n        begin: '\"', end: '\"',\n        illegal: '\\\\n',\n        contains: [ hljs.BACKSLASH_ESCAPE ],\n        relevance: 0\n      },\n\n      // \"\"\"heredoc strings\"\"\"\n      {\n        className: 'string',\n        begin: '\"\"\"', end: '\"\"\"'\n      },\n\n      hljs.C_LINE_COMMENT_MODE, // single-line comments\n      hljs.C_BLOCK_COMMENT_MODE, // comment blocks\n\n      { // interface or namespace declaration\n        beginKeywords: 'interface namespace', end: '{',\n        illegal: '[;.\\\\-]',\n        contains: [\n          { // interface or namespace name\n            className: 'symbol',\n            begin: '[a-zA-Z0-9_]+'\n          }\n        ]\n      },\n\n      { // class declaration\n        beginKeywords: 'class', end: '{',\n        illegal: '[;.\\\\-]',\n        contains: [\n          { // class name\n            className: 'symbol',\n            begin: '[a-zA-Z0-9_]+',\n            contains: [\n              {\n                begin: '[:,]\\\\s*',\n                contains: [\n                  {\n                    className: 'symbol',\n                    begin: '[a-zA-Z0-9_]+'\n                  }\n                ]\n              }\n            ]\n          }\n        ]\n      },\n\n      builtInTypeMode, // built-in types\n      objectHandleMode, // object handles\n\n      { // literals\n        className: 'literal',\n        begin: '\\\\b(null|true|false)'\n      },\n\n      { // numbers\n        className: 'number',\n        begin: '(-?)(\\\\b0[xX][a-fA-F0-9]+|(\\\\b\\\\d+(\\\\.\\\\d*)?f?|\\\\.\\\\d+f?)([eE][-+]?\\\\d+f?)?)'\n      }\n    ]\n  };\n};\n\n//# sourceURL=webpack:///./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/angelscript.js?");

/***/ })

}]);