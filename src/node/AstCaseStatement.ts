import { Location } from 'earley';

/** @constructor */
export class AstCaseStatement {
  constructor(
    public location: Location,
    public exprList: any,
    public statements: any
  ) {
    // this.locus = locus;
    // if exprList is empty, this is case Else
    // this.exprList = exprList;
    // this.statements = statements;
  }

  accept(visitor: any) {
    visitor.visitCaseStatement(this);
  }
}
