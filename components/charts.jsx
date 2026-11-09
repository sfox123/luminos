'use client';

import { useState } from 'react';

export const fmt = {
  money: (v) => (v >= 1e6 ? `$${(v / 1e6).toFixed(2)}M` : v >= 1e3 ? `$${(v / 1e3).toFixed(0)}K` : `$${Math.round(v)}`),
  num: (v) => Math.round(v).toLocaleString(),
  pct: (v) => `${v.toFixed(1)}%`,
};

export function rng(seed) {
  let s = 0;
  for (const c of String(seed)) s = (s * 31 + c.charCodeAt(0)) >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

export function Kpi({ label, value, delta, good = true, color = '#2447E0', spark }) {
  const max = spark ? Math.max(...spark) : 0;
  const min = spark ? Math.min(...spark) : 0;
  const pts = spark?.map((v, i) => `${(i / (spark.length - 1)) * 100},${28 - ((v - min) / (max - min || 1)) * 24}`).join(' ');
  return (
    <div className="dk" style={{ '--c': color }}>
      <span className="dk__label">{label}</span>
      <span className="dk__value">{value}</span>
      <div className="dk__foot">
        {delta && <span className={`dk__delta ${good ? 'up' : 'down'}`}>{delta}</span>}
        {spark && (
          <svg viewBox="0 0 100 30" preserveAspectRatio="none" className="dk__spark" aria-hidden="true">
            <polyline points={pts} fill="none" stroke={color} strokeWidth="2" vectorEffect="non-scaling-stroke" />
          </svg>
        )}
      </div>
    </div>
  );
}

export function LineChart({ labels, series, format = fmt.num, height = 220, yMin }) {
  const [hi, setHi] = useState(null);
  const W = 560, H = height, pl = 44, pr = 12, pt = 12, pb = 26;
  const all = series.flatMap((s) => s.values).filter((v) => v != null);
  const min = yMin ?? Math.min(0, Math.min(...all));
  const max = Math.max(...all) + (Math.max(...all) - min) * 0.08;
  const x = (i) => pl + (i * (W - pl - pr)) / (labels.length - 1);
  const y = (v) => pt + (1 - (v - min) / (max - min)) * (H - pt - pb);
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((t) => min + t * (max - min));
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const px = ((e.clientX - r.left) / r.width) * W;
    setHi(Math.max(0, Math.min(labels.length - 1, Math.round(((px - pl) / (W - pl - pr)) * (labels.length - 1)))));
  };
  return (
    <div className="lc">
      <div className="lc__legend">
        {series.map((s) => (
          <span key={s.name}><i style={{ background: s.color, opacity: s.dashed ? .6 : 1 }} />{s.name}</span>
        ))}
      </div>
      <div className="lc__wrap">
        <svg viewBox={`0 0 ${W} ${H}`} onMouseMove={onMove} onMouseLeave={() => setHi(null)} role="img" aria-label={`Line chart: ${series.map((s) => s.name).join(', ')}`}>
          {ticks.map((t, i) => (
            <g key={i}>
              <line x1={pl} x2={W - pr} y1={y(t)} y2={y(t)} stroke="#E8ECF4" />
              <text x={pl - 8} y={y(t) + 4} textAnchor="end" className="axis">{format(t)}</text>
            </g>
          ))}
          {labels.map((l, i) => (i % Math.ceil(labels.length / 8) === 0 || i === labels.length - 1) && (
            <text key={l} x={x(i)} y={H - 6} textAnchor="middle" className="axis">{l}</text>
          ))}
          {series.map((s, si) => {
            let pen = false;
            const d = s.values.map((v, i) => { if (v == null) { pen = false; return ''; } const c = `${pen ? 'L' : 'M'}${x(i)},${y(v)}`; pen = true; return c; }).join(' ');
            const lastIdx = s.values.reduce((a, v, i) => (v != null ? i : a), 0);
            return (
              <g key={s.name}>
                {s.area && <path d={`${d} L${x(lastIdx)},${y(min)} L${x(0)},${y(min)}Z`} fill={s.color} opacity=".1" />}
                <path d={d} fill="none" stroke={s.color} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" {...(s.dashed ? { className: 'lc__dash', strokeDasharray: '6 5' } : { className: 'lc__path', pathLength: 1, style: { animationDelay: `${si * .15}s` } })} />
              </g>
            );
          })}
          {hi !== null && (
            <g>
              <line x1={x(hi)} x2={x(hi)} y1={pt} y2={H - pb} stroke="#101828" strokeDasharray="3 3" opacity=".35" />
              {series.filter((s) => s.values[hi] != null).map((s) => <circle key={s.name} cx={x(hi)} cy={y(s.values[hi])} r="4.5" fill="#fff" stroke={s.color} strokeWidth="2.5" />)}
            </g>
          )}
        </svg>
        {hi !== null && (
          <div className="tip" style={{ left: `${(x(hi) / W) * 100}%`, top: 0 }}>
            <strong>{labels[hi]}</strong>
            {series.map((s) => <span key={s.name}><i style={{ background: s.color }} />{s.name}: {s.values[hi] == null ? '—' : format(s.values[hi])}</span>)}
          </div>
        )}
      </div>
    </div>
  );
}

