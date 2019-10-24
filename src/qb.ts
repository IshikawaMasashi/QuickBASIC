import { Location, RuleParser } from 'earley';
import EarleyParser from 'earley';

import { AstDeclareFunction } from './node/AstDeclareFunction';
import { AstArgument } from './node/AstArgument';
import { AstEndStatement } from './node/AstEndStatement';
import { AstNullStatement } from './node/AstNullStatement';
import { AstAssignStatement } from './node/AstAssignStatement';
import { AstBinaryOp } from './node/AstBinaryOp';
import { AstCallStatement } from './node/AstCallStatement';
import { AstCaseStatement } from './node/AstCaseStatement';
import { AstConstStatement } from './node/AstConstStatement';
import { AstExitStatement } from './node/AstExitStatement';
import { AstConstantExpr } from './node/AstConstantExpr';
import { AstGosubStatement } from './node/AstGosubStatement';
import { AstGotoStatement } from './node/AstGotoStatement';
import { AstInputStatement } from './node/AstInputStatement';
import { AstPrintItem } from './node/AstPrintItem';
import { AstLabel } from './node/AstLabel';
import { AstDoStatement } from './node/AstDoStatement';
import { AstTypeMember } from './node/AstTypeMember';
import { AstNextStatement } from './node/AstNextStatement';
import { AstDataStatement } from './node/AstDataStatement';
import { AstForLoop } from './node/AstForLoop';
import { AstIfStatement } from './node/AstIfStatement';
import { AstMemberDeref } from './node/AstMemberDeref';
import { AstPrintStatement } from './node/AstPrintStatement';
import { AstPrintUsingStatement } from './node/AstPrintUsingStatement';
import { AstReturnStatement } from './node/AstReturnStatement';
import { AstSelectStatement } from './node/AstSelectStatement';
import { AstSubroutine } from './node/AstSubroutine';
import { AstUnaryOperator } from './node/AstUnaryOperator';
import { AstVariableReference } from './node/AstVariableReference';
import { AstWhileLoop } from './node/AstWhileLoop';
import { AstRange } from './node/AstRange';
import { AstDimStatement } from './node/AstDimStatement';
import { AstProgram } from './node/AstProgram';
import { AstDefTypeStatement } from './node/AstDefTypeStatement';
import { AstRestoreStatement } from './node/AstRestoreStatement';
import { AstUserType } from './node/AstUserType';
import { AstArrayDeref } from './node/AstArrayDeref';

import { VirtualMachine } from './virtualMachine/VirtualMachine';
import { Instruction } from './virtualMachine/instructions/instruction';
import { CodeGenerator } from './CodeGenerator';

// import { RuleParser } from "./RuleParser";
import { _Console } from './Console';
import { TypeChecker } from './TypeChecker';
// import { Locus } from "./Locus";
import { UserType } from './UserType';
import { DebugConsole } from './DebugConsole';
// import { Editor } from "./Editor";
import { Type } from './types/Type';
import { ArrayType } from './types/ArrayType';
import { NullType } from './types/NullType';
import { IStringDictionary } from './base/common/collections';
import { AstOpenStatement } from './node/AstOpenStatement';
// import { number } from "prop-types";

// import { selectBasicCodeTab } from "../Tabs/Tabs";
// import { FileMenu } from "../Menu/FileMenu";
// import { EditMenu } from "../Menu/EditMenu";
// import { HelpMenu } from "../Menu/HelpMenu";
// new FileMenu(document.getElementById("file-menu")!, document.getElementById("file-menu-backdrop")!, document.getElementById("file-menu-list")!);
// new EditMenu(document.getElementById("edit-menu")!, document.getElementById("edit-menu-backdrop")!, document.getElementById("edit-menu-list")!);
// new HelpMenu(document.getElementById("help-menu")!, document.getElementById("help-menu-backdrop")!, document.getElementById("help-menu-list")!);

export function sprintf(...args: any[]) {
  // var args = arguments;
  if (args.length == 1 && args[0] instanceof Array) {
    args = args[0];
  }
  const format = args[0];
  let output = '';

  const segments = format.split(/%[^%]/);
  for (let i = 0; i < segments.length; i++) {
    output += segments[i];
    if (args[i + 1] !== undefined) {
      output += args[i + 1];
    }
  }

  return output;
}

// export var globalConsole: _Console;

/**
    Copyright 2010 Steve Hanov

    This file is part of qb.js

    qb.js is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    qb.js is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with qb.js.  If not, see <http://www.gnu.org/licenses/>.
*/
//#include <debug.js>

export function DeriveTypeNameFromVariable(name: string) {
  switch (name[name.length - 1]) {
    case '$':
      return 'STRING';
    case '%':
      return 'INTEGER';
    case '&':
      return 'LONG';
    case '#':
      return 'DOUBLE';
    case '!':
      return 'SINGLE';
  }
  return null; // Must use default type from DEFINT or single.
}

