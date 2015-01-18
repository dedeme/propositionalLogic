/*
 * Copyright 7-Jan-2015 ºDeme
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

/*globals goog, dmjs, model, cons, logic1, func */

/** Current demonstration */
goog.provide("model.Demo");
goog.provide("model.AxiomDemo");

goog.require("dmjs.It");
goog.require("logic1.Derivation");
goog.require("logic1.Rule");
goog.require("logic1.Prop");
goog.require("model.Step");
goog.require("model.Corpus");
goog.require("model.PropWriter");
goog.require("model.PropReader");
goog.require("model.Excep");
goog.require("func");

/**
 * @constructor
 * @private
 * @param {!model.Corpus} corpus
 * @param {!Array.<!model.Step>} steps
 * @param {!Array.<!model.Step>} redo
 * @throws {!model.ReaderError}
 */
model.Demo = function (corpus, steps, redo) {
  "use strict";

  var
    self,
    derivationAdd,
    /** @private @type {!logic1.Derivation.<!string>} */
    derivation;

  self = this;

  /**
   * @private
   * @param {!model.Step} step A valid step
   * @throws {!logic1.Excep}
   */
  derivationAdd = function (step) {
    var
      imp,
      sup,
      rule;

    imp = step.imp();
    sup = step.sup();
    rule = step.rule();

    if (imp) {
      derivation.imply();
    } else if (sup) {
      derivation.supose(sup.prop());
    } else if (rule) {
      derivation.inference(
        corpus.rule(rule.corpusRule()),
        rule.steps(),
        rule.prop()
      );
    } else {
      throw "Kind of step unknown";
    }
  };

  derivation = new logic1.Derivation();
  dmjs.It.from(steps).each(function (e) {
    derivationAdd(e);
  });

  /** @return {!Array.<!model.Step>} */
  this.steps = function () {
    return steps;
  };

  /**
   * @param {!model.Step} step A valid step
   * @throws {!logic1.Excep}
   */
  this.add = function (step) {
    derivationAdd(step);
    steps.push(step);
    redo = [];
  };

  /** Undoing last operation */
  this.undo = function () {
    redo.push(steps.pop());
    derivation = new logic1.Derivation();
    dmjs.It.from(steps).each(function (e) {
      derivationAdd(e);
    });
  };

  /** Redoing an operation */
  this.redo = function () {
    var
      step;

    step = redo.pop();
    derivationAdd(step);
    steps.push(step);
  };

  /** @return {!boolean} */
  this.canUndo = function () {
    return steps.length > 0;
  };

  /** @return {!boolean} */
  this.canRedo = function () {
    return redo.length > 0;
  };

  /**
   * @return {!logic1.Rule.<!string>}
   * @throws {!logic1.Excep} It can be:
   *  <ul>
   *  <li>noPremise</li>
   *  <li>notAssertionEnd</li>
   *  </ul>
   */
  this.rule = function () {
    return derivation.toRule();
  };

  /**
   * @param {!model.PropWriter} writer
   * @return {!string}
   */
  this.show = function (writer) {
    var
      formatN,
      ix,
      indent;

    formatN = function (n) {
      return (n < 10 ? "0" + n : n.toString()) + ". ";
    };

    indent = 0;
    ix = 1;

    return dmjs.It.from(steps).reduce("", function (seed, e) {
      var
        sup,
        rule;
      sup = e.sup();
      rule = e.rule();
      if (sup) {
        return seed +
          "\n" +
          formatN(ix++) +
          func.writeSupose(indent++, writer.write(sup.prop()));
      }
      if (rule) {
        if (ix < steps.length && steps[ix].imp()) {
          return seed +
            "\n" +
            formatN(ix++) +
            func.writeConclusion(indent - 1, writer.write(rule.prop()));
        }
        return seed +
          "\n" +
          formatN(ix++) +
          func.writeAssertion(indent, writer.write(rule.prop()));
      }
      if (ix < steps.length && steps[ix].imp()) {
        return seed +
          "\n" +
          formatN(ix++) +
          func.writeConclusion(--indent - 1, writer.write(
            derivation.steps()[ix - 2].pr()
          ));
      }
      return seed + "\n" +
        formatN(ix++) +
        func.writeAssertion(--indent, writer.write(
          derivation.steps()[ix - 2].pr()
        ));
    }).substring(1);
  };

  /**
   * @param {!model.PropWriter} writer
   * @return {!string}
   */
  this.showRule = function (writer) {
    return func.writeRule(writer, derivation.toRule());
  };

  /**
   * @return {!Array.<!string>} Disordered list of rules names used by
   *  this demonstration.
   */
  this.bases = function () {
    return dmjs.It.from(steps).reduce([], function (seed, step) {
      var
        rule,
        id;

      rule = step.rule();
      if (rule) {
        id = rule.corpusRule();
        if (!dmjs.It.from(seed).any(function (seedId) {
            return id === seedId;
          })) {
          seed.push(id);
        }
      }
      return seed;
    });
  };

  /**
   * @param {!model.Corpus} corpus
   * @return {!Array.<!string>} Ordered list of rules names used by
   *  this demonstration and its basis.
   */
  this.allBases = function (corpus) {
    var
      r;

    r = dmjs.It.from(self.bases()).reduce([], function (seed, id) {
      seed.push(id);
      dmjs.It.from(corpus.entry(id).demo().allBases(corpus))
        .each(function (id1) {
          if (!dmjs.It.from(seed).any(function (id2) {
              return id1 === id2;
            })) {
            seed.push(id1);
          }
        });
      return seed;
    });
    r.sort();
    return r;
  };

  /** @return {!Object.<!string, ?>} */
  this.serialize = function () {
    var
      s,
      r;

    s = [];
    dmjs.It.from(steps).each(function (e) {
      s.push(e.serialize());
    });
    r = [];
    dmjs.It.from(redo).each(function (e) {
      r.push(e.serialize());
    });
    return {
      "steps" : s,
      "redo" : r
    };
  };
};

