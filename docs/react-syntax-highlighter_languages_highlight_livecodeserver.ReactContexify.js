(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["react-syntax-highlighter_languages_highlight_livecodeserver"],{

/***/ "./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/livecodeserver.js":
/*!*********************************************************************************************************!*\
  !*** ./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/livecodeserver.js ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function(hljs) {\n  var VARIABLE = {\n    begin: '\\\\b[gtps][A-Z]+[A-Za-z0-9_\\\\-]*\\\\b|\\\\$_[A-Z]+',\n    relevance: 0\n  };\n  var COMMENT_MODES = [\n    hljs.C_BLOCK_COMMENT_MODE,\n    hljs.HASH_COMMENT_MODE,\n    hljs.COMMENT('--', '$'),\n    hljs.COMMENT('[^:]//', '$')\n  ];\n  var TITLE1 = hljs.inherit(hljs.TITLE_MODE, {\n    variants: [\n      {begin: '\\\\b_*rig[A-Z]+[A-Za-z0-9_\\\\-]*'},\n      {begin: '\\\\b_[a-z0-9\\\\-]+'}\n    ]\n  });\n  var TITLE2 = hljs.inherit(hljs.TITLE_MODE, {begin: '\\\\b([A-Za-z0-9_\\\\-]+)\\\\b'});\n  return {\n    case_insensitive: false,\n    keywords: {\n      keyword:\n        '$_COOKIE $_FILES $_GET $_GET_BINARY $_GET_RAW $_POST $_POST_BINARY $_POST_RAW $_SESSION $_SERVER ' +\n        'codepoint codepoints segment segments codeunit codeunits sentence sentences trueWord trueWords paragraph ' +\n        'after byte bytes english the until http forever descending using line real8 with seventh ' +\n        'for stdout finally element word words fourth before black ninth sixth characters chars stderr ' +\n        'uInt1 uInt1s uInt2 uInt2s stdin string lines relative rel any fifth items from middle mid ' +\n        'at else of catch then third it file milliseconds seconds second secs sec int1 int1s int4 ' +\n        'int4s internet int2 int2s normal text item last long detailed effective uInt4 uInt4s repeat ' +\n        'end repeat URL in try into switch to words https token binfile each tenth as ticks tick ' +\n        'system real4 by dateItems without char character ascending eighth whole dateTime numeric short ' +\n        'first ftp integer abbreviated abbr abbrev private case while if ' +\n        'div mod wrap and or bitAnd bitNot bitOr bitXor among not in a an within ' +\n        'contains ends with begins the keys of keys',\n      literal:\n        'SIX TEN FORMFEED NINE ZERO NONE SPACE FOUR FALSE COLON CRLF PI COMMA ENDOFFILE EOF EIGHT FIVE ' +\n        'QUOTE EMPTY ONE TRUE RETURN CR LINEFEED RIGHT BACKSLASH NULL SEVEN TAB THREE TWO ' +\n        'six ten formfeed nine zero none space four false colon crlf pi comma endoffile eof eight five ' +\n        'quote empty one true return cr linefeed right backslash null seven tab three two ' +\n        'RIVERSION RISTATE FILE_READ_MODE FILE_WRITE_MODE FILE_WRITE_MODE DIR_WRITE_MODE FILE_READ_UMASK ' +\n        'FILE_WRITE_UMASK DIR_READ_UMASK DIR_WRITE_UMASK',\n      built_in:\n        'put abs acos aliasReference annuity arrayDecode arrayEncode asin atan atan2 average avg avgDev base64Decode ' +\n        'base64Encode baseConvert binaryDecode binaryEncode byteOffset byteToNum cachedURL cachedURLs charToNum ' +\n        'cipherNames codepointOffset codepointProperty codepointToNum codeunitOffset commandNames compound compress ' +\n        'constantNames cos date dateFormat decompress directories ' +\n        'diskSpace DNSServers exp exp1 exp2 exp10 extents files flushEvents folders format functionNames geometricMean global ' +\n        'globals hasMemory harmonicMean hostAddress hostAddressToName hostName hostNameToAddress isNumber ISOToMac itemOffset ' +\n        'keys len length libURLErrorData libUrlFormData libURLftpCommand libURLLastHTTPHeaders libURLLastRHHeaders ' +\n        'libUrlMultipartFormAddPart libUrlMultipartFormData libURLVersion lineOffset ln ln1 localNames log log2 log10 ' +\n        'longFilePath lower macToISO matchChunk matchText matrixMultiply max md5Digest median merge millisec ' +\n        'millisecs millisecond milliseconds min monthNames nativeCharToNum normalizeText num number numToByte numToChar ' +\n        'numToCodepoint numToNativeChar offset open openfiles openProcesses openProcessIDs openSockets ' +\n        'paragraphOffset paramCount param params peerAddress pendingMessages platform popStdDev populationStandardDeviation ' +\n        'populationVariance popVariance processID random randomBytes replaceText result revCreateXMLTree revCreateXMLTreeFromFile ' +\n        'revCurrentRecord revCurrentRecordIsFirst revCurrentRecordIsLast revDatabaseColumnCount revDatabaseColumnIsNull ' +\n        'revDatabaseColumnLengths revDatabaseColumnNames revDatabaseColumnNamed revDatabaseColumnNumbered ' +\n        'revDatabaseColumnTypes revDatabaseConnectResult revDatabaseCursors revDatabaseID revDatabaseTableNames ' +\n        'revDatabaseType revDataFromQuery revdb_closeCursor revdb_columnbynumber revdb_columncount revdb_columnisnull ' +\n        'revdb_columnlengths revdb_columnnames revdb_columntypes revdb_commit revdb_connect revdb_connections ' +\n        'revdb_connectionerr revdb_currentrecord revdb_cursorconnection revdb_cursorerr revdb_cursors revdb_dbtype ' +\n        'revdb_disconnect revdb_execute revdb_iseof revdb_isbof revdb_movefirst revdb_movelast revdb_movenext ' +\n        'revdb_moveprev revdb_query revdb_querylist revdb_recordcount revdb_rollback revdb_tablenames ' +\n        'revGetDatabaseDriverPath revNumberOfRecords revOpenDatabase revOpenDatabases revQueryDatabase ' +\n        'revQueryDatabaseBlob revQueryResult revQueryIsAtStart revQueryIsAtEnd revUnixFromMacPath revXMLAttribute ' +\n        'revXMLAttributes revXMLAttributeValues revXMLChildContents revXMLChildNames revXMLCreateTreeFromFileWithNamespaces ' +\n        'revXMLCreateTreeWithNamespaces revXMLDataFromXPathQuery revXMLEvaluateXPath revXMLFirstChild revXMLMatchingNode ' +\n        'revXMLNextSibling revXMLNodeContents revXMLNumberOfChildren revXMLParent revXMLPreviousSibling ' +\n        'revXMLRootNode revXMLRPC_CreateRequest revXMLRPC_Documents revXMLRPC_Error ' +\n        'revXMLRPC_GetHost revXMLRPC_GetMethod revXMLRPC_GetParam revXMLText revXMLRPC_Execute ' +\n        'revXMLRPC_GetParamCount revXMLRPC_GetParamNode revXMLRPC_GetParamType revXMLRPC_GetPath revXMLRPC_GetPort ' +\n        'revXMLRPC_GetProtocol revXMLRPC_GetRequest revXMLRPC_GetResponse revXMLRPC_GetSocket revXMLTree ' +\n        'revXMLTrees revXMLValidateDTD revZipDescribeItem revZipEnumerateItems revZipOpenArchives round sampVariance ' +\n        'sec secs seconds sentenceOffset sha1Digest shell shortFilePath sin specialFolderPath sqrt standardDeviation statRound ' +\n        'stdDev sum sysError systemVersion tan tempName textDecode textEncode tick ticks time to tokenOffset toLower toUpper ' +\n        'transpose truewordOffset trunc uniDecode uniEncode upper URLDecode URLEncode URLStatus uuid value variableNames ' +\n        'variance version waitDepth weekdayNames wordOffset xsltApplyStylesheet xsltApplyStylesheetFromFile xsltLoadStylesheet ' +\n        'xsltLoadStylesheetFromFile add breakpoint cancel clear local variable file word line folder directory URL close socket process ' +\n        'combine constant convert create new alias folder directory decrypt delete variable word line folder ' +\n        'directory URL dispatch divide do encrypt filter get include intersect kill libURLDownloadToFile ' +\n        'libURLFollowHttpRedirects libURLftpUpload libURLftpUploadFile libURLresetAll libUrlSetAuthCallback ' +\n        'libURLSetCustomHTTPHeaders libUrlSetExpect100 libURLSetFTPListCommand libURLSetFTPMode libURLSetFTPStopTime ' +\n        'libURLSetStatusCallback load multiply socket prepare process post seek rel relative read from process rename ' +\n        'replace require resetAll resolve revAddXMLNode revAppendXML revCloseCursor revCloseDatabase revCommitDatabase ' +\n        'revCopyFile revCopyFolder revCopyXMLNode revDeleteFolder revDeleteXMLNode revDeleteAllXMLTrees ' +\n        'revDeleteXMLTree revExecuteSQL revGoURL revInsertXMLNode revMoveFolder revMoveToFirstRecord revMoveToLastRecord ' +\n        'revMoveToNextRecord revMoveToPreviousRecord revMoveToRecord revMoveXMLNode revPutIntoXMLNode revRollBackDatabase ' +\n        'revSetDatabaseDriverPath revSetXMLAttribute revXMLRPC_AddParam revXMLRPC_DeleteAllDocuments revXMLAddDTD ' +\n        'revXMLRPC_Free revXMLRPC_FreeAll revXMLRPC_DeleteDocument revXMLRPC_DeleteParam revXMLRPC_SetHost ' +\n        'revXMLRPC_SetMethod revXMLRPC_SetPort revXMLRPC_SetProtocol revXMLRPC_SetSocket revZipAddItemWithData ' +\n        'revZipAddItemWithFile revZipAddUncompressedItemWithData revZipAddUncompressedItemWithFile revZipCancel ' +\n        'revZipCloseArchive revZipDeleteItem revZipExtractItemToFile revZipExtractItemToVariable revZipSetProgressCallback ' +\n        'revZipRenameItem revZipReplaceItemWithData revZipReplaceItemWithFile revZipOpenArchive send set sort split start stop ' +\n        'subtract union unload wait write'\n    },\n    contains: [\n      VARIABLE,\n      {\n        className: 'keyword',\n        begin: '\\\\bend\\\\sif\\\\b'\n      },\n      {\n        className: 'function',\n        beginKeywords: 'function', end: '$',\n        contains: [\n          VARIABLE,\n          TITLE2,\n          hljs.APOS_STRING_MODE,\n          hljs.QUOTE_STRING_MODE,\n          hljs.BINARY_NUMBER_MODE,\n          hljs.C_NUMBER_MODE,\n          TITLE1\n        ]\n      },\n      {\n        className: 'function',\n        begin: '\\\\bend\\\\s+', end: '$',\n        keywords: 'end',\n        contains: [\n          TITLE2,\n          TITLE1\n        ],\n        relevance: 0\n      },\n      {\n        beginKeywords: 'command on', end: '$',\n        contains: [\n          VARIABLE,\n          TITLE2,\n          hljs.APOS_STRING_MODE,\n          hljs.QUOTE_STRING_MODE,\n          hljs.BINARY_NUMBER_MODE,\n          hljs.C_NUMBER_MODE,\n          TITLE1\n        ]\n      },\n      {\n        className: 'meta',\n        variants: [\n          {\n            begin: '<\\\\?(rev|lc|livecode)',\n            relevance: 10\n          },\n          { begin: '<\\\\?' },\n          { begin: '\\\\?>' }\n        ]\n      },\n      hljs.APOS_STRING_MODE,\n      hljs.QUOTE_STRING_MODE,\n      hljs.BINARY_NUMBER_MODE,\n      hljs.C_NUMBER_MODE,\n      TITLE1\n    ].concat(COMMENT_MODES),\n    illegal: ';$|^\\\\[|^=|&|{'\n  };\n};\n\n//# sourceURL=webpack:///./node_modules/react-syntax-highlighter/node_modules/highlight.js/lib/languages/livecodeserver.js?");

/***/ })

}]);