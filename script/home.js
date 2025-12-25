gsap.registerPlugin(ScrollTrigger);

const nav = document.querySelector("nav");
const text = document.querySelector(".hero-title");
const sub = document.querySelector(".hero-sub");
const icon = document.querySelector("#mouse-icon");
const box = document.querySelector(".panel-text");
const img = document.querySelector(".panel-image");
const btn = document.querySelector(".btn");

/* MOUSE ICON ANIMATION */
const iconTl = gsap.timeline({ repeat: -1, paused: true });
iconTl
  .to(
    "#scroll",
    {
      y: 20,
      autoAlpha: 0,
      transformOrigin: "50% 100%",
      duration: 0.7
    },
    "icon"
  )
  .to("#outline", { y: 8, duration: 0.7 }, "icon")
  .to("#outline", { y: 0, duration: 0.7 }, "icon+=0.7");

/* HERO PARALLAX */
const t2 = gsap.timeline({
  defaults: { ease: "none", transformOrigin: "50% 50%" },
  scrollTrigger: {
    trigger: ".hero",
    start: "top top",
    end: "bottom top",
    scrub: true
  }
});

gsap.utils.toArray("img").forEach((layer) => {
  const depth = layer.dataset.depth;
  if (!depth) return;
  const movement = -(layer.offsetHeight * depth);
  tl.to(layer, { y: -movement }, 0);
});

t2.to(
  text,
  {
    y: -text.offsetHeight * text.dataset.depth,
    autoAlpha: 0,
    scale: 1.08,
    duration: 0.2
  },
  0
)
  .to(
    sub,
    {
      y: -sub.offsetHeight * sub.dataset.depth,
      autoAlpha: 0,
      scale: 1.05,
      duration: 0.2
    },
    0.06
  )
  .to(
    icon,
    {
      y: -icon.offsetHeight * icon.dataset.depth,
      autoAlpha: 0,
      duration: 0.2
    },
    0
  );

/* PANEL FADE-IN */
const tl2 = gsap.timeline({ paused: true, defaults: { ease: "power1.out" } });
tl2
  .from(img, { autoAlpha: 0, scale: 0, y: 20, duration: 0.5 }, 0)
  .from(box, { autoAlpha: 0, x: 50, duration: 0.4 }, 0.04)
  .from(
    btn,
    {
      autoAlpha: 0,
      x: 50,
      duration: 0.36,
      onComplete: () => {
        gsap.set(btn, { clearProps: "transform" });
      }
    },
    0.08
  );

ScrollTrigger.create({
  trigger: ".panel",
  start: "-25% top",
  end: "300px bottom",
  onEnter: () => {
    tl2.play();
    iconTl.pause();
  },
  onEnterBack: () => {
    tl2.reverse();
    iconTl.restart();
  }
});

/* LOADER */
const heroText = document.querySelectorAll(".hero-title,.hero-sub,.hero-sub-title");
const loaderCircles = document.querySelector(".loader-circles");
const greyCircle = document.querySelector(".grey");
const blackCircle = document.querySelector(".black");
const imgToLoad = document.querySelectorAll("img");
const loadImgs = imagesLoaded(imgToLoad);

let loadedCount = 0;

gsap.set(greyCircle, { scale: 0, transformOrigin: "50% 100%" });
gsap.set(blackCircle, { scale: 0, transformOrigin: "50% 100%" });

gsap.fromTo(
  loaderCircles,
  { scale: 0.9, transformOrigin: "50% 50%" },
  {
    y: -12,
    repeat: -1,
    scale: 1.1,
    yoyo: true,
    ease: "sine.inOut",
    duration: 0.5
  }
);

const loaderTl = gsap.timeline({ defaults: { ease: "sine.inOut" } });

loaderTl
  .to(greyCircle, { repeat: -1, repeatDelay: 0.5, scale: 1 }, "one")
  .to(blackCircle, { repeat: -1, repeatDelay: 0.5, scale: 1 }, "two")
  .set(
    greyCircle,
    { zIndex: "6", scale: 0, repeat: -1, repeatDelay: 1 },
    "two+=0.5"
  )
  .set(
    blackCircle,
    { zIndex: "6", scale: 0, repeat: -1, repeatDelay: 1 },
    "two+=1"
  )
  .set(greyCircle, { zIndex: "5", repeat: -1, repeatDelay: 1 }, "two+=1");

loaderTl.timeScale(0.5);

