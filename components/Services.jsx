'use client';

import { useRef, useState } from 'react';
import { services, mailto } from '@/data/content.js';
import Picture from './Picture.jsx';
import { ServiceScene } from './Illustrations.jsx';

export default function Services() {
  const [active, setActive] = useState(0);
  const tabs = useRef([]);
  const s = services[active];

  const onKey = (e) => {
    const n = services.length;
    let next = null;
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = (active + 1) % n;
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = (active - 1 + n) % n;
    if (next !== null) {
      e.preventDefault();
      setActive(next);
      tabs.current[next]?.focus();
    }
  };

  return (
    <section className="section services" id="services">
      <div className="container">
        <div className="section__head">
          <h2 className="section__title">Five disciplines, one connected stack</h2>
          <p className="section__lead">
            Each service stands on its own, but they work best together: clean pipelines feed
            reliable analysis, which feeds dashboards, models and AI you can trust.
          </p>
        </div>

        <div className="explorer" style={{ '--accent': s.color }}>
          <div className="explorer__tabs" role="tablist" aria-label="Services" aria-orientation="vertical" onKeyDown={onKey}>
            {services.map((svc, i) => (
              <button
                key={svc.id}
                ref={(el) => (tabs.current[i] = el)}
                role="tab"
                id={`tab-${svc.id}`}
                aria-selected={i === active}
                aria-controls={`panel-${svc.id}`}
                tabIndex={i === active ? 0 : -1}
                className="explorer__tab"
                style={{ '--c': svc.color }}
                onClick={() => setActive(i)}
              >
                <span className="swatch" />
                <span className="explorer__name">{svc.name}</span>
              </button>
            ))}
          </div>

          <div
            className="explorer__panel"
            role="tabpanel"
            id={`panel-${s.id}`}
            aria-labelledby={`tab-${s.id}`}
            key={s.id}
          >
            <Picture className="explorer__pic" src={s.photo} alt={s.photoAlt}>
              <ServiceScene id={s.id} />
            </Picture>
            <h3>{s.headline}</h3>
            <p className="explorer__summary">{s.summary}</p>
            <div className="explorer__cols">
              <div>
                <h4>What you get</h4>
                <ul className="checks">
                  {s.deliverables.map((d) => <li key={d}>{d}</li>)}
                </ul>
              </div>
              <div>
                <h4>Tools we use</h4>
                <ul className="chips">
                  {s.tools.map((t) => <li key={t}>{t}</li>)}
                </ul>
              </div>
            </div>
            <a href={mailto(`Enquiry: ${s.name}`)} className="btn btn--accent">Talk about {s.name.toLowerCase()}</a>
          </div>
        </div>
      </div>
    </section>
  );
}
