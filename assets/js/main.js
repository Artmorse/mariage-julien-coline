/*
 * The bare minimum: opening and closing the mobile menu.
 *
 * Everything else (animations, transitions, focus, keyboard dismissal) is
 * handled by the CSS and by the native <dialog> element.
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

  // Close on a click on the backdrop, outside the navigation area.
  menu.addEventListener('click', function (event) {
    if (event.target === menu) close();
  });

  // The menu must not stay open when navigating back from the cache.
  window.addEventListener('pageshow', function () {
    if (menu.open) close();
  });
})();
