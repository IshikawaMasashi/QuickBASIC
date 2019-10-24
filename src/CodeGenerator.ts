import { Location } from 'earley';

import { AstDeclareFunction } from './node/AstDeclareFunction';
import { AstArgument } from './node/AstArgument';
import { AstEndStatement } from './node/AstEndStatement';
import { AstNullStatement } from './node/AstNullStatement';
import { AstAssignStatement } from './node/AstAssignStatement';
import { AstBinaryOp } from './node/AstBinaryOp';
import { AstCallStatement } from './node/AstCallStatement';
import { AstCaseStatement } from './node/AstCaseStatement';
import { AstConstStatement } from './node/AstConstStatement';
// import { AstExitStatement } from "./node/AstExitStatement";
import { AstConstantExpr } from './node/AstConstantExpr';
import { AstGosubStatement } from './node/AstGosubStatement';
import { AstGotoStatement } from './node/AstGotoStatement';
import { AstInputStatement } from './node/AstInputStatement';
import { AstPrintItem } from './node/AstPrintItem';
// import { AstLabel } from "./node/AstLabel";
import { AstDoStatement } from './node/AstDoStatement';
// import { AstTypeMember } from "./node/AstTypeMember";
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
import { AstProgram } from './node/AstProgram';

import { Instruction } from './virtualMachine/instructions/instruction';
import { Instructions } from './virtualMachine/instructions/Instructions';
import { IsArrayType } from './qb';
import { SystemFunctions } from './SystemFunctions';
import { SystemSubroutines } from './SystemSubroutines';
import { IDoStatementVisitor } from './IVisitor';
import { Label } from './Label';
// import { Locus } from "./Locus";
import { LoopContext } from './LoopContext';
import { UserType } from './UserType';

import { IStringDictionary } from './base/common/collections';
import { AstOpenStatement } from './node/AstOpenStatement';
import { AstDimStatement } from './node/AstDimStatement';
// import { AstArrayDeref } from "./node/AstArrayDeref";
// import { number } from "prop-types";

/** @constructor */
export class CodeGenerator implements IDoStatementVisitor {
  // Array of Instruction objects
  instructions: Instruction[] = [];

  // Array of data from DATA statements.
  data: any[] = [];

  // Set of shared variable names. If a string is a property of this object,
  // then the variable with that name is shared.
  shared: IStringDictionary<boolean> = {};

  // Array of labels.
  labels: Label[] = [];

  // Map from label name to label id
  labelMap: IStringDictionary<number> = {};

  loopStack: LoopContext[] = [];
  selectStack: number[] = [];

  // declared functions map to 1. Array accesses are changed to function
  // calls if they are in this map.
  functionNames: IStringDictionary<number> = {};

  // map from bytecode instruction to Locus, so that we can keep track of
  // which source lines led to each instruction.
  readonly lineMapping: Location[] = [];
  lastLine = -1; // don't map lines twice in a row
  readonly callMap = new Map<number, { name: string; location: Location }>();

  constructor() {
    // Array of Instruction objects
    //this.instructions = [];

    // Array of data from DATA statements.
    // this.data = [];

    // Set of shared variable names. If a string is a property of this object,
    // then the variable with that name is shared.
    // this.shared = {};

    // Array of labels.
    // this.labels = [];

    // Map from label name to label id
    // this.labelMap = {};

    //this.loopStack = [];
    //this.selectStack = [];

    // declared functions map to 1. Array accesses are changed to function
    // calls if they are in this map.
    //this.functionNames = {};

    //// map from bytecode instruction to Locus, so that we can keep track of
    //// which source lines led to each instruction.
    //this.lineMapping = [];
    //this.lastLine = -1; // don't map lines twice in a row

    // Create a label so RESTORE with no label will work.
    this.getGotoLabel(':top');
  }

  link() {
    // for each instruction,
    for (let i = 0; i < this.instructions.length; i++) {
      const instr = this.instructions[i];
      // if the instruction has a code label for an argument, change its
      // argument to the associated offset.
      //if (instr.instr.addrLabel) {
      //    instr.arg = this.labels[instr.arg].codeOffset;
      //} else if (instr.instr.dataLabel) {
      //    instr.arg = this.labels[instr.arg].dataOffset;
      //}
      if (instr.addrLabel) {
        instr.arg = this.labels[instr.arg].codeOffset;
      } else if (instr.dataLabel) {
        instr.arg = this.labels[instr.arg].dataOffset;
      }
    }
  }

