'use client';

import { services } from '@/data/content.js';

const tools = ['Power BI', 'Tableau', 'Python', 'SQL', 'dbt', 'Airflow', 'Snowflake', 'Databricks', 'Azure', 'AWS', 'React', 'Node.js', 'D3.js', 'PyTorch', 'Amazon Bedrock', 'Claude'];

// Listed twice so the band stays full on very wide screens.
const bandItems = [...services, ...services].map((s, i) => ({ key: `${s.id}-${i}`, text: s.name, color: s.color }));

function Track({ children, reverse = false, speed = 40, label }) {
  // Content is rendered twice so the loop is seamless; the copy is hidden from screen readers.
  return (
    <div className={`marquee ${reverse ? 'marquee--reverse' : ''}`} style={{ '--speed': `${speed}s` }} aria-label={label} role="region">
      <div className="marquee__track">
        <ul className="marquee__group">{children}</ul>
        <ul className="marquee__group" aria-hidden="true">{children}</ul>
      </div>
    </div>
  );
}

export default function Marquee() {
  return (
    <div className="ticker">
      <div className="ticker__band">
        <Track label="What we do" speed={38}>
          {bandItems.map((it) => (
            <li key={it.key} className="band__item">
              <span className="band__dot" style={{ background: it.color, boxShadow: `0 0 10px ${it.color}` }} />
              {it.text}
            </li>
          ))}
        </Track>
      </div>
      <Track label="Tools we use" reverse speed={52}>
        {tools.map((t) => (
          <li key={t} className="chip-pill chip-pill--tool">{t}</li>
        ))}
      </Track>
    </div>
  );
}
