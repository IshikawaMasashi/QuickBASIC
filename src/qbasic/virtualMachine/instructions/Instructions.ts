import { VirtualMachine } from "../VirtualMachine";
import { SystemFunctions } from "../../SystemFunctions";
import { SystemSubroutines } from "../../SystemSubroutines";
import { StackFrame } from "../../StackFrame";
import { ArrayVariable } from "../../ArrayVariable";
import { Dimension } from "../../Dimension";
import { ScalarVariable } from "../../ScalarVariable";
import { IStringDictionary } from "../../base/common/collections";
import { Instruction } from "./instruction";
import { getFile, setLineContent } from "../../file/file";

/**
 Defines the instruction set of the virtual machine. Each entry is indexed by
 the name of the instruction, and consists of a record of the following values:

 name: The name of the instruction for display purposes.

 addrLabel: If present, and set to "true", the argument of the instruction is
 interpretted as an address during the linking stage.
 
 dataLabel: If present, and set to "true", the argument of the instruction is
 the index of a DATA statement.

 numArgs: If present and set to 0, the instruction takes no arguments.
 Otherwise, it is assumed to take 1 argument.

 execute: A function taking as its first argument the virtual machine, and as
 its second argument the parameter of the instruction. It should manipulate the
 virtual machine's stack or program counter to implement the instruction.
 */

class ForLoop implements Instruction {
  name = "forloop";
  addrLabel = true;

  constructor(public arg: number) {}
  execute(vm: VirtualMachine, arg: number) {
    // For loops are tedious to implement in bytecode, because
    // depending on whether STEP is positive or negative we either
    // compare the counter with < or >. To simplify things, we create
    // the forloop instruction to perform this comparison.

    // argument is the address of the end of the for loop.

    // stack is:
    // end value
    // step expression
    // loop variable REFERENCE

    // if the for loop is ended, then all three of its arguments are
    // popped off the stack, and we jump to the end address. Otherwise,
    // only the loop variable is popped and no branch is performed.

    var counter = vm.stack[vm.stack.length - 1];
    var step = vm.stack[vm.stack.length - 2];
    var end = vm.stack[vm.stack.length - 3];

    if ((step < 0 && counter < end) || (step > 0 && counter > end)) {
      //vm.stack.length -= 3;
      vm.stack.pop();
      vm.stack.pop();
      vm.stack.pop();
      vm.pc = arg;
    } else {
      vm.stack.pop();
    }
  }
}

class CopyTop implements Instruction {
  name = "copytop";
  numArgs = 0;
  execute(vm: VirtualMachine, arg: any) {
    // Duplicates the top of the stack
    vm.stack.push(vm.stack[vm.stack.length - 1]);
  }
}

class Restore implements Instruction {
  name = "restore";
  dataLabel = true;
  constructor(public arg: number) {}
  execute(vm: VirtualMachine, arg: any) {
    // Restore the data pointer to the given value.
    if (vm.debug) {
      vm.trace.printf("RESTORE to %s\n", arg);
    }
    vm.dataPtr = arg;
  }
}

class PopVal implements Instruction {
  name = "popval";
  constructor(public arg: string) {}
  execute(vm: VirtualMachine, arg: any) {
    // Argument is the name of the variable. Sets that variable's value
    // to the top of the stack.

    // vm.getVariable(arg).value = <any>vm.stack.pop();
    let variable = vm.getVariable(arg);
    variable.value = <any>vm.stack.pop();
  }
}

class Pop implements Instruction {
  name = "pop";
  numArgs = 0;
  constructor() {}
  execute(vm: VirtualMachine, arg: any) {
    vm.stack.pop();
  }
}

class PushRef implements Instruction {
  name = "pushref";
  constructor(public arg: string) {}
  execute(vm: VirtualMachine, arg: any) {
    // The argument is the name of a variable. Push a reference to that
    // variable onto the top of the stack.
    vm.stack.push(vm.getVariable(arg));
  }
}

class PushValue implements Instruction {
  readonly name = "pushvalue";
  constructor(public arg: string) {}
  execute(vm: VirtualMachine, arg: string) {
    // The argument is the name of a variable. Push the value of that
    // variable to the top of the stack.
    vm.stack.push(vm.getVariable(arg).value);
  }
}
class PushType implements Instruction {
  name = "pushtype";
  constructor(public arg: any) {}
  execute(vm: VirtualMachine, arg: any) {
    // The argument is the name of a built-in or user defined type.
    // Push the type object onto the stack, for later use in an alloc
    // system call.
    vm.stack.push(vm.types[arg]);
  }
}

class PopVar implements Instruction {
  name = "popvar";
  constructor(public arg: string) {}
  execute(vm: VirtualMachine, arg: string) {
    // Sets the given variable to refer to the top of the stack, and
    // pops the top of the stack. The stack top must be a reference.
    vm.setVariable(arg, vm.stack.pop());
  }
}

