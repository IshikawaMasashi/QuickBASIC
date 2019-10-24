import { Location } from 'earley';
import { Type } from '../types/Type';

/** @constructor */
export class AstUnaryOperator {
  type?: Type;
  wantRef?: boolean;
  constructor(public location: Location, public op: string, public expr: any) {
    // this.locus = locus;
    // this.op = op;
    // this.expr = expr;
  }

  accept(visitor: any) {
    visitor.visitUnaryOperator(this);
  }
}
