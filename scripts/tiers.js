/* Thinking 360° — Launch / Experience / Growth, in the layout of the
   viriato.com.pt homepage services (V-SHOW®): images beside a card.

   - Images change on their own every 5 s (crossfade), only while the tier is
     on screen; they pause under the mouse, and don't move
     for visitors who ask for reduced motion. Swipe changes them on phones.
   - Services accordion: <details name="…"> already keeps one open per tier
     in current browsers; this closes the others where `name` isn't supported.
   - "Pedir proposta …" preselects the pack in the contact form. */
(function () {
  var DELAY = 5000;
  var still = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.querySelectorAll('[data-tier-slider]').forEach(function (slider) {
    var slides = slider.querySelectorAll('.tier-slides > figure');
    var i = 0, timer = null, visible = false, held = false;
    if (slides.length < 2) return;

    function go(n) {
      slides[i].classList.remove('active');
      slides[i].setAttribute('aria-hidden', 'true');
      i = (n + slides.length) % slides.length;
      slides[i].classList.add('active');
      slides[i].removeAttribute('aria-hidden');
    }
    function run() {
      clearInterval(timer); timer = null;
      if (!still && visible && !held) timer = setInterval(function () { go(i + 1); }, DELAY);
    }
    function hold(on) { held = on; run(); }

    // hidden slides never load lazily: fetch them all once the tier is near,
    // and only rotate while it is on screen
    function preload() {
      slider.querySelectorAll('img[loading="lazy"]').forEach(function (img) { img.loading = 'eager'; });
    }
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting) preload();
      }, { rootMargin: '600px 0px' }).observe(slider);
      new IntersectionObserver(function (entries) {
        visible = entries[0].isIntersecting; run();
      }, { threshold: 0.3 }).observe(slider);
    } else { preload(); visible = true; run(); }

    // pause while the mouse is over the images (not the card: reading it
    // shouldn't stop them)
    slider.addEventListener('mouseenter', function () { hold(true); });
    slider.addEventListener('mouseleave', function () { hold(false); });

    // swipe (touch)
    var x0 = null, y0 = null;
    slider.addEventListener('touchstart', function (e) {
      x0 = e.touches[0].clientX; y0 = e.touches[0].clientY;
    }, { passive: true });
    slider.addEventListener('touchend', function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) { go(dx < 0 ? i + 1 : i - 1); run(); }
      x0 = null;
    }, { passive: true });
  });

  document.querySelectorAll('.tier-services').forEach(function (list) {
    var items = list.querySelectorAll('details');
    items.forEach(function (d) {
      d.addEventListener('toggle', function () {
        if (!d.open) return;
        items.forEach(function (o) { if (o !== d) o.open = false; });
      });
    });
  });

  var select = document.getElementById('services');
  document.querySelectorAll('.tier-cta[data-pack]').forEach(function (a) {
    a.addEventListener('click', function () {
      if (select) select.value = a.getAttribute('data-pack');
    });
  });
})();
