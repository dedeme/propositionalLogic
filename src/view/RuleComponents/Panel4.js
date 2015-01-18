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
    setValues,
    nameTx,
    viewDemo,
    viewRule,
    addBt,
    undoBt,
    redoBt,
    tx,
    i18,
    $;

  $ = dmjs.ui.$;

  i18 = [
    ["Rule name:", "Nombre de la regla:"],
    ["View", "Ver"],
    ["Demonstration", "Demostración"],
    ["Rule", "Regla"],
    ["Add to \"Corpus\"", "Añadir al \"Corpus\""],
    ["Undo", "Deshacer"],
    ["Redo", "Rehacer"]
  ];

  dmjs.It.from(i18).each(function (e) {
    i18n.get().small.push(e);
  });

  nameTx = $("input").att("type", "field").att("style", "width:200px;");
  viewDemo = $("input").att("type", "radio").att("name", "view");
  viewDemo.peer.checked = true;
  viewDemo.peer.onclick = function () { control.viewDemo(); };
  viewRule = $("input").att("type", "radio").att("name", "view");
  viewRule.peer.onclick = function () { control.viewRule(); };
  addBt = $("button").text(i18n._("Add to \"Corpus\""))
    .att("style", "width:170px;");
  addBt.peer.onclick = function () { control.addCorpus(); };
  undoBt = $("button").text(i18n._("Undo"))
    .att("style", "width:80px;");
  undoBt.peer.onclick = function () { control.undo(); };
  redoBt = $("button").text(i18n._("Redo"))
    .att("style", "width:80px;");
  redoBt.peer.onclick = function () { control.redo(); };
  tx = $("textarea").att("readOnly", "true")
    .att(
      "style",
      "width:95%;font-family:monospace;font-size:12px;height:450px"
    );

  /** @return {!dmjs.DomObject} */
  this.panel = function () {
    return $("div")
      .add($("table").att("class", "border").att("width", "100%")
        .add($("tr")
          .add($("td")
            .add($("span").html(i18n._("Rule name:") + "<br>"))
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
            .add($("table")
              .add($("tr")
                .add($("td").att("align", "center")
                  .add(undoBt))
                .add($("td").att("align", "center")
                  .add(redoBt)))
              .add($("tr")
                .add($("td").att("colspan", "2")
                  .add(addBt)))))
          .add($("td").att("width", "100%")))
        .add($("tr")
          .add($("td").att("colspan", "4")
            .add(tx))));
  };

  /** Intializations */
  this.init = function () {
    var
      /** @private @type {!model.Demo} */
      demo,
      /** @private @type {!model.PropWriter} */
      writer;
      ;

    demo = control.vars().demo;
    writer = new model.PropWriter(control.vars().conf.readerWriterType);

    if (viewDemo.peer.checked) {
      tx.value(demo.show(writer));
    } else {
      tx.value(demo.showRule(writer));
    }

    viewRule.peer.disabled = !demo.canUndo() ||
      demo.steps()[demo.steps().length - 1].sup();
    undoBt.peer.disabled = !demo.canUndo();
    redoBt.peer.disabled = !demo.canRedo();
    addBt.peer.disabled = viewRule.peer.disabled;
  };

  /** @return {!dmjs.DomObject} Area with demonstration */
  this.tx = function () {
    return tx;
  };

  /** @return {!dmjs.DomObject} Id texfield */
  this.id = function () {
    return nameTx;
  };

};
