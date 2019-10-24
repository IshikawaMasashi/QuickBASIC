import { Type } from './Type';

/** @constructor */
export class AnyType extends Type {
  constructor() {
    super();
    this.name = 'ANY';
  }
}
