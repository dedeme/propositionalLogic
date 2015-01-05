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

/*globals goog, dmjs, rule, i18n */

goog.provide("rule.Panel2");

goog.require("dmjs.ui");
goog.require("i18n");

/**
 * @constructor
 * @param {!Control} control
 */
rule.Panel2 = function (control) {
  "use strict";

  var
    tx,
    i18,
    $;

  $ = dmjs.ui.$;
  i18 = [
    ["New proposition", "Nueva proposición"]
  ];

  dmjs.It.from(i18).each(function (e) {
    i18n.get().small.push(e);
  });

  tx = $("textarea")
    .att("style", "width:95%;font-family:monospace;font-size:12px;");

  /** @return {!dmjs.DomObject} */
  this.panel = function () {
    return $("div")
      .add($("table").att("class", "border").att("width", "100%")
        .add($("tr")
          .add($("td").att("align", "left").html(i18n._("New proposition"))))
        .add($("tr")
          .add($("td").att("style", "width:100%;").att("id", "td-panel2-tx")
            .att("align", "left")
            .add(tx))));
  };

  /** @return {!dmjs.DomObject} */
  this.tx = function () { return tx; };

};
