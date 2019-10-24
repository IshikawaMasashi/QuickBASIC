import { TreeNode, Location } from "earley";
/** @constructor */
export class AstSelectStatement {
    constructor(public location: Location, public expr: any, public cases: any) {
        // this.locus = locus;
        // this.expr = expr;
        // this.cases = cases;
    }

    accept(visitor: any) {
        visitor.visitSelectStatement(this);
    }
}