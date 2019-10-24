import { VirtualMachine } from './virtualMachine/VirtualMachine';
import { IStringDictionary } from './base/common/collections';

import { getFile } from './file/file';

/**
    Defines the functions that can be called from a basic program. Functions
    must return a value. System subs, which do not return a value, are defined
    elsewhere. Some BASIC keywords, such as SCREEN, are both a function and a
    sub, and may do different things in the two contexts.

    Each entry is indexed by function name. The record contains:

    type: The name of the type of the return value of the function.

    args: An array of names of types of each argument.

    minArgs: the number of arguments required.

    action: A function taking the virtual machine as an argument. To implement
    the function, it should pop its arguments off the stack, and push its
    return value onto the stack. If minArgs <> args.length, then the top of the
    stack is an integer variable that indicates how many arguments were passed
    to the function.
 */

export interface ISystemFunction {
  type: string;
  args: string[];
  minArgs: number;
  action(vm: VirtualMachine): void;
  name?: string;
}
export const SystemFunctions: IStringDictionary<ISystemFunction> = {
  RND: {
    type: 'SINGLE',
    args: ['INTEGER'],
    minArgs: 0,
    action: function(vm: VirtualMachine) {
      const numArgs = vm.stack.pop();
      let n = 1;
      if (numArgs == 1) {
        n = <number>vm.stack.pop();
      }
      if (n === 0) {
        vm.stack.push(vm.lastRandomNumber);
      } else {
        vm.stack.push(Math.random());
      }
    }
  },

  CHR$: {
    type: 'STRING',
    args: ['INTEGER'],
    minArgs: 1,
    action: function(vm: VirtualMachine) {
      const num = <number>vm.stack.pop();
      vm.stack.push(String.fromCharCode(num));
    }
  },

  INKEY$: {
    type: 'STRING',
    args: [],
    minArgs: 0,
    action: function(vm: VirtualMachine) {
      const code = vm.cons.getKeyFromBuffer();
      let result = '';

      if (code != -1) {
        result = String.fromCharCode(code);
        if (code === 0) {
          result += String.fromCharCode(vm.cons.getKeyFromBuffer());
        }
      }

      vm.stack.push(result);
    }
  },

  LEN: {
    type: 'INTEGER',
    args: ['STRING'],
    minArgs: 1,
    action: function(vm: VirtualMachine) {
      vm.stack.push((<string>vm.stack.pop()).length);
    }
  },

  MID$: {
    type: 'STRING',
    args: ['STRING', 'INTEGER', 'INTEGER'],
    minArgs: 2,
    action: function(vm: VirtualMachine) {
      const numArgs = vm.stack.pop();
      let len: any;
      if (numArgs == 3) {
        len = vm.stack.pop();
      }
      const start = <number>vm.stack.pop();
      const str = <string>vm.stack.pop();
      vm.stack.push(str.substr(start - 1, len));
    }
  },

  LEFT$: {
    type: 'STRING',
    args: ['STRING', 'INTEGER'],
    minArgs: 2,
    action: function(vm: VirtualMachine) {
      const num = <number>vm.stack.pop();
      const str = <string>vm.stack.pop();
      vm.stack.push(str.substr(0, num));
    }
  },

  RIGHT$: {
    type: 'STRING',
    args: ['STRING', 'INTEGER'],
    minArgs: 2,
    action: function(vm: VirtualMachine) {
      const num = <number>vm.stack.pop();
      const str = <string>vm.stack.pop();
      vm.stack.push(str.substr(str.length - num));
    }
  },

  TIMER: {
    type: 'INTEGER',
    args: [],
    minArgs: 0,
    action: function(vm: VirtualMachine) {
      // return number of seconds since midnight. DEVIATION: We return a
      // floating point value rather than an integer, so that nibbles
      // will work properly when its timing loop returns a value less
      // than one second.
      const date = new Date();

      const result =
        date.getMilliseconds() / 1000 +
        date.getSeconds() +
        date.getMinutes() * 60 +
        date.getHours() * 60 * 60;

      vm.stack.push(result);
    }
  },

  PEEK: {
    type: 'INTEGER',
    args: ['INTEGER'],
    minArgs: 1,
    action: function(vm: VirtualMachine) {
      // pop one argument off the stack and replace it with 0.
      vm.stack.pop();
      vm.stack.push(0);
    }
  },

  LCASE$: {
    type: 'STRING',
    args: ['STRING'],
    minArgs: 1,
    action: function(vm: VirtualMachine) {
      const str = <string>vm.stack.pop();
      vm.stack.push(str.toLowerCase());
    }
  },

  UCASE$: {
    type: 'STRING',
    args: ['STRING'],
    minArgs: 1,
    action: function(vm: VirtualMachine) {
      vm.stack.push((<string>vm.stack.pop()).toUpperCase());
    }
  },

  STR$: {
    type: 'STRING',
    args: ['SINGLE'],
    minArgs: 1,
    action: function(vm: VirtualMachine) {
      const num = vm.stack.pop();
      vm.stack.push('' + num);
    }
  },

  SPACE$: {
    type: 'STRING',
    args: ['INTEGER'],
    minArgs: 1,
    action: function(vm: VirtualMachine) {
      const numSpaces = vm.stack.pop();
      let str = '';
      for (let i = 0; i < numSpaces; i++) {
        str += ' ';
      }
      vm.stack.push(str);
    }
  },

  VAL: {
    type: 'SINGLE',
    args: ['STRING'],
    minArgs: 1,
    action: function(vm: VirtualMachine) {
      vm.stack.push(parseFloat(<string>vm.stack.pop()));
    }
  },
  INT: {
    type: 'INTEGER',
    args: ['SINGLE'],
    minArgs: 1,
    action: function(vm: VirtualMachine) {
      vm.stack.push(Math.floor(<number>vm.stack.pop()));
    }
  },
  ABS: {
    type: 'SINGLE',
    args: ['SINGLE'],
    minArgs: 1,
    action: function(vm: VirtualMachine) {
      const value = vm.stack.pop() as number;
      vm.stack.push(Math.abs(value));
    }
  },
  SIN: {
    type: 'SINGLE',
    args: ['SINGLE'],
    minArgs: 1,
    action: function(vm: VirtualMachine) {
      const value = vm.stack.pop() as number;
      vm.stack.push(Math.sin(value));
    }
  },
  COS: {
    type: 'SINGLE',
    args: ['SINGLE'],
    minArgs: 1,
    action: function(vm: VirtualMachine) {
      const value = vm.stack.pop() as number;
      vm.stack.push(Math.cos(value));
    }
  },
  TAN: {
    type: 'SINGLE',
    args: ['SINGLE'],
    minArgs: 1,
    action: function(vm: VirtualMachine) {
      const value = vm.stack.pop() as number;
      vm.stack.push(Math.tan(value));
    }
  },
  ASIN: {
    type: 'SINGLE',
    args: ['SINGLE'],
    minArgs: 1,
    action: function(vm: VirtualMachine) {
      const value = vm.stack.pop() as number;
      vm.stack.push(Math.asin(value));
    }
  },
  ACOS: {
    type: 'SINGLE',
    args: ['SINGLE'],
    minArgs: 1,
    action: function(vm: VirtualMachine) {
      const value = vm.stack.pop() as number;
      vm.stack.push(Math.acos(value));
    }
  },
  ATN: {
    type: 'SINGLE',
    args: ['SINGLE'],
    minArgs: 1,
    action: function(vm: VirtualMachine) {
      const value = vm.stack.pop() as number;
      vm.stack.push(Math.atan(value));
    }
  },

  SQR: {
    type: 'SINGLE',
    args: ['SINGLE'],
    minArgs: 1,
    action: function(vm: VirtualMachine) {
      const value = vm.stack.pop() as number;
      // Returns the square root of a numeric expression.
      vm.stack.push(Math.sqrt(value));
    }
  },

  EOF: {
    type: 'INTEGER',
    args: ['STRING'],
    minArgs: 1,
    action: function(vm: VirtualMachine) {
      const fileNumber = vm.stack.pop() as string;
      // Returns the square root of a numeric expression.
      // vm.stack.push(Math.sqrt(value));
      const file = getFile(fileNumber);
      // const lineCount = file.view.file.getBuffer().getLineCount();
      const lineCount = file.buffer.getLineCount();
      if (file.position.lineNumber > lineCount) {
        vm.stack.push(1);
        return;
      }
      vm.stack.push(0);
    }
  }
};
