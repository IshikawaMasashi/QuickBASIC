﻿import { Locus } from "../Locus";
import { IRangeVisitor } from "../IVisitor";

/** @constructor */
export class AstRange {
    constructor(public locus: Locus, public lowerExpr: any, public upperExpr: any) {
        // this.locus = locus;
        // lower and upper are possibly equal. in this case, we should avoid
        // evaluating the expression twice.
        // this.lowerExpr = lowerExpr;
        // this.upperExpr = upperExpr;
    }

    accept(visitor: IRangeVisitor) {
        visitor.visitRange(this);
    }
}