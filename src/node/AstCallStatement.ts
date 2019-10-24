import { Location } from 'earley';

/** @constructor */
export class AstCallStatement {
  constructor(
    public location: Location,
    public name: string,
    public args: any
  ) {
    // this.locus = locus;
    // this.name = name;
    // this.args = args;
  }

  accept(visitor: any) {
    visitor.visitCallStatement(this);
  }
}