/**
 * @param {!model.Corpus} corpus
 * @param {!Object.<!string, ?>} serial
 * @return {!model.Demo}
 */
model.Demo.restore = function (corpus, serial) {
  "use strict";

  var
    s,
    r;

  s = [];
  dmjs.It.from(serial["steps"]).each(function (e) {
    s.push(model.Step.restore(corpus, e));
  });
  r = [];
  dmjs.It.from(serial["redo"]).each(function (e) {
    r.push(model.Step.restore(corpus, e));
  });
  return new model.Demo(corpus, s, r);
};

/** @return {!model.Demo} Empty Demo */
model.Demo.make = function (corpus) {
  "use strict";

  return new model.Demo(corpus, [], []);
};

/**
 * @constructor
 * @extends model.Demo
 * @param {!model.Corpus} corpus
 * @param {!number} ix
 */
model.AxiomDemo = function (corpus, ix) {
  "use strict";

  /** @return {!Array.<!model.Step>} */
  this.steps = function () {
    return [];
  };

  /** Disabled */
  this.add = function () {
    throw "Disabled";
  };

  /** Disabled */
  this.undo = function () {
    throw "Disabled";
  };

  /** Disabled */
  this.redo = function () {
    throw "Disabled";
  };

  /** @return {!boolean} */
  this.canUndo = function () {
    return false;
  };

  /** @return {!boolean} */
  this.canRedo = function () {
    return false;
  };

  /**
   * @return {!logic1.Rule.<!string>}
   */
  this.rule = function () {
    return corpus.axioms()[ix];
  };

  /**
   * @return {!string}
   */
  this.show = function () {
    return "Axiom " + (ix + 1).toString();
  };

  /** @return {!string} */
  this.showRule = function () {
    return "rule";
  };

  /**
   * @return {!Array.<!string>} Disordered list of rules names used by
   *  this demonstration.
   */
  this.bases = function () {
    return [];
  };

  /**
   * @param {!model.Corpus} corpus
   * @return {!Array.<!string>} Ordered list of rules names used by
   *  this demonstration and its basis.
   */
  this.allBases = function (corpus) {
    /*jslint unparam:true */
    return [];
  };

  /** Disabled */
  this.serialize = function () {
    throw "Disabled";
  };

};
