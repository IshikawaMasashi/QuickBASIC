import { IStringDictionary } from './base/common/collections';
import { ScalarVariable } from './ScalarVariable';
import { ArrayVariable } from './ArrayVariable';

export interface IStackFrame {
  pc: number;
}

/** @constructor */
export class StackFrame implements IStackFrame {
  public variables: IStringDictionary<ScalarVariable | ArrayVariable> = {};
  constructor(readonly pc: number) {
    // Address to return to when the subroutine has ended.
    // this.pc = pc;
    // map from name to the Scalar or Array variable.
    // this.variables = {};
  }
}