class New implements Instruction {
  name = "new";
  constructor(public arg: any) {}
  execute(vm: VirtualMachine, arg: any) {
    // The argument is a typename. Replace the top of the stack with a
    // reference to that value, with the given type.
    var type = vm.types[arg];
    vm.stack.push(new ScalarVariable(type, (<any>type).copy(vm.stack.pop())));
  }
}

class End implements Instruction {
  name = "end";
  numArgs = 0;
  execute(vm: VirtualMachine, arg: any) {
    // End the program. The CPU ends the program when the program
    // counter reaches the end of the instructions, so make that happen
    // now.
    vm.pc = vm.instructions.length;
  }
}

class UnaryOp implements Instruction {
  name = "unary_op";
  constructor(public arg: string) {}
  execute(vm: VirtualMachine, arg: string) {
    var rhs = vm.stack.pop();
    var value;
    if (arg == "NOT") {
      // value = ~rhs;
      value = Number(!rhs);
    } else if (arg == "-") {
      value = -rhs;
    } else {
      vm.trace.printf("No such unary operator: %s\n", arg);
    }

    vm.stack.push(value);
  }
}
class OperatorEquality implements Instruction {
  name = "=";
  numArgs = 0;
  execute(vm: VirtualMachine, arg: any) {
    vm.stack.push(vm.stack.pop() === vm.stack.pop() ? -1 : 0);
  }
}
class OperatorLessThan implements Instruction {
  name = "<";
  numArgs = 0;
  execute(vm: VirtualMachine, arg: any) {
    var rhs = vm.stack.pop();
    var lhs = vm.stack.pop();
    vm.stack.push(lhs < rhs ? -1 : 0);
  }
}
class OperatorLessThanOrEqual implements Instruction {
  name = "<=";
  numArgs = 0;
  execute(vm: VirtualMachine, arg: any) {
    var rhs = vm.stack.pop();
    var lhs = vm.stack.pop();
    vm.stack.push(lhs <= rhs ? -1 : 0);
  }
}

class OperatorGreaterThan implements Instruction {
  name = ">";
  numArgs = 0;
  execute(vm: VirtualMachine, arg: any) {
    var rhs = vm.stack.pop();
    var lhs = vm.stack.pop();
    vm.stack.push(lhs > rhs ? -1 : 0);
  }
}

class OperatorGreaterThanOrEqual implements Instruction {
  name = ">=";
  numArgs = 0;
  execute(vm: VirtualMachine, arg: any) {
    var rhs = vm.stack.pop();
    var lhs = vm.stack.pop();
    vm.stack.push(lhs >= rhs ? -1 : 0);
  }
}
class OperatorNotEquality implements Instruction {
  name = "<>";
  numArgs = 0;
  execute(vm: VirtualMachine, arg: any) {
    vm.stack.push(vm.stack.pop() !== vm.stack.pop() ? -1 : 0);
  }
}

class And {
  name = "and";
  numArgs = 0;
  execute(vm: VirtualMachine, arg: any) {
    vm.stack.push((<number>vm.stack.pop()) & (<number>vm.stack.pop()));
  }
}

class Or {
  name = "or";
  numArgs = 0;
  execute(vm: VirtualMachine, arg: any) {
    vm.stack.push((<number>vm.stack.pop()) | (<number>vm.stack.pop()));
  }
}
class OperatorPlus implements Instruction {
  name = "+";
  numArgs = 0;
  execute(vm: VirtualMachine, arg: any) {
    var rhs = <number>vm.stack.pop();
    var lhs = <number>vm.stack.pop();
    vm.stack.push(lhs + rhs);
  }
}

class OperatorMinus implements Instruction {
  name = "-";
  numArgs = 0;
  execute(vm: VirtualMachine, arg: any) {
    var rhs = <number>vm.stack.pop();
    var lhs = <number>vm.stack.pop();
    vm.stack.push(lhs - rhs);
  }
}

class OperatorMultiply implements Instruction {
  name = "*";
  numArgs = 0;
  execute(vm: VirtualMachine, arg: any) {
    vm.stack.push(<number>vm.stack.pop() * <number>vm.stack.pop());
  }
}
class OperatorDivide implements Instruction {
  name = "/";
  numArgs = 0;
  execute(vm: VirtualMachine, arg: any) {
    // TODO: Division by 0 error. Javascript simply results in NaN
    // TODO: \ operator.
    var rhs = <number>vm.stack.pop();
    var lhs = <number>vm.stack.pop();
    vm.stack.push(lhs / rhs);
  }
}

