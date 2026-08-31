/**
 * Smooth Scroll Module (Lenis + GSAP ScrollTrigger synchronization)
 */

let lenisInstance = null;

export function initSmoothScroll() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion || typeof window.Lenis === 'undefined') {
    return null;
  }

  // Initialize Lenis
  lenisInstance = new window.Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 0.9,
    touchMultiplier: 1.5,
    infinite: false,
  });

  // Synchronize Lenis with GSAP ScrollTrigger
  if (window.ScrollTrigger && window.gsap) {
    lenisInstance.on('scroll', window.ScrollTrigger.update);

    window.gsap.ticker.add((time) => {
      lenisInstance.raf(time * 1000);
    });

    window.gsap.ticker.lagSmoothing(0);
  } else {
    function raf(time) {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }

  return lenisInstance;
}

export function getLenis() {
  return lenisInstance;
}

export function scrollTo(target, options = {}) {
  if (lenisInstance) {
    lenisInstance.scrollTo(target, {
      duration: 1.6,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      ...options
    });
  } else {
    const el = typeof target === 'string' ? document.querySelector(target) : target;
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
