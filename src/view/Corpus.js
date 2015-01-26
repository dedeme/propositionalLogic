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

/*globals goog, dmjs, i18n, view , corpus*/

/** Corpus editor */
goog.provide("view.Corpus");

goog.require("dmjs.ui");
goog.require("i18n");
goog.require("corpus.Panel1");
goog.require("corpus.Panel2");
goog.require("corpus.Panel3");

/**
 * @constructor
 * @param {!Control} control
 */
view.Corpus = function (control) {
  "use strict";

  var
    pn1,
    pn2,
    pn3;

  /**
   * Show Corpus editor
   */
  this.show = function () {
    var
      $,
      td,
      table;

    $ = dmjs.ui.$;
    td = "padding:0px 10px 0px 10px;";

    pn1 = new corpus.Panel1(control);
    pn2 = new corpus.Panel2(control);
    pn3 = new corpus.Panel3(control);

    table = $("table").att("width", "100%")
      .add($("tr")
        .add($("td").att("style", "width:200px;")
          .att("nowrap", "true").att("valign", "top").att("align", "center")
          .att("rowspan", "2")
          .add(pn1.panel()))
        .add($("td").att("valign", "top")
          .add(pn2.panel())))
      .add($("tr")
        .add($("td").att("valign", "top")
          .add(pn3.panel())));


    control.mainDiv().removeAll()
      .add($("table")
        .att("class", "border")
        .att("width", "100%")
        .att("style",
          "background-color: #f8f8f8;" +
          "border-collapse: collapse;")
        .add(view.menu.create(control, view.menu.CORPUS()))
        .add($("tr")
          .add($("td")
            .att("colspan", view.menu.optionNumber().toString())
            .att("style", td)
            .add(table))));

    pn1.init();
    pn2.init();
    pn3.init();
  };

  /** @return {!corpus.Panel2} */
  this.pn2 = function () {
    return pn2;
  };

  /** @return {!corpus.Panel3} */
  this.pn3 = function () {
    return pn3;
  };

  /** @return {!view.Menu2} */
  this.corpusTree = function () {
    return pn1.corpusTree();
  };

  /** @return {!string} */
  this.selectedRule = function () {
    return pn2.selectedRule();
  };

  /** @return {!string} */
  this.derivationNumber = function () {
    return pn3.derivationNumber();
  };

};
