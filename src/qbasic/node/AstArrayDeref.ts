﻿import { Locus } from "../Locus";
import { Type } from "../types/Type";

/** @constructor */
export class AstArrayDeref {
    type: Type | null = null; // calculated during type checking.
    constructor(public locus: Locus, public expr: any, public parameters: any) {
        // this.locus = locus;
        // this.expr = expr;
        // this.parameters = parameters;
        // this.type = null; // calculated during type checking.
    }

    accept(visitor: any) {
        visitor.visitArrayDeref(this);
    }
}