export function IsNumericType(type: Type) {
  return (
    type.name == 'INTEGER' || type.name == 'SINGLE' || type.name == 'DOUBLE'
  );
}

export function IsStringType(type: Type) {
  return type.name == 'STRING';
}

export function IsArrayType(type: Type) {
  return type instanceof ArrayType;
}

export function IsUserType(type: Type) {
  return type instanceof UserType;
}

export function IsNullType(type: Type) {
  return type instanceof NullType;
}

export function AreTypesCompatible(type1: Type, type2: Type) {
  return (
    type1.name == type2.name ||
    (IsNumericType(type1) && IsNumericType(type2)) ||
    (IsArrayType(type1) &&
      IsArrayType(type2) &&
      ((<any>type1).elementType.name == 'ANY' ||
        (<any>type2).elementType.name == 'ANY')) ||
    (!IsArrayType(type1) &&
      !IsArrayType(type2) &&
      (type1.name == 'ANY' || type2.name == 'ANY'))
  );
}

/**
    Copyright 2010 Steve Hanov

    This file is part of qb.js

    qb.js is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    qb.js is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with qb.js.  If not, see <http://www.gnu.org/licenses/>.
*/
//#include <debug.js>
//#include <RuleParser.js>
//#include <TypeChecker.js>
//#include <CodeGenerator.js>
//#include <EarleyParser.js>
(<any>Array.prototype).accept = function(
  visitor: any // You didn't see that.
) {
  for (let i = 0; i < this.length; i++) {
    if (!this[i]) {
      continue;
    }
    this[i].accept(visitor);
  }
};

function onProgram(symbols: any, location: Location) {
  const program = new AstProgram(
    location,
    new AstSubroutine(location, '_main', [], symbols[0], false)
  );
  dbg.printf(
    'Program successfully parsed. %d statements.\n',
    program.subs[0].statements.length
  );
  return program;
}

function onNumber(symbols: any, location: Location) {
  return new AstConstantExpr(location, parseFloat(symbols[0]));
}

function onString(symbols: any, location: Location) {
  return new AstConstantExpr(
    location,
    symbols[0].substr(1, symbols[0].length - 2)
  );
}

function onBinaryOp(symbols: any, location: Location) {
  return new AstBinaryOp(location, symbols[0], symbols[1], symbols[2]);
}

//function onParamListInBrackets(symbols: any, _locus: Locus) {
//    return symbols[1];
//}

function onBracketExpr(symbols: any, _location: Location) {
  return symbols[1];
}

function UseSecond<T>(args: T[]) {
  return args[1];
}

function UseFirst(args: string[]) {
  return args[0];
}

function JoinListsLR(args: any) {
  args[0].push(args[1]);
  return args[0];
}

function JoinLists<T>(args: [T, T[]]) {
  args[1].unshift(args[0]);
  return args[1];
}

function EmptyList<T>(_args: T[]): T[] {
  return [];
}

