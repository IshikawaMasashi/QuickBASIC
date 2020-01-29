import { Type } from './Type';

export class SingleType extends Type {
  /** @constructor */
  constructor() {
    super();
    this.name = 'SINGLE';
  }

  createInstance() {
    return 0.0;
  }

  copy(value: number) {
    return value;
  }
}