  newLabel(basename: string) {
    const id = this.labels.length;
    const name = basename + '_' + id;
    this.labels.push(
      new Label(name, this.instructions.length, this.data.length)
    );
    return id;
  }

  label(labelid: number) {
    this.labels[labelid].codeOffset = this.instructions.length;
    this.labels[labelid].dataOffset = this.data.length;
  }

  map(location: Location) {
    // Keep track of which source line maps to which instruction.
    if (location.line === this.lastLine) {
      return;
    }
    this.lastLine = location.line;
    this.lineMapping[this.instructions.length] = location;
  }

  getGotoLabel(name: string) {
    let labelId;
    if (name in this.labelMap) {
      labelId = this.labelMap[name];
    } else {
      labelId = this.newLabel(name);
      this.labelMap[name] = labelId;
    }
    return labelId;
  }

  write(name: string, arg?: number | string) {
    const instr = Instructions[name](arg);
    if (instr === undefined) {
      throw 'Bad instruction: ' + name;
    }
    this.instructions.push(/*new Instruction(instr, arg)*/ instr);
  }

  visitProgram(program: AstProgram) {
    for (let i = 0; i < program.subs.length; i++) {
      program.subs[i].accept(this);
    }

    this.link();
  }

  visitDeclareFunction(node: AstDeclareFunction) {
    this.functionNames[node.name] = 1;
  }

  visitSubroutine(node: AstSubroutine) {
    let skipLabel = null;
    this.map(node.location);
    if (node.name != '_main') {
      skipLabel = this.newLabel('skipsub');
      this.write('JMP', skipLabel);
      this.label(this.getGotoLabel(node.name));
      for (let i = node.args.length - 1; i >= 0; i--) {
        // pop each argument off the stack into a variable. The wantRef
        // parameter of the AST node ensures that these evalauate
        this.write('POPVAR', node.args[i].name);
      }
    }
    node.statements.accept(this);
    if (node.isFunction) {
      // when the function returns, place its return value on the top of
      // the stack.
      this.write('PUSHVALUE', node.name);
    }

    this.write('RET', null);
    if (skipLabel !== null) {
      this.label(skipLabel);
    } else {
      this.write('END', null);
    }
  }

  visitCallStatement(node: AstCallStatement) {
    this.map(node.location);
    for (let i = 0; i < node.args.length; i++) {
      // This will push references, since wantRef was set by the type
      // checker.
      node.args[i].accept(this);
    }

    if (SystemSubroutines[node.name]) {
      // Check if we need to push number of args
      const sub = SystemSubroutines[node.name];
      if (sub.args !== undefined && sub.minArgs !== undefined) {
        this.write('PUSHCONST', node.args.length);
      }
      this.write('SYSCALL', node.name);
    } else if (node.name == 'PRINT') {
      this.write('PUSHCONST', node.args.length);
      this.write('SYSCALL', node.name);
    } else {
      this.write('CALL', this.getGotoLabel(node.name));
      this.callMap.set(this.instructions.length - 1, {
        name: node.name,
        location: node.location
      });
    }
  }

  visitArgument(_node: AstArgument) {}

  visitPrintUsingStatement(node: AstPrintUsingStatement) {
    // push format string, followed by all expressions, followed by
    // terminator, followed by total number of arguments, then syscall it.
    for (let i = 0; i < node.exprList.length; i++) {
      node.exprList[i].accept(this);
    }
    this.write('PUSHCONST', node.terminator);
    this.write('PUSHCONST', node.exprList.length + 1);
    this.write('SYSCALL', 'print_using');
  }

  visitPrintStatement(node: AstPrintStatement) {
    let newline = true;
    this.map(node.location);
    if (node.fileNumber) {
      //   node.printItem.accept(this);
      for (var i = 0; i < node.printItems.length; i++) {
        node.printItems[i].accept(this);
      }
      this.write('PUSHCONST', node.printItems.length);
      this.write('PUSHCONST', node.fileNumber);
      this.write('SYSCALL', 'print_file');
      return;
    }
    for (var i = 0; i < node.printItems.length; i++) {
      node.printItems[i].accept(this);
      if (node.printItems[i].type === AstPrintItem.TAB) {
        this.write('SYSCALL', 'print_tab');
      } else if (node.printItems[i].expr) {
        this.write('SYSCALL', 'print');
      }

      if (node.printItems[i].terminator == ',') {
        this.write('SYSCALL', 'print_comma');
        newline = false;
      } else if (node.printItems[i].terminator == ';') {
        newline = false;
      } else {
        newline = true;
      }
    }

    if (newline) {
      this.write('PUSHCONST', '\n');
      this.write('SYSCALL', 'print');
    }
  }

