/* V-SHOW section.

   - The tour only loads when the visitor asks for it ("Explorar a visita
     virtual"), so it doesn't slow the page down.
   - The tour is a page from another site: inside it, the mouse wheel zooms
     the tour and a swipe turns the view, so the page can't scroll while the
     pointer is over it. A transparent shield sits over the tour ("scroll
     mode") so the page scrolls normally; a click/tap on it switches to
     "explore mode" and the tour gets the pointer. Leaving the tour with the
     mouse, or scrolling it mostly out of view, goes back to scroll mode. */
(function () {
  var section = document.querySelector('.vshow-tour');
  if (!section) return;
  var frame = section.querySelector('iframe');

  var shield = document.createElement('div');
  shield.className = 'vshow-shield';
  shield.innerHTML = '<span class="vshow-hint"><span class="mouse">Clique para explorar a visita</span><span class="touch">Toque para explorar a visita</span></span>';
  frame.insertAdjacentElement('afterend', shield);

  function explore(on) { section.classList.toggle('exploring', on); }

  section.querySelector('.vshow-start').addEventListener('click', function () {
    frame.src = frame.getAttribute('data-src');
    section.classList.add('playing');
    explore(true); // they just asked to explore
    frame.focus();
  });
  shield.addEventListener('click', function () { explore(true); frame.focus(); });
  // only a real mouse leaving counts (a finger lifting fires a leave too)
  section.addEventListener('pointerleave', function (e) {
    if (e.pointerType === 'mouse') explore(false);
  });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      if (entries[0].intersectionRatio < 0.5) explore(false);
    }, { threshold: [0, 0.5] }).observe(section);
  }
})();
