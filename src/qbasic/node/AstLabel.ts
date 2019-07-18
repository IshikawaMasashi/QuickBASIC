import { Locus } from "../Locus";

/** @constructor */
export class AstLabel {
    constructor(public locus: Locus, public label: string) {
        // this.locus = locus;
        // this.label = label;
    }

    accept(visitor: any) {
        visitor.visitLabel(this);
    }
}