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

/*globals goog, dmjs, auth, view, i18n */

/** Expired page */
goog.provide("auth.expired");

goog.require("dmjs.ui");
goog.require("dmjs.It");
goog.require("i18n");
goog.require("view.menu");

(function (ns) {
  "use strict";

  /**
   * Shows page.
   * @param {!Control} control
   */
  ns.show = function (control) {
    var
      $,
      td;

    $ = dmjs.ui.$;
    td = "padding:0px 10px 0px 10px;";

    control.mainDiv().removeAll()
      .add($("table")
        .att("class", "border")
        .att("width", "100%")
        .att("style",
          "background-color: #f8f8f8;" +
          "border-collapse: collapse;")
        .add(view.menu.create(control, view.menu.NONE()))
        .add($("tr")
          .add($("td")
            .att("colspan", view.menu.optionNumber().toString())
            .att("style", td)
            .html(i18n.b_("auth.expire-message")))));

  };

}(auth.expired));
