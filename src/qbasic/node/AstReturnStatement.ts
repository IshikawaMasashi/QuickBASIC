import { Locus } from "../Locus";
/** @constructor */
export class AstReturnStatement {
    constructor(public locus: Locus, public value?: any) {
        // this.locus = locus;
        // this.value = value;
    }

    accept(visitor: any) {
        visitor.visitReturnStatement(this);
    }
}