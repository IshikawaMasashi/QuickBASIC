import { Locus } from "../Locus";

/** @constructor */
export class AstUserType {
    constructor(public locus: Locus, public name: any, public members: any) {
        // this.locus = locus;
        // this.name = name;
        // this.members = members;
    }

    accept(visitor: any) {
        visitor.visitUserType(this);
    }
}