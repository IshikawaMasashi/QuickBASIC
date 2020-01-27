import { Location } from "earley";
import { AstArgument } from "./AstArgument";
import { CodeGenerator } from "../CodeGenerator";
import { TypeChecker } from "../TypeChecker";

export class AstDeclareFunction {
  type: any = null; // calculated later
  hasBody = false; // Set to true during type checking if sub is later
  used = false;
  /** @constructor */
  constructor(
    public location: Location,
    public name: string,
    public args: AstArgument[],
    public isFunction: boolean,
    readonly typeName?: string
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

  accept(visitor: CodeGenerator | TypeChecker) {
    visitor.visitDeclareFunction(this);
  }
}
