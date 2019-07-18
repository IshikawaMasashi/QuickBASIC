﻿import { Type } from "./Type";
/** @constructor */
export class SingleType extends Type {
    constructor() {
        super();
        this.name = "SINGLE";
    }


    createInstance() {
        return 0.0;
    }

    copy(value: number) {
        return value;
    }
}