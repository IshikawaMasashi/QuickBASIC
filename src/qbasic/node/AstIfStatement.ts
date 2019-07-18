import { Locus } from "../Locus";
/** @constructor */
export class AstIfStatement {
    constructor(public locus: Locus, public expr: any, public statements: any, public elseStatements: any) {
        //this.locus = locus;
        //this.expr = expr;
        //this.statements = statements;
        //this.elseStatements = elseStatements;
    }

    accept(visitor: any) {
        visitor.visitIfStatement(this);
    }
}