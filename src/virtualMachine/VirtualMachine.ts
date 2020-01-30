﻿import { IStringDictionary } from '../base/common/collections';

import { QBasicProgram, DeriveTypeNameFromVariable } from '../qb';
import { _Console } from '../Console';
import { Instruction } from './Instructions/Instruction';
import { TraceBuffer } from '../TraceBuffer';
import { ArrayVariable } from '../ArrayVariable';
import { StackFrame } from '../StackFrame';
import { ScalarVariable } from '../ScalarVariable';
import { Type } from '../types/Type';
import IConsole from './IConsole';

/**
    The global machine variable points to the current virtual machine, so that
    it can be accessed from the javascript setInterval function. Unfortunately,
    this scheme limits us to one machine at a time.
 */
// var globalMachine: VirtualMachine;

/**
 The VirtualMachine runs the bytecode given to it. It can run in one of two
 modes: Synchronously or Asynchronously.

 In synchronous mode, the program is run to completion before returning from
 the run() function. This can cause a browser window to freeze until execution
 completes.

 In asynchronous mode, a javascript interval is used. Every so often, we run
 some instructions and then stop. That way, the program appears to run while
 letting the user use the browser window.

 @param cons A Console object that will be used as the screen.
 */
/** @constructor */
export class VirtualMachine {
  // Stack
  stack: (number | string | ScalarVariable | ArrayVariable | Type)[] = [];
  // program counter.
  pc = 0;

  // list of StackFrames. The last one is searched for variable references.
  // Failing that, the first one ( the main procedure ) is searched for any
  // shared variables matching the name.
  callstack: StackFrame[] = [];

  // The bytecode (array of Instruction objects)
  instructions: Instruction[] = [];
  // Array of user defined times.
  types: IStringDictionary<Type> = {}; //[] = [];

  // set of names of shared variables.
  shared: any = {};

  // Trace buffer for debugging.
  trace = new TraceBuffer();

  // Index of next data statement to be read.
  dataPtr = 0;

  // Array of strings or numbers from the data statements.
  data: any[] = [];

  // True if we are running asynchronously.
  asyncronous = false;

  // True if the virtual machine is suspended for some reason (for example,
  // waiting for user input)
  private suspended = false; // eg. for INPUT statement.

  // The javascript interval used for running asynchronously.
  interval: number | null = null;

  // Number of milliseconds between intervals
  readonly INTERVAL_MS = 50;

  // Number of instructions to run in an interval
  instructionsPerInterval = 2048;

  //this.debug = true;

  // The last random number generated by a RND function. We have to remember
  // it because RND 0 returns the last one generated.
  lastRandomNumber = 0;

  frame: StackFrame;
  defaultType: Type;
  debug: boolean; // = true;
  asynchronous: boolean;

  private byteCodeBreakpoints: number[] = [];

  constructor(readonly cons: IConsole) {
    // The console.
    // this.cons = cons;

    if (!this.debug) {
      this.printStack = function() {};
      this.trace = <any>{ printf: function() {} };
    }

    // globalMachine = this;
  }

  public isSuspended() {
    return this.suspended;
  }
  /**
   Resets the virtual machine, halting any running program.
   */
  reset(program: QBasicProgram) {
    if (program) {
      this.instructions = program.instructions;
      this.types = program.types;
      this.defaultType = program.defaultType;
      this.data = program.data;
      this.shared = program.shared;
    }

    this.stack = []; // this.stack.length = 0;
    this.callstack = []; //this.callstack.length = 0;
    this.callstack.push(new StackFrame(this.instructions.length));
    this.frame = this.callstack[0];
    this.dataPtr = 0;
    this.suspended = false;

    if (this.interval) {
      window.clearInterval(this.interval);
      this.interval = null;
    }

    this.pc = 0;
    if (program) {
      this.cons.reset(program.testMode);
    } else {
      this.cons.reset();
    }
  }