/** @constructor */
export class QBasicProgram {
  public data: any;
  public defaultType: Type;
  public errors: string[] = [];
  public instructions: Instruction[];
  public lineMap: Location[];
  public shared: any;
  public sourcecode: string;
  public types: IStringDictionary<Type>;
  readonly callMap = new Map<number, { name: string; location: Location }>();
  readonly codeGenerator: CodeGenerator;
  static parser: EarleyParser; // = null;
  private breakpoints: number[] = [];
  private byteCode: string;
  constructor(input: any, public testMode?: any) {
    // this.errors = [];
    // this.testMode = testMode;

    // Create the parser if one doesn't already exist.
    if (QBasicProgram.parser === undefined) {
      const rules = new RuleParser(dbg);
      rules.addRule('start: program');
      rules.addToken('AND', 'AND');
      rules.addToken('AS', 'AS');
      rules.addToken('CASE', 'CASE');
      rules.addToken('CONST', 'CONST');
      rules.addToken('DATA', 'DATA');
      rules.addToken('DECLARE', 'DECLARE');
      rules.addToken('DEF', 'DEF');
      rules.addToken('DEFINT', 'DEFINT');
      rules.addToken('DIM', 'DIM');
      rules.addToken('DO', 'DO');
      rules.addToken('ELSE', 'ELSE');
      rules.addToken('END', 'END');
      rules.addToken('EXIT', 'EXIT');
      rules.addToken('FOR', 'FOR');
      rules.addToken('FUNCTION', 'FUNCTION');
      rules.addToken('GOSUB', 'GOSUB');
      rules.addToken('GOTO', 'GOTO');
      rules.addToken('IF', 'IF');
      rules.addToken('INPUT', 'INPUT');
      rules.addToken('LINE', 'LINE');
      rules.addToken('LOOP', 'LOOP');
      rules.addToken('MOD', 'MOD');
      rules.addToken('NEXT', 'NEXT');
      rules.addToken('NOT', 'NOT');
      rules.addToken('OR', 'OR');
      rules.addToken('POKE', 'POKE');
      rules.addToken('PRINT', 'PRINT');
      rules.addToken('RESTORE', 'RESTORE');
      rules.addToken('RETURN', 'RETURN');
      rules.addToken('SEG', 'SEG');
      rules.addToken('SELECT', 'SELECT');
      rules.addToken('SHARED', 'SHARED');
      rules.addToken('STATIC', 'STATIC');
      rules.addToken('STEP', 'STEP');
      rules.addToken('SUB', 'SUB');
      rules.addToken('TAB', 'TAB');
      rules.addToken('THEN', 'THEN');
      rules.addToken('TO', 'TO');
      rules.addToken('TYPE', 'TYPE');
      rules.addToken('UNTIL', 'UNTIL');
      rules.addToken('USING', 'USING');
      rules.addToken('VIEW', 'VIEW');
      rules.addToken('WEND', 'WEND');
      rules.addToken('WHILE', 'WHILE');

      rules.addToken('OPEN', 'OPEN');
      rules.addToken('OUTPUT', 'OUTPUT');

      rules.addToken('minus', '\\-');
      rules.addToken('endl', '\\n');
      rules.addToken('comment', "'.*$");
      // rules.addToken("comment", "REM .*$");
      rules.addToken('hexconstant', '\\&H\\d+');
      rules.addToken('floatconstant', '\\d*\\.\\d+');
      // rules.addToken("intconstant", "-?\\d+");
      rules.addToken('intconstant', '\\d+');
      rules.addToken('stringconstant', '"[^"]*"');
      rules.addToken('label', '^([a-zA-Z][a-zA-Z0-9_]*:|\\d+)');
      rules.addToken('identifier', '[a-zA-Z_][a-zA-Z0-9_]*(\\$|%|#|&|!)?');

      rules.addToken('filenumber', '\\#\\d+');
      // rules.addToken("space", "\\s");

      rules.addRule('program: statements', onProgram);
      rules.addRule('statements: statement*');
      //rules.addRule( "statement: intconstant istatement separator" );
      rules.addRule('statement: label istatement separator', function(
        args: string[],
        location: Location
      ) {
        let label = args[0];
        if (label.substr(-1) == ':') {
          label = label.substr(0, label.length - 1);
        }
        return [new AstLabel(location, label), args[1]];
      });
      rules.addRule('statement: label', function(
        args: string[],
        location: Location
      ) {
        let label = args[0];
        if (label.substr(-1) == ':') {
          label = label.substr(0, label.length - 1);
        }
        return new AstLabel(location, label);
      });

      rules.addRule('statement: istatement ? separator');
      rules.addRule("istatement: CONST identifier '=' expr", function(
        args: any,
        location: Location
      ) {
        return new AstConstStatement(location, args[1], args[3]);
      });
      rules.addRule('istatement: DECLARE FUNCTION identifier ArgList', function(
        args: any,
        location: Location
      ) {
        return new AstDeclareFunction(location, args[2], args[3], true);
      });
      rules.addRule('istatement: DECLARE SUB identifier ArgList', function(
        args: any,
        location: Location
      ) {
        return new AstDeclareFunction(location, args[2], args[3], false);
      });
      rules.addRule(
        'istatement: SUB identifier ArgList STATIC? statements END SUB',
        function(args: any, location: Location) {
          return new AstSubroutine(
            location,
            args[1],
            args[2],
            args[4],
            false,
            args[3] !== null
          );
        }
      );
      rules.addRule(
        'istatement: FUNCTION identifier ArgList statements END FUNCTION',
        function(symbols: any, location: Location) {
          return new AstSubroutine(
            location,
            symbols[1],
            symbols[2],
            symbols[3],
            true
          );
        }
      );
      rules.addRule("istatement: DEF SEG ('=' expr)?", function(
        args: any,
        location: Location
      ) {
        return new AstNullStatement(location);
      });
      rules.addRule("istatement: DEF identifier ArgList '=' expr", function(
        args: any,
        location: Location
      ) {
        return new AstNullStatement(location);
      });
      rules.addRule('istatement: DEFINT identifier minus identifier', function(
        args: any,
        location: Location
      ) {
        // TODO: Implement completely
        return new AstDefTypeStatement(location, 'INTEGER');
      });
      rules.addRule('istatement: VIEW PRINT', function(
        args: any,
        location: Location
      ) {
        return new AstNullStatement(location);
      });
      rules.addRule('istatement: DIM DimList', UseSecond);
      rules.addRule('istatement: DIM SHARED DimList', function(
        args: any,
        location: Location
      ) {
        for (let i = 0; i < args[2].length; i++) {
          args[2][i].shared = true;
        }
        return args[2];
      });
      rules.addRule(
        'istatement: WHILE expr separator statements WEND',
        function(args: string[], location: Location) {
          return new AstWhileLoop(location, args[1], args[3]);
        }
      );
      rules.addRule('istatement: DO separator statements LOOP', function(
        args: any,
        location: Location
      ) {
        return new AstDoStatement(
          location,
          args[2],
          null,
          AstDoStatement.INFINITE
        );
      });
      rules.addRule(
        'istatement: DO separator statements LOOP WHILE expr',
        function(args: any, location: Location) {
          return new AstDoStatement(
            location,
            args[2],
            args[5],
            AstDoStatement.WHILE_AT_END
          );
        }
      );
      rules.addRule(
        'istatement: DO separator statements LOOP UNTIL expr',
        function(args: any, location: Location) {
          return new AstDoStatement(
            location,
            args[2],
            args[5],
            AstDoStatement.UNTIL
          );
        }
      );
      rules.addRule(
        'istatement: DO WHILE expr separator statements LOOP',
        function(args: any, location: Location) {
          return new AstWhileLoop(location, args[2], args[4]);
        }
      );
      rules.addRule("istatement: FOR identifier '=' expr TO expr", function(
        args: any,
        location: Location
      ) {
        return new AstForLoop(
          location,
          args[1],
          args[3],
          args[5],
          new AstConstantExpr(location, 1)
        );
      });
      rules.addRule(
        "istatement: FOR identifier '=' expr TO expr STEP expr",
        function(args: any, location: Location) {
          return new AstForLoop(location, args[1], args[3], args[5], args[7]);
        }
      );
      rules.addRule('istatement: NEXT identifiers?', function(
        args: any,
        location: Location
      ) {
        if (args[1] === null) {
          args[1] = [];
        }
        return new AstNextStatement(location, args[1]);
      });
      rules.addRule('istatement: EXIT (FOR|DO)', function(
        args: any,
        location: Location
      ) {
        return new AstExitStatement(location, args[1]);
      });
      rules.addRule('identifiers: MoreIdentifiers* identifier', JoinListsLR);
      rules.addRule("MoreIdentifiers: identifier ','", UseFirst);
      rules.addRule('istatement: END', function(
        _args: string[],
        location: Location
      ) {
        return new AstEndStatement(location);
      });
      rules.addRule('istatement: GOSUB identifier', function(
        args: any,
        location: Location
      ) {
        return new AstGosubStatement(location, args[1]);
      });
      rules.addRule('istatement: GOTO identifier', function(
        args: any,
        location: Location
      ) {
        return new AstGotoStatement(location, args[1]);
      });
      rules.addRule('istatement: IF expr THEN istatement', function(
        args: any,
        location: Location
      ) {
        return new AstIfStatement(location, args[1], args[3], null);
      });
      rules.addRule(
        'istatement: IF expr THEN separator statements ElseClause END IF',
        function(args: any, location: Location) {
          return new AstIfStatement(location, args[1], args[4], args[5]);
        }
      );
      rules.addRule(
        'ElseClause: ELSE IF expr THEN separator statements ElseClause',
        function(args: any, location: Location) {
          return new AstIfStatement(location, args[2], args[5], args[6]);
        }
      );

      rules.addRule('ElseClause: ELSE statements', UseSecond);

      rules.addRule('ElseClause:', function(args: any, location: Location) {
        return new AstNullStatement(location);
      });
      rules.addRule(
        'istatement: SELECT CASE expr separator case* END SELECT',
        function(args: any, location: Location) {
          return new AstSelectStatement(location, args[2], args[4]);
        }
      );

      rules.addRule('case: CASE exprList separator statements', function(
        args: any,
        location: Location
      ) {
        return new AstCaseStatement(location, args[1], args[3]);
      });

      rules.addRule('case: CASE ELSE separator statements', function(
        args: any,
        location: Location
      ) {
        return new AstCaseStatement(location, [], args[3]);
      });

      rules.addRule('exprList: moreExpr* expr', JoinListsLR);

      rules.addRule("moreExpr: expr ','", UseFirst);

      rules.addRule(
        "istatement: INPUT constant? (';'|',') identifiers",
        function(args: any, location: Location) {
          return new AstInputStatement(
            location,
            args[1],
            args[2] == ';',
            args[3]
          );
        }
      );

      rules.addRule(
        "istatement: LINE? INPUT filenumber (';'|',') Reference",
        // (args: any, locus: Locus) => new AstInputStatement(locus, args[1], args[2] == ';', args[3])
        (args: any, location: Location) =>
          new AstInputStatement(
            location,
            args[2],
            args[3] == ';',
            args[4],
            !!args[0]
          )
      );

      rules.addRule(
        "istatement: PRINT filenumber (';'|',') PrintItems",
        (args: any, location: Location) =>
          new AstPrintStatement(location, args[3], args[1])
      );

      rules.addRule('istatement: LINE? INPUT identifiers', function(
        args: any,
        location: Location
      ) {
        return new AstInputStatement(location, null, false, args[2]);
      });
      rules.addRule("istatement: POKE expr ',' expr", function(
        _args: any,
        location: Location
      ) {
        return new AstNullStatement(location);
      });

      rules.addRule(
        "istatement: OPEN expr FOR ('INPUT'|'OUTPUT') AS filenumber",
        (args: any, location: Location) =>
          new AstOpenStatement(location, args[1], args[3], args[5])
      );

      rules.addRule('istatement: PRINT', function(
        args: any,
        location: Location
      ) {
        return new AstPrintStatement(location, []);
      });
      rules.addRule('istatement: PRINT PrintItems', function(
        args: any,
        location: Location
      ) {
        return new AstPrintStatement(location, args[1]);
      });
      rules.addRule("istatement: PRINT USING [expr,';'] (';'|',')?", function(
        args: any,
        location: Location
      ) {
        return new AstPrintUsingStatement(location, args[2], args[3]);
      });
      rules.addRule('PrintItems: PrintItem', function(
        args: any,
        _location: Location
      ) {
        return args;
      });
      rules.addRule(
        "PrintItems: MorePrintItems* PrintItem (';'|',')?",
        function(args: any, _location: Location) {
          args[1].terminator = args[2];
          args[0].push(args[1]);
          return args[0];
        }
      );
      rules.addRule("MorePrintItems: PrintItem (';'|',')", function(
        args: any,
        location: Location
      ) {
        args[0].terminator = args[1];
        return args[0];
      });

      rules.addRule('PrintItem: expr', function(args: any, location: Location) {
        return new AstPrintItem(location, AstPrintItem.EXPR, args[0], null);
      });

      rules.addRule("PrintItem: TAB '\\(' expr '\\)'", function(
        args: any,
        location: Location
      ) {
        return new AstPrintItem(location, AstPrintItem.TAB, args[2], null);
      });

      rules.addRule('PrintItem:', function(args: any, location: Location) {
        return new AstPrintItem(location, AstPrintItem.EXPR, null, null);
      });

      // rules.addRule(
      //   "PrintItem: filenumber",
      //   (args: any, locus: Locus) =>
      //     new AstPrintItem(locus, AstPrintItem.EXPR, args[0], null)
      // );

      rules.addRule('istatement: RESTORE identifier?', function(
        args: any,
        location: Location
      ) {
        return new AstRestoreStatement(location, args[1]);
      });
      rules.addRule('istatement: RETURN', function(
        args: any,
        location: Location
      ) {
        return new AstReturnStatement(location);
      });
      rules.addRule("istatement: DATA [DataConstant,',']", function(
        args: any,
        location: Location
      ) {
        return new AstDataStatement(location, args[1]);
      });
      rules.addRule('DataConstant: identifier', function(
        args: any,
        location: Location
      ) {
        return new AstConstantExpr(location, args[0]);
      });
      rules.addRule('DataConstant: constant');
      rules.addRule('DataConstant:', function(args: any, location: Location) {
        return new AstConstantExpr(location, null);
      });
      rules.addRule(
        'istatement: TYPE identifier separator TypeMembers END TYPE',
        function(args: any, location: Location) {
          return new AstUserType(location, args[1], args[3]);
        }
      );
      rules.addRule('istatement: AssignStatement');
      rules.addRule("AssignStatement: ReferenceList '=' expr2", function(
        args: any,
        location: Location
      ) {
        return new AstAssignStatement(location, args[0], args[2]);
      });
      rules.addRule('istatement: identifier Parameters', function(
        args: any,
        location: Location
      ) {
        return new AstCallStatement(location, args[0], args[1]);
      });
      rules.addRule('Parameters: ', EmptyList);
      rules.addRule("Parameters: '\\(' ParameterList '\\)'", UseSecond);
      rules.addRule('Parameters: ParameterList');
      rules.addRule("ParameterList: [Parameter,',']");
      rules.addRule('Parameter: expr');
      rules.addRule('Parameter:', function(args: any, location: Location) {
        return new AstConstantExpr(location, null);
      });

      rules.addRule(
        'Parameter: filenumber',
        (args: any, location: Location) =>
          new AstConstantExpr(location, args[0])
      );

      rules.addRule('DimList: Dim MoreDims*', JoinLists);
      rules.addRule("MoreDims: ',' Dim", UseSecond);
      rules.addRule('Dim: identifier AsType?', function(
        args: any,
        location: Location
      ) {
        return new AstDimStatement(location, args[0], [], args[1]);
      });
      rules.addRule("Dim: identifier '\\(' RangeList '\\)' AsType?", function(
        args: any,
        location: Location
      ) {
        return new AstDimStatement(location, args[0], args[2], args[4]);
      });
      rules.addRule('AsType: AS identifier', UseSecond);
      rules.addRule('RangeList:', function(
        args: any,
        _location: Location
      ): any {
        return null;
      });
      rules.addRule('RangeList: Range MoreRanges*', JoinLists);
      rules.addRule("MoreRanges: ',' Range", UseSecond);
      rules.addRule('Range: expr EndRange?', function(
        symbols: any,
        location: Location
      ) {
        if (symbols[1]) {
          return new AstRange(location, symbols[0], symbols[1]);
        } else {
          return new AstRange(
            location,
            new AstConstantExpr(location, 0),
            symbols[0]
          );
        }
      });
      rules.addRule('EndRange: TO expr', UseSecond);
      rules.addRule('TypeMembers: TypeMember*');
      rules.addRule('TypeMember: identifier AS identifier separator', function(
        args: any,
        location: Location
      ) {
        return new AstTypeMember(location, args[0], args[2]);
      });
      rules.addRule('ArgList:', function(_args: any, _location: Location): any {
        return [];
      });
      rules.addRule("ArgList: '\\(' [ Argument , ',' ] '\\)'", function(
        args: any,
        _location: Location
      ) {
        return args[1];
      });
      rules.addRule('Argument: identifier OptParen? AS identifier', function(
        args: any,
        location: Location
      ) {
        return new AstArgument(location, args[0], args[3], args[1] !== null);
      });
      rules.addRule('Argument: identifier OptParen?', function(
        args: any,
        locus: any
      ) {
        return new AstArgument(locus, args[0], null, args[1] !== null);
      });
      rules.addRule("OptParen: '\\(' '\\)'");
      rules.addRule('expr: expr2');
      rules.addRule('expr2: expr2 OR expr3', onBinaryOp);
      rules.addRule('expr2: expr3');
      rules.addRule('expr3: expr3 AND expr4', onBinaryOp);
      rules.addRule('expr3: expr4');
      rules.addRule("expr4: expr4 '=' expr5", onBinaryOp);
      rules.addRule("expr4: expr4 '<>' expr5", onBinaryOp);
      rules.addRule("expr4: expr4 '>' expr5", onBinaryOp);
      rules.addRule("expr4: expr4 '<' expr5", onBinaryOp);
      rules.addRule("expr4: expr4 '<=' expr5", onBinaryOp);
      rules.addRule("expr4: expr4 '>=' expr5", onBinaryOp);
      rules.addRule('expr4: expr5');
      rules.addRule('expr5: expr5 MOD expr6', onBinaryOp);
      rules.addRule('expr5: expr6');
      rules.addRule("expr6: expr6 '\\+' expr7", onBinaryOp);
      rules.addRule("expr6: expr6 '\\-' expr7", onBinaryOp);
      rules.addRule('expr6: expr7');
      rules.addRule("expr7: expr7 '\\*' expr8", onBinaryOp);
      rules.addRule("expr7: expr7 '\\/' expr8", onBinaryOp);
      rules.addRule("expr7: expr7 '\\^' expr8", onBinaryOp);
      rules.addRule('expr7: expr8');
      rules.addRule("expr8: '\\(' expr '\\)'", onBracketExpr);
      //rules.addRule( "expr8: expr8 '\\.' expr10", onBinaryOp );
      rules.addRule('expr8: NOT expr9', function(
        args: string[],
        location: Location
      ) {
        return new AstUnaryOperator(location, 'NOT', args[1]);
      });
      rules.addRule("expr8: '\\-' expr9", function(
        args: string[],
        location: Location
      ) {
        return new AstUnaryOperator(location, '-', args[1]);
      });
      rules.addRule('expr8: expr9');
      rules.addRule('expr9: constant');
      rules.addRule('expr9: expr10');
      rules.addRule('expr10: ReferenceList');
      rules.addRule('constant: hexconstant', onNumber);
      rules.addRule('constant: intconstant', onNumber);
      rules.addRule('constant: floatconstant', onNumber);
      rules.addRule('constant: stringconstant', onString);
      rules.addRule("ReferenceList: ReferenceList '\\.' identifier", function(
        args: any,
        location: Location
      ) {
        return new AstMemberDeref(location, args[0], args[2]);
      });

      rules.addRule(
        "ReferenceList: ReferenceList '\\(' ParameterList '\\)'",
        function(args: any, locus: any) {
          return new AstArrayDeref(locus, args[0], args[2]);
        }
      );
      rules.addRule('ReferenceList: Reference');
      rules.addRule('Reference: identifier', function(args: any, locus: any) {
        return new AstVariableReference(locus, args[0]);
      });

      rules.addRule('separator: endl+');
      rules.addRule('separator: comment endl');
      rules.addRule("separator: ':'");

      rules.buildSet.check(this.errors);
      for (let i = 0; i < this.errors.length; i++) {
        dbg.printf('%s\n', this.errors[i]);
      }

      rules.buildSet.finalize();

      QBasicProgram.parser = new EarleyParser(rules.buildSet, dbg);
      //QBasicProgram.parser.debug = true;
    }

    input += '\n'; // parse doesn't handle no newline at end of input.

    // Parse the program into abstract syntax tree.
    const astProgram = QBasicProgram.parser.parse(input);
    if (astProgram === null) {
      this.errors = QBasicProgram.parser.errors;
      dbg.printf('Parse failed.\n');
      return;
    }

    // Perform type checking.
    const typeChecker = new TypeChecker(this.errors);
    astProgram.accept(typeChecker);

    if (this.errors.length > 0) {
      dbg.printf('There were errors.\n');
      return;
    }

    // Perform code generation.
    const codeGenerator = new CodeGenerator();
    this.codeGenerator = codeGenerator;
    astProgram.accept(codeGenerator);

    this.sourcecode = input;
    this.instructions = codeGenerator.instructions;
    this.types = typeChecker.types;
    this.defaultType = typeChecker.defaultType;
    this.data = codeGenerator.data;
    this.shared = codeGenerator.shared;
    this.lineMap = codeGenerator.lineMapping;
    this.callMap = codeGenerator.callMap;

    this.byteCode = this.getByteCodeAsString();
  }

