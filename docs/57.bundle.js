(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[57],{

/***/ "./node_modules/monaco-editor/esm/vs/basic-languages/swift/swift.js":
/*!**************************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/basic-languages/swift/swift.js ***!
  \**************************************************************************/
/*! exports provided: conf, language */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"conf\", function() { return conf; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"language\", function() { return language; });\n/*!---------------------------------------------------------------------------------------------\r\n *  Copyright (C) David Owens II, owensd.io. All rights reserved.\r\n *--------------------------------------------------------------------------------------------*/\r\n\r\nvar conf = {\r\n    comments: {\r\n        lineComment: '//',\r\n        blockComment: ['/*', '*/'],\r\n    },\r\n    brackets: [\r\n        ['{', '}'],\r\n        ['[', ']'],\r\n        ['(', ')']\r\n    ],\r\n    autoClosingPairs: [\r\n        { open: '{', close: '}' },\r\n        { open: '[', close: ']' },\r\n        { open: '(', close: ')' },\r\n        { open: '\"', close: '\"' },\r\n        { open: '\\'', close: '\\'' },\r\n        { open: '`', close: '`' },\r\n    ],\r\n    surroundingPairs: [\r\n        { open: '{', close: '}' },\r\n        { open: '[', close: ']' },\r\n        { open: '(', close: ')' },\r\n        { open: '\"', close: '\"' },\r\n        { open: '\\'', close: '\\'' },\r\n        { open: '`', close: '`' },\r\n    ]\r\n};\r\nvar language = {\r\n    defaultToken: '',\r\n    tokenPostfix: '.swift',\r\n    // TODO(owensd): Support the full range of unicode valid identifiers.\r\n    identifier: /[a-zA-Z_][\\w$]*/,\r\n    // TODO(owensd): Support the @availability macro properly.\r\n    attributes: [\r\n        '@autoclosure', '@noescape', '@noreturn', '@NSApplicationMain', '@NSCopying', '@NSManaged',\r\n        '@objc', '@UIApplicationMain', '@noreturn', '@availability', '@IBAction', '@IBDesignable', '@IBInspectable', '@IBOutlet'\r\n    ],\r\n    accessmodifiers: ['public', 'private', 'internal'],\r\n    keywords: [\r\n        '__COLUMN__', '__FILE__', '__FUNCTION__', '__LINE__', 'as', 'as!', 'as?', 'associativity', 'break', 'case', 'catch',\r\n        'class', 'continue', 'convenience', 'default', 'deinit', 'didSet', 'do', 'dynamic', 'dynamicType',\r\n        'else', 'enum', 'extension', 'fallthrough', 'final', 'for', 'func', 'get', 'guard', 'if', 'import', 'in', 'infix',\r\n        'init', 'inout', 'internal', 'is', 'lazy', 'left', 'let', 'mutating', 'nil', 'none', 'nonmutating', 'operator',\r\n        'optional', 'override', 'postfix', 'precedence', 'prefix', 'private', 'protocol', 'Protocol', 'public',\r\n        'repeat', 'required', 'return', 'right', 'self', 'Self', 'set', 'static', 'struct', 'subscript', 'super', 'switch',\r\n        'throw', 'throws', 'try', 'try!', 'Type', 'typealias', 'unowned', 'var', 'weak', 'where', 'while', 'willSet', 'FALSE', 'TRUE'\r\n    ],\r\n    symbols: /[=(){}\\[\\].,:;@#\\_&\\-<>`?!+*\\\\\\/]/,\r\n    // Moved . to operatorstart so it can be a delimiter\r\n    operatorstart: /[\\/=\\-+!*%<>&|^~?\\u00A1-\\u00A7\\u00A9\\u00AB\\u00AC\\u00AE\\u00B0-\\u00B1\\u00B6\\u00BB\\u00BF\\u00D7\\u00F7\\u2016-\\u2017\\u2020-\\u2027\\u2030-\\u203E\\u2041-\\u2053\\u2055-\\u205E\\u2190-\\u23FF\\u2500-\\u2775\\u2794-\\u2BFF\\u2E00-\\u2E7F\\u3001-\\u3003\\u3008-\\u3030]/,\r\n    operatorend: /[\\u0300-\\u036F\\u1DC0-\\u1DFF\\u20D0-\\u20FF\\uFE00-\\uFE0F\\uFE20-\\uFE2F\\uE0100-\\uE01EF]/,\r\n    operators: /(@operatorstart)((@operatorstart)|(@operatorend))*/,\r\n    // TODO(owensd): These are borrowed from C#; need to validate correctness for Swift.\r\n    escapes: /\\\\(?:[abfnrtv\\\\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,\r\n    tokenizer: {\r\n        root: [\r\n            { include: '@whitespace' },\r\n            { include: '@comment' },\r\n            { include: '@attribute' },\r\n            { include: '@literal' },\r\n            { include: '@keyword' },\r\n            { include: '@invokedmethod' },\r\n            { include: '@symbol' },\r\n        ],\r\n        whitespace: [\r\n            [/\\s+/, 'white'],\r\n            [/\"\"\"/, 'string.quote', '@endDblDocString']\r\n        ],\r\n        endDblDocString: [\r\n            [/[^\"]+/, 'string'],\r\n            [/\\\\\"/, 'string'],\r\n            [/\"\"\"/, 'string.quote', '@popall'],\r\n            [/\"/, 'string']\r\n        ],\r\n        symbol: [\r\n            [/[{}()\\[\\]]/, '@brackets'],\r\n            [/[<>](?!@symbols)/, '@brackets'],\r\n            [/[.]/, 'delimiter'],\r\n            [/@operators/, 'operator'],\r\n            [/@symbols/, 'operator']\r\n        ],\r\n        comment: [\r\n            [/\\/\\/\\/.*$/, 'comment.doc'],\r\n            [/\\/\\*\\*/, 'comment.doc', '@commentdocbody'],\r\n            [/\\/\\/.*$/, 'comment'],\r\n            [/\\/\\*/, 'comment', '@commentbody']\r\n        ],\r\n        commentdocbody: [\r\n            [/\\/\\*/, 'comment', '@commentbody'],\r\n            [/\\*\\//, 'comment.doc', '@pop'],\r\n            [/\\:[a-zA-Z]+\\:/, 'comment.doc.param'],\r\n            [/./, 'comment.doc']\r\n        ],\r\n        commentbody: [\r\n            [/\\/\\*/, 'comment', '@commentbody'],\r\n            [/\\*\\//, 'comment', '@pop'],\r\n            [/./, 'comment']\r\n        ],\r\n        attribute: [\r\n            [/\\@@identifier/, {\r\n                    cases: {\r\n                        '@attributes': 'keyword.control',\r\n                        '@default': ''\r\n                    }\r\n                }]\r\n        ],\r\n        literal: [\r\n            [/\"/, { token: 'string.quote', next: '@stringlit' }],\r\n            [/0[b]([01]_?)+/, 'number.binary'],\r\n            [/0[o]([0-7]_?)+/, 'number.octal'],\r\n            [/0[x]([0-9a-fA-F]_?)+([pP][\\-+](\\d_?)+)?/, 'number.hex'],\r\n            [/(\\d_?)*\\.(\\d_?)+([eE][\\-+]?(\\d_?)+)?/, 'number.float'],\r\n            [/(\\d_?)+/, 'number']\r\n        ],\r\n        stringlit: [\r\n            [/\\\\\\(/, { token: 'operator', next: '@interpolatedexpression' }],\r\n            [/@escapes/, 'string'],\r\n            [/\\\\./, 'string.escape.invalid'],\r\n            [/\"/, { token: 'string.quote', next: '@pop' }],\r\n            [/./, 'string']\r\n        ],\r\n        interpolatedexpression: [\r\n            [/\\(/, { token: 'operator', next: '@interpolatedexpression' }],\r\n            [/\\)/, { token: 'operator', next: '@pop' }],\r\n            { include: '@literal' },\r\n            { include: '@keyword' },\r\n            { include: '@symbol' }\r\n        ],\r\n        keyword: [\r\n            [/`/, { token: 'operator', next: '@escapedkeyword' }],\r\n            [/@identifier/, {\r\n                    cases: {\r\n                        '@keywords': 'keyword', '[A-Z][\\a-zA-Z0-9$]*': 'type.identifier',\r\n                        '@default': 'identifier'\r\n                    }\r\n                }]\r\n        ],\r\n        escapedkeyword: [\r\n            [/`/, { token: 'operator', next: '@pop' }],\r\n            [/./, 'identifier']\r\n        ],\r\n        //\t\tsymbol: [\r\n        //\t\t\t[ /@symbols/, 'operator' ],\r\n        //\t\t\t[ /@operators/, 'operator' ]\r\n        //\t\t],\r\n        invokedmethod: [\r\n            [/([.])(@identifier)/, {\r\n                    cases: {\r\n                        '$2': ['delimeter', 'type.identifier'],\r\n                        '@default': ''\r\n                    }\r\n                }],\r\n        ]\r\n    }\r\n};\r\n\n\n//# sourceURL=webpack:///./node_modules/monaco-editor/esm/vs/basic-languages/swift/swift.js?");

/***/ })

}]);