// RRT Landing Page - Main JavaScript

document.addEventListener('DOMContentLoaded', () => {
  // Auto-update copyright year
  document.querySelectorAll('.copyright-year').forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  // Hamburger menu toggle
  const navToggle = document.querySelector('.nav-toggle');
  const mainNav = document.getElementById('main-nav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      mainNav.classList.toggle('open');
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !expanded);
    });
    mainNav.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        mainNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Handle booking form submission
  const trialForm = document.getElementById('trial-form');
  if (trialForm) {
    trialForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const formData = new FormData(trialForm);
      const data = Object.fromEntries(formData.entries());
      
      // Show loading state
      const submitBtn = trialForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Submitting...';
      submitBtn.disabled = true;
      
      try {
        // In production, this would POST to /api/bookings
        // For demo, show success
        alert('Thank you! We\'ll contact you within 24 hours to schedule your free trial class.');
        trialForm.reset();
      } catch (error) {
        alert('Error submitting form. Please try again or call us at (718) 689-2469');
      } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    });
  }
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth'
          });
        }
      }
    });
  });
  
  // Add active nav state based on current page
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage || (currentPage === '' && linkPage === '/')) {
      link.classList.add('active');
    }
  });
});

// Hide sticky CTA at bottom of page on mobile
(function() {
  var lastScroll = 0;
  window.addEventListener('scroll', function() {
    var cta = document.querySelector('.mobile-sticky-cta');
    if (!cta) return;
    
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    var docHeight = document.documentElement.scrollHeight;
    var winHeight = window.innerHeight;
    
    // Hide when within 200px of bottom
    if (scrollTop + winHeight >= docHeight - 200) {
      cta.style.display = 'none';
    } else {
      cta.style.display = '';
    }
  });
})();

// Video Modal
function openModal(videoSrc) {
  var modal = document.getElementById('videoModal');
  var modalVideo = document.getElementById('modalVideo');
  if (!modal || !modalVideo) return;
  modalVideo.src = videoSrc;
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
  modalVideo.play();
  // Trap focus and allow Escape to close
  modal.focus();
  modal.addEventListener('keydown', function handler(e) {
    if (e.key === 'Escape') {
      closeModal();
      modal.removeEventListener('keydown', handler);
    }
  });
}

function closeModal() {
  var modal = document.getElementById('videoModal');
  var modalVideo = document.getElementById('modalVideo');
  if (!modal || !modalVideo) return;
  modalVideo.pause();
  modalVideo.currentTime = 0;
  modalVideo.removeAttribute('src');
  modal.style.display = 'none';
  document.body.style.overflow = '';
}

// Apparatus hover preview — desktop (pointer/hover capable) devices only
(function() {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  document.querySelectorAll('.apparatus-item').forEach(function(el) {
    el.addEventListener('mouseenter', function() {
      var icon = el.querySelector('.apparatus-icon');
      var vid = el.querySelector('.apparatus-video');
      if (icon) icon.style.display = 'none';
      if (vid) { vid.style.display = 'block'; vid.play(); }
    });
    el.addEventListener('mouseleave', function() {
      var icon = el.querySelector('.apparatus-icon');
      var vid = el.querySelector('.apparatus-video');
      if (vid) { vid.pause(); vid.currentTime = 0; vid.style.display = 'none'; }
      if (icon) icon.style.display = 'block';
    });
  });
})();

// Reviews Carousel
(function() {
  var currentReview = 0;
  var reviews = document.querySelectorAll('.review-slide');
  var dotsContainer = document.getElementById('review-dots');
  if (!reviews.length || !dotsContainer) return;

  reviews.forEach(function(_, i) {
    var dot = document.createElement('span');
    dot.style.cssText = 'width: 10px; height: 10px; border-radius: 50%; background: rgba(212,175,55,0.3); cursor: pointer;';
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-label', 'Review ' + (i + 1));
    dot.onclick = function() { goToReview(i); };
    dotsContainer.appendChild(dot);
  });

  function showReview(index) {
    reviews.forEach(function(r) { r.style.display = 'none'; });
    dotsContainer.querySelectorAll('span').forEach(function(d) { d.style.background = 'rgba(212,175,55,0.3)'; });
    reviews[index].style.display = 'block';
    dotsContainer.querySelectorAll('span')[index].style.background = 'var(--rrt-gold)';
  }

  function goToReview(i) {
    currentReview = i;
    showReview(currentReview);
  }

  // Expose globally for onclick buttons
  window.changeReview = function(dir) {
    currentReview = (currentReview + dir + reviews.length) % reviews.length;
    showReview(currentReview);
  };

  showReview(0);
})();

// Back to top button visibility
(function() {
  // ── Create scroll-to-top button ──
  var upBtn = document.querySelector('a[aria-label="Scroll to top"]');
  if (!upBtn) {
    upBtn = document.createElement('button');
    document.body.appendChild(upBtn);
  } else {
    // Replace inline <a> with a proper <button>
    var newUp = document.createElement('button');
    upBtn.parentNode.replaceChild(newUp, upBtn);
    upBtn = newUp;
  }
  upBtn.className = 'floating-btn floating-btn--up';
  upBtn.setAttribute('aria-label', 'Scroll to top');
  upBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  upBtn.removeAttribute('style');
  upBtn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ── Create back button (skip on home page) ──
  var page = window.location.pathname.replace(/\/$/, '').split('/').pop();
  var isHome = !page || page === '' || page === 'index.html';
  var backLink = document.querySelector('a[aria-label="Go back"]');
  var backBtn;
  if (!isHome) {
    if (backLink) {
      backBtn = document.createElement('button');
      backLink.parentNode.replaceChild(backBtn, backLink);
    } else {
      backBtn = document.createElement('button');
      document.body.appendChild(backBtn);
    }
    backBtn.className = 'floating-btn floating-btn--back visible';
    backBtn.setAttribute('aria-label', 'Go back');
    backBtn.innerHTML = '<i class="fas fa-arrow-left"></i>';
    backBtn.addEventListener('click', function() {
      if (window.history.length > 1) {
        window.history.back();
      } else {
        window.location.href = '/';
      }
    });
  } else if (backLink) {
    backLink.remove();
  }

  // ── Show / hide scroll-to-top on scroll ──
  window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
      upBtn.classList.add('visible');
    } else {
      upBtn.classList.remove('visible');
    }
  });
})();
