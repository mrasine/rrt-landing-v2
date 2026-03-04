// Background music player
(function() {
  const audio = new Audio('assets/rrt-media/art/home-page-audio.mp3');
  audio.loop = true;
  audio.volume = 0.3;
  
  const btn = document.createElement('button');
  btn.id = 'musicBtn';
  btn.innerHTML = '🎵';
  btn.setAttribute('aria-label', 'Play music');
  btn.style.cssText = 'position:fixed;bottom:150px;right:20px;z-index:999999;width:50px;height:50px;border-radius:50%;background:rgba(212,175,55,0.95);border:2px solid #d4af37;color:#05070a;font-size:1.3rem;cursor:pointer;box-shadow:0 4px 12px rgba(0,0,0,0.3);display:none;';
  
  btn.addEventListener('click', function() {
    if (audio.paused) {
      audio.play().catch(() => {});
      btn.innerHTML = '🎶';
      btn.setAttribute('aria-label', 'Pause music');
    } else {
      audio.pause();
      btn.innerHTML = '🎵';
      btn.setAttribute('aria-label', 'Play music');
    }
  });
  
  document.addEventListener('click', function firstClick() {
    btn.style.display = 'flex';
    document.removeEventListener('click', firstClick);
  });
  
  document.body.appendChild(btn);
})();
