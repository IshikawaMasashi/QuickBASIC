(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["react-syntax-highlighter_languages_highlight_ceylon"],{

/***/ "./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/ceylon.js":
/*!*************************************************************************************************!*\
  !*** ./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/ceylon.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function(hljs) {\n  // 2.3. Identifiers and keywords\n  var KEYWORDS =\n    'assembly module package import alias class interface object given value ' +\n    'assign void function new of extends satisfies abstracts in out return ' +\n    'break continue throw assert dynamic if else switch case for while try ' +\n    'catch finally then let this outer super is exists nonempty';\n  // 7.4.1 Declaration Modifiers\n  var DECLARATION_MODIFIERS =\n    'shared abstract formal default actual variable late native deprecated' +\n    'final sealed annotation suppressWarnings small';\n  // 7.4.2 Documentation\n  var DOCUMENTATION =\n    'doc by license see throws tagged';\n  var SUBST = {\n    className: 'subst', excludeBegin: true, excludeEnd: true,\n    begin: /``/, end: /``/,\n    keywords: KEYWORDS,\n    relevance: 10\n  };\n  var EXPRESSIONS = [\n    {\n      // verbatim string\n      className: 'string',\n      begin: '\"\"\"',\n      end: '\"\"\"',\n      relevance: 10\n    },\n    {\n      // string literal or template\n      className: 'string',\n      begin: '\"', end: '\"',\n      contains: [SUBST]\n    },\n    {\n      // character literal\n      className: 'string',\n      begin: \"'\",\n      end: \"'\"\n    },\n    {\n      // numeric literal\n      className: 'number',\n      begin: '#[0-9a-fA-F_]+|\\\\$[01_]+|[0-9_]+(?:\\\\.[0-9_](?:[eE][+-]?\\\\d+)?)?[kMGTPmunpf]?',\n      relevance: 0\n    }\n  ];\n  SUBST.contains = EXPRESSIONS;\n\n  return {\n    keywords: {\n      keyword: KEYWORDS + ' ' + DECLARATION_MODIFIERS,\n      meta: DOCUMENTATION\n    },\n    illegal: '\\\\$[^01]|#[^0-9a-fA-F]',\n    contains: [\n      hljs.C_LINE_COMMENT_MODE,\n      hljs.COMMENT('/\\\\*', '\\\\*/', {contains: ['self']}),\n      {\n        // compiler annotation\n        className: 'meta',\n        begin: '@[a-z]\\\\w*(?:\\\\:\\\"[^\\\"]*\\\")?'\n      }\n    ].concat(EXPRESSIONS)\n  };\n};\n\n//# sourceURL=webpack:///./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/ceylon.js?");

/***/ })

}]);