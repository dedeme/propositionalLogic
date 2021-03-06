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

/*globals goog, dmjs, cons */

/** Global constants */
goog.provide("cons");

goog.require("dmjs.Session");

(function (ns) {
  "use strict";

  var
    session;

  /** return {!string} */
  ns.appName = function () { return "propositionalLogic"; };

  session = new dmjs.Session(ns.appName() + "-Session", 86400);
  /** return {!dmjs.Session} */
  ns.session = function () { return session; };

  /**
   * &#9484;
   * @const @type {!string}
   */
  ns.SA = String.fromCharCode(9484);
  /**
   * &#9492;
   * @const @type {!string}
   */
  ns.IA = String.fromCharCode(9492);
  /**
   * &#9472;
   * @const @type {!string}
   */
  ns.HL = String.fromCharCode(9472);
  /**
   * &#9474;
   * @const @type {!string}
   */
  ns.VL = String.fromCharCode(9474);
  /**
   * &#9500;
   * @const @type {!string}
   */
  ns.CONCLUSION = String.fromCharCode(9500);
  /**
   * &#9472;&#9654;
   * @const @type {!string}
   */
  ns.IMP = String.fromCharCode(9472) + String.fromCharCode(9654);
  /**
   * &#9664;&#9472;&#9654;
   * @const @type {!string}
   */
  ns.DIMP = String.fromCharCode(9664) +
    String.fromCharCode(9472) + String.fromCharCode(9654);
  /**
   * &#8743;
   * @const @type {!string}
   */
  ns.AND = String.fromCharCode(8743);
  /**
   * &#8744;
   * @const @type {!string}
   */
  ns.OR = String.fromCharCode(8744);
  /**
   * &#8802;
   * @const @type {!string}
   */
  ns.XOR = String.fromCharCode(8802);
  /**
   * &#172;
   * @const @type {!string}
   */
  ns.NOT = String.fromCharCode(172);

  /** @const @type {!string} Simbols Lukasiewicz notation. ("pqrst") */
  ns.singlePropLettersL = "pqrst";

  /** @const @type {!string} Simbols Ordinary notation. ("pqrst") */
  ns.singlePropLettersO = "pqrst";

}(cons));
