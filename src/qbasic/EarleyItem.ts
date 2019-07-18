import { Locus } from "./Locus";
import { Rule } from "./Rule";
import { Token } from "./Token";
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
//#include <debug.js>
var NextId = 0;
/** @constructor */
export class EarleyItem {
    public id = NextId++;
    constructor(
        public rule: Rule,
        public pos: number,
        public base: number,
        public token?: Token | EarleyItem,
        public prev?: EarleyItem,
        public locus?: Locus) {
    }


    toString() {
        var str = "[" + this.id + "] " + this.rule.name + ":";
        for (var i = 0; i < this.rule.symbols.length; i++) {
            if (i == this.pos) {
                str += " .";
            }
            str += " " + this.rule.symbols[i];
        }

        if (i == this.pos) {
            str += " .";
        }
        str += ", " + this.base;
        if (this.token instanceof Token) {
            str += ", token=" + this.token.text;
        } else if (this.token) {
            str += ", rule=" + this.token.rule;
        }
        if (this.prev) {
            str += ", prev=" + this.prev.id;
        }
        return str;
    }
}