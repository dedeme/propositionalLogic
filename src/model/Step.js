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

/*globals goog, dmjs, model */

goog.provide("model.Step");

goog.require("logic1.Prop");
goog.require("model.PropWriter");
goog.require("model.PropReader");

/**
 * @constructor
 * @private
 */
model.Step = function () {
  "use strict";

  /** @return {!model.Imp | null} */
  this.imp = function () {
    return null;
  };

  /** @return {!model.Sup | null} */
  this.sup = function () {
    return null;
  };

  /** @return {!model.Rule | null} */
  this.rule = function () {
    return null;
  };

  /** @return {!model.Corpus} */
  this.corpus = function () {
    throw "Function without implementation";
  };

  /**
   * @return {!Object.<!string, ?>}
   */
  this.serialize = function () {
    throw "Function without implementation";
  };
};

/**
 * @param {!model.Corpus} corpus
 * @param {!Object.<!string, ?>} serial
 * @return {!model.Step}
 */
model.Step.restore = function (corpus, serial) {
  "use strict";

  switch (serial["type"]) {
    case "IMP" : return model.Imp.restore(corpus, serial);
    case "SUP" : return model.Sup.restore(corpus, serial);
    case "RULE" : return model.Rule.restore(corpus, serial);
    default : throw "Unknown Step type in restoration";
  };
};

/**
 * @constructor
 * @extends model.Step
 * @param {!model.Corpus} corpus
 */
model.Imp = function (corpus) {
  "use strict";

  var self = dmjs.func.inherits(this, new model.Step());

  /** @return {!model.Imp | null} */
  this.imp = function () {
    return self;
  };

  /** @return {!model.Corpus} */
  this.corpus = function () {
    return corpus;
  };

  /**
   * @override @return {!Object.<!string, ?>}
   */
  this.serialize = function () {
    return {
      "type" : "IMP"
    };
  };
};

/**
 * @param {!model.Corpus} corpus
 * @param {!Object.<!string, ?>} serial
 * @return {!model.Imp}
 */
model.Imp.restore = function (corpus, serial) {
  return new model.Imp(corpus);
};

/**
 * @constructor
 * @extends model.Step
 * @param {!model.Corpus} corpus
 * @param {!logic1.Prop.<!string>} prop
 */
model.Sup = function (corpus, prop) {
  "use strict";

  var self = dmjs.func.inherits(this, new model.Step());

  /** @return {!model.Sup | null} */
  this.sup = function () {
    return self;
  };

  /** @return {!logic1.Prop.<!string>} */
  this.prop = function () {
    return prop;
  }

  /** @return {!model.Corpus} */
  this.corpus = function () {
    return corpus;
  };

  /**
   * @return {!Object.<!string, ?>}
   */
  this.serialize = function () {
    return {
      "type" : "SUP",
      "prop" : corpus.writer().write(prop)
    };
  };
};
/**
 * @param {!model.Corpus} corpus
 * @param {!Object.<!string, ?>} serial
 * @return {!model.Sup}
 */
model.Sup.restore = function (corpus, serial) {
  var
    prop;

  prop = corpus.reader().read(serial["prop"]).prop();
  if (prop) {
    return new model.Sup(corpus, prop);
  }
  throw "Error restoring model.Sup";
};

/**
 * @constructor
 * @extends model.Step
 * @param {!model.Corpus} corpus
 * @param {!string} corpusRule Rule identifier in 'corpus'
 * @param {!Array.<!number>} steps Demonstration steps
 * @param {!logic1.Prop.<!string>} prop Rule conclusion
 */
model.Rule = function (corpus, corpusRule, steps, prop) {
  "use strict";

  var self = dmjs.func.inherits(this, new model.Step());

  /** @return {!model.Rule | null} */
  this.rule = function () {
    return self;
  };
  /** @return {!string} */
  this.corpusRule = function () { return corpusRule; };
  /** @return {!Array.<!number>} */
  this.steps = function () { return steps; };
  /** @return {!logic1.Prop.<!string>} */
  this.prop = function () { return prop; };

  /** @return {!model.Corpus} */
  this.corpus = function () {
    return corpus;
  };

  /**
   * @override @return {!Object.<!string, ?>}
   */
  this.serialize = function () {
    return {
      "type" : "RULE",
      "corpusRule" : corpusRule,
      "steps" : steps,
      "prop" : corpus.writer().write(prop)
    };
  };
};

/**
 * @param {!model.Corpus} corpus
 * @param {!Object.<!string, ?>} serial
 * @return {!model.Rule}
 */
model.Rule.restore = function (corpus, serial) {
  var
    /** @private @type {!logic1.Prop.<!string> | null} */
    prop;

  prop = corpus.reader().read(serial["prop"]).prop();
  if (prop) {
    return new model.Rule(
      corpus,
      serial["corpusRule"],
      serial["steps"],
      prop
    );
  }
  throw "Error restoring model.Rule";
};
