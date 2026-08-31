import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { InteractivePuja } from './components/InteractivePuja';
import { StorySection } from './components/StorySection';
import { DarshanGallery } from './components/DarshanGallery';
import { SacredMoments } from './components/SacredMoments';
import { ScheduleTimeline } from './components/ScheduleTimeline';
import { VenueDetails } from './components/VenueDetails';
import { ClosingBlessing } from './components/ClosingBlessing';
import { BottomDock } from './components/BottomDock';
import { RsvpModal } from './components/RsvpModal';
import { Toast } from './components/Toast';
import { invitationData } from './config/invitation';
import { sacredAudio } from './utils/audio';

export default function App() {
  const [isRsvpOpen, setIsRsvpOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [flowerCount, setFlowerCount] = useState<number>(0);
  const [diyaCount, setDiyaCount] = useState<number>(0);
  const [isDiyaLit, setIsDiyaLit] = useState<boolean>(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3500);
  };

  const handleOfferFlower = () => {
    setFlowerCount((prev) => prev + 1);
    sacredAudio.playFlowerChime();
    showToast('🌸 बप्पा के श्रीचरणों में पुष्प अर्पित किए गए!');
  };

  const handleLightDiya = () => {
    setIsDiyaLit(true);
    setDiyaCount((prev) => prev + 1);
    sacredAudio.playSingingBowl();
    showToast('🪔 बप्पा की महाआरती हेतु दीप प्रज्वलित किया गया!');
  };

  const handleRingBell = () => {
    sacredAudio.playTempleBell();
    showToast('🔔 मंगल शंख व पावन घंटी नाद!');
  };

  const handleScrollTo = (selector: string) => {
    const el = document.querySelector(selector);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopyAddress = async () => {
    const fullAddress = `${invitationData.venueName}, ${invitationData.venueAddress}`;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(fullAddress);
      } else {
        const input = document.createElement('textarea');
        input.value = fullAddress;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
      }
      showToast('📋 निवास का पता सफलतापूर्वक कॉपी हो गया है!');
    } catch {
      showToast(`पता: ${fullAddress}`);
    }
  };

  const handleOpenMap = () => {
    if (invitationData.mapsUrl) {
      window.open(invitationData.mapsUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleCallHost = () => {
    if (invitationData.phoneContact) {
      window.location.href = `tel:${invitationData.phoneContact.replace(/\s+/g, '')}`;
    } else {
      showToast('कृपया व्हाट्सएप के माध्यम से संपर्क करें');
    }
  };

  const handleAddToCalendar = () => {
    const title = encodeURIComponent(`श्री गणेशोत्सव दर्शन एवं महाआरती — ${invitationData.hostName}`);
    const details = encodeURIComponent(
      `बप्पा हमारे घर पधारे हैं। आप सपरिवार दर्शन, महाआरती एवं महाप्रसाद हेतु सादर आमंत्रित हैं।\nस्थान: ${invitationData.venueName}\nपता: ${invitationData.venueAddress}`
    );
    const location = encodeURIComponent(`${invitationData.venueName}, ${invitationData.venueAddress}`);
    const dates = '20260919T043000Z/20260919T163000Z'; // UTC for 10am to 10pm IST
    const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${dates}`;

    window.open(gcalUrl, '_blank', 'noopener,noreferrer');
    showToast('📅 गूगल कैलेंडर में जोड़ने हेतु लिंक खोला गया');
  };

  const handleShare = async () => {
    const shareData = {
      title: 'गणपति बप्पा मोरया | श्री गणेशोत्सव निमंत्रण',
      text: 'बप्पा हमारे घर पधारे हैं... स्नेह और भक्ति के साथ हम आपको और आपके परिवार को बप्पा के दर्शन हेतु सादर आमंत्रित करते हैं। 🙏🌺',
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // cancelled
      }
    } else {
      try {
        if (navigator.clipboard) {
          await navigator.clipboard.writeText(window.location.href);
          showToast('📤 निमंत्रण लिंक कॉपी हो गया है!');
        }
      } catch {
        showToast(`लिंक: ${window.location.href}`);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#12070a] text-[#faf5ee] selection:bg-[#f39c12]/30 selection:text-[#ffd56b] overflow-x-hidden font-sans">
      {/* Toast Notification Banner */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />

      {/* Top Navbar */}
      <Navbar
        onOpenRsvp={() => setIsRsvpOpen(true)}
        onRingBell={handleRingBell}
      />

      {/* Main Content Sections */}
      <main className="relative pb-20 sm:pb-12">
        {/* 01: Hero with Arrival, Countdown & Bappa Image */}
        <Hero
          onScrollToDarshan={() => handleScrollTo('#darshan')}
          onOpenRsvp={() => setIsRsvpOpen(true)}
        />

        {/* 02: Interactive Puja Controls (Flower Shower & Diya Lighting) */}
        <InteractivePuja
          flowerCount={flowerCount}
          diyaCount={diyaCount}
          isDiyaLit={isDiyaLit}
          onOfferFlower={handleOfferFlower}
          onLightDiya={handleLightDiya}
          onRingBell={handleRingBell}
        />

        {/* 03: Emotional Hindi Story & Family Invitation */}
        <StorySection />

        {/* 04: Divine Darshan Gallery with Zoom Lightbox */}
        <DarshanGallery onOfferFlower={handleOfferFlower} />

        {/* 05: Sacred Moments (Aarti, Prasad, Bhakti) */}
        <SacredMoments />

        {/* 06: Schedule & Timings Timeline */}
        <ScheduleTimeline
          onAddToCalendar={handleAddToCalendar}
          onShare={handleShare}
        />

        {/* 07: Venue, Map & Directions */}
        <VenueDetails
          onCopyAddress={handleCopyAddress}
          onOpenMap={handleOpenMap}
          onCallHost={handleCallHost}
        />

        {/* 08: Closing Blessings & Om */}
        <ClosingBlessing
          onScrollToTop={handleScrollToTop}
          onOpenRsvp={() => setIsRsvpOpen(true)}
        />
      </main>

      {/* Mobile Floating Sacred Bottom Dock */}
      <BottomDock
        onScrollTo={handleScrollTo}
        onOpenRsvp={() => setIsRsvpOpen(true)}
        onOfferFlower={handleOfferFlower}
      />

      {/* Mobile RSVP Bottom Sheet / Modal */}
      <RsvpModal
        isOpen={isRsvpOpen}
        onClose={() => setIsRsvpOpen(false)}
      />
    </div>
  );
}
