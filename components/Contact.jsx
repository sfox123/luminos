'use client';

import { useState } from 'react';
import { services } from '@/data/content.js';

const options = [...services.map((s) => s.name), 'Not sure yet'];
const empty = { name: '', email: '', company: '', service: '', message: '', website: '' };

export default function Contact() {
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [serverError, setServerError] = useState('');

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setServerError('');
    setErrors({});
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setStatus('sent');
        setForm(empty);
      } else {
        setErrors(data.errors || {});
        setServerError(data.error || '');
        setStatus('error');
      }
    } catch {
      setServerError('Could not reach the server. Check your connection or email hello@luminos.co.');
      setStatus('error');
    }
  };

  const field = (k, label, props = {}) => (
    <label className={`field ${errors[k] ? 'field--error' : ''}`}>
      <span>{label}</span>
      <input value={form[k]} onChange={set(k)} aria-invalid={!!errors[k]} {...props} />
      {errors[k] && <em>{errors[k]}</em>}
    </label>
  );

  return (
    <section className="section contact" id="contact">
      <div className="aurora aurora--soft" aria-hidden="true"><i /><i /><i /></div>
      <div className="container contact__grid">
        <div>
          <h2 className="section__title">Tell us what you are trying to solve</h2>
          <p className="section__lead">
            Describe the decision, the data you have and where it gets stuck. We reply within two
            working days with next steps, even if we are not the right fit.
          </p>
          <dl className="contact__meta">
            <div><dt>Email</dt><dd><a href="mailto:hello@luminos.co">hello@luminos.co</a></dd></div>
            <div><dt>Response time</dt><dd>Within two working days</dd></div>
          </dl>
        </div>

        {status === 'sent' ? (
          <div className="form form--done" role="status">
            <h3>Message sent</h3>
            <p>Thanks. We will reply to your email within two working days.</p>
            <button className="btn btn--ghost" onClick={() => setStatus('idle')}>Send another message</button>
          </div>
        ) : (
          <form className="form" onSubmit={submit} noValidate>
            <div className="form__row">
              {field('name', 'Name', { autoComplete: 'name', required: true })}
              {field('email', 'Work email', { type: 'email', autoComplete: 'email', required: true })}
            </div>
            {field('company', 'Company (optional)', { autoComplete: 'organization' })}

            <fieldset className={`field ${errors.service ? 'field--error' : ''}`}>
              <legend>What do you need help with?</legend>
              <div className="pills">
                {options.map((o) => (
                  <label key={o} className={`pill ${form.service === o ? 'is-on' : ''}`}>
                    <input type="radio" name="service" value={o} checked={form.service === o} onChange={set('service')} />
                    {o}
                  </label>
                ))}
              </div>
              {errors.service && <em>{errors.service}</em>}
            </fieldset>

            <label className={`field ${errors.message ? 'field--error' : ''}`}>
              <span>Project details</span>
              <textarea rows="5" value={form.message} onChange={set('message')} aria-invalid={!!errors.message}
                placeholder="For example: our sales data lives in three systems and monthly reporting takes a week." />
              {errors.message && <em>{errors.message}</em>}
            </label>

            {/* Honeypot, hidden from people */}
            <input className="hp" tabIndex="-1" autoComplete="off" value={form.website} onChange={set('website')} aria-hidden="true" />

            {serverError && <p className="form__error" role="alert">{serverError}</p>}
            <button className="btn btn--primary" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending message…' : 'Send message'}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
