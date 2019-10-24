import { TreeNode, Location } from "earley";
import { Type } from "../types/Type";

/** @constructor */
export class AstTypeMember extends TreeNode {
  type?: Type;
  constructor(location: Location, public name: any, public typeName: any) {
    super(location);
    // this.locus = locus;
    // this.name = name;
    // this.typeName = typeName;
  }

  accept(visitor: any) {
    visitor.visitTypeMember(this);
  }
}
