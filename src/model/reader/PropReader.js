/*
 * Copyright 6-Jan-2014 ºDeme
 *
 * This file is part of 'propositionalLogic'.
 *
 * 'propositionalLogic' is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License.
 *
 * 'propositionalLogic' is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with 'propositionalLogic'.  If not, see <http://www.gnu.org/licenses/>.
 */

/*globals goog, dmjs, model, logic1, cons */

goog.provide("model.PropReader");

goog.require("logic1.SingleProp");
goog.require("logic1.Prop");
goog.require("dmjs.str");
goog.require("model.ReaderResult");
goog.require("cons");

/**
 * @constructor
 * @param {!string} type Can be 'L' (for Lukasiewicz) or 'S' for standard.
 */
model.PropReader = function (type) {
  "use strict";

  var
    readL;

  /**
   * @private
   * @param {!string} s
   * @param {!number} pos
   * @return {!model.ReaderResult}
   */
  readL = function (s, pos) {
    var
      r,
      r2;

    if (pos >= s.length) {
      return new model.ReaderResult(
        pos,
        new model.ReaderError("END", s, pos),
        null
      );
    }
    if (/\s/.test(s[pos])) {
      return readL(s, pos + 1);
    }
    if (cons.singlePropLettersL.indexOf(s[pos]) !== -1) {
      return new model.ReaderResult(
        pos + 1,
        null,
        logic1.Prop.s(new logic1.SingleProp(s[0], function (e1, e2) {
          return e1 === e2;
        }))
      );
    }
    if (s[pos] === "N") {
      r = readL(s, pos + 1);
      if (r.error()) {
        return r;
      }
      return new model.ReaderResult(
        r.position(),
        null,
        logic1.Prop.n(r.prop())
      );
    }
    if (s[pos] === "C") {
      r = readL(s, pos + 1);
      if (r.error()) {
        return r;
      }
      r2 = readL(s, r.position());
      if (r2.error()) {
        return r2;
      }
      return new model.ReaderResult(
        r2.position(),
        null,
        logic1.Prop.i(r.prop(), r2.prop())
      );
    }
    return new model.ReaderResult(
      pos,
      new model.ReaderError("UNEXPECTED", s, pos),
      null
    );
  };

  /**
   * Reads a proposition.
   * @param {!string} s Its value is 'trimized'
   * @return {!model.ReaderResult}
   */
  this.read = function (s) {
    var
      r;

    if (type === "L") {
      r = readL(s, 0);
    } else {
      throw dmjs.str.format("'%0': Type of PropReader unknown", type);
    }
    if (r.error()) {
      return r;
    }
    if (r.position() !== s.length) {
      return new model.ReaderResult(
        r.position(),
        new model.ReaderError("NOT_END", s, r.position()),
        null
      );
    }
    return r;
  };

};
