import { AstDeclareFunction } from "./node/AstDeclareFunction";
import { AstArgument } from "./node/AstArgument";
import { AstEndStatement } from "./node/AstEndStatement";
import { AstNullStatement } from "./node/AstNullStatement";
import { AstAssignStatement } from "./node/AstAssignStatement";
import { AstBinaryOp } from "./node/AstBinaryOp";
import { AstCallStatement } from "./node/AstCallStatement";
import { AstCaseStatement } from "./node/AstCaseStatement";
import { AstConstStatement } from "./node/AstConstStatement";
import { AstExitStatement } from "./node/AstExitStatement";
import { AstConstantExpr } from "./node/AstConstantExpr";
import { AstGosubStatement } from "./node/AstGosubStatement";
import { AstGotoStatement } from "./node/AstGotoStatement";
import { AstInputStatement } from "./node/AstInputStatement";
import { AstPrintItem } from "./node/AstPrintItem";
import { AstLabel } from "./node/AstLabel";
import { AstDoStatement } from "./node/AstDoStatement";
import { AstTypeMember } from "./node/AstTypeMember";
import { AstNextStatement } from "./node/AstNextStatement";
import { AstSelectStatement } from "./node/AstSelectStatement";
import { AstRestoreStatement } from "./node/AstRestoreStatement";
import { AstVariableReference } from "./node/AstVariableReference";
import { AstPrintStatement } from "./node/AstPrintStatement";
import { AstProgram } from "./node/AstProgram";
import { AstSubroutine } from "./node/AstSubroutine";
import { AstUserType } from "./node/AstUserType";
import { AstPrintUsingStatement } from "./node/AstPrintUsingStatement";
import { AstMemberDeref } from "./node/AstMemberDeref";
import { AstDataStatement } from "./node/AstDataStatement";
import { AstUnaryOperator } from "./node/AstUnaryOperator";
import { AstArrayDeref } from "./node/AstArrayDeref";
import { AstRange } from "./node/AstRange";

import {
  AreTypesCompatible,
  IsArrayType,
  IsNumericType,
  IsStringType
} from "./qb";
import { dbg, sprintf, DeriveTypeNameFromVariable, IsUserType } from "./qb";
import { SystemFunctions } from "./SystemFunctions";
import { SystemSubroutines } from "./SystemSubroutines";
import { TypeScope } from "./TypeScope";
import { Locus } from "./Locus";
import { CheckedLabel } from "./CheckedLabel";
import { CheckedLoopContext } from "./CheckedLoopContext";
import { UserType } from "./UserType";
import { Type } from "./types/Type";
import { IntegerType } from "./types/IntegerType";
import { SingleType } from "./types/SingleType";
import { DoubleType } from "./types/DoubleType";
import { StringType } from "./types/StringType";
import { AnyType } from "./types/AnyType";
import { NullType } from "./types/NullType";
import { ArrayType } from "./types/ArrayType";
import { IStringDictionary } from "./base/common/collections";
import { AstOpenStatement } from "./node/AstOpenStatement";

/** @constructor */
export class TypeChecker {
  declaredSubs: IStringDictionary<AstDeclareFunction> = {};
  scopes = [new TypeScope()];
  shared = new TypeScope();
  labelsUsed: CheckedLabel[] = [];
  labelsDefined: IStringDictionary<CheckedLabel> = {};

  readonly types: IStringDictionary<Type> = {
    INTEGER: new IntegerType(),
    SINGLE: new SingleType(),
    DOUBLE: new DoubleType(),
    STRING: new StringType(),
    ANY: new AnyType(),
    ":NULL": new NullType()
  };

  // Changed to integer if DEFINT is present in the program (hack hack)
  defaultType: Type;

