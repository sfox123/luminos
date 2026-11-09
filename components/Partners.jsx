'use client';

import { useMemo, useState } from 'react';
import { partners } from '@/data/content.js';
import { districts, MAP_W, MAP_H } from '@/data/sriLankaMap.js';
import Picture from './Picture.jsx';
import { FieldSurvey, TeamReview } from './Illustrations.jsx';

// Deterministic sample values so the demo looks the same on every visit.
function seeded(str, salt) {
  let h = 2166136261 ^ salt;
  for (const c of str) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  return ((h >>> 0) % 1000) / 1000;
}

const metrics = {
  completeness: {
    label: 'Data completeness',
    fmt: (v) => `${v}%`,
    value: (d) => Math.round(72 + seeded(d, 1) * 27),
    min: 72, max: 99,
  },
  surveys: {
    label: 'Field surveys synced',
    fmt: (v) => v.toLocaleString(),
    value: (d) => Math.round(400 + seeded(d, 2) * 3600),
    min: 400, max: 4000,
  },
  freshness: {
    label: 'Hours since last sync',
    fmt: (v) => `${v} h`,
    value: (d) => Math.round(1 + seeded(d, 3) * 47),
    min: 1, max: 48, invert: true,
  },
};

const ramp = ['#EEF2FF', '#C9D4FF', '#94A8FA', '#5B77EE', '#1F3FD8'];

export default function Partners() {
  const [pid, setPid] = useState(partners[1].id);
  const [metric, setMetric] = useState('completeness');
  const [selected, setSelected] = useState('Colombo');
  const [hovered, setHovered] = useState(null);
  const p = partners.find((x) => x.id === pid);
  const m = metrics[metric];

  const values = useMemo(() => {
    const out = {};
    districts.forEach((d) => (out[d.name] = m.value(d.name)));
    return out;
  }, [metric]);

  const colorFor = (val) => {
    let t = (val - m.min) / (m.max - m.min);
    if (m.invert) t = 1 - t;
    return ramp[Math.min(4, Math.max(0, Math.floor(t * 5)))];
  };

  const focus = hovered || selected;
  const ranked = Object.entries(values).sort((a, b) => (m.invert ? a[1] - b[1] : b[1] - a[1]));
  const rank = ranked.findIndex(([n]) => n === focus) + 1;

  return (
    <section className="section partners" id="partners">
      <div className="container">
        <div className="partners__head">
          <div>
            <h2 className="section__title">Working with the United Nations in Sri Lanka</h2>
            <p className="section__lead">
              We partner with UN Sri Lanka and WFP Sri Lanka on the data systems behind their
              programme reporting.
            </p>
          </div>
          <div className="partners__switch" role="tablist" aria-label="Partners">
            {partners.map((x) => (
              <button
                key={x.id}
                role="tab"
                aria-selected={x.id === pid}
                style={{ '--c': x.color }}
                onClick={() => setPid(x.id)}
              >
                <span className="wordmark">{x.short}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="partners__grid">
          <article className="partner" key={p.id} style={{ '--c': p.color }}>
            <Picture className="partner__pic" src={p.photo} alt={p.photoAlt}>
              {p.id === 'wfp' ? <FieldSurvey /> : <TeamReview />}
            </Picture>
            <h3>{p.name}</h3>
            <p>{p.summary}</p>
            <h4>What we work on together</h4>
            <ul className="checks" style={{ '--accent': p.color }}>
              {p.work.map((w) => <li key={w}>{w}</li>)}
            </ul>
          </article>

          <div className="mapdemo">
            <div className="mapdemo__top">
              <div>
                <h3>Try a district monitoring view</h3>
                <p className="mapdemo__note">Sample data for demonstration. Select a district or change the measure.</p>
              </div>
              <div className="segmented" role="radiogroup" aria-label="Measure">
                {Object.entries(metrics).map(([k, val]) => (
                  <button key={k} role="radio" aria-checked={k === metric} onClick={() => setMetric(k)}>
                    {val.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mapdemo__body">
              <svg viewBox={`0 0 ${MAP_W} ${MAP_H}`} className="lkmap" role="group" aria-label="Map of Sri Lanka by electoral district">
                {districts.map((d) => (
                  <path
                    key={d.id}
                    d={d.d}
                    fill={colorFor(values[d.name])}
                    className={`lkmap__d ${d.name === selected ? 'is-selected' : ''}`}
                    tabIndex={0}
                    role="button"
                    aria-label={`${d.name}: ${m.fmt(values[d.name])}`}
                    aria-pressed={d.name === selected}
                    onMouseEnter={() => setHovered(d.name)}
                    onMouseLeave={() => setHovered(null)}
                    onFocus={() => setHovered(d.name)}
                    onBlur={() => setHovered(null)}
                    onClick={() => setSelected(d.name)}
                    onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), setSelected(d.name))}
                  />
                ))}
              </svg>

              <div className="mapdemo__side">
                <div className="readout">
                  <span className="readout__name">{focus}</span>
                  <span className="readout__value">{m.fmt(values[focus])}</span>
                  <span className="readout__meta">{m.label}, ranked {rank} of {districts.length}</span>
                </div>
                <dl className="readout__list">
                  {Object.entries(metrics).filter(([k]) => k !== metric).map(([k, val]) => (
                    <div key={k}>
                      <dt>{val.label}</dt>
                      <dd>{val.fmt(val.value(focus))}</dd>
                    </div>
                  ))}
                </dl>
                <div className="legend-ramp" aria-hidden="true">
                  <span>{m.invert ? 'Older' : 'Lower'}</span>
                  {ramp.map((c) => <i key={c} style={{ background: c }} />)}
                  <span>{m.invert ? 'Fresher' : 'Higher'}</span>
                </div>
                <ol className="toplist">
                  <li className="toplist__h">{m.invert ? 'Most recently synced' : 'Top districts'}</li>
                  {ranked.slice(0, 5).map(([name, val]) => (
                    <li key={name}>
                      <button className={name === selected ? 'is-on' : ''} onClick={() => setSelected(name)}>
                        <span>{name}</span><span>{m.fmt(val)}</span>
                      </button>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
