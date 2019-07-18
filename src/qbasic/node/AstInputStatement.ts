import { Locus } from "../Locus";
/** @constructor */
export class AstInputStatement {
    constructor(readonly locus: Locus, public promptExprOrfileNumber: any, public printQuestionMark: any, public identifiersOrReference: any, readonly isLine = false) {
        // this.locus = locus;
        // this.promptExpr = promptExpr; // can be null.
        // this.printQuestionMark = printQuestionMark;
        // this.identifiers = identifiers; // actually we will only use the first one.
    }

    accept(visitor: any) {
        visitor.visitInputStatement(this);
    }
}