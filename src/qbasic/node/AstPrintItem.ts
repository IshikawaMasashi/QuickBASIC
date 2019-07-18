import { Locus } from "../Locus";

/** @constructor */
export class AstPrintItem {
    static readonly EXPR = 0;
    static readonly TAB = 1;
    constructor(public locus: Locus, public type: number, public expr: any, public terminator: any) {
        // this.locus = locus;
        // Type: 0 for expr, 1 for tab, in which case expr is the argument.
        // this.type = type;

        // this.expr = expr; // can be null!
        // this.terminator = terminator; // comma, semicolon, or nothing.
    }

    // AstPrintItem.EXPR = 0;
    // AstPrintItem.TAB = 1;

    accept(visitor: any) {
        visitor.visitPrintItem(this);
    }
}
