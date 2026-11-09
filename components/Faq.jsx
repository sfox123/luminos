'use client';

import { useState } from 'react';
import { faqs } from '@/data/content.js';

export default function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section className="section faq" id="faq">
      <div className="container faq__grid">
        <h2 className="section__title">Common questions</h2>
        <div className="faq__list">
          {faqs.map((f, i) => (
            <div className={`faq__item ${open === i ? 'is-open' : ''}`} key={f.q}>
              <h3>
                <button aria-expanded={open === i} aria-controls={`faq-${i}`} onClick={() => setOpen(open === i ? null : i)}>
                  <span>{f.q}</span>
                  <span className="faq__icon" aria-hidden="true" />
                </button>
              </h3>
              <div className="faq__a" id={`faq-${i}`} role="region" hidden={open !== i}>
                <p>{f.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
