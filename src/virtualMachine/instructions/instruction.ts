import { VirtualMachine } from "../VirtualMachine";

export abstract class Instruction<T = any> {
  addrLabel?: boolean;
  dataLabel?: boolean;
  name: string;
  numArgs?: number;
  arg?: T;

  abstract execute(vm: VirtualMachine, arg: T): void;

  public toString() {
    if (this.numArgs === 0) {
      return this.name;
    }
    // if (this.arg) {
    return this.name + " " + this.arg;
    // }

    // return this.name;
  }
}
