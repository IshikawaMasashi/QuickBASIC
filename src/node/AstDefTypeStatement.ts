import { TreeNode, Location } from "earley";


/** @constructor */
export class AstDefTypeStatement {
    constructor(public location: Location, public typeName: string) {
        // this.locus = locus;
        // this.typeName = typeName;
    }

    accept(visitor: any) {
        visitor.visitDefTypeStatement(this);
    }
}