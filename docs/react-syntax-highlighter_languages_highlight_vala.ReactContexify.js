(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["react-syntax-highlighter_languages_highlight_vala"],{

/***/ "./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/vala.js":
/*!***********************************************************************************************!*\
  !*** ./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/vala.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function(hljs) {\n  return {\n    keywords: {\n      keyword:\n        // Value types\n        'char uchar unichar int uint long ulong short ushort int8 int16 int32 int64 uint8 ' +\n        'uint16 uint32 uint64 float double bool struct enum string void ' +\n        // Reference types\n        'weak unowned owned ' +\n        // Modifiers\n        'async signal static abstract interface override virtual delegate ' +\n        // Control Structures\n        'if while do for foreach else switch case break default return try catch ' +\n        // Visibility\n        'public private protected internal ' +\n        // Other\n        'using new this get set const stdout stdin stderr var',\n      built_in:\n        'DBus GLib CCode Gee Object Gtk Posix',\n      literal:\n        'false true null'\n    },\n    contains: [\n      {\n        className: 'class',\n        beginKeywords: 'class interface namespace', end: '{', excludeEnd: true,\n        illegal: '[^,:\\\\n\\\\s\\\\.]',\n        contains: [\n          hljs.UNDERSCORE_TITLE_MODE\n        ]\n      },\n      hljs.C_LINE_COMMENT_MODE,\n      hljs.C_BLOCK_COMMENT_MODE,\n      {\n        className: 'string',\n        begin: '\"\"\"', end: '\"\"\"',\n        relevance: 5\n      },\n      hljs.APOS_STRING_MODE,\n      hljs.QUOTE_STRING_MODE,\n      hljs.C_NUMBER_MODE,\n      {\n        className: 'meta',\n        begin: '^#', end: '$',\n        relevance: 2\n      }\n    ]\n  };\n};\n\n//# sourceURL=webpack:///./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/vala.js?");

/***/ })

}]);