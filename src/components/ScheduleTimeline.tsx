import React from 'react';
import { Sparkles, Calendar, Clock, Bell, Flame } from 'lucide-react';
import { invitationData } from '../config/invitation';

interface ScheduleTimelineProps {
  onAddToCalendar: () => void;
  onShare: () => void;
}

export const ScheduleTimeline: React.FC<ScheduleTimelineProps> = ({
  onAddToCalendar,
  onShare,
}) => {
  return (
    <section id="schedule" className="py-20 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#2a1217] border border-[#d4af37]/30 text-xs font-devanagari text-[#e2b866] mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#f39c12]" />
          <span>॥ उत्सव व समय-सारणी ॥</span>
        </div>
        <h2 className="font-devanagari text-3xl sm:text-5xl font-bold text-[#faf5ee] tracking-tight">
          शुभ मुहूर्त व दिन-सारणी
        </h2>
        <p className="font-devanagari text-sm sm:text-lg text-[#e6dcce] mt-2">
          {invitationData.date} • {invitationData.dateDetail}
        </p>
      </div>

      {/* Timeline Cards */}
      <div className="space-y-4 sm:space-y-5">
        {invitationData.timeline.map((item, index) => {
          const devanagariNum = ['०१', '०२', '०३', '०४', '०५'][index] || `०${index + 1}`;
          const isHighlight = item.highlight;

          return (
            <div
              key={item.id}
              className={`relative rounded-2xl p-5 sm:p-6 transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border ${
                isHighlight
                  ? 'bg-gradient-to-r from-[#2f131a] to-[#241014] border-[#f39c12]/60 shadow-[0_0_20px_rgba(243,156,18,0.12)]'
                  : 'bg-[#1e0d11]/80 border-[#d4af37]/25'
              }`}
            >
              {/* Left: Number & Icon & Details */}
              <div className="flex items-start sm:items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 font-devanagari text-lg font-bold border ${
                    isHighlight
                      ? 'bg-[#f39c12] text-[#1a0c0e] border-[#ffd56b]'
                      : 'bg-[#2a1217] text-[#e2b866] border-[#d4af37]/30'
                  }`}
                >
                  {isHighlight ? <Flame className="w-6 h-6 animate-pulse" /> : devanagariNum}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-devanagari text-lg sm:text-xl font-bold text-[#faf5ee]">
                      {item.title}
                    </h3>
                    {isHighlight && (
                      <span className="px-2 py-0.5 rounded-full bg-[#f39c12]/20 border border-[#f39c12]/40 text-[10px] sm:text-xs font-devanagari text-[#f39c12] font-semibold">
                        विशेष मुहूर्त
                      </span>
                    )}
                  </div>
                  <p className="font-devanagari text-xs sm:text-sm text-[#e6dcce] mt-1 max-w-xl">
                    {item.subtext}
                  </p>
                </div>
              </div>

              {/* Right: Time Badge */}
              <div className="flex items-center gap-2 self-start sm:self-center px-4 py-2 rounded-xl bg-[#12070a]/80 border border-[#d4af37]/30 text-[#e2b866] font-devanagari font-semibold text-xs sm:text-sm shrink-0">
                <Clock className="w-4 h-4 text-[#f39c12]" />
                <span>{item.time}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Action Utilities: Add to Calendar & Share */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-6 border-t border-[#d4af37]/20">
        <button
          onClick={onAddToCalendar}
          className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#2a1217] hover:bg-[#3d1a24] text-[#faf5ee] border border-[#d4af37]/40 font-devanagari text-xs sm:text-sm font-medium transition-all active:scale-95 flex items-center justify-center gap-2 shadow-md cursor-pointer"
        >
          <Calendar className="w-4 h-4 text-[#f39c12]" />
          <span>कैलेंडर में जोड़ें (Google Calendar)</span>
        </button>

        <button
          onClick={onShare}
          className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#2a1217] hover:bg-[#3d1a24] text-[#faf5ee] border border-[#d4af37]/40 font-devanagari text-xs sm:text-sm font-medium transition-all active:scale-95 flex items-center justify-center gap-2 shadow-md cursor-pointer"
        >
          <Bell className="w-4 h-4 text-[#e2b866]" />
          <span>निमंत्रण साझा करें</span>
        </button>
      </div>
    </section>
  );
};
