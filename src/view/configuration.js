/*
 * Copyright 30-dic-2014 ºDeme
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

/*globals goog, dmjs, view, io, i18n */

/** Configuration page */
goog.provide("view.configuration");

goog.require("dmjs.ui");
goog.require("dmjs.It");
goog.require("i18n");
goog.require("view.menu");

(function (ns) {
  'use strict';

  /**
   * Shows page.
   * @param {!Control} control
   */
  ns.show = function (control) {
    var
      $,
      /** @private @type {!Vars} */
      vars,
      /** @private @type {Conf} */
      conf,
      pn1,
      td;

    $ = dmjs.ui.$;
    vars = control.vars();
    conf = vars.conf;
    td = "padding:0px 10px 0px 10px;";


    pn1 = $("table")
      .att("class", "border")
      .att("align", "center")
      .att("style",
        "background-color: #f8f8ff;" +
        "border-collapse: collapse;")
      .add($("tr")
        .add($("td").att("style", td + "text-align:right;")
          .html(i18n._("Change Password")))
        .add($("td").att("style", td + "color: #000080")
          .add(dmjs.ui.link(function () {
            control.goChangePassword();
          }).html(i18n._("Change")))))
      .add($("tr")
        .add($("td").att("style", td + "text-align:right;")
          .html(i18n.b_("view.configuration-lang")))
        .add($("td").att("style", td)
          .add(dmjs.ui.select("lang", [
            (conf.lang === "en" ? "+" : "") + "en",
            (conf.lang === "es" ? "+" : "") + "es"
          ])
            .on(function (peer) {
              peer.onchange = function () {
                control.changeLang(peer.value);
              };
            }))))
       .add($("tr")
          .add($("td").att("style", td + "text-align:right;")
          .html(i18n.b_("view.configuration-readerWriter")))
        .add($("td").att("style", td)
          .add(dmjs.ui.select("readerWriter", [
            (conf.readerWriterType === "O" ? "+" : "") + i18n._("Ordinary"),
            (conf.readerWriterType === "L" ? "+" : "") + "Lukasiewicz"
          ])
            .on(function (peer) {
              peer.onchange = function () {
                control.changeReaderWriterType(
                  peer.value === "Lukasiewicz" ? "L" : "O"
                );
              };
            }))));

    control.mainDiv().removeAll()
      .add($("table")
        .att("class", "border")
        .att("width", "100%")
        .att("style",
          "background-color: #f8f8f8;" +
          "border-collapse: collapse;")
        .add(view.menu.create(control, view.menu.CONFIGURATION()))
        .add($("tr")
          .add($("td").att("colspan", view.menu.optionNumber().toString())
            .att("style", "padding:10px 10px 10px 10px;")
            .add(pn1))));

  };

}(view.configuration));
