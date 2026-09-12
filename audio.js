/**
 * SENTINEL AI — Emergency Audio Siren & Alarm Engine
 * Generates operational emergency audio alarms using the browser Web Audio API.
 * No external mp3/wav files required. Zero latency.
 */

class SentinelAudioAlarm {
  constructor() {
    this.ctx = null;
    this.osc1 = null;
    this.osc2 = null;
    this.gainNode = null;
    this.isPlaying = false;
    this.sweepTimer = null;
    this.pulseTimer = null;
    this.isMuted = false;
  }

  ensureContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playAlarm(type = 'post_disaster') {
    this.stopAlarm();
    this.ensureContext();
    this.isPlaying = true;

    this.gainNode = this.ctx.createGain();
    this.gainNode.gain.setValueAtTime(this.isMuted ? 0 : 0.25, this.ctx.currentTime);
    this.gainNode.connect(this.ctx.destination);

    if (type === 'pre_disaster') {
      this.startPreDisasterPulse();
    } else {
      this.startPostDisasterWail();
    }
  }

  startPreDisasterPulse() {
    // Intermittent urgent dual-tone beeps (800Hz and 1000Hz)
    let toggle = false;
    const playBeep = () => {
      if (!this.isPlaying) return;
      const osc = this.ctx.createOscillator();
      osc.type = 'square';
      osc.frequency.setValueAtTime(toggle ? 960 : 800, this.ctx.currentTime);
      toggle = !toggle;

      const beepGain = this.ctx.createGain();
      beepGain.gain.setValueAtTime(this.isMuted ? 0 : 0.2, this.ctx.currentTime);
      beepGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.28);

      osc.connect(beepGain);
      beepGain.connect(this.gainNode);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.3);
    };

    playBeep();
    this.pulseTimer = setInterval(playBeep, 450);
  }

  startPostDisasterWail() {
    // Continuous tactical emergency wail (sweeps between 650Hz and 1050Hz)
    this.osc1 = this.ctx.createOscillator();
    this.osc1.type = 'sawtooth';
    this.osc1.frequency.setValueAtTime(650, this.ctx.currentTime);

    this.osc2 = this.ctx.createOscillator();
    this.osc2.type = 'triangle';
    this.osc2.frequency.setValueAtTime(654, this.ctx.currentTime); // Slight detune for urgency

    // Low-pass filter to make it sound like a real industrial civil defense siren
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, this.ctx.currentTime);

    this.osc1.connect(filter);
    this.osc2.connect(filter);
    filter.connect(this.gainNode);

    this.osc1.start();
    this.osc2.start();

    // Cyclic frequency sweep
    let ascending = true;
    const sweep = () => {
      if (!this.isPlaying || !this.osc1) return;
      const now = this.ctx.currentTime;
      const targetFreq = ascending ? 1050 : 650;
      this.osc1.frequency.exponentialRampToValueAtTime(targetFreq, now + 1.2);
      this.osc2.frequency.exponentialRampToValueAtTime(targetFreq + 4, now + 1.2);
      ascending = !ascending;
    };

    sweep();
    this.sweepTimer = setInterval(sweep, 1250);
  }

  stopAlarm() {
    this.isPlaying = false;
    if (this.sweepTimer) {
      clearInterval(this.sweepTimer);
      this.sweepTimer = null;
    }
    if (this.pulseTimer) {
      clearInterval(this.pulseTimer);
      this.pulseTimer = null;
    }

    if (this.osc1) {
      try { this.osc1.stop(); this.osc1.disconnect(); } catch (e) {}
      this.osc1 = null;
    }
    if (this.osc2) {
      try { this.osc2.stop(); this.osc2.disconnect(); } catch (e) {}
      this.osc2 = null;
    }
    if (this.gainNode) {
      try { this.gainNode.disconnect(); } catch (e) {}
      this.gainNode = null;
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.gainNode && this.ctx) {
      this.gainNode.gain.setValueAtTime(this.isMuted ? 0 : 0.25, this.ctx.currentTime);
    }
    return this.isMuted;
  }
}

window.sentinelAudio = new SentinelAudioAlarm();