  // stack of CheckedLoopContext. Most recent is 0.
  loopStack: CheckedLoopContext[] = [];
  constructor(public errors: string[]) {
    // map from name to AstDeclare
    // this.declaredSubs = {};
    this.declaredSubs["_main"] = new AstDeclareFunction(
      new Locus(0, 0),
      "_main",
      [],
      false
    );

    // this.errors = errors;
    // this.scopes = [new TypeScope()];
    // this.shared = new TypeScope();

    // this.labelsUsed = [];
    // this.labelsDefined = {};

    //this.types = {
    //    INTEGER: new IntegerType(),
    //    SINGLE: new SingleType(),
    //    DOUBLE: new DoubleType(),
    //    STRING: new StringType(),
    //    ANY: new AnyType(),
    //    ":NULL": new NullType()
    //};

    // Changed to integer if DEFINT is present in the program (hack hack)
    this.defaultType = this.types["SINGLE"];

    // stack of CheckedLoopContext. Most recent is 0.
    // this.loopStack = [];
  }

  /**
     Parameter 1 must be an ast node.
     Parameter 2 is a format string, eg, as in printf
     Parameters 3... depend on the format string.
     */
  error(...args: any[]) {
    var object = args.shift(); //arguments[0];
    //var args = [];
    //for (var i = 1; i < arguments.length; i++) {
    //    args.push(arguments[i]);
    //}
    var errorStr = "Error at " + object.locus + ": " + sprintf(args);
    this.errors.push(errorStr);
    dbg.print(errorStr + "\n");
  }

  /**
     If the variable name includes a type suffix, removes it and returns the
     result.
     */
  removeSuffix(name: string) {
    switch (name[name.length - 1]) {
      case "%":
      case "$":
      case "!":
      case "&":
      case "#":
        return name.substr(0, name.length - 1);
      default:
        return name;
    }
  }

  /**
     Using the current scope, or the type suffix, determine the type of the
     variable given its name. Returns the type object.
     */
  getTypeFromVariableName(name: any) {
    let type: string | Type = this.scopes[0].names[name];
    if (type !== undefined) {
      return type;
    }
    type = this.shared.names[name];
    if (type !== undefined) {
      return type;
    }

    type = DeriveTypeNameFromVariable(name);
    if (type !== null) {
      return this.types[type];
    }

    return this.defaultType;
  }

  visitProgram(program: AstProgram) {
    var i;
    for (i = 0; i < program.subs.length; i++) {
      program.subs[i].accept(this);
    }

    // for each label used, if it is not defined, then emit an error.
    for (i = 0; i < this.labelsUsed.length; i++) {
      var label = this.labelsUsed[i];
      if (this.labelsDefined[label.name] === undefined) {
        this.error(label.astNode, "Label %s is not defined", label.name);
      }
    }

    // emit an error on any subs not implemented
    for (var name in this.declaredSubs) {
      var func = this.declaredSubs[name];
      if (!func.hasBody && func.used) {
        this.error(func, "SUB or FUNCTION '%s' has no body", name);
      }
    }
  }
  accept(nodes: AstArgument[]) {
    // You didn't see that.
    for (var i = 0; i < nodes.length; i++) {
      if (!nodes[i]) {
        continue;
      }
      nodes[i].accept(this);
    }
  }
  visitDeclareFunction(declare: AstDeclareFunction) {
    // error if this name is already declared.
    if (this.declaredSubs[declare.name] !== undefined) {
      this.error(
        declare,
        "Subroutine %s is already declared on line %s",
        declare.name,
        this.declaredSubs[declare.name].locus.line + 1
      );
    }

    this.declaredSubs[declare.name] = declare;
    // declare.args.accept(this);
    this.accept(declare.args);
    if (declare.isFunction) {
      declare.type = this.getTypeFromVariableName(declare.name);
    }
  }

