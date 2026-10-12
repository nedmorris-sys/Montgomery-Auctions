// Web Audio API synthesized auction sound effects
class AuctionSoundManager {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playGavel() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      
      // Impact knock 1
      const osc1 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();
      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(140, t);
      osc1.frequency.exponentialRampToValueAtTime(30, t + 0.12);
      gain1.gain.setValueAtTime(0.8, t);
      gain1.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
      osc1.connect(gain1);
      gain1.connect(this.ctx.destination);
      osc1.start(t);
      osc1.stop(t + 0.15);

      // Wood table resonance
      const oscWood = this.ctx.createOscillator();
      const gainWood = this.ctx.createGain();
      oscWood.type = 'sine';
      oscWood.frequency.setValueAtTime(220, t);
      oscWood.frequency.exponentialRampToValueAtTime(60, t + 0.25);
      gainWood.gain.setValueAtTime(0.4, t);
      gainWood.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
      oscWood.connect(gainWood);
      gainWood.connect(this.ctx.destination);
      oscWood.start(t);
      oscWood.stop(t + 0.3);

      // Secondary knock (double tap)
      const t2 = t + 0.16;
      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(160, t2);
      osc2.frequency.exponentialRampToValueAtTime(35, t2 + 0.15);
      gain2.gain.setValueAtTime(0.9, t2);
      gain2.gain.exponentialRampToValueAtTime(0.001, t2 + 0.2);
      osc2.connect(gain2);
      gain2.connect(this.ctx.destination);
      osc2.start(t2);
      osc2.stop(t2 + 0.2);
    } catch (e) {
      console.warn("Audio error", e);
    }
  }

  playBidBeep() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, t); // D5
      osc.frequency.setValueAtTime(880, t + 0.08); // A5
      gain.gain.setValueAtTime(0.3, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.25);
    } catch (e) {
      console.warn("Audio error", e);
    }
  }

  playWarningChime() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, t); // A4
      osc.frequency.exponentialRampToValueAtTime(330, t + 0.4); // E4
      gain.gain.setValueAtTime(0.35, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.45);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.45);
    } catch (e) {
      console.warn("Audio error", e);
    }
  }
}

export const auctionAudio = new AuctionSoundManager();
