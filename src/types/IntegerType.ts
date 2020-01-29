import { Type } from './Type';

/** @constructor */
export class IntegerType extends Type {
  constructor() {
    super();
    this.name = 'INTEGER';
  }

  createInstance() {
    return 0;
  }

  copy(value: number) {
    return (Math.round(value + 32768) & 65535) - 32768;
  }
}
