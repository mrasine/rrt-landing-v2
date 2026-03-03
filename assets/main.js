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
}

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
  var btn = document.querySelector('a[onclick*="scrollTo(0,0)"]');
  if (!btn) return;
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 200) {
      btn.style.display = 'flex';
    } else {
      btn.style.display = 'none';
    }
  });
})();
