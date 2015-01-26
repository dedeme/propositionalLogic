/*
 * Copyright 10-Jan-2014 ºDeme
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

/*globals goog, dmjs, model, logic1, i18n */

/** PropositionalLogic exception */
goog.provide("model.Excep");

goog.require("i18n");
goog.require("logic1.Excep");
goog.require("model.ReaderError");

/**
 * @constructor
 * @param {!model.ReaderError | !logic1.Excep | !string} ex
 */
model.Excep = function (ex) {
  "use strict";

  var
    self,
    premiseBadReplacement,
    conclusionBadReplacement,
    noPremise,
    noRule,
    notAssertion,
    notAssertionEnd,
    notSupose,
    premiseNumberNotMach,
    stepOutOfRange;

  self = this;

  i18n.get().big.push([
    "premiseBadReplacement",
    "Incorrect replacement in premise number %0",
    "Incorrecto reemplazo en la premisa número %0"
  ]);
  i18n.get().big.push([
    "conclusionBadReplacement",
    "Incorrect replacement of rule conclusion",
    "Reemplazo incorrecto de la conclusión de la regla"
  ]);
  i18n.get().big.push([
    "noPremise",
    "Demonstration has no premises",
    "La demostración no tiene premisas"
  ]);
  i18n.get().big.push([
    "noRule",
    "Rule is not in 'Corpus'",
    "La regla no está en el 'Corpus'"
  ]);
  i18n.get().big.push([
    "notAssertion",
    "Premise number %0 is not an assertion",
    "La premisa número %0 no es una aserción"
  ]);
  i18n.get().big.push([
    "notAssertionEnd",
    "Demonstration does not end at an assertion",
    "La demostración no termina en una aserción"
  ]);
  i18n.get().big.push([
    "notSupose",
    "There is no supose for implication",
    "No existe ningún supuesto para la implicación"
  ]);
  i18n.get().big.push([
    "premiseNumberNotMach",
    "Premise number not match:\nRule has %0 and steps have %1",
    "El número de premisas no se corresponde:\n" +
      "La regla tiene %0 y los pasos tienen %1"
  ]);
  i18n.get().big.push([
    "stepOutOfRange",
    "Step out of range:\nIndex is %0 and steps are %1",
    "Indice de paso fuera de rango:\n" +
      "El índice es %0 y los pasos son %1"
  ]);

  /** @return {!string} */
  this.message = function () {
    if (typeof (ex.noRule) === "function") {
      premiseBadReplacement = ex.premiseBadReplacement();
      if (premiseBadReplacement) {
        return i18n.b__(
          "premiseBadReplacement",
          premiseBadReplacement.ix().toString()
        );
      }
      conclusionBadReplacement = ex.conclusionBadReplacement();
      if (conclusionBadReplacement) {
        return i18n.b_("conclusionBadReplacement");
      }
      noPremise = ex.noPremise();
      if (noPremise) {
        return i18n.b__("noPremise");
      }
      noRule = ex.noRule();
      if (noRule) {
        return i18n.b__("noRule");
      }
      notAssertion = ex.notAssertion();
      if (notAssertion) {
        return i18n.b__("notAssertion", notAssertion.ix().toString());
      }
      notAssertionEnd = ex.notAssertionEnd();
      if (notAssertionEnd) {
        return i18n.b__("notAssertionEnd");
      }
      notSupose = ex.notSupose();
      if (notSupose) {
        return i18n.b__("notSupose");
      }
      premiseNumberNotMach = ex.premiseNumberNotMach();
      if (premiseNumberNotMach) {
        return i18n.b__(
          "premiseNumberNotMach",
          premiseNumberNotMach.ruleNumber(),
          premiseNumberNotMach.stepNumber()
        );
      }
      stepOutOfRange = ex.stepOutOfRange();
      if (stepOutOfRange) {
        return i18n.b__(
          "stepOutOfRange",
          stepOutOfRange.index() + 1,
          stepOutOfRange.range()
        );
      }
      throw "Exception not cached";
    } else if (typeof (ex.message) === "function") {
      return ex.message();
    }
    if (typeof ex === "string") {
      return ex;
    }
    throw "Unknow exception";
  };

  /** @override */
  this.toString = function () { return self.message(); };
};
