import { TreeNode, Location } from "earley";
import { AstVariableReference } from "./AstVariableReference";

/** @constructor */
export class AstAssignStatement {
  constructor(
    public location: Location,
    public lhs: AstVariableReference,
    public expr: any
  ) {
    // this.locus = locus;
    // this.lhs = lhs; // could be a referenceList
    // this.expr = expr;
  }

  accept(visitor: any) {
    visitor.visitAssignStatement(this);
  }
}