const loadCompleteTl = gsap.timeline({});
loadImgs.on("progress", () => {
  loadedCount++;
  const loadingProgress = loadedCount / imgToLoad.length;
  if (loadingProgress === 1) {
    loadCompleteTl
      .to(".loader-circles div", {
        delay: 0.75,
        opacity: 0,
        onComplete: () => {
          loaderTl.pause();
        }
      })
      .to(
        ".loader",
        {
          autoAlpha: 0,
          duration: 0.75
        },
        "load"
      )
      .fromTo(
        heroText,
        { autoAlpha: 0, y: 4 },
        { autoAlpha: 1, y: 0, stagger: 0.2 },
        "load+=0.1"
      )
      .fromTo(
        "#mouse-icon",
        { autoAlpha: 0 },
        {
          autoAlpha: 1,
          onStart: () => {
            iconTl.play();
          }
        },
        "load+=0.35"
      );
  }
});

/* SCROLLING MARQUEE IN FOLD SECTION */
gsap.utils.toArray(".marquee").forEach((el, index) => {
  const track = el.querySelector(".track");
  const fromX = index % 2 === 0 ? 0 : -300;
  const toX = index % 2 === 0 ? -300 : 0;

  gsap.fromTo(
    track,
    { x: fromX },
    {
      x: toX,
      ease: "none",
      scrollTrigger: {
        trigger: "#fold-effect",
        start: "top bottom",
        end: "bottom top",
        scrub: 1
      }
    }
  );
});

/* HEADER NAVIGATION */
function initNavigation() {
  const header = document.getElementById('mainHeader');
  const navLinks = document.querySelectorAll('.nav-link');
  const menuToggle = document.getElementById('menuToggle');
  const linksContainer = document.querySelector('.links');

  // smooth scroll for internal links only
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

        if (linksContainer && menuToggle) {
          linksContainer.classList.remove('mobile-open');
          menuToggle.classList.remove('active');
        }
      });
    }
  });

  // mobile menu toggle
  if (menuToggle && linksContainer) {
    menuToggle.addEventListener('click', () => {
      linksContainer.classList.toggle('mobile-open');
      menuToggle.classList.toggle('active');
    });
  }

  // update active link on scroll
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

/* INTRO OVERLAY */
function initIntro() {
  const introWrapper = document.getElementById('introWrapper');
  const startBtn = document.getElementById('startBtn');
  const header = document.getElementById('mainHeader');
  const progressBar = document.querySelector('.progress-bar');

  if (!introWrapper) return;

  // lock scroll while intro is visible
  document.body.style.overflow = 'hidden';

  if (header) {
    header.classList.remove('show');
    header.setAttribute('aria-hidden', 'true');
  }

  // auto close after 8s in case user doesn't click
  const autoProgress = setTimeout(() => {
    if (introWrapper && !introWrapper.classList.contains('hide-intro')) {
      enterSite();
    }
  }, 8000);

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

    introWrapper.classList.add('hide-intro');

    setTimeout(() => {
      introWrapper.style.display = 'none';
      introWrapper.setAttribute('aria-hidden', 'true');

      // unlock scroll and show header
      document.body.style.overflow = 'auto';
      if (header) {
        header.classList.add('show');
        header.setAttribute('aria-hidden', 'false');
      }

      // optional: you can trigger extra hero animations here if needed
    }, 600); // match CSS introHide duration
  }

  // if you're not relying fully on CSS keyframes for the bar, this keeps the effect
  if (progressBar) {
    setTimeout(() => {
      progressBar.style.width = '100%';
    }, 3800);
  }
}

/* INIT ALL ON DOM READY */
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initIntro();
});


