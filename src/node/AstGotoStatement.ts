import { TreeNode, Location } from "earley";
/** @constructor */
export class AstGotoStatement {
  constructor(public location: Location, public label: string) {
    // this.locus = locus;
    // this.label = label;
  }

  accept(visitor: any) {
    visitor.visitGotoStatement(this);
  }
}
