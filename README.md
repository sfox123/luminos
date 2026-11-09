# Luminos website — Next.js

Next.js 16 (App Router) with React 19. This replaces the earlier Vite + Express version:
the client and the API now live in one project.

## Structure

```
luminos/
├── app/
│   ├── layout.jsx          Fonts, metadata, <html> shell
│   ├── globals.css         All styles and design tokens (no CSS framework)
│   ├── page.jsx            Home page  →  components/Home.jsx
│   ├── enso/page.jsx       El Niño Monitor  →  /enso
│   ├── api/contact/route.js  POST /api/contact (kept for when the form returns)
│   └── icon.svg            Favicon (the Luminos mark)
├── components/             Nav, Hero, Marquee, Partners, Services, EnsoFeature,
│                           DemoDashboards, EnsoDashboard, charts, BeforeAfter,
│                           PipelineRunner, Approach, Calculator, Process, Faq,
│                           ContactActions, Contact (hidden), Footer, Illustrations
├── data/                   content.js (all page copy + contact details),
│                           oni.json (NOAA El Niño data), sriLankaMap.js
├── assets/                 El Niño screenshots used on the home page
└── scripts/update-oni.mjs  Refreshes oni.json from NOAA
```

## Run it

Requires Node.js 20 or newer.

```bash
npm install
npm run dev      # http://localhost:3000
```

Production:

```bash
npm run build
npm start
```

Deploying to Vercel needs no configuration: push the repo and it builds as-is.

## Editing content

- Text, services, process steps, partners, FAQs, email and phone: `data/content.js`
- Colours and fonts: the `:root` block at the top of `app/globals.css`
- Fonts are self-hosted through Fontsource (Bricolage Grotesque and Figtree), so no
  Google Fonts request is made at runtime.

## Contact

The form is hidden; the site shows email and phone instead. To bring it back, render
`<Contact />` instead of `<ContactActions />` in `components/Home.jsx`.

`POST /api/contact` validates messages and appends them to `data/messages.json`. That file
write only works on a host with a writable disk; on Vercel, swap it for an email service
(Resend, SES) or a database.

## El Niño Monitor

- Page: `/enso`, also the first tab in the demo dashboards on the home page
- Data: `data/oni.json` (NOAA Oceanic Niño Index, 1950 to now). Refresh with `npm run data:oni`
- Home page screenshots: `assets/enso-*.webp`. Retake them after big design changes.
- Set `NEXT_PUBLIC_ENSO_URL` if the dashboard is hosted somewhere else.
