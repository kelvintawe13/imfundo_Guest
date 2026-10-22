import { useId } from 'react';

export function Logo({ compactOnMobile = false }: { compactOnMobile?: boolean }) {
  const uid = useId().replace(/:/g, '');
  return (
    <span className="flex items-center gap-2">
      <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden="true">
        <defs>
          <linearGradient id={`lg-bg-${uid}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#6366F1" />
            <stop offset="1" stopColor="#7C3AED" />
          </linearGradient>
          <linearGradient id={`lg-gloss-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0.45" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
          <linearGradient id={`lg-glyph-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="1" stopColor="#E0E7FF" />
          </linearGradient>
        </defs>
        <rect width="28" height="28" rx="8" fill={`url(#lg-bg-${uid})`} />
        <rect width="28" height="28" rx="8" fill={`url(#lg-gloss-${uid})`} />
        <rect x="0.75" y="0.75" width="26.5" height="26.5" rx="7.25" fill="none" stroke="#ffffff" strokeOpacity="0.28" strokeWidth="1.5" />
        <path
          d="M7 19.5V9.5l7 4 7-4v10"
          fill="none"
          stroke={`url(#lg-glyph-${uid})`}
          strokeWidth="2.1"
          strokeLinecap="round"
          strokeLinejoin="round" />
        <circle cx="21" cy="19.5" r="2.25" fill="#34D399" />
        <circle cx="21" cy="19.5" r="4" fill="#34D399" opacity="0.25" />
      </svg>
      <span className={`${compactOnMobile ? 'hidden sm:inline' : ''} text-[15px] font-semibold tracking-tight text-slate-50`}>
        Imfundo <span className="text-slate-400">Quest</span>
      </span>
    </span>);

}
