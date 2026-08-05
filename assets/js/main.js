/*
 * Le strict minimum : ouverture et fermeture du menu mobile.
 *
 * Tout le reste (animations, transitions, focus, fermeture au clavier) est géré
 * par le CSS et par l'élément natif <dialog>.
 */
(function () {
  'use strict';

  var menu = document.getElementById('menu');
  if (!menu) return;

  var open = document.querySelector('[data-menu-open]');

  function close() {
    menu.close();
  }

  if (open) {
    open.addEventListener('click', function () {
      menu.showModal();
    });
  }

  document.querySelectorAll('[data-menu-close]').forEach(function (el) {
    el.addEventListener('click', close);
  });

  // Fermeture au clic sur le fond, hors de la zone de navigation.
  menu.addEventListener('click', function (event) {
    if (event.target === menu) close();
  });

  // Le menu ne doit pas rester ouvert lors d'un retour arrière depuis le cache.
  window.addEventListener('pageshow', function () {
    if (menu.open) close();
  });
})();
