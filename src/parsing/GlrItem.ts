﻿/**
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
/******************************************************************************
 A GlrItem represents a rule and a position within that rule. It is used to
 build a state in an LR(0) state machine. Each state consists of one or more
 items.
 *****************************************************************************/
/** @constructor */
export class GlrItem {
  key: any;
  constructor(public rule: any, public position: any) {
    // this.rule = rule;
    // this.position = position;
    this.key = 'r' + this.rule.id + '_' + this.position;
  }

  toString() {
    var str = this.rule.name + ':';
    for (var i = 0; i < this.rule.symbols.length; i++) {
      if (i == this.position) {
        str += ' .';
      }
      str += ' ' + this.rule.symbols[i];
    }
    if (this.position == this.rule.symbols.length) {
      str += ' .';
    }
    return str;
  }
}
