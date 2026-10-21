import { useId } from 'react';

const TOTAL = 50; // each cell = 2% of households
const CONNECTED = 5; // ~10% fixed / in-home internet
const PHONES = 48; // ~96% own a mobile phone

export function ConnectivityGrid() {
  const uid = useId().replace(/:/g, '');
  const cells = Array.from({ length: TOTAL }, (_, i) => i);
  // spread the few connected homes so they read as scattered, not clustered
  const connectedSet = new Set([7, 18, 26, 33, 44]);

  return (
    <figure className="mt-8">
      <svg
        viewBox="0 0 300 130"
        className="h-auto w-full max-w-md"
        role="img"
        aria-label={`Of 50 households, about ${CONNECTED} have in-home internet while ${PHONES} own a mobile phone`}>

        <defs>
          <linearGradient id={`cg-home-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#4338CA" />
            <stop offset="1" stopColor="#6366F1" />
          </linearGradient>
          <linearGradient id={`cg-outline-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#1E293B" />
            <stop offset="1" stopColor="#293548" />
          </linearGradient>
        </defs>

        {cells.map((i) => {
          const col = i % 10;
          const row = Math.floor(i / 10);
          const x = col * 30 + 2;
          const y = row * 26 + 2;
          const connected = connectedSet.has(i);
          const hasPhone = i < PHONES || connected;
          return (
            <g key={i}>
              {connected && <circle cx={x + 12} cy={y + 12} r="16" fill="#6366F1" opacity="0.2" style={{ filter: 'blur(7px)' }} />}
              <path
                d={`M${x} ${y + 9} L${x + 12} ${y} L${x + 24} ${y + 9} V${y + 21} a2 2 0 0 1 -2 2 H${x + 2} a2 2 0 0 1 -2 -2 Z`}
                className={
                  connected ?
                  'stroke-primary' :
                  'stroke-slate-700'
                }
                strokeWidth="1.5"
                strokeLinejoin="round"
                fill={connected ? `url(#cg-home-${uid})` : `url(#cg-outline-${uid})`} />

              {!connected && <rect x={x + 7} y={y + 12} width="10" height="8" rx="1.5" fill="#334155" opacity="0.9" />}
              {connected && <path d={`M${x + 6} ${y + 4} L${x + 12} ${y + 1.5} L${x + 18} ${y + 4}`} stroke="#C7D2FE" strokeWidth="1.2" fill="none" strokeLinecap="round" />}
              {hasPhone && !connected &&
              <g>
                  <circle cx={x + 12} cy={y + 15} r="5" fill="#10B981" opacity="0.14" style={{ filter: 'blur(2px)' }} />
                  <circle cx={x + 12} cy={y + 15} r="2.6" fill="#10B981" />
                </g>}
              {connected && <circle cx={x + 12} cy={y + 15.5} r="2.8" fill="#A5F3FC" />}
            </g>);

        })}
      </svg>
      <figcaption className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-slate-400">
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm border border-primary bg-primary/25" /> In-home internet
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-success" /> Owns a mobile phone
        </span>
        <span>Each home ≈ 2% of households</span>
      </figcaption>
    </figure>);

}
