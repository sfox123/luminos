import { NextResponse } from 'next/server';
import path from 'node:path';
import fs from 'node:fs/promises';

// The site currently shows email and phone instead of this form, but the endpoint still works
// if you bring <Contact /> back. On a read-only host (Vercel), swap the file write below for an
// email service or a database.
const MESSAGES_FILE = path.join(process.cwd(), 'data', 'messages.json');
const SERVICES = ['Dashboards', 'Data analytics', 'Data engineering', 'Machine learning', 'AI engineering', 'Not sure yet'];

const hits = new Map();
function rateLimited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < 10 * 60 * 1000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

export async function POST(request) {
  const { name = '', email = '', company = '', service = '', message = '', website = '' } = await request.json().catch(() => ({}));

  // Honeypot field: real visitors never fill this in
  if (website) return NextResponse.json({ ok: true });

  const errors = {};
  if (name.trim().length < 2) errors.name = 'Enter your name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) errors.email = 'Enter a valid email address.';
  if (!SERVICES.includes(service)) errors.service = 'Choose what you need help with.';
  if (message.trim().length < 20) errors.message = 'Tell us a bit more (at least 20 characters).';
  if (Object.keys(errors).length) return NextResponse.json({ ok: false, errors }, { status: 400 });

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, error: 'Too many messages from this address. Try again in 10 minutes.' }, { status: 429 });
  }

  const entry = {
    id: Date.now().toString(36),
    receivedAt: new Date().toISOString(),
    name: name.trim().slice(0, 120),
    email: email.trim().slice(0, 200),
    company: company.trim().slice(0, 160),
    service,
    message: message.trim().slice(0, 4000),
  };

  try {
    await fs.mkdir(path.dirname(MESSAGES_FILE), { recursive: true });
    let list = [];
    try {
      list = JSON.parse(await fs.readFile(MESSAGES_FILE, 'utf8'));
    } catch { /* first message */ }
    list.push(entry);
    await fs.writeFile(MESSAGES_FILE, JSON.stringify(list, null, 2));
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err) {
    console.error('Could not save message', err);
    return NextResponse.json({ ok: false, error: 'The message could not be saved. Email hello@luminos.co instead.' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ ok: true });
}
