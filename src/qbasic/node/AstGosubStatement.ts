import { Locus } from "../Locus";


/** @constructor */
export class AstGosubStatement {
    constructor(public locus: Locus, public label: string) {
        // this.locus = locus;
        // this.label = label;
    }

    accept(visitor: any) {
        visitor.visitGosub(this);
    }
}