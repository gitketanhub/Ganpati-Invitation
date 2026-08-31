/**
 * Interactions & Utilities
 * Micro-interactions, directions, RSVP, Calendar, Share, Copy Address, Return to top.
 */

import { scrollTo } from './smooth-scroll.js';
import { invitationConfig } from './config.js';

let toastTimeout = null;

export function showToast(message, duration = 3000) {
  const toast = document.getElementById('sacred-toast');
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add('is-visible');

  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('is-visible');
  }, duration);
}

export function initInteractions() {
  // Return to Bappa (top)
  const returnBtn = document.getElementById('return-to-top-btn');
  if (returnBtn) {
    returnBtn.addEventListener('click', () => {
      scrollTo(0, { duration: 2.2 });
    });
  }

  // Begin Darshan (scroll indicator)
  const scrollIndicator = document.getElementById('hero-scroll-indicator');
  if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
      scrollTo('#transition', { duration: 1.4 });
    });
  }

  // Google Maps Directions
  const directionsBtn = document.getElementById('get-directions-btn');
  if (directionsBtn) {
    directionsBtn.addEventListener('click', () => {
      if (invitationConfig.mapsUrl) {
        window.open(invitationConfig.mapsUrl, '_blank', 'noopener,noreferrer');
      }
    });
  }

  // Copy Address to clipboard
  const copyAddressBtn = document.getElementById('copy-address-btn');
  if (copyAddressBtn) {
    copyAddressBtn.addEventListener('click', async () => {
      const fullAddressText = `${invitationConfig.venueName}, ${invitationConfig.venueAddress}`;
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(fullAddressText);
        } else {
          const textarea = document.createElement('textarea');
          textarea.value = fullAddressText;
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand('copy');
          document.body.removeChild(textarea);
        }
        showToast('निवास का पता कॉपी हो गया है! 🙏');
      } catch (err) {
        showToast('पता: ' + fullAddressText);
      }
    });
  }

  // WhatsApp RSVP
  const whatsappRsvpBtn = document.getElementById('whatsapp-rsvp-btn');
  if (whatsappRsvpBtn) {
    whatsappRsvpBtn.addEventListener('click', () => {
      const msg = encodeURIComponent(invitationConfig.whatsappMessage);
      const url = `https://api.whatsapp.com/send?text=${msg}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    });
  }

  // Add to Calendar
  const addCalendarBtn = document.getElementById('add-calendar-btn');
  if (addCalendarBtn) {
    addCalendarBtn.addEventListener('click', () => {
      // Google Calendar link for Friday 19 Sep 2026
      const title = encodeURIComponent("श्री गणेशोत्सव दर्शन एवं महाआरती — " + invitationConfig.hostName);
      const details = encodeURIComponent("बप्पा हमारे घर पधारे हैं। आप सपरिवार दर्शन, महाआरती एवं महाप्रसाद हेतु सादर आमंत्रित हैं।");
      const location = encodeURIComponent(`${invitationConfig.venueName}, ${invitationConfig.venueAddress}`);
      // 2026-09-19 10:00 to 22:00 IST (UTC+5:30 -> 04:30 to 16:30 UTC)
      const dates = "20260919T043000Z/20260919T163000Z";
      const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${dates}`;
      
      window.open(gcalUrl, '_blank', 'noopener,noreferrer');
      showToast('कैलेंडर में जोड़ने हेतु पृष्ठ खोला गया 📅');
    });
  }

  // Share Invitation
  const shareInviteBtn = document.getElementById('share-invite-btn');
  if (shareInviteBtn) {
    shareInviteBtn.addEventListener('click', async () => {
      const shareData = {
        title: 'गणपति बप्पा मोरया | श्री गणेशोत्सव निमंत्रण',
        text: 'बप्पा हमारे घर पधारे हैं... स्नेह और भक्ति के साथ हम आपको और आपके परिवार को बप्पा के दर्शन हेतु सादर आमंत्रित करते हैं।',
        url: window.location.href
      };

      if (navigator.share) {
        try {
          await navigator.share(shareData);
        } catch (err) {
          // cancelled or unsupported
        }
      } else {
        try {
          if (navigator.clipboard) {
            await navigator.clipboard.writeText(window.location.href);
            showToast('निमंत्रण लिंक कॉपी हो गया है! 📤');
          }
        } catch (err) {
          showToast('लिंक साझा करें: ' + window.location.href);
        }
      }
    });
  }

  // Populate Dynamic Content from Config
  populateConfigContent();
}

function populateConfigContent() {
  // Host Name & Family
  const hostElements = document.querySelectorAll('[data-config="hostName"]');
  hostElements.forEach(el => el.textContent = invitationConfig.hostName);

  const familyElements = document.querySelectorAll('[data-config="familyMembers"]');
  familyElements.forEach(el => el.textContent = invitationConfig.familyMembers);

  // Dates
  const dateElements = document.querySelectorAll('[data-config="date"]');
  dateElements.forEach(el => el.textContent = invitationConfig.date);

  const dateDetailElements = document.querySelectorAll('[data-config="dateDetail"]');
  dateDetailElements.forEach(el => el.textContent = invitationConfig.dateDetail);

  // Darshan
  const darshanElements = document.querySelectorAll('[data-config="darshanTime"]');
  darshanElements.forEach(el => el.textContent = invitationConfig.darshanTime);

  const darshanSubElements = document.querySelectorAll('[data-config="darshanSubtext"]');
  darshanSubElements.forEach(el => el.textContent = invitationConfig.darshanSubtext);

  // Aarti
  const aartiElements = document.querySelectorAll('[data-config="aartiTime"]');
  aartiElements.forEach(el => el.textContent = invitationConfig.aartiTime);

  const aartiSubElements = document.querySelectorAll('[data-config="aartiSubtext"]');
  aartiSubElements.forEach(el => el.textContent = invitationConfig.aartiSubtext);

  // Venue Name & Address & Landmark
  const venueNameElements = document.querySelectorAll('[data-config="venueName"]');
  venueNameElements.forEach(el => el.textContent = invitationConfig.venueName);

  const venueAddressElements = document.querySelectorAll('[data-config="venueAddress"]');
  venueAddressElements.forEach(el => el.textContent = invitationConfig.venueAddress);

  const landmarkElements = document.querySelectorAll('[data-config="landmark"]');
  landmarkElements.forEach(el => el.textContent = invitationConfig.landmark);
}
