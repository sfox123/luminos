'use client';

import { useState } from 'react';
import { mailto } from '@/data/content.js';

function Slider({ label, value, min, max, step = 1, suffix, onChange }) {
  return (
    <label className="slider">
      <span className="slider__top">
        <span>{label}</span>
        <output>{value}{suffix}</output>
      </span>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ '--p': `${((value - min) / (max - min)) * 100}%` }} />
    </label>
  );
}

export default function Calculator() {
  const [reports, setReports] = useState(12);
  const [hours, setHours] = useState(6);
  const [people, setPeople] = useState(3);
  const [automate, setAutomate] = useState(80);

  const yearly = Math.round(reports * hours * people * 12 * (automate / 100));
  const days = Math.round(yearly / 8);
  const weeks = (yearly / 40).toFixed(1);

  return (
    <section className="section calc" id="calculator">
      <div className="container calc__grid">
        <div>
          <h2 className="section__title">How much time goes into manual reporting?</h2>
          <p className="section__lead">
            Move the sliders to match your team. Automated pipelines and dashboards usually remove
            most of the copying, cleaning and formatting behind recurring reports.
          </p>
          <div className="calc__inputs">
            <Slider label="Recurring reports per month" value={reports} min={1} max={60} onChange={setReports} />
            <Slider label="Hours to prepare each report" value={hours} min={1} max={24} suffix=" h" onChange={setHours} />
            <Slider label="People involved in each report" value={people} min={1} max={10} onChange={setPeople} />
            <Slider label="Share of the work that can be automated" value={automate} min={30} max={95} step={5} suffix="%" onChange={setAutomate} />
          </div>
        </div>

        <div className="calc__result" aria-live="polite">
          <span className="calc__label">Estimated time back each year</span>
          <span className="calc__big">{yearly.toLocaleString()}<small> hours</small></span>
          <div className="calc__equiv">
            <div><strong>{days.toLocaleString()}</strong><span>working days</span></div>
            <div><strong>{weeks}</strong><span>full-time weeks</span></div>
          </div>
          <div className="calc__bars" aria-hidden="true">
            <div><span>Manual today</span><i style={{ width: '100%' }} /></div>
            <div><span>After automation</span><i style={{ width: `${100 - automate}%` }} /></div>
          </div>
          <p className="calc__fine">A rough estimate based on your inputs, not a quote.</p>
          <a className="btn btn--primary" href={mailto('Automating our reporting', `Hi Luminos,\n\nWe prepare about ${reports} recurring reports a month, each taking around ${hours} hours with ${people} people involved. Your calculator estimates about ${yearly.toLocaleString()} hours a year could be saved. We would like to discuss this.\n\nThanks,`)}>Discuss your reporting</a>
        </div>
      </div>
    </section>
  );
}
