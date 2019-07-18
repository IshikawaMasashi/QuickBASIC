import { Locus } from "./Locus";

/**
    Copyright 2010 Steve Hanov

    This file is part of qb.js

    qb.js is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    qb.js is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with qb.js.  If not, see <http://www.gnu.org/licenses/>.
*/
//#include <Tokenizer.js>
//#include <debug.js>
var NextRuleId = 0;

// ----------------------------------------------------------------------------
// Construct a rule object.
// ----------------------------------------------------------------------------
/** @constructor */
export class Rule {
  readonly id = NextRuleId++;
  constructor(readonly name: string, readonly symbols: string[], readonly action?: (args: any, locus: Locus) => any) {
    // this.id = NextRuleId++;

    // Name of the rule.
    // this.name = name;

    // array of symbols. If the symbol begins with ' then it is a regular
    // expression. Otherwise, it is the name of another rule. The array
    // may not be null. For an empty rule, use a zero-length array.
    // this.symbols = symbols;

    // The action. May be undefined.
    // this.action = action;
  }

  // ----------------------------------------------------------------------------
  // Returns string representation of a rule for debugging.
  // ----------------------------------------------------------------------------


  public toString() {
    let str = this.name + ":";

    for (var i = 0; i < this.symbols.length; i++) {
      str += " " + this.symbols[i];
    }

    if (0 && this.action) {
      // this prints out the whole function which can be undesirable.
      str += " action=" + this.action;
    }

    return str;
  }
}
