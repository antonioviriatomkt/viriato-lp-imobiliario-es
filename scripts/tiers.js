/* Thinking 360° — Launch / Experience / Growth, in the layout of the
   viriato.com.pt homepage services (V-SHOW®): images beside a card.

   - Images change on their own every 5 s (crossfade), only while the tier is
     on screen; they pause under the mouse, and don't move
     for visitors who ask for reduced motion. Swipe changes them on phones.
     Only the image on show and the next one are downloaded (phones on mobile
     data), in the size the screen needs (srcset in images/tiers/).
   - On phones the services start closed, so the list reads at a glance.
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

    // hidden slides carry their image in data-src/data-srcset: it is only
    // downloaded once that slide is next in line
    function load(n) {
      var img = slides[(n + slides.length) % slides.length].querySelector('img');
      if (!img || !img.dataset.src) return;
      img.srcset = img.dataset.srcset;
      img.src = img.dataset.src;
      img.loading = 'eager';
      img.removeAttribute('data-srcset');
      img.removeAttribute('data-src');
    }
    function go(n) {
      slides[i].classList.remove('active');
      slides[i].setAttribute('aria-hidden', 'true');
      i = (n + slides.length) % slides.length;
      slides[i].classList.add('active');
      slides[i].removeAttribute('aria-hidden');
      load(i + 1);
    }
    function run() {
      clearInterval(timer); timer = null;
      if (!still && visible && !held) timer = setInterval(function () { go(i + 1); }, DELAY);
    }
    function hold(on) { held = on; run(); }

    // only rotate while on screen; fetch the next image once it is close
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting) load(i + 1);
      }, { rootMargin: '400px 0px' }).observe(slider);
      new IntersectionObserver(function (entries) {
        visible = entries[0].isIntersecting; run();
      }, { threshold: 0.3 }).observe(slider);
    } else { load(i + 1); visible = true; run(); }

    // pause while the mouse is over the images (not the card: reading it
    // shouldn't stop them). Mouse only: a tap would otherwise "enter" and
    // never leave, stopping the images for good on phones.
    slider.addEventListener('pointerenter', function (e) { if (e.pointerType === 'mouse') hold(true); });
    slider.addEventListener('pointerleave', function (e) { if (e.pointerType === 'mouse') hold(false); });

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

  var phone = window.matchMedia && matchMedia('(max-width: 799px)').matches;
  document.querySelectorAll('.tier-services').forEach(function (list) {
    var items = list.querySelectorAll('details');
    if (phone) items.forEach(function (d) { d.open = false; });
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
