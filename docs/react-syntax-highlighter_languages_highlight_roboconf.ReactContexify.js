(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["react-syntax-highlighter_languages_highlight_roboconf"],{

/***/ "./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/roboconf.js":
/*!***************************************************************************************************!*\
  !*** ./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/roboconf.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function(hljs) {\n  var IDENTIFIER = '[a-zA-Z-_][^\\\\n{]+\\\\{';\n\n  var PROPERTY = {\n    className: 'attribute',\n    begin: /[a-zA-Z-_]+/, end: /\\s*:/, excludeEnd: true,\n    starts: {\n      end: ';',\n      relevance: 0,\n      contains: [\n        {\n          className: 'variable',\n          begin: /\\.[a-zA-Z-_]+/\n        },\n        {\n          className: 'keyword',\n          begin: /\\(optional\\)/\n        }\n      ]\n    }\n  };\n\n  return {\n    aliases: ['graph', 'instances'],\n    case_insensitive: true,\n    keywords: 'import',\n    contains: [\n      // Facet sections\n      {\n        begin: '^facet ' + IDENTIFIER,\n        end: '}',\n        keywords: 'facet',\n        contains: [\n          PROPERTY,\n          hljs.HASH_COMMENT_MODE\n        ]\n      },\n\n      // Instance sections\n      {\n        begin: '^\\\\s*instance of ' + IDENTIFIER,\n        end: '}',\n        keywords: 'name count channels instance-data instance-state instance of',\n        illegal: /\\S/,\n        contains: [\n          'self',\n          PROPERTY,\n          hljs.HASH_COMMENT_MODE\n        ]\n      },\n\n      // Component sections\n      {\n        begin: '^' + IDENTIFIER,\n        end: '}',\n        contains: [\n          PROPERTY,\n          hljs.HASH_COMMENT_MODE\n        ]\n      },\n\n      // Comments\n      hljs.HASH_COMMENT_MODE\n    ]\n  };\n};\n\n//# sourceURL=webpack:///./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/roboconf.js?");

/***/ })

}]);