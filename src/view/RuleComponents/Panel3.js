/*
 * Copyright 5-Jan-2014 ºDeme
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

/*globals goog, dmjs, rule */

goog.provide("rule.Panel3");

goog.require("dmjs.ui");
goog.require("i18n");

/**
 * @constructor
 * @param {!Control} control
 */
rule.Panel3 = function (control) {
  "use strict";

  var
    $;

  $ = dmjs.ui.$;

  /** @return {!dmjs.DomObject} */
  this.panel = function () {
    return $("div")
      .add($("table").att("class", "border")
      );

  };
};
