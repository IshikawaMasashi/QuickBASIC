(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["react-syntax-highlighter_languages_highlight_juliaRepl"],{

/***/ "./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/julia-repl.js":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/julia-repl.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function(hljs) {\n  return {\n    contains: [\n      {\n        className: 'meta',\n        begin: /^julia>/,\n        relevance: 10,\n        starts: {\n          // end the highlighting if we are on a new line and the line does not have at\n          // least six spaces in the beginning\n          end: /^(?![ ]{6})/,\n          subLanguage: 'julia'\n      },\n      // jldoctest Markdown blocks are used in the Julia manual and package docs indicate\n      // code snippets that should be verified when the documentation is built. They can be\n      // either REPL-like or script-like, but are usually REPL-like and therefore we apply\n      // julia-repl highlighting to them. More information can be found in Documenter's\n      // manual: https://juliadocs.github.io/Documenter.jl/latest/man/doctests.html\n      aliases: ['jldoctest']\n      }\n    ]\n  }\n};\n\n//# sourceURL=webpack:///./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/julia-repl.js?");

/***/ })

}]);