  visitSubroutine(sub: AstSubroutine) {
    var i;
    var self = this;

    function subError(declare: AstDeclareFunction) {
      self.error(
        sub,
        "Sub or function %s does not match declaration on " + "line %s",
        sub.name,
        declare.locus.line + 1
      );
    }

    // error if the sub has not been declared.
    if (this.declaredSubs[sub.name] === undefined) {
      this.error(sub, "Subroutine %s is not declared", sub.name);
    } else {
      var declare = this.declaredSubs[sub.name];

      if (declare.isFunction != sub.isFunction) {
        subError(declare);
      }

      if (sub.args.length != declare.args.length) {
        subError(declare);
      } else {
        // error if the declaration does not have the same arguments.
        for (i = 0; i < sub.args.length; i++) {
          // don't compare variable names, it's okay if they differ.
          if (
            (sub.args[i].typeName != declare.args[i].typeName &&
              declare.args[i].typeName != "ANY") ||
            sub.args[i].isArray != declare.args[i].isArray
          ) {
            subError(declare);
          }
        }
      }

      declare.hasBody = true;
    }

    this.scopes.unshift(new TypeScope());

    // visit arguments
    for (i = 0; i < sub.args.length; i++) {
      sub.args[i].accept(this);
      this.scopes[0].names[sub.args[i].name] = sub.args[i].type;
    }

    // visit statements
    for (i = 0; i < sub.statements.length; i++) {
      if (!sub.statements[i]) {
        continue;
      }
      //dbg.printf("Try to visit %s\n", getObjectClass( sub.statements[i]) );
      if (sub.statements[i].accept === undefined) {
        dbg.printf(
          "ERROR: Could not visit object of type %s\n",
          /*getObjectClass*/ sub.statements[i]
        );
      } else {
        sub.statements[i].accept(this);
      }
    }

    this.scopes.shift();
  }

  /**
     Check that types of arguments match the ones from the AstDeclareStatement.
     */
  checkCallArguments(declare: any, args: any) {
    declare.used = true;
    if (declare.args.length != args.length) {
      this.error(declare, "Wrong number of arguments");
    } else {
      for (var i = 0; i < args.length; i++) {
        args[i].wantRef = true;
        args[i].accept(this);
        if (!AreTypesCompatible(args[i].type, declare.args[i].type)) {
          this.error(
            args[i],
            "Type mismatch in argument %d of call to %s." +
              " Expected %s but got %s",
            i + 1,
            declare.name,
            declare.args[i].type.name,
            args[i].type.name
          );
        }
      }
    }
  }

  visitCallStatement(call: AstCallStatement) {
    if (SystemSubroutines[call.name] !== undefined) {
      // TODO: Check args for system parameters.
      for (var i = 0; i < call.args.length; i++) {
        call.args[i].wantRef = true;
        call.args[i].accept(this);
      }
      return;
    }

    var declare = this.declaredSubs[call.name];
    // sub must exist and argument number and types must be compatible.
    if (declare === undefined) {
      this.error(call, "Call to undefined sub '%s'", call.name);
    } else {
      this.checkCallArguments(declare, call.args);
    }
  }

  visitArgument(argument: AstArgument) {
    var type;

    // we are about to enter a function, so add this variable to the scope
    if (argument.typeName) {
      // error if the typeName does not exist.
      type = this.types[argument.typeName];
      if (type === undefined) {
        this.error(argument, "Type %s is not defined", argument.typeName);
        type = new UserType(argument.typeName, {});
        this.types[argument.typeName] = type;
      }
    } else {
      type = this.getTypeFromVariableName(argument.name);
    }

    if (argument.isArray) {
      type = new ArrayType(<Type>type);
    }

    argument.type = <Type>type;
  }

  visitPrintStatement(print: AstPrintStatement) {
    // all arguments must be convertable to strings or single.
    // if (!print.printItems) {
    //     return;
    // }

    //  print.printItems.accept(this);
    for (let item of print.printItems) {
      item.accept(this);
    }
  }

