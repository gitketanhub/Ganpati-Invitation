import React from 'react';
import { Eye, Flame, MapPin, Send, Flower2 } from 'lucide-react';

interface BottomDockProps {
  onScrollTo: (selector: string) => void;
  onOpenRsvp: () => void;
  onOfferFlower: () => void;
}

export const BottomDock: React.FC<BottomDockProps> = ({
  onScrollTo,
  onOpenRsvp,
  onOfferFlower,
}) => {
  return (
    <div className="fixed bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 w-[94%] max-w-md">
      <div className="bg-[#18090c]/90 backdrop-blur-xl border border-[#d4af37]/35 rounded-full px-3 py-2 sm:px-4 sm:py-2.5 shadow-[0_10px_30px_rgba(0,0,0,0.6)] flex items-center justify-between gap-1">
        {/* Darshan Button */}
        <button
          onClick={() => onScrollTo('#darshan')}
          className="flex flex-col items-center justify-center py-1 px-2.5 rounded-full text-[#faf5ee] hover:text-[#e2b866] active:scale-95 transition-all group cursor-pointer"
          aria-label="दिव्य दर्शन पर जाएं"
        >
          <Eye className="w-4 h-4 text-[#e2b866] group-hover:scale-110 transition-transform" />
          <span className="text-[10px] font-devanagari mt-0.5 font-medium">दर्शन</span>
        </button>

        {/* Schedule / Aarti Button */}
        <button
          onClick={() => onScrollTo('#schedule')}
          className="flex flex-col items-center justify-center py-1 px-2.5 rounded-full text-[#faf5ee] hover:text-[#e2b866] active:scale-95 transition-all group cursor-pointer"
          aria-label="आरती व समय पर जाएं"
        >
          <Flame className="w-4 h-4 text-[#f39c12] group-hover:scale-110 transition-transform" />
          <span className="text-[10px] font-devanagari mt-0.5 font-medium">आरती</span>
        </button>

        {/* Flower Offering Center Action Button */}
        <button
          onClick={onOfferFlower}
          className="flex flex-col items-center justify-center p-2.5 -mt-4 rounded-full bg-gradient-to-tr from-[#8e2800] via-[#f39c12] to-[#d4af37] text-[#1a0c0e] font-bold shadow-[0_4px_15px_rgba(243,156,18,0.4)] active:scale-90 transition-all cursor-pointer border border-[#ffd56b]"
          aria-label="पुष्प अर्पित करें"
        >
          <Flower2 className="w-5 h-5 animate-spin" style={{ animationDuration: '8s' }} />
          <span className="sr-only">पुष्प अर्पण</span>
        </button>

        {/* Venue Button */}
        <button
          onClick={() => onScrollTo('#venue')}
          className="flex flex-col items-center justify-center py-1 px-2.5 rounded-full text-[#faf5ee] hover:text-[#e2b866] active:scale-95 transition-all group cursor-pointer"
          aria-label="स्थान व मार्ग पर जाएं"
        >
          <MapPin className="w-4 h-4 text-[#e2b866] group-hover:scale-110 transition-transform" />
          <span className="text-[10px] font-devanagari mt-0.5 font-medium">स्थान</span>
        </button>

        {/* RSVP Button */}
        <button
          onClick={onOpenRsvp}
          className="flex flex-col items-center justify-center py-1 px-2.5 rounded-full text-[#faf5ee] hover:text-[#f39c12] active:scale-95 transition-all group cursor-pointer"
          aria-label="उपस्थिति बताएं (RSVP)"
        >
          <Send className="w-4 h-4 text-[#25d366] group-hover:scale-110 transition-transform" />
          <span className="text-[10px] font-devanagari mt-0.5 font-medium">न्योता (RSVP)</span>
        </button>
      </div>
    </div>
  );
};
