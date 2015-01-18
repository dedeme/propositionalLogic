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

/*globals goog, dmjs, rule, i18n, view, model, func */

goog.provide("rule.Panel3");

goog.require("dmjs.ui");
goog.require("view.Menu2");
goog.require("i18n");
goog.require("func");

/**
 * @constructor
 * @param {!Control} control
 */
rule.Panel3 = function (control) {
  "use strict";

  var
    $,
    i18,
    ruleDiv,
    ruleDiv2;

  $ = dmjs.ui.$;

  i18 = [
    ["Delete", "Borrar"]
  ];

  dmjs.It.from(i18).each(function (e) {
    i18n.get().small.push(e);
  });

  ruleDiv = $("div").att("style", "text-align:center")
    .text("---");
  ruleDiv2 = $("div").att("style", "text-align:left")
    .text("");

  /** @return {!dmjs.DomObject} */
  this.panel = function () {
    var
      vars,
      delBt,
      corpusTree;

    vars = control.vars();

    delBt = $("button").text(i18n._("Delete"))
      .att("style", control.rule().stepsTx().att("style"));
    delBt.peer.onclick = function () { control.del(); };

    corpusTree = new view.Menu2(
      control.vars().corpus.tree(),
      function (e) {
        ruleDiv.text(e);
        if (e === "---") {
          ruleDiv2.text("");
        } else {
          ruleDiv2.html(
            "<pre>" +
              func.writeRule(
                new model.PropWriter(vars.conf.readerWriterType),
                vars.corpus.rule(e)
              ) +
              "</pre>"
          );
        }
      }
    );

    return $("div")
      .add($("p").add(delBt))
      .add($("hr"))
      .add($("p").att("style", "text-align:left")
        .add($("span").html(i18n._("Rule") + ":"))
          .add($("div").att("class", "frame2")
            .add(ruleDiv)
            .add($("hr"))
            .add(ruleDiv2)))
      .add($("p")
        .add($("span").html("<i>" + i18n._("Corpus") + "</i>"))
        .add(corpusTree.show()));

  };

  /** @return {!string} "---" or selected rule. */
  this.selected = function () {
    return ruleDiv.text();
  };
};
