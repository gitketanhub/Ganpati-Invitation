/**
 * Navigation Module
 * Minimal full-screen menu overlay and smooth section scrolling.
 */

import { scrollTo } from './smooth-scroll.js';

export function initNavigation() {
  const menuBtn = document.getElementById('menu-toggle-btn');
  const navOverlay = document.getElementById('nav-overlay');
  const closeBtn = document.getElementById('nav-overlay-close-btn');
  const navLinks = document.querySelectorAll('.nav-link');
  const logoBtn = document.getElementById('logo-symbol');

  if (!menuBtn || !navOverlay) return;

  function openMenu() {
    navOverlay.classList.add('is-open');
    menuBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    
    // Focus first link for keyboard a11y
    const firstLink = navOverlay.querySelector('.nav-link');
    if (firstLink) setTimeout(() => firstLink.focus(), 150);
  }

  function closeMenu() {
    navOverlay.classList.remove('is-open');
    menuBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  menuBtn.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);

  // Close on ESC key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navOverlay.classList.contains('is-open')) {
      closeMenu();
    }
  });

  // Handle nav item clicks
  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      closeMenu();
      setTimeout(() => {
        scrollTo(targetId);
      }, 350);
    });
  });

  if (logoBtn) {
    logoBtn.addEventListener('click', (e) => {
      e.preventDefault();
      scrollTo('#hero');
    });
  }
}
