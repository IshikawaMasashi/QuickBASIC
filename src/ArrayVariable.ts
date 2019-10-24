import { Dimension } from './Dimension';
import { ScalarVariable } from './ScalarVariable';
import { DoubleType } from './types/DoubleType';
import { IntegerType } from './types/IntegerType';
import { NullType } from './types/NullType';
import { SingleType } from './types/SingleType';
import { StringType } from './types/StringType';
import Variable from './Variable';

/** @constructor */
export class ArrayVariable extends Variable {
  value?: any; // コンパイルを通すため一時的な措置
  values: ScalarVariable[] = [];
  _values: ScalarVariable[] = [];
  constructor(
    public type: DoubleType | IntegerType | NullType | SingleType | StringType,
    public dimensions: Dimension[]
  ) {
    super();
    // this.type = type;
    // this.dimensions = dimensions;
    // this.values = [];
    let totalSize = 1;
    let i;

    for (let i = 0; i < this.dimensions.length; i++) {
      totalSize *= this.dimensions[i].upper - this.dimensions[i].lower + 1;
    }

    for (let i = 0; i < totalSize; i++) {
      this.values.push(
        new ScalarVariable(this.type, this.type.createInstance())
      );
    }
  }

  copy() {
    return this;
  }

  getIndex(indexes: number[]) {
    let mult = 1;
    let index = 0;

    //dbg.printf("Access array indexes: %s\n", indexes);
    for (let i = this.dimensions.length - 1; i >= 0; i--) {
      index += (indexes[i] - this.dimensions[i].lower) * mult;
      mult *= this.dimensions[i].upper - this.dimensions[i].lower + 1;
    }
    return index;
  }

  assign(indexes: number[], value: ScalarVariable) {
    let index = this.getIndex(indexes);
    //dbg.printf("Assign %s to array index %d\n", value, index);
    this.values[index] = value;
  }

  access(indexes: number[] /*, value*/) {
    let index = this.getIndex(indexes);
    //dbg.printf("access array index %d\n", index);

    return this.values[index];
  }
}
