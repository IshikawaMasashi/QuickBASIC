import { Type } from "./Type";

export class DoubleType extends Type {
  /** @constructor */
  constructor() {
    super();
    this.name = "DOUBLE";
  }
  createInstance() {
    return 0.0;
  }

  copy(value: number) {
    return value;
  }
}
