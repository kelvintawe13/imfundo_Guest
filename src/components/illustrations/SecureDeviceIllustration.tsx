import { useId } from 'react';

export function SecureDeviceIllustration() {
  const uid = useId().replace(/:/g, '');
  return (
    <svg viewBox="0 0 360 300" className="h-auto w-full max-w-sm" role="img" aria-label="A phone protected by a shield, surrounded by learning progress, badges and offline lessons">
      <defs>
        <linearGradient id={`sd-amber-${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F59E0B" />
          <stop offset="1" stopColor="#FBBF24" />
        </linearGradient>
        <linearGradient id={`sd-phone-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2a3650" />
          <stop offset="0.35" stopColor="#0F172A" />
          <stop offset="1" stopColor="#1E293B" />
        </linearGradient>
        <linearGradient id={`sd-shield-${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#818CF8" />
          <stop offset="1" stopColor="#4F46E5" />
        </linearGradient>
        <linearGradient id={`sd-gloss-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.4" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`sd-body-${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#34D399" />
          <stop offset="1" stopColor="#059669" />
        </linearGradient>
        <filter id={`sd-ds-${uid}`} x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow dx="0" dy="5" stdDeviation="6" floodColor="#0F172A" floodOpacity="0.42" />
        </filter>
      </defs>

      {/* ambient halo */}
      <ellipse cx="180" cy="150" rx="150" ry="140" fill="#6366F1" opacity="0.1" style={{ filter: 'blur(38px)' }} />

      {/* orbits */}
      <circle cx="180" cy="150" r="128" className="stroke-slate-800" strokeWidth="1.5" fill="none" />
      <circle cx="180" cy="150" r="128" fill="none" stroke="#818CF8" strokeWidth="1.5" opacity="0.35" strokeLinecap="round" strokeDasharray="70 735">
        <animateTransform attributeName="transform" type="rotate" from="0 180 150" to="360 180 150" dur="26s" repeatCount="indefinite" />
      </circle>
      <circle cx="180" cy="150" r="92" className="stroke-slate-800" strokeWidth="1.5" strokeDasharray="3 7" fill="none" />

      {/* Phone */}
      <g strokeWidth="2">
        <rect x="132" y="70" width="96" height="164" rx="20" className="stroke-slate-600" fill={`url(#sd-phone-${uid})`} filter={`url(#sd-ds-${uid})`} />
        <rect x="135" y="73.5" width="90" height="157" rx="17" fill={`url(#sd-gloss-${uid})`} opacity="0.14" />
        <rect x="140" y="82" width="80" height="140" rx="11" fill="#0F172A" />
        <rect x="164" y="76" width="32" height="5" rx="2.5" fill="#475569" />
        {/* screen texture */}
        <rect x="150" y="104" width="60" height="5" rx="2.5" fill="#334155" />
        <rect x="150" y="104" width="34" height="5" rx="2.5" fill="#10B981" />
        <rect x="150" y="116" width="60" height="34" rx="6" fill="#6366F1" opacity="0.1" />
        <rect x="150" y="158" width="60" height="5" rx="2.5" fill="#334155" opacity="0.7" />
        <rect x="150" y="168" width="42" height="5" rx="2.5" fill="#334155" opacity="0.5" />
      </g>

      {/* Shield glow + shield + lock */}
      <path
        d="M180 108 l34 12.5 v25 c0 24 -14.5 39 -34 47 c-19.5 -8 -34 -23 -34 -47 v-25 z"
        fill="#6366F1"
        opacity="0.25"
        style={{ filter: 'blur(10px)' }} />
      <path
        d="M180 112 l30 11 v22 c0 21 -13 34 -30 41 c-17 -7 -30 -20 -30 -41 v-22 z"
        fill={`url(#sd-shield-${uid})`}
        stroke="#A5B4FC"
        strokeWidth="1.5"
        strokeLinejoin="round"
        filter={`url(#sd-ds-${uid})`} />
      <path
        d="M180 112 l30 11 v22 c0 5.5 -1 10.5 -3 15 l-54 0 c-2 -4.5 -3 -9.5 -3 -15 v-22 z"
        fill={`url(#sd-gloss-${uid})`}
        opacity="0.35" />
      <rect x="168" y="146" width="24" height="19" rx="4.5" fill="#C7D2FE" />
      <path d="M173 146 v-6 a7 7 0 0 1 14 0 v6" fill="none" stroke="#C7D2FE" strokeWidth="2.6" strokeLinecap="round" />
      <circle cx="180" cy="155" r="2.5" fill="#4338CA" />
      <rect x="179" y="155.5" width="2" height="4.5" rx="1" fill="#4338CA" />

      {/* Orbit nodes */}
      <g strokeWidth="2">
        <ellipse cx="72" cy="104" rx="24" ry="22" fill="#10B981" opacity="0.14" style={{ filter: 'blur(9px)' }} />
        <circle cx="72" cy="104" r="20" className="stroke-slate-700" fill="#0F172A" filter={`url(#sd-ds-${uid})`} />
        <path d="M63 104 l6 6 l12 -12" fill="none" stroke="#34D399" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />

        <ellipse cx="292" cy="96" rx="24" ry="22" fill="#F59E0B" opacity="0.14" style={{ filter: 'blur(9px)' }} />
        <circle cx="292" cy="96" r="20" className="stroke-slate-700" fill="#0F172A" filter={`url(#sd-ds-${uid})`} />
        <path
          d="M292 85 l3.2 7 l7.6 .4 l-5.9 4.8 l2 7.4 l-6.9 -4.2 l-6.9 4.2 l2 -7.4 l-5.9 -4.8 l7.6 -.4 z"
          fill={`url(#sd-amber-${uid})`}
          stroke="#FCD34D"
          strokeWidth="1.4"
          strokeLinejoin="round" />

        <ellipse cx="300" cy="214" rx="24" ry="22" fill="#6366F1" opacity="0.16" style={{ filter: 'blur(9px)' }} />
        <circle cx="300" cy="214" r="20" className="stroke-slate-700" fill="#0F172A" filter={`url(#sd-ds-${uid})`} />
        <path d="M290 214 h20 M300 204 v20" stroke="#A5B4FC" strokeWidth="2.4" strokeLinecap="round" />

        <ellipse cx="62" cy="208" rx="24" ry="22" fill="#10B981" opacity="0.12" style={{ filter: 'blur(9px)' }} />
        <circle cx="62" cy="208" r="20" className="stroke-slate-700" fill="#0F172A" filter={`url(#sd-ds-${uid})`} />
        <path
          d="M52 202 c4 -2 7 -2 10 1 v14 c-3 -3 -6 -3 -10 -1 z M72 202 c-4 -2 -7 -2 -10 1 v14 c3 -3 6 -3 10 -1 z"
          stroke="#34D399"
          fill="none"
          strokeLinejoin="round"
          strokeWidth="1.8" />
      </g>
    </svg>);

}
