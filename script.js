// Smooth Scroll
const lenis = new Lenis({ lerp: 0.08 });
function raf(time) { 
    lenis.raf(time); 
    requestAnimationFrame(raf); 
}
requestAnimationFrame(raf);

// Cursor movement
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');
if (cursor && follower) {
    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, { x: e.clientX, y: e.clientY});
        gsap.to(follower, { x: e.clientX - 12, y: e.clientY - 12});
    });
}

// Page Transitions
function goTo(url) {
    gsap.to(".wipe", { 
        y: 0, 
        duration: 0.6, 
        ease: "power4.inOut", 
        onComplete: () => { 
            window.location.href = url; 
        } 
    });
}

// Mobile Menu Toggle - WORKS ON ALL PAGES
document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const body = document.body;
    
    if (menuBtn && mobileMenu) {
        // Toggle menu
        menuBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            menuBtn.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (mobileMenu.classList.contains('active')) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = '';
            }
        });
        
        // Close menu when clicking on a link
        const menuLinks = mobileMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                menuBtn.classList.remove('active');
                mobileMenu.classList.remove('active');
                body.style.overflow = '';
            });
        });
        
        // Close menu when clicking outside
        mobileMenu.addEventListener('click', function(e) {
            if (e.target === mobileMenu) {
                menuBtn.classList.remove('active');
                mobileMenu.classList.remove('active');
                body.style.overflow = '';
            }
        });
    }
});

// Entrance Animations
window.addEventListener('load', () => {
    gsap.to(".wipe", { y: "-100%", duration: 0.8, ease: "power4.inOut" });
    gsap.to(".mask span", { y: 0, duration: 1.5, stagger: 0.1, ease: "power4.out" });
    
    // Intersection Observer for Scroll Reveals
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});

// Initialize Lucide Icons
lucide.createIcons();

/* ========================================
   ADVANCED ANIMATIONS JAVASCRIPT
   Add this entire section to the END of your script.js file
   ======================================== */

// ========== 1. INTERSECTION OBSERVER FOR MULTIPLE ANIMATION TYPES ========== //

window.addEventListener('load', () => {
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '-50px'
    });

    // Observe different animation classes
    const selectors = [
        '.reveal',
        '.reveal-left',
        '.reveal-right',
        '.stagger',
        '.reveal-scale-rotate',
        '.reveal-flip',
        '.reveal-bounce-up',
        '.reveal-slide-rotate',
        '.reveal-zoom-bounce'
    ];

    selectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            animationObserver.observe(el);
        });
    });
});

// ========== 2. 3D TILT EFFECT WITH MOUSE ========== //

document.querySelectorAll('.tilt-3d, .value-card, .flip-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `
            perspective(1000px) 
            rotateX(${-rotateX}deg) 
            rotateY(${rotateY}deg) 
            scale3d(1.02, 1.02, 1.02)
        `;
        card.style.transition = 'transform 0.1s ease-out';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        card.style.transition = 'transform 0.5s ease-out';
    });
});

// ========== 3. PARALLAX EFFECT WITH MULTIPLE SPEEDS ========== //

let ticking = false;
let lastScrollY = 0;

function updateParallax() {
    const scrollY = window.pageYOffset;
    
    // Different parallax speeds for different elements
    document.querySelectorAll('[data-parallax]').forEach(el => {
        const speed = parseFloat(el.dataset.parallax) || 0.5;
        const yPos = -(scrollY * speed);
        el.style.transform = `translate3d(0, ${yPos}px, 0)`;
    });
    
    // Rotation parallax
    document.querySelectorAll('[data-rotate-parallax]').forEach(el => {
        const speed = parseFloat(el.dataset.rotateParallax) || 0.1;
        const rotation = scrollY * speed;
        el.style.transform = `rotate(${rotation}deg)`;
    });
    
    // Scale parallax
    document.querySelectorAll('[data-scale-parallax]').forEach(el => {
        const speed = parseFloat(el.dataset.scaleParallax) || 0.0001;
        const scale = 1 + (scrollY * speed);
        el.style.transform = `scale(${Math.min(scale, 1.5)})`;
    });
    
    lastScrollY = scrollY;
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
    }
});

// ========== 4. MAGNETIC ELEMENTS (Cursor Attraction) ========== //

const magneticElements = document.querySelectorAll('.magnetic, .btn-k72, .magnetic-btn');

magneticElements.forEach(el => {
    el.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        const distance = Math.sqrt(x * x + y * y);
        const maxDistance = 100;
        
        if (distance < maxDistance) {
            const strength = (maxDistance - distance) / maxDistance;
            this.style.transform = `translate(${x * strength * 0.5}px, ${y * strength * 0.5}px) scale(1.05)`;
        }
    });
    
    el.addEventListener('mouseleave', function() {
        this.style.transform = 'translate(0, 0) scale(1)';
    });
});

// ========== 5. RIPPLE CLICK EFFECT ========== //

document.querySelectorAll('.ripple, .btn, .btn-k72').forEach(element => {
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    
    element.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: radial-gradient(circle, rgba(139, 168, 136, 0.6) 0%, transparent 70%);
            border-radius: 50%;
            transform: scale(0);
            animation: rippleExpand 0.6s ease-out;
            pointer-events: none;
            z-index: 1;
        `;
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes rippleExpand {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ========== 6. SPLIT TEXT FOR LETTER ANIMATIONS ========== //

function splitTextIntoLetters(element) {
    const text = element.textContent;
    element.innerHTML = '';
    
    text.split('').forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.display = 'inline-block';
        span.style.animationDelay = `${index * 0.05}s`;
        element.appendChild(span);
    });
}

