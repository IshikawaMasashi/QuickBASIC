import { Type } from "./Type";
/** @constructor */

export class NullType extends Type {
    constructor() {
        super();
        // used to denote the absense of a parameter in system calls.
        this.name = ":NULL";
    }
    createInstance(): any{
        return null;
    }
    copy(value: NullType) {
        return value;
    }
}