function initBackgroundVideoSwitcher() {
  const bgVideo = document.getElementById("bgVideo");
  const heroSection = document.querySelector(".hero-section-top");
  const expertiseSection = document.querySelector(".our-expertise");

  if (!bgVideo || !heroSection || !expertiseSection) return;

  const HERO_VIDEO = "/assets/hero-section-bg.mp4";
  const EXPERTISE_VIDEO = "/assets/our-expertise/our-expertise.mp4";

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


// DECK → FAN HOVER ANIMATION FOR WHY SECTION
function initWhyDeckAnimation() {
  const whySection = document.querySelector('.why');
  const hand = document.querySelector('.hand');
  const cards = gsap.utils.toArray('.hand .card');

  if (!whySection || !hand || !cards.length) return;

  // all cards start hidden
  gsap.set(cards, {
    autoAlpha: 0,
    x: 0,
    y: 0,
    rotation: 0,
    scale: 1
  });

  let deckCenter = { x: 0, y: 0 };

  function updateDeckCenter() {
    const rect = hand.getBoundingClientRect();
    deckCenter.x = rect.left + rect.width / 2;
    deckCenter.y = rect.top + rect.height / 2;
  }

  updateDeckCenter();
  window.addEventListener('resize', updateDeckCenter);

  let hoverTweenIn;
  let hoverTweenOut;

  whySection.addEventListener('mouseenter', () => {
    updateDeckCenter();

    // kill any outgoing animation
    if (hoverTweenOut) hoverTweenOut.kill();

    hoverTweenIn = gsap.timeline({ defaults: { ease: 'power3.out' } });

    cards.forEach((card, i) => {
      const rect = card.getBoundingClientRect();
      const cardCenterX = rect.left + rect.width / 2;
      const cardCenterY = rect.top + rect.height / 2;

      const offsetX = deckCenter.x - cardCenterX;
      const offsetY = deckCenter.y - cardCenterY;

      // start from deck center
      hoverTweenIn.fromTo(
        card,
        {
          autoAlpha: 0,
          x: offsetX,
          y: offsetY,
          rotation: (i - cards.length / 2) * 8,
          scale: 0.85
        },
        {
          autoAlpha: 1,
          x: 0,
          y: 0,
          rotation: 0,
          scale: 1,
          duration: 0.55,
          delay: i * 0.04
        },
        0 // all start from timeline time 0, only delay controls order
      );
    });
  });

  whySection.addEventListener('mouseleave', () => {
    updateDeckCenter();

    if (hoverTweenIn) hoverTweenIn.kill();

    hoverTweenOut = gsap.timeline({ defaults: { ease: 'power3.in' } });

    cards.forEach((card, i) => {
      const rect = card.getBoundingClientRect();
      const cardCenterX = rect.left + rect.width / 2;
      const cardCenterY = rect.top + rect.height / 2;

      const offsetX = deckCenter.x - cardCenterX;
      const offsetY = deckCenter.y - cardCenterY;

      hoverTweenOut.to(
        card,
        {
          autoAlpha: 0,
          x: offsetX,
          y: offsetY,
          rotation: (i - cards.length / 2) * 8,
          scale: 0.85,
          duration: 0.4,
          delay: i * 0.03
        },
        0
      );
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  // ...your existing initNavigation(), initIntro(), etc.
  initWhyDeckAnimation();
});



gsap.registerPlugin(ScrollTrigger);

    const cards = gsap.utils.toArray(".rc-card");
    const cardCount = cards.length;
    const scaleDecrement = 0.02;

    // ✅ FIXED: New cards now stack ON TOP
    cards.forEach((card, index) => {
      card.style.zIndex = index + 1;
    });

    const totalScrollLength = cardCount * 550;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".rc-horizontal-stack",
        start: "top top",
        end: "+=" + totalScrollLength,
        scrub: 1.5,
        pin: true
      }
    });

    cards.forEach((card, i) => {
      const enterStart = i * 1;
      const stackStart = enterStart + 0.6;

      tl.fromTo(
        card,
        {
          x: 300,
          opacity: 0,
          scale: 0.95,
          visibility: "hidden"
        },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          visibility: "visible",
          ease: "power2.out",
          duration: 0.7
        },
        enterStart
      );

      if (i < cardCount - 1) {
        tl.to(
          card,
          {
            x: 0,
            scale: 1 - (i + 1) * scaleDecrement,
            ease: "power1.inOut",
            duration: 0.7
          },
          stackStart
        );
      }
    });



  document.addEventListener("DOMContentLoaded", () => {
    const rows = document.querySelectorAll(
      "main .our-expertise .line-1, main .our-expertise .line-2"
    );

    rows.forEach((row) => {
      const cards = row.querySelectorAll(".card");

      cards.forEach((card) => {
        card.addEventListener("click", () => {
          // Only do this on touch devices (where hover doesn't exist)
          const isTouch = window.matchMedia("(hover: none)").matches;
          if (!isTouch) return;

          cards.forEach((c) => c.removeAttribute("data-active"));
          card.setAttribute("data-active", "");
        });
      });
    });
  });



 document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".our-expertise .card");

  cards.forEach((card) => {
    // 🔹 Hover: make this card active and keep it that way
    card.addEventListener("mouseenter", () => {
      cards.forEach((c) => c.removeAttribute("active"));
      card.setAttribute("active", "");
    });

    // ❌ No mouseleave handler – we don't remove active on leaving

    // 🔹 Click: for touch devices (no hover)
    card.addEventListener("click", () => {
      const isTouch = window.matchMedia("(hover: none)").matches;
      if (!isTouch) return;

      const isActive = card.hasAttribute("active");
      cards.forEach((c) => c.removeAttribute("active"));
      if (!isActive) {
        card.setAttribute("active", "");
      }
    });
  });
});


