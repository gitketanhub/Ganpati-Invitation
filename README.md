# Cinematic Immersive Home Ganpati Invitation Website

A production-quality, cinematic digital invitation website for a home Ganpati celebration, designed with reverent aesthetic restraint, editorial layout, and smooth storytelling.

## Design Philosophy

- **Sacred & Personal**: Built around Bappa's divine presence with warm natural tones, deep shadows, and subtle diya glow.
- **Cinematic Pacing**: Smooth scroll transitions with Lenis and GSAP ScrollTrigger.
- **Editorial Layout**: Curated magazine-style imagery and large display typography (`Cormorant Garamond` & `Noto Serif Devanagari`).
- **Authentic Atmosphere**: Incense and flower dust floating particles, optional meditative temple drone/chimes (Web Audio API), and responsive mobile-first craftsmanship.

## Tech Stack

- **HTML5 & CSS3** (Vanilla modular CSS variables and layout architecture)
- **Vanilla JavaScript (ES Modules)**
- **GSAP 3 & ScrollTrigger**
- **Lenis Smooth Scroll**
- **Web Audio API**

## Customizing Celebration Details

Edit `/js/config.js` to customize host names, dates, aarti timings, venue address, and Google Maps directions link:

```javascript
export const invitationConfig = {
  hostName: "THE SHARMA FAMILY",
  date: "Friday, 19th September 2026",
  darshanTime: "10:00 AM – 10:00 PM",
  aartiTime: "Morning: 11:30 AM | Evening: 7:30 PM",
  venueName: "Sharma Residence (Ganesh Kutir)",
  venueAddress: "Flat 402, Sai Sparsh Residency, Bellandur, Bengaluru",
  mapsUrl: "https://maps.google.com/?q=Bellandur+Bengaluru"
};
```
