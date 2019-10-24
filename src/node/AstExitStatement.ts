import { TreeNode, Location } from "earley";

/** @constructor */
export class AstExitStatement {
    constructor(public location: Location, public what: "FOR" | "DO") {
        // this.locus = locus;
        // this.what = what; // "FOR" or "DO"
    }

    accept(visitor: any) {
        visitor.visitExitStatement(this);
    }
}