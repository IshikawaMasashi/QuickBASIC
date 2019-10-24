import { Location } from 'earley';
import { AstSubroutine } from './AstSubroutine';

/** @constructor */
export class AstProgram {
  subs: AstSubroutine[];
  constructor(public location: Location, mainSub: AstSubroutine) {
    // this.locus = locus;
    this.subs = [mainSub];
  }

  accept(visitor: any) {
    visitor.visitProgram(this);
  }
}
