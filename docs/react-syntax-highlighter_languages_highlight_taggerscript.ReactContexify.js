(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["react-syntax-highlighter_languages_highlight_taggerscript"],{

/***/ "./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/taggerscript.js":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/taggerscript.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function(hljs) {\n\n  var COMMENT = {\n    className: 'comment',\n    begin: /\\$noop\\(/,\n    end: /\\)/,\n    contains: [{\n      begin: /\\(/,\n      end: /\\)/,\n      contains: ['self', {\n        begin: /\\\\./\n      }]\n    }],\n    relevance: 10\n  };\n\n  var FUNCTION = {\n    className: 'keyword',\n    begin: /\\$(?!noop)[a-zA-Z][_a-zA-Z0-9]*/,\n    end: /\\(/,\n    excludeEnd: true\n  };\n\n  var VARIABLE = {\n    className: 'variable',\n    begin: /%[_a-zA-Z0-9:]*/,\n    end: '%'\n  };\n\n  var ESCAPE_SEQUENCE = {\n    className: 'symbol',\n    begin: /\\\\./\n  };\n\n  return {\n    contains: [\n      COMMENT,\n      FUNCTION,\n      VARIABLE,\n      ESCAPE_SEQUENCE\n    ]\n  };\n};\n\n//# sourceURL=webpack:///./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/taggerscript.js?");

/***/ })

}]);