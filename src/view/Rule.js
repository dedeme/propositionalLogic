/*
 * Copyright 30-Dic-2014 ºDeme
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

/*globals goog, dmjs, view, i18n, rule */

/** Rule editor */
goog.provide("view.Rule");

goog.require("dmjs.ui");
goog.require("i18n");
goog.require("rule.Panel1");
goog.require("rule.Panel2");
goog.require("rule.Panel3");
goog.require("rule.Panel4");

/**
 * @constructor
 * @param {!Control} control
 */
view.Rule = function (control) {
  "use strict";

  var
    pn1,
    pn2,
    pn3,
    pn4;

  /**
   * Show Rule editor
   */
  this.show = function () {
    var
      $,
      td,
      table;

    $ = dmjs.ui.$;
    td = "padding:0px 10px 0px 10px;";

    pn1 = new rule.Panel1(control);
    pn2 = new rule.Panel2(control);
    pn3 = new rule.Panel3(control);
    pn4 = new rule.Panel4(control);

    table = $("table").att("width", "100%")
      .add($("tr")
        .add($("td").att("style", "width:5px;height:5px;")
          .att("nowrap", "true").att("valign", "top")
          .att("rowspan", "2")
          .add(pn1.panel()))
        .add($("td").att("valign", "top")
          .add(pn2.panel())))
      .add($("tr")
        .add($("td").att("rowspan", "2").att("valign", "top")
          .add(pn4.panel())))
      .add($("tr")
        .add($("td").att("style", "width:5px;height:500px;")
          .att("align", "center").att("valign", "top").att("nowrap", "true")
          .add(pn3.panel())));


    control.mainDiv().removeAll()
      .add($("table")
        .att("class", "border")
        .att("width", "100%")
        .att("style",
          "background-color: #f8f8f8;" +
          "border-collapse: collapse;")
        .add(view.menu.create(control, view.menu.RULE()))
        .add($("tr")
          .add($("td")
            .att("colspan", view.menu.optionNumber().toString())
            .att("style", td)
            .add(table))));

    pn4.init();
    pn2.tx().peer.focus();
  };

  /** @return {!dmjs.DomObject} TextArea with new proposition */
  this.newProp = function () { return pn2.tx(); };

  /** @return {!dmjs.DomObject} TextField with setep numbers */
  this.stepsTx = function () { return pn1.stepsTx(); };

  /** @return {!dmjs.DomObject} Area with demonstration */
  this.demoTx = function () { return pn4.tx(); };

  /** @return {!dmjs.DomObject} Area with demonstration */
  this.idTx = function () { return pn4.id(); };

  /** @return {!string} Selected rule */
  this.selectedRule = function () { return pn3.selected(); };

};
