import React, { useState } from 'react';
import { X, Send, Heart, Users, Clock, Sparkles } from 'lucide-react';
import { invitationData } from '../config/invitation';

interface RsvpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RsvpModal: React.FC<RsvpModalProps> = ({ isOpen, onClose }) => {
  const [guestName, setGuestName] = useState('');
  const [guestCount, setGuestCount] = useState<number>(2);
  const [preferredSlot, setPreferredSlot] = useState<string>('संध्या दीप महाआरती (७:३० PM)');
  const [note, setNote] = useState('');

  if (!isOpen) return null;

  const slots = [
    'प्रातः दर्शन (१०:०० AM - १२:०० PM)',
    'मध्याह्न महाआरती व भोग (११:३० AM)',
    'संध्या दीप महाआरती (७:३० PM)',
    'पूरे दिन में कभी भी दर्शन हेतु',
  ];

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();

    const nameText = guestName.trim() ? guestName.trim() : 'हम';
    const noteText = note.trim() ? `\nविशेष संदेश: ${note.trim()}` : '';

    const message = `॥ ॐ गं गणपतये नमः ॥\n\nआदरणीय ${invitationData.hostName} जी,\nबप्पा के दर्शन का निमंत्रण प्राप्त हुआ।\n\nहम (${nameText}, ${guestCount} सदस्य) बप्पा के पावन दर्शन एवं ${preferredSlot} में सपरिवार सम्मिलित होने अवश्य पधारेंगे। 🙏🌺${noteText}\n\n— गणपति बाप्पा मोरया!`;

    const encoded = encodeURIComponent(message);
    const whatsappUrl = invitationData.whatsappNumber
      ? `https://wa.me/${invitationData.whatsappNumber}?text=${encoded}`
      : `https://api.whatsapp.com/send?text=${encoded}`;

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      {/* Click outside backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal / Bottom Sheet */}
      <div className="relative z-10 w-full sm:max-w-lg bg-[#1a0c0f] border-t sm:border border-[#d4af37]/40 rounded-t-3xl sm:rounded-3xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl animate-slideUp">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#d4af37]/20">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#f39c12]" />
            <span className="font-devanagari text-base font-bold text-[#faf5ee]">
              सपरिवार उपस्थिति (RSVP)
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-[#2a1217] hover:bg-[#3d1a24] text-[#faf5ee] border border-[#d4af37]/30 cursor-pointer"
            aria-label="बंद करें"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Subtext */}
        <p className="font-devanagari text-xs sm:text-sm text-[#e6dcce] mt-3">
          आपकी उपस्थिति हमारे लिए अत्यंत आनंद का विषय होगी। कृपया अपनी सुविधा अनुसार समय एवं परिवार के सदस्यों की संख्या साझा करें।
        </p>

        {/* Form */}
        <form onSubmit={handleSendWhatsApp} className="mt-5 space-y-4 font-devanagari">
          {/* Guest Name */}
          <div>
            <label className="block text-xs font-semibold text-[#e2b866] mb-1.5">
              आपका शुभ नाम / परिवार का नाम *
            </label>
            <input
              type="text"
              required
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              placeholder="उदा. रमेश कुमार एवं परिवार"
              className="w-full px-4 py-2.5 rounded-xl bg-[#241014] border border-[#d4af37]/30 text-[#faf5ee] placeholder-[#8a7e72] text-sm focus:outline-none focus:border-[#f39c12] transition-colors"
            />
          </div>

          {/* Members Count */}
          <div>
            <label className="block text-xs font-semibold text-[#e2b866] mb-1.5 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-[#f39c12]" />
                <span>कितने सदस्य पधारेंगे?</span>
              </span>
              <span className="text-[#faf5ee] font-bold text-sm">{guestCount} सदस्य</span>
            </label>
            <div className="grid grid-cols-6 gap-2">
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setGuestCount(num)}
                  className={`py-2 rounded-xl text-xs font-bold font-mono transition-all cursor-pointer ${
                    guestCount === num
                      ? 'bg-[#f39c12] text-[#1a0c0e] shadow-md scale-105'
                      : 'bg-[#241014] border border-[#d4af37]/25 text-[#faf5ee] hover:bg-[#34171d]'
                  }`}
                >
                  {num === 6 ? '६+' : ['१', '२', '३', '४', '५'][num - 1]}
                </button>
              ))}
            </div>
          </div>

          {/* Preferred Time Slot */}
          <div>
            <label className="block text-xs font-semibold text-[#e2b866] mb-1.5 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#f39c12]" />
              <span>दर्शन / आरती का पसंदीदा समय</span>
            </label>
            <div className="space-y-2">
              {slots.map((slot) => (
                <label
                  key={slot}
                  className={`flex items-center gap-3 p-3 rounded-xl border text-xs sm:text-sm cursor-pointer transition-all ${
                    preferredSlot === slot
                      ? 'bg-[#2f131a] border-[#f39c12] text-[#faf5ee]'
                      : 'bg-[#241014]/60 border-[#d4af37]/20 text-[#e6dcce] hover:bg-[#241014]'
                  }`}
                >
                  <input
                    type="radio"
                    name="preferredSlot"
                    value={slot}
                    checked={preferredSlot === slot}
                    onChange={() => setPreferredSlot(slot)}
                    className="accent-[#f39c12] w-4 h-4"
                  />
                  <span>{slot}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Optional Note */}
          <div>
            <label className="block text-xs font-semibold text-[#e2b866] mb-1.5">
              अतिरिक्त संदेश (वैकल्पिक)
            </label>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="उदा. हम शाम की आरती में सम्मिलित होंगे"
              className="w-full px-4 py-2.5 rounded-xl bg-[#241014] border border-[#d4af37]/30 text-[#faf5ee] placeholder-[#8a7e72] text-sm focus:outline-none focus:border-[#f39c12]"
            />
          </div>

          {/* Submit Action */}
          <div className="pt-3">
            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#25d366] to-[#128c7e] hover:brightness-110 text-white font-devanagari font-bold text-sm shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>व्हाट्सएप पर पुष्टि भेजें (WhatsApp RSVP)</span>
            </button>
            <p className="text-center text-[11px] text-[#a89e92] mt-2">
              यह सीधे मेजबान परिवार को व्हाट्सएप पर संदेश भेजेगा
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
