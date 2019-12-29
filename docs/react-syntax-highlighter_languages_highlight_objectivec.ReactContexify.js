(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["react-syntax-highlighter_languages_highlight_objectivec"],{

/***/ "./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/objectivec.js":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/objectivec.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function(hljs) {\n  var API_CLASS = {\n    className: 'built_in',\n    begin: '\\\\b(AV|CA|CF|CG|CI|CL|CM|CN|CT|MK|MP|MTK|MTL|NS|SCN|SK|UI|WK|XC)\\\\w+',\n  };\n  var OBJC_KEYWORDS = {\n    keyword:\n      'int float while char export sizeof typedef const struct for union ' +\n      'unsigned long volatile static bool mutable if do return goto void ' +\n      'enum else break extern asm case short default double register explicit ' +\n      'signed typename this switch continue wchar_t inline readonly assign ' +\n      'readwrite self @synchronized id typeof ' +\n      'nonatomic super unichar IBOutlet IBAction strong weak copy ' +\n      'in out inout bycopy byref oneway __strong __weak __block __autoreleasing ' +\n      '@private @protected @public @try @property @end @throw @catch @finally ' +\n      '@autoreleasepool @synthesize @dynamic @selector @optional @required ' +\n      '@encode @package @import @defs @compatibility_alias ' +\n      '__bridge __bridge_transfer __bridge_retained __bridge_retain ' +\n      '__covariant __contravariant __kindof ' +\n      '_Nonnull _Nullable _Null_unspecified ' +\n      '__FUNCTION__ __PRETTY_FUNCTION__ __attribute__ ' +\n      'getter setter retain unsafe_unretained ' +\n      'nonnull nullable null_unspecified null_resettable class instancetype ' +\n      'NS_DESIGNATED_INITIALIZER NS_UNAVAILABLE NS_REQUIRES_SUPER ' +\n      'NS_RETURNS_INNER_POINTER NS_INLINE NS_AVAILABLE NS_DEPRECATED ' +\n      'NS_ENUM NS_OPTIONS NS_SWIFT_UNAVAILABLE ' +\n      'NS_ASSUME_NONNULL_BEGIN NS_ASSUME_NONNULL_END ' +\n      'NS_REFINED_FOR_SWIFT NS_SWIFT_NAME NS_SWIFT_NOTHROW ' +\n      'NS_DURING NS_HANDLER NS_ENDHANDLER NS_VALUERETURN NS_VOIDRETURN',\n    literal:\n      'false true FALSE TRUE nil YES NO NULL',\n    built_in:\n      'BOOL dispatch_once_t dispatch_queue_t dispatch_sync dispatch_async dispatch_once'\n  };\n  var LEXEMES = /[a-zA-Z@][a-zA-Z0-9_]*/;\n  var CLASS_KEYWORDS = '@interface @class @protocol @implementation';\n  return {\n    aliases: ['mm', 'objc', 'obj-c'],\n    keywords: OBJC_KEYWORDS,\n    lexemes: LEXEMES,\n    illegal: '</',\n    contains: [\n      API_CLASS,\n      hljs.C_LINE_COMMENT_MODE,\n      hljs.C_BLOCK_COMMENT_MODE,\n      hljs.C_NUMBER_MODE,\n      hljs.QUOTE_STRING_MODE,\n      {\n        className: 'string',\n        variants: [\n          {\n            begin: '@\"', end: '\"',\n            illegal: '\\\\n',\n            contains: [hljs.BACKSLASH_ESCAPE]\n          },\n          {\n            begin: '\\'', end: '[^\\\\\\\\]\\'',\n            illegal: '[^\\\\\\\\][^\\']'\n          }\n        ]\n      },\n      {\n        className: 'meta',\n        begin: '#',\n        end: '$',\n        contains: [\n          {\n            className: 'meta-string',\n            variants: [\n              { begin: '\\\"', end: '\\\"' },\n              { begin: '<', end: '>' }\n            ]\n          }\n        ]\n      },\n      {\n        className: 'class',\n        begin: '(' + CLASS_KEYWORDS.split(' ').join('|') + ')\\\\b', end: '({|$)', excludeEnd: true,\n        keywords: CLASS_KEYWORDS, lexemes: LEXEMES,\n        contains: [\n          hljs.UNDERSCORE_TITLE_MODE\n        ]\n      },\n      {\n        begin: '\\\\.'+hljs.UNDERSCORE_IDENT_RE,\n        relevance: 0\n      }\n    ]\n  };\n};\n\n//# sourceURL=webpack:///./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/objectivec.js?");

/***/ })

}]);