class OperatorCaret implements Instruction {
  name = "^";
  numArgs = 0;
  execute(vm: VirtualMachine, arg: any) {
    // TODO: Division by 0 error. Javascript simply results in NaN
    // TODO: \ operator.
    var rhs = <number>vm.stack.pop();
    var lhs = <number>vm.stack.pop();
    vm.stack.push(lhs ** rhs);
  }
}

class MOD implements Instruction {
  name = "mod";
  numArgs = 0;
  execute(vm: VirtualMachine, arg: any) {
    // TODO: Division by 0 error. Javascript simply results in NaN
    var rhs = <number>vm.stack.pop();
    var lhs = <number>vm.stack.pop();
    vm.stack.push(lhs % rhs);
  }
}

class BZ implements Instruction {
  name = "bz";
  addrLabel = true;
  constructor(public arg: number) {
    // The “BZ” means “Branch on Condition Zero”.
  }
  execute(vm: VirtualMachine, arg: any) {
    // Branch on zero. Pop the top of the stack. If zero, jump to
    // the given address.
    var expr = vm.stack.pop();
    if (!expr) {
      vm.pc = arg;
    }
  }
}

class BNZ implements Instruction {
  name = "bnz";
  addrLabel = true;
  constructor(public arg: number) {}
  execute(vm: VirtualMachine, arg: any) {
    // Branch on non-zero. Pop the top of the stack. If non-zero, jump
    // to the given address.
    var expr = vm.stack.pop();
    if (expr !== 0) {
      vm.pc = arg;
    }
  }
}

class JMP implements Instruction {
  name = "jmp";
  addrLabel = true;
  constructor(public arg: number) {}
  execute(vm: VirtualMachine, arg: any) {
    // Jump to the given address.
    vm.pc = arg;
  }
}

class CALL implements Instruction {
  name = "call";
  addrLabel = true;
  constructor(public arg: number) {}
  execute(vm: VirtualMachine, arg: number) {
    // Call a function or subroutine. This creates a new stackframe
    // with no variables defined.
    vm.frame = new StackFrame(vm.pc);
    vm.callstack.push(vm.frame);
    vm.pc = arg;
  }
}

class GOSUB implements Instruction {
  name = "gosub";
  addrLabel = true;
  constructor(public arg: number) {}
  execute(vm: VirtualMachine, arg: number) {
    // like call, but stack frame shares all variables from the old
    // stack frame.
    var oldvariables = vm.frame.variables;
    vm.frame = new StackFrame(vm.pc);
    vm.frame.variables = oldvariables;
    vm.callstack.push(vm.frame);
    vm.pc = arg;
  }
}

class RET implements Instruction {
  name = "ret";
  numArgs = 0;
  execute(vm: VirtualMachine, arg: any) {
    // Return from a gosub, function, or subroutine call.
    vm.pc = vm.callstack.pop().pc;
    vm.frame = vm.callstack[vm.callstack.length - 1];
  }
}

class PUSHCONST implements Instruction {
  name = "pushconst";
  constructor(public arg: any) {}
  execute(vm: VirtualMachine, arg: any) {
    // Push a constant value onto the stack. The argument is a
    // javascript string or number.

    vm.stack.push(arg);
  }
}

class ARRAY_DEREF implements Instruction {
  name = "array_deref";
  numArgs = 1;
  constructor(public arg: any) {}
  execute(vm: VirtualMachine, arg: any) {
    // Dereference an array. The top of the stack is the variable
    // reference, followed by an integer for each dimension.

    // Argument is whether we want the reference or value.

    // get the variable
    var variable = <ArrayVariable>vm.stack.pop();

    var indexes: any[] = [];

    // for each dimension,
    for (var i = 0; i < variable.dimensions.length; i++) {
      // pop it off the stack in reverse order.
      indexes.unshift(vm.stack.pop());
    }

    // TODO: bounds checking.
    if (arg) {
      vm.stack.push(variable.access(indexes));
    } else {
      vm.stack.push(variable.access(indexes).value);
    }
  }
}

class MEMBER_DEREF implements Instruction {
  name = "member_deref";
  constructor(public arg: any) {}
  execute(vm: VirtualMachine, arg: any) {
    // Dereference a user defined type member.
    // Argument is the javascript string containing the name of the
    // member. The top of the stack is a reference to the user
    // variable.

    var userVariable: any = vm.stack.pop();
    var deref = userVariable[arg];
    vm.stack.push(deref);
  }
}

class MEMBER_VALUE implements Instruction {
  name = "member_value";
  constructor(public arg: any) {}
  execute(vm: VirtualMachine, arg: any) {
    // Dereference a user defined type member.
    // Argument is the javascript string containing the name of the
    // member. The top of the stack is a reference to the user
    // variable.

    var userVariable: any = vm.stack.pop();
    var deref = userVariable[arg];
    vm.stack.push(deref.value);
  }
}

