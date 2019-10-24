import { Location } from 'earley';

/** @constructor */
export class AstUserType {
  constructor(
    public location: Location,
    public name: any,
    public members: any
  ) {
    // this.locus = locus;
    // this.name = name;
    // this.members = members;
  }

  accept(visitor: any) {
    visitor.visitUserType(this);
  }
}
