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

/*globals goog, dmjs, Conf:true, view */

/** Permanent data */
goog.provide("Conf");

goog.require("dmjs.func");
goog.require("view.menu");
/**
 * @constructor
 */
Conf = function () {
  'use strict';

  var
    /** @private @type {!Conf} */
    self;

  self = this;

  /**
   * @type {!string} Default "en"
   */
  this.lang = "en";

  /**
   * @type {!number} Default view.menu.RULE()
   */
  this.menuOption = view.menu.RULE();

  /**
   * It can be:
   * <pre>
   * "L" -> Lukasiewicz
   * "O" -> Ordinary
   * </pre>
   * @type {!string} Default "L" -> Lukasiewicz
   */
  this.readerWriterType = "L";

  /**
   * Last group selected in corpus panel or ""
   * @type {!string} Default ""
   */
  this.corpusGroup = "";

  /**
   * @return {!Object.<!string, ?>}
   */
  this.serialize = function () {
    return {
      "lang" : self.lang,
      "menuOption" : self.menuOption,
      "readerWriterType" : self.readerWriterType,
      "corpusGroup" : self.corpusGroup
    };
  };
};

/**
 * @param {!Object.<!string, ?>} serial
 * @return {!Conf}
 */
Conf.restore = function (serial) {
  'use strict';

  var
    /** @private @type {!Conf} */
    r;

  r = new Conf();
  r.lang = serial["lang"];
  r.menuOption = serial["menuOption"];
  r.readerWriterType = serial["readerWriterType"];
  r.corpusGroup = serial["corpusGroup"];

  return r;
};
