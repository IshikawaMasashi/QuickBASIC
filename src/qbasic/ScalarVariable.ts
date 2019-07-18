import { Type } from "./types/Type";
import { NullType } from "./types/NullType";

/** @constructor */
export class ScalarVariable {
    public constructor(public type: Type, public value: number | string | NullType | null) {
        // this.type = type;
        // this.value = value;
    }

    copy() {
        return new ScalarVariable(this.type, (<any>this.type).copy(this.value));
    }
}