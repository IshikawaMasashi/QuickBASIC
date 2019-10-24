/** @constructor */
export class CheckedLoopContext {
  constructor(public type: 'FOR' | 'DO' | 'WHILE', public counter: string) {
    // "FOR", "DO"
    // this.type = type;
    // variable name
    // this.counter = counter;
  }
}
