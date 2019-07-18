import { Dimension } from "./Dimension";
import { ScalarVariable } from "./ScalarVariable";
import { DoubleType } from "./types/DoubleType";
import { IntegerType } from "./types/IntegerType";
import { NullType } from "./types/NullType";
import { SingleType } from "./types/SingleType";
import { StringType } from "./types/StringType";

/** @constructor */
export class ArrayVariable {
    values: ScalarVariable[] = [];
    constructor(public type: DoubleType | IntegerType | NullType | SingleType | StringType, public dimensions: Dimension[]) {
        // this.type = type;
        // this.dimensions = dimensions;
        // this.values = [];
        var totalSize = 1;
        var i;

        for (i = 0; i < this.dimensions.length; i++) {
            totalSize *= this.dimensions[i].upper - this.dimensions[i].lower + 1;
        }

        for (i = 0; i < totalSize; i++) {
            this.values.push(new ScalarVariable(this.type, this.type.createInstance()));
        }
    }

    copy() {
        return this;
    }

    getIndex(indexes: number[]) {
        var mult = 1;
        var index = 0;

        //dbg.printf("Access array indexes: %s\n", indexes);
        for (var i = this.dimensions.length - 1; i >= 0; i--) {
            index += (indexes[i] - this.dimensions[i].lower) * mult;
            mult *= this.dimensions[i].upper - this.dimensions[i].lower + 1;
        }
        return index;
    }

    assign(indexes: number[], value: ScalarVariable) {
        var index = this.getIndex(indexes);
        //dbg.printf("Assign %s to array index %d\n", value, index);
        this.values[index] = value;
    }

    access(indexes: number[]/*, value*/) {
        var index = this.getIndex(indexes);
        //dbg.printf("access array index %d\n", index);
        
        return this.values[index];
    }
}