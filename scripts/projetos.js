/* Projetos Selecionados — drag with the finger on phones and tablets.

   The slider is main.js's `hero` (it moves by animating scrollLeft and has
   no swipe of its own); on phones its arrows are hidden (landing.css), so
   this is how visitors change project there:

   - the cards follow the finger while it moves sideways (vertical moves
     scroll the page as usual: touch-action: pan-y in landing.css);
   - on release, a drag past ~15% of the card (or a quick flick) goes to the
     next / previous project through hero.nav, so the autoplay timer and the
     progress bar restart as with the arrows; a short drag snaps back.
   - A tap still opens the project's images (scripts/galeria.js). */
(function () {
  var slider = document.querySelector('section.hero.new section.slides');
  if (!slider) return;

  var x0, y0, t0, left0, dragging, decided;

  function nav(where) {
    if (!window.jQuery || !window.hero) return;
    window.hero.nav(window.jQuery(slider).closest('.hero'), where);
  }
  function stopAutoplay() {
    // main.js keeps one timer per .hero, by its index among its siblings;
    // hero.nav() starts it again when the drag ends
    if (!window.jQuery || !window.hero) return;
    var h = window.jQuery(slider).closest('.hero');
    clearInterval(window.hero.timers[h.index()]);
    window.jQuery(slider).stop(); // a running slide animation
  }

  slider.addEventListener('touchstart', function (e) {
    if (e.touches.length !== 1) return;
    x0 = e.touches[0].clientX;
    y0 = e.touches[0].clientY;
    t0 = Date.now();
    left0 = slider.scrollLeft;
    dragging = false;
    decided = false;
  }, { passive: true });

  slider.addEventListener('touchmove', function (e) {
    if (x0 === undefined) return;
    var dx = e.touches[0].clientX - x0, dy = e.touches[0].clientY - y0;
    if (!decided) {
      if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
      decided = true;
      dragging = Math.abs(dx) > Math.abs(dy); // sideways = drag; else the page scrolls
      if (dragging) stopAutoplay();
    }
    if (dragging) slider.scrollLeft = left0 - dx;
  }, { passive: true });

  function end(e) {
    if (x0 === undefined) return;
    var wasDragging = dragging;
    var dx = (e.changedTouches && e.changedTouches[0] ? e.changedTouches[0].clientX : x0) - x0;
    x0 = undefined;
    if (!wasDragging) return;
    var active = slider.querySelector(':scope > section.active');
    var w = active ? active.offsetWidth : slider.offsetWidth;
    var flick = Math.abs(dx) > 30 && Date.now() - t0 < 250;
    if (Math.abs(dx) > w * 0.15 || flick) nav(dx < 0 ? 'next' : 'prev');
    else nav(Array.prototype.indexOf.call(slider.children, active)); // snap back
  }
  slider.addEventListener('touchend', end, { passive: true });
  slider.addEventListener('touchcancel', end, { passive: true });
})();
