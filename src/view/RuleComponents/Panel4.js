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

/*globals goog, dmjs, rule, i18n, cons */

goog.provide("rule.Panel4");

goog.require("dmjs.ui");
goog.require("i18n");
goog.require("cons");

/**
 * @constructor
 * @param {!Control} control
 */
rule.Panel4 = function (control) {
  "use strict";

  var
    nameTx,
    viewDemo,
    viewRule,
    addBt,
    tx,
    i18,
    $;

  $ = dmjs.ui.$;

  i18 = [
    ["Demonstration (name):", "Demostración (nombre):"],
    ["View", "Ver"],
    ["Demonstration", "Demostración"],
    ["Rule", "Regla"],
    ["Add to \"Corpus\"", "Añadir al \"Corpus\""]
  ];

  dmjs.It.from(i18).each(function (e) {
    i18n.get().small.push(e);
  });

  nameTx = $("input").att("type", "field").att("style", "width:200px;");
  viewDemo = $("input").att("type", "radio").att("name", "view");
  viewRule = $("input").att("type", "radio").att("name", "view");
  addBt = $("button").text(i18n._("Add to \"Corpus\""))
    .att("style", "width:150px;");
  tx = $("textarea").att("readOnly", "true")
    .att(
      "style",
      "width:95%;font-family:monospace;font-size:12px;height:450px"
    ).value(cons.SA + cons.HL +
    " p\n" + cons.VL + "  q\n" +
    cons.IA + cons.HL + " Epq");

  /** @return {!dmjs.DomObject} */
  this.panel = function () {
    return $("div")
      .add($("table").att("class", "border").att("width", "100%")
        .add($("tr")
          .add($("td")
            .add($("span").html(i18n._("Demonstration (name):") + "<br>"))
            .add(nameTx))
          .add($("td")
              .add($("table").att("class", "border").att("width", "250px")
                .add($("tr")
                  .add($("td").att("align", "center").att("colspan", "2")
                    .html(i18n._("View") + "<br>")))
                .add($("tr")
                  .add($("td").att("width", "50%").att("align", "left")
                    .add(viewDemo)
                    .add($("span").text(i18n._("Demonstration"))))
                  .add($("td").att("width", "50%").att("align", "left")
                    .add(viewRule)
                    .add($("span").text(i18n._("Rule")))))))
          .add($("td").att("nowrap", "true").att("valign", "bottom")
            .add(addBt))
          .add($("td").att("width", "100%")))
        .add($("tr")
          .add($("td").att("colspan", "4")
            .add(tx))));
  };
};
