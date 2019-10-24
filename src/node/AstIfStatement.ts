import { TreeNode, Location } from "earley";
/** @constructor */
export class AstIfStatement {
  constructor(
    readonly location: Location,
    readonly expr: any,
    readonly statements: any,
    readonly elseStatements: any
  ) {
    //this.locus = locus;
    //this.expr = expr;
    //this.statements = statements;
    //this.elseStatements = elseStatements;
  }

  accept(visitor: any) {
    visitor.visitIfStatement(this);
  }
}