  visitPrintItem(node: AstPrintItem) {
    if (node.expr) {
      // if(typeof node.expr === "string"){
      //     this.write("PUSHCONST", node.expr);
      //     return;
      // }
      node.expr.accept(this);
    }
  }

  visitInputStatement(node: AstInputStatement) {
    this.map(node.location);

    // print the prompt, if any, and question mark, if required.
    if (node.promptExprOrfileNumber) {
      if (typeof node.promptExprOrfileNumber === 'string') {
        const isLine = node.isLine;
        this.write('PUSHCONST', isLine ? 1 : 0);

        const reference = node.identifiersOrReference as AstVariableReference;
        reference.wantRef = true;
        reference.accept(this);

        const fileNumber = node.promptExprOrfileNumber as string;
        this.write('PUSHCONST', fileNumber);

        this.write('SYSCALL', 'INPUT');
        return;
      }
      node.promptExprOrfileNumber.accept(this);
      this.write('SYSCALL', 'print');
    }

    if (node.printQuestionMark) {
      this.write('PUSHCONST', '? ');
      this.write('SYSCALL', 'print');
    } else {
      this.write('PUSHCONST', ' ');
      this.write('SYSCALL', 'print');
    }

    // push onto the stack: identifiers
    const identifiers = node.identifiersOrReference as any[];
    for (let i = 0; i < /*node.*/ identifiers.length; i++) {
      this.write('PUSHREF', /*node.*/ identifiers[i]);
    }

    this.write('PUSHCONST', /*node.*/ identifiers.length);
    this.write('SYSCALL', 'INPUT');
  }

  visitNullStatement(_node: AstNullStatement) {}

  visitEndStatement(node: AstEndStatement) {
    this.map(node.location);
    this.write('END', null);
  }

  visitForLoop(node: AstForLoop) {
    this.map(node.location);
    const forLabel = this.newLabel('for');
    const nextLabel = this.newLabel('next');
    const endLabel = this.newLabel('end_for');
    this.loopStack.push(
      new LoopContext(node.identifier, forLabel, nextLabel, endLabel)
    );
    node.startExpr.accept(this);
    this.write('POPVAR', node.identifier);
    node.endExpr.accept(this);
    node.stepExpr.accept(this);
    this.label(forLabel);
    this.write('PUSHVALUE', node.identifier);
    this.write('FORLOOP', endLabel);
  }

  visitNextStatement(node: AstNextStatement) {
    this.map(node.location);
    for (let i = 0; i < node.identifiers.length; i++) {
      const ctx = this.loopStack.pop()!;

      // stack is now:
      // end
      // step

      this.label(ctx.nextLabel);
      this.write('COPYTOP');
      this.write('PUSHVALUE', ctx.counter);
      this.write('+');
      this.write('POPVAL', ctx.counter);
      this.write('JMP', ctx.forLabel);
      this.label(ctx.endLabel);
    }
  }

  visitExitStatement(node: any) {
    // Guaranteed to work due to type checker.
    const context = this.loopStack[this.loopStack.length - 1];

    if (context.counter) {
      // It's a FOR loop. Pop off the step and end value.
      this.write('POP');
      this.write('POP');
    }

    this.write('JMP', context.endLabel);
  }

  visitArrayDeref(node: any) {
    this.map(node.location);
    // check if it's really a function call.
    if (
      node.expr instanceof AstVariableReference &&
      this.functionNames[node.expr.name]
    ) {
      node.parameters.accept(this);
      this.write('CALL', this.getGotoLabel(node.expr.name));
    } else if (
      node.expr instanceof AstVariableReference &&
      SystemFunctions[node.expr.name]
    ) {
      const func = SystemFunctions[node.expr.name];
      node.parameters.accept(this);
      if (func.minArgs < func.args.length) {
        // variable number of arguments.
        this.write('PUSHCONST', node.parameters.length);
      }
      node.expr.accept(this);
    } else {
      node.parameters.accept(this);
      node.expr.accept(this);
      if (node.parameters.length > 0) {
        this.write('ARRAY_DEREF', node.wantRef);
      } else {
        // eg, calling a function with an array as a parameter.
      }
    }
  }

