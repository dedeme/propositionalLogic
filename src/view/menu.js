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

/*globals goog, dmjs, view, i18n */

/** Row with menu */
goog.provide("view.menu");

goog.require("dmjs.ui");
goog.require("i18n");

(function (ns) {
  "use strict";

  var
    $;

  $ = dmjs.ui.$;

  /**
   * Locks menu options.
   * @return {!number}
   */
  ns.NONE = function () { return 0; };
  /**
   * Menu option
   * @return {!number}
   */
  ns.RULE = function () { return 1; };
  /**
   * Menu option
   * @return {!number}
   */
  ns.CORPUS = function () { return 2; };
  /**
   * Menu option
   * @return {!number}
   */
  ns.CONFIGURATION = function () { return 3; };
  /**
   * Menu option
   * @return {!number}
   */
  ns.LOGOUT = function () { return 4; };

  /**
   * Number of menu options.
   * @return {!number}
   */
  ns.optionNumber = function () { return 4; };

  /**
   * Returns a TR with menu
   * @param {!Control} control
   * @param {!number} option
   * @return {!dmjs.DomObject} $("tr") of menu.
   */
  ns.create = function (control, option) {
    var
      th,
      tdRule,
      tdCorpus,
      tdConfiguration,
      tdLogout;

    th = "padding:0px 10px 0px 10px;" +
      "background-color:#e8e8e8;border-bottom:1px solid #c9c9c9;";

    tdRule = option === ns.RULE() || option === ns.NONE()
      ? $("td").att("style", th).html(i18n._("Rule"))
        : $("td").att("style", th + "color: #000080")
            .add(dmjs.ui.link(function () { control.goRule(); })
            .html(i18n._("Rule")));

    tdCorpus = option === ns.CORPUS() || option === ns.NONE()
      ? $("td").att("style", th).html(i18n._("Corpus"))
        : $("td").att("style", th + "color: #000080")
            .add(dmjs.ui.link(function () { control.goCorpus(); })
            .html(i18n._("Corpus")));

    tdConfiguration = option === ns.CONFIGURATION() || option === ns.NONE()
      ? $("td").att("style", th).html(i18n._("Configuration"))
        : $("td").att("style", th + "color: #000080")
            .add(dmjs.ui.link(function () { control.goConfiguration(); })
            .html(i18n._("Configuration")));

    tdLogout = option === ns.NONE()
      ? $("td")
        .att("style", th + "width: 100%;text-align: right")
        .html(i18n._("Log out"))
        : $("td")
            .att("style", th + "color: #000080;width: 100%;text-align: right")
            .add(dmjs.ui.link(function () { control.goLogout(); })
            .html(i18n._("Log out")));

    return $("tr")
      .add(tdRule)
      .add(tdCorpus)
      .add(tdConfiguration)
      .add(tdLogout);

  };


}(view.menu));