export function BarList({ items, format = fmt.num, color = '#2447E0', onSelect, selected }) {
  const max = Math.max(...items.map((i) => i.value));
  return (
    <ul className="bl">
      {items.map((it, i) => (
        <li key={it.label}>
          <button
            className={`bl__row ${selected === it.label ? 'is-on' : ''} ${selected && selected !== it.label ? 'is-dim' : ''}`}
            onClick={() => onSelect?.(selected === it.label ? null : it.label)}
            disabled={!onSelect}
          >
            <span className="bl__label">{it.label}</span>
            <span className="bl__track"><span className="bl__fill" style={{ width: `${(it.value / max) * 100}%`, background: it.color || color, animationDelay: `${i * .05}s` }} /></span>
            <span className="bl__val">{format(it.value)}</span>
          </button>
        </li>
      ))}
    </ul>
  );
}

export function Columns({ items, format = fmt.num, height = 180 }) {
  const [hi, setHi] = useState(null);
  const max = Math.max(...items.map((i) => i.value)) * 1.1;
  return (
    <div className="cols" style={{ height }}>
      {items.map((it, i) => (
        <div key={it.label} className={`cols__c ${hi !== null && hi !== i ? 'is-dim' : ''}`} onMouseEnter={() => setHi(i)} onMouseLeave={() => setHi(null)}>
          <div className="cols__bar" style={{ height: `${(it.value / max) * 100}%`, background: it.color, animationDelay: `${i * .04}s` }}>
            {hi === i && <span className="cols__tip">{format(it.value)}</span>}
          </div>
          <span className="cols__l">{it.label}</span>
        </div>
      ))}
    </div>
  );
}

