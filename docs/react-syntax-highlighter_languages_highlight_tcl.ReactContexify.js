(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["react-syntax-highlighter_languages_highlight_tcl"],{

/***/ "./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/tcl.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/tcl.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function(hljs) {\n  return {\n    aliases: ['tk'],\n    keywords: 'after append apply array auto_execok auto_import auto_load auto_mkindex ' +\n      'auto_mkindex_old auto_qualify auto_reset bgerror binary break catch cd chan clock ' +\n      'close concat continue dde dict encoding eof error eval exec exit expr fblocked ' +\n      'fconfigure fcopy file fileevent filename flush for foreach format gets glob global ' +\n      'history http if incr info interp join lappend|10 lassign|10 lindex|10 linsert|10 list ' +\n      'llength|10 load lrange|10 lrepeat|10 lreplace|10 lreverse|10 lsearch|10 lset|10 lsort|10 '+\n      'mathfunc mathop memory msgcat namespace open package parray pid pkg::create pkg_mkIndex '+\n      'platform platform::shell proc puts pwd read refchan regexp registry regsub|10 rename '+\n      'return safe scan seek set socket source split string subst switch tcl_endOfWord '+\n      'tcl_findLibrary tcl_startOfNextWord tcl_startOfPreviousWord tcl_wordBreakAfter '+\n      'tcl_wordBreakBefore tcltest tclvars tell time tm trace unknown unload unset update '+\n      'uplevel upvar variable vwait while',\n    contains: [\n      hljs.COMMENT(';[ \\\\t]*#', '$'),\n      hljs.COMMENT('^[ \\\\t]*#', '$'),\n      {\n        beginKeywords: 'proc',\n        end: '[\\\\{]',\n        excludeEnd: true,\n        contains: [\n          {\n            className: 'title',\n            begin: '[ \\\\t\\\\n\\\\r]+(::)?[a-zA-Z_]((::)?[a-zA-Z0-9_])*',\n            end: '[ \\\\t\\\\n\\\\r]',\n            endsWithParent: true,\n            excludeEnd: true\n          }\n        ]\n      },\n      {\n        excludeEnd: true,\n        variants: [\n          {\n            begin: '\\\\$(\\\\{)?(::)?[a-zA-Z_]((::)?[a-zA-Z0-9_])*\\\\(([a-zA-Z0-9_])*\\\\)',\n            end: '[^a-zA-Z0-9_\\\\}\\\\$]'\n          },\n          {\n            begin: '\\\\$(\\\\{)?(::)?[a-zA-Z_]((::)?[a-zA-Z0-9_])*',\n            end: '(\\\\))?[^a-zA-Z0-9_\\\\}\\\\$]'\n          }\n        ]\n      },\n      {\n        className: 'string',\n        contains: [hljs.BACKSLASH_ESCAPE],\n        variants: [\n          hljs.inherit(hljs.APOS_STRING_MODE, {illegal: null}),\n          hljs.inherit(hljs.QUOTE_STRING_MODE, {illegal: null})\n        ]\n      },\n      {\n        className: 'number',\n        variants: [hljs.BINARY_NUMBER_MODE, hljs.C_NUMBER_MODE]\n      }\n    ]\n  }\n};\n\n//# sourceURL=webpack:///./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/tcl.js?");

/***/ })

}]);