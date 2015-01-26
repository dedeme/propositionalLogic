/*
 * Copyright 7-Jan-2014 ºDeme
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

/*globals goog, dmjs, model, logic1 */

goog.provide("model.PropWriter");

goog.require("logic1.Prop");
goog.require("cons");

/**
 * @constructor
 * @param {!string} type Can be 'L' (for Lukasiewicz) or 'S' for standard.
 */
model.PropWriter = function (type) {
  "use strict";

  var
    writeL,
    writeO;

  /**
   * @private
   * @param {!logic1.Prop.<!string>} prop
   * @return {!string} A representation of 'prop'
   */
  writeL = function (prop) {
    var
      ps,
      pn,
      pi;

    ps = prop.s();
    if (ps) {
      return ps.p().element();
    }
    pn = prop.n();
    if (pn) {
      return "N" + writeL(pn.p());
    }
    pi = prop.i();
    return "C" + writeL(pi.p()) + writeL(pi.q());
  };

  /**
   * @private
   * @param {!logic1.Prop.<!string>} prop
   * @return {!string} A representation of 'prop'
   */
  writeO = function (prop) {
    var
      ps,
      pn,
      pi,
      pi1;

    ps = prop.s();
    if (ps) {
      return ps.p().element();
    }
    pn = prop.n();
    if (pn) {
      pi = pn.p().i();
      if (pi) {
        return cons.NOT + "(" + writeO(pi) + ")";
      } else {
        return cons.NOT + writeO(pn.p());
      }
    }
    pi = prop.i();
    pi1 = pi.p().i();
    if (pi1) {
      return "(" + writeO(pi1) + ")" + cons.IMP + writeO(pi.q());
    } else {
      return writeO(pi.p()) + cons.IMP + writeO(pi.q());
    }
  };

  /**
   * @param {!logic1.Prop.<!string>} prop
   * @return {!string} A representation of 'prop'
   */
  this.write = function (prop) {
    if (type === "L") {
      return writeL(prop);
    } else if (type === "O") {
      return writeO(prop);
    }

    throw dmjs.str.format("'%0': Type of PropWriter unknown", type);
  };
};
