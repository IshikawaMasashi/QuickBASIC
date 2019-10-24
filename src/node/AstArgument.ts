import { TreeNode, Location } from "earley";
import { Type } from "../types/Type";

/** @constructor */
export class AstArgument {
  type: Type = null;
  constructor(
    public location: Location,
    public name: string,
    public typeName: string,
    public isArray: boolean
  ) {
    // this.locus = locus;
    // name of declared subroutine argument.
    // this.name = name;
    // null, or the typename in AS type
    // this.typeName = typeName;
    // is this an open-ended array?
    // this.isArray = isArray;
    // this.type = null; // filled in during type checking.
  }

  accept(visitor: any) {
    visitor.visitArgument(this);
  }
}
