/**
 * Sacred Preloader Module
 * Creates a quiet, anticipation-building entry experience.
 */

export function initLoader(onComplete) {
  const preloader = document.getElementById('sacred-preloader');
  if (!preloader) {
    if (onComplete) onComplete();
    return;
  }

  // Check if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    preloader.classList.add('is-hidden');
    if (onComplete) onComplete();
    return;
  }

  const sanskritText = preloader.querySelector('.preloader-sanskrit');
  const divider = preloader.querySelector('.preloader-divider');
  const subtext = preloader.querySelector('.preloader-subtext');

  // GSAP Timeline for the sacred entrance
  if (window.gsap) {
    const tl = window.gsap.timeline({
      onComplete: () => {
        preloader.classList.add('is-hidden');
        document.body.style.overflow = '';
        if (onComplete) onComplete();
      }
    });

    tl.to(sanskritText, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "power2.out"
    })
    .to(divider, {
      opacity: 1,
      scaleX: 1,
      duration: 0.8,
      ease: "power2.inOut"
    }, "-=0.4")
    .to(subtext, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.4")
    .to({}, { duration: 0.8 }) // Brief pause for reverent absorption
    .to(preloader, {
      opacity: 0,
      duration: 0.9,
      ease: "power2.inOut"
    });
  } else {
    // Fallback if GSAP is not yet available
    setTimeout(() => {
      preloader.classList.add('is-hidden');
      if (onComplete) onComplete();
    }, 2200);
  }
}
