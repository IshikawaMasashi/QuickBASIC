(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["react-syntax-highlighter_languages_highlight_jbossCli"],{

/***/ "./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/jboss-cli.js":
/*!****************************************************************************************************!*\
  !*** ./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/jboss-cli.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function (hljs) {\n  var PARAM = {\n    begin: /[\\w-]+ *=/, returnBegin: true,\n    relevance: 0,\n    contains: [{className: 'attr', begin: /[\\w-]+/}]\n  };\n  var PARAMSBLOCK = {\n    className: 'params',\n    begin: /\\(/,\n    end: /\\)/,\n    contains: [PARAM],\n    relevance : 0\n  };\n  var OPERATION = {\n    className: 'function',\n    begin: /:[\\w\\-.]+/,\n    relevance: 0\n  };\n  var PATH = {\n    className: 'string',\n    begin: /\\B(([\\/.])[\\w\\-.\\/=]+)+/,\n  };\n  var COMMAND_PARAMS = {\n    className: 'params',\n    begin: /--[\\w\\-=\\/]+/,\n  };\n  return {\n    aliases: ['wildfly-cli'],\n    lexemes: '[a-z\\-]+',\n    keywords: {\n      keyword: 'alias batch cd clear command connect connection-factory connection-info data-source deploy ' +\n      'deployment-info deployment-overlay echo echo-dmr help history if jdbc-driver-info jms-queue|20 jms-topic|20 ls ' +\n      'patch pwd quit read-attribute read-operation reload rollout-plan run-batch set shutdown try unalias ' +\n      'undeploy unset version xa-data-source', // module\n      literal: 'true false'\n    },\n    contains: [\n      hljs.HASH_COMMENT_MODE,\n      hljs.QUOTE_STRING_MODE,\n      COMMAND_PARAMS,\n      OPERATION,\n      PATH,\n      PARAMSBLOCK\n    ]\n  }\n};\n\n//# sourceURL=webpack:///./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/jboss-cli.js?");

/***/ })

}]);