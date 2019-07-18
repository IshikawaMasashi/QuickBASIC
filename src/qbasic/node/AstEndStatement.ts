import { Locus } from "../Locus";

/** @constructor */
export class AstEndStatement {
    constructor(public locus: Locus) {
        //this.locus = locus;

    }

    accept(visitor: any) {
        visitor.visitEndStatement(this);
    }
}