// Apply to specific classes
document.querySelectorAll('.letter-bounce, .text-wave, .text-explode').forEach(el => {
    splitTextIntoLetters(el);
});

// ========== 7. MORPHING SHAPES ON HOVER ========== //

document.querySelectorAll('.morph-hover').forEach(element => {
    element.addEventListener('mouseenter', function() {
        this.style.animation = 'morphShape 2s ease-in-out forwards';
    });
    
    element.addEventListener('mouseleave', function() {
        this.style.animation = 'none';
    });
});

// ========== 8. SCROLL VELOCITY DETECTION ========== //

let scrollVelocity = 0;
let lastScrollTop = 0;
let lastScrollTime = Date.now();

window.addEventListener('scroll', () => {
    const now = Date.now();
    const scrollTop = window.pageYOffset;
    const timeDiff = now - lastScrollTime;
    const scrollDiff = scrollTop - lastScrollTop;
    
    scrollVelocity = Math.abs(scrollDiff / timeDiff);
    
    // Apply velocity-based effects
    document.querySelectorAll('.velocity-scale').forEach(el => {
        const scale = 1 + Math.min(scrollVelocity * 0.5, 0.2);
        el.style.transform = `scale(${scale})`;
    });
    
    lastScrollTop = scrollTop;
    lastScrollTime = now;
});


// ========== 10. ELEMENT EXPLOSION ON CLICK ========== //

document.querySelectorAll('.explodable').forEach(element => {
    element.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const particles = 20;
        
        for (let i = 0; i < particles; i++) {
            const particle = document.createElement('div');
            const angle = (Math.PI * 2 * i) / particles;
            const velocity = 100 + Math.random() * 100;
            
            particle.style.cssText = `
                position: fixed;
                left: ${e.clientX}px;
                top: ${e.clientY}px;
                width: 5px;
                height: 5px;
                background: var(--accent);
                border-radius: 50%;
                pointer-events: none;
                z-index: 10000;
            `;
            
            document.body.appendChild(particle);
            
            const tx = Math.cos(angle) * velocity;
            const ty = Math.sin(angle) * velocity;
            
            particle.style.setProperty('--tx', `${tx}px`);
            particle.style.setProperty('--ty', `${ty}px`);
            particle.classList.add('particle-float');
            
            setTimeout(() => particle.remove(), 1000);
        }
    });
});

// ========== 11. FLOATING ELEMENTS ========== //

document.querySelectorAll('.float').forEach((element, index) => {
    const duration = 3 + Math.random() * 2;
    const delay = index * 0.2;
    const distance = 10 + Math.random() * 20;
    
    element.style.animation = `floatUpDown ${duration}s ease-in-out ${delay}s infinite`;
    element.style.setProperty('--float-distance', `${distance}px`);
});

