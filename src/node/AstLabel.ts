import { TreeNode, Location } from "earley";
/** @constructor */
export class AstLabel {
  constructor(public location: Location, public label: string) {
    // this.locus = locus;
    // this.label = label;
  }

  accept(visitor: any) {
    visitor.visitLabel(this);
  }
}
