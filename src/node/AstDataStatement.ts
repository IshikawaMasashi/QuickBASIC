import { TreeNode, Location } from "earley";
import { AstConstantExpr } from "./AstConstantExpr";

/** @constructor */
export class AstDataStatement {
  constructor(public location: Location, public data: AstConstantExpr[]) {
    // this.locus = locus;
    // this.data = data;
  }

  accept(visitor: any) {
    visitor.visitDataStatement(this);
  }
}
