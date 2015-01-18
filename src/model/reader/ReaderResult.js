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

/*globals goog, dmjs, model */

goog.provide("model.ReaderResult");

goog.require("logic1.Prop");
goog.require("model.ReaderError");

/**
 * @constructor
 * @param {!number} position
 * @param {!model.ReaderError | null} error
 * @param {!logic1.Prop.<!string> | null} prop
 */
model.ReaderResult = function (position, error, prop) {
  "use strict";

  /** @return {!number} */
  this.position = function () { return position; };
  /** @return {!model.ReaderError | null} */
  this.error = function () { return error; };
  /** @return {!logic1.Prop.<!string> | null} */
  this.prop = function () { return prop; };
};