  visitMemberDeref(node: AstMemberDeref) {
    this.map(node.location);
    node.lhs.accept(this);
    if (node.wantRef) {
      this.write('MEMBER_DEREF', node.identifier);
    } else {
      this.write('MEMBER_VALUE', node.identifier);
    }
  }

  visitVariableReference(node: AstVariableReference) {
    this.map(node.location);
    if (SystemFunctions[node.name]) {
      this.write('SYSCALL', node.name);
    } else if (this.functionNames[node.name]) {
      this.write('CALL', this.getGotoLabel(node.name));
      if (node.wantRef) {
        this.write('NEW', node.type.name);
      }
    } else if (node.wantRef || IsArrayType(node.type)) {
      this.write('PUSHREF', node.name);
    } else {
      this.write('PUSHVALUE', node.name);
    }
  }

  visitRange(_node: AstRange) {}

  visitDataStatement(node: AstDataStatement) {
    for (let i = 0; i < node.data.length; i++) {
      // type is constantexpr
      this.data.push(node.data[i].value);
    }
  }

  visitReturnStatement(node: AstReturnStatement) {
    this.map(node.location);
    this.write('RET');
  }

  visitRestoreStatement(node: any) {
    this.map(node.location);
    let where = 0;
    if (node.label) {
      where = this.getGotoLabel(node.label);
    } else {
      where = this.getGotoLabel(':top');
    }
    this.write('RESTORE', where);
  }

  visitConstStatement(constStatement: AstConstStatement) {
    this.shared[constStatement.name] = true;
    constStatement.expr.accept(this);
    this.write('POPVAL', constStatement.name);
  }

  visitDefTypeStatement(def: any) {}

  visitDimStatement(node: AstDimStatement) {
    this.map(node.location);
    let typeName;

    // if there is a typename,
    if (node.typeName) {
      typeName = node.typeName;
    } else {
      // use default type (INTEGER)
      typeName = 'INTEGER';
    }

    if (node.shared) {
      this.shared[node.name] = true; //1;
    }

    // if there are ranges,
    if (node.ranges.length > 0) {
      // for each range
      for (let i = 0; i < node.ranges.length; i++) {
        node.ranges[i].lowerExpr.accept(this);
        node.ranges[i].upperExpr.accept(this);
      }
      // push number of ranges.
      this.write('PUSHCONST', node.ranges.length);
      // push typename
      this.write('PUSHTYPE', typeName);
      // syscall alloc.
      this.write('SYSCALL', 'alloc_array');
      // pop it into the variable name.
      this.write('POPVAR', node.name);
    } else {
      // just create a single instance and pop it into the name.
      this.write('PUSHTYPE', typeName);
      this.write('SYSCALL', 'alloc_scalar');
      this.write('POPVAR', node.name);
    }
  }

  visitDoStatement(node: AstDoStatement) {
    this.map(node.location);
    const top = this.newLabel('do');
    const bottom = this.newLabel('loop');
    this.label(top);

    this.loopStack.push(new LoopContext(null, null, null, bottom));
    node.statements.accept(this);
    this.loopStack.pop();
    switch (node.type) {
      case AstDoStatement.UNTIL:
        node.expr.accept(this);
        this.write('BZ', top);
        break;

      case AstDoStatement.WHILE_AT_END:
        node.expr.accept(this);
        this.write('BNZ', top);
        break;

      case AstDoStatement.INFINITE:
        this.write('JMP', top);
        break;
    }

    this.label(bottom);
  }

  visitWhileLoop(node: AstWhileLoop) {
    this.map(node.location);
    const top = this.newLabel('while');
    const bottom = this.newLabel('wend');
    this.label(top);
    node.expr.accept(this);
    this.write('BZ', bottom);
    this.loopStack.push(new LoopContext(null, null, null, bottom));
    node.statements.accept(this);
    this.loopStack.pop();
    this.write('JMP', top);
    this.label(bottom);
  }

