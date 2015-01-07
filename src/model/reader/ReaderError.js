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

goog.provide("model.ReaderError");

goog.require("dmjs.str");
goog.require("dmjs.It");
goog.require("i18n");

/**
 * @constructor
 * @param {!string} type
 * @param {!string} s
 * @param {!number} position
 */
model.ReaderError = function (type, s, position) {
  "use strict";

  var
    i18;

  i18 = [
    ["Unknown error", "Error desconocido"],
    ["Unexpected end of proposition", "Inesperado fin de la proposición"],
    ["Extra characters", "Carácteres extra"],
    ["Unexpected symbol", "Símbolo inesperado"]
  ];

  dmjs.It.from(i18).each(function (e) {
    i18n.get().small.push(e);
  });

  /** @return {!number} */
  this.position = function () { return position; };

  this.message = function () {
    var
      err;


    if (type === "END") {
      err = i18n._("Unexpected end of proposition");
    } else if (type === "NOT_END") {
      err = i18n._("Extra characters");
    } else if (type === "UNEXPECTED") {
      err = i18n._("Unexpected symbol");
    } else {
      err = i18n._("Unknown error");
    }
    return dmjs.str.format(
      "%0.\n%1\n%2",
      err,
      s,
      dmjs.It.range(position).reduce("", function (seed, e) {
        return seed + s[e];
      }) + "^"
    );
  };
};
