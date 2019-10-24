import { Location } from 'earley';
/** @constructor */
export class AstPrintUsingStatement {
  constructor(
    public location: Location,
    public exprList: any,
    public terminator: ';' | ','
  ) {
    // this.locus = locus;
    // this.exprList = exprList; // array of expressions. The first is used as the
    // format string.
    // this.terminator = terminator; // literal ';', ',', or null
  }

  accept(visitor: any) {
    visitor.visitPrintUsingStatement(this);
  }
}
