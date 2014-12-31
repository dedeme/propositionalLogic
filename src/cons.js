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

  session = new dmjs.Session(ns.appName() + "-Session", 900);
  /** return {!dmjs.Session} */
  ns.session = function () { return session; };

}(cons));