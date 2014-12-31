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

/*globals goog, dmjs, Vars, view, func, io, cons, i18n, auth */

/** Password change page. */
goog.provide("auth.passChange");

goog.require("dmjs.ui");
goog.require("dmjs.It");
goog.require("dmjs.LogChange");
goog.require("dmjs.Captcha");
//goog.require("Io");
goog.require("view.menu");

(function (ns) {
  'use strict';

  /**
   * Shows page.
   * @param {!Control} control
   */
  ns.read = function (control) {
    var
      $,
      /** @private @type {!Vars} */
      vars,
      /** @private @type {!dmjs.LogChange} */
      log,
      captcha,
      /** @private @type {!dmjs.Captcha} */
      captchaWidget,
      lastRows;

    $ = dmjs.ui.$;
    vars = control.vars();

    captcha = vars.log.logger().captcha();
    captchaWidget = new dmjs.Captcha();

    log = new dmjs.LogChange();
    log.passMissing = i18n._(log.passMissing);
    log.new1Missing = i18n._(log.new1Missing);
    log.new2Missing = i18n._(log.new2Missing);
    log.newsDifferent = i18n._(log.newsDifferent);
    log.cancelAction = function () {
      control.run();
    };
    log.acceptAction = function () {
      vars.log.logger().changeLog(
        "admin",
        func.getK(log.current().value().trim()),
        func.getK(log.new1().value().trim()),
        (captcha === "") ? true : captchaWidget.check() === captcha,
        function (auth) {
          if (auth) {
            cons.session().close();
            vars.log.logger().login(
              "admin",
              func.getK(log.new1().value().trim()),
              true,
              function (level) {
                /*jslint unparam:true */
                control.run();
              }
            );
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
                  .html(i18n.b_("auth.passChange-error"))))))
      );
    }

    lastRows.push(
      $("tr")
        .add($("td")
          .att("colspan", "2")
          .att("style",
            "border-top:1px solid #c9c9c9;" +
            "padding: 10px 10px 10px;text-align:right;")
          .add($("span")
            .add(log.cancel()
              .value(i18n._("Cancel"))
              .att("style", "width:90px"))
            .add($("span").text("  "))
            .add(log.accept()
              .value(i18n._("Accept"))
              .att("style", "width:90px"))))
    );

    control.mainDiv()
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
                "border-collapse: collapse;" +
                "padding: 10px;")
              .add($("tr")
                .add($("td")
                  .att("colspan", "2")
                  .att("style",
                    "background-color:#e8e8e8;" +
                    "border-bottom:1px solid #c9c9c9;" +
                    "padding: 10px;" +
                    "color:#505050;")
                  .html("<big><big><b>" +
                    i18n._("Change Password") +
                    "</big></big></b>")))
              .add($("tr")
                .add($("td")
                  .att("style", "padding: 10px 0px 0px 10px;text-align:right;")
                  .html(i18n._("Current password")))
                .add($("td")
                  .att("style", "padding: 10px 10px 0px 10px;")
                  .add(log.current())))
              .add($("tr")
                .add($("td")
                  .att("style", "padding: 5px 0px 0px 10px;text-align:right;")
                  .html(i18n._("New password")))
                .add($("td")
                  .att("style", "padding: 5px 10px 0px 10px;")
                  .add(log.new1())))
              .add($("tr")
                .add($("td")
                  .att("style", "padding: 5px 0px 10px 10px;text-align:right;")
                  .html(i18n._("Comfirm password")))
                .add($("td")
                  .att("style", "padding: 5px 10px 10px 10px;")
                  .add(log.new2())))
              .addIt(dmjs.It.from(lastRows))))));
    log.current().peer.focus();
  };

}(auth.passChange));
