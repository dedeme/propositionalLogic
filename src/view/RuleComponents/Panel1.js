/*
 * Copyright 5-Jan-2015 ºDeme
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

goog.provide("rule.Panel1");

goog.require("dmjs.ui");
goog.require("i18n");

/**
 * @constructor
 * @param {!Control} control
 */
rule.Panel1 = function (control) {
  "use strict";

  var
    mkBt,
    supBt,
    impBt,
    ruleBt,
    stepsTx,
    i18,
    $;

  mkBt = function (value) {
    return $("button").text(value).att("style", "width:65px;");
  };

  $ = dmjs.ui.$;
  i18 = [
    ["Sup.", "Sup."],
    ["Imp.", "Imp."],
    ["Rule", "Regla"],
    ["Propositions (index)", "Proposiciones (índices)"],
    ["e.g.: \"1,3,6,3\"", "p.e.: \"1,3,6,3\""]
  ];

  dmjs.It.from(i18).each(function (e) {
    i18n.get().small.push(e);
  });

  supBt = mkBt(i18n._("Sup.")).on(function (peer) {
    peer.onclick = function () { control.addSupose(); };
  });
  impBt = mkBt(i18n._("Imp.")).on(function (peer) {
    peer.onclick = function () { control.addImply(); };
  });
  ruleBt = mkBt(i18n._("Rule")).on(function (peer) {
    peer.onclick = function () { control.addRule(); };
  });

  stepsTx = $("input").att("type", "field").att("style", "width:210px;");

  /** @return {!dmjs.DomObject} */
  this.panel = function () {
    return $("div")
      .add($("table").att("class", "border")
        .add($("tr")
          .add($("td").add(supBt))
          .add($("td").add(impBt))
          .add($("td").add(ruleBt)))
        .add($("tr")
          .add($("td").att("colspan", 3).text(i18n._("Propositions (index)"))))
        .add($("tr")
          .add($("td").att("colspan", 3).add(stepsTx)))
        .add($("tr")
          .add($("td").att("colspan", 3).att("style", "color:#a9a9a9;")
            .html("<i>" + i18n._("e.g.: \"1,3,6,3\"") + "</i>"))));
  };

  /** @return {!dmjs.DomObject} */
  this.stepsTx = function () { return stepsTx; };
};
