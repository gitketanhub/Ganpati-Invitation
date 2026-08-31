/**
 * Sacred Audio Engine using Web Audio API
 * Generates meditative Tanpura drone, pure Temple Bell (घंटी) chimes, and Singing Bowl vibrations.
 * Requires zero external audio downloads and works reliably offline and mobile.
 */

class SacredAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private masterGain: GainNode | null = null;
  private droneOscillators: OscillatorNode[] = [];
  private droneGain: GainNode | null = null;
  private lfoOsc: OscillatorNode | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtxClass();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.28, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  /**
   * Start Ambient Sacred Drone (Tanpura meditative frequency: D3 root + A3 fifth + D4 octave)
   */
  public startAmbient() {
    this.initContext();
    if (!this.ctx || !this.masterGain || this.isPlaying) return;

    try {
      this.isPlaying = true;
      const now = this.ctx.currentTime;

      this.droneGain = this.ctx.createGain();
      this.droneGain.gain.setValueAtTime(0.001, now);
      this.droneGain.gain.exponentialRampToValueAtTime(0.18, now + 3);
      this.droneGain.connect(this.masterGain);

      // Tanpura frequencies (D2 ~ 73.42Hz, D3 ~ 146.83Hz, A3 ~ 220Hz, D4 ~ 293.66Hz)
      const frequencies = [73.42, 146.83, 220.0, 293.66, 440.0];

      frequencies.forEach((freq, idx) => {
        if (!this.ctx || !this.droneGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, now);

        // Micro-detune for warm acoustic shimmer
        osc.detune.setValueAtTime((idx - 2) * 4, now);

        const individualGain = 0.08 / (idx + 1);
        gain.gain.setValueAtTime(individualGain, now);

        osc.connect(gain);
        gain.connect(this.droneGain);
        osc.start(now);
        this.droneOscillators.push(osc);
      });

      // Subtle breath LFO
      this.lfoOsc = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      this.lfoOsc.frequency.setValueAtTime(0.12, now); // 8-second slow cycle
      lfoGain.gain.setValueAtTime(0.03, now);

      this.lfoOsc.connect(lfoGain);
      if (this.droneGain) {
        lfoGain.connect(this.droneGain.gain);
      }
      this.lfoOsc.start(now);
    } catch (e) {
      console.warn('Audio init warning:', e);
    }
  }

  /**
   * Stop Ambient Sacred Drone gracefully
   */
  public stopAmbient() {
    if (!this.isPlaying || !this.ctx || !this.droneGain) return;

    const now = this.ctx.currentTime;
    this.droneGain.gain.setValueAtTime(this.droneGain.gain.value, now);
    this.droneGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.5);

    setTimeout(() => {
      this.droneOscillators.forEach(osc => {
        try {
          osc.stop();
          osc.disconnect();
        } catch {
          // ignore
        }
      });
      this.droneOscillators = [];

      if (this.lfoOsc) {
        try {
          this.lfoOsc.stop();
          this.lfoOsc.disconnect();
        } catch {
          // ignore
        }
        this.lfoOsc = null;
      }
      this.isPlaying = false;
    }, 1600);
  }

  public toggleAmbient(): boolean {
    if (this.isPlaying) {
      this.stopAmbient();
      return false;
    } else {
      this.startAmbient();
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  /**
   * Play an authentic Indian Temple Bell (घंटी) chime
   */
  public playTempleBell(pitchMultiplier = 1.0) {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    try {
      const now = this.ctx.currentTime;
      // Fundamental frequencies of Indian brass bell (harmonic overtones)
      const baseFreq = 587.33 * pitchMultiplier; // D5
      const overtones = [1.0, 1.98, 2.76, 3.84, 5.4];
      const decays = [2.2, 1.8, 1.4, 0.9, 0.5];
      const gains = [0.15, 0.09, 0.05, 0.03, 0.02];

      const bellMaster = this.ctx.createGain();
      bellMaster.gain.setValueAtTime(0.35, now);
      bellMaster.connect(this.masterGain);

      overtones.forEach((ratio, i) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gainNode = this.ctx.createGain();

        osc.type = i === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(baseFreq * ratio, now);

        gainNode.gain.setValueAtTime(gains[i], now);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + decays[i]);

        osc.connect(gainNode);
        gainNode.connect(bellMaster);

        osc.start(now);
        osc.stop(now + decays[i] + 0.1);
      });
    } catch (e) {
      console.warn('Bell chime error:', e);
    }
  }

  /**
   * Play Gentle Flower Shower (पुष्प वर्षा) soft rustle chime
   */
  public playFlowerChime() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    try {
      const now = this.ctx.currentTime;
      const notes = [587.33, 659.25, 739.99, 880.0, 1046.5]; // D E F# A C
      const randomNote = notes[Math.floor(Math.random() * notes.length)];

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(randomNote, now);
      osc.frequency.exponentialRampToValueAtTime(randomNote * 1.5, now + 0.35);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.6);
    } catch {
      // ignore
    }
  }

  /**
   * Play Brass Singing Bowl (आरती दीप) vibration
   */
  public playSingingBowl() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    try {
      const now = this.ctx.currentTime;
      const baseFreq = 293.66; // D4

      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(baseFreq, now);

      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(baseFreq * 2.76, now); // overtone

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.2);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.masterGain);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 3.3);
      osc2.stop(now + 3.3);
    } catch {
      // ignore
    }
  }
}

export const sacredAudio = new SacredAudioEngine();
