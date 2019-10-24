import { Type } from "./Type";

/** @constructor */
export class StringType extends Type {
    constructor() {
        super();
        this.name = "STRING";
    }


    createInstance() {
        return "";
    }

    copy(value: string) {
        return value;
    }
}
