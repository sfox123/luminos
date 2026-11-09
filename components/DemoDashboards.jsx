'use client';

import { useEffect, useMemo, useState } from 'react';
import EnsoDashboard from './EnsoDashboard.jsx';
import { Kpi, LineChart, BarList, Columns, Donut, Gauge, Heatmap, Funnel, fmt, rng } from './charts.jsx';

const MONTHS = ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];
const WEEKS = Array.from({ length: 12 }, (_, i) => `W${i + 27}`);
const walk = (r, n, start, drift, noise) => {
  const out = [];
  let v = start;
  for (let i = 0; i < n; i++) { v = v * (1 + drift + (r() - 0.5) * noise); out.push(v); }
  return out;
};

/* ---------------- 1. Sales ---------------- */
const REGIONS = ['All regions', 'Western', 'Central', 'Southern', 'Northern', 'Eastern'];
function Sales() {
  const [region, setRegion] = useState('All regions');
  const [range, setRange] = useState(12);
  const [product, setProduct] = useState(null);

  const d = useMemo(() => {
    const r = rng(region + product);
    const scale = region === 'All regions' ? 1 : 0.15 + r() * 0.2;
    const pscale = product ? 0.22 + r() * 0.15 : 1;
    const actual = walk(r, 12, 1.2e6 * scale * pscale, 0.03, 0.12);
    const target = actual.map((_, i) => 1.25e6 * scale * pscale * (1 + i * 0.028));
    const r2 = rng(region);
    const products = ['Beverages', 'Snacks', 'Dairy', 'Household', 'Personal care'].map((p, i) => ({
      label: p, value: (4e6 - i * 6e5) * scale * (0.7 + r2() * 0.6), color: ['#2447E0', '#12A9D6', '#7A3FD8', '#E84A7F', '#F2A33A'][i],
    })).sort((a, b) => b.value - a.value);
    const customers = ['Lanka Mart', 'Island Foods', 'Hill Country Stores', 'Coastal Traders', 'Metro Retail'].map((c) => ({
      name: c, revenue: 3e5 * scale * pscale * (0.5 + r()), growth: (r() - 0.3) * 30,
    })).sort((a, b) => b.revenue - a.revenue);
    return { actual: actual.slice(-range), target: target.slice(-range), labels: MONTHS.slice(-range), products, customers };
  }, [region, range, product]);

  const total = d.actual.reduce((a, b) => a + b, 0);
  const tgt = d.target.reduce((a, b) => a + b, 0);
  const growth = (d.actual.at(-1) / d.actual[0] - 1) * 100;

  return (
    <>
      <Filters>
        <Select label="Region" value={region} options={REGIONS} onChange={setRegion} />
        <Segment label="Period" value={range} options={[[3, '3M'], [6, '6M'], [12, '12M']]} onChange={setRange} />
        {product && <button className="clear" onClick={() => setProduct(null)}>Product: {product} ✕</button>}
      </Filters>
      <div className="dgrid dgrid--4">
        <Kpi label="Revenue" value={fmt.money(total)} delta={`${growth >= 0 ? '+' : ''}${growth.toFixed(1)}%`} good={growth >= 0} spark={d.actual} />
        <Kpi label="vs target" value={`${((total / tgt) * 100).toFixed(0)}%`} delta={total >= tgt ? 'Ahead' : 'Behind'} good={total >= tgt} color="#12A9D6" />
        <Kpi label="Avg order value" value={fmt.money(total / 9400)} delta="+4.2%" color="#7A3FD8" />
        <Kpi label="Active customers" value={fmt.num(1840 * (region === 'All regions' ? 1 : .2))} delta="+86" color="#E84A7F" />
      </div>
      <div className="dgrid dgrid--main">
        <Card title="Revenue vs target" wide>
          <LineChart labels={d.labels} format={fmt.money} series={[
            { name: 'Revenue', values: d.actual, color: '#2447E0', area: true },
            { name: 'Target', values: d.target, color: '#F2A33A', dashed: true },
          ]} />
        </Card>
        <Card title="Revenue by product" hint="Click a bar to filter">
          <BarList items={d.products} format={fmt.money} onSelect={setProduct} selected={product} />
        </Card>
      </div>
      <Card title="Top customers">
        <table className="dtable">
          <thead><tr><th>Customer</th><th>Revenue</th><th>Growth</th><th>Share</th></tr></thead>
          <tbody>
            {d.customers.map((c) => (
              <tr key={c.name}>
                <td>{c.name}</td>
                <td>{fmt.money(c.revenue)}</td>
                <td className={c.growth >= 0 ? 'up' : 'down'}>{c.growth >= 0 ? '▲' : '▼'} {Math.abs(c.growth).toFixed(1)}%</td>
                <td><span className="minibar"><i style={{ width: `${(c.revenue / d.customers[0].revenue) * 100}%` }} /></span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </>
  );
}

/* ---------------- 2. Field operations ---------------- */
const DISTRICTS = ['Colombo', 'Kandy', 'Galle', 'Jaffna', 'Batticaloa', 'Anuradhapura', 'Badulla', 'Ratnapura'];
function Operations() {
  const [programme, setProgramme] = useState('All programmes');
  const [district, setDistrict] = useState(null);
  const d = useMemo(() => {
    const r = rng(programme + district);
    const f = district ? 0.14 : 1;
    const planned = WEEKS.map(() => 5200 * f * (0.9 + r() * 0.2));
    const delivered = planned.map((p, i) => p * (0.78 + r() * 0.2 + i * 0.006));
    const r2 = rng(programme);
    const byDistrict = DISTRICTS.map((n) => ({ label: n, value: 800 + r2() * 3200 }))
      .sort((a, b) => b.value - a.value)
      .map((x, i) => ({ ...x, color: i < 3 ? '#12A9D6' : '#9ADCF0' }));
    const onTime = 82 + r() * 14;
    const stock = 55 + r() * 35;
    const modes = [
      { label: 'Truck', value: 58 + r() * 10, color: '#2447E0' },
      { label: 'Partner NGO', value: 20 + r() * 8, color: '#12A9D6' },
      { label: 'Rail', value: 8 + r() * 6, color: '#7A3FD8' },
      { label: 'Other', value: 4 + r() * 4, color: '#F2A33A' },
    ];
    const alerts = [
      ['Badulla', 'Road closure delayed 2 trucks', 'warn'],
      ['Jaffna', 'Stock below 2-week threshold', 'bad'],
      ['Galle', 'Survey sync completed', 'ok'],
    ];
    return { planned, delivered, byDistrict, onTime, stock, modes, alerts };
  }, [programme, district]);
  const del = d.delivered.reduce((a, b) => a + b, 0);
  const pl = d.planned.reduce((a, b) => a + b, 0);
  return (
    <>
      <Filters>
        <Select label="Programme" value={programme} options={['All programmes', 'School meals', 'Nutrition support', 'Emergency response']} onChange={setProgramme} />
        {district && <button className="clear" onClick={() => setDistrict(null)}>District: {district} ✕</button>}
        <span className="sample">Sample data</span>
      </Filters>
      <div className="dgrid dgrid--4">
        <Kpi label="Rations delivered" value={fmt.num(del)} delta={`${((del / pl) * 100).toFixed(0)}% of plan`} good={del / pl > 0.85} spark={d.delivered} color="#12A9D6" />
        <Kpi label="On-time deliveries" value={fmt.pct(d.onTime)} delta="+2.1 pts" color="#2447E0" />
        <Kpi label="Field reports synced" value={fmt.num(2310 * (district ? .15 : 1))} delta="Last sync 9 min ago" color="#7A3FD8" />
        <Kpi label="Open alerts" value="3" delta="1 critical" good={false} color="#E84A7F" />
      </div>
      <div className="dgrid dgrid--main">
        <Card title="Weekly deliveries: planned vs delivered" wide>
          <LineChart labels={WEEKS} series={[
            { name: 'Delivered', values: d.delivered, color: '#12A9D6', area: true },
            { name: 'Planned', values: d.planned, color: '#101828', dashed: true },
          ]} />
        </Card>
        <Card title="Deliveries by district" hint="Click to filter">
          <BarList items={d.byDistrict} onSelect={setDistrict} selected={district} />
        </Card>
      </div>
      <div className="dgrid dgrid--3">
        <Card title="Warehouse stock level"><Gauge value={d.stock} label="of capacity" target={60} color={d.stock < 60 ? '#F2A33A' : '#12A9D6'} /></Card>
        <Card title="Transport mode"><Donut items={d.modes} format={(v) => `${v.toFixed(0)}%`} center={{ value: '4', label: 'modes' }} /></Card>
        <Card title="Latest alerts">
          <ul className="alerts">
            {d.alerts.map(([w, t, s]) => <li key={t} className={`alerts__${s}`}><b>{w}</b>{t}</li>)}
          </ul>
        </Card>
      </div>
    </>
  );
}

/* ---------------- 3. Marketing ---------------- */
function Marketing() {
  const [channel, setChannel] = useState('All channels');
  const d = useMemo(() => {
    const r = rng(channel);
    const f = channel === 'All channels' ? 1 : 0.3 + r() * 0.2;
    const v = 120000 * f;
    const funnel = [
      { label: 'Visitors', value: v },
      { label: 'Sign-ups', value: v * (0.12 + r() * 0.04) },
    ];
    funnel.push({ label: 'Activated', value: funnel[1].value * (0.55 + r() * 0.15) });
    funnel.push({ label: 'Paying', value: funnel[2].value * (0.25 + r() * 0.1) });
    const channels = [
      { label: 'Search', value: 42, color: '#2447E0' },
      { label: 'Social', value: 27, color: '#E84A7F' },
      { label: 'Email', value: 18, color: '#7A3FD8' },
      { label: 'Referral', value: 13, color: '#12A9D6' },
    ];
    const cohorts = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];
    const heat = cohorts.map((_, ri) => Array.from({ length: 6 }, (_, ci) => (ci === 0 ? 100 : ci >= 6 - ri ? null : Math.round(100 * Math.pow(0.78 + r() * 0.08, ci)))));
    const spend = MONTHS.slice(-6).map((m) => ({ label: m, value: 8000 * f * (0.8 + r() * 0.5), color: '#E84A7F' }));
    return { funnel, channels, cohorts, heat, spend };
  }, [channel]);
  const cac = d.spend.reduce((a, b) => a + b.value, 0) / d.funnel[3].value;
  return (
    <>
      <Filters>
        <Segment label="Channel" value={channel} options={['All channels', 'Search', 'Social', 'Email'].map((c) => [c, c.replace(' channels', '')])} onChange={setChannel} />
      </Filters>
      <div className="dgrid dgrid--4">
        <Kpi label="Visitors" value={fmt.num(d.funnel[0].value)} delta="+12%" color="#2447E0" spark={[3, 4, 3.6, 5, 5.4, 6, 6.8]} />
        <Kpi label="Conversion" value={fmt.pct((d.funnel[3].value / d.funnel[0].value) * 100)} delta="+0.3 pts" color="#7A3FD8" />
        <Kpi label="Cost per customer" value={fmt.money(cac)} delta="−9%" color="#E84A7F" />
        <Kpi label="Month-3 retention" value={fmt.pct(d.heat[0][3] ?? 0)} delta="+4 pts" color="#12A9D6" />
      </div>
      <div className="dgrid dgrid--2">
        <Card title="Conversion funnel"><Funnel steps={d.funnel} /></Card>
        <Card title="Traffic by channel"><Donut items={d.channels} format={(v) => `${v}%`} center={{ value: fmt.num(d.funnel[0].value / 1000) + 'K', label: 'visitors' }} /></Card>
      </div>
      <div className="dgrid dgrid--main">
        <Card title="Retention by sign-up month" hint="Hover a cell" wide>
          <Heatmap rows={d.cohorts} cols={['M0', 'M1', 'M2', 'M3', 'M4', 'M5']} values={d.heat} color={[122, 63, 216]} />
        </Card>
        <Card title="Ad spend, last 6 months"><Columns items={d.spend} format={fmt.money} /></Card>
      </div>
    </>
  );
}

/* ---------------- 4. ML monitoring ---------------- */
function Models() {
  const [model, setModel] = useState('Demand forecast v3');
  const [drift, setDrift] = useState(false);
  const d = useMemo(() => {
    const r = rng(model);
    const acc = WEEKS.map((_, i) => 92 + r() * 3 - (drift && i > 7 ? (i - 7) * 2.6 : 0));
    const base = acc.map(() => 90);
    const features = ['Past sales', 'Season', 'Price', 'Promotions', 'Weather', 'Holidays'].map((f, i) => ({
      label: f, value: (40 - i * 6) * (0.7 + r() * 0.6), color: drift && f === 'Weather' ? '#E84A7F' : '#7A3FD8',
    })).sort((a, b) => b.value - a.value);
    const dist = ['0–10', '10–20', '20–30', '30–40', '40–50', '50+'].map((l, i) => ({
      label: l, value: Math.round((drift ? [5, 9, 14, 20, 26, 26] : [8, 18, 28, 24, 14, 8])[i] * (0.9 + r() * 0.2)), color: drift && i > 3 ? '#E84A7F' : '#12A9D6',
    }));
    return { acc, base, features, dist };
  }, [model, drift]);
  const latest = d.acc.at(-1);
  return (
    <>
      <Filters>
        <Select label="Model" value={model} options={['Demand forecast v3', 'Churn classifier v7', 'Fraud detector v2']} onChange={setModel} />
        <label className="switch">
          <input type="checkbox" checked={drift} onChange={(e) => setDrift(e.target.checked)} />
          <span className="switch__track" aria-hidden="true"><span /></span>
          Simulate data drift
        </label>
      </Filters>
      <div className="dgrid dgrid--4">
        <Kpi label="Accuracy (this week)" value={fmt.pct(latest)} delta={latest < 90 ? 'Below threshold' : 'Healthy'} good={latest >= 90} color={latest < 90 ? '#E84A7F' : '#11845B'} spark={d.acc} />
        <Kpi label="Predictions served" value="1.2M" delta="+8%" color="#2447E0" />
        <Kpi label="p95 latency" value="84 ms" delta="Within SLA" color="#12A9D6" />
        <Kpi label="Drift score" value={drift ? '0.41' : '0.06'} delta={drift ? 'Retrain suggested' : 'Stable'} good={!drift} color="#7A3FD8" />
      </div>
      {drift && <div className="banner">Accuracy has dropped for 4 weeks. The weather feature has shifted, so a retraining job has been queued.</div>}
      <div className="dgrid dgrid--main">
        <Card title="Weekly accuracy vs threshold" wide>
          <LineChart labels={WEEKS} yMin={60} format={(v) => `${v.toFixed(0)}%`} series={[
            { name: 'Accuracy', values: d.acc, color: drift ? '#E84A7F' : '#7A3FD8', area: true },
            { name: 'Threshold', values: d.base, color: '#101828', dashed: true },
          ]} />
        </Card>
        <Card title="What drives predictions"><BarList items={d.features} format={(v) => v.toFixed(0)} /></Card>
      </div>
      <Card title="Prediction distribution (units per store)"><Columns items={d.dist} format={(v) => `${v}%`} height={160} /></Card>
    </>
  );
}

/* ---------------- Shell ---------------- */
function Filters({ children }) { return <div className="filters">{children}</div>; }
function Card({ title, hint, wide, children }) {
  return (
    <section className={`dcard ${wide ? 'dcard--wide' : ''}`}>
      <header><h4>{title}</h4>{hint && <span>{hint}</span>}</header>
      {children}
    </section>
  );
}
function Select({ label, value, options, onChange }) {
  return (
    <label className="fselect">
      <span>{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
    </label>
  );
}
function Segment({ label, value, options, onChange }) {
  return (
    <div className="fseg" role="radiogroup" aria-label={label}>
      {options.map(([v, l]) => (
        <button key={v} role="radio" aria-checked={v === value} onClick={() => onChange(v)}>{l}</button>
      ))}
    </div>
  );
}

const demos = [
  { id: 'enso', name: 'El Niño monitor', tag: 'Real NOAA data', color: '#E0352B', icon: '☀', C: EnsoDashboard },
  { id: 'sales', name: 'Sales performance', tag: 'Power BI style', color: '#2447E0', icon: '▲', C: Sales },
  { id: 'ops', name: 'Field operations', tag: 'Humanitarian logistics', color: '#12A9D6', icon: '◆', C: Operations },
  { id: 'mkt', name: 'Marketing funnel', tag: 'Growth analytics', color: '#E84A7F', icon: '●', C: Marketing },
  { id: 'ml', name: 'Model monitoring', tag: 'ML in production', color: '#7A3FD8', icon: '◎', C: Models },
];

export default function DemoDashboards({ active, setActive }) {
  const [full, setFull] = useState(false);
  useEffect(() => {
    if (!full) return;
    const onKey = (e) => e.key === 'Escape' && setFull(false);
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); };
  }, [full]);
  const demo = demos.find((d) => d.id === active);
  const Comp = demo.C;
  const time = new Date().toLocaleDateString([], { day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <section className="section demos" id="demos">
      <div className="container">
        <div className="section__head">
          <h2 className="section__title">Try our demo dashboards</h2>
          <p className="section__lead">
            Four working examples of what we build. Change the filters, click the bars and hover the
            charts. All figures are sample data.
          </p>
        </div>

        <div className="demos__tabs" role="tablist" aria-label="Demo dashboards">
          {demos.map((d) => (
            <button key={d.id} role="tab" aria-selected={d.id === active} style={{ '--c': d.color }} onClick={() => setActive(d.id)}>
              <span className="demos__icon" aria-hidden="true">{d.icon}</span>
              <span><strong>{d.name}</strong><small>{d.tag}</small></span>
            </button>
          ))}
        </div>

        <div className={`board ${full ? 'board--full' : ''}`} style={{ '--c': demo.color }} role="tabpanel">
          <div className="board__bar">
            <span className="board__dots"><i /><i /><i /></span>
            <strong>{demo.name}</strong>
            <span className="board__meta">Updated {time}</span>
            <button className="board__btn" onClick={() => setFull((f) => !f)}>{full ? 'Close' : 'Full screen'}</button>
          </div>
          <div className="board__body" key={demo.id}>
            <Comp />
          </div>
        </div>
      </div>
    </section>
  );
}
