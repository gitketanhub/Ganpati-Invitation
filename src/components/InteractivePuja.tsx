import React, { useEffect, useRef } from 'react';
import { sacredAudio } from '../utils/audio';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  color: string;
  type: 'marigold' | 'rose' | 'sparkle';
  opacity: number;
}

interface InteractivePujaProps {
  flowerCount: number;
  diyaCount: number;
  isDiyaLit: boolean;
  onOfferFlower: () => void;
  onLightDiya: () => void;
  onRingBell: () => void;
}

export const InteractivePuja: React.FC<InteractivePujaProps> = ({
  flowerCount,
  diyaCount,
  isDiyaLit,
  onOfferFlower,
  onLightDiya,
  onRingBell,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number | null>(null);

  // Spawn flower petals when flower count increases
  useEffect(() => {
    if (flowerCount > 0) {
      spawnPetals(25);
    }
  }, [flowerCount]);

  const spawnPetals = (count: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const marigoldColors = ['#f39c12', '#e67e22', '#f1c40f', '#d35400', '#ffb142'];
    const roseColors = ['#e84393', '#d63031', '#ff7675', '#c0392b'];

    for (let i = 0; i < count; i++) {
      const isRose = Math.random() > 0.6;
      particlesRef.current.push({
        x: Math.random() * canvas.width,
        y: -20 - Math.random() * 80,
        size: 8 + Math.random() * 14,
        speedY: 2 + Math.random() * 3.5,
        speedX: (Math.random() - 0.5) * 2,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 4,
        color: isRose
          ? roseColors[Math.floor(Math.random() * roseColors.length)]
          : marigoldColors[Math.floor(Math.random() * marigoldColors.length)],
        type: isRose ? 'rose' : 'marigold',
        opacity: 0.95,
      });
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.y += p.speedY;
        p.x += Math.sin(p.y * 0.02) + p.speedX;
        p.rotation += p.rotationSpeed;

        if (p.y > canvas.height - 40) {
          p.opacity -= 0.02;
        }

        if (p.opacity <= 0 || p.y > canvas.height + 20) {
          particlesRef.current.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;

        // Draw soft petal shape
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size, p.size * 0.6, 0, 0, Math.PI * 2);
        ctx.fill();

        // Inner shadow/gradient accent
        ctx.fillStyle = 'rgba(0,0,0,0.15)';
        ctx.beginPath();
        ctx.arc(0, 0, p.size * 0.3, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <>
      {/* Fullscreen Falling Petals Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-30"
        aria-hidden="true"
      />

      {/* Floating Puja Control Pod on Mobile / Desktop */}
      <div className="w-full max-w-xl mx-auto px-4 mt-6">
        <div className="bg-[#241014]/80 backdrop-blur-xl border border-[#d4af37]/30 rounded-2xl p-4 sm:p-5 shadow-2xl relative overflow-hidden">
          {/* Subtle diya aura glow */}
          <div
            className={`absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full bg-[#f39c12]/20 blur-3xl pointer-events-none transition-opacity duration-700 ${
              isDiyaLit ? 'opacity-100' : 'opacity-40'
            }`}
          />

          <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#d4af37]/20 text-xs sm:text-sm font-devanagari text-[#e2b866]">
            <span className="flex items-center gap-1.5 font-medium">
              <span>🪔</span>
              <span>डिजिटल पूजा व दर्शन भाव</span>
            </span>
            <div className="flex items-center gap-3 text-xs text-[#faf5ee]/80 font-devanagari">
              <span>{flowerCount} पुष्प</span>
              <span>•</span>
              <span>{diyaCount} दीप</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2.5 sm:gap-3 mt-3.5">
            {/* Offer Flower Button */}
            <button
              onClick={() => {
                onOfferFlower();
                sacredAudio.playFlowerChime();
              }}
              className="flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-xl bg-[#2e151b] hover:bg-[#3d1a24] border border-[#f39c12]/30 active:scale-95 transition-all text-center group cursor-pointer"
              aria-label="पुष्प अर्पित करें"
            >
              <span className="text-xl sm:text-2xl group-hover:scale-110 transition-transform mb-1">
                🌸
              </span>
              <span className="font-devanagari text-xs sm:text-sm font-medium text-[#faf5ee]">
                पुष्प अर्पण
              </span>
              <span className="text-[10px] text-[#f39c12] mt-0.5">पुष्प वर्षा</span>
            </button>

            {/* Light Diya Button */}
            <button
              onClick={() => {
                onLightDiya();
                sacredAudio.playSingingBowl();
              }}
              className={`flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-xl border active:scale-95 transition-all text-center group cursor-pointer ${
                isDiyaLit
                  ? 'bg-[#3e1b12] border-[#f39c12] shadow-[0_0_15px_rgba(243,156,18,0.3)]'
                  : 'bg-[#2e151b] hover:bg-[#3d1a24] border-[#d4af37]/30'
              }`}
              aria-label="दीप प्रज्वलित करें"
            >
              <span
                className={`text-xl sm:text-2xl mb-1 transition-transform group-hover:scale-110 ${
                  isDiyaLit ? 'animate-pulse' : ''
                }`}
              >
                🪔
              </span>
              <span className="font-devanagari text-xs sm:text-sm font-medium text-[#faf5ee]">
                {isDiyaLit ? 'दीप प्रज्वलित' : 'दीप जलाएं'}
              </span>
              <span className="text-[10px] text-[#e2b866] mt-0.5">महाआरती दीप</span>
            </button>

            {/* Ring Bell Button */}
            <button
              onClick={() => {
                onRingBell();
                sacredAudio.playTempleBell();
              }}
              className="flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-xl bg-[#2e151b] hover:bg-[#3d1a24] border border-[#d4af37]/30 active:scale-95 transition-all text-center group cursor-pointer"
              aria-label="मंदिर की घंटी बजाएं"
            >
              <span className="text-xl sm:text-2xl group-hover:rotate-12 transition-transform mb-1">
                🔔
              </span>
              <span className="font-devanagari text-xs sm:text-sm font-medium text-[#faf5ee]">
                घंटी नाद
              </span>
              <span className="text-[10px] text-[#e2b866] mt-0.5">शुभ ध्वनि</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