  public setBreakpoints(breakpoints: number[]) {
    const byteCodeBreakpoints = breakpoints.map(value =>
      this.fromSourceCodeLineNumberToProgramCounter.get(value - 1)
    );
    this.breakpoints = byteCodeBreakpoints;
  }

  public getBreakpoints() {
    return this.breakpoints;
  }

  public getByteCode() {
    return this.byteCode;
  }
  // QBasicProgram.parser = null;

  readonly toByteCodeLineNumber = new Map<number, number>();
  readonly toSourceCodeLineNumber = new Map<number, number>();
  readonly fromSourceCodeLineNumberToProgramCounter = new Map<number, number>();
  // public fromPC(pc: number) {
  //   return {
  //     toLineNumber: () => {
  //       return this.toLineNumber.get(pc);
  //     }
  //   };
  // }
  private getByteCodeAsString() {
    this.toByteCodeLineNumber.clear();
    this.toSourceCodeLineNumber.clear();
    this.fromSourceCodeLineNumberToProgramCounter.clear();

    if (!this.instructions) {
      return '';
    }
    const source = this.sourcecode.split('\n');
    const lines: string[] = [];
    let location: Location;
    for (let i = 0; i < this.instructions.length; i++) {
      location = this.lineMap[i] ? this.lineMap[i] : location;
      if (this.lineMap[i]) {
        lines.push(
          "   ' L" + (location.line + 1) + ' ' + source[location.line]
        );
      }

      const instruction = this.instructions[i].toString().replace('\n', '↵');
      lines.push('[' + i + '] ' + instruction);
      this.toByteCodeLineNumber.set(i, lines.length - 1);
      this.toSourceCodeLineNumber.set(i, location.line);
      this.fromSourceCodeLineNumberToProgramCounter.set(location.line, i);
    }

    return lines.join('\n');
  }
}

