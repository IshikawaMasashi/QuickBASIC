(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["react-syntax-highlighter_languages_highlight_purebasic"],{

/***/ "./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/purebasic.js":
/*!****************************************************************************************************!*\
  !*** ./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/purebasic.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = // Base deafult colors in PB IDE: background: #FFFFDF; foreground: #000000;\n\nfunction(hljs) {\n  var STRINGS = { // PB IDE color: #0080FF (Azure Radiance)\n    className: 'string',\n    begin: '(~)?\"', end: '\"',\n    illegal: '\\\\n'\n  };\n  var CONSTANTS = { // PB IDE color: #924B72 (Cannon Pink)\n    //  \"#\" + a letter or underscore + letters, digits or underscores + (optional) \"$\"\n    className: 'symbol',\n    begin: '#[a-zA-Z_]\\\\w*\\\\$?'\n  };\n\n  return {\n    aliases: ['pb', 'pbi'],\n    keywords: // PB IDE color: #006666 (Blue Stone) + Bold\n      // The following keywords list was taken and adapted from GuShH's PureBasic language file for GeSHi...\n      'And As Break CallDebugger Case CompilerCase CompilerDefault CompilerElse CompilerEndIf CompilerEndSelect ' +\n      'CompilerError CompilerIf CompilerSelect Continue Data DataSection EndDataSection Debug DebugLevel ' +\n      'Default Define Dim DisableASM DisableDebugger DisableExplicit Else ElseIf EnableASM ' +\n      'EnableDebugger EnableExplicit End EndEnumeration EndIf EndImport EndInterface EndMacro EndProcedure ' +\n      'EndSelect EndStructure EndStructureUnion EndWith Enumeration Extends FakeReturn For Next ForEach ' +\n      'ForEver Global Gosub Goto If Import ImportC IncludeBinary IncludeFile IncludePath Interface Macro ' +\n      'NewList Not Or ProcedureReturn Protected Prototype ' +\n      'PrototypeC Read ReDim Repeat Until Restore Return Select Shared Static Step Structure StructureUnion ' +\n      'Swap To Wend While With XIncludeFile XOr ' +\n      'Procedure ProcedureC ProcedureCDLL ProcedureDLL Declare DeclareC DeclareCDLL DeclareDLL',\n    contains: [\n      // COMMENTS | PB IDE color: #00AAAA (Persian Green)\n      hljs.COMMENT(';', '$', {relevance: 0}),\n\n      { // PROCEDURES DEFINITIONS\n        className: 'function',\n        begin: '\\\\b(Procedure|Declare)(C|CDLL|DLL)?\\\\b',\n        end: '\\\\(',\n        excludeEnd: true,\n        returnBegin: true,\n        contains: [\n          { // PROCEDURE KEYWORDS | PB IDE color: #006666 (Blue Stone) + Bold\n            className: 'keyword',\n            begin: '(Procedure|Declare)(C|CDLL|DLL)?',\n            excludeEnd: true\n          },\n          { // PROCEDURE RETURN TYPE SETTING | PB IDE color: #000000 (Black)\n            className: 'type',\n            begin: '\\\\.\\\\w*'\n            // end: ' ',\n          },\n          hljs.UNDERSCORE_TITLE_MODE // PROCEDURE NAME | PB IDE color: #006666 (Blue Stone)\n        ]\n      },\n      STRINGS,\n      CONSTANTS\n    ]\n  };\n};\n\n//# sourceURL=webpack:///./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/purebasic.js?");

/***/ })

}]);