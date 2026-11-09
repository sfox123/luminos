'use client';

import { contact, mailto, tel } from '@/data/content.js';

const body = `Hi Luminos,

I'd like to talk about a project.

What we want to achieve:
Where our data lives today:
Timeline:

Thanks,`;

export default function ContactActions() {
  return (
    <section className="section contact" id="contact">
      <div className="aurora aurora--soft" aria-hidden="true"><i /><i /><i /></div>
      <div className="container">
        <div className="section__head section__head--center">
          <h2 className="section__title">Let's talk about your project</h2>
          <p className="section__lead">
            Tell us the decision you need to make and where your data lives today. Email us or give us
            a call, and we'll reply within two working days.
          </p>
        </div>

        <div className="reach">
          <a className="reach__card reach__card--mail" href={mailto('New project enquiry', body)}>
            <span className="reach__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
            </span>
            <span className="reach__label">Email us</span>
            <strong>{contact.email}</strong>
            <span className="reach__cta">Write an email</span>
          </a>
          <a className="reach__card reach__card--call" href={tel}>
            <span className="reach__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2Z" /></svg>
            </span>
            <span className="reach__label">Call us</span>
            <strong>{contact.phoneDisplay}</strong>
            <span className="reach__cta">Call now</span>
          </a>
        </div>
      </div>
    </section>
  );
}
