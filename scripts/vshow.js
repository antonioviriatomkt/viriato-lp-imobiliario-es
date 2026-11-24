/* V-SHOW section — the tour only loads when the visitor asks for it, so it
   neither slows the page down nor captures the scroll on phones while people
   scroll past it. */
(function () {
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('.vshow-tour .vshow-start');
    if (!btn) return;
    var section = btn.closest('.vshow-tour');
    var frame = section.querySelector('iframe');
    frame.src = frame.getAttribute('data-src');
    section.classList.add('playing');
    frame.focus();
  });
})();
