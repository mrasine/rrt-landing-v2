// Unified sound control: video unmute button + floating music button
(function() {
  var audio = new Audio('assets/rrt-media/art/home-page-audio.mp3');
  audio.loop = true;
  audio.volume = 0.3;

  var video = document.getElementById('homeVideo');
  var unmuteBtn = document.getElementById('unmuteBtn');

  // --- Floating music button (all pages) ---
  var musicBtn = document.createElement('button');
  musicBtn.className = 'floating-btn floating-btn--sound visible';
  musicBtn.innerHTML = '<i class="fas fa-music"></i>';
  musicBtn.setAttribute('aria-label', 'Play music');

  function musicPlaying() {
    musicBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    musicBtn.setAttribute('aria-label', 'Pause music');
  }
  function musicPaused() {
    musicBtn.innerHTML = '<i class="fas fa-music"></i>';
    musicBtn.setAttribute('aria-label', 'Play music');
  }

  function updateVideoBtn() {
    if (!unmuteBtn || !video) return;
    unmuteBtn.textContent = video.muted ? '🔇' : '🔊';
    unmuteBtn.setAttribute('aria-label', video.muted ? 'Unmute video' : 'Mute video');
  }

  // Music button: toggle background music, mute video if needed
  musicBtn.addEventListener('click', function() {
    if (audio.paused) {
      // Mute video before playing music
      if (video && !video.muted) {
        video.muted = true;
        updateVideoBtn();
      }
      audio.play().catch(function() {});
      musicPlaying();
    } else {
      audio.pause();
      musicPaused();
    }
  });

  // Video unmute button: toggle video sound, pause music if needed
  if (unmuteBtn && video) {
    unmuteBtn.addEventListener('click', function() {
      video.muted = !video.muted;
      if (!video.muted) {
        video.volume = 1.0;
        // Pause music when video is unmuted
        if (!audio.paused) {
          audio.pause();
          musicPaused();
        }
      }
      updateVideoBtn();
      if (video.paused) video.play();
    });
    updateVideoBtn();
  }

  document.body.appendChild(musicBtn);
})();
