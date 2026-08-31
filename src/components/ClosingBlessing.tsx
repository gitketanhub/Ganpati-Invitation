import React, { useState } from 'react';
import { ArrowUp, Sparkles, Heart, Download, Check, Loader2 } from 'lucide-react';
import { invitationData } from '../config/invitation';

interface ClosingBlessingProps {
  onScrollToTop: () => void;
  onOpenRsvp: () => void;
}

export const ClosingBlessing: React.FC<ClosingBlessingProps> = ({
  onScrollToTop,
  onOpenRsvp,
}) => {
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownloadZip = async () => {
    try {
      setDownloading(true);
      const response = await fetch('/ganpati-invitation.zip');
      if (!response.ok) throw new Error('Download failed');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'ganpati-invitation.zip';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4000);
    } catch (err) {
      console.error('Download error:', err);
      // Fallback
      window.open('/ganpati-invitation.zip', '_blank');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <footer className="relative py-24 px-4 sm:px-6 text-center overflow-hidden bg-gradient-to-t from-[#0d0507] via-[#160a0d] to-[#1f0d11]">
      {/* Background Diya Radiance */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#f39c12]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto space-y-8">
        {/* Sacred Om */}
        <div className="inline-block text-5xl sm:text-6xl text-[#e2b866] font-serif hover:scale-110 transition-transform cursor-default">
          ॐ
        </div>

        {/* Closing Headline */}
        <h2 className="font-devanagari text-2xl sm:text-4xl md:text-5xl font-bold text-[#faf5ee] leading-tight">
          आपकी उपस्थिति हमारे इस उत्सव को <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffd56b] via-[#faf5ee] to-[#ffd56b]">
            और भी विशेष व मंगलमय बनाएगी।
          </span>
        </h2>

        <p className="font-devanagari text-sm sm:text-lg text-[#e6dcce] max-w-xl mx-auto leading-relaxed">
          हम सपरिवार पूरे स्नेह, आदर और भक्ति भाव के साथ आपके आगमन की प्रतीक्षा करेंगे।
        </p>

        {/* Namaste Emoji */}
        <div className="text-4xl sm:text-5xl animate-bounce" style={{ animationDuration: '3s' }}>
          🙏
        </div>

        {/* Morya Chants */}
        <div className="p-4 sm:p-6 rounded-2xl bg-[#241014]/60 border border-[#d4af37]/25 max-w-md mx-auto">
          <div className="flex items-center justify-center gap-2 text-xs font-devanagari text-[#f39c12] mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>पावन जयघोष</span>
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <p className="font-devanagari text-lg sm:text-xl font-bold text-[#faf5ee] tracking-wide">
            {invitationData.shlokas.morya}
          </p>
        </div>

        {/* RSVP button again in footer */}
        <div className="pt-2">
          <button
            onClick={onOpenRsvp}
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#8e2800] via-[#b33900] to-[#8e2800] text-[#faf5ee] font-devanagari font-bold text-sm sm:text-base border border-[#f39c12]/40 shadow-xl hover:brightness-110 active:scale-95 transition-all cursor-pointer inline-flex items-center gap-2"
          >
            <Heart className="w-4 h-4 text-[#f39c12] fill-[#f39c12]" />
            <span>सपरिवार उपस्थिति बताएं (RSVP)</span>
          </button>
        </div>

        {/* Return to Top & Download Project Buttons */}
        <div className="pt-6 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={onScrollToTop}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1e0d11] hover:bg-[#2e151b] text-[#e2b866] border border-[#d4af37]/30 text-xs sm:text-sm font-devanagari transition-all active:scale-95 cursor-pointer"
          >
            <ArrowUp className="w-4 h-4" />
            <span>बप्पा के दर्शन हेतु ऊपर जाएं</span>
          </button>

          <button
            onClick={handleDownloadZip}
            disabled={downloading}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#241014] hover:bg-[#34171d] text-[#faf5ee] border border-[#d4af37]/30 text-xs sm:text-sm font-devanagari transition-all active:scale-95 cursor-pointer disabled:opacity-50"
          >
            {downloading ? (
              <>
                <Loader2 className="w-4 h-4 text-[#f39c12] animate-spin" />
                <span>ZIP तैयार हो रही है...</span>
              </>
            ) : downloadSuccess ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>ZIP डाउनलोड शुरू!</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4 text-[#f39c12]" />
                <span>प्रोजेक्ट ZIP डाउनलोड करें</span>
              </>
            )}
          </button>
        </div>

        {/* Host Credits */}
        <div className="pt-10 border-t border-[#d4af37]/15 text-xs text-[#a89e92] font-devanagari">
          <p>सप्रेम निमंत्रक: {invitationData.hostName} ({invitationData.familyMembers})</p>
          <p className="text-[11px] text-[#7a7066] mt-1">श्री गणेशोत्सव • भाद्रपद शुक्ल चतुर्थी २०२६</p>
        </div>
      </div>
    </footer>
  );
};
