(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["react-syntax-highlighter_languages_highlight_autohotkey"],{

/***/ "./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/autohotkey.js":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/autohotkey.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function(hljs) {\n  var BACKTICK_ESCAPE = {\n    begin: '`[\\\\s\\\\S]'\n  };\n\n  return {\n    case_insensitive: true,\n    aliases: [ 'ahk' ],\n    keywords: {\n      keyword: 'Break Continue Critical Exit ExitApp Gosub Goto New OnExit Pause return SetBatchLines SetTimer Suspend Thread Throw Until ahk_id ahk_class ahk_pid ahk_exe ahk_group',\n      literal: 'A|0 true false NOT AND OR',\n      built_in: 'ComSpec Clipboard ClipboardAll ErrorLevel',\n    },\n    contains: [\n      {\n        className: 'built_in',\n        begin: 'A_[a-zA-Z0-9]+'\n      },\n      BACKTICK_ESCAPE,\n      hljs.inherit(hljs.QUOTE_STRING_MODE, {contains: [BACKTICK_ESCAPE]}),\n      hljs.COMMENT(';', '$', {relevance: 0}),\n      hljs.C_BLOCK_COMMENT_MODE,\n      {\n        className: 'number',\n        begin: hljs.NUMBER_RE,\n        relevance: 0\n      },\n      {\n        className: 'subst', // FIXED\n        begin: '%(?=[a-zA-Z0-9#_$@])', end: '%',\n        illegal: '[^a-zA-Z0-9#_$@]'\n      },\n      {\n        className: 'built_in',\n        begin: '^\\\\s*\\\\w+\\\\s*,'\n        //I don't really know if this is totally relevant\n      },\n      {\n        className: 'meta', \n        begin: '^\\\\s*#\\w+', end:'$',\n        relevance: 0\n      },\n      {\n        className: 'symbol',\n        contains: [BACKTICK_ESCAPE],\n        variants: [\n          {begin: '^[^\\\\n\";]+::(?!=)'},\n          {begin: '^[^\\\\n\";]+:(?!=)', relevance: 0} // zero relevance as it catches a lot of things\n                                                    // followed by a single ':' in many languages\n        ]\n      },\n      {\n        // consecutive commas, not for highlighting but just for relevance\n        begin: ',\\\\s*,'\n      }\n    ]\n  }\n};\n\n//# sourceURL=webpack:///./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/autohotkey.js?");

/***/ })

}]);