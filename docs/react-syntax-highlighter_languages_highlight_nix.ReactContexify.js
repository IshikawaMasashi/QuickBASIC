(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["react-syntax-highlighter_languages_highlight_nix"],{

/***/ "./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/nix.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/nix.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function(hljs) {\n  var NIX_KEYWORDS = {\n    keyword:\n      'rec with let in inherit assert if else then',\n    literal:\n      'true false or and null',\n    built_in:\n      'import abort baseNameOf dirOf isNull builtins map removeAttrs throw ' +\n      'toString derivation'\n  };\n  var ANTIQUOTE = {\n    className: 'subst',\n    begin: /\\$\\{/,\n    end: /}/,\n    keywords: NIX_KEYWORDS\n  };\n  var ATTRS = {\n    begin: /[a-zA-Z0-9-_]+(\\s*=)/, returnBegin: true,\n    relevance: 0,\n    contains: [\n      {\n        className: 'attr',\n        begin: /\\S+/\n      }\n    ]\n  };\n  var STRING = {\n    className: 'string',\n    contains: [ANTIQUOTE],\n    variants: [\n      {begin: \"''\", end: \"''\"},\n      {begin: '\"', end: '\"'}\n    ]\n  };\n  var EXPRESSIONS = [\n    hljs.NUMBER_MODE,\n    hljs.HASH_COMMENT_MODE,\n    hljs.C_BLOCK_COMMENT_MODE,\n    STRING,\n    ATTRS\n  ];\n  ANTIQUOTE.contains = EXPRESSIONS;\n  return {\n    aliases: [\"nixos\"],\n    keywords: NIX_KEYWORDS,\n    contains: EXPRESSIONS\n  };\n};\n\n//# sourceURL=webpack:///./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/nix.js?");

/***/ })

}]);