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

/*globals goog, dmjs, Vars:true, model */

/** */
goog.provide("Vars");

goog.require("model.Demo");
goog.require("model.Corpus");

/**
 * @constructor
 */
Vars = function () {
  'use strict';

  /**
   * @type {!string} Default ""
   */
  this.sessionId = "";

  /**
   * Log data
   * @type {!auth.Log | null} Default 'null'
   */
  this.log = null;

  /**
   * Configuration data
   * @type {!Conf | null} Default 'null'
   */
  this.conf = null;

  /** @type {!model.Corpus} */
  this.corpus = model.Corpus.make();

  /**
   * Current domonstration
   * @type {!model.Demo}
   */
  this.demo = model.Demo.make(this.corpus);

};
