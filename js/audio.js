/**
 * Cosmic Crew Hackathon - 8-Bit Web Audio Synthesizer
 * Generates dynamic retro sci-fi sounds directly via the Web Audio API
 */

class CosmicAudioEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.ambientNode = null;
    this.ambientGain = null;
    this.isAmbientPlaying = false;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stopAmbient();
    } else {
      this.init();
      this.startAmbient();
    }
    return this.isMuted;
  }

  // Quick 8-bit UI tap / hover blip
  playBlip(freq = 440, type = 'square', duration = 0.06) {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, this.ctx.currentTime + duration);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      console.warn("Audio error:", e);
    }
  }

  // Airlock opening and Hyperspace transition sound
  playAirlockEnter() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;

      // Heavy bass sub-drop
      const subOsc = this.ctx.createOscillator();
      const subGain = this.ctx.createGain();
      subOsc.type = 'sawtooth';
      subOsc.frequency.setValueAtTime(120, now);
      subOsc.frequency.exponentialRampToValueAtTime(30, now + 1.2);
      subGain.gain.setValueAtTime(0.2, now);
      subGain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

      subOsc.connect(subGain);
      subGain.connect(this.ctx.destination);
      subOsc.start(now);
      subOsc.stop(now + 1.2);

      // Noise burst for pneumatic steam / airlock release
      const bufferSize = this.ctx.sampleRate * 0.8;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = (Math.random() * 2 - 1) * 0.15;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1800, now);
      filter.frequency.exponentialRampToValueAtTime(200, now + 0.8);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.25, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

      whiteNoise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(this.ctx.destination);

      whiteNoise.start(now);
      whiteNoise.stop(now + 0.8);

      // Hyperspace chime arpeggio
      const notes = [220, 440, 660, 880, 1320, 1760];
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const g = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + 0.2 + idx * 0.08);
        g.gain.setValueAtTime(0.12, now + 0.2 + idx * 0.08);
        g.gain.exponentialRampToValueAtTime(0.001, now + 0.4 + idx * 0.08);

        osc.connect(g);
        g.connect(this.ctx.destination);
        osc.start(now + 0.2 + idx * 0.08);
        osc.stop(now + 0.5 + idx * 0.08);
      });
    } catch (e) {
      console.warn("Airlock audio error:", e);
    }
  }

  // Classic Among Us 2-Tone Emergency Meeting Siren
  playEmergencyAlarm() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      
      // High-low alarm pattern: 4 pulses
      const pulses = [
        { freq: 880, start: 0, dur: 0.18 },
        { freq: 659, start: 0.22, dur: 0.18 },
        { freq: 880, start: 0.44, dur: 0.18 },
        { freq: 659, start: 0.66, dur: 0.25 },
        { freq: 1046, start: 0.95, dur: 0.4 } // High dramatic hit
      ];

      pulses.forEach(p => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(p.freq, now + p.start);

        gain.gain.setValueAtTime(0.18, now + p.start);
        gain.gain.exponentialRampToValueAtTime(0.001, now + p.start + p.dur);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + p.start);
        osc.stop(now + p.start + p.dur);
      });
    } catch (e) {
      console.warn("Emergency audio error:", e);
    }
  }

  // Among Us Task Completed Jingle (Upbeat 3-note)
  playTaskCompleted() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.1);

        gain.gain.setValueAtTime(0.15, now + idx * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + 0.35);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * 0.1);
        osc.stop(now + idx * 0.1 + 0.35);
      });
    } catch (e) {
      console.warn("Task completed audio error:", e);
    }
  }

  // Electric contact sound for wiring task
  playWireConnect(success = true) {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = success ? 'triangle' : 'sawtooth';
      osc.frequency.setValueAtTime(success ? 880 : 150, now);
      if (success) {
        osc.frequency.exponentialRampToValueAtTime(1320, now + 0.12);
      }

      gain.gain.setValueAtTime(0.14, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.15);
    } catch (e) {
      console.warn("Wire audio error:", e);
    }
  }

  // Vault Unlock / Victory Fanfare
  playVictoryFanfare() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const chordNotes = [
        { f: 440, t: 0 },
        { f: 554.37, t: 0.1 },
        { f: 659.25, t: 0.2 },
        { f: 880, t: 0.3 },
        { f: 1108.73, t: 0.45 },
        { f: 1318.51, t: 0.6 }
      ];

      chordNotes.forEach(note => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(note.f, now + note.t);

        gain.gain.setValueAtTime(0.12, now + note.t);
        gain.gain.exponentialRampToValueAtTime(0.001, now + note.t + 0.5);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + note.t);
        osc.stop(now + note.t + 0.5);
      });
    } catch (e) {
      console.warn("Fanfare error:", e);
    }
  }

  // Low frequency atmospheric reactor hum
  startAmbient() {
    if (this.isMuted || this.isAmbientPlaying) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(55, this.ctx.currentTime); // Deep hum

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(110, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.015, this.ctx.currentTime); // Very subtle

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.ctx.destination);

      osc1.start();
      osc2.start();

      this.ambientNode = { osc1, osc2 };
      this.ambientGain = gain;
      this.isAmbientPlaying = true;
    } catch (e) {
      console.warn("Ambient hum error:", e);
    }
  }

  stopAmbient() {
    if (this.ambientNode) {
      try {
        this.ambientNode.osc1.stop();
        this.ambientNode.osc2.stop();
      } catch (e) {}
      this.ambientNode = null;
      this.isAmbientPlaying = false;
    }
  }
}

// Global instance
window.cosmicAudio = new CosmicAudioEngine();
