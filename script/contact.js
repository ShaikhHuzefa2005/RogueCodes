/*header and footer start*/
function initNavigation() {
  const header = document.getElementById('mainHeader');
  const navLinks = document.querySelectorAll('.nav-link');
  const menuToggle = document.getElementById('menuToggle');
  const linksContainer = document.querySelector('.links');

  // Smooth scroll for internal links only
  navLinks.forEach(link => {
    const href = link.getAttribute('href');

    if (href && href.startsWith('#')) {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetSection = document.querySelector(href);

        if (targetSection) {
          const headerHeight = header ? header.offsetHeight : 0;
          const targetPosition = targetSection.offsetTop - headerHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });

          updateActiveNavLink(href);
        }

        // Close mobile menu after click
        if (linksContainer && menuToggle) {
          linksContainer.classList.remove('mobile-open');
          menuToggle.classList.remove('active');
        }
      });
    }
  });

  // Mobile menu toggle
  if (menuToggle && linksContainer) {
    menuToggle.addEventListener('click', () => {
      linksContainer.classList.toggle('mobile-open');
      menuToggle.classList.toggle('active');
    });
  }

  // Update active nav link on scroll
  let scrollTimeout;
  window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      const sections = document.querySelectorAll('section[id]');
      const scrollPos = window.scrollY + 120;

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

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
});
/*header and footer end*/


class ContactPage {
    constructor() {
        this.init();
    }

    init() {
        console.log('Contact page initialized');
        
        // Initialize components
        this.initNavigation();
        this.initFormValidation();
        this.initFAQ();
        
        // Set current year
        this.setCurrentYear();
    }

    initNavigation() {
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (!navToggle || !navMenu) return;
        
        navToggle.addEventListener('click', () => {
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', !isExpanded);
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Toggle body scroll
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navToggle.setAttribute('aria-expanded', 'false');
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // Close menu on escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                navToggle.setAttribute('aria-expanded', 'false');
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    initFormValidation() {
        const form = document.getElementById('projectForm');
        if (!form) return;
        
        // Add real-time validation
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearError(input));
        });
        
        // Budget radio validation
        const budgetRadios = form.querySelectorAll('input[name="budget"]');
        budgetRadios.forEach(radio => {
            radio.addEventListener('change', () => {
                const error = document.getElementById('budget-error');
                if (error) error.textContent = '';
            });
        });
        
        // Form submission
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            if (this.validateForm()) {
                this.submitForm(form);
            }
        });
    }

    validateField(field) {
        const errorId = field.id + '-error';
        const errorElement = document.getElementById(errorId);
        if (!errorElement) return true;
        
        // Clear previous error
        errorElement.textContent = '';
        
        // Required validation
        if (field.hasAttribute('required') && !field.value.trim()) {
            errorElement.textContent = 'This field is required';
            field.classList.add('error');
            return false;
        }
        
        // Email validation
        if (field.type === 'email' && field.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                errorElement.textContent = 'Please enter a valid email address';
                field.classList.add('error');
                return false;
            }
        }
        
        // Phone validation
        if (field.type === 'tel' && field.value) {
            const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
            if (!phoneRegex.test(field.value)) {
                errorElement.textContent = 'Please enter a valid phone number';
                field.classList.add('error');
                return false;
            }
        }
        
        field.classList.remove('error');
        return true;
    }

    clearError(field) {
        const errorId = field.id + '-error';
        const errorElement = document.getElementById(errorId);
        if (errorElement) {
            errorElement.textContent = '';
        }
        field.classList.remove('error');
    }

    validateForm() {
        const form = document.getElementById('projectForm');
        let isValid = true;
        
        // Validate all required fields
        const requiredFields = form.querySelectorAll('[required]');
        requiredFields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });
        
        // Validate budget selection
        const budgetSelected = form.querySelector('input[name="budget"]:checked');
        if (!budgetSelected) {
            const error = document.getElementById('budget-error');
            if (error) {
                error.textContent = 'Please select a budget range';
                isValid = false;
            }
        }
        
        // Focus first invalid field
        if (!isValid) {
            const firstInvalid = form.querySelector('.error');
            if (firstInvalid) {
                firstInvalid.focus();
            }
        }
        
        return isValid;
    }

    submitForm(form) {
        const submitBtn = form.querySelector('.btn-submit');
        const btnText = submitBtn.querySelector('.btn-text');
        const loader = submitBtn.querySelector('.btn-loader');
        
        // Show loading state
        btnText.textContent = 'Sending...';
        loader.style.display = 'block';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Show success message
            this.showToast('Thanks! We\'ll review your project and get back to you within 24 hours.');
            
            // Reset form
            form.reset();
            
            // Reset button state
            btnText.textContent = 'Submit Inquiry';
            loader.style.display = 'none';
            submitBtn.disabled = false;
            
            // Scroll to form top
            form.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 2000);
    }

    initFAQ() {
        const faqItems = document.querySelectorAll('.faq-item');
        faqItems.forEach(item => {
            const summary = item.querySelector('summary');
            summary.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Close other open items
                if (!item.hasAttribute('open')) {
                    faqItems.forEach(otherItem => {
                        if (otherItem !== item && otherItem.hasAttribute('open')) {
                            otherItem.removeAttribute('open');
                        }
                    });
                }
                
                // Toggle current item
                item.toggleAttribute('open');
            });
        });
    }

    showToast(message) {
        const toast = document.getElementById('successToast');
        if (!toast) return;
        
        const messageEl = toast.querySelector('.toast-message');
        messageEl.textContent = message;
        
        // Show toast
        toast.classList.add('show');
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            toast.classList.remove('show');
        }, 5000);
    }

    setCurrentYear() {
        const yearElement = document.querySelector('footer p');
        if (yearElement) {
            const currentYear = new Date().getFullYear();
            yearElement.innerHTML = yearElement.innerHTML.replace('2023', currentYear);
        }
    }
}

// Utility functions
function openCalendly() {
    window.open('https://calendly.com/rougecodes/discovery', '_blank');
}

function getDirections() {
    window.open('https://www.google.com/maps/dir/?api=1&destination=IIT+Patna', '_blank');
}

function closeToast() {
    const toast = document.getElementById('successToast');
    if (toast) {
        toast.classList.remove('show');
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const contactPage = new ContactPage();
    
    // Expose utility functions globally
    window.openCalendly = openCalendly;
    window.getDirections = getDirections;
    window.closeToast = closeToast;
    
    // Add smooth scroll for anchor links
    document.addEventListener('click', (e) => {
        if (e.target.matches('a[href^="#"]')) {
            e.preventDefault();
            const targetId = e.target.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.site-header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});