  visitIfStatement(node: AstIfStatement) {
    this.map(node.location);
    const endLabel = this.newLabel('endif');
    const elseLabel = this.newLabel('else');

    node.expr.accept(this);
    this.write('BZ', elseLabel);
    node.statements.accept(this);

    // Elseの位置を記録する
    // this.map({ line: this.lastLine + 1, position: 0 });
    this.write('JMP', endLabel);

    this.label(elseLabel);

    if (node.elseStatements) {
      node.elseStatements.accept(this);
      // this.map({ line: this.lastLine + 1, position: 0 });
      this.write('JMP', endLabel);
    }

    this.label(endLabel);
  }

  visitSelectStatement(node: AstSelectStatement) {
    this.map(node.location);
    const endSelect = this.newLabel('end_select');
    this.selectStack.push(endSelect);
    node.expr.accept(this);
    //node.cases.accept(this);
    for (const _case of node.cases) {
      _case.accept(this);
    }
    this.label(endSelect);
    this.write('POP');
    this.selectStack.pop();
  }

  visitCaseStatement(node: AstCaseStatement) {
    this.map(node.location);
    if (node.exprList.length > 0) {
      const okayLabel = this.newLabel('case_okay');
      const skipLabel = this.newLabel('case_skip');
      for (let i = 0; i < node.exprList.length; i++) {
        this.write('COPYTOP');
        node.exprList[i].accept(this);
        this.write('=');
        this.write('BNZ', okayLabel);
      }
      this.write('JMP', skipLabel);
      this.label(okayLabel);

      node.statements.accept(this);
      this.write('JMP', this.selectStack[this.selectStack.length - 1]);
      this.label(skipLabel);
    } else {
      // case else.
      node.statements.accept(this);
    }
  }

  visitTypeMember(node: any) {}

  visitUserType(node: UserType) {}

  visitGotoStatement(node: AstGotoStatement) {
    this.map(node.location);
    const labelId = this.getGotoLabel(node.label);
    this.write('JMP', labelId);
  }
  visitGosub(node: AstGosubStatement) {
    this.map(node.location);
    const labelId = this.getGotoLabel(node.label);
    this.write('GOSUB', labelId);
  }

  visitLabel(node: any) {
    this.label(this.getGotoLabel(node.label));
  }

  visitAssignStatement(node: AstAssignStatement) {
    this.map(node.location);
    node.expr.accept(this);

    if (
      node.lhs instanceof AstVariableReference &&
      this.functionNames[node.lhs.name]
    ) {
      // it was actually a function call.
      this.write('POPVAL', node.lhs.name);
    } else {
      node.lhs.accept(this);
      this.write('ASSIGN');
    }
  }

  visitBinaryOp(node: AstBinaryOp) {
    this.map(node.location);
    node.lhs.accept(this);
    node.rhs.accept(this);
    this.write(node.op);
    if (node.wantRef) {
      this.write('NEW', node.type.name);
    }
  }

  visitUnaryOperator(node: AstUnaryOperator) {
    this.map(node.location);
    node.expr.accept(this);
    this.write('UNARY_OP', node.op);
    if (node.wantRef) {
      this.write('NEW', node.type.name);
    }
  }

  visitConstantExpr(node: AstConstantExpr) {
    this.map(node.location);
    this.write('PUSHCONST', node.value);
    if (node.wantRef) {
      this.write('NEW', node.type.name);
    }
  }

  visitOpenStatement(node: AstOpenStatement) {
    this.map(node.location);

    node.expr.accept(this);

    if (node.mode == 'INPUT') {
      this.write('PUSHCONST', '1');
    } else {
      this.write('PUSHCONST', '0');
    }

    this.write('PUSHCONST', node.fileNumber);
    // // print the prompt, if any, and question mark, if required.
    // if (node.promptExpr) {
    //     node.promptExpr.accept(this);
    //     this.write("SYSCALL", "print");
    // }

    // if (node.printQuestionMark) {
    //     this.write("PUSHCONST", "? ");
    //     this.write("SYSCALL", "print");
    // } else {
    //     this.write("PUSHCONST", " ");
    //     this.write("SYSCALL", "print");
    // }

    // // push onto the stack: identifiers
    // for (var i = 0; i < node.identifiers.length; i++) {
    //     this.write("PUSHREF", node.identifiers[i]);
    // }

    // this.write("PUSHCONST", node.identifiers.length);
    this.write('SYSCALL', 'OPEN');
  }
}
