import { Type } from './types/Type';
import { NullType } from './types/NullType';
import Variable from './Variable';

export class ScalarVariable extends Variable {
  /** @constructor */
  public constructor(
    public type: Type,
    public value: number | string | NullType | null
  ) {
    super();
    // this.type = type;
    // this.value = value;
  }

  copy() {
    return new ScalarVariable(this.type, (<any>this.type).copy(this.value));
  }
}
