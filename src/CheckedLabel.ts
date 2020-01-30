import { AstLabel } from './node/AstLabel';

/** @constructor */
export class CheckedLabel {
  constructor(readonly name: string, readonly astNode: AstLabel) {
    // this.name = name;
    // this.astNode = astNode;
  }
}