class ASSIGN implements Instruction {
  name = "assign";
  numArgs = 0;
  execute(vm: VirtualMachine, arg: any) {
    // Copy the value into the variable reference.
    // Stack: left hand side: variable reference
    // right hand side: value to assign.

    var lhs = <ScalarVariable>vm.stack.pop();
    var rhs = <ScalarVariable>vm.stack.pop();

    lhs.value = (<any>lhs.type).copy(rhs);
  }
}
class SYSCALL implements Instruction {
  name = "syscall";
  constructor(public arg: string) {}
  execute(vm: VirtualMachine, arg: any) {
    var variable;
    var type: any;
    var x;
    var spaces;
    var i;
    // Execute a system function or subroutine. The argument is a
    // javascript string containing the name of the routine.
    if (vm.debug) {
      vm.trace.printf("Execute syscall %s\n", arg);
    }

    if (arg === "print_file") {
      var fileNumber = vm.stack.pop() as string;
      var length = vm.stack.pop() as number;
      let value = "";
      for (let i = 0; i < length; ++i) {
        value = (vm.stack.pop() as string) + value;
      }

      setLineContent(fileNumber, value);

      return;
    }
    if (arg == "print") {
      var num = 1;
      for (i = 0; i < num; i++) {
        var what = vm.stack.pop();
        if (vm.debug) {
          vm.trace.printf("printing %s\n", what);
        }
        vm.cons.print("" + what);
      }
    } else if (arg == "alloc_array") {
      type = vm.stack.pop();
      var numDimensions = vm.stack.pop();
      var dimensions = [];
      for (i = 0; i < numDimensions; i++) {
        var upper = <number>vm.stack.pop();
        var lower = <number>vm.stack.pop();
        dimensions.unshift(new Dimension(lower, upper));
      }

      variable = new ArrayVariable(type, dimensions);
      vm.stack.push(variable);
    } else if (arg == "print_comma") {
      x = vm.cons.x;
      spaces = "";
      while (++x % 14) {
        spaces += " ";
      }
      vm.cons.print(spaces);
    } else if (arg == "print_tab") {
      var col = <number>vm.stack.pop() - 1;
      x = vm.cons.x;
      spaces = "";
      while (++x < col) {
        spaces += " ";
      }
      vm.cons.print(spaces);
    } else if (arg == "alloc_scalar") {
      type = vm.stack.pop();
      variable = new ScalarVariable(type, type.createInstance());
      vm.stack.push(variable);
    } else if (SystemFunctions[arg]) {
      SystemFunctions[arg].action(vm);
    } else if (SystemSubroutines[arg]) {
      SystemSubroutines[arg].action(vm);
    } else {
      vm.cons.print("Unknown syscall: " + arg);
    }
  }
}
export const Instructions: IStringDictionary<(arg: any) => Instruction> = {
  FORLOOP: (arg: number) => new ForLoop(arg),
  COPYTOP: () => new CopyTop(),
  RESTORE: (arg: number) => new Restore(arg),
  POPVAL: (arg: string) => new PopVal(arg),
  POP: () => new Pop(),
  PUSHREF: (arg: string) => new PushRef(arg),
  PUSHVALUE: (arg: string) => new PushValue(arg),
  PUSHTYPE: (arg: any) => new PushType(arg),
  POPVAR: (arg: string) => new PopVar(arg),
  NEW: (arg: any) => new New(arg),
  END: () => new End(),
  UNARY_OP: (arg: string) => new UnaryOp(arg),
  "=": () => new OperatorEquality(),
  "<": () => new OperatorLessThan(),
  "<=": () => new OperatorLessThanOrEqual(),
  ">": () => new OperatorGreaterThan(),
  ">=": () => new OperatorGreaterThanOrEqual(),
  "<>": () => new OperatorNotEquality(),
  AND: () => new And(),
  OR: () => new Or(),
  "+": () => new OperatorPlus(),
  "-": () => new OperatorMinus(),
  "*": () => new OperatorMultiply(),
  "/": () => new OperatorDivide(),
  "^": () => new OperatorCaret(),
  MOD: () => new MOD(),
  BZ: (arg: number) => new BZ(arg),
  BNZ: (arg: number) => new BNZ(arg),
  JMP: (arg: number) => new JMP(arg),
  CALL: (arg: number) => new CALL(arg),
  GOSUB: (arg: number) => new GOSUB(arg),
  RET: () => new RET(),
  PUSHCONST: (arg: any) => new PUSHCONST(arg),
  ARRAY_DEREF: (arg: any) => new ARRAY_DEREF(arg),
  MEMBER_DEREF: (arg: any) => new MEMBER_DEREF(arg),
  MEMBER_VALUE: (arg: any) => new MEMBER_VALUE(arg),
  ASSIGN: () => new ASSIGN(),
  SYSCALL: (arg: string) => new SYSCALL(arg)
};
