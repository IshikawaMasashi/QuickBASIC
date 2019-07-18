import { Locus } from "../Locus";

/** @constructor */
export class AstNextStatement {
    constructor(public locus: Locus, /*identifierList*/public identifiers: any) {
        // this.locus = locus;
        // this.identifiers = identifierList;
    }

    accept(visitor: any) {
        visitor.visitNextStatement(this);
    }
}