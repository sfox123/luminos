'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import oni from '@/data/oni.json';
import shotOverview from '@/assets/enso-overview.webp';
import shotCompare from '@/assets/enso-compare.webp';
import shotEpisodes from '@/assets/enso-episodes.webp';

const ENSO_URL = process.env.NEXT_PUBLIC_ENSO_URL || '/enso';
const last = oni.rows.at(-1);
const lastLabel = `${oni.seasons[last[1]]} ${last[0]}`;

const shots = [
  { src: shotOverview, alt: 'El Niño Monitor overview with the Oceanic Niño Index since 1950', caption: 'Overview: 75 years of the Oceanic Niño Index' },
  { src: shotCompare, alt: 'Chart comparing this year with past strong El Niño years', caption: 'This year against 1982, 1997, 2015 and 2023' },
  { src: shotEpisodes, alt: 'Table of El Niño episodes ranked by strength with a season-by-season grid', caption: 'Every episode ranked, plus a season-by-season grid' },
];

export default function EnsoFeature({ onTryIt }) {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);

  useEffect(() => {
    if (!zoom) return;
    const onKey = (e) => e.key === 'Escape' && setZoom(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [zoom]);

  return (
    <section className="section feature" id="el-nino">
      <div className="container feature__grid">
        <div>
          <h2 className="section__title">Featured project: El Niño Monitor</h2>
          <p className="section__lead">
            An interactive climate dashboard built on NOAA's Oceanic Niño Index. It tracks how warm the tropical Pacific
            is today, compares this year with the strongest El Niño years on record, and ranks every episode since 1950.
          </p>
          <div className="feature__facts">
            <div style={{ '--c': '#E0352B' }}><strong>{last[3] > 0 ? '+' : ''}{last[3].toFixed(2)} °C</strong><span>Latest ONI, {lastLabel}</span></div>
            <div style={{ '--c': '#F2A33A' }}><strong>{oni.rows.length}</strong><span>Seasons of real data</span></div>
            <div style={{ '--c': '#1F5FC7' }}><strong>1950–{last[0]}</strong><span>NOAA source data</span></div>
          </div>
          <div className="feature__actions">
            <a className="btn btn--warm" href={ENSO_URL} target="_blank" rel="noopener">Open the full dashboard</a>
            <button className="btn btn--ghost" onClick={onTryIt}>Try it on this page</button>
          </div>
        </div>

        <div className="shots">
          <button className="shots__main" onClick={() => setZoom(true)} aria-label={`Enlarge: ${shots[active].caption}`} style={{ padding: 0, cursor: 'zoom-in' }}>
            <Image src={shots[active].src} alt={shots[active].alt} key={active} style={{ animation: 'fade .3s', width: '100%', height: 'auto' }} priority={active === 0} />
          </button>
          <p className="shots__cap">{shots[active].caption}</p>
          <div className="shots__thumbs">
            {shots.map((s, i) => (
              <button key={s.caption} aria-pressed={i === active} aria-label={s.caption} onClick={() => setActive(i)}>
                <Image src={s.src} alt="" sizes="200px" style={{ width: '100%', height: 'auto' }} />
              </button>
            ))}
          </div>
        </div>
      </div>

      {zoom && (
        <div className="lightbox" onClick={() => setZoom(false)} role="dialog" aria-label={shots[active].caption}>
          <Image src={shots[active].src} alt={shots[active].alt} sizes="1200px" style={{ maxWidth: 'min(1200px, 100%)', height: 'auto' }} />
          <button onClick={() => setZoom(false)}>Close</button>
        </div>
      )}
    </section>
  );
}