export function Donut({ items, format = fmt.num, center }) {
  const [hi, setHi] = useState(null);
  const total = items.reduce((a, b) => a + b.value, 0);
  let acc = 0;
  const R = 70, C = 2 * Math.PI * R;
  const focus = hi !== null ? items[hi] : null;
  return (
    <div className="donut">
      <svg viewBox="0 0 200 200" role="img" aria-label="Donut chart">
        <circle cx="100" cy="100" r={R} fill="none" stroke="#EEF1F7" strokeWidth="26" />
        {items.map((it, i) => {
          const len = (it.value / total) * C;
          const el = (
            <circle key={it.label} cx="100" cy="100" r={R} fill="none" stroke={it.color}
              strokeWidth={hi === i ? 32 : 26} strokeDasharray={`${Math.max(0, len - 2)} ${C}`} strokeDashoffset={-acc}
              transform="rotate(-90 100 100)" onMouseEnter={() => setHi(i)} onMouseLeave={() => setHi(null)}
              style={{ transition: 'stroke-width .2s', cursor: 'pointer' }} />
          );
          acc += len;
          return el;
        })}
        <text x="100" y="96" textAnchor="middle" className="donut__big">{focus ? `${((focus.value / total) * 100).toFixed(0)}%` : center?.value}</text>
        <text x="100" y="116" textAnchor="middle" className="donut__small">{focus ? focus.label : center?.label}</text>
      </svg>
      <ul className="donut__legend">
        {items.map((it, i) => (
          <li key={it.label} onMouseEnter={() => setHi(i)} onMouseLeave={() => setHi(null)} className={hi === i ? 'is-on' : ''}>
            <i style={{ background: it.color }} />{it.label}<b>{format(it.value)}</b>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Gauge({ value, label, color = '#12A9D6', target }) {
  const a = Math.PI * (1 - value / 100);
  const x = 100 + 80 * Math.cos(a), y = 100 - 80 * Math.sin(a);
  const ta = Math.PI * (1 - (target ?? 0) / 100);
  return (
    <div className="gauge">
      <svg viewBox="0 0 200 118" role="img" aria-label={`${label}: ${value.toFixed(0)}%`}>
        <path d="M20 100 A80 80 0 0 1 180 100" fill="none" stroke="#EEF1F7" strokeWidth="18" strokeLinecap="round" />
        <path d={`M20 100 A80 80 0 0 1 ${x.toFixed(1)} ${y.toFixed(1)}`} fill="none" stroke={color} strokeWidth="18" strokeLinecap="round" className="gauge__arc" />
        {target != null && <line x1={100 + 66 * Math.cos(ta)} y1={100 - 66 * Math.sin(ta)} x2={100 + 94 * Math.cos(ta)} y2={100 - 94 * Math.sin(ta)} stroke="#101828" strokeWidth="2.5" />}
        <text x="100" y="92" textAnchor="middle" className="gauge__v">{value.toFixed(0)}%</text>
        <text x="100" y="112" textAnchor="middle" className="donut__small">{label}</text>
      </svg>
    </div>
  );
}

export function Heatmap({ rows, cols, values, color = [36, 71, 224], format = (v) => `${v}%` }) {
  const [hi, setHi] = useState(null);
  return (
    <div className="heat" style={{ gridTemplateColumns: `90px repeat(${cols.length}, 1fr)` }}>
      <span />
      {cols.map((c) => <span key={c} className="heat__h">{c}</span>)}
      {rows.map((r, ri) => (
        <div key={r} className="heat__row" style={{ display: 'contents' }}>
          <span className="heat__r">{r}</span>
          {cols.map((c, ci) => {
            const v = values[ri][ci];
            if (v == null) return <span key={c} className="heat__cell heat__cell--empty" />;
            const on = hi && (hi[0] === ri || hi[1] === ci);
            return (
              <span key={c} className={`heat__cell ${on ? 'is-on' : ''}`} onMouseEnter={() => setHi([ri, ci])} onMouseLeave={() => setHi(null)}
                style={{ background: `rgba(${color.join(',')}, ${0.08 + (v / 100) * 0.85})`, color: v > 55 ? '#fff' : '#101828' }}>
                {format(v)}
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export function Funnel({ steps, color = '#7A3FD8' }) {
  const max = steps[0].value;
  return (
    <ol className="funnel">
      {steps.map((s, i) => (
        <li key={s.label}>
          <div className="funnel__bar" style={{ width: `${30 + 70 * Math.sqrt(s.value / max)}%`, background: `color-mix(in srgb, ${color} ${100 - i * 15}%, #E84A7F)` }}>
            <span>{s.label}</span><b>{fmt.num(s.value)}</b>
          </div>
          {i > 0 && <em>{((s.value / steps[i - 1].value) * 100).toFixed(0)}% from previous</em>}
        </li>
      ))}
    </ol>
  );
}
