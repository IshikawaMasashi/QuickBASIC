import { Locus } from "../Locus";
import { AstArgument } from "./AstArgument";
/** @constructor */
export class AstSubroutine {
    constructor(public locus: Locus, public name: string, public args: AstArgument[], public  /*statementList*/statements: any, public isFunction: any, public isStatic?: boolean) {
        // this.locus = locus;
        // this.name = name;
        // this.args = args;
        // this.statements = statementList;
        // this.isFunction = isFunction;
        // this.isStatic = isStatic;
    }


    accept(visitor: any) {
        visitor.visitSubroutine(this);
    }
}