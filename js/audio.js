/**
 * KidGenius Audio Manager
 * Web Audio API Sound Synthesizer & Music Engine
 * Zero external dependencies, ultra-crisp audio effects for kids!
 */

class SoundManager {
  constructor() {
    this.ctx = null;
    this.muted = false;
    this.musicEnabled = true;
    this.musicInterval = null;
    this.currentMusicIndex = 0;
    this.initialized = false;
  }

  init() {
    if (this.initialized && this.ctx) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
      this.initialized = true;
    } catch (e) {
      console.warn('Web Audio API not supported on this browser', e);
    }
  }

  resume() {
    this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleSound() {
    this.muted = !this.muted;
    return !this.muted;
  }

  toggleMusic() {
    this.musicEnabled = !this.musicEnabled;
    if (this.musicEnabled) {
      this.startAmbientMusic();
    } else {
      this.stopAmbientMusic();
    }
    return this.musicEnabled;
  }

  // --- Sound Effects Synthesizer ---

  playPop() {
    if (this.muted) return;
    this.resume();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(450, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.09);
  }

  playClick() {
    if (this.muted) return;
    this.resume();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(600, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.05);

    gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.06);
  }

  playSnap() {
    if (this.muted) return;
    this.resume();
    if (!this.ctx) return;

    // Pleasant high-pitch lock chime (two harmonic bells)
    const t = this.ctx.currentTime;
    [523.25, 659.25, 783.99].forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t + i * 0.04);

      gain.gain.setValueAtTime(0.25, t + i * 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, t + i * 0.04 + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t + i * 0.04);
      osc.stop(t + i * 0.04 + 0.26);
    });
  }

  playStar() {
    if (this.muted) return;
    this.resume();
    if (!this.ctx) return;

    const notes = [587.33, 739.99, 880.00, 1174.66]; // D5, F#5, A5, D6
    const t = this.ctx.currentTime;

    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, t + idx * 0.07);

      gain.gain.setValueAtTime(0.3, t + idx * 0.07);
      gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.07 + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t + idx * 0.07);
      osc.stop(t + idx * 0.07 + 0.36);
    });
  }

  playWrong() {
    if (this.muted) return;
    this.resume();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(260, t);
    osc.frequency.linearRampToValueAtTime(180, t + 0.25);

    gain.gain.setValueAtTime(0.2, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.25);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.26);
  }

  playVictory() {
    if (this.muted) return;
    this.resume();
    if (!this.ctx) return;

    // Celebratory victory fanfare
    const fanfare = [
      { note: 523.25, time: 0, dur: 0.12 },    // C5
      { note: 523.25, time: 0.14, dur: 0.12 }, // C5
      { note: 523.25, time: 0.28, dur: 0.12 }, // C5
      { note: 659.25, time: 0.42, dur: 0.35 }, // E5
      { note: 587.33, time: 0.80, dur: 0.12 }, // D5
      { note: 659.25, time: 0.94, dur: 0.12 }, // E5
      { note: 783.99, time: 1.10, dur: 0.60 }  // G5
    ];

    const t = this.ctx.currentTime;
    fanfare.forEach(item => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(item.note, t + item.time);

      gain.gain.setValueAtTime(0.35, t + item.time);
      gain.gain.exponentialRampToValueAtTime(0.001, t + item.time + item.dur);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t + item.time);
      osc.stop(t + item.time + item.dur + 0.05);
    });
  }

  // --- KidGenius Ambient Melody Generator ---
  startAmbientMusic() {
    if (this.musicInterval) return;
    if (!this.musicEnabled) return;

    const melodyNotes = [
      392.00, 440.00, 523.25, 659.25, 587.33, 523.25, 440.00, 392.00,
      523.25, 659.25, 783.99, 659.25, 587.33, 523.25, 440.00, 523.25
    ];

    this.musicInterval = setInterval(() => {
      if (this.muted || !this.musicEnabled) return;
      this.resume();
      if (!this.ctx) return;

      const freq = melodyNotes[this.currentMusicIndex % melodyNotes.length];
      this.currentMusicIndex++;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.045, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.65);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.7);
    }, 700);
  }

  stopAmbientMusic() {
    if (this.musicInterval) {
      clearInterval(this.musicInterval);
      this.musicInterval = null;
    }
  }

  // Voice greeting using SpeechSynthesis
  speak(text) {
    if (this.muted) return;
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-ES';
      utterance.rate = 1.05;
      utterance.pitch = 1.25; // Friendly upbeat kid voice
      window.speechSynthesis.speak(utterance);
    }
  }
}

export const sounds = new SoundManager();
