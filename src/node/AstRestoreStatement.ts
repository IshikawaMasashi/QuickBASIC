import { TreeNode, Location } from 'earley';
/** @constructor */
export class AstRestoreStatement extends TreeNode {
  constructor(location: Location, public label: string) {
    super(location);
    // this.locus = locus;
    // label can be null
    //this.label = label;
  }

  accept(visitor: any) {
    visitor.visitRestoreStatement(this);
  }
}
