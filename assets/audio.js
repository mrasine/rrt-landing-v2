// Floating music button (all pages)
(function() {
  var audio = new Audio('assets/rrt-media/art/home-page-audio.mp3');
  audio.loop = true;
  audio.volume = 0.3;

  var btn = document.createElement('button');
  btn.className = 'floating-btn floating-btn--sound visible';
  btn.innerHTML = '<i class="fas fa-music"></i>';
  btn.setAttribute('aria-label', 'Play music');

  btn.addEventListener('click', function() {
    if (audio.paused) {
      audio.play().catch(function() {});
      btn.innerHTML = '<i class="fas fa-volume-up"></i>';
      btn.setAttribute('aria-label', 'Pause music');
    } else {
      audio.pause();
      btn.innerHTML = '<i class="fas fa-music"></i>';
      btn.setAttribute('aria-label', 'Play music');
    }
  });

  document.body.appendChild(btn);
})();
