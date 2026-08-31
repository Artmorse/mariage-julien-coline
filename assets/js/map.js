/*
 * The map on the "Lieu" page.
 *
 * Every value — centre, zoom, tile URL, attribution, pins and their links — is
 * read from the data attributes written by layouts/_partials/map.html out of
 * hugo.toml. Nothing about the venue is hard-coded here.
 *
 * Runs after leaflet.js: both scripts are deferred, and `defer` keeps them in
 * document order.
 */
(function () {
  'use strict';

  var el = document.getElementById('venue-map');
  if (!el || typeof window.L === 'undefined') return;

  var data = el.dataset;
  var points = [];

  try {
    points = JSON.parse(data.markers || '[]');
  } catch (e) {
    points = [];
  }

  function escapeHtml(value) {
    return String(value === null || value === undefined ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // Leaflet cannot measure a hidden element, so the reveal comes first. The
  // container ships hidden so that a browser without JavaScript, or one that
  // failed to fetch Leaflet, shows the legend alone rather than an empty frame.
  el.hidden = false;

  // The colour treatment of the tiles, straight from hugo.toml. See map.css.
  if (data.tileFilter) {
    el.style.setProperty('--map-tile-filter', data.tileFilter);
  }

  var fitZoom = parseInt(data.zoom, 10);
  var maxZoom = parseInt(data.maxZoom, 10);

  // On a touch screen the map is one block inside a long page: letting one
  // finger drag it would trap anyone trying to scroll past. Panning is left to
  // the zoom buttons and to a two-finger pinch. The wheel is neutralised on a
  // laptop for the same reason.
  var touch = window.matchMedia('(hover: none)').matches;

  // Reduced motion is honoured through Leaflet's own flags, never by cancelling
  // its transitions in CSS: Leaflet commits a new zoom level only once the
  // transition it started fires `transitionend`. Take that transition away and
  // the map silently stays at the previous zoom forever.
  var still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var map = L.map(el, {
    center: [parseFloat(data.lat), parseFloat(data.lon)],
    zoom: fitZoom,
    minZoom: parseInt(data.minZoom, 10),
    maxZoom: maxZoom,
    scrollWheelZoom: false,
    dragging: !touch,
    zoomAnimation: !still,
    fadeAnimation: !still,
    markerZoomAnimation: !still
  });

  // No `detectRetina`: the CARTO-style URLs carry a {r} placeholder, which
  // Leaflet already fills with "@2x" on a high-density screen. Using both
  // would scale the tiles twice.
  L.tileLayer(data.tiles, {
    subdomains: data.subdomains || 'abc',
    attribution: data.attribution,
    maxZoom: maxZoom
  }).addTo(map);

  // A pin is a number; the name it stands for is one tap away. No popup and no
  // link — the note and the Google Maps link stay in the legend, where they can
  // be read without aiming at a 28-pixel target.
  //
  // The pins are not focusable: they would add three tab stops that say exactly
  // what the three links of the legend, right below, already say. The name
  // reaches a screen reader through the `aria-label` instead.
  var markers = [];

  // Only one name at a time. A hovered tooltip closes itself on mouseout, but a
  // tapped one has no mouseout to wait for: without this, tapping each pin in
  // turn would leave three labels stacked on the map.
  function reveal(marker) {
    markers.forEach(function (other) {
      if (other !== marker) {
        other.closeTooltip();
      }
    });
    if (marker) {
      marker.openTooltip();
    }
  }

  points.forEach(function (point, index) {
    var number = index + 1;
    var label = point.label || '';

    var marker = L.marker([point.lat, point.lon], {
      keyboard: false,
      icon: L.divIcon({
        className: '',
        html:
          '<span class="map-pin" role="img" aria-label="Repère ' + number +
          ' : ' + escapeHtml(label) + '">' + number + '</span>',
        iconSize: [28, 28],
        iconAnchor: [14, 14]
      })
    }).addTo(map);

    if (label) {
      marker.bindTooltip(label, { direction: 'top', offset: [0, -16] });

      // Leaflet opens a tooltip on hover, and wires the click itself only on a
      // touch browser. Bound here for every pointer: a bare number is no more
      // readable under a mouse than under a thumb.
      marker.on('click', function () {
        reveal(marker);
      });
    }

    markers.push(marker);
  });

  // Tapping the map is how you put a name away again.
  map.on('click', function () {
    reveal(null);
  });

  // Frame every pin rather than trusting the configured centre: adding a point
  // in hugo.toml is then enough, with nothing to recompute by hand. On a narrow
  // screen this is also what pulls the zoom back so no pin falls outside.
  //
  // The fit is capped at `zoom`, not at `maxZoom`: the pins here sit within a
  // hundred metres of each other, and left alone Leaflet would zoom in until
  // the village around them disappeared. `zoom` is the tightest framing that
  // still reads; `maxZoom` stays what a guest can reach by hand.
  if (points.length > 1) {
    var bounds = points.map(function (point) {
      return [point.lat, point.lon];
    });

    // Done again on every resize, because Leaflet keeps its zoom when the
    // container changes size: a phone turned sideways, or a window dragged
    // narrower, would otherwise keep a framing computed for the old box and
    // push the outermost pins past the edge.
    //
    // `animate: false` because there is nothing to follow here — the map has
    // not been looked at yet, and a resize is not a movement the eye tracks.
    var frame = function () {
      map.fitBounds(bounds, {
        padding: [36, 36],
        maxZoom: fitZoom,
        animate: false
      });
    };

    frame();
    map.on('resize', frame);
  }
})();
