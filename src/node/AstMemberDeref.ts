import { Location } from 'earley';
import { Type } from '../types/Type';

/** @constructor */
export class AstMemberDeref {
  type: Type;
  wantRef?: boolean;
  constructor(
    public location: Location,
    public lhs: any,
    public identifier: any
  ) {
    // this.locus = locus;
    // this.lhs = lhs;
    // this.identifier = identifier;
  }

  accept(visitor: any) {
    visitor.visitMemberDeref(this);
  }
}
