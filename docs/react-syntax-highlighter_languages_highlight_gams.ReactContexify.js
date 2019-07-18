(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["react-syntax-highlighter_languages_highlight_gams"],{

/***/ "./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/gams.js":
/*!***********************************************************************************************!*\
  !*** ./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/gams.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function (hljs) {\n  var KEYWORDS = {\n    'keyword':\n      'abort acronym acronyms alias all and assign binary card diag display ' +\n      'else eq file files for free ge gt if integer le loop lt maximizing ' +\n      'minimizing model models ne negative no not option options or ord ' +\n      'positive prod put putpage puttl repeat sameas semicont semiint smax ' +\n      'smin solve sos1 sos2 sum system table then until using while xor yes',\n    'literal': 'eps inf na',\n    'built-in':\n      'abs arccos arcsin arctan arctan2 Beta betaReg binomial ceil centropy ' +\n      'cos cosh cvPower div div0 eDist entropy errorf execSeed exp fact ' +\n      'floor frac gamma gammaReg log logBeta logGamma log10 log2 mapVal max ' +\n      'min mod ncpCM ncpF ncpVUpow ncpVUsin normal pi poly power ' +\n      'randBinomial randLinear randTriangle round rPower sigmoid sign ' +\n      'signPower sin sinh slexp sllog10 slrec sqexp sqlog10 sqr sqrec sqrt ' +\n      'tan tanh trunc uniform uniformInt vcPower bool_and bool_eqv bool_imp ' +\n      'bool_not bool_or bool_xor ifThen rel_eq rel_ge rel_gt rel_le rel_lt ' +\n      'rel_ne gday gdow ghour gleap gmillisec gminute gmonth gsecond gyear ' +\n      'jdate jnow jstart jtime errorLevel execError gamsRelease gamsVersion ' +\n      'handleCollect handleDelete handleStatus handleSubmit heapFree ' +\n      'heapLimit heapSize jobHandle jobKill jobStatus jobTerminate ' +\n      'licenseLevel licenseStatus maxExecError sleep timeClose timeComp ' +\n      'timeElapsed timeExec timeStart'\n  };\n  var PARAMS = {\n    className: 'params',\n    begin: /\\(/, end: /\\)/,\n    excludeBegin: true,\n    excludeEnd: true,\n  };\n  var SYMBOLS = {\n    className: 'symbol',\n    variants: [\n      {begin: /\\=[lgenxc]=/},\n      {begin: /\\$/},\n    ]\n  };\n  var QSTR = { // One-line quoted comment string\n    className: 'comment',\n    variants: [\n      {begin: '\\'', end: '\\''},\n      {begin: '\"', end: '\"'},\n    ],\n    illegal: '\\\\n',\n    contains: [hljs.BACKSLASH_ESCAPE]\n  };\n  var ASSIGNMENT = {\n    begin: '/',\n    end: '/',\n    keywords: KEYWORDS,\n    contains: [\n      QSTR,\n      hljs.C_LINE_COMMENT_MODE,\n      hljs.C_BLOCK_COMMENT_MODE,\n      hljs.QUOTE_STRING_MODE,\n      hljs.APOS_STRING_MODE,\n      hljs.C_NUMBER_MODE,\n    ],\n  };\n  var DESCTEXT = { // Parameter/set/variable description text\n    begin: /[a-z][a-z0-9_]*(\\([a-z0-9_, ]*\\))?[ \\t]+/,\n    excludeBegin: true,\n    end: '$',\n    endsWithParent: true,\n    contains: [\n      QSTR,\n      ASSIGNMENT,\n      {\n        className: 'comment',\n        begin: /([ ]*[a-z0-9&#*=?@>\\\\<:\\-,()$\\[\\]_.{}!+%^]+)+/,\n        relevance: 0\n      },\n    ],\n  };\n\n  return {\n    aliases: ['gms'],\n    case_insensitive: true,\n    keywords: KEYWORDS,\n    contains: [\n      hljs.COMMENT(/^\\$ontext/, /^\\$offtext/),\n      {\n        className: 'meta',\n        begin: '^\\\\$[a-z0-9]+',\n        end: '$',\n        returnBegin: true,\n        contains: [\n          {\n            className: 'meta-keyword',\n            begin: '^\\\\$[a-z0-9]+',\n          }\n        ]\n      },\n      hljs.COMMENT('^\\\\*', '$'),\n      hljs.C_LINE_COMMENT_MODE,\n      hljs.C_BLOCK_COMMENT_MODE,\n      hljs.QUOTE_STRING_MODE,\n      hljs.APOS_STRING_MODE,\n      // Declarations\n      {\n        beginKeywords:\n          'set sets parameter parameters variable variables ' +\n          'scalar scalars equation equations',\n        end: ';',\n        contains: [\n          hljs.COMMENT('^\\\\*', '$'),\n          hljs.C_LINE_COMMENT_MODE,\n          hljs.C_BLOCK_COMMENT_MODE,\n          hljs.QUOTE_STRING_MODE,\n          hljs.APOS_STRING_MODE,\n          ASSIGNMENT,\n          DESCTEXT,\n        ]\n      },\n      { // table environment\n        beginKeywords: 'table',\n        end: ';',\n        returnBegin: true,\n        contains: [\n          { // table header row\n            beginKeywords: 'table',\n            end: '$',\n            contains: [DESCTEXT],\n          },\n          hljs.COMMENT('^\\\\*', '$'),\n          hljs.C_LINE_COMMENT_MODE,\n          hljs.C_BLOCK_COMMENT_MODE,\n          hljs.QUOTE_STRING_MODE,\n          hljs.APOS_STRING_MODE,\n          hljs.C_NUMBER_MODE,\n          // Table does not contain DESCTEXT or ASSIGNMENT\n        ]\n      },\n      // Function definitions\n      {\n        className: 'function',\n        begin: /^[a-z][a-z0-9_,\\-+' ()$]+\\.{2}/,\n        returnBegin: true,\n        contains: [\n              { // Function title\n                className: 'title',\n                begin: /^[a-z0-9_]+/,\n              },\n              PARAMS,\n              SYMBOLS,\n            ],\n      },\n      hljs.C_NUMBER_MODE,\n      SYMBOLS,\n    ]\n  };\n};\n\n//# sourceURL=webpack:///./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/gams.js?");

/***/ })

}]);