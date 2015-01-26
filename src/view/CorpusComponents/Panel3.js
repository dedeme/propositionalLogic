/*
 * Copyright 18-Jan-2015 ºDeme
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

/*globals goog, dmjs, corpus, i18n, model */

goog.provide("corpus.Panel3");

goog.require("dmjs.ui");
goog.require("dmjs.It");
goog.require("i18n");
goog.require("model.PropWriter");

/**
 * @constructor
 * @param {!Control} control
 */
corpus.Panel3 = function (control) {
  "use strict";

  var
    $,
    i18,
    tdDemo1,
    tdDemo2,
    ruleArea,
    basesNumber,
    basesArea,
    derivationNumber,
    derivationArea,
    demonstrationTb;


  $ = dmjs.ui.$;
  i18 = [
    ["Basis", "Fundamentos"],
    ["Derivations", "Derivaciones"],
    ["Demonstration", "Demostración"]
  ];
  tdDemo1 = function () {
    return $("td").att("nowrap", "true")
      .att(
        "style",
        "background-color: rgb(235, 235, 235);padding:0px;" +
          "font-family:monospace;font-size: 12px;"
      );
  };
  tdDemo2 = function () {
    return $("td").att("nowrap", "true")
      .att(
        "style",
        "background-color: rgb(230, 230, 230);padding:0px;" +
          "font-family:monospace;font-size: 12px;"
      );
  };

  dmjs.It.from(i18).each(function (e) {
    i18n.get().small.push(e);
  });

  ruleArea = $("textarea").att("readOnly", "true").att("wrap", "off")
    .att(
      "style",
      "width:100%;font-family:monospace;font-size:12px;height:100px;" +
        "resize:none;"
    );
  basesNumber = $("span");
  basesArea = $("textarea").att("readOnly", "true").att("wrap", "off")
    .att(
      "style",
      "width:100%;font-family:monospace;font-size:12px;height:100px;" +
        "resize:none;"
    );
  derivationNumber = $("span");
  derivationArea = $("textarea").att("readOnly", "true").att("wrap", "off")
    .att(
      "style",
      "width:100%;font-family:monospace;font-size:12px;height:100px;" +
        "resize:none;"
    );
  demonstrationTb = $("table").att("width", "100%")
    .att(
      "style",
      "border-collapse:collapse; border: 1px solid rgb(110,130,150);" +
        "font-family:monospace;font-size: 12px;"
    );

  /** @return {!dmjs.DomObject} */
  this.panel = function () {
    return $("div")
      .add($("table").att("style", "width:100%;")
        .add($("tr")
          .add($("td").att("colspan", "5")
            .add($("hr"))))
        .add($("tr")
          .add($("td")
            .add($("span").text(i18n._("Rule") + ":")))
          .add($("td")
            .att("style", "width:175px;padding-left:10px;")
            .add($("span").text(i18n._("Basis") + ": "))
            .add(basesNumber))
          .add($("td")
            .att("style", "width:175px;padding-left:10px;")
            .add($("span").text(i18n._("Derivations") + ": "))
            .add(derivationNumber)))
        .add($("tr")
          .add($("td").add(ruleArea))
          .add($("td")
            .att("style", "width:175px;padding-left:10px;")
            .add(basesArea))
          .add($("td")
            .att("style", "width:175px;padding-left:10px;")
            .add(derivationArea)))
        .add($("tr")
          .add($("td").att("colspan", "5")
            .add($("hr"))))
        .add($("tr")
          .add($("td").att("colspan", "5")
            .add(demonstrationTb))));
  };

  /** */
  this.init = function () {
    basesNumber.text("---");
    derivationNumber.text("---");
    ruleArea.text("");
    basesArea.text("");
    derivationArea.text("");
    demonstrationTb.removeAll().addIt(
      dmjs.It.range(2).map(function (n) {
        if (n) {
          return $("tr").add(tdDemo1().html("&nbsp;"));
        }
        return $("tr").add(tdDemo2().html("&nbsp;"));
      })
    );
  };

  /**
   * Sets widgets when a rule is selected
   * @param {!string} id Rule name.
   */
  this.initRule = function (id) {
    var
      vars,
      corpus,
      entry,
      demo,
      bases,
      derivs,
      writer,
      color;

    vars = control.vars();
    corpus = vars.corpus;
    entry = corpus.entry(id);
    if (entry === undefined) {
      throw ("Rule '" + id + "' is undefined");
    }
    demo = entry.demo();
    bases = demo.allBases(corpus);
    derivs = corpus.derivations(id);
    writer = new model.PropWriter(vars.conf.readerWriterType);

    ruleArea.text(demo.showRule(writer));
    basesNumber.text(bases.length.toString());
    basesArea.text(
      dmjs.It.from(bases).reduce("", function (seed, id) {
        return seed + id + "\n";
      })
    );
    derivationNumber.text(derivs.length.toString());
    derivationArea.text(
      dmjs.It.from(derivs).reduce("", function (seed, id) {
        return seed + id + "\n";
      })
    );
    color = true;
    demonstrationTb.removeAll().addIt(
      demo.showDemonstration(writer).map(function (e) {
        if (color) {
          color = false;
          return $("tr")
            .add(tdDemo1().att("width", "5px").html("&nbsp;&nbsp;"))
            .add(tdDemo1().att("width", "5px")
              .html(e[0].replace(/\s/g, "&nbsp;")))
            .add(tdDemo1().att("width", "5px")
              .html("&nbsp;&nbsp;::&nbsp;&nbsp;"))
            .add(tdDemo1().text(e[1]));
        }
        color = true;
        return $("tr")
          .add(tdDemo2().att("width", "5px").html("&nbsp;&nbsp;"))
          .add(tdDemo2().att("width", "5px")
            .html(e[0].replace(/\s/g, "&nbsp;")))
          .add(tdDemo2().att("width", "5px")
            .html("&nbsp;&nbsp;::&nbsp;&nbsp;"))
          .add(tdDemo2().text(e[1]));
      })
    );
  };

  /** @return {!string} */
  this.derivationNumber = function () {
    return derivationNumber.text();
  };
};
