(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["react-syntax-highlighter_languages_highlight_twig"],{

/***/ "./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/twig.js":
/*!***********************************************************************************************!*\
  !*** ./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/twig.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function(hljs) {\n  var PARAMS = {\n    className: 'params',\n    begin: '\\\\(', end: '\\\\)'\n  };\n\n  var FUNCTION_NAMES = 'attribute block constant cycle date dump include ' +\n                  'max min parent random range source template_from_string';\n\n  var FUNCTIONS = {\n    beginKeywords: FUNCTION_NAMES,\n    keywords: {name: FUNCTION_NAMES},\n    relevance: 0,\n    contains: [\n      PARAMS\n    ]\n  };\n\n  var FILTER = {\n    begin: /\\|[A-Za-z_]+:?/,\n    keywords:\n      'abs batch capitalize convert_encoding date date_modify default ' +\n      'escape first format join json_encode keys last length lower ' +\n      'merge nl2br number_format raw replace reverse round slice sort split ' +\n      'striptags title trim upper url_encode',\n    contains: [\n      FUNCTIONS\n    ]\n  };\n\n  var TAGS = 'autoescape block do embed extends filter flush for ' +\n    'if import include macro sandbox set spaceless use verbatim';\n\n  TAGS = TAGS + ' ' + TAGS.split(' ').map(function(t){return 'end' + t}).join(' ');\n\n  return {\n    aliases: ['craftcms'],\n    case_insensitive: true,\n    subLanguage: 'xml',\n    contains: [\n      hljs.COMMENT(/\\{#/, /#}/),\n      {\n        className: 'template-tag',\n        begin: /\\{%/, end: /%}/,\n        contains: [\n          {\n            className: 'name',\n            begin: /\\w+/,\n            keywords: TAGS,\n            starts: {\n              endsWithParent: true,\n              contains: [FILTER, FUNCTIONS],\n              relevance: 0\n            }\n          }\n        ]\n      },\n      {\n        className: 'template-variable',\n        begin: /\\{\\{/, end: /}}/,\n        contains: ['self', FILTER, FUNCTIONS]\n      }\n    ]\n  };\n};\n\n//# sourceURL=webpack:///./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/twig.js?");

/***/ })

}]);