import { Locus } from "../Locus";
import { AstSubroutine } from "./AstSubroutine";

/** @constructor */
export class AstProgram {
    subs: AstSubroutine[];
    constructor(public locus: Locus, mainSub: AstSubroutine) {
        this.locus = locus;
        this.subs = [mainSub];
    }

    accept(visitor: any) {
        visitor.visitProgram(this);
    }
}