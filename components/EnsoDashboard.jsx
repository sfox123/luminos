'use client';

import { useMemo, useState } from 'react';
import oni from '@/data/oni.json';
import { Kpi, LineChart, Donut } from './charts.jsx';

const S = oni.seasons;
const ROWS = oni.rows.map(([year, s, sst, anom, cls], i) => ({ i, year, s, season: S[s], sst, anom, cls, label: `${S[s]} ${year}` }));
const LAST = ROWS.at(-1);

// Episodes: consecutive seasons classified as El Niño (+1) or La Niña (−1)
const EPISODES = (() => {
  const out = [];
  let cur = null;
  for (const r of ROWS) {
    if (r.cls === 0) { cur = null; continue; }
    if (cur && cur.cls === r.cls) cur.end = r.i;
    else { cur = { cls: r.cls, start: r.i, end: r.i }; out.push(cur); }
  }
  return out.map((e) => {
    const seg = ROWS.slice(e.start, e.end + 1);
    const peak = seg.reduce((a, b) => (b.anom * e.cls > a.anom * e.cls ? b : a));
    return { ...e, type: e.cls > 0 ? 'El Niño' : 'La Niña', seasons: seg.length, peak, from: ROWS[e.start].label, to: ROWS[e.end].label };
  });
})();

const strength = (v) => {
  const a = Math.abs(v);
  if (a >= 2) return 'Very strong';
  if (a >= 1.5) return 'Strong';
  if (a >= 1) return 'Moderate';
  if (a >= 0.5) return 'Weak';
  return 'Neutral';
};

// Current streak above/below the threshold
const streak = (() => {
  let n = 0;
  const sign = LAST.anom >= 0.5 ? 1 : LAST.anom <= -0.5 ? -1 : 0;
  if (!sign) return { sign, n };
  for (let k = ROWS.length - 1; k >= 0 && ROWS[k].anom * sign >= 0.5; k--) n++;
  return { sign, n };
})();

const RANGES = [['all', 'Since 1950'], ['1990', 'Since 1990'], ['2010', 'Since 2010'], ['5y', 'Last 5 years']];

function OniChart({ rows, focus, onPick }) {
  const [hi, setHi] = useState(null);
  const W = 900, H = 280, pl = 40, pr = 10, pt = 14, pb = 26;
  const vmax = 3;
  const x = (k) => pl + (k * (W - pl - pr)) / Math.max(1, rows.length - 1);
  const y = (v) => pt + ((vmax - v) / (2 * vmax)) * (H - pt - pb);
  const line = rows.map((r, k) => `${k ? 'L' : 'M'}${x(k).toFixed(1)},${y(r.anom).toFixed(1)}`).join('');
  const area = `${line}L${x(rows.length - 1)},${y(0)}L${x(0)},${y(0)}Z`;
  const years = [...new Set(rows.map((r) => r.year))];
  const step = years.length > 40 ? 10 : years.length > 12 ? 5 : 1;
  const onMove = (e) => {
    const b = e.currentTarget.getBoundingClientRect();
    const px = ((e.clientX - b.left) / b.width) * W;
    setHi(Math.max(0, Math.min(rows.length - 1, Math.round(((px - pl) / (W - pl - pr)) * (rows.length - 1)))));
  };
  const h = hi != null ? rows[hi] : null;
  return (
    <div className="oni">
      <svg viewBox={`0 0 ${W} ${H}`} onMouseMove={onMove} onMouseLeave={() => setHi(null)} onClick={() => h && onPick?.(h)}
        role="img" aria-label={`Oceanic Niño Index from ${rows[0].label} to ${rows.at(-1).label}`}>
        <defs>
          <clipPath id="oni-warm"><rect x="0" y="0" width={W} height={y(0)} /></clipPath>
          <clipPath id="oni-cold"><rect x="0" y={y(0)} width={W} height={H} /></clipPath>
          <linearGradient id="oni-wg" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#E0352B" /><stop offset="1" stopColor="#F7A07A" /></linearGradient>
          <linearGradient id="oni-cg" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#7CB7F2" /><stop offset="1" stopColor="#1F5FC7" /></linearGradient>
        </defs>
        <rect x={pl} y={y(0.5)} width={W - pl - pr} height={y(-0.5) - y(0.5)} fill="#F3F5F9" />
        {[-2, -1, 0, 1, 2].map((v) => (
          <g key={v}>
            <line x1={pl} x2={W - pr} y1={y(v)} y2={y(v)} stroke={v === 0 ? '#98A2B3' : '#E8ECF4'} />
            <text x={pl - 6} y={y(v) + 4} textAnchor="end" className="axis">{v > 0 ? `+${v}` : v}</text>
          </g>
        ))}
        {[0.5, -0.5].map((v) => <line key={v} x1={pl} x2={W - pr} y1={y(v)} y2={y(v)} stroke={v > 0 ? '#E0352B' : '#1F5FC7'} strokeDasharray="4 4" opacity=".6" />)}
        {focus && (() => {
          const a = rows.findIndex((r) => r.i === focus.start), b = rows.findIndex((r) => r.i === focus.end);
          return a >= 0 && b >= 0 ? <rect x={x(a) - 3} y={pt} width={x(b) - x(a) + 6} height={H - pt - pb} fill={focus.cls > 0 ? '#E0352B' : '#1F5FC7'} opacity=".08" /> : null;
        })()}
        <path d={area} fill="url(#oni-wg)" clipPath="url(#oni-warm)" />
        <path d={area} fill="url(#oni-cg)" clipPath="url(#oni-cold)" />
        <path d={line} fill="none" stroke="#101828" strokeWidth="1" opacity=".55" />
        {rows.map((r, k) => r.s === 0 && r.year % step === 0 && (
          <text key={r.year} x={x(k)} y={H - 6} textAnchor="middle" className="axis">{r.year}</text>
        ))}
        {h && (
          <g>
            <line x1={x(hi)} x2={x(hi)} y1={pt} y2={H - pb} stroke="#101828" strokeDasharray="3 3" opacity=".4" />
            <circle cx={x(hi)} cy={y(h.anom)} r="5" fill="#fff" stroke={h.anom >= 0 ? '#E0352B' : '#1F5FC7'} strokeWidth="2.5" />
          </g>
        )}
      </svg>
      {h && (
        <div className="tip" style={{ left: `${(x(hi) / W) * 100}%`, top: 0 }}>
          <strong>{h.label}</strong>
          <span>ONI: {h.anom > 0 ? '+' : ''}{h.anom.toFixed(2)} °C ({strength(h.anom)})</span>
          <span>Niño 3.4 SST: {h.sst.toFixed(2)} °C</span>
        </div>
      )}
      <div className="oni__legend">
        <span><i style={{ background: '#E0352B' }} />Warm (El Niño side)</span>
        <span><i style={{ background: '#1F5FC7' }} />Cool (La Niña side)</span>
        <span><i className="dash" />±0.5 °C threshold</span>
      </div>
    </div>
  );
}

