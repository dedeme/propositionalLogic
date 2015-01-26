/*
 * Copyright 31-dic-2014 ºDeme
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

/*globals goog, dmjs, func:true, cons */

/** Global functions */
goog.provide("func");

goog.require("dmjs.cryp");
goog.require("dmjs.It");
goog.require("cons");

(function (ns) {
  'use strict';

  var
    demePass;

  /**
   * Returns the key of a password
   * @param {!string} pass
   * @return {!string}
   */
  ns.getK = function (pass) {
    return dmjs.cryp.keyCryp(
      dmjs.cryp.keyCryp(
        dmjs.cryp.keyCryp(pass, 200).substring(100),
        200
      ).substring(100),
      200
    );
  };

  demePass = ns.getK("deme");

  /**
   * @return {!string} The password of 'deme'
   */
  ns.demePass = function () {
    return demePass;
  };

  /**
   * @param {!number} indent
   * @param {!string} p
   */
  ns.writeSupose = function (indent, p) {
    return dmjs.It.range(indent).reduce("", function (seed, e) {
      /*jslint unparam:true */
      return seed + cons.VL;
    }) + cons.SA + cons.HL + " " + p;
  };

  /**
   * @param {!number} indent
   * @param {!string} p
   */
  ns.writeAssertion = function (indent, p) {
    return dmjs.It.range(indent).reduce("", function (seed, e) {
      /*jslint unparam:true */
      return seed + cons.VL;
    }) + "  " + p;
  };

  /**
   * @param {!number} indent
   * @param {!string} p
   */
  ns.writeConclusion = function (indent, p) {
    return dmjs.It.range(indent).reduce("", function (seed, e) {
      /*jslint unparam:true */
      return seed + cons.VL;
    }) + cons.IA + cons.HL + " " + p;
  };

  /**
   * @param {!model.PropWriter} writer
   * @param {!logic1.Rule.<!string>} rule
   */
  ns.writeRule = function (writer, rule) {
    var
      r;

    r = "";

    dmjs.It.from(rule.premises()).each(function (p) {
      r += cons.HL + cons.HL + " " + writer.write(p) + "\n";
    });
    r += cons.CONCLUSION + cons.HL  + " " + writer.write(rule.conclusion());
    return r;
  };

}(func));
