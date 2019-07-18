import { Locus } from "../Locus";
/** @constructor */
export class AstSelectStatement {
    constructor(public locus: Locus, public expr: any, public cases: any) {
        // this.locus = locus;
        // this.expr = expr;
        // this.cases = cases;
    }

    accept(visitor: any) {
        visitor.visitSelectStatement(this);
    }
}