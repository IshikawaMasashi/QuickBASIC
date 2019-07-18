import { Locus } from "../Locus";
import { AstConstantExpr } from "./AstConstantExpr";

/** @constructor */
export class AstForLoop {
    constructor(public locus: Locus, public identifier: any, public startExpr: any, public endExpr: AstConstantExpr, public stepExpr: AstConstantExpr) {
        // this.locus = locus;
        // this.identifier = identifier;
        // this.startExpr = startExpr;
        // this.endExpr = endExpr;
        // this.stepExpr = stepExpr;
    }

    accept(visitor: any) {
        visitor.visitForLoop(this);
    }
}