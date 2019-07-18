import { Locus } from "../Locus";

/** @constructor */
export class AstExitStatement {
    constructor(public locus: Locus, public what: "FOR" | "DO") {
        // this.locus = locus;
        // this.what = what; // "FOR" or "DO"
    }

    accept(visitor: any) {
        visitor.visitExitStatement(this);
    }
}