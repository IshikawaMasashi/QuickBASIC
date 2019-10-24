import { Location } from 'earley';
import { Type } from '../types/Type';
/** @constructor */
export class AstBinaryOp {
  type?: Type;
  wantRef?: boolean;
  constructor(
    public location: Location,
    public lhs: any,
    public op: any,
    public rhs: any
  ) {
    // this.locus = locus;
    //this.lhs = lhs;
    //this.op = op;
    //this.rhs = rhs;
  }

  accept(visitor: any) {
    visitor.visitBinaryOp(this);
  }
}
