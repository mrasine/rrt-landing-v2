// Background music player — synced with video mute button
(function() {
  var audio = new Audio('assets/rrt-media/art/home-page-audio.mp3');
  audio.loop = true;
  audio.volume = 0.3;

  var btn = document.createElement('button');
  btn.className = 'floating-btn floating-btn--sound visible';
  btn.innerHTML = '<i class="fas fa-music"></i>';
  btn.setAttribute('aria-label', 'Play music');

  function setPlaying() {
    btn.innerHTML = '<i class="fas fa-volume-up"></i>';
    btn.setAttribute('aria-label', 'Pause music');
  }
  function setPaused() {
    btn.innerHTML = '<i class="fas fa-music"></i>';
    btn.setAttribute('aria-label', 'Play music');
  }

  btn.addEventListener('click', function() {
    if (audio.paused) {
      audio.play().catch(function() {});
      setPlaying();
    } else {
      audio.pause();
      setPaused();
    }
  });

  // Sync with the video unmute button on home page
  var video = document.getElementById('homeVideo');
  if (video) {
    // When video is unmuted, pause background music
    video.addEventListener('volumechange', function() {
      if (!video.muted && !audio.paused) {
        audio.pause();
        setPaused();
      }
    });
    // When music starts, mute video so both don't play at once
    audio.addEventListener('play', function() {
      if (!video.muted) {
        video.muted = true;
      }
    });
  }

  document.body.appendChild(btn);
})();
