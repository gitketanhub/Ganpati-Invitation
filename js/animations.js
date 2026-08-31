/**
 * Animation System (GSAP & ScrollTrigger)
 * Crafts a restrained, respectful, cinematic visual pacing.
 */

export function initAnimations() {
  if (typeof window.gsap === 'undefined' || typeof window.ScrollTrigger === 'undefined') {
    return;
  }

  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;
  gsap.registerPlugin(ScrollTrigger);

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  initHeroAnimation(gsap);
  initTransitionStorytelling(gsap, ScrollTrigger);
  initInvitationReveal(gsap, ScrollTrigger);
  initEditorialGallery(gsap, ScrollTrigger);
  initMomentsAnimation(gsap, ScrollTrigger);
  initDetailsReveal(gsap, ScrollTrigger);
  initTimelineAnimation(gsap, ScrollTrigger);
  initClosingAndBlessing(gsap, ScrollTrigger);
  initAtmosphericParticles();
}

/**
 * Hero Animation (Camera settle and text sequence)
 */
export function initHeroAnimation(gsap) {
  const heroImage = document.querySelector('.hero-bg-image');
  const heroSanskrit = document.querySelector('.hero-sanskrit');
  const heroWords = document.querySelectorAll('.hero-title span');
  const heroSubtitle = document.querySelector('.hero-subtitle');
  const heroFooter = document.querySelector('.hero-footer');

  const tl = gsap.timeline({ delay: 0.2 });

  if (heroImage) {
    tl.to(heroImage, {
      scale: 1,
      duration: 2.8,
      ease: "power2.out"
    }, 0);
  }

  if (heroSanskrit) {
    tl.to(heroSanskrit, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "power3.out"
    }, 0.4);
  }

  if (heroWords.length) {
    tl.to(heroWords, {
      opacity: 1,
      y: 0,
      duration: 1.1,
      stagger: 0.18,
      ease: "power3.out"
    }, 0.7);
  }

  if (heroSubtitle) {
    tl.to(heroSubtitle, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: "power2.out"
    }, 1.3);
  }

  if (heroFooter) {
    tl.to(heroFooter, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: "power2.out"
    }, 1.5);
  }
}

/**
 * Section 03 — Transition Storytelling
 */
function initTransitionStorytelling(gsap, ScrollTrigger) {
  const storyLines = document.querySelectorAll('.story-line');
  
  storyLines.forEach((line) => {
    gsap.to(line, {
      scrollTrigger: {
        trigger: line,
        start: "top 78%",
        end: "top 42%",
        scrub: 0.6,
        toggleActions: "play none none reverse"
      },
      opacity: 1,
      y: 0,
      ease: "power2.out"
    });
  });
}

/**
 * Section 04 — Personal Invitation Reveal
 */
function initInvitationReveal(gsap, ScrollTrigger) {
  const card = document.querySelector('.invitation-card-editorial');
  if (!card) return;

  gsap.from(card, {
    scrollTrigger: {
      trigger: card,
      start: "top 80%",
      toggleActions: "play none none reverse"
    },
    opacity: 0,
    y: 40,
    duration: 1.4,
    ease: "power3.out"
  });
}

/**
 * Section 05 — Editorial Gallery with Clip-path & Parallax
 */
function initEditorialGallery(gsap, ScrollTrigger) {
  const containers = document.querySelectorAll('.editorial-img-container');

  containers.forEach(container => {
    const img = container.querySelector('img');
    
    // Smooth reveal on scroll
    gsap.fromTo(container, 
      { opacity: 0, y: 30 },
      {
        scrollTrigger: {
          trigger: container,
          start: "top 85%",
          toggleActions: "play none none reverse"
        },
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power2.out"
      }
    );

    // Subtle parallax on internal image
    if (img) {
      gsap.to(img, {
        scrollTrigger: {
          trigger: container,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        },
        yPercent: 8,
        ease: "none"
      });
    }
  });
}

/**
 * Section 06 — Sacred Moments
 */
function initMomentsAnimation(gsap, ScrollTrigger) {
  const cards = document.querySelectorAll('.moment-card');
  if (!cards.length) return;

  gsap.from(cards, {
    scrollTrigger: {
      trigger: '.moments-grid',
      start: "top 80%",
      toggleActions: "play none none reverse"
    },
    opacity: 0,
    y: 40,
    duration: 1.1,
    stagger: 0.2,
    ease: "power3.out"
  });
}

/**
 * Section 07 — Details Reveal
 */
function initDetailsReveal(gsap, ScrollTrigger) {
  const items = document.querySelectorAll('.detail-item');
  if (!items.length) return;

  items.forEach((item, index) => {
    gsap.to(item, {
      scrollTrigger: {
        trigger: item,
        start: "top 85%",
        toggleActions: "play none none reverse"
      },
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out"
    });
  });
}

/**
 * Section 08 — Celebration Timeline
 */
function initTimelineAnimation(gsap, ScrollTrigger) {
  const timelineItems = document.querySelectorAll('.timeline-editorial-item');
  if (!timelineItems.length) return;

  gsap.from(timelineItems, {
    scrollTrigger: {
      trigger: '.timeline-editorial-grid',
      start: "top 80%",
      toggleActions: "play none none reverse"
    },
    opacity: 0,
    y: 35,
    duration: 1,
    stagger: 0.2,
    ease: "power3.out"
  });
}

/**
 * Section 09 & 10 — Closing & Final Blessing
 */
function initClosingAndBlessing(gsap, ScrollTrigger) {
  const closingContainer = document.querySelector('.closing-container');
  if (closingContainer) {
    gsap.from(closingContainer, {
      scrollTrigger: {
        trigger: closingContainer,
        start: "top 75%",
        toggleActions: "play none none reverse"
      },
      opacity: 0,
      y: 40,
      duration: 1.4,
      ease: "power3.out"
    });
  }

  const blessingContent = document.querySelector('.blessing-content');
  if (blessingContent) {
    gsap.from(blessingContent, {
      scrollTrigger: {
        trigger: blessingContent,
        start: "top 75%",
        toggleActions: "play none none reverse"
      },
      opacity: 0,
      y: 40,
      duration: 1.4,
      ease: "power3.out"
    });
  }
}

/**
 * Atmospheric Particles (Incense / Golden Flower Dust)
 */
function initAtmosphericParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particleCount = 28; // Subtle restraint
  const particles = [];

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.8,
      speedY: -(Math.random() * 0.4 + 0.15),
      speedX: (Math.random() - 0.5) * 0.2,
      opacity: Math.random() * 0.4 + 0.1,
      fadeSpeed: Math.random() * 0.005 + 0.002,
      color: Math.random() > 0.4 ? 'rgba(200, 173, 127, ' : 'rgba(235, 140, 52, '
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach(p => {
      p.y += p.speedY;
      p.x += p.speedX;

      if (p.y < -10) {
        p.y = height + 10;
        p.x = Math.random() * width;
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color + p.opacity + ')';
      ctx.fill();
    });

    requestAnimationFrame(render);
  }

  render();
}
