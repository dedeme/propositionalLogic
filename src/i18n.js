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

/*globals goog, dmjs, i18n:true */

/** Functions for internalización */
goog.provide("i18n");
goog.require("dmjs.I18n");

(function (ns) {
  'use strict';

  var
    /** @private @type {!dmjs.I18n} */
    i18;

  i18 = new dmjs.I18n(["en", "es"]);

  i18.small = [
// global
    ["Yes", "Si"],
    ["No", "No"],
    ["Accept", "Aceptar"],
    ["Cancel", "Cancelar"],
// view.menu
    ["Home", "Inicio"],
    ["Configuration", "Configuración"],
    ["Log out", "Cerrar sesión"],
// view.configuration
    ["Change", "Cambiar"],
// view.passIn
    ["Login", "Identificación"],
    ["Password", "Contraseña"],
    ["User name is missing", "Falta indicar el nombre del usuario"],
    ["Password is missing", "Falta indicar la contraseña"],
// view.passChange
    ["Change Password", "Cambiar contraseña"],
    ["Current password", "Contraseña actual"],
    ["New password", "Nueva contraseña"],
    ["Comfirm password", "Confirmar contraseña"],
    ["Check gray<br>squares", "Hacer click en<br>las casillas grises"],
    ["Current password is missing", "Falta indicar la contraseña actual"],
    ["New password is missing", "Falta indicar la nueva contraseña"],
    ["Comfirm password is missing", "Falta por confirmar la contraseña"],
    ["New and confirm are different", "La confirmación no coincide"]
  ];

  i18.big = [
// view.logout
    ["view.logout-message",
      "<p>Session correctly closed.<br><b>Good bye!</b></p>",
      "<p>La sesión se cerró correctamente.<br><b>¡Hasta pronto!</p>"],
// auth.expire
    ["auth.expire-message",
      "<p>Session is expired.<br>Click <a href=''>here</a> to continue.</p>",
      "<p>La sesión ha caducado<br>" +
        "<b>Pulse <a href=''>aquí</a> para continuar</p>"],
// view.configuration
    ["view.configuration-lang",
      "Language",
      "Idioma"],
// auth.passIn
    ["auth.passIn-pass is deme",
      "Your current password is 'deme'.\n" +
      "You must change it for going on.",
      "Su actual contraseña es 'deme'.\n" +
      "Para continuar debe cambiarla."],
    ["auth.passIn-error",
      "An authentication error has occurred.<br>Please try again.",
      "Se ha producido un error en la indentificación." +
        "<br>Por favor, inténtelo de nuevo"],
// auth.passChange
    ["auth.passChange-error",
      "An authentication error has occurred.<br>Please try again.",
      "Se ha producido un error en los datos." +
        "<br>Por favor, inténtelo de nuevo"]
  ];

  /** @type {!function(!string):!string} */
  ns._ = i18._();
  /** @type {!function(!string, ...[?]):!string} */
  ns.__ = i18.__();
  /** @type {!function(!string):!string} */
  ns.b_ = i18.b_();
  /** @type {!function(!string, ...[?]):!string} */
  ns.b__ = i18.b__();
  /** @return {!dmjs.I18n} */
  ns.get = function () { return i18; };

}(i18n));
