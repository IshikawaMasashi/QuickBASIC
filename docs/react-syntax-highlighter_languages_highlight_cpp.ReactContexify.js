(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["react-syntax-highlighter_languages_highlight_cpp"],{

/***/ "./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/cpp.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/cpp.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function(hljs) {\n  var CPP_PRIMITIVE_TYPES = {\n    className: 'keyword',\n    begin: '\\\\b[a-z\\\\d_]*_t\\\\b'\n  };\n\n  var STRINGS = {\n    className: 'string',\n    variants: [\n      {\n        begin: '(u8?|U|L)?\"', end: '\"',\n        illegal: '\\\\n',\n        contains: [hljs.BACKSLASH_ESCAPE]\n      },\n      {\n        // TODO: This does not handle raw string literals with prefixes. Using\n        // a single regex with backreferences would work (note to use *?\n        // instead of * to make it non-greedy), but the mode.terminators\n        // computation in highlight.js breaks the counting.\n        begin: '(u8?|U|L)?R\"\\\\(', end: '\\\\)\"',\n      },\n      {\n        begin: '\\'\\\\\\\\?.', end: '\\'',\n        illegal: '.'\n      }\n    ]\n  };\n\n  var NUMBERS = {\n    className: 'number',\n    variants: [\n      { begin: '\\\\b(0b[01\\']+)' },\n      { begin: '(-?)\\\\b([\\\\d\\']+(\\\\.[\\\\d\\']*)?|\\\\.[\\\\d\\']+)(u|U|l|L|ul|UL|f|F|b|B)' },\n      { begin: '(-?)(\\\\b0[xX][a-fA-F0-9\\']+|(\\\\b[\\\\d\\']+(\\\\.[\\\\d\\']*)?|\\\\.[\\\\d\\']+)([eE][-+]?[\\\\d\\']+)?)' }\n    ],\n    relevance: 0\n  };\n\n  var PREPROCESSOR =       {\n    className: 'meta',\n    begin: /#\\s*[a-z]+\\b/, end: /$/,\n    keywords: {\n      'meta-keyword':\n        'if else elif endif define undef warning error line ' +\n        'pragma ifdef ifndef include'\n    },\n    contains: [\n      {\n        begin: /\\\\\\n/, relevance: 0\n      },\n      hljs.inherit(STRINGS, {className: 'meta-string'}),\n      {\n        className: 'meta-string',\n        begin: /<[^\\n>]*>/, end: /$/,\n        illegal: '\\\\n',\n      },\n      hljs.C_LINE_COMMENT_MODE,\n      hljs.C_BLOCK_COMMENT_MODE\n    ]\n  };\n\n  var FUNCTION_TITLE = hljs.IDENT_RE + '\\\\s*\\\\(';\n\n  var CPP_KEYWORDS = {\n    keyword: 'int float while private char catch import module export virtual operator sizeof ' +\n      'dynamic_cast|10 typedef const_cast|10 const for static_cast|10 union namespace ' +\n      'unsigned long volatile static protected bool template mutable if public friend ' +\n      'do goto auto void enum else break extern using asm case typeid ' +\n      'short reinterpret_cast|10 default double register explicit signed typename try this ' +\n      'switch continue inline delete alignof constexpr decltype ' +\n      'noexcept static_assert thread_local restrict _Bool complex _Complex _Imaginary ' +\n      'atomic_bool atomic_char atomic_schar ' +\n      'atomic_uchar atomic_short atomic_ushort atomic_int atomic_uint atomic_long atomic_ulong atomic_llong ' +\n      'atomic_ullong new throw return ' +\n      'and or not',\n    built_in: 'std string cin cout cerr clog stdin stdout stderr stringstream istringstream ostringstream ' +\n      'auto_ptr deque list queue stack vector map set bitset multiset multimap unordered_set ' +\n      'unordered_map unordered_multiset unordered_multimap array shared_ptr abort abs acos ' +\n      'asin atan2 atan calloc ceil cosh cos exit exp fabs floor fmod fprintf fputs free frexp ' +\n      'fscanf isalnum isalpha iscntrl isdigit isgraph islower isprint ispunct isspace isupper ' +\n      'isxdigit tolower toupper labs ldexp log10 log malloc realloc memchr memcmp memcpy memset modf pow ' +\n      'printf putchar puts scanf sinh sin snprintf sprintf sqrt sscanf strcat strchr strcmp ' +\n      'strcpy strcspn strlen strncat strncmp strncpy strpbrk strrchr strspn strstr tanh tan ' +\n      'vfprintf vprintf vsprintf endl initializer_list unique_ptr',\n    literal: 'true false nullptr NULL'\n  };\n\n  var EXPRESSION_CONTAINS = [\n    CPP_PRIMITIVE_TYPES,\n    hljs.C_LINE_COMMENT_MODE,\n    hljs.C_BLOCK_COMMENT_MODE,\n    NUMBERS,\n    STRINGS\n  ];\n\n  return {\n    aliases: ['c', 'cc', 'h', 'c++', 'h++', 'hpp'],\n    keywords: CPP_KEYWORDS,\n    illegal: '</',\n    contains: EXPRESSION_CONTAINS.concat([\n      PREPROCESSOR,\n      {\n        begin: '\\\\b(deque|list|queue|stack|vector|map|set|bitset|multiset|multimap|unordered_map|unordered_set|unordered_multiset|unordered_multimap|array)\\\\s*<', end: '>',\n        keywords: CPP_KEYWORDS,\n        contains: ['self', CPP_PRIMITIVE_TYPES]\n      },\n      {\n        begin: hljs.IDENT_RE + '::',\n        keywords: CPP_KEYWORDS\n      },\n      {\n        // This mode covers expression context where we can't expect a function\n        // definition and shouldn't highlight anything that looks like one:\n        // `return some()`, `else if()`, `(x*sum(1, 2))`\n        variants: [\n          {begin: /=/, end: /;/},\n          {begin: /\\(/, end: /\\)/},\n          {beginKeywords: 'new throw return else', end: /;/}\n        ],\n        keywords: CPP_KEYWORDS,\n        contains: EXPRESSION_CONTAINS.concat([\n          {\n            begin: /\\(/, end: /\\)/,\n            keywords: CPP_KEYWORDS,\n            contains: EXPRESSION_CONTAINS.concat(['self']),\n            relevance: 0\n          }\n        ]),\n        relevance: 0\n      },\n      {\n        className: 'function',\n        begin: '(' + hljs.IDENT_RE + '[\\\\*&\\\\s]+)+' + FUNCTION_TITLE,\n        returnBegin: true, end: /[{;=]/,\n        excludeEnd: true,\n        keywords: CPP_KEYWORDS,\n        illegal: /[^\\w\\s\\*&]/,\n        contains: [\n          {\n            begin: FUNCTION_TITLE, returnBegin: true,\n            contains: [hljs.TITLE_MODE],\n            relevance: 0\n          },\n          {\n            className: 'params',\n            begin: /\\(/, end: /\\)/,\n            keywords: CPP_KEYWORDS,\n            relevance: 0,\n            contains: [\n              hljs.C_LINE_COMMENT_MODE,\n              hljs.C_BLOCK_COMMENT_MODE,\n              STRINGS,\n              NUMBERS,\n              CPP_PRIMITIVE_TYPES,\n              // Count matching parentheses.\n              {\n                begin: /\\(/, end: /\\)/,\n                keywords: CPP_KEYWORDS,\n                relevance: 0,\n                contains: [\n                  'self',\n                  hljs.C_LINE_COMMENT_MODE,\n                  hljs.C_BLOCK_COMMENT_MODE,\n                  STRINGS,\n                  NUMBERS,\n                  CPP_PRIMITIVE_TYPES\n                ]\n              }\n            ]\n          },\n          hljs.C_LINE_COMMENT_MODE,\n          hljs.C_BLOCK_COMMENT_MODE,\n          PREPROCESSOR\n        ]\n      },\n      {\n        className: 'class',\n        beginKeywords: 'class struct', end: /[{;:]/,\n        contains: [\n          {begin: /</, end: />/, contains: ['self']}, // skip generic stuff\n          hljs.TITLE_MODE\n        ]\n      }\n    ]),\n    exports: {\n      preprocessor: PREPROCESSOR,\n      strings: STRINGS,\n      keywords: CPP_KEYWORDS\n    }\n  };\n};\n\n//# sourceURL=webpack:///./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/cpp.js?");

/***/ })

}]);