'use client';

import { LogoMark } from './Logo.jsx';
import { mailto } from '@/data/content.js';
import HeroDashboard from './HeroDashboard.jsx';

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="aurora" aria-hidden="true"><i /><i /><i /><i /></div>
      <div className="container hero__grid">
        <div className="hero__copy">
          <p className="hero__kicker">
            <LogoMark size={22} /> Luminos · Data and AI consultancy
          </p>
          <h1 className="hero__title">
            We <span className="glowtext">illuminate</span> the path from{' '}
            <span className="hero__raw">raw data</span> to <span className="hero__real">real results</span>
          </h1>
          <p className="hero__lead">
            We engineer the pipelines, build the analysis and ship the dashboards, machine learning
            and AI systems your team relies on every day.
          </p>
          <div className="hero__actions">
            <a href={mailto()} className="btn btn--primary">Start a project</a>
            <a href="#demos" className="btn btn--ghost">Try demo dashboards</a>
          </div>
          <p className="hero__partners">
            Partnering with <a href="#partners">UN Sri Lanka</a> and <a href="#partners">WFP Sri Lanka</a>
          </p>
        </div>
        <div className="hero__visual">
          <LogoMark size={420} className="hero__bgmark" glow={false} />
          <HeroDashboard />
        </div>
      </div>
    </section>
  );
}
