'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { projects } from '@/data/content.js';

const host = (url) => new URL(url).hostname.replace(/^www\./, '');
const pad = (n) => String(n).padStart(2, '0');

// Decorative cover artwork, drawn in each project's accent colour.
function Art({ kind }) {
  const common = { viewBox: '0 0 200 200', fill: 'none', stroke: 'currentColor', strokeWidth: 1.4, 'aria-hidden': true, className: 'pcard__art' };
  if (kind === 'waves')
    return (
      <svg {...common}>
        {[40, 62, 84, 106, 128, 150, 172].map((y, i) => (
          <path key={y} d={`M-10 ${y} Q 40 ${y - 14 - i * 2} 95 ${y} T 210 ${y}`} opacity={1 - i * 0.1} />
        ))}
        <circle cx="150" cy="40" r="16" />
      </svg>
    );
  if (kind === 'peaks')
    return (
      <svg {...common}>
        <circle cx="146" cy="58" r="24" />
        <circle cx="146" cy="58" r="36" opacity=".4" />
        <path d="M0 190 L52 108 L86 150 L132 82 L200 176" />
        <path d="M0 200 L40 160 L78 186 L120 140 L170 182 L200 168" opacity=".55" />
        <path d="M118 102 L132 82 L146 104" opacity=".7" />
      </svg>
    );
  if (kind === 'skyline')
    return (
      <svg {...common}>
        <path d="M10 200 V120 H40 V200 M40 200 V80 H70 V200 M70 200 V140 H96 V200 M96 200 V60 H126 V200 M126 200 V110 H150 V200 M150 200 V90 H182 V200" />
        <path d="M30 40 H190 M60 40 V200 M60 40 L30 64 M60 40 L90 60 M170 40 V70" opacity=".6" />
        <path d="M104 74 H118 M104 92 H118 M104 110 H118 M48 96 H62 M48 114 H62" opacity=".5" />
      </svg>
    );
  if (kind === 'frame')
    return (
      <svg {...common}>
        {[40, 90, 140, 190].map((x) => <path key={x} d={`M${x} 30 V200`} />)}
        {[60, 110, 160].map((y) => <path key={y} d={`M20 ${y} H210`} strokeWidth="3" />)}
        <path d="M40 60 L90 110 M90 60 L40 110 M140 110 L190 160 M190 110 L140 160" opacity=".45" />
      </svg>
    );
  // blueprint
  return (
    <svg {...common}>
      {Array.from({ length: 11 }, (_, i) => (
        <path key={`v${i}`} d={`M${i * 20} 0 V200 M0 ${i * 20} H200`} opacity=".22" />
      ))}
      <path d="M30 170 L100 50 L170 170 Z" strokeWidth="2.2" />
      <path d="M65 110 H135 M100 50 V170" />
      <circle cx="100" cy="50" r="6" />
    </svg>
  );
}

export default function Projects() {
  const track = useRef(null);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(null);

  const step = () => {
    const el = track.current;
    const card = el?.querySelector('.pcard');
    if (!card) return 0;
    return card.offsetWidth + parseFloat(getComputedStyle(el).columnGap || 0);
  };

  const onScroll = () => {
    const el = track.current;
    const s = step();
    if (!el || !s) return;
    const atEnd = el.scrollLeft >= el.scrollWidth - el.clientWidth - 4;
    setIndex(atEnd ? projects.length - 1 : Math.round(el.scrollLeft / s));
  };

  const goTo = (i) => {
    const n = Math.max(0, Math.min(projects.length - 1, i));
    track.current?.scrollTo({ left: n * step(), behavior: 'smooth' });
  };

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setFlipped(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <section className="section projects" id="projects">
      <div className="container">
        <div className="projects__head">
          <div>
            <h2 className="section__title">Projects we have delivered</h2>
            <p className="section__lead">
              Websites and platforms for public bodies and businesses in Sri Lanka and the UK.
              Pick a card to see the project.
            </p>
          </div>
          <div className="projects__nav">
            <span className="projects__count" aria-live="polite">
              <strong>{pad(index + 1)}</strong> / {pad(projects.length)}
            </span>
            <button className="projects__arrow" onClick={() => goTo(index - 1)} disabled={index === 0} aria-label="Previous project">←</button>
            <button className="projects__arrow" onClick={() => goTo(index + 1)} disabled={index === projects.length - 1} aria-label="Next project">→</button>
          </div>
        </div>
      </div>

      <ul className="projects__track" ref={track} onScroll={onScroll} aria-label="Projects">
        {projects.map((p, i) => {
          const open = flipped === p.id;
          return (
            <li key={p.id} className={`pcard ${open ? 'is-flipped' : ''}`} style={{ '--bg': p.bg, '--ac': p.accent }}>
              <div className="pcard__inner">
                <button
                  className="pcard__face pcard__front"
                  onClick={() => setFlipped(p.id)}
                  aria-expanded={open}
                  aria-label={`${p.name}: show project details`}
                  inert={open}
                >
                  <Art kind={p.art} />
                  <span className="pcard__top">
                    <span className="pcard__num">{pad(i + 1)}</span>
                    <span className="pcard__meta">{p.sector} · {p.country}</span>
                  </span>
                  <span className="pcard__name">{p.name}</span>
                  <span className="pcard__client">{p.client}</span>
                  <span className="pcard__tags">
                    {p.tags.map((t) => <span key={t}>{t}</span>)}
                  </span>
                  <span className="pcard__hint">View project <span className="pcard__plus" aria-hidden="true">+</span></span>
                </button>

                <div className="pcard__face pcard__back" inert={!open} aria-hidden={!open}>
                  <div className="pcard__browser">
                    <div className="pcard__bar" aria-hidden="true">
                      <span className="pcard__dots"><i /><i /><i /></span>
                      <span className="pcard__url">{host(p.url)}</span>
                    </div>
                    <div className="pcard__shot">
                      <Image src={p.shot} alt={`Home page of ${p.name}`} placeholder="blur" sizes="380px" />
                    </div>
                  </div>
                  <div className="pcard__info">
                    <p className="pcard__meta pcard__meta--dark">{p.sector} · {p.country}</p>
                    <h3>{p.name}</h3>
                    <p className="pcard__desc">{p.summary}</p>
                    <div className="pcard__actions">
                      <a className="pcard__visit" href={p.url} target="_blank" rel="noopener">
                        Visit {host(p.url)} <span aria-hidden="true">↗</span>
                      </a>
                      <button className="pcard__close" onClick={() => setFlipped(null)} aria-label={`Close ${p.name} details`}>↺</button>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="projects__dots" role="group" aria-label="Choose project">
        {projects.map((p, i) => (
          <button key={p.id} aria-label={`Go to ${p.name}`} aria-current={i === index} onClick={() => goTo(i)} />
        ))}
      </div>
    </section>
  );
}
