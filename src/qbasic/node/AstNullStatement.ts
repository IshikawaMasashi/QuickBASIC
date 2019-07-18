import { Locus } from "../Locus";
/** @constructor */
export class AstNullStatement {
    constructor(public locus: Locus) {
        // this.locus = locus;

    }

    accept(visitor: any) {
        visitor.visitNullStatement(this);
    }
}