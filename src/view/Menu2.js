/*
 * Copyright 17-Jan-2015 ºDeme
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

/*globals goog, dmjs, rule, view */

goog.provide("view.Menu2");

goog.require("dmjs.It");
goog.require("dmjs.Map");
goog.require("dmjs.ui");
/**
 * @constructor
 * @param {!dmjs.Map.<!string, !Array.<!string>>} map
 * @param {!function(!string)} action Action to make when an option is selected.
 *  String value can be "---" or the selected option.
 */
view.Menu2 = function (map, action) {
  "use strict";

  var
    reload,
    $,
    sel,
    root,
    rows;

  reload = function () {
    rows = [];
    map.keys().each(function (k) {
      if (k === sel) {
        rows.push(
          $("tr")
            .add($("td").att("colspan", "2")
              .add(dmjs.ui.link(function () {
                sel = "";
                reload();
                action("---");
              })
                .att(
                  "style",
                  "cursor:pointer;color:#408000;font-weight: bold;" +
                    "font-family: monospace;"
                )
                .text(k)))
        );

        dmjs.It.from(map.get(k) || ["??"]).each(function (e) {
          rows.push(
            $("tr")
              .add($("td").att("width", "10px")
                .att("style", "font-family: monospace;")
                .text("  "))
              .add($("td").att("align", "left")
                .add(dmjs.ui.link(function () {
                  action(e);
                })
                  .att(
                    "style",
                    "cursor:pointer;color:#000080;" +
                      "font-family: monospace;"
                  )
                  .text(e)))
          );
        });
      } else {
        rows.push(
          $("tr")
            .add($("td").att("colspan", "2").att("align", "left")
              .add(dmjs.ui.link(function () {
                sel = k;
                reload();
                action("---");
              })
                .att(
                  "style",
                  "cursor:pointer;color:#000080;font-weight: bold;" +
                    "font-family: monospace;"
                )
                .text(k)))
        );
      }
    });

    root.removeAll()
      .add($("table").att("width", "100%")
        .att(
          "style",
          "border: 1px solid rgb(110,130,150);" +
            "background-color: rgb(245, 245, 248);"
        )
        .addIt(dmjs.It.from(rows)));

  };

  $ = dmjs.ui.$;
  sel = "";
  root = $("div");

  reload();

  /** @return {!dmjs.DomObject} */
  this.show = function () {
    return root;
  };

  /**
   * Forces a group selection.
   * @param {!string} id Group name. If it does not exists all groups will
   *  be closed. "" close all groups.
   */
  this.selectGroup = function (id) {
    sel = id;
    reload();
  };

  /**
   * @return {!string} The selected group
   */
  this.selectedGroup = function () {
    return sel;
  };

};
