import { IStringDictionary } from "./base/common/collections";
import { ScalarVariable } from "./ScalarVariable";

/** @constructor */
export class StackFrame {
    variables: IStringDictionary<ScalarVariable> = {};
    constructor(public pc: number) {
        // Address to return to when the subroutine has ended.
        // this.pc = pc;

        // map from name to the Scalar or Array variable.
        // this.variables = {};
    }
}
