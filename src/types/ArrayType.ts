import { Type } from './Type';

/** @constructor */
export class ArrayType extends Type {
  constructor(public elementType: Type) {
    super();
    //this.elementType = elementType;
    this.name = 'ARRAY OF ' + elementType.name;
  }
}
