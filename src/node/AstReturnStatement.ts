import { Location } from 'earley';
/** @constructor */
export class AstReturnStatement {
  constructor(public location: Location, public value?: any) {
    // this.locus = locus;
    // this.value = value;
  }

  accept(visitor: any) {
    visitor.visitReturnStatement(this);
  }
}
