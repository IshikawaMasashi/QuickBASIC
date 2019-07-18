import { Locus } from "../Locus";
import { Type } from "../types/Type";

/** @constructor */
export class AstVariableReference {
    type?: Type;
    wantRef?: boolean;
    constructor(public locus: Locus, public name: string) {
        // this.locus = locus;
        // this.name = name;
    }

    accept(visitor: any) {
        visitor.visitVariableReference(this);
    }
}
