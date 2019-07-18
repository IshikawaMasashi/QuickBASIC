import { Locus } from "../Locus";
import { AstVariableReference } from "./AstVariableReference";

/** @constructor */
export class AstAssignStatement {
    constructor(public locus: Locus, public lhs: AstVariableReference, public expr: any) {
        // this.locus = locus;
        // this.lhs = lhs; // could be a referenceList
        // this.expr = expr;
    }

    accept(visitor: any) {
        visitor.visitAssignStatement(this);
    }
}