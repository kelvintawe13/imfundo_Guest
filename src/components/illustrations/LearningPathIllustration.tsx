import React, { useId } from 'react';

const nodes = [
{ x: 30, y: 90, state: 'done' },
{ x: 100, y: 50, state: 'done' },
{ x: 175, y: 82, state: 'done' },
{ x: 250, y: 40, state: 'current' },
{ x: 325, y: 76, state: 'locked' }] as
const;

export function LearningPathIllustration() {
  const uid = useId().replace(/:/g, '');
  const trail = 'M30 90 C 60 90, 70 50, 100 50 S 145 82, 175 82 S 220 40, 250 40 S 300 76, 325 76 S 360 40, 372 40';
  return (
    <svg viewBox="0 0 400 120" className="h-auto w-full" role="img" aria-label="A learning quest path with three completed levels, one in progress and a reward ahead">
      <defs>
        <linearGradient id={`lp-trail-${uid}`} x1="0" x2="1">
          <stop offset="0" stopColor="#10B981" />
          <stop offset="0.62" stopColor="#10B981" />
          <stop offset="0.78" stopColor="#818CF8" />
          <stop offset="1" stopColor="#64748B" />
        </linearGradient>
        <linearGradient id={`lp-node-${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#34D399" />
          <stop offset="1" stopColor="#059669" />
        </linearGradient>
        <linearGradient id={`lp-current-${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#818CF8" />
          <stop offset="1" stopColor="#4F46E5" />
        </linearGradient>
        <linearGradient id={`lp-star-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FBBF24" />
          <stop offset="1" stopColor="#F59E0B" />
        </linearGradient>
        <linearGradient id={`lp-gloss-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.45" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* glow underlay then gradient trail */}
      <path
        d={trail}
        fill="none"
        stroke="#10B981"
        strokeWidth="6"
        strokeLinecap="round"
        opacity="0.1"
        style={{ filter: 'blur(7px)' }} />
      <path
        d={trail}
        stroke={`url(#lp-trail-${uid})`}
        strokeWidth="3"
        strokeDasharray="2 7"
        strokeLinecap="round"
        fill="none" />

      {nodes.map((n, i) =>
      <g key={i}>
          {n.state === 'current' &&
        <circle cx={n.x} cy={n.y} r="20" fill="#6366F1" opacity="0.25" style={{ filter: 'blur(9px)' }} />}
          <ellipse cx={n.x} cy={n.y + 15} rx="11" ry="3.5" fill="#0F172A" opacity="0.25" style={{ filter: 'blur(3px)' }} />
          <circle
          cx={n.x}
          cy={n.y}
          r="12"
          fill={
          n.state === 'done' ?
          `url(#lp-node-${uid})` :
          n.state === 'current' ?
          `url(#lp-current-${uid})` :
          '#1E293B'
          }
          className={n.state === 'done' ? '' : n.state === 'current' ? '' : 'stroke-slate-700'}
          stroke={n.state === 'locked' ? 'rgb(var(--slate-700))' : undefined}
          strokeWidth="2" />

          {n.state !== 'locked' &&
        <path
          d={`M${n.x - 12} ${n.y - 12} a12 12 0 0 1 24 0 z`}
          fill={`url(#lp-gloss-${uid})`}
          opacity={n.state === 'done' ? 0.55 : 0.45} />}
          {n.state === 'done' &&
        <path d={`M${n.x - 5} ${n.y} l3.5 3.5 l6.5 -7`} fill="none" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        }
          {n.state === 'current' &&
        <g>
            <circle cx={n.x} cy={n.y} r="4.2" fill="white" />
            <circle cx={n.x} cy={n.y} r="12" fill="none" stroke="#818CF8" strokeWidth="1.8" strokeLinecap="round" strokeDasharray="50 26">
              <animateTransform attributeName="transform" type="rotate" from={`0 ${n.x} ${n.y}`} to={`360 ${n.x} ${n.y}`} dur="9s" repeatCount="indefinite" />
            </circle>
          </g>}
          {n.state === 'locked' &&
        <g stroke="rgb(var(--slate-500))" strokeWidth="1.8" fill="none">
            <rect x={n.x - 4.5} y={n.y - 1} width="9" height="7" rx="1.8" />
            <path d={`M${n.x - 2.5} ${n.y - 1} v-2.5 a2.5 2.5 0 0 1 5 0 v2.5`} />
          </g>
        }
        </g>
      )}

      {/* reward star */}
      <g transform="translate(372 40)">
        <g className="fill-warn/40 stroke-warn" strokeWidth="1.8" strokeLinejoin="round">
          <animateTransform attributeName="transform" type="rotate" values="-8 0 -2; 8 0 -2; -8 0 -2" dur="5s" repeatCount="indefinite" />
          <path
            d="M0 -14 L4 -4.5 L14 -4.3 L6.2 2 L9 12 L0 6.2 L-9 12 L-6.2 2 L-14 -4.3 L-4 -4.5 Z"
            fill={`url(#lp-star-${uid})`}
            stroke="#FCD34D" />
          <path d="M0 -13.5 A 13.5 13.5 0 0 1 13 -3 z" fill={`url(#lp-gloss-${uid})`} stroke="none" opacity="0.5" />
        </g>
        <path d="M16 -14 l6 -4 M15 -20 l3 -5" stroke="#FCD34D" strokeWidth="1.6" strokeLinecap="round" opacity="0.7" />
      </g>
    </svg>);

}