export const ScriptSrc = (function(/*scripts*/) {
  // const scripts = document.getElementsByTagName("script"),
  //   script = scripts[scripts.length - 1];
  // if (script.getAttribute.length !== undefined) {
  //   var src = script.src;
  // } else {
  //   var src = <string>script.getAttribute("src" /*, -1*/);
  // }
  // const i = src.lastIndexOf("/");
  // if (i >= 0) {
  //   src = src.substr(0, i + 1);
  // } else {
  //   src = "";
  // }
  // return src;
})();

// var tabs = new TabView();
//var cons = new _Console();
//var virtualMachine = new VirtualMachine(cons);

//function getFile(strUrl: string) {
//    var xmlHttpReq = new XMLHttpRequest();

//    xmlHttpReq.open('GET', strUrl, false);
//    xmlHttpReq.send("");
//    return xmlHttpReq.responseText;
//}

//function codes(str: string) {
//    var c: any;
//    for (var i = 0; i < str.length; i++) {
//        c += " " + str.charCodeAt(i);
//    }
//    return c;
//}

//function tests() {
//    var passed = [];
//    var failed = [];

//    function separateTests(testfile: any) {
//        var tests = [];
//        var lines = testfile.split("\n");

//        var test: { name?: string, expected?: string, input?: string, inkeys?: string, errors?: string } = null;

