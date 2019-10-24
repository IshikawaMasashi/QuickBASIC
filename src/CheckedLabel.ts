import { AstLabel } from './node/AstLabel';

/** @constructor */
export class CheckedLabel {
  constructor(public name: string, public astNode: AstLabel) {
    // this.name = name;
    // this.astNode = astNode;
  }
}
