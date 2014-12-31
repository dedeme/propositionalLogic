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

/*globals goog, dmjs, auth, cons */

/** Authentication controler */
goog.provide("auth.Log");

goog.require("dmjs.Logger");
goog.require("dmjs.store");
goog.require("dmjs.server.app");
goog.require("dmjs.server.pass");
goog.require("cons");

/**
 * @constructor
 * @param {!Control} control
 */
auth.Log = function (control) {
  'use strict';

  var
    /** @private @type {!Vars} */
    vars,
    storeData,
    /** @private @type {!dmjs.Logger} */
    logger;

  vars = control.vars();
  storeData = dmjs.store.get("model.Log");

  if (storeData === null) {
    storeData = {
      "lastTime" : new Date().getTime(),
      "attempts" : 0
    };
    dmjs.store.put("model.Log", JSON.stringify(storeData));
  } else {
    storeData = JSON.parse(storeData);
  }

  logger = new dmjs.Logger(
    900,
    3,
    function () {
      return storeData["lastTime"];
    },
    function (time) {
      storeData["lastTime"] = time;
      dmjs.store.put("model.Log", JSON.stringify(storeData));
    },
    function () {
      return storeData["attempts"];
    },
    function () {
      storeData["attempts"] = storeData["attempts"] + 1;
      dmjs.store.put("model.Log", JSON.stringify(storeData));
    },
    function () {
      storeData["attempts"] = 0;
      dmjs.store.put("model.Log", JSON.stringify(storeData));
    },
    function (user, password, action) {
      dmjs.server.pass.auth(
        cons.appName(),
        user,
        password,
        function(error, key, level) {
          if (error === "") {
            cons.session().open({"appId" : key});
            action(level);
          } else if (error === dmjs.server.pass.INVALID()) {
            action(null);
          } else {
            throw new Error(error);
          }
        }
      );
    },
    function (user, password, newPassword, action) {
      var
        appId,
        change;

      change = function () {
        dmjs.server.pass.change(
          cons.appName(),
          user,
          password,
          newPassword,
          function (error) {
            if (error === "") {
              action(true);
            } else if (error === dmjs.server.pass.INVALID()) {
              action(false);
            } else {
              throw new Error(error);
            }
          }
        );
      };

      appId = cons.session().data()["appId"];
      if (appId) {
        dmjs.server.app.getSessionId(
          cons.appName(),
          cons.session().data()["appId"],
          function (e, id) {
            control.error(e, function () {
              if (id === vars.sessionId) {
                change();
              } else {
                control.goExpiredSession();
              }
            });
          }
        );
      } else {
        change();
      }
    }
  );

  /**
   * @return {!dmjs.Logger}
   */
  this.logger = function () { return logger; };

  /**
   * @return {!number}
   */
  this.attempts = function () {
    return storeData["attempts"];
  };
};
