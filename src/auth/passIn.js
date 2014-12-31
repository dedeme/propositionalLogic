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

/*globals goog, dmjs, view, func, i18n, io, auth */

/** Password input page */
goog.provide("auth.passIn");

goog.require("dmjs.LogIn");
goog.require("view.menu");
goog.require("auth.passChange");
goog.require("i18n");
goog.require("func");

(function (ns) {
  'use strict';

  /**
   * Shows page.
   * @param {!Control} control
   */
  ns.read = function (control) {
    var
      $,
      mdiv,
      /** @private @type {!Vars} */
      vars,
      /** @private @type {!dmjs.LogIn} */
      log,
      captcha,
      /** @private @type {!dmjs.Captcha} */
      captchaWidget,
      lastRows;

    $ = dmjs.ui.$;
    mdiv = control.mainDiv();
    vars = control.vars();

    captcha = vars.log.logger().captcha();
    captchaWidget = new dmjs.Captcha();

    log = new dmjs.LogIn();
    log.userMissing = i18n._(log.userMissing);
    log.passMissing = i18n._(log.passMissing);
    log.user().value("xx");

    log.acceptAction = function () {
      vars.log.logger().login(
        "admin",
        func.getK(log.pass().value().trim()),
        (captcha === "") ? true : captchaWidget.check() === captcha,
        function (level) {
          if (level) {
            control.login();
          } else {
            ns.read(control);
          }
        }
      );
    };

    lastRows = [];

    if (captcha !== "") {
      captchaWidget.value(captcha);
      captchaWidget.zeroColor("#f0f0f0");
      captchaWidget.oneColor("#c0c0c0");
      lastRows.push(
        $("tr")
          .add($("td")
            .att("style", "padding: 0px 0px 5px 10px;text-align:right;")
            .html(i18n._("Check gray<br>squares")))
          .add($("td")
            .att("style", "padding: 0px 10px 5px 10px;")
            .add(captchaWidget.make()))
      );
    }

    if (vars.log.attempts() > 0) {
      lastRows.push(
        $("tr")
          .add($("td")
            .att("colspan", "2")
            .att("style", "padding: 0px 10px 10px 10px;text-align:center;")
            .add($("table")
              .att("align", "center")
              .att("class", "frame")
              .add($("tr")
                .add($("td")
                  .html(i18n.b_("auth.passIn-error"))))))
      );
    }

    lastRows.push(
      $("tr")
        .add($("td").att("style",
          "border-top:1px solid #c9c9c9;color: #000080;text-align:center;" +
            "padding:10px 10px 10px 10px;")
          .add(dmjs.ui.link(function () { control.changeLoginLang(); })
            .html(i18n.get().selected === "en" ? "ES" : "EN")))
        .add($("td")
          .att("colspan", "2")
          .att("style",
            "border-top:1px solid #c9c9c9;" +
            "padding: 10px 10px 10px;text-align:right;")
          .add($("span")
            .add(log.accept()
              .value(i18n._("Accept"))
              .att("style", "width:90px"))))
    );

    mdiv
      .removeAll()
      .add($("table")
        .att("class", "border")
        .att("width", "100%")
        .att("style",
          "background-color: #f8f8f8;" +
          "border-collapse: collapse;")
        .add(view.menu.create(control, view.menu.NONE()))
        .add($("tr")
          .add($("td").att("colspan", view.menu.optionNumber().toString())
            .att("style", "padding:10px 10px 10px 10px;")
            .add($("table")
              .att("align", "center")
              .att("class", "border")
              .att("style",
                "background-color: #f8f8f8;" +
                "border-collapse: collapse;")
              .add($("tr")
                .add($("td")
                  .att("colspan", "2")
                  .att("style",
                    "background-color:#e8e8e8;" +
                    "border-bottom:1px solid #c9c9c9;" +
                    "padding: 10px;" +
                    "color:#505050;")
                  .html("<big><big><b>" +
                    i18n._("Login") +
                    "</big></big></b>")))
              .add($("tr")
                .add($("td")
                  .att("style", "padding: 10px 0px 10px 10px;text-align:right;")
                  .html(i18n._("Password")))
                .add($("td")
                  .att("style", "padding: 10px 10px 10px 10px;")
                  .add(log.pass())))
              .addIt(dmjs.It.from(lastRows))))));
    log.pass().peer.focus();
  };

}(auth.passIn));