  visitPrintUsingStatement(printUsing: AstPrintUsingStatement) {
    for (var i = 0; i < printUsing.exprList.length; i++) {
      printUsing.exprList[i].wantRef = true;
      printUsing.exprList[i].accept(this);

      if (i === 0 && !IsStringType(printUsing.exprList[i].type)) {
        this.error(
          printUsing.exprList[i],
          "Format string must be STRING, not %s",
          printUsing.exprList[i].type.name
        );
      } else if (
        i > 0 &&
        !IsStringType(printUsing.exprList[i].type) &&
        !IsNumericType(printUsing.exprList[i].type)
      ) {
        this.error(printUsing.exprList[i], "Type Mismatch Error");
      }
    }

    if (printUsing.exprList.length === 0) {
      this.error(printUsing, "PRINT USING requires at least one argument");
    }
  }

  visitPrintItem(item: AstPrintItem) {
    if (item.expr === null) {
      return;
    }
    // if(typeof item.expr === "string"){
    //     return;
    // }
    item.expr.accept(this);
    if (!IsNumericType(item.expr.type) && !IsStringType(item.expr.type)) {
      this.error(
        item.expr,
        "Expected string or number, but got '%s'",
        item.expr.type.name
      );
    }
  }

  visitInputStatement(input: AstInputStatement) {
    // prompt must be null or a string.
    if (input.promptExprOrfileNumber) {
      if (typeof input.promptExprOrfileNumber === "string") {
        // this.error(input, "FileNumber must be a string");
        return;
      }
      input.promptExprOrfileNumber.accept(this);
      if (!IsStringType(input.promptExprOrfileNumber.type)) {
        this.error(input, "Prompt must be a string");
      }
    }

    // identifiers must be strings or numbers.
    for (var i = 0; i < input.identifiersOrReference.length; i++) {
      var type = this.getTypeFromVariableName(input.identifiersOrReference[i]);
      if (!IsNumericType(<Type>type) && !IsStringType(<Type>type)) {
        this.error(
          input,
          "Identifier '%s' should be string or numeric.",
          input.identifiersOrReference.type
        );
      }
    }
  }

  visitNullStatement(argument: AstNullStatement) {}

  visitEndStatement(argument: AstEndStatement) {}

  visitForLoop(loop: any) {
    // identifier must be numeric type.
    if (!IsNumericType(this.getTypeFromVariableName(loop.identifier))) {
      this.error(loop, "Loop counter must be a number");
    }

    loop.startExpr.wantRef = true;
    loop.startExpr.accept(this);
    loop.endExpr.accept(this);
    loop.stepExpr.accept(this);

    // startExpr and endExpr and stepExpr must be convertible to single.
    if (
      !IsNumericType(loop.startExpr.type) ||
      !IsNumericType(loop.endExpr.type) ||
      !IsNumericType(loop.stepExpr.type)
    ) {
      this.error(loop, "Loop expression must be a number.");
    }

    this.loopStack.unshift(new CheckedLoopContext("FOR", loop.identifier));
  }

  visitNextStatement(next: AstNextStatement) {
    // pop loops off loopstack in order.
    // identifier must match loops.
    for (var i = 0; i < next.identifiers.length; i++) {
      if (this.loopStack.length === 0) {
        this.error(next, "NEXT without FOR");
        break;
      }
      if (this.loopStack[0].type !== "FOR") {
        // NEXT inside a DO loop?
        this.error(next, "NEXT without FOR");
        break;
      }
      if (next.identifiers[i] != this.loopStack[0].counter) {
        this.error(
          next,
          "Mismatched loop counter '%s' in NEXT",
          next.identifiers[i]
        );
      }
      this.loopStack.shift();
    }

    if (next.identifiers.length === 0) {
      if (this.loopStack.length === 0) {
        this.error(next, "NEXT without FOR");
      } else {
        this.loopStack.shift();
      }
    }
  }

