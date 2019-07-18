import { sprintf } from "../qb";

/******************************************************************************
 A GlrState is a state in the LR(0) state machine. Each state consists of one
 or more items.
 *****************************************************************************/
/** @constructor */
export class GlrState {
    static NextGlrStateId = 0;
    id: number;
    items: any = {};
    itemCount = 0;
    next: any = {};
    reductions: any[] = [];
    accept: any;
    constructor() {

        // Identifier, for use in debugging.
        this.id = GlrState.NextGlrStateId++;

        // Set of items.
        // this.items = {};

        // Nunber of items in the set.
        // this.itemCount = 0;

        // GOTO table. Maps character to the next GlrState. If an entry is
        // undefined, then it hasn't been calculated yet. A null entry indicates
        // that the transition has been calculated and is in error (no transition
        // from this state for that character)
        // this.next = {};

        // List of rules which are completed in this state. A rule is complete if
        // its item position is at the end of the rule.
        // this.reductions = [];
    }

    // GlrState.NextGlrStateId = 0;


    /**************************************************************************
    The key is a string which uniquely identifies the state, so we can
    determine if we have already generated this state. We use the identifiers
    of the items' rules, and their positions, concatenated together.
     *************************************************************************/
    key() {
        var list = [];
        for (var key in this.items) {
            if (this.items.hasOwnProperty(key)) {
                list.push(key);
            }
        }
        return list.sort().join("_");
    }

    toString() {
        var str = sprintf("GlrState[%s]:\n", this.id);
        if (this.accept) {
            str += "    ACCEPTING\n";
        }
        str += "....Items:\n";
        for (var item in this.items) {
            if (this.items.hasOwnProperty(item)) {
                str += sprintf("........%s\n", this.items[item]);
            }
        }
        if (this.reductions.length) {
            str += sprintf("....Reduction: %s\n", this.reductions[0]);
        }
        for (var next in this.next) {
            if (this.next.hasOwnProperty(next)) {
                str += sprintf("....GOTO[%s] = [%s]\n", next, this.next[next]);
            }
        }
        return str;
    }
}
