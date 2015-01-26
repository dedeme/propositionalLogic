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

/*globals goog, dmjs, Io:true, cons, Conf, model */

/** Server communications */
goog.provide("Io");

goog.require("dmjs.server.Connection");
goog.require("dmjs.server.file");
goog.require("cons");
goog.require("Conf");
goog.require("model.Demo");
goog.require("model.Corpus");

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

  /**
   * @param {!model.Corpus} corpus
   * @param {!function(!model.Demo)} action
   */
  this.readDemo = function (corpus, action) {
    con.find("", "demo", function (f) {
      if (f) {
        con.read("demo", function (d) {
          action(model.Demo.restore(corpus, d));
        });
      } else {
        action(model.Demo.make(corpus));
      }
    });
  };

  /**
   * @param {!function()} action
   */
  this.writeDemo = function (action) {
    control.controlSession(function () {
      con.write("demo", control.vars().demo.serialize(), action);
    });
  };

  /**
   * @param {!function(!model.Corpus)} action
   */
  this.readCorpus = function (action) {
    con.find("", "corpus", function (f) {
      if (f) {
        con.read("corpus", function (d) {
          action(model.Corpus.restore(d));
        });
      } else {
        action(model.Corpus.make());
      }
    });
  };

  /**
   * @param {!function()} action
   */
  this.writeCorpus = function (action) {
    control.controlSession(function () {
      con.write("corpus", control.vars().corpus.serialize(), action);
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
