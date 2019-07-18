import { Locus } from "../Locus";
import { Type } from "../types/Type";
/** @constructor */
export class AstTypeMember {
    type?: Type;
    constructor(public locus: Locus, public name: any, public typeName: any) {
        // this.locus = locus;
        // this.name = name;
        // this.typeName = typeName;
    }

    accept(visitor: any) {
        visitor.visitTypeMember(this);
    }
}
