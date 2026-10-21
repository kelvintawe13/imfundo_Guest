import React, { useId } from 'react';

type GridPatternProps = {className?: string;size?: number;};

export function GridPattern({ className = 'text-slate-800/70', size = 40 }: GridPatternProps) {
  const uid = useId().replace(/:/g, '');
  const patternId = `gp-${uid}`;
  return (
    <svg className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} aria-hidden="true">
      <defs>
        <pattern id={patternId} width={size} height={size} patternUnits="userSpaceOnUse">
          <path d={`M${size} 0H0V${size}`} fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx={size} cy={size} r="1.1" fill="currentColor" opacity="0.55" />
        </pattern>
        <radialGradient id={`${patternId}-fade`} cx="50%" cy="42%" r="75%">
          <stop offset="0.3" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <mask id={`${patternId}-mask`}>
          <rect width="100%" height="100%" fill={`url(#${patternId}-fade)`} />
        </mask>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} mask={`url(#${patternId}-mask)`} />
    </svg>);

}
