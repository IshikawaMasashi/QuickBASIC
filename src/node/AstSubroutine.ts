import { Location } from 'earley';
import { AstArgument } from './AstArgument';
import { TypeChecker } from '../TypeChecker';
import { CodeGenerator } from '../CodeGenerator';
/** @constructor */
export class AstSubroutine {
  constructor(
    public location: Location,
    public name: string,
    public args: AstArgument[],
    public /*statementList*/ statements: any,
    public isFunction: boolean,
    public isStatic?: boolean,
    readonly typeName?: string
  ) {
    // this.locus = locus;
    // this.name = name;
    // this.args = args;
    // this.statements = statementList;
    // this.isFunction = isFunction;
    // this.isStatic = isStatic;
  }

  accept(visitor: CodeGenerator | TypeChecker) {
    visitor.visitSubroutine(this);
  }
}
