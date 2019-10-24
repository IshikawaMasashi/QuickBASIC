import { TreeNode, Location } from "earley";
/** @constructor */
export class AstConstStatement {
  constructor(
    public location: Location,
    /*identifier*/ public name: string,
    public expr: any
  ) {
    // this.locus = locus;
    // this.name = identifier;
    // this.expr = expr;
  }

  accept(visitor: any) {
    visitor.visitConstStatement(this);
  }
}
