import { Location } from 'earley';

/** @constructor */
export class AstEndStatement {
  constructor(public location: Location) {
    //this.locus = locus;
  }

  accept(visitor: any) {
    visitor.visitEndStatement(this);
  }
}
