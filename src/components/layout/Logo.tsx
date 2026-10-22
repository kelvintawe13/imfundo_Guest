import { useId } from 'react';

type LogoProps = {
  compactOnMobile?: boolean;
  /** `default` follows the app theme, `ink` is for the bright public header, `light` for dark panels. */
  tone?: 'default' | 'ink' | 'light';
};

const textTone = {
  default: { brand: 'text-slate-50', accent: 'text-slate-400' },
  ink: { brand: 'text-ink', accent: 'text-coral' },
  light: { brand: 'text-white', accent: 'text-sun' },
} as const;

export function Logo({ compactOnMobile = false, tone = 'default' }: LogoProps) {
  const uid = useId().replace(/:/g, '');
  const colors = textTone[tone];

  return (
    <span className="flex items-center gap-2">
      <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden="true">
        <defs>
          <linearGradient id={`lg-gloss-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0.5" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect width="28" height="28" rx="8" fill="#FFC93C" />
        <rect width="28" height="28" rx="8" fill={`url(#lg-gloss-${uid})`} />
        <rect
          x="0.75"
          y="0.75"
          width="26.5"
          height="26.5"
          rx="7.25"
          fill="none"
          stroke="#1B1F4B"
          strokeWidth="1.5"
        />
        <path
          d="M7 19.5V9.5l7 4 7-4v10"
          fill="none"
          stroke="#1B1F4B"
          strokeWidth="2.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="21" cy="19.5" r="2.25" fill="#FF7675" />
      </svg>
      <span
        className={`${compactOnMobile ? 'hidden sm:inline' : ''} font-display text-[15px] font-extrabold tracking-tight ${colors.brand}`}
      >
        Imfundo <span className={colors.accent}>Quest</span>
      </span>
    </span>
  );
}
