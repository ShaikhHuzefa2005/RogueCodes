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

// Call this on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  initBackgroundVideoSwitcher();
});

function initBackgroundVideoSwitcher() {
  const bgVideo = document.getElementById("bgVideo");
  const heroSection = document.querySelector(".hero-section");
  const expertiseSection = document.querySelector(".team");

  // If any of these don’t exist (e.g. on About page), just skip
  if (!bgVideo || !heroSection || !expertiseSection) return;

  const HERO_VIDEO = "/assets/home/hero-section-bg.mp4";
  const EXPERTISE_VIDEO = "/assets/about/tem-section-bg.mp4";

  let currentVideo = HERO_VIDEO;

  function setVideo(src) {
    if (currentVideo === src) return;
    currentVideo = src;

    const sourceEl = bgVideo.querySelector("source");
    if (!sourceEl) return;

    sourceEl.src = src;
    bgVideo.load();
    bgVideo.play().catch(() => {});
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        if (entry.target === heroSection) {
          setVideo(HERO_VIDEO);
        } else if (entry.target === expertiseSection) {
          setVideo(EXPERTISE_VIDEO);
        }
      });
    },
    {
      threshold: 0.5,
      rootMargin: "-80px 0px 0px 0px"
    }
  );

  observer.observe(heroSection);
  observer.observe(expertiseSection);
}


const track = document.querySelector(".carousel-track");
const slides = Array.from(document.querySelectorAll(".slide"));
const nextBtn = document.querySelector(".right-btn");
const prevBtn = document.querySelector(".left-btn");
const dotsContainer = document.querySelector(".dots");

let currentIndex = 0;

/* Create dots dynamically */
slides.forEach((_, i) => {
  const dot = document.createElement("button");
  if (i === 0) dot.classList.add("active");
  dotsContainer.appendChild(dot);
});

const dots = Array.from(document.querySelectorAll(".dots button"));

function updateCarousel() {
  track.style.transform = `translateX(-${currentIndex * 100}%)`;

  dots.forEach((d, i) => {
    d.classList.toggle("active", i === currentIndex);
  });
}

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % slides.length;
  updateCarousel();
});

prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  updateCarousel();
});

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    currentIndex = index;
    updateCarousel();
  });
});
