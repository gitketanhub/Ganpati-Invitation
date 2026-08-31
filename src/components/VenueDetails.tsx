import React from 'react';
import { MapPin, Navigation, Copy, Sparkles, Phone, Compass, Info } from 'lucide-react';
import { invitationData } from '../config/invitation';

interface VenueDetailsProps {
  onCopyAddress: () => void;
  onOpenMap: () => void;
  onCallHost: () => void;
}

export const VenueDetails: React.FC<VenueDetailsProps> = ({
  onCopyAddress,
  onOpenMap,
  onCallHost,
}) => {
  return (
    <section id="venue" className="py-20 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#2a1217] border border-[#d4af37]/30 text-xs font-devanagari text-[#e2b866] mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#f39c12]" />
          <span>॥ स्थान व मार्ग ॥</span>
        </div>
        <h2 className="font-devanagari text-3xl sm:text-5xl font-bold text-[#faf5ee] tracking-tight">
          हम आपका इंतज़ार करेंगे
        </h2>
        <p className="font-devanagari text-sm sm:text-lg text-[#e6dcce] mt-2">
          हमारे घर तक सुगमता से पहुंचने के लिए मार्ग एवं विवरण
        </p>
      </div>

      {/* Main Venue Card */}
      <div className="bg-[#1f0d11]/90 border border-[#d4af37]/35 rounded-3xl p-6 sm:p-10 backdrop-blur-md shadow-2xl relative overflow-hidden">
        {/* Subtle Decorative Background Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#f39c12]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Left: Address & Landmark details */}
          <div className="md:col-span-7 space-y-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#f39c12] font-devanagari block mb-1">
                स्थान
              </span>
              <h3 className="font-devanagari text-2xl sm:text-3xl font-bold text-[#faf5ee]">
                {invitationData.venueName}
              </h3>
            </div>

            <div className="flex items-start gap-3 text-sm sm:text-base font-devanagari text-[#e6dcce] leading-relaxed">
              <MapPin className="w-5 h-5 text-[#f39c12] shrink-0 mt-1" />
              <div>
                <p className="text-[#faf5ee] font-medium">{invitationData.venueAddress}</p>
                <p className="text-xs sm:text-sm text-[#e2b866] mt-1">{invitationData.city}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 text-xs sm:text-sm font-devanagari text-[#e6dcce] bg-[#2a1217]/70 p-3.5 rounded-xl border border-[#d4af37]/20">
              <Compass className="w-4 h-4 text-[#f39c12] shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-[#faf5ee]">प्रमुख पहचान (Landmark): </span>
                <span>{invitationData.landmark}</span>
              </div>
            </div>

            {/* Parking & Welcome Note */}
            <div className="flex items-start gap-3 text-xs font-devanagari text-[#a89e92]">
              <Info className="w-4 h-4 text-[#e2b866] shrink-0 mt-0.5" />
              <p>
                अतिथियों के लिए सोसाइटी परिसर में सुगम वाहन पार्किंग की व्यवस्था उपलब्ध है।
              </p>
            </div>
          </div>

          {/* Right: Quick Action Buttons */}
          <div className="md:col-span-5 flex flex-col gap-3 sm:gap-3.5 bg-[#291217]/80 p-5 sm:p-6 rounded-2xl border border-[#d4af37]/25">
            <h4 className="font-devanagari text-sm font-semibold text-[#e2b866] text-center mb-1">
              त्वरित सुविधाएं
            </h4>

            {/* Google Maps Button */}
            <button
              onClick={onOpenMap}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#f39c12] hover:brightness-110 text-[#1a0c0e] font-devanagari font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Navigation className="w-4 h-4" />
              <span>गूगल मैप्स पर मार्ग देखें</span>
            </button>

            {/* Copy Address Button */}
            <button
              onClick={onCopyAddress}
              className="w-full py-3 px-4 rounded-xl bg-[#1f0d11] hover:bg-[#34171d] text-[#faf5ee] border border-[#d4af37]/35 font-devanagari font-medium text-xs sm:text-sm transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Copy className="w-4 h-4 text-[#e2b866]" />
              <span>निवास का पता कॉपी करें</span>
            </button>

            {/* Call Host Button */}
            <button
              onClick={onCallHost}
              className="w-full py-3 px-4 rounded-xl bg-[#1f0d11] hover:bg-[#34171d] text-[#faf5ee] border border-[#d4af37]/35 font-devanagari font-medium text-xs sm:text-sm transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Phone className="w-4 h-4 text-[#f39c12]" />
              <span>मेजबान से संपर्क करें</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
