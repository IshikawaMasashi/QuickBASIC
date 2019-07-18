(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["react-syntax-highlighter_languages_highlight_sas"],{

/***/ "./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/sas.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/sas.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function(hljs) {\n\n    // Data step and PROC SQL statements\n    var SAS_KEYWORDS = ''+\n        'do if then else end until while '+\n        ''+\n        'abort array attrib by call cards cards4 catname continue '+\n        'datalines datalines4 delete delim delimiter display dm drop '+\n        'endsas error file filename footnote format goto in infile '+\n        'informat input keep label leave length libname link list '+\n        'lostcard merge missing modify options output out page put '+\n        'redirect remove rename replace retain return select set skip '+\n        'startsas stop title update waitsas where window x systask '+\n        ''+\n        'add and alter as cascade check create delete describe '+\n        'distinct drop foreign from group having index insert into in '+\n        'key like message modify msgtype not null on or order primary '+\n        'references reset restrict select set table unique update '+\n        'validate view where';\n\n    // Built-in SAS functions\n    var SAS_FUN = ''+\n        'abs|addr|airy|arcos|arsin|atan|attrc|attrn|band|'+\n        'betainv|blshift|bnot|bor|brshift|bxor|byte|cdf|ceil|'+\n        'cexist|cinv|close|cnonct|collate|compbl|compound|'+\n        'compress|cos|cosh|css|curobs|cv|daccdb|daccdbsl|'+\n        'daccsl|daccsyd|dacctab|dairy|date|datejul|datepart|'+\n        'datetime|day|dclose|depdb|depdbsl|depdbsl|depsl|'+\n        'depsl|depsyd|depsyd|deptab|deptab|dequote|dhms|dif|'+\n        'digamma|dim|dinfo|dnum|dopen|doptname|doptnum|dread|'+\n        'dropnote|dsname|erf|erfc|exist|exp|fappend|fclose|'+\n        'fcol|fdelete|fetch|fetchobs|fexist|fget|fileexist|'+\n        'filename|fileref|finfo|finv|fipname|fipnamel|'+\n        'fipstate|floor|fnonct|fnote|fopen|foptname|foptnum|'+\n        'fpoint|fpos|fput|fread|frewind|frlen|fsep|fuzz|'+\n        'fwrite|gaminv|gamma|getoption|getvarc|getvarn|hbound|'+\n        'hms|hosthelp|hour|ibessel|index|indexc|indexw|input|'+\n        'inputc|inputn|int|intck|intnx|intrr|irr|jbessel|'+\n        'juldate|kurtosis|lag|lbound|left|length|lgamma|'+\n        'libname|libref|log|log10|log2|logpdf|logpmf|logsdf|'+\n        'lowcase|max|mdy|mean|min|minute|mod|month|mopen|'+\n        'mort|n|netpv|nmiss|normal|note|npv|open|ordinal|'+\n        'pathname|pdf|peek|peekc|pmf|point|poisson|poke|'+\n        'probbeta|probbnml|probchi|probf|probgam|probhypr|'+\n        'probit|probnegb|probnorm|probt|put|putc|putn|qtr|'+\n        'quote|ranbin|rancau|ranexp|rangam|range|rank|rannor|'+\n        'ranpoi|rantbl|rantri|ranuni|repeat|resolve|reverse|'+\n        'rewind|right|round|saving|scan|sdf|second|sign|'+\n        'sin|sinh|skewness|soundex|spedis|sqrt|std|stderr|'+\n        'stfips|stname|stnamel|substr|sum|symget|sysget|'+\n        'sysmsg|sysprod|sysrc|system|tan|tanh|time|timepart|'+\n        'tinv|tnonct|today|translate|tranwrd|trigamma|'+\n        'trim|trimn|trunc|uniform|upcase|uss|var|varfmt|'+\n        'varinfmt|varlabel|varlen|varname|varnum|varray|'+\n        'varrayx|vartype|verify|vformat|vformatd|vformatdx|'+\n        'vformatn|vformatnx|vformatw|vformatwx|vformatx|'+\n        'vinarray|vinarrayx|vinformat|vinformatd|vinformatdx|'+\n        'vinformatn|vinformatnx|vinformatw|vinformatwx|'+\n        'vinformatx|vlabel|vlabelx|vlength|vlengthx|vname|'+\n        'vnamex|vtype|vtypex|weekday|year|yyq|zipfips|zipname|'+\n        'zipnamel|zipstate';\n\n    // Built-in macro functions\n    var SAS_MACRO_FUN = 'bquote|nrbquote|cmpres|qcmpres|compstor|'+\n        'datatyp|display|do|else|end|eval|global|goto|'+\n        'if|index|input|keydef|label|left|length|let|'+\n        'local|lowcase|macro|mend|nrbquote|nrquote|'+\n        'nrstr|put|qcmpres|qleft|qlowcase|qscan|'+\n        'qsubstr|qsysfunc|qtrim|quote|qupcase|scan|str|'+\n        'substr|superq|syscall|sysevalf|sysexec|sysfunc|'+\n        'sysget|syslput|sysprod|sysrc|sysrput|then|to|'+\n        'trim|unquote|until|upcase|verify|while|window';\n\n    return {\n        aliases: ['sas', 'SAS'],\n        case_insensitive: true, // SAS is case-insensitive\n        keywords: {\n            literal:\n                'null missing _all_ _automatic_ _character_ _infile_ '+\n                '_n_ _name_ _null_ _numeric_ _user_ _webout_',\n            meta:\n                SAS_KEYWORDS\n        },\n        contains: [\n            {\n                // Distinct highlight for proc <proc>, data, run, quit\n                className: 'keyword',\n                begin: /^\\s*(proc [\\w\\d_]+|data|run|quit)[\\s\\;]/\n            },\n            {\n                // Macro variables\n                className: 'variable',\n                begin: /\\&[a-zA-Z_\\&][a-zA-Z0-9_]*\\.?/\n            },\n            {\n                // Special emphasis for datalines|cards\n                className: 'emphasis',\n                begin: /^\\s*datalines|cards.*;/,\n                end: /^\\s*;\\s*$/\n            },\n            {   // Built-in macro variables take precedence\n                className: 'built_in',\n                begin: '%(' + SAS_MACRO_FUN + ')'\n            },\n            {\n                // User-defined macro functions highlighted after\n                className: 'name',\n                begin: /%[a-zA-Z_][a-zA-Z_0-9]*/\n            },\n            {\n                className: 'meta',\n                begin: '[^%](' + SAS_FUN + ')[\\(]'\n            },\n            {\n                className: 'string',\n                variants: [\n                    hljs.APOS_STRING_MODE,\n                    hljs.QUOTE_STRING_MODE\n                ]\n            },\n            hljs.COMMENT('\\\\*', ';'),\n            hljs.C_BLOCK_COMMENT_MODE\n        ]\n    };\n};\n\n//# sourceURL=webpack:///./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/sas.js?");

/***/ })

}]);