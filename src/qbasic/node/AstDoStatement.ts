
import { IDoStatementVisitor } from "../IVisitor";
import { Locus } from "../Locus";

//enum DoType {
//}

/** @constructor */
export class AstDoStatement {
    static readonly INFINITE = 1;
    static readonly UNTIL = 2;
    static readonly WHILE_AT_END = 3;
    constructor(public locus: Locus, public statements: any, public expr: any, public type: any) {
        // this.locus = locus;
        // this.statements = statements;
        // this.expr = expr;
        // this.type = type;
    }

    //AstDoStatement.INFINITE = 1;
    //AstDoStatement.UNTIL = 2;
    //AstDoStatement.WHILE_AT_END = 3;

    accept(visitor: IDoStatementVisitor) {
        visitor.visitDoStatement(this);
    }
}