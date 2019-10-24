import { TreeNode, Location } from "earley";
import { AstArgument } from "./AstArgument";
/** @constructor */
export class AstDeclareFunction {
  type: any = null; // calculated later
  hasBody = false; // Set to true during type checking if sub is later
  used = false;
  constructor(
    public location: Location,
    public name: string,
    public args: AstArgument[],
    public isFunction: boolean
  ) {
    // this.locus = locus;
    // this.name = name;
    // this.args = args; // array of AstArgument
    // this.isFunction = isFunction;
    this.type = null; // calculated later
    this.hasBody = false; // Set to true during type checking if sub is later
    // implemented.
    this.used = false;
  }

  accept(visitor: any) {
    visitor.visitDeclareFunction(this);
  }
}
