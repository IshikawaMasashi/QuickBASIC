import { TreeNode, Location } from "earley";
import { Type } from "../types/Type";

export class AstWhileLoop extends TreeNode {
  /** @constructor */
  constructor(location: Location, public expr: any, public statements: any) {
    super(location);
    // this.locus = locus;
    // this.expr = expr;
    // this.statements = statements;
  }

  accept(visitor: any) {
    visitor.visitWhileLoop(this);
  }
}
