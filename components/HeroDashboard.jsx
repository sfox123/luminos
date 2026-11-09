'use client';

import { useState } from 'react';

const views = {
  revenue: {
    tab: 'Revenue',
    title: 'Revenue, last 12 months',
    unit: (v) => `$${(v * 0.022).toFixed(2)}M`,
    line: [38, 42, 40, 47, 52, 49, 58, 63, 61, 70, 76, 84],
    forecast: [84, 88, 93, 97],
    fcLabel: 'ML forecast',
    kpis: [
      { label: 'Monthly revenue', value: '$1.84M', delta: '+10.5%', tone: 'good' },
      { label: 'Churn risk', value: '3.2%', delta: '−0.8 pts', tone: 'good' },
      { label: 'Forecast accuracy', value: '94%', delta: 'last 6 months' },
    ],
    barsTitle: 'By region',
    bars: [['North', 72], ['South', 54], ['East', 88], ['West', 63]],
    q: 'Why did East grow?',
    a: 'Two new distributors started in May.',
  },
  pipelines: {
    tab: 'Pipelines',
    title: 'Rows loaded per day (millions)',
    unit: (v) => `${(v / 10).toFixed(1)}M rows`,
    line: [52, 55, 51, 58, 60, 57, 63, 66, 64, 69, 71, 74],
    forecast: [74, 76, 79, 81],
    fcLabel: 'Capacity trend',
    kpis: [
      { label: 'Job success', value: '99.7%', delta: '14 jobs', tone: 'good' },
      { label: 'Data freshness', value: '12 min', delta: 'target 15 min', tone: 'good' },
      { label: 'Failed checks', value: '2', delta: 'needs review', tone: 'warn' },
    ],
    barsTitle: 'By source',
    bars: [['CRM', 64], ['ERP', 81], ['Survey', 47], ['Web', 92]],
    q: 'What failed overnight?',
    a: 'Two null checks on the survey feed. Rows were held back.',
  },
  ai: {
    tab: 'AI assistant',
    title: 'Questions answered per week',
    unit: (v) => `${Math.round(v * 12)} questions`,
    line: [8, 12, 15, 22, 27, 31, 38, 44, 49, 55, 61, 68],
    forecast: [68, 73, 79, 84],
    fcLabel: 'Projected',
    kpis: [
      { label: 'Answer accuracy', value: '91%', delta: 'on test set', tone: 'good' },
      { label: 'Cost per answer', value: '$0.004', delta: '−38%', tone: 'good' },
      { label: 'Escalated', value: '6%', delta: 'to a person' },
    ],
    barsTitle: 'By team',
    bars: [['Sales', 77], ['Ops', 58], ['Finance', 41], ['HR', 33]],
    q: 'Which reports mention delays?',
    a: 'Four June reports, all about the port backlog.',
  },
};

const W = 360;
const H = 170;
const months = ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];

export default function HeroDashboard() {
  const [key, setKey] = useState('revenue');
  const [hover, setHover] = useState(null);
  const v = views[key];
  const n = v.line.length + v.forecast.length - 1;
  const x = (i) => 10 + (i * (W - 20)) / (n - 1);
  const y = (val) => H - 12 - (val / 100) * (H - 24);
  const path = v.line.map((p, i) => `${i ? 'L' : 'M'}${x(i)},${y(p)}`).join(' ');
  const area = `${path} L${x(v.line.length - 1)},${H - 12} L${x(0)},${H - 12} Z`;
  const fpath = v.forecast.map((p, i) => `${i ? 'L' : 'M'}${x(v.line.length - 1 + i)},${y(p)}`).join(' ');

  const onMove = (e) => {
    const box = e.currentTarget.getBoundingClientRect();
    const px = ((e.clientX - box.left) / box.width) * W;
    const i = Math.round(((px - 10) / (W - 20)) * (n - 1));
    setHover(Math.max(0, Math.min(v.line.length - 1, i)));
  };

  return (
    <figure className="dash" aria-label="Interactive example dashboard">
      <div className="dash__bar">
        <span className="dash__dots"><i /><i /><i /></span>
        <div className="dash__tabs" role="tablist" aria-label="Dashboard view">
          {Object.entries(views).map(([k, val]) => (
            <button key={k} role="tab" aria-selected={k === key} onClick={() => { setKey(k); setHover(null); }}>
              {val.tab}
            </button>
          ))}
        </div>
        <span className="dash__live">Live</span>
      </div>

      <div className="dash__kpis" key={`k-${key}`}>
        {v.kpis.map((k) => (
          <div className="kpi" key={k.label}>
            <span className="kpi__label">{k.label}</span>
            <span className="kpi__value">{k.value}</span>
            <span className={`kpi__delta ${k.tone || ''}`}>{k.delta}</span>
          </div>
        ))}
      </div>

      <div className="dash__main">
        <div className="panel panel--chart">
          <div className="panel__head">
            <span>{v.title}</span>
            <span className="legend">
              <i className="legend__actual" /> Actual <i className="legend__fc" /> {v.fcLabel}
            </span>
          </div>
          <div className="chart__wrap">
            <svg
              viewBox={`0 0 ${W} ${H}`}
              className="chart"
              key={`c-${key}`}
              onMouseMove={onMove}
              onMouseLeave={() => setHover(null)}
              role="img"
              aria-label={`${v.title}, trending upward`}
            >
              <defs>
                <linearGradient id="fill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0" stopColor="#1F3FD8" stopOpacity="0.16" />
                  <stop offset="1" stopColor="#1F3FD8" stopOpacity="0" />
                </linearGradient>
              </defs>
              {[0, 1, 2, 3].map((g) => (
                <line key={g} x1="10" x2={W - 10} y1={12 + g * ((H - 24) / 3)} y2={12 + g * ((H - 24) / 3)} className="chart__grid" />
              ))}
              <path d={area} fill="url(#fill)" className="chart__area" />
              <path d={path} className="chart__line" pathLength="1" />
              <path d={fpath} className="chart__forecast" />
              {hover !== null && (
                <line x1={x(hover)} x2={x(hover)} y1="8" y2={H - 12} className="chart__cursor" />
              )}
              <circle
                cx={x(hover ?? v.line.length - 1)}
                cy={y(v.line[hover ?? v.line.length - 1])}
                r="4.5"
                className="chart__dot"
              />
              <rect x="0" y="0" width={W} height={H} fill="transparent" />
            </svg>
            {hover !== null && (
              <div
                className="chart__tip"
                style={{ left: `${(x(hover) / W) * 100}%`, top: `${(y(v.line[hover]) / H) * 100}%` }}
              >
                <strong>{v.unit(v.line[hover])}</strong>
                <span>{months[hover]}</span>
              </div>
            )}
          </div>
        </div>

        <div className="panel panel--bars" key={`b-${key}`}>
          <div className="panel__head"><span>{v.barsTitle}</span></div>
          <div className="bars">
            {v.bars.map(([label, val], i) => (
              <div className="bars__row" key={label} title={`${label}: ${val}%`}>
                <span>{label}</span>
                <div className="bars__track">
                  <div className="bars__fill" style={{ '--w': `${val}%`, '--d': `${0.2 + i * 0.08}s` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="assistant">
            <span className="assistant__who">Ask your data</span>
            <p>“{v.q}” <span>{v.a}</span></p>
          </div>
        </div>
      </div>
    </figure>
  );
}
