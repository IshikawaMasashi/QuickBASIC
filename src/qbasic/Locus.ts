/**
  Represents a location in the source file. (The name "location" cannot be used
  because it has a special meaning in browsers.) This is used throughout the
  compiler to map program statements to token positions.

  @constructor 
 */
export class Locus {
    constructor(readonly line: number, readonly position: number) { }
    toString() {
        return "" + (this.line + 1) + ":" + (this.position + 1);
    }
}
