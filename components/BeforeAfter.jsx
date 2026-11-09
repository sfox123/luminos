'use client';

import { useRef, useState } from 'react';
import { SpreadsheetMess, DashboardClean } from './Illustrations.jsx';

export default function BeforeAfter() {
  const [pos, setPos] = useState(50);
  const box = useRef(null);
  const dragging = useRef(false);

  const update = (clientX) => {
    const r = box.current.getBoundingClientRect();
    setPos(Math.max(0, Math.min(100, ((clientX - r.left) / r.width) * 100)));
  };

  return (
    <section className="section ba" id="before-after">
      <div className="container">
        <div className="section__head section__head--center">
          <h2 className="section__title">From spreadsheet chaos to a dashboard you trust</h2>
          <p className="section__lead">Drag the handle to compare a typical monthly report before and after we automate it.</p>
        </div>

        <div
          className="ba__frame"
          ref={box}
          style={{ '--pos': `${pos}%` }}
          onPointerDown={(e) => { dragging.current = true; e.currentTarget.setPointerCapture(e.pointerId); update(e.clientX); }}
          onPointerMove={(e) => dragging.current && update(e.clientX)}
          onPointerUp={() => (dragging.current = false)}
          onPointerCancel={() => (dragging.current = false)}
        >
          <div className="ba__layer"><DashboardClean /></div>
          <div className="ba__layer ba__layer--before"><SpreadsheetMess /></div>
          <span className="ba__tag ba__tag--l">Before<span className="ba__long">: 3 days by hand</span></span>
          <span className="ba__tag ba__tag--r">After<span className="ba__long">: refreshes itself</span></span>
          <div className="ba__handle" aria-hidden="true"><span>⟷</span></div>
          <input
            className="ba__range"
            type="range" min="0" max="100" value={Math.round(pos)}
            onChange={(e) => setPos(Number(e.target.value))}
            aria-label="Compare before and after"
          />
        </div>

        <div className="ba__stats">
          <div><strong>3 days → 0</strong><span>manual work each month</span></div>
          <div><strong>Formula errors → tests</strong><span>checks run before every refresh</span></div>
          <div><strong>One file → one link</strong><span>everyone sees the same numbers</span></div>
        </div>
      </div>
    </section>
  );
}
