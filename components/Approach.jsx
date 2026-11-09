'use client';

import { useState } from 'react';
import { principles } from '@/data/content.js';

const layers = [
  { name: 'AI assistants and ML models', c: '#D8365A', text: 'Assistants that answer from your documents, and models that predict demand, churn or risk. Only as good as the layers below.' },
  { name: 'Dashboards and reports', c: '#1F3FD8', text: 'The screens people use every day. Built on agreed metric definitions so every chart tells the same story.' },
  { name: 'Analysis and metrics', c: '#0E8F8F', text: 'Shared definitions for your key numbers, plus the analysis that explains why they move.' },
  { name: 'Pipelines and warehouse', c: '#C9730F', text: 'Scheduled, tested pipelines that collect data from every source into one clean, documented warehouse.' },
  { name: 'Your source systems', c: '#8A94A6', text: 'CRMs, ERPs, spreadsheets, field survey apps and APIs. We connect to what you already use.' },
];

export default function Approach() {
  const [open, setOpen] = useState(3);
  return (
    <section className="section approach" id="approach">
      <div className="container approach__grid">
        <div className="stack" aria-label="Layers of a data platform. Select a layer to learn more.">
          {layers.map((l, i) => (
            <button
              className={`stack__layer ${open === i ? 'is-open' : ''}`}
              key={l.name}
              style={{ '--c': l.c, '--i': i }}
              aria-expanded={open === i}
              onClick={() => setOpen(open === i ? null : i)}
            >
              <span className="stack__name">{l.name}</span>
              <span className="stack__toggle" aria-hidden="true">{open === i ? '−' : '+'}</span>
              <span className="stack__text">{l.text}</span>
            </button>
          ))}
          <p className="stack__caption">Select a layer to see what it involves.</p>
        </div>

        <div>
          <h2 className="section__title">Good AI starts with boring, reliable data</h2>
          <p className="section__lead">
            Most dashboards and models fail because of what sits underneath them. We work across
            the whole stack, so the insight at the top is only as confident as the data allows.
          </p>
          <ul className="principles">
            {principles.map((p) => (
              <li key={p.title}>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