//        // for each line,
//        for (var i = 0; i < lines.length; i++) {

//            // if line begins with 'NAME:
//            if (lines[i].indexOf("'ERROR:") == 0) {
//                test.errors += lines[i].substr(7) + "\n";
//            } else if (lines[i].indexOf("'NAME:") == 0) {

//                // if we have a test,
//                if (test) {
//                    // save current test.
//                    tests.push(test);
//                }
//                // set test name.
//                test = {};
//                test.name = lines[i].substr(6);
//                test.expected = "";
//                test.input = "";
//                test.inkeys = "";
//                test.errors = "";

//                // if line begins with "'#"
//            } else if (lines[i].indexOf("'INKEYS:") == 0) {
//                // add to expected output.
//                test.inkeys += lines[i].substr(8);

//            } else if (lines[i].indexOf("'#") == 0) {
//                // add to expected output.
//                test.expected += lines[i].substr(2) + "\n";

//            } else {
//                // add to test input file.
//                test.input += lines[i] + "\n";
//            }
//        }

//        if (test) {
//            tests.push(test);
//        }

//        // return results.
//        return tests;
//    }
//    var tests = separateTests(getFile("tests.bas"));
//    for (var i = 0; i < tests.length; i++) {
//        cons.print("Run test " + tests[i].name + "\n");
//        dbg.printf("----------------------------------------------\n");
//        dbg.printf("Run test " + tests[i].name + "\n");
//        if (tests[i].errors == "") {
//            cons.recording = true;
//            cons.recorded = "";
//            cons.setKeyBuffer(tests[i].inkeys);
//            var program = new QBasicProgram(tests[i].input, true);
//            if (program.errors.length) {
//                dbg.printf("Program failed to parse.\n%s",
//                    program.errors.join("\n"));
//            } else {
//                virtualMachine.run(program, true);
//            }
//            if (cons.recorded === tests[i].expected) {
//                passed.push(tests[i].name);
//            } else {
//                dbg.printf("Expected: '%s'\n", tests[i].expected);
//                dbg.printf("Got: '%s'\n", cons.recorded);
//                failed.push(tests[i].name);
//            }
//        } else {
//            // just syntax check.
//            var program = new QBasicProgram(tests[i].input, true);

