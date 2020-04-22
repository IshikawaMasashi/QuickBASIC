(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[6],{

/***/ "./node_modules/monaco-editor/esm/vs/basic-languages/abap/abap.js":
/*!************************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/basic-languages/abap/abap.js ***!
  \************************************************************************/
/*! exports provided: conf, language */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"conf\", function() { return conf; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"language\", function() { return language; });\n/*---------------------------------------------------------------------------------------------\r\n *  Copyright (c) Microsoft Corporation. All rights reserved.\r\n *  Licensed under the MIT License. See License.txt in the project root for license information.\r\n *--------------------------------------------------------------------------------------------*/\r\n\r\nvar conf = {\r\n    comments: {\r\n        lineComment: '*',\r\n    },\r\n    brackets: [\r\n        ['[', ']'],\r\n        ['(', ')']\r\n    ],\r\n};\r\nvar abapKeywords = [\r\n    'abstract', 'add', 'add-corresponding', 'adjacent', 'alias', 'aliases', 'all', 'append', 'appending', 'ascending', 'as', 'assert', 'assign', 'assigned', 'assigning', 'association', 'authority-check',\r\n    'back', 'begin', 'binary', 'block', 'bound', 'break-point', 'by', 'byte',\r\n    'class', 'call', 'cast', 'changing', 'check', 'class-data', 'class-method', 'class-methods', 'clear', 'close', 'cnt', 'collect', 'commit', 'cond', 'character',\r\n    'corresponding', 'communication', 'component', 'compute', 'concatenate', 'condense', 'constants', 'conv', 'count',\r\n    'controls', 'convert', 'create', 'currency',\r\n    'data', 'descending', 'default', 'define', 'deferred', 'delete', 'describe', 'detail', 'display', 'divide', 'divide-corresponding', 'display-mode', 'duplicates',\r\n    'deleting',\r\n    'editor-call', 'end', 'endexec', 'endfunction', 'ending', 'endmodule', 'end-of-definition', 'end-of-page', 'end-of-selection', 'end-test-injection', 'end-test-seam', 'exit-command', 'endclass', 'endmethod', 'endform', 'endinterface',\r\n    'endprovide', 'endselect', 'endtry', 'endwhile', 'enum', 'event', 'events', 'exec', 'exit', 'export',\r\n    'exporting', 'extract', 'exception', 'exceptions',\r\n    'field-symbols', 'field-groups', 'field', 'first', 'fetch', 'fields', 'format', 'frame', 'free', 'from', 'function', 'find', 'for', 'found', 'function-pool',\r\n    'generate', 'get',\r\n    'handle', 'hide', 'hashed',\r\n    'include', 'import', 'importing', 'index', 'infotypes', 'initial', 'initialization',\r\n    'id', 'is', 'in', 'interface', 'interfaces', 'init', 'input', 'insert', 'instance', 'into',\r\n    'key',\r\n    'left-justified', 'leave', 'like', 'line', 'line-count', 'line-size', 'load', 'local', 'log-point', 'length', 'left', 'leading', 'lower',\r\n    'matchcode', 'method', 'mesh', 'message', 'message-id', 'methods', 'modify', 'module', 'move', 'move-corresponding', 'multiply', 'multiply-corresponding', 'match',\r\n    'new', 'new-line', 'new-page', 'new-section', 'next', 'no', 'no-gap', 'no-gaps', 'no-sign', 'no-zero', 'non-unique', 'number',\r\n    'occurrence', 'object', 'obligatory', 'of', 'output', 'overlay', 'optional', 'others', 'occurrences', 'occurs', 'offset', 'options',\r\n    'pack', 'parameters', 'perform', 'places', 'position', 'print-control', 'private', 'program', 'protected', 'provide', 'public', 'put',\r\n    'radiobutton', 'raising', 'ranges', 'receive', 'receiving', 'redefinition', 'reduce', 'reference', 'refresh', 'regex', 'reject', 'results', 'requested',\r\n    'ref', 'replace', 'report', 'reserve', 'restore', 'result', 'return', 'returning', 'right-justified', 'rollback', 'read', 'read-only', 'rp-provide-from-last', 'run',\r\n    'scan', 'screen', 'scroll', 'search', 'select', 'select-options', 'selection-screen', 'stamp', 'source', 'subkey',\r\n    'separated', 'set', 'shift', 'single', 'skip', 'sort', 'sorted', 'split', 'standard', 'stamp', 'starting', 'start-of-selection', 'sum', 'subtract-corresponding', 'statics', 'step', 'stop', 'structure', 'submatches', 'submit', 'subtract', 'summary', 'supplied', 'suppress', 'section', 'syntax-check', 'syntax-trace', 'system-call', 'switch',\r\n    'tables', 'table', 'task', 'testing', 'test-seam', 'test-injection', 'then', 'time', 'times', 'title', 'titlebar', 'to', 'top-of-page', 'trailing', 'transfer', 'transformation', 'translate', 'transporting', 'types', 'type', 'type-pool', 'type-pools',\r\n    'unassign', 'unique', 'uline', 'unpack', 'update', 'upper', 'using',\r\n    'value',\r\n    'when', 'while', 'window', 'write', 'where', 'with', 'work',\r\n    'at', 'case', 'catch', 'continue', 'do', 'elseif', 'else', 'endat', 'endcase', 'enddo', 'endif', 'endloop', 'endon', 'if', 'loop', 'on', 'raise', 'try',\r\n    'abs', 'sign', 'ceil', 'floor', 'trunc', 'frac', 'acos', 'asin', 'atan', 'cos', 'sin', 'tan', 'cosh', 'sinh', 'tanh', 'exp', 'log', 'log10', 'sqrt', 'strlen', 'xstrlen', 'charlen', 'lines', 'numofchar', 'dbmaxlen', 'round', 'rescale', 'nmax', 'nmin', 'cmax', 'cmin', 'boolc', 'boolx', 'xsdbool', 'contains', 'contains_any_of', 'contains_any_not_of', 'matches', 'line_exists', 'ipow', 'char_off', 'count', 'count_any_of', 'count_any_not_of', 'distance', 'condense', 'concat_lines_of', 'escape', 'find', 'find_end', 'find_any_of', 'find_any_not_of', 'insert', 'match', 'repeat', 'replace', 'reverse', 'segment', 'shift_left', 'shift_right', 'substring', 'substring_after', 'substring_from', 'substring_before', 'substring_to', 'to_upper', 'to_lower', 'to_mixed', 'from_mixed', 'translate', 'bit-set', 'line_index',\r\n    'definition', 'implementation', 'public', 'inheriting', 'final'\r\n];\r\nvar language = {\r\n    defaultToken: 'invalid',\r\n    ignoreCase: true,\r\n    tokenPostfix: '.abap',\r\n    keywords: abapKeywords,\r\n    typeKeywords: [\r\n        'abap_bool', 'string', 'xstring', 'any', 'clike', 'csequence', 'numeric',\r\n        'xsequence', 'c', 'n', 'i', 'p', 'f', 'd', 't', 'x'\r\n    ],\r\n    operators: [\r\n        '+', '-', '/', '*',\r\n        '=', '<', '>', '<=', '>=', '<>', '><', '=<', '=>',\r\n        'EQ', 'NE', 'GE', 'LE',\r\n        'CS', 'CN', 'CA', 'CO', 'CP', 'NS', 'NA', 'NP',\r\n    ],\r\n    symbols: /[=><!~?&+\\-*\\/\\^%]+/,\r\n    tokenizer: {\r\n        root: [\r\n            [/[a-z_$][\\w$]*/, { cases: { '@typeKeywords': 'keyword',\r\n                        '@keywords': 'keyword',\r\n                        '@default': 'identifier' } }],\r\n            { include: '@whitespace' },\r\n            [/[:,.]/, 'delimiter'],\r\n            [/[{}()\\[\\]]/, '@brackets'],\r\n            [/@symbols/, { cases: { '@operators': 'operator',\r\n                        '@default': '' } }],\r\n            [/'/, { token: 'string', bracket: '@open', next: '@stringquote' }],\r\n            [/\\|/, { token: 'string', bracket: '@open', next: '@stringtemplate' }],\r\n            [/\\d+/, 'number'],\r\n        ],\r\n        stringtemplate: [\r\n            [/[^\\\\\\|]+/, 'string'],\r\n            [/\\\\\\|/, 'string'],\r\n            [/\\|/, { token: 'string', bracket: '@close', next: '@pop' }]\r\n        ],\r\n        stringquote: [\r\n            [/[^\\\\']+/, 'string'],\r\n            [/'/, { token: 'string', bracket: '@close', next: '@pop' }]\r\n        ],\r\n        whitespace: [\r\n            [/[ \\t\\r\\n]+/, ''],\r\n            [/^\\*.*$/, 'comment'],\r\n            [/\\\".*$/, 'comment'],\r\n        ],\r\n    },\r\n};\r\n\n\n//# sourceURL=webpack:///./node_modules/monaco-editor/esm/vs/basic-languages/abap/abap.js?");

/***/ })

}]);