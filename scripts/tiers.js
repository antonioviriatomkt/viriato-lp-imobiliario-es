/* Thinking 360° — Launch / Experience / Growth, in the layout of the
   viriato.com.pt homepage services (V-SHOW®, CGI Images).

   - Image slider per tier: arrows, counter, swipe, arrow keys.
   - Services accordion: <details name="…"> already keeps one open per tier
     in current browsers; this closes the others where `name` isn't supported.
   - "Pedir proposta …" preselects the pack in the contact form. */
(function () {
  document.querySelectorAll('[data-tier-slider]').forEach(function (slider) {
    var slides = slider.querySelectorAll('.tier-slides > figure');
    var count = slider.querySelector('.tier-count b');
    var i = 0;
    if (slides.length < 2) { slider.classList.add('single'); return; }

    // hidden slides never load lazily: fetch them all once the slider is near
    function preload() {
      slider.querySelectorAll('img[loading="lazy"]').forEach(function (img) { img.loading = 'eager'; });
    }
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting) { preload(); io.disconnect(); }
      }, { rootMargin: '600px 0px' });
      io.observe(slider);
    } else preload();

    function go(n) {
      slides[i].classList.remove('active');
      slides[i].setAttribute('aria-hidden', 'true');
      i = (n + slides.length) % slides.length;
      slides[i].classList.add('active');
      slides[i].removeAttribute('aria-hidden');
      count.textContent = i + 1;
    }
    slider.querySelector('.prev').addEventListener('click', function () { go(i - 1); });
    slider.querySelector('.next').addEventListener('click', function () { go(i + 1); });
    slider.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') go(i - 1);
      if (e.key === 'ArrowRight') go(i + 1);
    });

    // swipe (touch only; the mouse uses the arrows)
    var x0 = null, y0 = null;
    slider.addEventListener('touchstart', function (e) {
      x0 = e.touches[0].clientX; y0 = e.touches[0].clientY;
    }, { passive: true });
    slider.addEventListener('touchend', function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? i + 1 : i - 1);
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
