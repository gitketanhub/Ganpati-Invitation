/**
 * Main Application Orchestrator
 * Cinematic Immersive Home Ganpati Invitation Website
 */

import { initLoader } from './loader.js';
import { initSmoothScroll } from './smooth-scroll.js';
import { initAnimations } from './animations.js';
import { initNavigation } from './navigation.js';
import { initInteractions } from './interactions.js';
import { initAudio } from './audio.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Smooth Scrolling
  initSmoothScroll();

  // 2. Initialize Navigation & Header
  initNavigation();

  // 3. Initialize Interactive Components & Config
  initInteractions();

  // 4. Initialize Optional Sacred Audio
  initAudio();

  // 5. Run Sacred Preloader sequence, then fire GSAP animations
  initLoader(() => {
    initAnimations();
  });
});
