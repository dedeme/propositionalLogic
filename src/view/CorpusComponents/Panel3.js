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

/*globals goog, dmjs, corpus, i18n */

goog.provide("corpus.Panel3");

goog.require("dmjs.ui");
goog.require("dmjs.It");
goog.require("i18n");
goog.require("func");
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
    ruleArea,
    basesNumber,
    basesArea,
    derivationNumber,
    derivationArea,
    demonstrationArea;


  $ = dmjs.ui.$;
  i18 = [
    ["Basis", "Fundamentos"],
    ["Derivations", "Derivaciones"],
    ["Demonstration", "Demostración"]
  ];

  dmjs.It.from(i18).each(function (e) {
    i18n.get().small.push(e);
  });

  ruleArea = $("textarea").att("readOnly", "true").att("wrap", "off")
    .att(
      "style",
      "width:100%;font-family:monospace;font-size:12px;height:100px;" +
        "resize:none;"
    )
  basesNumber = $("span");
  basesArea = $("textarea").att("readOnly", "true").att("wrap", "off")
    .att(
      "style",
      "width:100%;font-family:monospace;font-size:12px;height:100px;" +
        "resize:none;"
    )
  derivationNumber = $("span");
  derivationArea = $("textarea").att("readOnly", "true").att("wrap", "off")
    .att(
      "style",
      "width:100%;font-family:monospace;font-size:12px;height:100px;" +
        "resize:none;"
    )

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


    );
  };

  /** */
  this.init = function () {
    basesNumber.text("---");
    derivationNumber.text("---");
    ruleArea.text("");
    basesArea.text("");
    derivationArea.text("");
  }

  /**
   * Sets widgets when a rule is selected
   * @param {!string} id Rule name.
   */
  this.initRule = function (id) {
    var
      vars,
      corpus,
      entry,
      rule,
      demo,
      bases,
      derivs,
      writer;

    vars = control.vars();
    corpus = vars.corpus;
    entry = corpus.entry(id);
    if (entry === undefined) {
      throw ("Rule '" + id + "' is undefined");
    }
    rule = entry.rule();
    demo = entry.demo();
    bases = demo.allBases(corpus);
    derivs = corpus.derivations(id);
    writer = new model.PropWriter(vars.conf.readerWriterType);

    ruleArea.text(func.writeRule(writer, rule));
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

  };

};