const r1 = (v) => (Math.abs(v) < 0.05 ? 0 : Math.round(v * 10) / 10);

function cellColor(raw) {
  const v = r1(raw);
  const a = Math.min(1, Math.abs(v) / 2.2);
  if (Math.abs(v) < 0.5) return { background: `rgba(152,162,179,${0.08 + a * 0.25})`, color: '#344054' };
  return v > 0
    ? { background: `rgba(224,53,43,${0.25 + a * 0.75})`, color: a > 0.45 ? '#fff' : '#5A0F0A' }
    : { background: `rgba(31,95,199,${0.25 + a * 0.75})`, color: a > 0.45 ? '#fff' : '#0A2A5E' };
}

function OniGrid({ decade }) {
  const years = Array.from({ length: 10 }, (_, k) => decade + k).filter((yy) => yy <= LAST.year);
  const map = new Map(ROWS.map((r) => [`${r.year}-${r.s}`, r]));
  return (
    <div className="onigrid" role="table" aria-label={`ONI by season, ${decade}s`}>
      <span role="columnheader" />
      {S.map((s) => <span key={s} className="onigrid__h" role="columnheader">{s}</span>)}
      {years.map((yy) => (
        <div key={yy} role="row" style={{ display: 'contents' }}>
          <span className="onigrid__y" role="rowheader">{yy}</span>
          {S.map((s, k) => {
            const r = map.get(`${yy}-${k}`);
            return r
              ? <span key={s} role="cell" className="onigrid__c" style={cellColor(r.anom)} title={`${r.label}: ${r.anom.toFixed(2)} °C`}>{r1(r.anom).toFixed(1)}</span>
              : <span key={s} role="cell" className="onigrid__c onigrid__c--na" />;
          })}
        </div>
      ))}
    </div>
  );
}

const COMPARE = [
  { year: 1982, color: '#F2A33A' },
  { year: 1997, color: '#7A3FD8' },
  { year: 2015, color: '#12A9D6' },
  { year: 2023, color: '#11845B' },
];

