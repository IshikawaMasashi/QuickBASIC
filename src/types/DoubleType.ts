import { Type } from "./Type";

/** @constructor */
export class DoubleType extends Type {
    constructor() {
        super();
        this.name = "DOUBLE";
    }
    createInstance() {
        return 0.0;
    }

    copy(value: number) {
        return value;
    }
}