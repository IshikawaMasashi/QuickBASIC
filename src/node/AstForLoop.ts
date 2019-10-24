import { TreeNode, Location } from "earley";
import { AstConstantExpr } from "./AstConstantExpr";

/** @constructor */
export class AstForLoop {
  constructor(
    public location: Location,
    public identifier: any,
    public startExpr: any,
    public endExpr: AstConstantExpr,
    public stepExpr: AstConstantExpr
  ) {
    // this.locus = locus;
    // this.identifier = identifier;
    // this.startExpr = startExpr;
    // this.endExpr = endExpr;
    // this.stepExpr = stepExpr;
  }

  accept(visitor: any) {
    visitor.visitForLoop(this);
  }
}
