(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["react-syntax-highlighter_languages_highlight_capnproto"],{

/***/ "./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/capnproto.js":
/*!****************************************************************************************************!*\
  !*** ./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/capnproto.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function(hljs) {\n  return {\n    aliases: ['capnp'],\n    keywords: {\n      keyword:\n        'struct enum interface union group import using const annotation extends in of on as with from fixed',\n      built_in:\n        'Void Bool Int8 Int16 Int32 Int64 UInt8 UInt16 UInt32 UInt64 Float32 Float64 ' +\n        'Text Data AnyPointer AnyStruct Capability List',\n      literal:\n        'true false'\n    },\n    contains: [\n      hljs.QUOTE_STRING_MODE,\n      hljs.NUMBER_MODE,\n      hljs.HASH_COMMENT_MODE,\n      {\n        className: 'meta',\n        begin: /@0x[\\w\\d]{16};/,\n        illegal: /\\n/\n      },\n      {\n        className: 'symbol',\n        begin: /@\\d+\\b/\n      },\n      {\n        className: 'class',\n        beginKeywords: 'struct enum', end: /\\{/,\n        illegal: /\\n/,\n        contains: [\n          hljs.inherit(hljs.TITLE_MODE, {\n            starts: {endsWithParent: true, excludeEnd: true} // hack: eating everything after the first title\n          })\n        ]\n      },\n      {\n        className: 'class',\n        beginKeywords: 'interface', end: /\\{/,\n        illegal: /\\n/,\n        contains: [\n          hljs.inherit(hljs.TITLE_MODE, {\n            starts: {endsWithParent: true, excludeEnd: true} // hack: eating everything after the first title\n          })\n        ]\n      }\n    ]\n  };\n};\n\n//# sourceURL=webpack:///./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/capnproto.js?");

/***/ })

}]);