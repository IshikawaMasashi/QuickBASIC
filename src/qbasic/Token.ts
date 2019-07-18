import { Locus } from "./Locus";
/** @constructor */
export class Token {
    locus: Locus;
    constructor(public id: string | {}, public text: string, line: number, position: number) {
        this.locus = new Locus(line, position);
    }
    toString() {
        return "Token(" + this.text + ")";
    }

}