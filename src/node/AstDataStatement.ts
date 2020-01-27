import { Location } from "earley";
import { AstConstantExpr } from "./AstConstantExpr";
import { CodeGenerator } from "../CodeGenerator";
import { TypeChecker } from "../TypeChecker";

/** @constructor */
export class AstDataStatement {
  constructor(public location: Location, public data: AstConstantExpr[]) {
    // this.locus = locus;
    // this.data = data;
  }

  accept(visitor: CodeGenerator | TypeChecker) {
    visitor.visitDataStatement(this);
  }
}
