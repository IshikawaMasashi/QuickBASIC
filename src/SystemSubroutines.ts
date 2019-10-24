import { VirtualMachine } from "./virtualMachine/VirtualMachine";
// import { dbg, IsNumericType } from "./qb";
import { ScalarVariable } from "./ScalarVariable";
import { IStringDictionary } from "./base/common/collections";
import { openFile, getFile, setSeekPosition } from "./file/file";

// 文字列中に含まれるある文字の個数を返す
const counter = (str: string, seq: string) => str.split(seq).length - 1;
const getIntegerPart = (x: number) => String(x).split(".")[0];
// const getFractionalPart = (x: number) => String(x).split(".")[(1];
function printUsing(format: string, values: number[]) {
  const splitPositions: ([number, number])[] = [];
  let start = 0;
  let end = 0;
  let exponential = "";

  if (format.includes("^^^^")) {
    const str = values[0].toExponential();
    const splits = str.split("e");
    values[0] = Number(splits[0]);
    exponential = "E" + splits[1];
    format = format.replace("^^^^", "");
  }

  for (let i = 0; i < format.length; ++i) {
    let ch = format[i];
    let next = format[i + 1];
    if (ch === "#" || (ch === "+" && next === "#")) {
      start = i;
      for (++i; i < format.length; ++i) {
        ch = format[i];
        if (ch === "#") {
          continue;
        }

        if (ch === ".") {
          for (++i; i < format.length; ++i) {
            ch = format[i];
            if (ch === "#") {
              continue;
            }

            break;
          }
        }
        end = i;
        break;
      }

      for (; i < format.length; ++i) {
        ch = format[i];
        next = format[i + 1];
        if (ch === "#") {
          continue;
        }

        if (ch === "," && next == "#") {
          continue;
        }

        break;
      }
      end = Math.min(i, format.length);
    } else {
      continue;
    }
    splitPositions.push([start, end]);
  }

  for (const splitPosition of splitPositions) {
    const value = values.shift();

    let str = format.substring(splitPosition[0], splitPosition[1]);
    // ##,###,###
    if (value && str.includes(",")) {
      let integer = getIntegerPart(value);
      const digit = counter(str, "#");

      if (digit > parseInt(integer, 10).toString().length) {
        for (
          let i = 0;
          i < digit - parseInt(integer, 10).toString().length;
          ++i
        ) {
          integer = " " + integer;
        }
      } else if (parseInt(integer, 10) > digit) {
        for (
          let i = 0;
          i < parseInt(integer, 10).toString().length - digit;
          ++i
        ) {
          str = "#" + str;
        }
      }

      let result = "";
      let lastNum = " ";
      for (let i = 0; i < str.length; ++i) {
        const ch = str[i];

        if (ch === "#") {
          const num = integer[0];
          result += num;
          lastNum = num;
          integer = integer.slice(1);
          continue;
        }
        if (ch === ",") {
          if (lastNum === " ") {
            result += " ";
            continue;
          }

          result += ","; // + result;
        }
      }
      const searchValue = format.substring(splitPosition[0], splitPosition[1]);
      format = format.replace(searchValue, result);
      continue;
    }

    // ##.###
    if (value) {
      let str = format.substring(splitPosition[0], splitPosition[1]);
      const integerPart = getIntegerPart(value);
      // const fractionalPart = getFractionalPart(x);

      const digit = integerPart.length;
      let sign = "";
      if (str[0] === "+") {
        if (Number(integerPart) >= 0) {
          sign = "+";
        } else {
          sign = "-";
        }
        str = str.substring(1);
      }

      const splits = str.split(".");

      let result = "";
      if (digit > splits[0].length) {
        result = "%" + integerPart;
      } else {
        for (let i = 0; i < splits[0].length - digit; ++i) {
          result += " ";
        }
        result += integerPart;
      }
      if (splits.length > 1) {
        result += ".";
        result += value.toFixed(splits[1].length).split(".")[1];
      }

      result = sign + result;
      const searchValue = format.substring(splitPosition[0], splitPosition[1]);
      format = format.replace(searchValue, result) + exponential;
    }
  }

  return format;
}
/**
    Defines the system subroutines that can be called from a basic program.
    Functions must return a value. System functions, which return a value, are
    defined elsewhere.

    Each entry is indexed by the name of the subroutine. The record contains:

    args: An array of names of types of each argument.

    minArgs: (optional) the number of arguments required.

    action: A function taking the virtual machine as an argument. To implement
    the function, it should pop its arguments off the stack, and push its
    return value onto the stack. If minArgs is present, and not equal to 
    args.length, then the top of the stack is an integer variable that
    indicates how many arguments were passed to the function.
 */
