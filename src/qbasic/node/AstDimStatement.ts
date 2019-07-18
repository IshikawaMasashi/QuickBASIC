import { Locus } from "../Locus";
/** @constructor */
export class AstDimStatement {
    shared = false; // changed to true during parsing.
    constructor(public locus: Locus, /*identifier*/public name: any, public ranges: any, public typeName: any) {
        // this.locus = locus;
        // this.name = identifier;
        // this.ranges = ranges; // list of AstRange
        // this.typeName = typeName; // possibly null
        // this.shared = false; // changed to true during parsing.
    }

    accept(visitor: any) {
        visitor.visitDimStatement(this);
    }
}