// Premium JavaScript for RogueCodes Website
document.addEventListener('DOMContentLoaded', function() {
  // Initialize all components
  initIntro();
  initNavigation();
  initAnimations();
  initContactForm();
  initBackToTop();
  initCurrentYear();
});

// Premium Intro Animation
function initIntro() {
  const introWrapper = document.getElementById('introWrapper');
  const startBtn = document.getElementById('startBtn');
  const header = document.getElementById('mainHeader');
  const progressBar = document.querySelector('.progress-bar');

  // Auto progress after 4 seconds if user doesn't click
  const autoProgress = setTimeout(() => {
    if (introWrapper && !introWrapper.classList.contains('hide-intro')) {
      enterSite();
    }
  }, 6000);

  // Start button click handler
  if (startBtn) {
    startBtn.addEventListener('click', (e) => {
      e.preventDefault();
      clearTimeout(autoProgress);
      enterSite();
    });
  }

  function enterSite() {
    if (!introWrapper) return;

    // Hide intro with animation
    introWrapper.classList.add('hide-intro');
    
    // Show header and enable scrolling
    setTimeout(() => {
      if (introWrapper) {
        introWrapper.style.display = 'none';
        introWrapper.setAttribute('aria-hidden', 'true');
      }
      
      document.body.style.overflow = 'auto';
      
      if (header) {
        header.classList.add('show');
        header.setAttribute('aria-hidden', 'false');
      }
      
      // Trigger hero animations
      triggerHeroAnimations();
    }, 600);
  }

  // Simulate progress bar loading
  if (progressBar) {
    setTimeout(() => {
      progressBar.style.width = '100%';
    }, 3800);
  }
}

// Enhanced Navigation
function initNavigation() {
  const header = document.getElementById('mainHeader');
  const navLinks = document.querySelectorAll('.nav-link');
  const menuToggle = document.getElementById('menuToggle');
  const linksContainer = document.querySelector('.links');

  // Smooth scrolling for navigation links
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        const headerHeight = header ? header.offsetHeight : 0;
        const targetPosition = targetSection.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Update active state
        updateActiveNavLink(targetId);
      }
    });
  });

  // Mobile menu toggle
  if (menuToggle && linksContainer) {
    menuToggle.addEventListener('click', () => {
      linksContainer.classList.toggle('mobile-open');
      menuToggle.classList.toggle('active');
    });
  }

  // Update active navigation link on scroll
  let scrollTimeout;
  window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      const sections = document.querySelectorAll('section[id]');
      const scrollPos = window.scrollY + 100;

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
          updateActiveNavLink(`#${sectionId}`);
        }
      });
    }, 10);
  });

  function updateActiveNavLink(activeId) {
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === activeId) {
        link.classList.add('active');
      }
    });
  }
}

// Premium Animations
function initAnimations() {
  // Intersection Observer for reveal animations
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        
        // Stagger child animations
        const staggerElements = entry.target.querySelectorAll('.stagger-item');
        staggerElements.forEach((element, index) => {
          element.style.animationDelay = `${index * 0.1}s`;
          element.classList.add('animate-in');
        });
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });

  // Parallax effects
  initParallax();
  
  // Mouse move effects
  initMouseEffects();
}

// Hero Animations
function triggerHeroAnimations() {
  const heroElements = document.querySelectorAll('.hero .kicker-word, .hero .title-word, .hero .hero-lead, .hero .badge, .hero .btn');
  
  heroElements.forEach((element, index) => {
    element.style.animationDelay = `${index * 0.1 + 0.2}s`;
    element.classList.add('animate-in');
  });
}

// Parallax Scrolling Effects
function initParallax() {
  const parallaxElements = document.querySelectorAll('.parallax');
  
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    parallaxElements.forEach(element => {
      element.style.transform = `translate3d(0, ${rate}px, 0)`;
    });
  });
}

// Mouse Move Effects
function initMouseEffects() {
  const heroSection = document.querySelector('.hero');
  const floatingCards = document.querySelectorAll('.floating-card');
  
  if (heroSection) {
    heroSection.addEventListener('mousemove', (e) => {
      const { clientX, clientY } = e;
      const { width, height, left, top } = heroSection.getBoundingClientRect();
      
      const x = (clientX - left) / width - 0.5;
      const y = (clientY - top) / height - 0.5;
      
      // Move floating cards
      floatingCards.forEach((card, index) => {
        const speed = 0.05 + (index * 0.02);
        const xMove = x * 40 * speed;
        const yMove = y * 40 * speed;
        
        card.style.transform = `translate(${xMove}px, ${yMove}px)`;
      });
      
      // Move hero background elements
      const heroBlobs = document.querySelectorAll('.hero-blob');
      heroBlobs.forEach((blob, index) => {
        const speed = 0.02 + (index * 0.01);
        const xMove = x * 100 * speed;
        const yMove = y * 100 * speed;
        
        blob.style.transform = `translate(${xMove}px, ${yMove}px)`;
      });
    });
  }
}

