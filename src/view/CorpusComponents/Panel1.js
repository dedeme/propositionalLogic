/*
 * Copyright 18-Jan-2015 ºDeme
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

/*globals goog, dmjs, corpus, i18n, view */

goog.provide("corpus.Panel1");

goog.require("dmjs.ui");
goog.require("i18n");
goog.require("dmjs.It");

/**
 * @constructor
 * @param {!Control} control
 */
corpus.Panel1 = function (control) {
  "use strict";

  var
    $,
    corpusTree;


  $ = dmjs.ui.$;

  /** @return {!dmjs.DomObject} */
  this.panel = function () {
    corpusTree = new view.Menu2(
      control.vars().corpus.tree(),
      function (e) {
        if (e === "---") {
          control.clickGroup();
        } else {
          control.clickRule(e);
        }
      }
    );

    return $("div")
      .add($("p")
        .add($("span").html(
          "<i>" +
            i18n._("Corpus") +
            " [" +
            i18n._("Rules") +
            ": " +
            control.vars().corpus.entries().length.toString() +
            "]</i>"
        ))
        .add(corpusTree.show()));
  };

  /** */
  this.init = function () {
    corpusTree.selectGroup(
      control.vars().conf.corpusGroup
    );
  };

  /** @return {!view.Menu2} */
  this.corpusTree = function () {
    return corpusTree;
  };
};
