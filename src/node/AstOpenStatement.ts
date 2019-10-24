import { Location } from 'earley';
// import { AstConstantExpr } from "./AstConstantExpr";

/** @constructor */
export class AstOpenStatement {
  constructor(
    public location: Location,
    public expr: any,
    public mode: 'INPUT' | 'OUTPUT',
    public fileNumber: any
  ) {
    // this.locus = locus;
    // this.identifier = identifier;
    // this.startExpr = startExpr;
    // this.endExpr = endExpr;
    // this.stepExpr = stepExpr;
  }

  accept(visitor: any) {
    visitor.visitOpenStatement(this);
  }
}