export interface ISystemSubroutine {
  args?: string[];
  minArgs?: number;

  action(vm: VirtualMachine): void;
}

export const SystemSubroutines: IStringDictionary<ISystemSubroutine> = {
  BEEP: {
    action: function(_vm: VirtualMachine) {
      // NOT IMPLEMENTED
    }
  },

  CLS: {
    action: function(vm: VirtualMachine) {
      // clears the console screen.
      vm.cons.cls();
    }
  },

  RANDOMIZE: {
    action: function(vm: VirtualMachine) {
      // NOT IMPLEMENTED. Seeding the random number generator
      // is not possible using the built-in Javascript functions.
      vm.stack.pop();
    }
  },

  PLAY: {
    action: function(vm: VirtualMachine) {
      // NOT IMPLEMENTED
      vm.stack.pop();
    }
  },

  SLEEP: {
    action: function(vm: VirtualMachine) {
      // NOT IMPLEMENTED
      vm.stack.pop();
    }
  },

  SYSTEM: {
    action: function(_vm: VirtualMachine) {
      // NOT IMPLEMENTED
      //vm.stack.pop();
    }
  },

  print_using: {
    action: function(vm: VirtualMachine) {
      // pop # args
      const argCount = vm.stack.pop() as number;

      // pop terminator
      const terminator = vm.stack.pop();

      const args: any[] = [];
      for (let i = 0; i < argCount - 1; i++) {
        args.unshift(vm.stack.pop());
      }

      const formatString = args.shift().value;

      // var curArg = 0;

      //const getIntegerPart = (x: number) => (x > 0) ? Math.floor(x) : Math.ceil();
      //const getFractionalPart = (n: number) => { }

      const values: number[] = [];
      for (let i = 0; i < args.length; ++i) {
        if (typeof args[i] === "number") {
          values.push(args[i]);
          continue;
        }
        values.push(args[i].value);
      }
      //for (let i = 0; i < args.length; ++i) {
      //  result.push(printUsing(formatString, values));
      //  // console.log(test);
      //}

      const output = printUsing(formatString, values);
      // for each character in the string,
      //for (var pos = 0; pos < formatString.length; pos++) {
      //  var ch = formatString.charAt(pos);

      //  // if the character is '#',
      //  if (ch === '#') {
      //    // if out of arguments, then type mismatch error.
      //    if (curArg === args.length ||
      //      !IsNumericType(args[curArg].type)) {
      //      // TODO: errors.
      //      dbg.printf("Type mismatch error.\n");
      //      break;
      //    }

      //    // store character position
      //    var backup_pos = pos;
      //    var digitCount = 0;
      //    // for each character of the string,
      //    for (; pos < formatString.length; pos++) {
      //      ch = formatString.charAt(pos);
      //      // if the character is '#',
      //      if (ch === '#') {
      //        // increase digit count
      //        digitCount++;

      //        // if the character is ','
      //      } else if (ch === ',') {
      //        // do nothing
      //      } else {
      //        // break out of loop
      //        break;
      //      }
      //    }

      //    // convert current arg to a string. Truncate or pad to
      //    // appropriate number of digits.
      //    var argAsString = "" + args[curArg].value;
      //    if (argAsString.length > digitCount) {
      //      argAsString = argAsString.substr(argAsString.length -
      //        digitCount);
      //    } else {
      //      while (argAsString.length < digitCount) {
      //        argAsString = " " + argAsString;
      //      }
      //    }

      //    var curDigit = 0;

      //    // go back to old character position.
      //    // for each character of the string,
      //    for (pos = backup_pos; pos < formatString.length; pos++) {
      //      ch = formatString.charAt(pos);
      //      // if the character is a '#'
      //      if (ch === '#') {
      //        // output the next digit.
      //        output += argAsString[curDigit++];
      //        // if the character is a ',',
      //      } else if (ch === ',') {
      //        // output a comma.
      //        output += ch;
      //      } else {
      //        // break out.
      //        break;
      //      }
      //    }

      //    // increment current argument.
      //    curArg += 1;
      //    pos -= 1;
      //  } else {
      //    // character was not #. output it verbatim.
      //    output += ch;
      //  }
      //}

      vm.cons.print(output);
      if (terminator === ",") {
        let x = vm.cons.x;
        let spaces = "";
        while (++x % 14) {
          spaces += " ";
        }
        vm.cons.print(spaces);
      } else if (terminator !== ";") {
        vm.cons.print("\n");
      }
    }
  },

  LOCATE: {
    args: ["INTEGER", "INTEGER"],
    action: function(vm: VirtualMachine) {
      const col = (<ScalarVariable>vm.stack.pop()).value;
      const row = (<ScalarVariable>vm.stack.pop()).value;
      vm.cons.locate(<number>row, <number>col);
    }
  },

  COLOR: {
    args: ["ANY", "ANY"],
    minArgs: 1,
    action: function(vm: VirtualMachine) {
      const argCount = vm.stack.pop();

      let bg;
      if (argCount == 2) {
        bg = (<ScalarVariable>vm.stack.pop()).value;
      }
      const fg = (<ScalarVariable>vm.stack.pop()).value;
      vm.cons.color(<number>fg, <any>bg);
    }
  },

  READ: {
    // Actually, arguments must be STRING or NUMBER, but there is no way to
    // indicate that to the type checker at the moment.
    args: ["ANY", "ANY"],
    minArgs: 1,
    action: function(vm: VirtualMachine) {
      const argCount = vm.stack.pop();
      const args: any[] = [];
      let i;

      for (i = 0; i < argCount; i++) {
        args.unshift(vm.stack.pop());
      }

      // TODO: out of data error.
      for (i = 0; i < argCount; i++) {
        vm.trace.printf("READ %s\n", vm.data[vm.dataPtr]);
        args[i].value = vm.data[vm.dataPtr++];
        if (args[i].value === null) {
          // user specified ,, in a data statement
          args[i].value = args[i].type.createInstance();
        }
      }
    }
  },

  SCREEN: {
    action: function(vm: VirtualMachine) {
      // TODO: NOT IMPLEMENTED
      vm.stack.pop();
    }
  },

  INPUT: {
    action: function(vm: VirtualMachine) {
      // TODO: Support multiple arguments. Convert strings input by the
      // user to numbers.
      const argCountOrFileNumber = vm.stack.pop();

      if (typeof argCountOrFileNumber === "string") {
        const fileNumber = argCountOrFileNumber as string;
        const variable = vm.stack.pop() as ScalarVariable;
        const file = getFile(fileNumber);

        // const buffer = file.view.file.getBuffer();
        const isLine = vm.stack.pop() as number;
        if (isLine) {
          // variable.value =  splits[file.seekPosition.lineNumber++];
          variable.value = file.buffer.getLineContent(
            file.position.lineNumber++
          );
          return;
        }
        const value = file.buffer.getValue();
        const splits = value.split(/\n/);
        // ToDo : もっとシンプルに！
        const result = splits.slice(file.position.lineNumber);
        variable.value = result.join("\n");
        file.position.lineNumber += result.length;
        return;
      }

      const argCount = argCountOrFileNumber as number;
      const args: any[] = [];

      vm.trace.printf("Argcount=%s\n", argCount);

      for (let i = 0; i < argCount; i++) {
        args.unshift(vm.stack.pop());
      }

      vm.suspend();

      vm.cons.input(function(result: any) {
        vm.resume();
        args[0].value = result;
      });
    }
  },

  SWAP: {
    action: function(vm: VirtualMachine) {
      const lhs = <ScalarVariable>vm.stack.pop();
      const rhs = <ScalarVariable>vm.stack.pop();
      const temp = lhs.value;
      lhs.value = rhs.value;
      rhs.value = temp;
      // TODO: Type checking.
    }
  },

  WIDTH: {
    action: function(vm: VirtualMachine) {
      // TODO: NOT IMPLEMENTED
      vm.stack.pop();
      vm.stack.pop();
    }
  },

  OPEN: {
    action: function(vm: VirtualMachine) {
      const fileNumber = vm.stack.pop() as string;
      const mode = vm.stack.pop() as string;
      const file = vm.stack.pop() as string;

      openFile(file, fileNumber);
    }
  },
  SEEK: {
    action: function(vm: VirtualMachine) {
      const column = vm.stack.pop() as ScalarVariable;
      const lineNumber = vm.stack.pop() as ScalarVariable;
      const fileNumber = vm.stack.pop() as ScalarVariable;

      setSeekPosition(fileNumber.value as string, {
        lineNumber: lineNumber.value as number,
        column: column.value as number
      });
    }
  }
};
