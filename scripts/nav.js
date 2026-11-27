/* Header: slides up out of view once the visitor scrolls past the hero,
   and comes back when they scroll up into the hero again. */
(function () {
  var nav = document.getElementById('nav');
  var hero = document.querySelector('header.hero');
  if (!nav || !hero || !('IntersectionObserver' in window)) return;

  new IntersectionObserver(function (entries) {
    var e = entries[0];
    // hidden only when the hero is entirely above the viewport
    nav.classList.toggle('nav-hidden', !e.isIntersecting && e.boundingClientRect.bottom <= 0);
  }).observe(hero);
})();
