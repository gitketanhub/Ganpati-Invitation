/**
 * Sacred Audio Controller
 * Provides optional serene meditative temple resonance / ambient drone via Web Audio API.
 * Follows strict user consent guidelines (never autoplays with volume).
 */

class SacredAudioEngine {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.isPlaying = false;
    this.oscillators = [];
    this.bellTimer = null;
  }

  initContext() {
    if (this.ctx) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    
    this.ctx = new AudioContext();
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);
  }

  startDrone() {
    if (!this.ctx) this.initContext();
    if (!this.ctx) return;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    // Sacred Tanpura chord (D root: 146.83 Hz, A fifth: 220.00 Hz, D octave: 293.66 Hz)
    const freqs = [146.83, 220.00, 293.66, 440.00];

    this.oscillators = freqs.map((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      // Warm sine and subtle triangle combination
      osc.type = i % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      // Gentle LFO subtle chorusing / pulsation
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.frequency.setValueAtTime(0.2 + i * 0.05, this.ctx.currentTime);
      lfoGain.gain.setValueAtTime(1.5, this.ctx.currentTime);
      lfo.connect(osc.frequency);
      lfo.start();

      const individualVolume = i === 0 ? 0.25 : i === 1 ? 0.18 : 0.12;
      gain.gain.setValueAtTime(individualVolume, this.ctx.currentTime);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start();

      return { osc, gain, lfo };
    });

    // Schedule gentle sacred bell resonance every 14-20 seconds
    this.scheduleTempleBell();
  }

  scheduleTempleBell() {
    if (!this.isPlaying) return;
    this.playTempleChime();
    const nextInterval = 12000 + Math.random() * 8000;
    this.bellTimer = setTimeout(() => {
      if (this.isPlaying) {
        this.scheduleTempleBell();
      }
    }, nextInterval);
  }

  playTempleChime() {
    if (!this.ctx || !this.isPlaying) return;
    const now = this.ctx.currentTime;
    
    // High pure Tibetan / brass singing bowl harmonic chime (880Hz, 1320Hz, 1760Hz)
    const partials = [
      { f: 880, g: 0.08, d: 4.5 },
      { f: 1320, g: 0.04, d: 3.5 },
      { f: 2195, g: 0.02, d: 2.5 }
    ];

    partials.forEach(({ f, g, d }) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, now);
      
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(g, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + d);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + d + 0.1);
    });
  }

  toggle() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
    return this.isPlaying;
  }

  play() {
    this.initContext();
    if (!this.ctx) return;
    this.isPlaying = true;
    this.startDrone();

    // Smooth fade in
    const now = this.ctx.currentTime;
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
    this.masterGain.gain.linearRampToValueAtTime(0.22, now + 2.5);
  }

  pause() {
    if (!this.ctx || !this.isPlaying) return;
    this.isPlaying = false;
    clearTimeout(this.bellTimer);

    // Smooth fade out
    const now = this.ctx.currentTime;
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
    this.masterGain.gain.linearRampToValueAtTime(0.0001, now + 1.5);

    setTimeout(() => {
      if (!this.isPlaying && this.oscillators.length) {
        this.oscillators.forEach(o => {
          try {
            o.osc.stop();
            o.lfo.stop();
          } catch(e) {}
        });
        this.oscillators = [];
      }
    }, 1600);
  }
}

export function initAudio() {
  const audioBtn = document.getElementById('audio-toggle-btn');
  const audioLabel = document.getElementById('audio-toggle-label');
  if (!audioBtn) return;

  const audioEngine = new SacredAudioEngine();

  // Load preference
  const savedPref = localStorage.getItem('sacred_audio_enabled');
  if (savedPref === 'true') {
    // We don't auto-start on load to respect browser autoplay policy, but user can tap to resume
  }

  audioBtn.addEventListener('click', () => {
    const isPlaying = audioEngine.toggle();
    if (isPlaying) {
      audioBtn.classList.add('is-active');
      audioBtn.setAttribute('aria-pressed', 'true');
      if (audioLabel) audioLabel.textContent = 'ध्वनि चालू';
      localStorage.setItem('sacred_audio_enabled', 'true');
    } else {
      audioBtn.classList.remove('is-active');
      audioBtn.setAttribute('aria-pressed', 'false');
      if (audioLabel) audioLabel.textContent = '♪ पावन ध्वनि';
      localStorage.setItem('sacred_audio_enabled', 'false');
    }
  });
}
