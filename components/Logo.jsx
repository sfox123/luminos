'use client';

import { useId } from 'react';

// Vector version of the Luminos hexagon mark.
export function LogoMark({ size = 34, glow = true, className = '' }) {
  const id = useId().replace(/:/g, '');
  return (
    <svg className={`logomark ${className}`} width={size} height={size} viewBox="-108 -108 216 216" aria-hidden="true">
      <defs>
        <linearGradient id={`lg-${id}`} x1="0" y1="-1" x2="0" y2="1">
          <stop offset="0" stopColor="#3D63F0" />
          <stop offset="1" stopColor="#1A2F9E" />
        </linearGradient>
        <radialGradient id={`lc-${id}`}>
          <stop offset="0" stopColor="#3560F2" />
          <stop offset="1" stopColor="#1A2F9E" />
        </radialGradient>
        <filter id={`lf-${id}`} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <g fill="none" stroke={`url(#lg-${id})`} strokeWidth="9" strokeLinejoin="round" strokeLinecap="square">
        <path d="M0.0 -96.0 L83.1 -48.0 L83.1 48.0 L0.0 96.0 L-83.1 48.0 L-83.1 -48.0Z" strokeLinecap="butt" />
        <path d="M0.0 -70.0 L37.6 -48.3 M60.6 -8.4 L60.6 35.0 M60.6 35.0 L23.0 56.7 M-23.0 56.7 L-60.6 35.0 M-60.6 35.0 L-60.6 -8.4 M-37.6 -48.3 L-0.0 -70.0 M11.4 -37.4 L38.1 -22.0 M38.1 -22.0 L38.1 8.8 M26.7 28.6 L0.0 44.0 M0.0 44.0 L-26.7 28.6 M-38.1 8.8 L-38.1 -22.0 M-38.1 -22.0 L-11.4 -37.4 M83.1 -48.0 L60.6 -35.0 M0.0 96.0 L0.0 70.0 M-83.1 -48.0 L-60.6 -35.0 M60.6 35.0 L38.1 22.0 M-60.6 35.0 L-38.1 22.0 M37.6 -48.3 L30.1 -38.6 M23.0 56.7 L18.4 45.4 M-60.6 -8.4 L-48.5 -6.7" />
      </g>
      <path d="M0.0 -30.0 L26.0 -15.0 L26.0 15.0 L0.0 30.0 L-26.0 15.0 L-26.0 -15.0Z" fill={`url(#lc-${id})`} />
      <g filter={glow ? `url(#lf-${id})` : undefined} stroke="#6FE3FF" strokeWidth="3.4" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path className="logomark__beam" d="M0 -96 V -44" />
        <path className="logomark__beam logomark__beam--l" d="M-12 -22 V 10 L 0 18 L 14 10" />
      </g>
      <circle className="logomark__spark" cx="14" cy="10" r="4.5" fill="#fff" filter={glow ? `url(#lf-${id})` : undefined} />
    </svg>
  );
}

export default function Logo({ tagline = false }) {
  return (
    <a href="#top" className="logo" aria-label="Luminos home">
      <LogoMark />
      <span className="logo__text">
        <span className="logo__word">LUMINOS</span>
        {tagline && <span className="logo__tag">We illuminate the path from raw data to real results</span>}
      </span>
    </a>
  );
}
