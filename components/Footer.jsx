'use client';

import Logo from './Logo.jsx';
import { contact, tel } from '@/data/content.js';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <Logo tagline />
        <nav className="footer__links" aria-label="Footer">
          <a href="#partners">Partners</a>
          <a href="#services">Services</a>
          <a href="#approach">Approach</a>
          <a href="#pipeline">Live demo</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className="footer__phone" href={tel}>{contact.phoneDisplay}</a>
        <p className="footer__copy">© {new Date().getFullYear()} Luminos</p>
      </div>
    </footer>
  );
}
