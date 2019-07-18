import { Locus } from "../Locus";
/** @constructor */
export class AstRestoreStatement {
    constructor(public locus: Locus, public label: string) {
        // this.locus = locus;
        // label can be null
        //this.label = label;
    }

    accept(visitor: any) {
        visitor.visitRestoreStatement(this);
    };
}