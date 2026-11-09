'use client';

import { useEffect, useRef, useState } from 'react';

const stages = [
  { id: 'src', name: 'Sources', detail: 'CRM, ERP, survey app' },
  { id: 'ing', name: 'Ingest', detail: 'Pull new records' },
  { id: 'val', name: 'Validate', detail: 'Run quality checks' },
  { id: 'trn', name: 'Transform', detail: 'dbt models' },
  { id: 'wh', name: 'Warehouse', detail: 'Load clean tables' },
  { id: 'out', name: 'Dashboard', detail: 'Refresh reports' },
];

const logFor = (i, bad, rows) => [
  `Connected to 3 sources`,
  `Ingested ${rows.toLocaleString()} new rows`,
  bad ? `Check failed: 214 rows missing district code` : `All 38 checks passed`,
  `Built 12 models in 41s`,
  `Loaded ${(bad ? rows - 214 : rows).toLocaleString()} rows to warehouse`,
  `Dashboard refreshed for 86 viewers`,
][i];

export default function PipelineRunner() {
  const [bad, setBad] = useState(false);
  const [step, setStep] = useState(-1);
  const [status, setStatus] = useState('idle'); // idle | running | done | held
  const [log, setLog] = useState([]);
  const [rows, setRows] = useState(18420);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const run = () => {
    clearTimeout(timer.current);
    const r = 15000 + Math.floor(Math.random() * 8000);
    setRows(r);
    setLog([]);
    setStatus('running');
    const tick = (i) => {
      setStep(i);
      timer.current = setTimeout(() => {
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        const failed = bad && i === 2;
        setLog((l) => [...l, { time, text: logFor(i, bad, r), tone: failed ? 'warn' : 'ok' }]);
        if (failed) {
          setLog((l) => [...l, { time, text: 'Bad rows quarantined. Alert sent to data team. Clean rows continue.', tone: 'info' }]);
        }
        if (i < stages.length - 1) tick(i + 1);
        else { setStatus(bad ? 'held' : 'done'); setStep(stages.length); }
      }, 650);
    };
    tick(0);
  };

  const stateOf = (i) => {
    if (status === 'idle') return '';
    if (i < step || step === stages.length) return bad && i === 2 ? 'is-warn' : 'is-done';
    if (i === step) return 'is-active';
    return '';
  };

  return (
    <section className="section runner" id="pipeline">
      <div className="container">
        <div className="runner__head">
          <div>
            <h2 className="section__title">Watch a pipeline run</h2>
            <p className="section__lead">
              Every night, data moves from your systems to your dashboards. Run it here, then try
              it with bad data to see how problems get caught before anyone sees them.
            </p>
          </div>
          <div className="runner__controls">
            <label className="switch">
              <input type="checkbox" checked={bad} onChange={(e) => setBad(e.target.checked)} disabled={status === 'running'} />
              <span className="switch__track" aria-hidden="true"><span /></span>
              Include bad data
            </label>
            <button className="btn btn--primary" onClick={run} disabled={status === 'running'}>
              {status === 'running' ? 'Running…' : status === 'idle' ? 'Run pipeline' : 'Run again'}
            </button>
          </div>
        </div>

        <ol className="flow" aria-label="Pipeline stages">
          {stages.map((s, i) => (
            <li key={s.id} className={`flow__stage ${stateOf(i)}`}>
              <span className="flow__dot" aria-hidden="true" />
              <strong>{s.name}</strong>
              <span>{s.detail}</span>
            </li>
          ))}
        </ol>

        <div className="runner__bottom">
          <div className="console" role="log" aria-live="polite">
            <div className="console__bar">nightly_refresh.log</div>
            {log.length === 0 && <p className="console__empty">Press “Run pipeline” to start.</p>}
            {log.map((l, i) => (
              <p key={i} className={`console__line console__line--${l.tone}`}>
                <span>{l.time}</span>{l.text}
              </p>
            ))}
          </div>
          <div className={`runner__result runner__result--${status}`}>
            {status === 'idle' && <><strong>Ready</strong><span>Nothing has run yet.</span></>}
            {status === 'running' && <><strong>Running</strong><span>Stage {Math.min(step + 1, 6)} of 6</span></>}
            {status === 'done' && <><strong>All clear</strong><span>{rows.toLocaleString()} rows loaded. Dashboards are up to date.</span></>}
            {status === 'held' && <><strong>Caught 214 bad rows</strong><span>They were held back, so no wrong numbers reached the dashboard.</span></>}
          </div>
        </div>
      </div>
    </section>
  );
}
