(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["react-syntax-highlighter_languages_highlight_ini"],{

/***/ "./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/ini.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/ini.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function(hljs) {\n  var STRING = {\n    className: \"string\",\n    contains: [hljs.BACKSLASH_ESCAPE],\n    variants: [\n      {\n        begin: \"'''\", end: \"'''\",\n        relevance: 10\n      }, {\n        begin: '\"\"\"', end: '\"\"\"',\n        relevance: 10\n      }, {\n        begin: '\"', end: '\"'\n      }, {\n        begin: \"'\", end: \"'\"\n      }\n    ]\n  };\n  return {\n    aliases: ['toml'],\n    case_insensitive: true,\n    illegal: /\\S/,\n    contains: [\n      hljs.COMMENT(';', '$'),\n      hljs.HASH_COMMENT_MODE,\n      {\n        className: 'section',\n        begin: /^\\s*\\[+/, end: /\\]+/\n      },\n      {\n        begin: /^[a-z0-9\\[\\]_-]+\\s*=\\s*/, end: '$',\n        returnBegin: true,\n        contains: [\n          {\n            className: 'attr',\n            begin: /[a-z0-9\\[\\]_-]+/\n          },\n          {\n            begin: /=/, endsWithParent: true,\n            relevance: 0,\n            contains: [\n              {\n                className: 'literal',\n                begin: /\\bon|off|true|false|yes|no\\b/\n              },\n              {\n                className: 'variable',\n                variants: [\n                  {begin: /\\$[\\w\\d\"][\\w\\d_]*/},\n                  {begin: /\\$\\{(.*?)}/}\n                ]\n              },\n              STRING,\n              {\n                className: 'number',\n                begin: /([\\+\\-]+)?[\\d]+_[\\d_]+/\n              },\n              hljs.NUMBER_MODE\n            ]\n          }\n        ]\n      }\n    ]\n  };\n};\n\n//# sourceURL=webpack:///./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/ini.js?");

/***/ })

}]);