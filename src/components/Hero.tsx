import React, { useState, useEffect } from 'react';
import { ChevronDown, Calendar, MapPin, Sparkles } from 'lucide-react';
import { invitationData } from '../config/invitation';

interface HeroProps {
  onScrollToDarshan: () => void;
  onOpenRsvp: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollToDarshan, onOpenRsvp }) => {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = new Date(invitationData.gregorianDate).getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const diff = Math.max(0, target - now);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  // Hindi numeral formatter
  const toDevanagariDigits = (num: number) => {
    const devanagariDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
    return String(num)
      .split('')
      .map((char) => devanagariDigits[parseInt(char, 10)] ?? char)
      .join('');
  };

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] sm:min-h-screen flex flex-col justify-between items-center pt-24 pb-12 px-4 overflow-hidden text-center"
    >
      {/* Background Image with Cinematic Vignette */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1567591370504-8b631d87e076?auto=format&fit=crop&w=1920&q=85"
          alt="घर में विराजे श्री गणेश जी की मनमोहक प्रतिमा"
          className="w-full h-full object-cover object-center scale-105 animate-subtleZoom"
        />
        {/* Multilayered radial and linear dark gradients for soft contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#12070a] via-[#12070a]/75 to-[#12070a]/60" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#12070a]/40 to-[#12070a]/90" />
      </div>

      {/* Floating Diya Light Aura */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#f39c12]/15 rounded-full blur-3xl pointer-events-none" />

      {/* Main Center Content */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center my-auto">
        {/* Sacred Sanskrit Invocation */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2a1217]/80 border border-[#d4af37]/40 backdrop-blur-md mb-5 shadow-lg">
          <Sparkles className="w-3.5 h-3.5 text-[#e2b866]" />
          <span className="font-devanagari text-xs sm:text-sm font-semibold tracking-wider text-[#e2b866]">
            {invitationData.shlokas.pranam}
          </span>
          <Sparkles className="w-3.5 h-3.5 text-[#e2b866]" />
        </div>

        {/* Main Emotional Headline */}
        <h1 className="font-devanagari text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-[#faf5ee] leading-tight drop-shadow-2xl">
          गणपति बाप्पा <br className="sm:hidden" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f39c12] via-[#ffd56b] to-[#f39c12]">
            मोरया
          </span>
        </h1>

        {/* Heartfelt Sub-heading */}
        <p className="mt-4 sm:mt-6 font-devanagari text-lg sm:text-2xl text-[#f5ebd7] font-medium max-w-2xl leading-relaxed">
          «बप्पा हमारे घर पधारे हैं...»
        </p>

        <p className="mt-1 font-devanagari text-sm sm:text-base text-[#e2b866]/90">
          स्नेह और भक्ति के साथ आप सपरिवार सादर आमंत्रित हैं
        </p>

        {/* Date & Location Quick Badge */}
        <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm font-devanagari">
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#241014]/90 border border-[#d4af37]/30 text-[#faf5ee] backdrop-blur-md">
            <Calendar className="w-4 h-4 text-[#f39c12]" />
            <span>{invitationData.date}</span>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#241014]/90 border border-[#d4af37]/30 text-[#faf5ee] backdrop-blur-md">
            <MapPin className="w-4 h-4 text-[#f39c12]" />
            <span>{invitationData.venueName}</span>
          </div>
        </div>

        {/* Live Countdown to Celebration */}
        <div className="mt-6 p-3 sm:p-4 rounded-2xl bg-[#1e0d11]/80 border border-[#d4af37]/30 backdrop-blur-md max-w-md w-full">
          <span className="text-[11px] sm:text-xs font-devanagari text-[#e2b866] block mb-2 font-medium">
            ⏳ गणेशोत्सव दर्शन में शेष समय:
          </span>
          <div className="grid grid-cols-4 gap-2 text-center">
            <div className="bg-[#2d1419] p-2 rounded-lg border border-[#d4af37]/20">
              <span className="block text-lg sm:text-2xl font-bold text-[#faf5ee] font-mono">
                {toDevanagariDigits(timeLeft.days)}
              </span>
              <span className="text-[10px] text-[#a89e92] font-devanagari">दिन</span>
            </div>
            <div className="bg-[#2d1419] p-2 rounded-lg border border-[#d4af37]/20">
              <span className="block text-lg sm:text-2xl font-bold text-[#faf5ee] font-mono">
                {toDevanagariDigits(timeLeft.hours)}
              </span>
              <span className="text-[10px] text-[#a89e92] font-devanagari">घंटे</span>
            </div>
            <div className="bg-[#2d1419] p-2 rounded-lg border border-[#d4af37]/20">
              <span className="block text-lg sm:text-2xl font-bold text-[#faf5ee] font-mono">
                {toDevanagariDigits(timeLeft.minutes)}
              </span>
              <span className="text-[10px] text-[#a89e92] font-devanagari">मिनट</span>
            </div>
            <div className="bg-[#2d1419] p-2 rounded-lg border border-[#d4af37]/20">
              <span className="block text-lg sm:text-2xl font-bold text-[#f39c12] font-mono">
                {toDevanagariDigits(timeLeft.seconds)}
              </span>
              <span className="text-[10px] text-[#a89e92] font-devanagari">सेकंड</span>
            </div>
          </div>
        </div>

        {/* Primary Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto px-4">
          <button
            onClick={onScrollToDarshan}
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-gradient-to-r from-[#d4af37] via-[#f39c12] to-[#d4af37] text-[#1a0c0e] font-devanagari font-bold text-sm sm:text-base tracking-wide shadow-[0_4px_20px_rgba(243,156,18,0.35)] hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>बप्पा के दर्शन करें</span>
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </button>

          <button
            onClick={onOpenRsvp}
            className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#241014]/90 hover:bg-[#34171d] text-[#faf5ee] border border-[#d4af37]/40 font-devanagari font-medium text-sm sm:text-base shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>सपरिवार उपस्थिति बताएं (RSVP)</span>
          </button>
        </div>
      </div>

      {/* Subtle Scroll Down Prompt */}
      <button
        onClick={onScrollToDarshan}
        aria-label="दर्शन के लिए नीचे स्क्रॉल करें"
        className="relative z-10 mt-8 flex flex-col items-center gap-1 text-[#e2b866]/80 hover:text-[#e2b866] transition-colors cursor-pointer group"
      >
        <span className="text-xs font-devanagari tracking-wider">दर्शन हेतु आगे बढ़ें</span>
        <ChevronDown className="w-5 h-5 animate-bounce text-[#e2b866]" />
      </button>
    </section>
  );
};
