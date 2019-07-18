import { Locus } from "../Locus";


/** @constructor */
export class AstDefTypeStatement {
    constructor(public locus: Locus, public typeName: string) {
        // this.locus = locus;
        // this.typeName = typeName;
    }

    accept(visitor: any) {
        visitor.visitDefTypeStatement(this);
    }
}