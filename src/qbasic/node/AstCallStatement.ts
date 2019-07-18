import { Locus } from "../Locus";

/** @constructor */
export class AstCallStatement {
    constructor(public locus: Locus, public name: string, public args: any) {
        // this.locus = locus;
        // this.name = name;
        // this.args = args;
    }

    accept(visitor: any) {
        visitor.visitCallStatement(this);
    }
}