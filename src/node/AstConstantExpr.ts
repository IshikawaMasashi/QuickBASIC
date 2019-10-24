import { TreeNode, Location } from "earley";
import { Type } from "../types/Type";

/** @constructor */
export class AstConstantExpr {
  type: Type;
  wantRef: boolean;
  constructor(public location: Location, public value: any) {
    // this.locus = locus;
    // value is possibly null, eg. for first parameter of "COLOR , 7"
    // this.value = value;
  }

  accept(visitor: any) {
    visitor.visitConstantExpr(this);
  }
}
