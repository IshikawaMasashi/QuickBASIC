﻿import { dbg, sprintf } from './qb';
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
//#include <Types.js>

export class TraceBuffer {
  readonly MAX_LINES = 200;
  lines: string[] = [];
  /** @constructor */
  constructor() {}

  toString() {
    return this.lines.join('');
  }

  printf(...args: any[]) {
    //var args = [];
    //for (var i = 0; i < arguments.length; i++) {
    //    args.push(arguments[i]);
    //}
    const str = sprintf(args);
    this.lines.push(str);
    if (this.lines.length > this.MAX_LINES) {
      this.lines.shift();
    }
    dbg.printf('%s', str);
  }
}
