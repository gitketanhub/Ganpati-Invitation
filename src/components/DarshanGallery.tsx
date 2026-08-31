import React, { useState } from 'react';
import { Eye, X, ZoomIn, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { invitationData } from '../config/invitation';
import { DarshanImage } from '../types';

interface DarshanGalleryProps {
  onOfferFlower: () => void;
}

export const DarshanGallery: React.FC<DarshanGalleryProps> = ({ onOfferFlower }) => {
  const [selectedImage, setSelectedImage] = useState<DarshanImage | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filters = [
    { id: 'all', label: 'सभी दर्शन' },
    { id: 'garbhagriha', label: 'गर्भगृह व झांकी' },
    { id: 'mukharvind', label: 'मुखारविंद' },
    { id: 'shringar', label: 'शृंगार व दीप' },
  ];

  const galleryItems = invitationData.darshanGallery;

  const filteredItems = galleryItems.filter((item) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'garbhagriha') return item.tag.includes('गर्भगृह');
    if (activeFilter === 'mukharvind') return item.tag.includes('दर्शन') || item.title.includes('मुखारविंद');
    if (activeFilter === 'shringar') return item.tag.includes('वरदान') || item.tag.includes('प्रकाश');
    return true;
  });

  const handleNext = () => {
    if (!selectedImage) return;
    const currentIndex = galleryItems.findIndex((img) => img.id === selectedImage.id);
    const nextIndex = (currentIndex + 1) % galleryItems.length;
    setSelectedImage(galleryItems[nextIndex]);
  };

  const handlePrev = () => {
    if (!selectedImage) return;
    const currentIndex = galleryItems.findIndex((img) => img.id === selectedImage.id);
    const prevIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    setSelectedImage(galleryItems[prevIndex]);
  };

  return (
    <section id="darshan" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#2a1217] border border-[#d4af37]/30 text-xs font-devanagari text-[#e2b866] mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#f39c12]" />
          <span>॥ दिव्य दर्शन ॥</span>
        </div>
        <h2 className="font-devanagari text-3xl sm:text-5xl font-bold text-[#faf5ee] tracking-tight">
          बप्पा का मनोहर रूप
        </h2>
        <p className="font-devanagari text-sm sm:text-lg text-[#e6dcce] mt-3 leading-relaxed">
          «पहले बप्पा के दर्शन... फिर सजावट की सुंदरता... फिर उत्सव का वातावरण»
        </p>
      </div>

      {/* Filter Tabs (Mobile Scrollable) */}
      <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`px-4 py-2 rounded-full font-devanagari text-xs sm:text-sm font-medium whitespace-nowrap transition-all cursor-pointer ${
              activeFilter === filter.id
                ? 'bg-gradient-to-r from-[#d4af37] to-[#f39c12] text-[#1a0c0e] font-bold shadow-md'
                : 'bg-[#241014]/70 hover:bg-[#34171d] text-[#e6dcce] border border-[#d4af37]/25'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Editorial Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 sm:gap-6">
        {filteredItems.map((image, index) => {
          // Layout hierarchy: Large banner for first item, balanced portrait cards for others
          const isLarge = index === 0;
          const colSpan = isLarge ? 'lg:col-span-8' : index === 1 ? 'lg:col-span-4' : 'lg:col-span-6';

          return (
            <div
              key={image.id}
              onClick={() => setSelectedImage(image)}
              className={`${colSpan} group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-[#1f0d11] border border-[#d4af37]/30 shadow-xl cursor-pointer transition-all duration-300 hover:border-[#f39c12] hover:-translate-y-1`}
            >
              {/* Image Container with Aspect Ratio */}
              <div className={`relative w-full ${isLarge ? 'h-72 sm:h-96 md:h-[420px]' : 'h-64 sm:h-80 md:h-[420px]'}`}>
                <img
                  src={image.url}
                  alt={image.title}
                  loading="lazy"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#12070a] via-[#12070a]/40 to-transparent" />
              </div>

              {/* Card Overlay Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 flex flex-col justify-end">
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#12070a]/80 border border-[#d4af37]/40 text-[11px] font-devanagari text-[#e2b866]">
                    {image.tag}
                  </span>
                  <div className="p-1.5 rounded-full bg-[#12070a]/60 text-[#faf5ee] opacity-0 group-hover:opacity-100 transition-opacity">
                    <ZoomIn className="w-4 h-4 text-[#e2b866]" />
                  </div>
                </div>

                <h3 className="font-devanagari text-lg sm:text-xl font-bold text-[#faf5ee]">
                  {image.title}
                </h3>
                <p className="font-devanagari text-xs sm:text-sm text-[#e6dcce]/90 mt-1 line-clamp-2">
                  {image.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Fullscreen Sacred Modal / Lightbox */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-[#0c0406]/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-6 animate-fadeIn">
          {/* Header Bar */}
          <div className="flex items-center justify-between max-w-5xl mx-auto w-full pb-3 border-b border-[#d4af37]/20">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-[#f39c12]" />
              <span className="font-devanagari text-sm font-semibold text-[#e2b866]">
                {selectedImage.tag}
              </span>
            </div>
            <button
              onClick={() => setSelectedImage(null)}
              className="p-2 rounded-full bg-[#2a1217] hover:bg-[#3d1a24] text-[#faf5ee] border border-[#d4af37]/40 cursor-pointer"
              aria-label="बंद करें"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Centered Image with Nav Chevrons */}
          <div className="relative flex items-center justify-center max-w-4xl mx-auto w-full my-auto py-2">
            <button
              onClick={handlePrev}
              className="absolute left-2 z-10 p-2.5 rounded-full bg-[#12070a]/80 text-[#faf5ee] hover:text-[#e2b866] border border-[#d4af37]/30 transition-all cursor-pointer"
              aria-label="पिछला चित्र"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <img
              src={selectedImage.url}
              alt={selectedImage.title}
              className="max-h-[60vh] sm:max-h-[68vh] w-auto object-contain rounded-2xl border border-[#d4af37]/30 shadow-2xl"
            />

            <button
              onClick={handleNext}
              className="absolute right-2 z-10 p-2.5 rounded-full bg-[#12070a]/80 text-[#faf5ee] hover:text-[#e2b866] border border-[#d4af37]/30 transition-all cursor-pointer"
              aria-label="अगला चित्र"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Caption & Offering Bar */}
          <div className="max-w-3xl mx-auto w-full bg-[#1f0d11]/90 border border-[#d4af37]/30 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <h3 className="font-devanagari text-lg sm:text-xl font-bold text-[#faf5ee]">
                {selectedImage.title}
              </h3>
              <p className="font-devanagari text-xs sm:text-sm text-[#e6dcce] mt-1">
                {selectedImage.description}
              </p>
            </div>

            <button
              onClick={onOfferFlower}
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#d4af37] to-[#f39c12] text-[#1a0c0e] font-devanagari font-bold text-xs sm:text-sm whitespace-nowrap shadow-md hover:brightness-110 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              <span>🌸 पुष्प अर्पित करें</span>
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