  visitExitStatement(exit: AstExitStatement) {
    if (
      exit.what &&
      exit.what != "FOR" &&
      exit.what != "DO" &&
      exit.what != "WHILE"
    ) {
      this.error(exit, "EXIT %s not supported", exit.what);
    }
    if (this.loopStack.length === 0) {
      this.error(exit, "EXIT without loop not supported");
    }
    if (exit.what && exit.what != this.loopStack[0].type) {
      this.error(
        exit,
        "MISMATCHED EXIT. Expected: '%s'",
        this.loopStack[0].type
      );
    }
  }

  visitArrayDeref(ref: AstArrayDeref) {
    var i;
    ref.expr.accept(this);

    if (
      ref.expr instanceof AstVariableReference &&
      this.declaredSubs[ref.expr.name]
    ) {
      var declare = this.declaredSubs[ref.expr.name];
      if (!declare.isFunction) {
        this.error(ref, "Tried to call non-function '%s'", ref.expr.name);
      }

      this.checkCallArguments(declare, ref.parameters);
      ref.type = declare.type;
      return;
    }
    if (
      ref.expr instanceof AstVariableReference &&
      SystemFunctions[ref.expr.name] !== undefined
    ) {
      var func = SystemFunctions[ref.expr.name];
      ref.type = this.types[func.type];
      ref.parameters.accept(this);

      // verify that parameters are correct type.
      if (
        ref.parameters.length < func.minArgs ||
        ref.parameters.length > func.args.length
      ) {
        this.error(
          ref,
          "Function '%s' called with wrong number of " + "arguments",
          func.name
        );
      } else {
        for (i = 0; i < ref.parameters.length; i++) {
          if (
            !AreTypesCompatible(
              ref.parameters[i].type,
              this.types[func.args[i]]
            )
          ) {
            this.error(
              ref,
              "Argument %d to '%s' function is of " +
                "type '%s', but '%s' expected",
              i + 1,
              func.name,
              ref.parameters[i].type.name,
              func.args[i]
            );
          }
        }
      }

      return;
    }

    // parameters must convert to integers.
    for (i = 0; i < ref.parameters.length; i++) {
      ref.parameters[i].accept(this);
      if (!IsNumericType(ref.parameters[i].type)) {
        this.error(ref.parameters[i], "Array subscript must be numeric type");
      }
    }

    // expr must resolve to an array.
    // type becomes type of array elements.
    if (!IsArrayType(ref.expr.type)) {
      this.error(ref, "Subscript used on non-array '%s'", ref.expr.name);
      ref.type = this.types["INTEGER"];
    } else if (ref.parameters.length === 0) {
      ref.type = ref.expr.type;
    } else {
      ref.type = ref.expr.type.elementType;
    }
  }

  visitMemberDeref(ref: AstMemberDeref) {
    // lhs should resolve to a user type.
    ref.lhs.accept(this);
    if (!IsUserType(ref.lhs.type)) {
      this.error(
        ref,
        "Tried to dereference non-user-type '%s'",
        ref.lhs.type.name
      );
      ref.type = this.types["SINGLE"];
    } else {
      // user type should contain the given identifier.
      ref.type = ref.lhs.type.members[ref.identifier];
      if (ref.type === undefined) {
        this.error(
          ref,
          "Type '%s' does not contain member '%s'",
          ref.lhs.type.name,
          ref.identifier
        );
        ref.type = this.types["SINGLE"];
      }
    }
  }
  visitVariableReference(ref: AstVariableReference) {
    var func;
    if (SystemFunctions[ref.name] !== undefined) {
      func = SystemFunctions[ref.name];
      ref.type = this.types[func.type];
    } else if (this.declaredSubs[ref.name] !== undefined) {
      func = this.declaredSubs[ref.name];
      if (!func.isFunction) {
        this.error(ref, "SUB '%s' used as a function", func.name);
        ref.type = this.types["SINGLE"];
      } else {
        ref.type = func.type;
      }
    } else {
      ref.type = this.getTypeFromVariableName(ref.name);
    }
  }