//            var errorStr = program.errors.join("\n") + "\n";
//            cons.print(errorStr);
//            if (errorStr == tests[i].errors) {
//                passed.push(tests[i].name);
//            } else {
//                dbg.printf("Failed! Expected error '%s'\n",
//                    tests[i].errors);
//                dbg.printf(".........But got......:'%s'\n",
//                    errorStr);

//                failed.push(tests[i].name);
//            }
//        }
//    }

//    cons.print("Done running tests.\n");
//    for (var i = 0; i < failed.length; i++) {
//        dbg.printf("Failed: %s\n", failed[i]);
//    }
//}

export function compile(
  code: string,
  cons: _Console,
  virtualMachine: VirtualMachine
) {
  // var text = editor.getValue();//(<HTMLTextAreaElement>document.getElementById("sourcecode")).value;
  const program = new QBasicProgram(code);

  if (program.errors.length === 0) {
    // (<HTMLTextAreaElement>document.getElementById("bytecode")).value = program.getByteCodeAsString();
    // bytecode.setValue(program.getByteCodeAsString());
    virtualMachine.run(program, false);

    cons.canvas.click();
    cons.canvas.focus();
    return true;
  }

  virtualMachine.reset(null);
  for (let i = 0; i < program.errors.length; i++) {
    cons.print(program.errors[i] + '\n');
    dbg.print(program.errors[i] + '\n');
  }
  cons.enableCursor(true);

  // tabs.selectTab(0);
  // $(cons.canvas).click();
  cons.canvas.click();
  // $(cons.canvas).focus();
  cons.canvas.focus();
}

