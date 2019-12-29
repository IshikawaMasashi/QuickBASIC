(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["react-syntax-highlighter_languages_highlight_abnf"],{

/***/ "./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/abnf.js":
/*!***********************************************************************************************!*\
  !*** ./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/abnf.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function(hljs) {\n    var regexes = {\n        ruleDeclaration: \"^[a-zA-Z][a-zA-Z0-9-]*\",\n        unexpectedChars: \"[!@#$^&',?+~`|:]\"\n    };\n\n    var keywords = [\n        \"ALPHA\",\n        \"BIT\",\n        \"CHAR\",\n        \"CR\",\n        \"CRLF\",\n        \"CTL\",\n        \"DIGIT\",\n        \"DQUOTE\",\n        \"HEXDIG\",\n        \"HTAB\",\n        \"LF\",\n        \"LWSP\",\n        \"OCTET\",\n        \"SP\",\n        \"VCHAR\",\n        \"WSP\"\n    ];\n\n    var commentMode = hljs.COMMENT(\";\", \"$\");\n\n    var terminalBinaryMode = {\n        className: \"symbol\",\n        begin: /%b[0-1]+(-[0-1]+|(\\.[0-1]+)+){0,1}/\n    };\n\n    var terminalDecimalMode = {\n        className: \"symbol\",\n        begin: /%d[0-9]+(-[0-9]+|(\\.[0-9]+)+){0,1}/\n    };\n\n    var terminalHexadecimalMode = {\n        className: \"symbol\",\n        begin: /%x[0-9A-F]+(-[0-9A-F]+|(\\.[0-9A-F]+)+){0,1}/,\n    };\n\n    var caseSensitivityIndicatorMode = {\n        className: \"symbol\",\n        begin: /%[si]/\n    };\n\n    var ruleDeclarationMode = {\n        begin: regexes.ruleDeclaration + '\\\\s*=',\n        returnBegin: true,\n        end: /=/,\n        relevance: 0,\n        contains: [{className: \"attribute\", begin: regexes.ruleDeclaration}]\n    };\n\n    return {\n      illegal: regexes.unexpectedChars,\n      keywords: keywords.join(\" \"),\n      contains: [\n          ruleDeclarationMode,\n          commentMode,\n          terminalBinaryMode,\n          terminalDecimalMode,\n          terminalHexadecimalMode,\n          caseSensitivityIndicatorMode,\n          hljs.QUOTE_STRING_MODE,\n          hljs.NUMBER_MODE\n      ]\n    };\n};\n\n//# sourceURL=webpack:///./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/abnf.js?");

/***/ })

}]);