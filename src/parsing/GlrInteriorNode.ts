import { dbg, sprintf } from "../qb";
/** @constructor */
export class GlrInteriorNode {
    parents: any[] = [];
    state: any;
    locus: any;
    constructor(public rnode: any, public rule: any, public ref: any) {
        // this.rnode = rnode;
        this.state = this.rnode.state;
        this.locus = this.rnode.locus;
        // this.rule = rule;
        // this.ref = ref;
        // this.parents = [];
        rnode.inodes.push(this);
    }


    addParent(node: any) {
        var i;
        for (i = 0; i < this.parents.length; i++) {
            if (this.parents[i] === node) {
                break;
            }
        }
        if (i === this.parents.length) {
            this.parents.push(node);
            this.rnode.addParent(node);
            return true;
        }
        return false;
    }

    toString() {
        return sprintf("GlrInteriorNode rule=%s", this.rule);
    }

    evaluate() {
        var cur = this.ref;
        var args = [];
        var locus = this.locus;
        dbg.printf("Eval inode with state [%s]\n", this.state.id);
        for (var i = 0; i < this.rule.symbols.length; i++) {
            locus = cur.locus;
            args.unshift(cur.evaluate());
            cur = cur.parents[cur.parents.length - 1];
        }

        if (this.rule.action) {
            return this.rule.action(args, locus);
        } else if (args.length > 0) {
            return args[0];
        } else {
            return null;
        }
    }
}