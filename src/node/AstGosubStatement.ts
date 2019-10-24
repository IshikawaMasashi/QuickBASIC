import { TreeNode, Location } from "earley";

/** @constructor */
export class AstGosubStatement {
  constructor(public location: Location, public label: string) {
    // this.locus = locus;
    // this.label = label;
  }

  accept(visitor: any) {
    visitor.visitGosub(this);
  }
}
