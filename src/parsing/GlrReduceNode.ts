import { TreeNode, Location } from 'earley';
import { dbg, sprintf } from '../qb';
import { GlrInteriorNode } from './GlrInteriorNode';

/** @constructor */
export class GlrReduceNode {
  parents: any[] = [];
  inodes: any[] = [];
  constructor(public location: Location, public state: any) {
    // this.locus = locus;
    // this.state = state;
    // this.parents = [];
    // this.inodes = [];
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

  getINode(rule: any, ref: any) {
    for (var i = 0; i < this.inodes.length; i++) {
      if (this.inodes[i].rule === rule && this.inodes[i].ref === ref) {
        return this.inodes[i];
      }
    }
    dbg.printf(
      'Create new inode with state [%s] rule=%s and ref=[%s]\n',
      this.state.id,
      rule,
      ref.state.id
    );
    var inode = new GlrInteriorNode(this, rule, ref);
    return inode;
  }

  toString() {
    return sprintf(
      'GlrReduceNode state=[%s] inodes=%s parents=%s',
      this.state.id,
      this.inodes.length,
      this.parents.length
    );
  }

  evaluate() {
    // choose any inode and return its value.
    if (this.inodes.length > 1) {
      dbg.printf('Uh oh! Choice of inodes [%s]...\n', this.state.id);
    }
    return this.inodes[0].evaluate();
  }
}