export function compile2(code: string) {
  const program = new QBasicProgram(code);
  return program;
}

// tabs.selectTab(1);
// var input = getFile("test.txt");
//(<HTMLTextAreaElement>document.getElementById("sourcecode")).value = input;

// create debug area
// document.write("<div id='debug'></div>");
export const dbg = new DebugConsole(<HTMLTextAreaElement>(
  document.getElementById('footer')
));
//var editor = (<any>window).monaco.editor.create(document.getElementById("sourcecode"), {
//    value: input
//});

// export var editor = new Editor(document.getElementById("editor"), { value: input, theme: "vs-dark", });
// var bytecode = new Editor(document.getElementById("bytecode"), { readOnly: true, theme: "vs-dark", });

// GUI
//let canvas = document.getElementById("canvas");
//let screenElement = document.getElementById("screen");
//export function onResize() {
//    // editor.layout();
//    // bytecode.layout();

//    let rect = screenElement.getBoundingClientRect();
//    if (rect.width < rect.height * (640 / 400)) {
//        canvas.style.width = rect.width + "px";
//        canvas.style.height = rect.width * (400 / 640) + "px";
//        return;
//    }
//    canvas.style.height = rect.height + "px";
//    canvas.style.width = rect.height * (640 / 400) + "px";
//}

//window.addEventListener("resize", () => {
//    onResize();
//});

//setTimeout(() => {
//    selectBasicCodeTab();
//}, 200);
