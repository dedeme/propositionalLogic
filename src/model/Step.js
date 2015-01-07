/*
 * Copyright 7-Jan-2014 ºDeme
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

/**
 * @constructor
 * @private
 * @param {!string} type
 * @param {!Object} object
 */
model.Step = function (type, object) {
  "use strict";
  /*jslint closure:true */

  var
    self;

  self = this;

  /** @return {!Object | null} */
  this.imp = function () {
    if (type === "IMP") {
      return object;
    }
    return null;
  };

  /** @return {!model.Sup | null} */
  this.sup = function () {
    if (type === "SUP") {
      return /** @private @type {!model.Sup} */ (object);
    }
    return null;
  };

  /** @return {!model.Rule | null} */
  this.rule = function () {
    if (type === "RULE") {
      return /** @private @type {!model.Rule} */ (object);
    }
    return null;
  };

  /**
   * @return {!Object.<!string, ?>}
   */
  this.serialize = function () {
    var
      imp,
      sup,
      rule;

    imp = self.imp();
    if (imp) {
      return {
        "type" : type
      };
    }
    sup = self.sup();
    if (sup) {
      return {
        "type" : type,
        "prop" : new model.PropWriter("L").write(sup.prop())
      };
    }
    rule = self.rule();
    if (rule) {
      return {
        "type" : type,
        "prop" : new model.PropWriter("L").write(rule.prop()),
        "rule" : rule.rule(),
        "steps" : rule.steps()
      };
    }
    throw type + ": Error in serialization";
  };
};

/**
 * @param {!Object.<!string, ?>} serial
 * @return {!model.Step}
 */
model.Step.restore = function (serial) {
  "use strict";

  var
    /** @private @type {!string} */
    type,
    /** @private @type {!logic1.Prop.<!string> | null} */
    prop,
    /** @private @type {!string | null} */
    rule,
    /** @private @type {!Array.<!number> | null} */
    steps;

  type = serial["type"];
  if (type === "IMP") {
    return model.Step.imp();
  }
  prop = new model.PropReader("L").read(serial["prop"]).prop();
  if (type === "SUP" && prop) {
    return model.Step.sup(prop);
  }
  rule = serial["rule"];
  steps = serial["steps"];
  if (type === "SUP" && prop && rule && steps) {
    return model.Step.rule(prop, rule, steps);
  }
  throw type + ": Unknown Step type in restoration";
};

/** @return {!model.Step} */
model.Step.imp = function () {
  "use strict";

  return new model.Step("IMP", {});
};

/**
 * @constructor
 * @private
 * @param {!logic1.Prop.<!string>} prop
 */
model.Sup = function (prop) {
  "use strict";

  /** @return {!logic1.Prop.<!string>} */
  this.prop = function () { return prop; };
};

/**
 * @param {!logic1.Prop.<!string>} prop
 * @return {!model.Step}
 */
model.Step.sup = function (prop) {
  "use strict";

  return new model.Step("SUP", new model.Sup(prop));
};

/**
 * @constructor
 * @private
 * @param {!logic1.Prop.<!string>} prop
 * @param {!string} rule Rule identifier in 'corpus'
 * @param {!Array.<!number>} steps Demonstration steps
 */
model.Rule = function (prop, rule, steps) {
  "use strict";

  /** @return {!logic1.Prop.<!string>} */
  this.prop = function () { return prop; };
  /** @return {!string} */
  this.rule = function () { return rule; };
  /** @return {!Array.<!number>} */
  this.steps = function () { return steps; };
};

/**
 * @param {!logic1.Prop.<!string>} prop
 * @param {!string} rule Rule identifier in 'corpus'
 * @param {!Array.<!number>} steps Demonstration steps
 * @return {!model.Step}
 */
model.Step.rule = function (prop, rule, steps) {
  "use strict";

  return new model.Step("RULE", new model.Rule(prop, rule, steps));
};

