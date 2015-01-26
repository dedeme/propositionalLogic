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

/*globals goog, dmjs, corpus, i18n */

goog.provide("corpus.Panel2");

goog.require("dmjs.ui");
goog.require("i18n");
goog.require("dmjs.It");

/**
 * @constructor
 * @param {!Control} control
 */
corpus.Panel2 = function (control) {
  "use strict";

  var
    mkBt,
    $,
    i18,
    modifyBt,
    deleteBt,
    acceptBt,
    cancelBt,
    editDiv,
    editTx,
    editLb;

  mkBt = function (tx, action) {
    return $("button").text(tx).att("style", "width:100px;")
      .on(function (peer) { peer.onclick = action; });
  };

  $ = dmjs.ui.$;
  i18 = [
    ["Modify", "Modificar"],
    ["Delete", "Borrar"]
  ];

  dmjs.It.from(i18).each(function (e) {
    i18n.get().small.push(e);
  });

  modifyBt = mkBt(i18n._("Modify"), function () {
    control.modifyBegin();
  });
  deleteBt = mkBt(i18n._("Delete"), function () {
    control.delRule();
  });
  acceptBt = mkBt(i18n._("Accept"), function () {
    control.modifyAccept();
  });
  cancelBt = mkBt(i18n._("Cancel"), function () {
    control.modifyCancel();
  });
  editDiv = $("div");
  editTx = $("input").att("type", "text").att("style", "width:220px;");
  editLb = $("div").att("class", "frame2")
    .att("style", "text-align:center;width:220px;");

  /** @return {!dmjs.DomObject} */
  this.panel = function () {
    return $("div")
      .add($("table")
        .add($("tr")
          .add($("td").att("class", "border")
            .add($("table")
              .add($("tr").add($("td").add(modifyBt)))
              .add($("tr").add($("td").add(deleteBt)))))
          .add($("td").att("class", "border")
            .add($("table")
              .add($("tr").add($("td").att("colspan", "2")
                .add(editDiv.add(editLb))))
              .add($("tr")
                .add($("td").att("style", "width:50%;text-align:center;")
                  .add(acceptBt))
                .add($("td").att("style", "width:50%;text-align:center;")
                  .add(cancelBt)))))));
  };

  /** */
  this.init = function () {
    modifyBt.disabled(true);
    deleteBt.disabled(true);
    acceptBt.disabled(true);
    cancelBt.disabled(true);
    editLb.text("---");
  };

  /**
   * Sets widgets when a rule is selected
   * @param {!string} id Rule name.
   */
  this.initRule = function (id) {
    var
      corpus;

    corpus = control.vars().corpus;
    modifyBt.disabled(false);
    if (corpus.entry(id).demo().allBases(corpus).length > 0) {
      deleteBt.disabled(false);
    } else {
      deleteBt.disabled(true);
    }
    acceptBt.disabled(true);
    cancelBt.disabled(true);
    editLb.text(id);
  };

  /** */
  this.initModify = function () {
    modifyBt.disabled(true);
    deleteBt.disabled(true);
    acceptBt.disabled(false);
    cancelBt.disabled(false);
    editTx.value(editLb.text());
    editDiv.removeAll().add(editTx);
    editTx.peer.focus();
  };

  /** @return {!string} */
  this.selectedRule = function () {
    return editLb.text();
  };

  /** @return {!string} Rule name in label */
  this.previousRuleName = function () {
    return editLb.text();
  };

  /** @return {!string} Raw rule name in textField */
  this.nextRuleName = function () {
    return editTx.value();
  };

};