// Add float animation
const floatStyle = document.createElement('style');
floatStyle.textContent = `
    @keyframes floatUpDown {
        0%, 100% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(var(--float-distance, -20px));
        }
    }
`;
document.head.appendChild(floatStyle);

// ========== 12. STAGGER ANIMATION TRIGGER ========== //

const staggerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const children = entry.target.children;
            Array.from(children).forEach((child, index) => {
                setTimeout(() => {
                    child.style.opacity = '1';
                    child.style.transform = 'translateY(0) rotate(0deg) scale(1)';
                }, index * 100);
            });
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.stagger').forEach(el => {
    staggerObserver.observe(el);
});

// ========== 13. ROTATION ON SCROLL ========== //

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    document.querySelectorAll('.rotate-scroll').forEach(el => {
        const speed = parseFloat(el.dataset.rotateSpeed) || 0.1;
        el.style.transform = `rotate(${scrolled * speed}deg)`;
    });
});

// ========== 14. GLITCH EFFECT ON HOVER ========== //

document.querySelectorAll('.glitch-hover').forEach(element => {
    element.addEventListener('mouseenter', function() {
        this.classList.add('glitch-slide');
        
        setTimeout(() => {
            this.classList.remove('glitch-slide');
        }, 500);
    });
});

// ========== 15. TYPEWRITER EFFECT ========== //

function typeWriter(element, speed = 50) {
    const text = element.dataset.text || element.textContent;
    element.textContent = '';
    let i = 0;
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

const typewriterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('typed')) {
            entry.target.classList.add('typed');
            typeWriter(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.typewriter-effect').forEach(el => {
    typewriterObserver.observe(el);
});

// ========== 16. HOVER EXPAND EFFECT ========== //

document.querySelectorAll('.hover-expand').forEach(element => {
    element.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1) rotate(5deg)';
        this.style.transition = 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
    });
    
    element.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0deg)';
    });
});

// ========== 17. SCROLL-BASED COLOR CHANGE ========== //

window.addEventListener('scroll', () => {
    const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    
    document.querySelectorAll('.color-scroll').forEach(el => {
        const hue = (scrollPercent * 3.6) % 360;
        el.style.color = `hsl(${hue}, 70%, 60%)`;
    });
});

// ========== 18. SHAKE ON ERROR ========== //

function shakeElement(element) {
    element.style.animation = 'shake 0.5s ease-in-out';
    
    setTimeout(() => {
        element.style.animation = '';
    }, 500);
}

const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
        20%, 40%, 60%, 80% { transform: translateX(10px); }
    }
`;
document.head.appendChild(shakeStyle);

// ========== 19. IMAGE ZOOM CONTAINERS ========== //

document.querySelectorAll('.zoom-container').forEach(container => {
    const img = container.querySelector('img');
    
    container.addEventListener('mousemove', (e) => {
        const rect = container.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        
        if (img) {
            img.style.transformOrigin = `${x}% ${y}%`;
            img.style.transform = 'scale(1.5)';
        }
    });
    
    container.addEventListener('mouseleave', () => {
        if (img) {
            img.style.transform = 'scale(1)';
        }
    });
});

// ========== 20. PERFORMANCE MONITORING ========== //

let fps = 60;
let lastTime = performance.now();

function measureFPS() {
    const now = performance.now();
    fps = Math.round(1000 / (now - lastTime));
    lastTime = now;
    
    // Reduce animations if FPS drops
    if (fps < 30) {
        document.body.classList.add('low-performance');
    } else {
        document.body.classList.remove('low-performance');
    }
    
    requestAnimationFrame(measureFPS);
}

measureFPS();

// Add low performance styles
const perfStyle = document.createElement('style');
perfStyle.textContent = `
    .low-performance * {
        animation-duration: 0.1s !important;
        transition-duration: 0.1s !important;
    }
`;
document.head.appendChild(perfStyle);

// ========== 21. INITIALIZE ON LOAD ========== //

document.addEventListener('DOMContentLoaded', () => {
    console.log('🎨 Advanced animations system loaded');
    
    // Trigger initial animations
    setTimeout(() => {
        document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                el.classList.add('active');
            }
        });
    }, 100);
});


