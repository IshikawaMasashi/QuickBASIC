/** @constructor */

export class LoopContext {
  constructor(
    public counter: number,
    public forLabel: number,
    public nextLabel: number,
    public endLabel: number
  ) {
    // In a DO or WHILE loop, only endLabel is valid.
    //this.counter = counter;
    //this.forLabel = forLabel;
    //this.nextLabel = nextLabel;
    //this.endLabel = endLabel;
  }
}
