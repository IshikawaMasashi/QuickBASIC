import { Locus } from "../Locus";
/** @constructor */
export class AstConstStatement {
    constructor(public locus: Locus, /*identifier*/public name: string, public expr: any) {
        // this.locus = locus;
        // this.name = identifier;
        // this.expr = expr;
    }

    accept(visitor: any) {
        visitor.visitConstStatement(this);
    }
}