// Enhanced Contact Form
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const formData = new FormData(contactForm);
      
      // Validate form
      if (!validateForm(contactForm)) {
        showNotification('Please fill all required fields correctly.', 'error');
        return;
      }
      
      // Show loading state
      submitBtn.disabled = true;
      submitBtn.querySelector('.btn-text').style.display = 'none';
      submitBtn.querySelector('.btn-spinner').style.display = 'block';
      
      try {
        // Simulate API call
        await simulateAPICall(formData);
        
        // Show success message
        showNotification('Thank you! Your message has been sent successfully.', 'success');
        contactForm.reset();
        
      } catch (error) {
        // Show error message
        showNotification('Sorry, there was an error sending your message. Please try again.', 'error');
      } finally {
        // Reset button state
        submitBtn.disabled = false;
        submitBtn.querySelector('.btn-text').style.display = 'block';
        submitBtn.querySelector('.btn-spinner').style.display = 'none';
      }
    });
    
    // Real-time validation
    const inputs = contactForm.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
      input.addEventListener('blur', () => {
        validateField(input);
      });
      
      input.addEventListener('input', () => {
        clearFieldError(input);
      });
    });
  }
}

// Form Validation
function validateForm(form) {
  let isValid = true;
  const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
  
  inputs.forEach(input => {
    if (!validateField(input)) {
      isValid = false;
    }
  });
  
  return isValid;
}

function validateField(field) {
  const value = field.value.trim();
  let isValid = true;
  
  // Clear previous errors
  clearFieldError(field);
  
  // Required field validation
  if (field.hasAttribute('required') && !value) {
    showFieldError(field, 'This field is required');
    isValid = false;
  }
  
  // Email validation
  if (field.type === 'email' && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      showFieldError(field, 'Please enter a valid email address');
      isValid = false;
    }
  }
  
  return isValid;
}

function showFieldError(field, message) {
  field.classList.add('error');
  
  let errorElement = field.parentNode.querySelector('.field-error');
  if (!errorElement) {
    errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    field.parentNode.appendChild(errorElement);
  }
  
  errorElement.textContent = message;
}

function clearFieldError(field) {
  field.classList.remove('error');
  
  const errorElement = field.parentNode.querySelector('.field-error');
  if (errorElement) {
    errorElement.remove();
  }
}

// Simulate API Call
function simulateAPICall(formData) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate random success/failure for demo
      Math.random() > 0.2 ? resolve() : reject();
    }, 2000);
  });
}

// Notification System
function showNotification(message, type = 'info') {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll('.notification');
  existingNotifications.forEach(notification => notification.remove());
  
  // Create new notification
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <i class="fas fa-${getNotificationIcon(type)}"></i>
      <span>${message}</span>
    </div>
    <button class="notification-close">
      <i class="fas fa-times"></i>
    </button>
  `;
  
  // Add styles
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: white;
    padding: 16px 20px;
    border-radius: 12px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.1);
    border-left: 4px solid ${getNotificationColor(type)};
    display: flex;
    align-items: center;
    gap: 12px;
    max-width: 400px;
    z-index: 10000;
    transform: translateX(100%);
    opacity: 0;
    transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
  `;
  
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
    notification.style.opacity = '1';
  }, 100);
  
  // Auto remove after 5 seconds
  const autoRemove = setTimeout(() => {
    hideNotification(notification);
  }, 5000);
  
  // Close button
  const closeBtn = notification.querySelector('.notification-close');
  closeBtn.addEventListener('click', () => {
    clearTimeout(autoRemove);
    hideNotification(notification);
  });
}

function hideNotification(notification) {
  notification.style.transform = 'translateX(100%)';
  notification.style.opacity = '0';
  
  setTimeout(() => {
    if (notification.parentNode) {
      notification.parentNode.removeChild(notification);
    }
  }, 300);
}

function getNotificationIcon(type) {
  const icons = {
    success: 'check-circle',
    error: 'exclamation-circle',
    warning: 'exclamation-triangle',
    info: 'info-circle'
  };
  return icons[type] || 'info-circle';
}

function getNotificationColor(type) {
  const colors = {
    success: '#8ea47c',
    error: '#e74c3c',
    warning: '#f39c12',
    info: '#3498db'
  };
  return colors[type] || '#3498db';
}

// Back to Top Button
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTop');
  
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });
    
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

// Current Year in Footer
function initCurrentYear() {
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

// Performance optimization
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Preload critical images
function preloadImages() {
  const images = [
    'logo.png',
    // Add other critical images here
  ];
  
  images.forEach(src => {
    const img = new Image();
    img.src = src;
  });
}

// Initialize image preloading
preloadImages();