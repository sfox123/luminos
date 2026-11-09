'use client';

import { steps } from '@/data/content.js';

export default function Process() {
  return (
    <section className="section process" id="process">
      <div className="container">
        <div className="section__head">
          <h2 className="section__title">How a project runs</h2>
          <p className="section__lead">Four stages, with something working to review at the end of each.</p>
        </div>
        <ol className="steps">
          {steps.map((s, i) => (
            <li key={s.title} className="step" style={{ '--c': ['#2447E0', '#12A9D6', '#7A3FD8', '#E84A7F'][i] }}>
              <span className="step__n">{i + 1}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