  visitRange(range: AstRange) {
    range.lowerExpr.accept(this);
    range.upperExpr.accept(this);

    if (
      !IsNumericType(range.lowerExpr.type) ||
      !IsNumericType(range.upperExpr.type)
    ) {
      this.error(range, "Expected a number.");
    }
  }

  visitDataStatement(_argument: AstDataStatement) {}

  visitReturnStatement(returnStatement: any) {}

  visitRestoreStatement(restore: AstRestoreStatement) {
    if (restore.label) {
      this.labelsUsed.push(new CheckedLabel(restore.label, restore));
    }
  }

  visitConstStatement(constStatement: AstConstStatement) {
    // Ensure it's not double defined.
    if (constStatement.name in this.shared.names) {
      this.error(
        constStatement,
        "Redeclared variable '%s'",
        constStatement.name
      );
    }

    // todo: ensure it's a constant calculable at runtime.
    constStatement.expr.accept(this);

    this.shared.names[constStatement.name] = constStatement.expr.type;
  }

  visitDefTypeStatement(def: any) {
    this.defaultType = this.types[def.typeName];
  }

  visitDimStatement(dim: any) {
    // type, if present, must exist.
    var type;
    if (dim.typeName) {
      type = this.types[dim.typeName];
      if (type === undefined) {
        this.error(dim, "Type '%s' is not defined", dim.typeName);
      }
    }

    if (!type) {
      type = this.getTypeFromVariableName(dim.name);
    }

    for (var i = 0; i < dim.ranges.length; i++) {
      dim.ranges[i].accept(this);
    }

    if (dim.ranges.length) {
      type = new ArrayType(<Type>type);
    }

    if (dim.shared) {
      this.shared.names[dim.name] = type;
    } else {
      this.scopes[0].names[dim.name] = type;
    }
  }

  visitDoStatement(loop: AstDoStatement) {
    if (loop.expr) {
      loop.expr.accept(this);
    }
    if (loop.expr !== null && !IsNumericType(loop.expr.type)) {
      this.error(loop, "Loop expression must be numeric");
    }

    this.loopStack.unshift(new CheckedLoopContext("DO", null));
    loop.statements.accept(this);
    this.loopStack.shift();
  }

  visitWhileLoop(loop: any) {
    loop.expr.accept(this);
    if (!IsNumericType(loop.expr.type)) {
      this.error(loop, "Loop expression must be numeric");
    }

    this.loopStack.unshift(new CheckedLoopContext("WHILE", null));
    loop.statements.accept(this);
    this.loopStack.shift();
  }

  visitIfStatement(ifStatement: any) {
    ifStatement.expr.accept(this);
    if (!IsNumericType(ifStatement.expr.type)) {
      this.error(ifStatement, "Expected numeric expression");
    }

    ifStatement.statements.accept(this);
    if (ifStatement.elseStatements) {
      ifStatement.elseStatements.accept(this);
    }
  }

  visitSelectStatement(select: AstSelectStatement) {
    // expr must be compatible with that of each case.
    select.expr.accept(this);
    if (!IsNumericType(select.expr.type) && !IsStringType(select.expr.type)) {
      this.error(select, "Select expression must be numeric or string");
    }

    for (var i = 0; i < select.cases.length; i++) {
      var caseStatement = select.cases[i];
      caseStatement.accept(this);

      for (var j = 0; j < caseStatement.exprList.length; j++) {
        if (
          !AreTypesCompatible(select.expr.type, caseStatement.exprList[j].type)
        ) {
          this.error(
            caseStatement,
            "CASE expression cannot be compared with SELECT"
          );
        }
      }
    }
  }

  visitCaseStatement(caseStatement: AstCaseStatement) {
    caseStatement.exprList.accept(this);
    caseStatement.statements.accept(this);
  }

  visitTypeMember(member: AstTypeMember) {
    var type: Type;

    // typename must exist.
    if (member.typeName) {
      type = this.types[member.typeName];
      if (type === undefined) {
        this.error(member, "Undefined type '%s'", member.typeName);
      }
    }

    if (type === undefined) {
      type = <Type>this.getTypeFromVariableName(member.name);
    }
    member.type = type;
  }

