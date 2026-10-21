import React, { useId } from 'react';

export function OfflineSyncIllustration() {
  const uid = useId().replace(/:/g, '');
  const syncPath = 'M190 150 C 280 150, 300 96, 380 112 S 470 150, 498 140';
  return (
    <svg
      viewBox="0 0 640 220"
      className="h-auto w-full"
      role="img"
      aria-label="A school hotspot sends lessons once to a phone, which then works offline while the cloud is unavailable">

      <defs>
        <linearGradient id={`os-ground-${uid}`} x1="0" x2="1">
          <stop offset="0" stopColor="currentColor" stopOpacity="0" />
          <stop offset="0.15" stopColor="currentColor" stopOpacity="1" />
          <stop offset="0.85" stopColor="currentColor" stopOpacity="1" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`os-school-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1E293B" />
          <stop offset="1" stopColor="#0F172A" />
        </linearGradient>
        <linearGradient id={`os-roof-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#334155" />
          <stop offset="1" stopColor="#1E293B" />
        </linearGradient>
        <linearGradient id={`os-door-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#818CF8" />
          <stop offset="1" stopColor="#4F46E5" />
        </linearGradient>
        <linearGradient id={`os-pennant-${uid}`} x1="0" x2="1">
          <stop offset="0" stopColor="#34D399" />
          <stop offset="1" stopColor="#10B981" />
        </linearGradient>
        <linearGradient id={`os-sync-${uid}`} x1="0" x2="1">
          <stop offset="0" stopColor="#6366F1" />
          <stop offset="0.5" stopColor="#8B5CF6" />
          <stop offset="1" stopColor="#10B981" />
        </linearGradient>
        <linearGradient id={`os-phone-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2a3650" />
          <stop offset="0.35" stopColor="#0F172A" />
          <stop offset="1" stopColor="#1E293B" />
        </linearGradient>
        <linearGradient id={`os-cta-${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#818CF8" />
          <stop offset="1" stopColor="#4F46E5" />
        </linearGradient>
        <linearGradient id={`os-badge-${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#34D399" />
          <stop offset="1" stopColor="#059669" />
        </linearGradient>
        <linearGradient id={`os-gloss-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.35" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <filter id={`os-ds-${uid}`} x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#0F172A" floodOpacity="0.4" />
        </filter>
      </defs>

      {/* ambient scene intro */}
      <rect x="20" y="189" width="600" height="2" className="text-slate-800" fill={`url(#os-ground-${uid})`} />

      {/* School hotspot */}
      <g strokeWidth="2" strokeLinejoin="round">
        <ellipse cx="115" cy="42" rx="26" ry="9" fill="#10B981" opacity="0.14" style={{ filter: 'blur(9px)' }} />
        <rect x="50" y="100" width="130" height="90" rx="10" className="stroke-slate-700" fill={`url(#os-school-${uid})`} filter={`url(#os-ds-${uid})`} />
        <path d="M40 106 L115 58 L190 106 Z" className="stroke-slate-700" fill={`url(#os-roof-${uid})`} />
        <rect x="66" y="120" width="22" height="16" rx="3" className="fill-slate-800 stroke-slate-700" />
        <rect x="70" y="124" width="14" height="8" rx="1.5" fill="#818CF8" opacity="0.45" />
        <rect x="142" y="120" width="22" height="16" rx="3" className="fill-slate-800 stroke-slate-700" />
        <rect x="146" y="124" width="14" height="8" rx="1.5" fill="#818CF8" opacity="0.45" />
        <ellipse cx="115" cy="168" rx="22" ry="16" fill="#6366F1" opacity="0.22" style={{ filter: 'blur(8px)' }} />
        <rect x="101" y="142" width="28" height="48" rx="4" className="stroke-primary" fill={`url(#os-door-${uid})`} />
        <rect x="103.5" y="144.5" width="23" height="43" rx="2.5" fill={`url(#os-gloss-${uid})`} opacity="0.3" />
        <line x1="115" y1="58" x2="115" y2="26" className="stroke-slate-500" strokeLinecap="round" />
        <path d="M115 26 h24 l-6 7 l6 7 h-24 z" className="stroke-success" fill={`url(#os-pennant-${uid})`} />
        <g fill="none" strokeLinecap="round">
          <path d="M172 66 a14 14 0 0 1 14 -14" stroke="#34D399" strokeWidth="2.2">
            <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
          </path>
          <path d="M172 76 a24 24 0 0 1 24 -24" stroke="#34D399" strokeWidth="2.2" opacity="0.55">
            <animate attributeName="opacity" values="0.2;0.7;0.2" dur="2s" begin="0.4s" repeatCount="indefinite" />
          </path>
          <path d="M172 86 a34 34 0 0 1 34 -34" stroke="#34D399" strokeWidth="2" opacity="0.2">
            <animate attributeName="opacity" values="0.1;0.4;0.1" dur="2s" begin="0.8s" repeatCount="indefinite" />
          </path>
        </g>
      </g>

      {/* One-time sync path */}
      <path
        d={syncPath}
        stroke={`url(#os-sync-${uid})`}
        strokeDasharray="3 9"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.9">
        <animate attributeName="stroke-dashoffset" from="0" to="-24" dur="1.6s" repeatCount="indefinite" />
      </path>

      {[
        [252, 140, '#10B981'],
        [338, 104, '#818CF8'],
        [438, 134, '#10B981'],
      ].map(([cx, cy, color], i) =>
      <g key={i}>
          <circle cx={cx} cy={cy} r="11" fill={color as string} opacity="0.16" style={{ filter: 'blur(2px)' }} />
          <circle cx={cx} cy={cy} r="4.5" fill={color as string} />
        </g>
      )}

      {/* traveling packet */}
      <circle r="3" fill="#10B981">
        <circle cx="0" cy="0" r="6" fill="#10B981" opacity="0.25" style={{ filter: 'blur(3px)' }} />
        <animateMotion dur="4s" repeatCount="indefinite" path={syncPath} />
      </circle>

      {/* Cloud unavailable */}
      <g transform="translate(296 14)" strokeWidth="2" strokeLinejoin="round">
        <ellipse cx="44" cy="30" rx="30" ry="14" fill="#64748B" opacity="0.1" style={{ filter: 'blur(10px)' }} />
        <path
          d="M18 44 h52 a14 14 0 0 0 0 -28 a20 20 0 0 0 -38 -4 a14 14 0 0 0 -14 32 z"
          className="stroke-slate-600"
          fill={`url(#os-school-${uid})`} />
        <path d="M18 20 q6 -7 14 -6" stroke="#94A3B8" strokeOpacity="0.35" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <g strokeLinecap="round">
          <line x1="14" y1="6" x2="76" y2="52" className="stroke-danger" strokeWidth="3.5" filter={`url(#os-ds-${uid})`} />
        </g>
      </g>

      {/* Phone running offline */}
      <g strokeWidth="2">
        <ellipse cx="544" cy="196" rx="44" ry="8" fill="#0F172A" opacity="0.3" style={{ filter: 'blur(6px)' }} />
        <rect x="498" y="40" width="92" height="150" rx="18" className="stroke-slate-600" fill={`url(#os-phone-${uid})`} filter={`url(#os-ds-${uid})`} />
        <rect x="501" y="43.5" width="86" height="143" rx="15.5" fill={`url(#os-gloss-${uid})`} opacity="0.14" />
        <rect x="506" y="52" width="76" height="126" rx="10" fill="#0F172A" />
        <rect x="536" y="44.5" width="16" height="3" rx="1.5" fill="#475569" />

        {/* status bar */}
        <rect x="516" y="64" width="56" height="5" rx="2.5" className="fill-slate-800" />
        <rect x="516" y="64" width="36" height="5" rx="2.5" fill="#10B981" />

        {/* downloaded lesson row */}
        <rect x="516" y="78" width="56" height="16" rx="4" fill="#10B981" opacity="0.08" />
        <rect x="516" y="78" width="56" height="16" rx="4" className="stroke-success" fill="none" strokeWidth="1.5" />
        <path d="M521 86 l2.6 2.6 l5 -5.5" fill="none" stroke="#34D399" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="531" y="84" width="24" height="4" rx="2" fill="#34D399" opacity="0.7" />

        {/* pending rows */}
        <rect x="516" y="100" width="56" height="16" rx="4" className="stroke-slate-700" fill="none" strokeWidth="1.5" />
        <rect x="521" y="106" width="24" height="4" rx="2" className="fill-slate-800" />
        <rect x="516" y="122" width="56" height="16" rx="4" className="stroke-slate-700" fill="none" strokeWidth="1.5" />
        <rect x="521" y="128" width="24" height="4" rx="2" className="fill-slate-800" />

        {/* CTA */}
        <ellipse cx="544" cy="158" rx="30" ry="9" fill="#6366F1" opacity="0.3" style={{ filter: 'blur(7px)' }} />
        <rect x="516" y="150" width="56" height="16" rx="5" fill={`url(#os-cta-${uid})`} />
        <rect x="517.5" y="151.5" width="53" height="7" rx="3.5" fill={`url(#os-gloss-${uid})`} opacity="0.4" />

        {/* check badge */}
        <circle cx="590" cy="44" r="16" fill="#10B981" opacity="0.22" style={{ filter: 'blur(5px)' }} />
        <circle cx="590" cy="44" r="14" fill={`url(#os-badge-${uid})`} stroke="rgb(var(--canvas))" strokeWidth="3" />
        <path d="M583 44 l5 5 l9 -10" fill="none" stroke="white" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>);

}
