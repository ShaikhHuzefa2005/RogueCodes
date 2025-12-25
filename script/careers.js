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

// Job data for each position
        const jobData = {
            1: {
                title: "Frontend Developer (React/Next.js)",
                responsibilities: [
                    "Build stunning UI components with React/Next.js",
                    "Integrate RESTful and GraphQL APIs",
                    "Write clean, scalable, and maintainable code",
                    "Optimize applications for maximum performance",
                    "Collaborate with UI/UX designers and backend developers"
                ],
                skills: ["React", "Next.js", "JavaScript", "TypeScript", "Tailwind CSS", "Git", "REST APIs"],
                benefits: [
                    "Work on real client projects",
                    "Build both software and hardware products",
                    "Learn modern tools and tech stacks",
                    "Flexible working hours",
                    "Startup-like environment",
                    "Mentorship from experienced developers"
                ]
            },
            2: {
                title: "Full-Stack Developer",
                responsibilities: [
                    "Backend development with Node.js/Django/Flask",
                    "Database design and optimization",
                    "API building and documentation",
                    "Deployment on cloud platforms (AWS/Firebase)",
                    "Full-stack feature implementation"
                ],
                skills: ["Node.js", "Django/Flask", "SQL/NoSQL", "Firebase/AWS", "React", "REST APIs", "Docker"],
                benefits: [
                    "Work on real client projects",
                    "Build both software and hardware products",
                    "Learn modern tools and tech stacks",
                    "Flexible working hours",
                    "Startup-like environment",
                    "Mentorship from experienced developers"
                ]
            },
            3: {
                title: "UI/UX Designer",
                responsibilities: [
                    "Conduct user research and usability testing",
                    "Create wireframes and interactive prototypes",
                    "Design high-fidelity mockups",
                    "Develop and maintain design systems",
                    "Collaborate with developers for implementation"
                ],
                skills: ["Figma", "Adobe Creative Suite", "Visual design", "UX principles", "Prototyping", "User research"],
                benefits: [
                    "Work on real client projects",
                    "Build both software and hardware products",
                    "Learn modern tools and tech stacks",
                    "Flexible working hours",
                    "Startup-like environment",
                    "Mentorship from experienced developers"
                ]
            },
            4: {
                title: "IoT & Embedded Engineer",
                responsibilities: [
                    "ESP32/Arduino programming",
                    "Sensor integration and calibration",
                    "PCB prototyping and testing",
                    "Hardware testing and validation",
                    "IoT protocol implementation"
                ],
                skills: ["Arduino IDE", "C/C++", "Microcontrollers", "IoT protocols", "PCB Design", "Sensor Integration"],
                benefits: [
                    "Work on real client projects",
                    "Build both software and hardware products",
                    "Learn modern tools and tech stacks",
                    "Flexible working hours",
                    "Startup-like environment",
                    "Mentorship from experienced developers"
                ]
            },
            5: {
                title: "Marketing & Growth Intern",
                responsibilities: [
                    "Social media marketing and content creation",
                    "Market research and outreach",
                    "Content writing for blogs and campaigns",
                    "Lead generation and analysis",
                    "Marketing analytics and reporting"
                ],
                skills: ["Social Media", "Content Creation", "Market Research", "Communication", "SEO", "Analytics"],
                benefits: [
                    "Work on real client projects",
                    "Build both software and hardware products",
                    "Learn modern tools and tech stacks",
                    "Flexible working hours",
                    "Startup-like environment",
                    "Mentorship from experienced developers"
                ]
            }
        };
        
        // DOM Elements
        const modalOverlay = document.getElementById('jobModal');
        const closeModalBtn = document.getElementById('closeModal');
        const applyNowBtn = document.getElementById('applyNowBtn');
        const expandButtons = document.querySelectorAll('.expand-btn');
        const modalJobTitle = document.getElementById('modalJobTitle');
        const responsibilitiesList = document.getElementById('responsibilitiesList');
        const skillsList = document.getElementById('skillsList');
        const benefitsList = document.getElementById('benefitsList');
        const emailLink = document.querySelector('.apply-email');
        const applyEmailOriginalText = emailLink.innerHTML;
        
        // Function to open modal with job details
        function openJobModal(jobId) {
            const job = jobData[jobId];
            
            if (!job) return;
            
            // Update modal content
            modalJobTitle.textContent = job.title;
            
            // Clear existing list items
            responsibilitiesList.innerHTML = '';
            skillsList.innerHTML = '';
            
            // Populate responsibilities
            job.responsibilities.forEach(resp => {
                const li = document.createElement('li');
                li.textContent = resp;
                responsibilitiesList.appendChild(li);
            });
            
            // Populate skills
            job.skills.forEach(skill => {
                const skillTag = document.createElement('span');
                skillTag.className = 'skill-tag-modal';
                skillTag.textContent = skill;
                skillsList.appendChild(skillTag);
            });
            
            // Benefits
            benefitsList.innerHTML = '';
            job.benefits.forEach(benefit => {
                const li = document.createElement('li');
                li.textContent = benefit;
                benefitsList.appendChild(li);
            });
            
            // Show modal
            modalOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Ensure modal content is scrolled to top
            const modalContent = document.querySelector('.modal-content');
            modalContent.scrollTop = 0;
        }
        
        // Function to close modal
        function closeJobModal() {
            modalOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
        
        // Add event listeners to expand buttons
        expandButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                const jobId = button.getAttribute('data-job');
                openJobModal(jobId);
            });
        });
        
        // Make position cards clickable
        document.querySelectorAll('.position-card').forEach((card, index) => {
            card.addEventListener('click', () => {
                const jobId = index + 1;
                openJobModal(jobId);
            });
        });
        
        // Close modal when clicking close button
        closeModalBtn.addEventListener('click', closeJobModal);
        
        // Close modal when clicking outside
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                closeJobModal();
            }
        });
        
        // Close modal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
                closeJobModal();
            }
        });
        
        // Apply Now button functionality
        applyNowBtn.addEventListener('click', () => {
            const jobTitle = modalJobTitle.textContent;
            alert(`Thank you for your interest in the ${jobTitle} position!\n\nSend your resume and portfolio to:\ncareers@rougecodes.com\n\nSubject: Application for ${jobTitle}\n\nWe'll contact you within 3–5 working days.`);
            closeJobModal();
        });
        
        // Email subject auto-fill based on clicked position
        document.querySelectorAll('.job-title').forEach((title, index) => {
            title.addEventListener('click', function(e) {
                e.stopPropagation();
                const positionName = this.textContent;
                const currentHref = emailLink.getAttribute('href').split('?')[0];
                emailLink.setAttribute('href', `${currentHref}?subject=Application for ${encodeURIComponent(positionName)}`);
                
                // Show confirmation
                emailLink.innerHTML = '<i class="fas fa-check"></i> Ready for ' + positionName;
                
                setTimeout(() => {
                    emailLink.innerHTML = applyEmailOriginalText;
                }, 2000);
            });
        });
        
        // Add animation on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        // Observe all cards for animation
        document.querySelectorAll('.position-card, .benefit-item').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            observer.observe(card);
        });