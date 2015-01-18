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

/*globals goog, dmjs, model, logic1 */

/** Set of rules with their demonstations */
goog.provide("model.Corpus");
goog.provide("model.CorpusEntry");

goog.require("dmjs.It");
goog.require("logic1.Rule");
goog.require("i18n");

/**
 * @constructor
 * @private
 */
model.Corpus = function () {
  "use strict";

  var
    self,
    /** @private @type {!model.PropReader} */
    reader,
    /** @private @type {!model.PropWriter} */
    writer,
    /** @private @type {!Array.<!model.CorpusEntry>} */
    entries,
    /** @private @type {!Array.<!logic1.Rule.<!string>>} */
    axioms;

  self = this;

  i18n.get().small.push([
    "Theorem name '%0' already exists",
    "El nombre del teorema '%0' está repetido"
  ]);

  reader = new model.PropReader("L");
  /** @return {!model.PropReader} */
  this.reader = function () { return reader; };

  writer = new model.PropWriter("L");
  /** @return {!model.PropWriter} */
  this.writer = function () { return writer; };

  entries = [];

  /**
   * @param {!model.CorpusEntry} entry
   * @throws {!model.Excep} if entry.id() is repeated
   */
  this.add = function (entry) {
    if (dmjs.It.from(entries).index(function (e) {
        return e.id() === entry.id();
      }) === -1) {
      entries.push(entry);
    } else {
      throw new model.Excep(
        i18n.__("Theorem name '%0' already exists", entry.id())
      );
    }
  };

  /** @return {!Array.<model.CorpusEntry>} */
  this.entries = function () {
    return entries;
  };

  /**
   * @param {!string} id
   * @return {!model.CorpusEntry | undefined}
   */
  this.entry = function (id) {
    return dmjs.It.from(entries).find(function (e) {
      return e.id() === id;
    });
  };

  /**
   * @param {!string} id
   * @return {!logic1.Rule.<!string>}
   * @throws {!logic1.Excep}
   */
  this.rule = function (id) {
    var
      entry;
    entry = dmjs.It.from(entries).find(function (e) {
      return e.id() === id;
    });
    if (entry) {
      return entry.rule();
    }
    throw new logic1.Excep.NoRule(id);
  };

  axioms = logic1.Rule.axioms(
    new logic1.SingleProp("p", function (a, b) { return a === b; }),
    new logic1.SingleProp("q", function (a, b) { return a === b; })
  );
  /** @return {!Array.<!logic1.Rule.<!string>>} */
  this.axioms = function () {
    return axioms;
  };

  /**
   * Logic tree from rule identifiers.
   * @return {!dmjs.Map.<!string, !Array.<!string>>}
   */
  this.tree = function () {
    var
      /** @private @type {!string} */
      lastGroup,
      /** @private @type {!string} */
      group,
      /** @private @type {!Array.<!string>} */
      array,
      /** @private @type {!dmjs.Map.<!string, !Array.<!string>>} */
      r;

    r = dmjs.Map.empty();
    lastGroup = "";
    array = [];
    dmjs.It.from(entries).map(function (e) {
      return e.id();
    }).sort(function (e1, e2) {
      return e1 > e2 ? 1 : e2 > e1 ? -1 : 0;
    }).each(function (e) {
      group = e.substring(0, 3);
      if (group !== lastGroup) {
        if (lastGroup !== "") {
          r.put(lastGroup, array);
        }
        lastGroup = group;
        array = [];
      }
      array.push(e);
    });
    if (lastGroup !== "") {
      r.put(lastGroup, array);
    }

    return r;
  };

  /**
   * @param {!string} id Rule name.
   * @return {!Array.<!string>} Ordered list of rules which use the rule 'id'.
   */
  this.derivations = function (id) {
    var
      r;

    r = dmjs.It.from(entries).reduce([], function (seed, entry) {
      var
        entryId;

      entryId = entry.id();
      dmjs.It.from(entry.demo().allBases(self)).each(function (id2) {
        if (id === id2) {
          if (!dmjs.It.from(seed).any(function (seedId) {
            return seedId === entryId;
          })) {
            seed.push(entryId);
          }
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
      r;

    r = [];
    dmjs.It.from(entries).eachIx(function (e, ix) {
      if (ix >= axioms.length) {
        r.push(e.serialize());
      }
    });
    return {
      "entries" : r
    };
  };
};

/**
 * @param {!Object.<!string, ?>} serial
 * @return {!model.Corpus}
 */
model.Corpus.restore = function (serial) {
  "use strict";

  var
    corpus;


  corpus = model.Corpus.make();
  dmjs.It.from(serial["entries"]).each(function (e) {
    corpus.add(model.CorpusEntry.restore(corpus, e));
  });
  return corpus;
};

/** @return {!model.Corpus} */
model.Corpus.make = function () {
  "use strict";

  var
    r;

  r = new model.Corpus();
  r.add(new model.CorpusEntry("Identity", new model.AxiomDemo(r, 0)));
  r.add(new model.CorpusEntry("Imp-Remove", new model.AxiomDemo(r, 1)));
  r.add(new model.CorpusEntry("Neg-In", new model.AxiomDemo(r, 2)));
  r.add(new model.CorpusEntry("Neg-Remove", new model.AxiomDemo(r, 3)));

  return r;
};

/**
 * @constructor
 * @param {!string} id
 * @param {!model.Demo} demo
 */
model.CorpusEntry = function (id, demo) {
  "use strict";

  var
    rule;

  rule = demo.rule();
  /** @return {!string} */
  this.id = function () { return id; };
  /** @return {!logic1.Rule.<!string>} */
  this.rule = function () { return rule; };
  /** @return {!model.Demo} */
  this.demo = function () { return demo; };

  /** @return {!Object.<!string, ?>} */
  this.serialize = function () {
    return {
      "id" : id,
      "demo" : demo.serialize()
    };
  };
};

/**
 * @param {!model.Corpus} corpus
 * @param {!Object.<!string, ?>} serial
 * @return {!model.CorpusEntry}
 */
model.CorpusEntry.restore = function (corpus, serial) {
  "use strict";

  return new model.CorpusEntry(
    serial["id"],
    model.Demo.restore(corpus, serial["demo"])
  );
};
