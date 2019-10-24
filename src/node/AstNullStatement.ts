import { TreeNode, Location } from "earley";
/** @constructor */
export class AstNullStatement {
    constructor(public location: Location) {
        // this.locus = locus;

    }

    accept(visitor: any) {
        visitor.visitNullStatement(this);
    }
}