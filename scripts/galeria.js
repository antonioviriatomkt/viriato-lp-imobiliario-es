/* Projetos Selecionados — tapping the project in front opens its images
   in a popup instead of leaving the page.

   The images live in the Marketing Suite gallery (viriato.com.pt/aw/,
   e.g. #vh-1 for Villa Heaven); they are loaded from there one at a time,
   plus the neighbours, never the whole gallery. Slides get the gallery via
   data-gallery="vh" etc. */
(function () {
  var GALLERIES = {
    "vh": {
      "title": "Villa Heaven",
      "images": [
        "https://viriato.com.pt/aw/images/vh/vh1.webp",
        "https://viriato.com.pt/aw/images/vh/vh2.webp",
        "https://viriato.com.pt/aw/images/vh/vh3.webp",
        "https://viriato.com.pt/aw/images/vh/vh4.webp",
        "https://viriato.com.pt/aw/images/vh/vh5.webp",
        "https://viriato.com.pt/aw/images/vh/vh6.webp",
        "https://viriato.com.pt/aw/images/vh/vh7.webp",
        "https://viriato.com.pt/aw/images/vh/vh8.webp",
        "https://viriato.com.pt/aw/images/vh/vh9.webp",
        "https://viriato.com.pt/aw/images/vh/vh10.webp",
        "https://viriato.com.pt/aw/images/vh/vh11.webp",
        "https://viriato.com.pt/aw/images/vh/vh12.webp",
        "https://viriato.com.pt/aw/images/vh/vh13.webp",
        "https://viriato.com.pt/aw/images/vh/vh14.webp",
        "https://viriato.com.pt/aw/images/vh/vh15.webp",
        "https://viriato.com.pt/aw/images/vh/vh16.webp",
        "https://viriato.com.pt/aw/images/vh/vh17.webp",
        "https://viriato.com.pt/aw/images/vh/vh18.webp",
        "https://viriato.com.pt/aw/images/vh/vh19.webp",
        "https://viriato.com.pt/aw/images/vh/vh20.webp",
        "https://viriato.com.pt/aw/images/vh/vh21.webp",
        "https://viriato.com.pt/aw/images/vh/vh22.webp",
        "https://viriato.com.pt/aw/images/vh/vh23.webp",
        "https://viriato.com.pt/aw/images/vh/vh24.webp",
        "https://viriato.com.pt/aw/images/vh/vh25.webp",
        "https://viriato.com.pt/aw/images/vh/vh26.webp",
        "https://viriato.com.pt/aw/images/vh/vh27.webp",
        "https://viriato.com.pt/aw/images/vh/vh28.webp",
        "https://viriato.com.pt/aw/images/vh/vh29.webp",
        "https://viriato.com.pt/aw/images/vh/vh30.webp",
        "https://viriato.com.pt/aw/images/vh/vh31.webp",
        "https://viriato.com.pt/aw/images/vh/vh32.webp",
        "https://viriato.com.pt/aw/images/vh/vh33.webp",
        "https://viriato.com.pt/aw/images/vh/vh34.webp",
        "https://viriato.com.pt/aw/images/vh/vh35.webp",
        "https://viriato.com.pt/aw/images/vh/vh36.webp",
        "https://viriato.com.pt/aw/images/vh/vh37.webp",
        "https://viriato.com.pt/aw/images/vh/vh38.webp",
        "https://viriato.com.pt/aw/images/vh/vh39.webp",
        "https://viriato.com.pt/aw/images/vh/vh40.webp",
        "https://viriato.com.pt/aw/images/vh/vh41.webp"
      ]
    },
    "natv": {
      "title": "Natura Village",
      "images": [
        "https://viriato.com.pt/aw/images/natv/natv1.webp",
        "https://viriato.com.pt/aw/images/natv/natv2.webp",
        "https://viriato.com.pt/aw/images/natv/natv3.webp",
        "https://viriato.com.pt/aw/images/natv/natv4.webp",
        "https://viriato.com.pt/aw/images/natv/natv5.webp",
        "https://viriato.com.pt/aw/images/natv/natv6.webp",
        "https://viriato.com.pt/aw/images/natv/natv7.webp",
        "https://viriato.com.pt/aw/images/natv/natv8.webp",
        "https://viriato.com.pt/aw/images/natv/natv9.webp",
        "https://viriato.com.pt/aw/images/natv/natv10.webp",
        "https://viriato.com.pt/aw/images/natv/natv11.webp",
        "https://viriato.com.pt/aw/images/natv/natv12.webp",
        "https://viriato.com.pt/aw/images/natv/natv13.webp",
        "https://viriato.com.pt/aw/images/natv/natv14.webp",
        "https://viriato.com.pt/aw/images/natv/natv15.webp"
      ]
    },
    "ap": {
      "title": "Atlantic Pearl",
      "images": [
        "https://viriato.com.pt/aw/images/ap/ap0.webp",
        "https://viriato.com.pt/aw/images/ap/ap1.webp",
        "https://viriato.com.pt/aw/images/ap/ap2.webp",
        "https://viriato.com.pt/aw/images/ap/ap3.webp",
        "https://viriato.com.pt/aw/images/ap/ap4.webp",
        "https://viriato.com.pt/aw/images/ap/ap5.webp",
        "https://viriato.com.pt/aw/images/ap/ap6.webp",
        "https://viriato.com.pt/aw/images/ap/ap7.webp",
        "https://viriato.com.pt/aw/images/ap/ap8.webp",
        "https://viriato.com.pt/aw/images/ap/ap9.webp",
        "https://viriato.com.pt/aw/images/ap/ap10.webp",
        "https://viriato.com.pt/aw/images/ap/ap11.webp",
        "https://viriato.com.pt/aw/images/ap/ap12.webp",
        "https://viriato.com.pt/aw/images/ap/ap13.webp",
        "https://viriato.com.pt/aw/images/ap/ap14.webp",
        "https://viriato.com.pt/aw/images/ap/ap15.webp",
        "https://viriato.com.pt/aw/images/ap/ap16.webp",
        "https://viriato.com.pt/aw/images/ap/ap17.webp",
        "https://viriato.com.pt/aw/images/ap/ap18.webp",
        "https://viriato.com.pt/aw/images/ap/ap19.webp"
      ]
    },
    "torre": {
      "title": "Torre",
      "images": [
        "https://viriato.com.pt/aw/images/torre/torre1.webp",
        "https://viriato.com.pt/aw/images/torre/torre2.webp",
        "https://viriato.com.pt/aw/images/torre/torre3.webp",
        "https://viriato.com.pt/aw/images/torre/torre4.webp",
        "https://viriato.com.pt/aw/images/torre/torre5.webp",
        "https://viriato.com.pt/aw/images/torre/torre6.webp",
        "https://viriato.com.pt/aw/images/torre/torre7.webp",
        "https://viriato.com.pt/aw/images/torre/torre8.webp",
        "https://viriato.com.pt/aw/images/torre/torre9.webp",
        "https://viriato.com.pt/aw/images/torre/torre10.webp",
        "https://viriato.com.pt/aw/images/torre/torre11.webp",
        "https://viriato.com.pt/aw/images/torre/torre12.webp",
        "https://viriato.com.pt/aw/images/torre/torre13.webp",
        "https://viriato.com.pt/aw/images/torre/torre14.webp"
      ]
    }
  };

  var lb, img, title, prevBtn, nextBtn, closeBtn, current, index = 0, lastFocus = null, touchX = null;

  function build() {
    lb = document.createElement('div');
    lb.className = 'lb';
    lb.hidden = true;
    lb.setAttribute('role', 'dialog');
    lb.setAttribute('aria-modal', 'true');
    lb.setAttribute('data-lenis-prevent', '');
    lb.innerHTML =
      '<div class="lb-bar"><p class="lb-title"></p>' +
      '<button type="button" class="lb-close" aria-label="Fechar"><svg viewBox="0 -960 960 960" width="24" height="24" fill="currentColor"><path d="M256-213.85 213.85-256l224-224-224-224L256-746.15l224 224 224-224L746.15-704l-224 224 224 224L704-213.85l-224-224-224 224Z"/></svg></button></div>' +
      '<button type="button" class="lb-nav lb-prev" aria-label="Imagem anterior"><svg viewBox="0 -960 960 960" width="28" height="28" fill="currentColor"><path d="M560-253.85 333.85-480 560-706.15 602.15-664l-184 184 184 184L560-253.85Z"/></svg></button>' +
      '<figure class="lb-stage"><img alt=""></figure>' +
      '<button type="button" class="lb-nav lb-next" aria-label="Imagem seguinte"><svg viewBox="0 -960 960 960" width="28" height="28" fill="currentColor"><path d="m517.85-480-184-184L376-706.15 602.15-480 376-253.85 333.85-296l184-184Z"/></svg></button>';
    document.body.appendChild(lb);
    img = lb.querySelector('img');
    title = lb.querySelector('.lb-title');
    prevBtn = lb.querySelector('.lb-prev');
    nextBtn = lb.querySelector('.lb-next');
    closeBtn = lb.querySelector('.lb-close');

    prevBtn.addEventListener('click', function () { go(-1); });
    nextBtn.addEventListener('click', function () { go(1); });
    closeBtn.addEventListener('click', close);
    lb.addEventListener('click', function (e) { if (e.target === lb || e.target.classList.contains('lb-stage')) close(); });
    img.addEventListener('load', function () { lb.classList.remove('loading'); });
    lb.addEventListener('touchstart', function (e) { touchX = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend', function (e) {
      if (touchX === null) return;
      var dx = e.changedTouches[0].clientX - touchX;
      touchX = null;
      if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
    });
    document.addEventListener('keydown', function (e) {
      if (lb.hidden) return;
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') go(-1);
      else if (e.key === 'ArrowRight') go(1);
    });
  }

  function show(i) {
    var list = current.images;
    index = (i + list.length) % list.length;
    lb.classList.add('loading');
    img.src = list[index];
    img.alt = current.title + ' — imagem ' + (index + 1) + ' de ' + list.length;
    // warm up the neighbours so next/previous feel instant
    [index + 1, index - 1].forEach(function (n) { new Image().src = list[(n + list.length) % list.length]; });
  }
  function go(step) { show(index + step); }

  function open(key) {
    if (!GALLERIES[key]) return;
    if (!lb) build();
    current = GALLERIES[key];
    title.textContent = current.title;
    lb.setAttribute('aria-label', 'Galeria — ' + current.title);
    lastFocus = document.activeElement;
    lb.hidden = false;
    document.documentElement.classList.add('lb-open'); // overflow hidden: also pauses Lenis (autoToggle)
    show(0);
    closeBtn.focus();
  }
  function close() {
    lb.hidden = true;
    img.removeAttribute('src');
    document.documentElement.classList.remove('lb-open');
    if (lastFocus) lastFocus.focus();
  }

  // Capture phase: decide before main.js reacts. A tap on a slide that is not
  // in front only brings it to the front (main.js); a tap on the one in front
  // opens its gallery. Taps on "Ver projeto" keep going to the project site.
  document.addEventListener('click', function (e) {
    var slide = e.target.closest('section.hero.new section.slides > section[data-gallery]');
    if (!slide || !slide.classList.contains('active') || e.target.closest('a')) return;
    e.preventDefault();
    open(slide.getAttribute('data-gallery'));
  }, true);
})();
