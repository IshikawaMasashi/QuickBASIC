import { VirtualMachine } from "../VirtualMachine";

export abstract class Instruction {
    addrLabel?: boolean;
    dataLabel?: boolean;
    name: string;
    numArgs?: number;
    arg?: any;

    abstract execute(vm: VirtualMachine, arg: any): void;

    toString() {
        if (this.numArgs === 0) {
            return this.name;
        } else {
            return this.name + " " + this.arg;
        }
    }
}
