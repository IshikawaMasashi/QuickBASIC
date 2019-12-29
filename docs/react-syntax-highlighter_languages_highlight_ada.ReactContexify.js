(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["react-syntax-highlighter_languages_highlight_ada"],{

/***/ "./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/ada.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/ada.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = // We try to support full Ada2012\n//\n// We highlight all appearances of types, keywords, literals (string, char, number, bool)\n// and titles (user defined function/procedure/package)\n// CSS classes are set accordingly\n//\n// Languages causing problems for language detection:\n// xml (broken by Foo : Bar type), elm (broken by Foo : Bar type), vbscript-html (broken by body keyword)\n// sql (ada default.txt has a lot of sql keywords)\n\nfunction(hljs) {\n    // Regular expression for Ada numeric literals.\n    // stolen form the VHDL highlighter\n\n    // Decimal literal:\n    var INTEGER_RE = '\\\\d(_|\\\\d)*';\n    var EXPONENT_RE = '[eE][-+]?' + INTEGER_RE;\n    var DECIMAL_LITERAL_RE = INTEGER_RE + '(\\\\.' + INTEGER_RE + ')?' + '(' + EXPONENT_RE + ')?';\n\n    // Based literal:\n    var BASED_INTEGER_RE = '\\\\w+';\n    var BASED_LITERAL_RE = INTEGER_RE + '#' + BASED_INTEGER_RE + '(\\\\.' + BASED_INTEGER_RE + ')?' + '#' + '(' + EXPONENT_RE + ')?';\n\n    var NUMBER_RE = '\\\\b(' + BASED_LITERAL_RE + '|' + DECIMAL_LITERAL_RE + ')';\n\n    // Identifier regex\n    var ID_REGEX = '[A-Za-z](_?[A-Za-z0-9.])*';\n\n    // bad chars, only allowed in literals\n    var BAD_CHARS = '[]{}%#\\'\\\"'\n\n    // Ada doesn't have block comments, only line comments\n    var COMMENTS = hljs.COMMENT('--', '$');\n\n    // variable declarations of the form\n    // Foo : Bar := Baz;\n    // where only Bar will be highlighted\n    var VAR_DECLS = {\n        // TODO: These spaces are not required by the Ada syntax\n        // however, I have yet to see handwritten Ada code where\n        // someone does not put spaces around :\n        begin: '\\\\s+:\\\\s+', end: '\\\\s*(:=|;|\\\\)|=>|$)',\n        // endsWithParent: true,\n        // returnBegin: true,\n        illegal: BAD_CHARS,\n        contains: [\n            {\n                // workaround to avoid highlighting\n                // named loops and declare blocks\n                beginKeywords: 'loop for declare others',\n                endsParent: true,\n            },\n            {\n                // properly highlight all modifiers\n                className: 'keyword',\n                beginKeywords: 'not null constant access function procedure in out aliased exception'\n            },\n            {\n                className: 'type',\n                begin: ID_REGEX,\n                endsParent: true,\n                relevance: 0,\n            }\n        ]\n    };\n\n    return {\n        case_insensitive: true,\n        keywords: {\n            keyword:\n                'abort else new return abs elsif not reverse abstract end ' +\n                'accept entry select access exception of separate aliased exit or some ' +\n                'all others subtype and for out synchronized array function overriding ' +\n                'at tagged generic package task begin goto pragma terminate ' +\n                'body private then if procedure type case in protected constant interface ' +\n                'is raise use declare range delay limited record when delta loop rem while ' +\n                'digits renames with do mod requeue xor',\n            literal:\n                'True False',\n        },\n        contains: [\n            COMMENTS,\n            // strings \"foobar\"\n            {\n                className: 'string',\n                begin: /\"/, end: /\"/,\n                contains: [{begin: /\"\"/, relevance: 0}]\n            },\n            // characters ''\n            {\n                // character literals always contain one char\n                className: 'string',\n                begin: /'.'/\n            },\n            {\n                // number literals\n                className: 'number',\n                begin: NUMBER_RE,\n                relevance: 0\n            },\n            {\n                // Attributes\n                className: 'symbol',\n                begin: \"'\" + ID_REGEX,\n            },\n            {\n                // package definition, maybe inside generic\n                className: 'title',\n                begin: '(\\\\bwith\\\\s+)?(\\\\bprivate\\\\s+)?\\\\bpackage\\\\s+(\\\\bbody\\\\s+)?', end: '(is|$)',\n                keywords: 'package body',\n                excludeBegin: true,\n                excludeEnd: true,\n                illegal: BAD_CHARS\n            },\n            {\n                // function/procedure declaration/definition\n                // maybe inside generic\n                begin: '(\\\\b(with|overriding)\\\\s+)?\\\\b(function|procedure)\\\\s+', end: '(\\\\bis|\\\\bwith|\\\\brenames|\\\\)\\\\s*;)',\n                keywords: 'overriding function procedure with is renames return',\n                // we need to re-match the 'function' keyword, so that\n                // the title mode below matches only exactly once\n                returnBegin: true,\n                contains:\n                [\n                    COMMENTS,\n                    {\n                        // name of the function/procedure\n                        className: 'title',\n                        begin: '(\\\\bwith\\\\s+)?\\\\b(function|procedure)\\\\s+',\n                        end: '(\\\\(|\\\\s+|$)',\n                        excludeBegin: true,\n                        excludeEnd: true,\n                        illegal: BAD_CHARS\n                    },\n                    // 'self'\n                    // // parameter types\n                    VAR_DECLS,\n                    {\n                        // return type\n                        className: 'type',\n                        begin: '\\\\breturn\\\\s+', end: '(\\\\s+|;|$)',\n                        keywords: 'return',\n                        excludeBegin: true,\n                        excludeEnd: true,\n                        // we are done with functions\n                        endsParent: true,\n                        illegal: BAD_CHARS\n\n                    },\n                ]\n            },\n            {\n                // new type declarations\n                // maybe inside generic\n                className: 'type',\n                begin: '\\\\b(sub)?type\\\\s+', end: '\\\\s+',\n                keywords: 'type',\n                excludeBegin: true,\n                illegal: BAD_CHARS\n            },\n\n            // see comment above the definition\n            VAR_DECLS,\n\n            // no markup\n            // relevance boosters for small snippets\n            // {begin: '\\\\s*=>\\\\s*'},\n            // {begin: '\\\\s*:=\\\\s*'},\n            // {begin: '\\\\s+:=\\\\s+'},\n        ]\n    };\n};\n\n//# sourceURL=webpack:///./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/ada.js?");

/***/ })

}]);