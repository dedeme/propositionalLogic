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

/*globals goog, dmjs, Control:true, cons, func, Vars, auth, view, Io, Conf,
  i18n, model */

/** Main controler */
goog.provide("Control");

goog.require("dmjs.server");
goog.require("dmjs.server.pass");
goog.require("dmjs.store");
goog.require("dmjs.str");
goog.require("dmjs.It");
goog.require("cons");
goog.require("func");
goog.require("Vars");
goog.require("Io");
goog.require("auth.expired");
goog.require("auth.Log");
goog.require("auth.passIn");
goog.require("auth.passChange");
goog.require("view.Rule");
goog.require("view.Corpus");
goog.require("view.logout");
goog.require("view.configuration");
goog.require("model.PropReader");
goog.require("model.Step");
goog.require("model.Corpus");
goog.require("model.CorpusEntry");

/**
 * @constructor
 * @param {!dmjs.DomObject} mainDiv
 */
Control = function (mainDiv) {
  'use strict';

  var
    /** @private @type {!Vars} */
    vars,
    /** @private @type {!Io} */
    io,
    /** @private @type {!Control} */
    self,
    /** @private @type {!view.Rule} */
    rule,
    /** @private @type {!view.Corpus} */
    wcorpus;

  self = this;

  /** Executes controler when new page is loaded */
  this.run = function () {
    vars = new Vars();
    vars.log = new auth.Log(self);
    rule = new view.Rule(self);
    wcorpus = new view.Corpus(self);
    dmjs.server.pass.auth(
      cons.appName(),
      "admin",
      func.demePass(),
      function (error, key, level) {
        /*jslint unparam:true */

        if (error === "") {
          Io.init(key, function () {
            vars.conf = new Conf();
            i18n.get().selected = vars.conf.lang;
            window.alert(i18n.b_("auth.passIn-pass is deme"));
            dmjs.server.app.newSessionId(cons.appName(),
              key,
              function (e, id) {
                self.error(e, function () {
                  vars.sessionId = id;
                  cons.session().close();
                  auth.passChange.read(self);
                });
              });
          });
        } else if (error === dmjs.server.pass.INVALID()) {
          if (cons.session().control()) {
            io = new Io(self);
            io.newSessionId(function (id) {
              vars.sessionId = id;
              io.readConf(function (conf) {
                vars.conf = conf;
                i18n.get().selected = conf.lang;
                io.readCorpus(function (corpus) {
                  vars.corpus = corpus;
                  switch (conf.menuOption) {
                  case view.menu.RULE():
                    io.readDemo(corpus, function (demo) {
                      vars.demo = demo;
                      rule.show();
                    });
                    break;
                  case view.menu.CORPUS():
                    wcorpus.show();
                    break;
                  case view.menu.CONFIGURATION():
                    view.configuration.show(self);
                    break;
                  default:
                    rule.show();
                  }
                });
              });
            });
          } else {
            i18n.get().selected = dmjs.store.get("LoginLang") || "en";
            auth.passIn.read(self);
          }
        } else {
          throw new Error(error);
        }
      }
    );

  };

  /** @return {!dmjs.DomObject} */
  this.mainDiv = function () { return mainDiv; };

  /** @return {!Vars} */
  this.vars = function () { return vars; };

  /** @return {!Io} */
  this.io = function () { return io; };

  /** @return {!view.Rule} */
  this.rule = function () { return rule; };

// Rule editor ------------------------------------------------------------
  /** Shows rule editor */
  this.goRule = function () {
    self.controlSession(function () {
      vars.conf.menuOption = view.menu.RULE();
      io.writeConf(self.run);
    });
  };

  /** Adds a supose to demonstration */
  this.addSupose = function () {
    try {
      var
        corpus,
        rr,
        error,
        prop;

      corpus = vars.corpus;

      rr = corpus.reader().read(
        dmjs.str.trim(rule.newProp().value())
      );
      error = rr.error();
      prop = rr.prop();
      if (error) {
        throw new model.Excep(error);
      }
      if (prop) {
        vars.demo.add(new model.Sup(corpus, prop));
        io.writeDemo(function () {
          rule.show();
        });
      } else {
        throw "Error in ReadResult";
      }
    } catch (ex) {
      if (typeof (ex.message) === "function") {
        window.alert(ex.message());
      } else if (typeof (ex.noRule) === "function") {
        window.alert(new model.Excep(ex).message());
      } else {
        throw ex;
      }
    }
  };

  /** Adds an implication to demonstration */
  this.addImply = function () {
    try {
      var
        corpus;

      corpus = vars.corpus;

      vars.demo.add(new model.Imp(corpus));
      io.writeDemo(function () {
        rule.show();
      });
    } catch (ex) {
      if (typeof (ex.message) === "function") {
        window.alert(ex.message());
      } else if (typeof (ex.noRule) === "function") {
        window.alert(new model.Excep(ex).message());
      } else {
        throw ex;
      }
    }
  };

  /** Adds a rule to demonstration */
  this.addRule = function () {
    var
      corpus,
      rr,
      error,
      prop,
      ruleApp,
      stepsTx,
      steps;

    try {
      corpus = vars.corpus;

      rr = corpus.reader().read(
        dmjs.str.trim(rule.newProp().value())
      );
      error = rr.error();
      prop = rr.prop();
      if (error) {
        throw new model.Excep(error);
      }
      if (prop) {
        ruleApp = rule.selectedRule();
        stepsTx = dmjs.str.trim(rule.stepsTx().value());
        if (stepsTx !== "") {
          steps = dmjs.It.from(rule.stepsTx().value().split(","))
            .map(function (e) {
              e = dmjs.str.trim(e);
              if (isNaN(e)) {
                throw new model.Excep(i18n._("Indices must be numbers"));
              }
              return e - 1;
            }).toArray();
        } else {
          steps = [];
        }
        vars.demo.add(new model.Rule(corpus, ruleApp, steps, prop));
        io.writeDemo(function () {
          rule.show();
        });
      } else {
        throw "Error in ReadResult";
      }
    } catch (ex) {
      if (typeof (ex.message) === "function") {
        window.alert(ex.message());
      } else if (typeof (ex.noRule) === "function") {
        window.alert(new model.Excep(ex).message());
      } else {
        throw ex;
      }
    }
  };

  /** Clears demonstration data */
  this.del = function () {
    vars.demo = model.Demo.make(vars.corpus);
    io.writeDemo(function () {
      self.run();
    });
  };

  /** Undoes demonstration */
  this.undo = function () {
    vars.demo.undo();
    io.writeDemo(function () {
      self.run();
    });
  };

  /** Redoes demonstration */
  this.redo = function () {
    vars.demo.redo();
    io.writeDemo(function () {
      self.run();
    });
  };

  /** Adds a new rule to corpus */
  this.addCorpus = function () {
    var
      id;

    try {
      id = dmjs.str.trim(rule.idTx().value());
      if (id === "") {
        throw new model.Excep(i18n._("Rule name is missing"));
      }
      vars.corpus.add(new model.CorpusEntry(id, vars.demo));
      io.writeCorpus(self.del);
    } catch (ex) {
      if (typeof (ex.message) === "function") {
        window.alert(ex.message());
      } else if (typeof (ex.noRule) === "function") {
        window.alert(new model.Excep(ex).message());
      } else {
        throw ex;
      }
    }
  };

  /** Show demonstration lines */
  this.viewDemo = function () {
    rule.demoTx().value(
      vars.demo.show(new model.PropWriter(vars.conf.readerWriterType))
    );
  };

  /** Show demonstration rule */
  this.viewRule = function () {
    rule.demoTx().value(
      vars.demo.showRule(new model.PropWriter(vars.conf.readerWriterType))
    );
  };

// End Rule editor --------------------------------------------------------
// Corpus editor ----------------------------------------------------------
  /** Shows corpus editor */
  this.goCorpus = function () {
    self.controlSession(function () {
      vars.conf.menuOption = view.menu.CORPUS();
      io.writeConf(self.run);
    });
  };

  /**  */
  this.clickGroup = function () {
    vars.conf.corpusGroup = wcorpus.corpusTree().selectedGroup();
    io.writeConf(function () { return undefined; });
    wcorpus.pn2().init();
  };

  /** @param {!string} id */
  this.clickRule = function (id) {
    wcorpus.pn2().initRule(id);
    wcorpus.pn3().initRule(id);
  };

// End Corpus editor ------------------------------------------------------
  /** Shows configuration page */
  this.goConfiguration = function () {
    self.controlSession(function () {
      vars.conf.menuOption = view.menu.CONFIGURATION();
      io.writeConf(self.run);
    });
  };

  /** Shows exipired page */
  this.goExpiredSession = function () { auth.expired.show(self); };

  /** Shows closed page */
  this.goLogout = function () {
    cons.session().close();
    view.logout.show(self);
  };

  /**
   * Action for changing password
   */
  this.goChangePassword = function () {
    self.controlSession(function () {
      auth.passChange.read(self);
    });
  };

  /**
   * Action for new login
   */
  this.login = function () {
    self.run();
  };

  /**
   * Action for changing language
   * @param {!string} lang
   */
  this.changeLang = function (lang) {
    vars.conf.lang = lang;
    io.writeConf(self.run);
  };

  /**
   * Action for changing type of Reader-Writer
   * @param {!string} type
   */
  this.changeReaderWriterType = function (type) {
    vars.conf.readerWriterType = type;
    io.writeConf(self.run);
  };

  /**
   * Action for changing login language
   */
  this.changeLoginLang = function () {
    dmjs.store.put(
      "LoginLang",
      i18n.get().selected === "en" ? "es" : "en"
    );
    self.run();
  };

  /**
   * Controls session and sessionId
   * @param {!function()} action
   */
  this.controlSession = function (action) {
    if (cons.session().control()) {
      io.getSessionId(function (id) {
        if (vars.sessionId === id) {
          action();
        } else {
          self.goExpiredSession();
        }
      });
    } else {
      self.run();
    }
  };

  /**
   * dmjs.server.PERM() error management.
   * @param {!string} e
   * @param {!function ()} action
   */
  this.error = function (e, action) {
    if (e === "") {
      action();
    } else if (e === dmjs.server.PERM()) {
      cons.session().close();
      self.run();
    } else {
      throw new Error(e);
    }
  };

};
