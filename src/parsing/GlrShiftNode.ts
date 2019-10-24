import { sprintf } from '../qb';
import { TreeNode, Location } from 'earley';
/** @constructor */
export class GlrShiftNode {
  constructor(
    public location: Location,
    public state: any,
    public parents: any,
    public text: any
  ) {
    // this.locus = locus;
    // this.text = text;
    // this.state = state;
    // this.parents = parents;
  }

  addParent(node: any) {
    for (var i = 0; i < this.parents.length; i++) {
      if (this.parents[i] === node) {
        return false;
      }
    }
    this.parents.push(node);
    return true;
  }

  toString() {
    return sprintf('GlrShiftNode state=[%s] text=%s', this.state.id, this.text);
  }

  evaluate() {
    return this.text;
  }
}
