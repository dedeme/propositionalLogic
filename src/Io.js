/*
 * Copyright 31-dic-2014 ºDeme
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

/*globals goog, dmjs, Io:true, cons, Conf */

/** Server communications */
goog.provide("Io");

goog.require("dmjs.server.Connection");
goog.require("dmjs.server.file");
goog.require("cons");
goog.require("Conf");

/**
 * @constructor
 * @param {!Control} control
 */
Io = function (control) {
  'use strict';

  var
    /** @private @type {!dmjs.server.Connection} */
    con;

  con = new dmjs.server.Connection(
    cons.appName(),
    cons.session().data()["appId"],
    control.error
  );

  /**
   * @param {!function(!string)} action
   */
  this.newSessionId = function (action) {
    con.newSessionId(action);
  };

  /**
   * @param {!function(!string)} action
   */
  this.getSessionId = function (action) {
    con.getSessionId(action);
  };

  /**
   * @param {!function(!Conf)} action
   */
  this.readConf = function (action) {
    con.read("conf", function (d) {
      action(Conf.restore(d));
    });
  };

  /**
   * @param {!function()} action
   */
  this.writeConf = function (action) {
    control.controlSession(function () {
      con.write("conf", control.vars().conf.serialize(), action);
    });
  };

};

/**
 * Function which is executed when application is run at first time.
 * @param {!string} key 'deme' key.
 * @param {!function()} action
 */
Io.init = function (key, action) {
  "use strict";

  dmjs.server.file.write(
    cons.appName(),
    key,
    "conf",
    new Conf().serialize(),
    function (e) {
      if (e !== "") {
        throw new Error(e);
      }
      action();
    }
  );
};
