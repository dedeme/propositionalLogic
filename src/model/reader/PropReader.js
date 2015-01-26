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
    readL,
    readO;

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
        new logic1.S(new logic1.SingleProp(s[pos], function (e1, e2) {
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
        new logic1.N(r.prop())
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
        new logic1.I(r.prop(), r2.prop())
      );
    }
    return new model.ReaderResult(
      pos,
      new model.ReaderError("UNEXPECTED", s, pos),
      null
    );
  };

  /**
   * @private
   * @param {!string} s
   * @param {!number} pos
   * @return {!model.ReaderResult}
   */
  readO = function (s, pos) {
    var
      skipBlanks,
      readFirst,
      readBin,
      p,
      r;

    /**
     * @private
     * @param {!string} s
     * @param {!number} pos
     * @return {!number}
     */
    skipBlanks = function (s, pos) {
      if (pos >= s.length) {
        return pos;
      }
      if (/\s/.test(s[pos])) {
        return skipBlanks(s, pos + 1);
      }
      return pos;
    };

    /**
     * @private
     * @param {!string} s
     * @param {!number} pos
     * @return {!model.ReaderResult}
     */
    readFirst = function (s, pos) {
      var
        p,
        r;

      if (cons.singlePropLettersL.indexOf(s[pos]) !== -1) {
        p = new logic1.S(new logic1.SingleProp(s[pos], function (e1, e2) {
          return e1 === e2;
        }));
        return new model.ReaderResult(pos + 1, null, p);
      }
      if (s[pos] === "-") {
        pos = skipBlanks(s, pos + 1);
        if (pos >= s.length) {
          return new model.ReaderResult(
            pos,
            new model.ReaderError("END", s, pos),
            null
          );
        }

        r = readFirst(s, pos);
        p = r.prop();
        if (p) {
          return new model.ReaderResult(
            r.position(),
            null,
            new logic1.N(p)
          );
        }
        return r;
      }
      if (s[pos] === "(") {
        r = readO(s, pos + 1);
        p = r.prop();
        if (p) {
          pos = skipBlanks(s, r.position());
          if (pos >= s.length) {
            return new model.ReaderResult(
              pos,
              new model.ReaderError("PARENT", s, pos),
              null
            );
          }
          if (s[pos] === ")") {
            return new model.ReaderResult(
              pos + 1,
              null,
              p
            );
          }
          return new model.ReaderResult(
            pos,
            new model.ReaderError("PARENT", s, pos),
            null
          );
        }
        return r;
      }
      return new model.ReaderResult(
        pos,
        new model.ReaderError("UNEXPECTED", s, pos),
        null
      );
    };

    /**
     * @private
     * @param {!logic1.Prop.<!string>} prop
     * @param {!string} s
     * @param {!number} pos
     * @return {!model.ReaderResult}
     */
    readBin = function (prop, s, pos) {
      var
        p,
        r;

      if (s[pos] === ">") {
        r = readO(s, pos + 1);
        p = r.prop();

        if (p) {
          return new model.ReaderResult(
            r.position(),
            null,
            new logic1.I(prop, p)
          );
        }
        return r;
      }
      return new model.ReaderResult(
        pos,
        null,
        prop
      );
    };

    pos = skipBlanks(s, pos);

    if (pos >= s.length) {
      return new model.ReaderResult(
        pos,
        new model.ReaderError("END", s, pos),
        null
      );
    }

    r = readFirst(s, pos);
    p = r.prop();

    if (p) {
      pos = skipBlanks(s, r.position());
      if (pos >= s.length) {
        return new model.ReaderResult(
          pos,
          null,
          p
        );
      }
      return readBin(p, s, pos);
    }
    return r;
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
    } else if (type === "O") {
      r = readO(s, 0);
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
