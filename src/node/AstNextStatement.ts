import { TreeNode, Location } from "earley";

/** @constructor */
export class AstNextStatement {
  constructor(
    public location: Location,
    /*identifierList*/ public identifiers: any
  ) {
    // this.locus = locus;
    // this.identifiers = identifierList;
  }

  accept(visitor: any) {
    visitor.visitNextStatement(this);
  }
}