  /**
   Run a program to completion in synchronous mode, or
   Starts running a program in asynchronous mode.
 
   In asynchronous mode, it returns immediately.
   */
  run(program: QBasicProgram, synchronous: boolean) {
    this.byteCodeBreakpoints = program.getByteCodeBreakpoints();
    this.reset(program);
    this.asynchronous = !synchronous;

    if (synchronous) {
      while (this.pc < this.instructions.length) {
        this.runOneInstruction();
      }
    } else {
      this.interval = window.setInterval(() => {
        /*globalMachine*/ this.runSome();
      }, this.INTERVAL_MS);
    }
  }

  /**
   Suspend the CPU, maintaining all state. This happens when the program
   is waiting for user input.
   */
  suspend() {
    this.suspended = true;
    if (this.asynchronous) {
      window.clearInterval(this.interval);
    }
  }

  /**
   Resume the CPU, after previously being suspended.
   */
  resume() {
    this.suspended = false;
    if (this.asynchronous) {
      this.interval = window.setInterval(() => {
        /*globalMachine.runSome()*/ this.runSome();
      }, this.INTERVAL_MS);
    }
  }

  /**
   Runs some instructions during asynchronous mode.
   */
  runSome() {
    // var start = (new Date()).getTime();
    try {
      for (
        let i = 0;
        i < this.instructionsPerInterval &&
        this.pc < this.instructions.length &&
        !this.suspended;
        i++
      ) {
        const instr = this.instructions[this.pc++];
        if (this.debug) {
          this.trace.printf('Execute [%s] %s\n', this.pc - 1, instr);
        }

        instr.execute(this, instr.arg);

        if (this.byteCodeBreakpoints.includes(this.pc)) {
          this.suspend();
          return;
        }
      }
    } catch (e) {
      //    this.suspend();
      //    dbg.printf("Logic error. VM halted.\n");
      //    dbg.print(this.trace.toString());
    }

    if (this.pc === this.instructions.length) {
      window.clearInterval(this.interval);
    }

    /*
       // adjusting the speed of the simulation during gameplay is a bad idea
        var actualTime = (new Date()).getTime() - start;
        if ( actualTime > this.INTERVAL_MS && this.instructionsPerInterval >
                100) {
            this.instructionsPerInterval -= 100;
        } else if ( actualTime < this.INTERVAL_MS ) {
            this.instructionsPerInterval += 100;
        }
        if ( Math.random() < 0.2 ) {
            dbg.printf("actualTime: %s InstructionsPerInterval=%s\n",
                    actualTime, this.instructionsPerInterval);
        }
    */
  }

  runOneInstruction() {
    const instr = this.instructions[this.pc++];

    // instr.instr.execute(this, instr.arg);
    instr.execute(this, instr.arg);
  }

  setVariable(name: string, value: any) {
    if (this.shared[name]) {
      this.callstack[0].variables[name] = value;
    } else {
      this.frame.variables[name] = value;
    }
  }

  getVariable(name: string) {
    let frame: StackFrame;
    if (this.shared[name]) {
      frame = this.callstack[0];
    } else {
      frame = this.frame;
    }

    if (frame.variables[name]) {
      return frame.variables[name];
    } else {
      // must create variable
      const typeName = DeriveTypeNameFromVariable(name);
      let type: any;
      if (typeName === null) {
        type = this.defaultType;
      } else {
        type = this.types[typeName];
      }

      const scalar = new ScalarVariable(type, type.createInstance());
      frame.variables[name] = scalar;
      return scalar;
    }
  }

  printStack() {
    for (let i = 0; i < this.stack.length; i++) {
      const item = this.stack[i];
      let name = /*getObjectClass*/ item;
      if (name == 'ScalarVariable') {
        name += ' ' + (<any>item).value;
      }
      this.trace.printf('stack[%s]: %s\n', i, name);
    }
  }

  pushScalar(value: number, typeName: string) {
    this.stack.push(new ScalarVariable(this.types[typeName], value));
  }
}