export default function EnsoDashboard() {
  const [range, setRange] = useState('all');
  const [focus, setFocus] = useState(null);
  const [kind, setKind] = useState('El Niño');
  const [decade, setDecade] = useState(Math.floor(LAST.year / 10) * 10);
  const [sort, setSort] = useState('peak');
  const [picked, setPicked] = useState(null);

  const rows = useMemo(() => {
    if (focus) {
      const a = Math.max(0, focus.start - 12), b = Math.min(ROWS.length - 1, focus.end + 12);
      return ROWS.slice(a, b + 1);
    }
    if (range === 'all') return ROWS;
    if (range === '5y') return ROWS.slice(-60);
    return ROWS.filter((r) => r.year >= Number(range));
  }, [range, focus]);

  const episodes = useMemo(() => {
    const list = EPISODES.filter((e) => e.type === kind);
    return [...list].sort((a, b) => (sort === 'peak' ? Math.abs(b.peak.anom) - Math.abs(a.peak.anom) : sort === 'length' ? b.seasons - a.seasons : b.start - a.start));
  }, [kind, sort]);

  const counts = useMemo(() => {
    const c = { 1: 0, 0: 0, [-1]: 0 };
    ROWS.forEach((r) => (c[r.cls] += 1));
    return c;
  }, []);

  const strongest = EPISODES.filter((e) => e.cls > 0).reduce((a, b) => (b.peak.anom > a.peak.anom ? b : a));
  const nino = EPISODES.filter((e) => e.cls > 0).length;
  const nina = EPISODES.length - nino;

  const compareSeries = [
    ...COMPARE.map((c) => ({ name: String(c.year), color: c.color, values: S.map((_, k) => ROWS.find((r) => r.year === c.year && r.s === k)?.anom ?? null) })),
    { name: `${LAST.year} (now)`, color: '#E0352B', area: false, values: S.map((_, k) => ROWS.find((r) => r.year === LAST.year && r.s === k)?.anom ?? null) },
  ];

  const status = streak.sign > 0
    ? `Above +0.5 °C for ${streak.n} season${streak.n > 1 ? 's' : ''} in a row`
    : streak.sign < 0 ? `Below −0.5 °C for ${streak.n} season${streak.n > 1 ? 's' : ''} in a row` : 'Within the neutral range';

  const spark = ROWS.slice(-12).map((r) => r.anom);

  return (
    <div className="enso">
      <div className="filters">
        <div className="fseg" role="radiogroup" aria-label="Time range">
          {RANGES.map(([v, l]) => (
            <button key={v} role="radio" aria-checked={!focus && v === range} onClick={() => { setRange(v); setFocus(null); }}>{l}</button>
          ))}
        </div>
        {focus && <button className="clear" onClick={() => setFocus(null)}>Zoomed: {focus.type} {focus.from} – {focus.to} ✕</button>}
        <span className="sample sample--real">Real data · NOAA CPC · to {LAST.label}</span>
      </div>

      <div className="dgrid dgrid--4">
        <Kpi label={`Latest ONI (${LAST.label})`} value={`${LAST.anom > 0 ? '+' : ''}${LAST.anom.toFixed(2)} °C`} delta={strength(LAST.anom)} good={false} color="#E0352B" spark={spark} />
        <Kpi label="Current state" value={streak.sign > 0 ? 'Warming' : streak.sign < 0 ? 'Cooling' : 'Neutral'} delta={status} good={streak.sign <= 0} color="#F2A33A" />
        <Kpi label="Niño 3.4 sea temperature" value={`${LAST.sst.toFixed(2)} °C`} delta={`Rolling 3-month mean, ${LAST.season}`} color="#12A9D6" />
        <Kpi label="Strongest El Niño since 1950" value={`+${strongest.peak.anom.toFixed(2)} °C`} delta={strongest.peak.label} color="#7A3FD8" />
      </div>

      <section className="dcard">
        <header><h4>Oceanic Niño Index, {rows[0].label} – {rows.at(-1).label}</h4><span>Hover for values · click to jump the season table</span></header>
        <OniChart rows={rows} focus={focus} onPick={(r) => { setDecade(Math.floor(r.year / 10) * 10); setPicked(r.label); }} />
        {picked && <p className="enso__picked">Showing {Math.floor(Number(picked.slice(-4)) / 10) * 10}s in the season table below ({picked}).</p>}
      </section>

      <div className="dgrid dgrid--main">
        <section className="dcard dcard--wide">
          <header><h4>This year vs past strong El Niño years</h4><span>Same season, different years</span></header>
          <LineChart labels={S} yMin={-1.5} format={(v) => `${v > 0 ? '+' : ''}${v.toFixed(1)}°`} series={compareSeries} height={240} />
        </section>
        <section className="dcard">
          <header><h4>Seasons by phase, 1950 to now</h4></header>
          <Donut
            items={[
              { label: 'El Niño', value: counts[1], color: '#E0352B' },
              { label: 'Neutral', value: counts[0], color: '#C4CAD6' },
              { label: 'La Niña', value: counts[-1], color: '#1F5FC7' },
            ]}
            format={(v) => `${v}`}
            center={{ value: `${nino} / ${nina}`, label: 'El Niño / La Niña' }}
          />
        </section>
      </div>

      <div className="dgrid dgrid--main">
        <section className="dcard dcard--wide">
          <header>
            <h4>Episodes</h4>
            <div className="enso__controls">
              <div className="fseg" role="radiogroup" aria-label="Episode type">
                {['El Niño', 'La Niña'].map((k) => <button key={k} role="radio" aria-checked={k === kind} onClick={() => setKind(k)}>{k}</button>)}
              </div>
              <label className="fselect"><span>Sort</span>
                <select value={sort} onChange={(e) => setSort(e.target.value)}>
                  <option value="peak">Strongest</option>
                  <option value="length">Longest</option>
                  <option value="recent">Most recent</option>
                </select>
              </label>
            </div>
          </header>
          <div className="enso__table">
            <table className="dtable">
              <thead><tr><th>Period</th><th>Seasons</th><th>Peak</th><th>Strength</th><th /></tr></thead>
              <tbody>
                {episodes.map((e) => (
                  <tr key={e.start} className={focus?.start === e.start ? 'is-on' : ''}>
                    <td>{e.from} – {e.to}</td>
                    <td>{e.seasons}</td>
                    <td style={{ color: e.cls > 0 ? '#C0261D' : '#1F5FC7', fontWeight: 600 }}>{e.peak.anom > 0 ? '+' : ''}{e.peak.anom.toFixed(2)} °C</td>
                    <td><span className={`badge badge--${strength(e.peak.anom).toLowerCase().replace(' ', '-')}`}>{strength(e.peak.anom)}</span></td>
                    <td><button className="linkbtn" onClick={() => { setFocus(e); setDecade(Math.floor(ROWS[e.start].year / 10) * 10); window.scrollTo({ top: Math.max(0, document.querySelector('.enso .oni')?.getBoundingClientRect().top + window.scrollY - 160), behavior: 'smooth' }); }}>Zoom</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <section className="dcard">
          <header><h4>Episodes by strength</h4><span>{kind}</span></header>
          <ul className="bl">
            {['Very strong', 'Strong', 'Moderate', 'Weak'].map((k) => {
              const n = EPISODES.filter((e) => e.type === kind && strength(e.peak.anom) === k).length;
              const max = Math.max(...['Very strong', 'Strong', 'Moderate', 'Weak'].map((kk) => EPISODES.filter((e) => e.type === kind && strength(e.peak.anom) === kk).length));
              return (
                <li key={k}><div className="bl__row" style={{ cursor: 'default' }}>
                  <span className="bl__label">{k}</span>
                  <span className="bl__track"><span className="bl__fill" style={{ width: `${(n / max) * 100}%`, background: kind === 'El Niño' ? '#E0352B' : '#1F5FC7' }} /></span>
                  <span className="bl__val">{n}</span>
                </div></li>
              );
            })}
          </ul>
          <p className="enso__note">Peak ONI: weak 0.5–0.9, moderate 1.0–1.4, strong 1.5–1.9, very strong 2.0 °C and above.</p>
        </section>
      </div>

      <section className="dcard">
        <header>
          <h4>Season-by-season table, {decade}s</h4>
          <div className="fseg" role="radiogroup" aria-label="Decade">
            {Array.from({ length: Math.floor(LAST.year / 10) - 194 }, (_, k) => 1950 + k * 10).map((d) => (
              <button key={d} role="radio" aria-checked={d === decade} onClick={() => setDecade(d)}>{`${String(d).slice(2)}s`}</button>
            ))}
          </div>
        </header>
        <OniGrid decade={decade} />
      </section>

      <p className="enso__source">
        Source: NOAA Climate Prediction Center, Oceanic Niño Index (3-month running mean of ERSST.v5 sea surface temperature
        anomalies in the Niño 3.4 region), {oni.rows.length} seasons from DJF 1950 to {LAST.label}. Episodes follow the historical
        rule of at least five overlapping seasons beyond ±0.5 °C. Since February 2026 NOAA uses the Relative Oceanic Niño Index
        (RONI) for official ENSO status, so official labels can differ from this view.
      </p>
    </div>
  );
}