  visitUserType(userType: AstUserType) {
    // must not already be declared.
    if (this.types[userType.name] !== undefined) {
      this.error(userType, "Typename '%s' already defined", userType.name);
    }

    // members should be declared only once.
    var members: IStringDictionary<Type> = {};
    for (var i = 0; i < userType.members.length; i++) {
      userType.members[i].accept(this);
      if (members[userType.members[i].name] !== undefined) {
        this.error(
          userType.members[i],
          "Type member '%s' already defined",
          userType.members[i].name
        );
      }

      //dbg.printf("Type member name=%s has type %s\n",
      //        userType.members[i].name, userType.members[i].type.name);
      members[userType.members[i].name] = userType.members[i].type;
    }

    this.types[userType.name] = new UserType(userType.name, members);
  }

  visitGotoStatement(gotoStatement: AstGotoStatement) {
    this.labelsUsed.push(new CheckedLabel(gotoStatement.label, gotoStatement));
  }

  visitGosub(gosub: AstGosubStatement) {
    this.labelsUsed.push(new CheckedLabel(gosub.label, gosub));
  }

  visitLabel(label: AstLabel) {
    // label must not already be defined.
    if (this.labelsDefined[label.label] !== undefined) {
      this.error(label, "Label '%s' is already defined", label.label);
    }
    // add to labels declared.
    this.labelsDefined[label.label] = new CheckedLabel(label.label, label);
  }

  visitAssignStatement(assign: AstAssignStatement) {
    // rhs must be compatible with rhs.
    assign.lhs.wantRef = true;
    assign.lhs.accept(this);
    assign.expr.accept(this);
    if (!AreTypesCompatible(assign.lhs.type, assign.expr.type)) {
      this.error(
        assign,
        "Tried to assign type '%s' to type '%s'",
        assign.expr.type.name,
        assign.lhs.type.name
      );
    }
  }

  visitBinaryOp(binary: AstBinaryOp) {
    var op = binary.op;
    binary.lhs.accept(this);
    binary.rhs.accept(this);
    var bad = false; //0;
    var type = binary.lhs.type;

    // types must be compatible
    if (!AreTypesCompatible(binary.lhs.type, binary.rhs.type)) {
      bad = true; //1;
    }

    if (IsStringType(binary.lhs.type)) {
      // operator must be +, <, >, <>, '='
      // bad |= op != '+' && op != '<' && op != '>' && op != '<>' && op != '=';
      bad =
        bad || (op != "+" && op != "<" && op != ">" && op != "<>" && op != "=");
    }

    if (IsUserType(binary.lhs.type)) {
      // bad |= op != '=';
      bad = bad || op != "=";
    }

    if (op == "=" || op == "<>" || op == "<" || op == "<=" || op == ">=") {
      type = this.types["INTEGER"];
    }

    if (IsArrayType(binary.lhs.type)) {
      bad = true; //|= 1;
    }

    // type must support the given operator.
    if (bad) {
      this.error(
        binary,
        "Incompatible types for '%s' operator: %s,%s",
        binary.op,
        binary.lhs.type.name,
        binary.rhs.type.name
      );
    }

    binary.type = type;
  }

  visitUnaryOperator(unary: AstUnaryOperator) {
    // type must be numeric.
    unary.expr.accept(this);
    if (!IsNumericType(unary.expr.type)) {
      this.error(unary, "Incompatible type for '%s' operator", unary.op);
    }
    unary.type = unary.expr.type;
  }

  visitConstantExpr(expr: AstConstantExpr) {
    if (expr.value === null) {
      expr.type = this.types[":NULL"];
    } else if (expr.value.constructor == String) {
      expr.type = this.types["STRING"];
    } else {
      expr.type = this.types["SINGLE"];
    }
  }

  visitOpenStatement(node: AstOpenStatement) {}
}
