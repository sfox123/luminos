'use client';

import Link from 'next/link';
import { LogoMark } from './Logo.jsx';
import EnsoDashboard from './EnsoDashboard.jsx';
import { mailto } from '@/data/content.js';

export default function EnsoPage() {
  return (
    <>
      <header className="nav nav--scrolled">
        <div className="nav__inner">
          <Link href="/" className="logo" aria-label="Back to Luminos">
            <LogoMark />
            <span className="logo__text"><span className="logo__word">LUMINOS</span></span>
          </Link>
          <nav className="nav__links nav__links--static">
            <Link href="/">Back to website</Link>
            <a href={mailto('El Niño dashboard enquiry')} className="btn btn--primary btn--sm">Build one for us</a>
          </nav>
        </div>
      </header>
      <main className="ensopage">
        <div className="aurora" aria-hidden="true"><i /><i /><i /><i /></div>
        <div className="container">
          <div className="ensopage__head">
            <span className="hero__kicker"><LogoMark size={20} /> Luminos case study · Climate data</span>
            <h1 className="section__title">El Niño Monitor</h1>
            <p className="section__lead">
              How warm is the tropical Pacific right now, and how does it compare with the strongest El Niño years on
              record? This dashboard turns 75 years of NOAA sea surface temperature data into answers you can explore.
            </p>
          </div>
          <div className="board" style={{ '--c': '#E0352B' }}>
            <div className="board__bar">
              <span className="board__dots"><i /><i /><i /></span>
              <strong>El Niño Monitor</strong>
              <span className="board__meta">Oceanic Niño Index · 1950 to today</span>
            </div>
            <div className="board__body"><EnsoDashboard /></div>
          </div>
        </div>
      </main>
      <footer className="footer">
        <div className="container footer__inner">
          <p className="footer__copy">Built by Luminos · We illuminate the path from raw data to real results</p>
          <Link className="footer__phone" href="/">luminos website</Link>
        </div>
      </footer>
    </>
  );
}
