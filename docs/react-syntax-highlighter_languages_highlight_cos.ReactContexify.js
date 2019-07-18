(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["react-syntax-highlighter_languages_highlight_cos"],{

/***/ "./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/cos.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/cos.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function cos (hljs) {\n\n  var STRINGS = {\n    className: 'string',\n    variants: [\n      {\n        begin: '\"',\n        end: '\"',\n        contains: [{ // escaped\n          begin: \"\\\"\\\"\",\n          relevance: 0\n        }]\n      }\n    ]\n  };\n\n  var NUMBERS = {\n    className: \"number\",\n    begin: \"\\\\b(\\\\d+(\\\\.\\\\d*)?|\\\\.\\\\d+)\",\n    relevance: 0\n  };\n\n  var COS_KEYWORDS =\n    'property parameter class classmethod clientmethod extends as break ' +\n    'catch close continue do d|0 else elseif for goto halt hang h|0 if job ' +\n    'j|0 kill k|0 lock l|0 merge new open quit q|0 read r|0 return set s|0 ' +\n    'tcommit throw trollback try tstart use view while write w|0 xecute x|0 ' +\n    'zkill znspace zn ztrap zwrite zw zzdump zzwrite print zbreak zinsert ' +\n    'zload zprint zremove zsave zzprint mv mvcall mvcrt mvdim mvprint zquit ' +\n    'zsync ascii';\n\n    // registered function - no need in them due to all functions are highlighted,\n    // but I'll just leave this here.\n\n    //\"$bit\", \"$bitcount\",\n    //\"$bitfind\", \"$bitlogic\", \"$case\", \"$char\", \"$classmethod\", \"$classname\",\n    //\"$compile\", \"$data\", \"$decimal\", \"$double\", \"$extract\", \"$factor\",\n    //\"$find\", \"$fnumber\", \"$get\", \"$increment\", \"$inumber\", \"$isobject\",\n    //\"$isvaliddouble\", \"$isvalidnum\", \"$justify\", \"$length\", \"$list\",\n    //\"$listbuild\", \"$listdata\", \"$listfind\", \"$listfromstring\", \"$listget\",\n    //\"$listlength\", \"$listnext\", \"$listsame\", \"$listtostring\", \"$listvalid\",\n    //\"$locate\", \"$match\", \"$method\", \"$name\", \"$nconvert\", \"$next\",\n    //\"$normalize\", \"$now\", \"$number\", \"$order\", \"$parameter\", \"$piece\",\n    //\"$prefetchoff\", \"$prefetchon\", \"$property\", \"$qlength\", \"$qsubscript\",\n    //\"$query\", \"$random\", \"$replace\", \"$reverse\", \"$sconvert\", \"$select\",\n    //\"$sortbegin\", \"$sortend\", \"$stack\", \"$text\", \"$translate\", \"$view\",\n    //\"$wascii\", \"$wchar\", \"$wextract\", \"$wfind\", \"$wiswide\", \"$wlength\",\n    //\"$wreverse\", \"$xecute\", \"$zabs\", \"$zarccos\", \"$zarcsin\", \"$zarctan\",\n    //\"$zcos\", \"$zcot\", \"$zcsc\", \"$zdate\", \"$zdateh\", \"$zdatetime\",\n    //\"$zdatetimeh\", \"$zexp\", \"$zhex\", \"$zln\", \"$zlog\", \"$zpower\", \"$zsec\",\n    //\"$zsin\", \"$zsqr\", \"$ztan\", \"$ztime\", \"$ztimeh\", \"$zboolean\",\n    //\"$zconvert\", \"$zcrc\", \"$zcyc\", \"$zdascii\", \"$zdchar\", \"$zf\",\n    //\"$ziswide\", \"$zlascii\", \"$zlchar\", \"$zname\", \"$zposition\", \"$zqascii\",\n    //\"$zqchar\", \"$zsearch\", \"$zseek\", \"$zstrip\", \"$zwascii\", \"$zwchar\",\n    //\"$zwidth\", \"$zwpack\", \"$zwbpack\", \"$zwunpack\", \"$zwbunpack\", \"$zzenkaku\",\n    //\"$change\", \"$mv\", \"$mvat\", \"$mvfmt\", \"$mvfmts\", \"$mviconv\",\n    //\"$mviconvs\", \"$mvinmat\", \"$mvlover\", \"$mvoconv\", \"$mvoconvs\", \"$mvraise\",\n    //\"$mvtrans\", \"$mvv\", \"$mvname\", \"$zbitand\", \"$zbitcount\", \"$zbitfind\",\n    //\"$zbitget\", \"$zbitlen\", \"$zbitnot\", \"$zbitor\", \"$zbitset\", \"$zbitstr\",\n    //\"$zbitxor\", \"$zincrement\", \"$znext\", \"$zorder\", \"$zprevious\", \"$zsort\",\n    //\"device\", \"$ecode\", \"$estack\", \"$etrap\", \"$halt\", \"$horolog\",\n    //\"$io\", \"$job\", \"$key\", \"$namespace\", \"$principal\", \"$quit\", \"$roles\",\n    //\"$storage\", \"$system\", \"$test\", \"$this\", \"$tlevel\", \"$username\",\n    //\"$x\", \"$y\", \"$za\", \"$zb\", \"$zchild\", \"$zeof\", \"$zeos\", \"$zerror\",\n    //\"$zhorolog\", \"$zio\", \"$zjob\", \"$zmode\", \"$znspace\", \"$zparent\", \"$zpi\",\n    //\"$zpos\", \"$zreference\", \"$zstorage\", \"$ztimestamp\", \"$ztimezone\",\n    //\"$ztrap\", \"$zversion\"\n\n  return {\n    case_insensitive: true,\n    aliases: [\"cos\", \"cls\"],\n    keywords: COS_KEYWORDS,\n    contains: [\n      NUMBERS,\n      STRINGS,\n      hljs.C_LINE_COMMENT_MODE,\n      hljs.C_BLOCK_COMMENT_MODE,\n      {\n        className: \"comment\",\n        begin: /;/, end: \"$\",\n        relevance: 0\n      },\n      { // Functions and user-defined functions: write $ztime(60*60*3), $$myFunc(10), $$^Val(1)\n        className: \"built_in\",\n        begin: /(?:\\$\\$?|\\.\\.)\\^?[a-zA-Z]+/\n      },\n      { // Macro command: quit $$$OK\n        className: \"built_in\",\n        begin: /\\$\\$\\$[a-zA-Z]+/\n      },\n      { // Special (global) variables: write %request.Content; Built-in classes: %Library.Integer\n        className: \"built_in\",\n        begin: /%[a-z]+(?:\\.[a-z]+)*/\n      },\n      { // Global variable: set ^globalName = 12 write ^globalName\n        className: \"symbol\",\n        begin: /\\^%?[a-zA-Z][\\w]*/\n      },\n      { // Some control constructions: do ##class(Package.ClassName).Method(), ##super()\n        className: \"keyword\",\n        begin: /##class|##super|#define|#dim/\n      },\n\n      // sub-languages: are not fully supported by hljs by 11/15/2015\n      // left for the future implementation.\n      {\n        begin: /&sql\\(/,    end: /\\)/,\n        excludeBegin: true, excludeEnd: true,\n        subLanguage: \"sql\"\n      },\n      {\n        begin: /&(js|jscript|javascript)</, end: />/,\n        excludeBegin: true, excludeEnd: true,\n        subLanguage: \"javascript\"\n      },\n      {\n        // this brakes first and last tag, but this is the only way to embed a valid html\n        begin: /&html<\\s*</, end: />\\s*>/,\n        subLanguage: \"xml\"\n      }\n    ]\n  };\n};\n\n//# sourceURL=webpack:///./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/cos.js?");

/***/ })

}]);