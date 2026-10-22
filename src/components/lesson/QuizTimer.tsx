import { TimerIcon, Volume2Icon, VolumeXIcon } from 'lucide-react';

type QuizTimerProps = {
  secondsLeft: number;
  totalSeconds: number;
  soundOn: boolean;
  onToggleSound: () => void;
};

function formatTime(seconds: number) {
  return `0:${String(Math.max(0, seconds)).padStart(2, '0')}`;
}

export function QuizTimer({ secondsLeft, totalSeconds, soundOn, onToggleSound }: QuizTimerProps) {
  const urgent = secondsLeft <= 10;
  const critical = secondsLeft <= 5;
  const pct = Math.max(0, Math.min(1, secondsLeft / totalSeconds));
  const circumference = 2 * Math.PI * 15;

  return (
    <button
      type="button"
      onClick={onToggleSound}
      aria-pressed={soundOn}
      aria-live="off"
      aria-label={soundOn ? 'Timer sound on. Click to mute.' : 'Timer sound off. Click to enable.'}
      title={soundOn ? 'Timer sound on · click to mute' : 'Timer sound off · click to enable'}
      className={`timer-glow inline-flex shrink-0 items-center gap-2 rounded-full border-2 border-ink bg-danger px-2.5 py-1.5 text-left text-white transition-transform duration-150 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-canvas ${
        urgent ? 'timer-urgent' : ''
      } ${critical ? 'timer-critical' : ''}`}>
      <span className="relative grid h-10 w-10 shrink-0 place-items-center">
        <svg viewBox="0 0 36 36" className="absolute inset-0 h-full w-full -rotate-90" aria-hidden="true">
          <circle cx="18" cy="18" r="15" fill="none" strokeWidth="3" className="stroke-white/25" />
          <circle
            cx="18"
            cy="18"
            r="15"
            fill="none"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - pct)}
            className="stroke-white"
            style={{ transition: 'stroke-dashoffset 0.9s linear' }} />
        </svg>
        <TimerIcon className="h-4 w-4" aria-hidden="true" />
      </span>
      <span className="leading-none">
        <span className="block text-[9px] font-bold uppercase tracking-[0.14em] text-white/75">Time left</span>
        <span className="mt-0.5 block font-display text-xl font-extrabold tabular-nums">{formatTime(secondsLeft)}</span>
      </span>
      {soundOn ? (
        <Volume2Icon className="h-3.5 w-3.5 shrink-0 text-white/80" aria-hidden="true" />
      ) : (
        <VolumeXIcon className="h-3.5 w-3.5 shrink-0 text-white/60" aria-hidden="true" />
      )}
    </button>
  );
}

export const QUIZ_TIME_LIMIT = 30;
