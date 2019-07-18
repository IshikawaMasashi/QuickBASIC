import { Locus } from "../Locus";

export class AstWhileLoop {
  /** @constructor */
  constructor(public locus: Locus, public expr: any, public statements: any) {
    // this.locus = locus;
    // this.expr = expr;
    // this.statements = statements;
  }

  accept(visitor: any) {
    visitor.visitWhileLoop(this);
  }
}
