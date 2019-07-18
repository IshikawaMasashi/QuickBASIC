import { Locus } from "../Locus";
import { AstConstantExpr } from "./AstConstantExpr";

/** @constructor */
export class AstDataStatement {
    constructor(public locus: Locus, public data: AstConstantExpr[]) {
        // this.locus = locus;
        // this.data = data;
    }

    accept(visitor: any) {
        visitor.visitDataStatement(this);
    }
}
