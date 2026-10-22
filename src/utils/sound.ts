type AudioContextConstructor = typeof AudioContext;

let audioContext: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (audioContext) return audioContext;
  const AudioCtor: AudioContextConstructor | undefined =
    window.AudioContext ??
    (window as unknown as { webkitAudioContext?: AudioContextConstructor }).webkitAudioContext;
  if (!AudioCtor) return null;
  try {
    audioContext = new AudioCtor();
    return audioContext;
  } catch (error) {
    console.warn('Unable to start audio for quiz sounds.', error);
    return null;
  }
}

export function unlockAudio() {
  const context = getAudioContext();
  if (!context) return;
  if (context.state === 'suspended') void context.resume();
}

async function resumeAudio(): Promise<AudioContext | null> {
  const context = getAudioContext();
  if (!context) return null;
  if (context.state === 'suspended') {
    try {
      await context.resume();
    } catch (error) {
      console.warn('Unable to resume audio for quiz sounds.', error);
      return null;
    }
  }
  return context;
}

type ToneOptions = {
  duration?: number;
  delay?: number;
  volume?: number;
  type?: OscillatorType;
};

function playTone(frequency: number, { duration = 0.08, delay = 0, volume = 0.05, type = 'sine' }: ToneOptions = {}) {
  const context = getAudioContext();
  if (!context) return;
  if (context.state === 'suspended') void context.resume();

  const start = context.currentTime + delay;
  const end = start + duration;
  const oscillator = context.createOscillator();
  const gain = context.createGain();

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, start);
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(volume, start + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.0001, end);

  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start(start);
  oscillator.stop(end + 0.02);
}

export function playTimerTick() {
  playTone(1180, { duration: 0.05, volume: 0.11, type: 'triangle' });
}

export function playTimerWarning() {
  playTone(760, { duration: 0.11, volume: 0.15, type: 'square' });
  playTone(980, { duration: 0.13, delay: 0.13, volume: 0.15, type: 'square' });
}

export function playTimerTimeout() {
  playTone(240, { duration: 0.2, volume: 0.16, type: 'sawtooth' });
  playTone(170, { duration: 0.28, delay: 0.22, volume: 0.16, type: 'sawtooth' });
}

export function playAnswerSound(correct: boolean) {
  if (correct) {
    playTone(660, { duration: 0.08, volume: 0.12, type: 'triangle' });
    playTone(990, { duration: 0.12, delay: 0.09, volume: 0.12, type: 'triangle' });
    return;
  }
  playTone(300, { duration: 0.1, volume: 0.12, type: 'sine' });
  playTone(210, { duration: 0.16, delay: 0.1, volume: 0.12, type: 'sine' });
}

export async function playQuizStart() {
  const context = await resumeAudio();
  if (!context) return;
  playTone(520, { duration: 0.11, volume: 0.25, type: 'triangle' });
  playTone(780, { duration: 0.15, delay: 0.12, volume: 0.28, type: 'triangle' });
  playTone(1040, { duration: 0.22, delay: 0.28, volume: 0.22, type: 'sine' });
}

export async function playSoundCheck() {
  const context = await resumeAudio();
  if (!context) return;
  playTone(880, { duration: 0.09, volume: 0.2, type: 'triangle' });
  playTone(1180, { duration: 0.12, delay: 0.1, volume: 0.18, type: 'sine' });
}
