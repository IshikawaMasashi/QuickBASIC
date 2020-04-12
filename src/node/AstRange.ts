import { Location } from 'earley';
import { CodeGenerator } from '../CodeGenerator';
import { TypeChecker } from '../TypeChecker';

/** @constructor */
export class AstRange {
  constructor(
    public location: Location,
    public lowerExpr: any,
    public upperExpr: any
  ) {
    // this.locus = locus;
    // lower and upper are possibly equal. in this case, we should avoid
    // evaluating the expression twice.
    // this.lowerExpr = lowerExpr;
    // this.upperExpr = upperExpr;
  }

  accept(visitor: CodeGenerator | TypeChecker) {
    visitor.visitRange(this);
  }
}
