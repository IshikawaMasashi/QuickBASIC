(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["react-syntax-highlighter_languages_highlight_q"],{

/***/ "./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/q.js":
/*!********************************************************************************************!*\
  !*** ./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/q.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function(hljs) {\n  var Q_KEYWORDS = {\n  keyword:\n    'do while select delete by update from',\n  literal:\n    '0b 1b',\n  built_in:\n    'neg not null string reciprocal floor ceiling signum mod xbar xlog and or each scan over prior mmu lsq inv md5 ltime gtime count first var dev med cov cor all any rand sums prds mins maxs fills deltas ratios avgs differ prev next rank reverse iasc idesc asc desc msum mcount mavg mdev xrank mmin mmax xprev rotate distinct group where flip type key til get value attr cut set upsert raze union inter except cross sv vs sublist enlist read0 read1 hopen hclose hdel hsym hcount peach system ltrim rtrim trim lower upper ssr view tables views cols xcols keys xkey xcol xasc xdesc fkeys meta lj aj aj0 ij pj asof uj ww wj wj1 fby xgroup ungroup ej save load rsave rload show csv parse eval min max avg wavg wsum sin cos tan sum',\n  type:\n    '`float `double int `timestamp `timespan `datetime `time `boolean `symbol `char `byte `short `long `real `month `date `minute `second `guid'\n  };\n  return {\n  aliases:['k', 'kdb'],\n  keywords: Q_KEYWORDS,\n  lexemes: /(`?)[A-Za-z0-9_]+\\b/,\n  contains: [\n  hljs.C_LINE_COMMENT_MODE,\n    hljs.QUOTE_STRING_MODE,\n    hljs.C_NUMBER_MODE\n     ]\n  };\n};\n\n//# sourceURL=webpack:///./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/q.js?");

/***/ })

}]);