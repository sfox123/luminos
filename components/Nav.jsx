'use client';

import { useEffect, useState } from 'react';
import Logo from './Logo.jsx';
import { mailto } from '@/data/content.js';

const links = [
  { href: '#partners', label: 'Partners' },
  { href: '#services', label: 'Services' },
  { href: '#el-nino', label: 'El Niño' },
  { href: '#demos', label: 'Demo dashboards' },
  { href: '#calculator', label: 'Time savings' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
      let current = '';
      for (const l of links) {
        const el = document.querySelector(l.href);
        if (el && el.getBoundingClientRect().top < 140) current = l.href;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="nav__inner">
        <Logo />
        <button className="nav__toggle" aria-expanded={open} aria-controls="nav-links" onClick={() => setOpen((o) => !o)}>
          {open ? 'Close' : 'Menu'}
        </button>
        <nav id="nav-links" className={`nav__links ${open ? 'is-open' : ''}`}>
          {links.map((l) => (
            <a key={l.href} href={l.href} className={active === l.href ? 'is-current' : ''} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <a href={mailto()} className="btn btn--primary btn--sm" onClick={() => setOpen(false)}>Start a project</a>
        </nav>
      </div>
      <div className="nav__progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />
    </header>
  );
}
