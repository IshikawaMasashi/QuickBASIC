﻿import { Type } from './types/Type';
import { IStringDictionary } from './base/common/collections';
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
//#include <Types.js>
//#include <debug.js>
//#include <qbasic.js>
/** @constructor */
export class TypeScope {
  names: IStringDictionary<Type> = {};
  constructor() {
    // map from names to type objects.
    // this.names = {};
  }
}
