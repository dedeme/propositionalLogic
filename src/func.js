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

/*globals goog, dmjs, func:true */

/** Global functions */
goog.provide("func");

goog.require("dmjs.cryp");

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

}(func));
