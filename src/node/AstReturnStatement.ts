import { Location } from 'earley';
import { CodeGenerator } from '../CodeGenerator';
import { TypeChecker } from '../TypeChecker';

export class AstReturnStatement {
  /** @constructor */
  constructor(public location: Location, public value?: any) {}

  accept(visitor: CodeGenerator | TypeChecker) {
    visitor.visitReturnStatement(this);
  }
}
