'use client';

// Hand-drawn SVG illustrations. To use real photos instead, pass `src` to <Picture>.
const SKIN = ['#C68B59', '#8D5A3B', '#E0AC7E'];
const HAIR = '#2B1B14';

function Person({ x, y, s = 1, shirt = '#1F3FD8', skin = SKIN[0], back = false, hair = HAIR, long = false }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x="-17" y="18" width="34" height="46" rx="14" fill={shirt} />
      {long && <path d="M-13 -2 Q-16 22 -9 30 L9 30 Q16 22 13 -2 Z" fill={hair} />}
      <circle cx="0" cy="4" r="13" fill={back ? hair : skin} />
      {!back && <path d="M-13 3 Q-12 -12 0 -10 Q12 -12 13 3 Q8 -4 0 -4 Q-8 -4 -13 3Z" fill={hair} />}
    </g>
  );
}

export function FieldSurvey() {
  return (
    <svg viewBox="0 0 400 260" role="img" aria-label="Illustration of a field officer collecting survey data on a tablet in a paddy field">
      <defs>
        <linearGradient id="fs-sky" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#E3F1FB" /><stop offset="1" stopColor="#F7FBFE" />
        </linearGradient>
      </defs>
      <rect width="400" height="260" fill="url(#fs-sky)" />
      <circle cx="330" cy="54" r="22" fill="#F7C35F" />
      <path d="M0 150 Q70 100 140 135 T290 120 T400 130 V260 H0Z" fill="#B9DCC4" />
      <path d="M0 170 Q100 145 200 165 T400 160 V260 H0Z" fill="#8CCB9E" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <path key={i} d={`M-10 ${190 + i * 14} Q200 ${178 + i * 14} 410 ${190 + i * 14}`} stroke="#6DB684" strokeWidth="3" fill="none" strokeDasharray="4 7" />
      ))}
      {[[46, 128], [78, 118], [352, 118]].map(([x, y], i) => (
        <g key={i} transform={`translate(${x} ${y})`}>
          <path d="M0 0 Q3 -30 -2 -58" stroke="#8A6A45" strokeWidth="4" fill="none" />
          <path d="M-2 -58 q-22 -4 -30 8 M-2 -58 q20 -8 30 4 M-2 -58 q-12 -16 -26 -12 M-2 -58 q10 -18 24 -14 M-2 -58 q2 -18 -4 -26" stroke="#3E9A5F" strokeWidth="5" strokeLinecap="round" fill="none" />
        </g>
      ))}
      <g transform="translate(250 64)">
        <rect x="-4" y="-4" width="74" height="42" rx="12" fill="#fff" stroke="#D5E4F1" />
        <path d="M14 22 q0 -12 12 -12 q4 -10 16 -6 q10 0 10 10 q8 0 8 8 H14Z" fill="#0A6EB4" opacity=".85" />
        <path d="M33 26 v-8 m-4 4 l4 -4 l4 4" stroke="#fff" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      </g>
      <g className="ill-waves" stroke="#0A6EB4" strokeWidth="2.5" fill="none" strokeLinecap="round">
        <path d="M200 118 q10 -10 20 -20" /><path d="M206 128 q18 -18 36 -36" opacity=".6" /><path d="M214 138 q24 -26 44 -46" opacity=".35" />
      </g>
      <Person x={170} y={146} s={1.35} shirt="#0A6EB4" skin={SKIN[1]} long />
      <path d="M145 200 h50" stroke="#1B3A5C" strokeWidth="6" strokeLinecap="round" opacity=".15" />
      <g transform="translate(176 160) rotate(-12)">
        <rect x="0" y="0" width="34" height="26" rx="4" fill="#1B2A3F" />
        <rect x="3" y="3" width="28" height="20" rx="2" fill="#fff" />
        <rect x="6" y="15" width="4" height="5" fill="#0A6EB4" /><rect x="12" y="11" width="4" height="9" fill="#0A6EB4" /><rect x="18" y="7" width="4" height="13" fill="#F2A33A" /><rect x="24" y="10" width="4" height="10" fill="#0A6EB4" />
      </g>
    </svg>
  );
}

export function TeamReview() {
  return (
    <svg viewBox="0 0 400 260" role="img" aria-label="Illustration of a team reviewing a dashboard on a meeting room screen">
      <rect width="400" height="260" fill="#F2F6FC" />
      <rect x="0" y="196" width="400" height="64" fill="#E4EAF4" />
      <rect x="298" y="30" width="70" height="92" rx="4" fill="#fff" stroke="#D9E1EE" />
      <path d="M308 44 h50 M308 56 h40 M308 68 h46" stroke="#D9E1EE" strokeWidth="4" strokeLinecap="round" />
      <g transform="translate(330 150)">
        <rect x="-10" y="0" width="20" height="40" rx="4" fill="#fff" stroke="#D9E1EE" />
        <path d="M0 0 q-24 -18 -14 -40 M0 0 q20 -20 12 -44 M0 0 q-4 -26 2 -48" stroke="#3E9A5F" strokeWidth="6" strokeLinecap="round" fill="none" />
      </g>
      <rect x="40" y="26" width="220" height="130" rx="10" fill="#1B2A3F" />
      <rect x="48" y="34" width="204" height="114" rx="4" fill="#fff" />
      <rect x="58" y="44" width="56" height="26" rx="4" fill="#EEF2FF" /><rect x="120" y="44" width="56" height="26" rx="4" fill="#E6F5F5" /><rect x="182" y="44" width="60" height="26" rx="4" fill="#FDF1E3" />
      <path d="M64 52 h24 M64 62 h36 M126 52 h24 M126 62 h30 M188 52 h24 M188 62 h36" stroke="#8A94A6" strokeWidth="3" strokeLinecap="round" />
      <path d="M60 134 L82 124 L100 128 L122 110 L144 114 L166 96 L186 100" stroke="#1B8FD6" strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M186 100 L206 90" stroke="#F2A33A" strokeWidth="3.5" strokeDasharray="4 4" strokeLinecap="round" />
      <rect x="214" y="96" width="8" height="40" rx="2" fill="#1B8FD6" /><rect x="226" y="108" width="8" height="28" rx="2" fill="#0E8F8F" /><rect x="238" y="84" width="8" height="52" rx="2" fill="#1F3FD8" />
      <rect x="146" y="156" width="8" height="18" fill="#1B2A3F" />
      <rect x="30" y="196" width="340" height="12" rx="6" fill="#C9D3E3" />
      <Person x={90} y={170} s={1.1} shirt="#1B8FD6" back />
      <Person x={160} y={176} s={1.05} shirt="#0E8F8F" back long />
      <Person x={232} y={170} s={1.1} shirt="#D8365A" back />
      <g transform="translate(262 176)">
        <path d="M0 20 l6 -24 h40 l-6 24 z" fill="#8A94A6" />
        <rect x="-4" y="18" width="52" height="4" rx="2" fill="#6B7689" />
      </g>
      <g className="ill-pointer" transform="translate(166 92)">
        <circle r="10" fill="#F2A33A" opacity=".25" />
        <circle r="4" fill="#F2A33A" />
      </g>
    </svg>
  );
}

function Frame({ bg, children, label }) {
  return (
    <svg viewBox="0 0 400 220" preserveAspectRatio="xMidYMid slice" role="img" aria-label={label}>
      <rect width="400" height="220" fill={bg} />
      <g opacity=".5">
        {Array.from({ length: 9 }).map((_, i) => <circle key={i} cx={30 + i * 44} cy="200" r="1.8" fill="#9AA5B8" />)}
      </g>
      {children}
    </svg>
  );
}

export function ServiceScene({ id }) {
  switch (id) {
    case 'dashboards':
      return (
        <Frame bg="#EEF2FF" label="Illustration of a monitor showing a dashboard">
          <rect x="90" y="24" width="220" height="140" rx="10" fill="#1B2A3F" />
          <rect x="98" y="32" width="204" height="118" rx="4" fill="#fff" />
          <rect x="106" y="40" width="44" height="12" rx="3" fill="#1F3FD8" />
          {[0, 1, 2].map((i) => <rect key={i} x={106 + i * 66} y="60" width="58" height="30" rx="4" fill="#F3F5FB" />)}
          <path d="M112 80 h22 M178 80 h30 M244 80 h26" stroke="#1F3FD8" strokeWidth="5" strokeLinecap="round" />
          <path d="M108 138 L140 124 L164 128 L196 108 L220 112 L246 100" stroke="#1F3FD8" strokeWidth="3" fill="none" strokeLinecap="round" />
          {[0, 1, 2, 3].map((i) => <rect key={i} x={258 + i * 10} y={140 - (18 + i * 7)} width="6" height={18 + i * 7} rx="1.5" fill={i === 3 ? '#F2A33A' : '#94A8FA'} />)}
          <rect x="186" y="164" width="28" height="18" fill="#1B2A3F" /><rect x="160" y="180" width="80" height="6" rx="3" fill="#1B2A3F" />
          <path className="ill-pointer" d="M232 110 l0 22 l6 -6 l5 10 l4 -2 l-5 -10 l8 0z" fill="#101828" stroke="#fff" strokeWidth="1.5" />
        </Frame>
      );
    case 'analytics':
      return (
        <Frame bg="#E6F5F5" label="Illustration of a magnifying glass over a scatter plot">
          <rect x="70" y="30" width="200" height="150" rx="10" fill="#fff" stroke="#CDE7E7" />
          <path d="M90 160 H250 M90 160 V46" stroke="#B8CCCC" strokeWidth="2" />
          {[[104, 146], [118, 138], [128, 142], [140, 126], [152, 130], [164, 116], [176, 120], [188, 104], [200, 108], [212, 92], [224, 96], [236, 78], [148, 110], [196, 132]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="4.5" fill={i > 11 ? '#F2A33A' : '#0E8F8F'} opacity=".85" />
          ))}
          <path d="M98 152 L242 76" stroke="#101828" strokeWidth="2.5" strokeDasharray="6 5" />
          <g className="ill-float" transform="translate(272 112)">
            <circle r="38" fill="#fff" fillOpacity=".55" stroke="#101828" strokeWidth="8" />
            <path d="M27 27 L58 58" stroke="#101828" strokeWidth="12" strokeLinecap="round" />
            <path d="M-16 8 l10 -10 l8 6 l14 -18" stroke="#0E8F8F" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </Frame>
      );
    case 'engineering':
      return (
        <Frame bg="#FDF1E3" label="Illustration of data moving through pipes into a database">
          {[[40, 40, '#fff'], [40, 90, '#fff'], [40, 140, '#fff']].map(([x, y], i) => (
            <g key={i}>
              <rect x={x} y={y} width="56" height="36" rx="6" fill="#fff" stroke="#EBCFA8" />
              <path d={`M${x + 10} ${y + 12} h28 M${x + 10} ${y + 22} h20`} stroke="#C9730F" strokeWidth="3" strokeLinecap="round" />
            </g>
          ))}
          <path d="M96 58 H150 Q170 58 170 78 V100 M96 108 H170 M96 158 H150 Q170 158 170 138 V116" stroke="#E6C49A" strokeWidth="10" fill="none" />
          <path d="M170 108 H270" stroke="#E6C49A" strokeWidth="14" />
          <g className="ill-flow">
            {[0, 1, 2, 3].map((i) => <circle key={i} cx={180 + i * 26} cy="108" r="4" fill="#C9730F" />)}
          </g>
          <rect x="156" y="88" width="30" height="40" rx="6" fill="#fff" stroke="#C9730F" strokeWidth="2.5" />
          <path d="M164 108 l5 5 l9 -11" stroke="#11845B" strokeWidth="3" fill="none" strokeLinecap="round" />
          <g transform="translate(280 60)">
            <path d="M0 14 V86 Q40 104 80 86 V14" fill="#fff" stroke="#C9730F" strokeWidth="3" />
            <ellipse cx="40" cy="14" rx="40" ry="14" fill="#FBE3C4" stroke="#C9730F" strokeWidth="3" />
            <path d="M0 40 Q40 58 80 40 M0 64 Q40 82 80 64" stroke="#C9730F" strokeWidth="3" fill="none" />
          </g>
        </Frame>
      );
    case 'ml':
      return (
        <Frame bg="#F1EBFD" label="Illustration of a neural network producing a prediction">
          {(() => {
            const layers = [[60, [60, 100, 140]], [140, [44, 82, 120, 158]], [220, [70, 130]]];
            const lines = [];
            for (let l = 0; l < layers.length - 1; l++)
              for (const a of layers[l][1]) for (const b of layers[l + 1][1])
                lines.push(<path key={`${l}${a}${b}`} d={`M${layers[l][0]} ${a} L${layers[l + 1][0]} ${b}`} stroke="#C7B3F2" strokeWidth="1.8" />);
            return (
              <g>
                {lines}
                {layers.map(([x, ys], l) => ys.map((y) => <circle key={`${l}${y}`} className="ill-node" cx={x} cy={y} r="11" fill="#fff" stroke="#7A3FD8" strokeWidth="3" style={{ animationDelay: `${l * .3 + y / 400}s` }} />))}
              </g>
            );
          })()}
          <path d="M231 100 H262" stroke="#7A3FD8" strokeWidth="3" strokeDasharray="4 4" />
          <rect x="266" y="44" width="110" height="112" rx="10" fill="#fff" stroke="#DCCBF7" />
          <path d="M278 136 L298 124 L314 128 L330 106" stroke="#101828" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M330 106 L346 92 L362 76" stroke="#7A3FD8" strokeWidth="3" strokeDasharray="4 4" strokeLinecap="round" />
          <path d="M330 106 L362 64 L362 90Z" fill="#7A3FD8" opacity=".12" />
          <rect x="278" y="54" width="40" height="8" rx="4" fill="#7A3FD8" />
        </Frame>
      );
    case 'ai':
    default:
      return (
        <Frame bg="#FCEBF0" label="Illustration of an AI assistant answering from company documents">
          {[0, 1, 2].map((i) => (
            <g key={i} transform={`translate(${46 + i * 10} ${40 + i * 10})`}>
              <rect width="86" height="110" rx="6" fill="#fff" stroke="#F1C3D0" />
              <path d="M12 18 h50 M12 32 h62 M12 44 h56 M12 56 h40" stroke="#E7A6B8" strokeWidth="3" strokeLinecap="round" />
            </g>
          ))}
          <path d="M150 110 C176 110 176 80 200 80" stroke="#D8365A" strokeWidth="2.5" strokeDasharray="4 4" fill="none" />
          <g className="ill-bubble">
            <rect x="200" y="40" width="160" height="40" rx="14" fill="#101828" />
            <path d="M214 56 h90 M214 66 h60" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity=".8" />
          </g>
          <g className="ill-bubble ill-bubble--2">
            <rect x="176" y="96" width="184" height="64" rx="14" fill="#fff" stroke="#F1C3D0" />
            <path d="M192 114 h120 M192 126 h140 M192 138 h96" stroke="#D8365A" strokeWidth="3" strokeLinecap="round" />
            <rect x="300" y="134" width="44" height="14" rx="7" fill="#FCEBF0" />
            <path d="M308 141 h28" stroke="#D8365A" strokeWidth="2" strokeLinecap="round" />
          </g>
          <circle cx="180" cy="176" r="14" fill="#D8365A" />
          <path d="M173 176 l4 4 l9 -9" stroke="#fff" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </Frame>
      );
  }
}

export function SpreadsheetMess() {
  const rows = 8, cols = 6;
  const vals = ['12,480', '#REF!', '9,310', '??', '11,002', '8,4O0', '#N/A', '10,115', '7,990', 'see tab 3', '13,020', '—'];
  return (
    <svg viewBox="0 0 600 340" preserveAspectRatio="xMidYMid slice" role="img" aria-label="A messy spreadsheet with errors and inconsistent values">
      <rect width="600" height="340" fill="#fff" />
      <rect width="600" height="30" fill="#EAF3EC" />
      <text x="16" y="20" fontSize="12" fill="#1E6B3A" fontFamily="system-ui" fontWeight="600">Monthly_Report_FINAL_v7_(2).xlsx</text>
      {Array.from({ length: rows }).map((_, r) => (
        Array.from({ length: cols }).map((_, c) => {
          const x = 40 + c * 92, y = 44 + r * 34, v = vals[(r * 5 + c * 3) % vals.length];
          const bad = r > 0 && /[#?O—]|see/.test(v);
          return (
            <g key={`${r}-${c}`}>
              <rect x={x} y={y} width="92" height="34" fill={bad ? '#FDECEC' : (r === 0 ? '#F3F4F6' : '#fff')} stroke="#D9DEE5" />
              <text x={x + 84} y={y + 22} fontSize="12" textAnchor="end" fill={bad ? '#C8324F' : '#344054'} fontFamily="ui-monospace, monospace">{r === 0 ? ['Region', 'Jan', 'Feb', 'Mar', 'Apr', 'Total'][c] : v}</text>
            </g>
          );
        })
      ))}
      {Array.from({ length: rows }).map((_, r) => <text key={r} x="24" y={66 + r * 34} fontSize="11" fill="#98A2B3" textAnchor="middle" fontFamily="system-ui">{r + 1}</text>)}
      <g transform="translate(396 196) rotate(4)">
        <rect width="170" height="86" fill="#FFF3B0" />
        <text x="12" y="26" fontSize="13" fill="#5B4B00" fontFamily="'Comic Sans MS', cursive">Don't touch col F!!</text>
        <text x="12" y="48" fontSize="13" fill="#5B4B00" fontFamily="'Comic Sans MS', cursive">Ask Ruwan re: March</text>
        <text x="12" y="70" fontSize="13" fill="#5B4B00" fontFamily="'Comic Sans MS', cursive">~3 days to update</text>
      </g>
    </svg>
  );
}

export function DashboardClean() {
  const bars = [62, 78, 54, 90, 70, 84];
  return (
    <svg viewBox="0 0 600 340" preserveAspectRatio="xMidYMid slice" role="img" aria-label="A clean dashboard with key figures and charts">
      <rect width="600" height="340" fill="#F6F8FC" />
      <rect width="600" height="30" fill="#fff" />
      <rect x="16" y="9" width="12" height="12" rx="3" fill="#1F3FD8" />
      <text x="36" y="20" fontSize="12" fill="#101828" fontFamily="system-ui" fontWeight="600">Monthly performance · refreshed 6 min ago</text>
      {[['Total', '1.84M', '#1F3FD8'], ['Growth', '+10.5%', '#11845B'], ['Data quality', '99.7%', '#0E8F8F']].map(([l, v, c], i) => (
        <g key={l} transform={`translate(${20 + i * 190} 44)`}>
          <rect width="176" height="70" rx="10" fill="#fff" stroke="#E4E8F0" />
          <text x="14" y="24" fontSize="11" fill="#6B7689" fontFamily="system-ui">{l}</text>
          <text x="14" y="52" fontSize="24" fontWeight="700" fill={c} fontFamily="system-ui">{v}</text>
        </g>
      ))}
      <g transform="translate(20 128)">
        <rect width="366" height="196" rx="10" fill="#fff" stroke="#E4E8F0" />
        <text x="14" y="24" fontSize="11" fill="#101828" fontWeight="600" fontFamily="system-ui">Trend by month</text>
        <path d="M20 170 L70 150 L120 156 L170 124 L220 130 L270 96 L320 80 L350 70" stroke="#1F3FD8" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M20 170 L70 150 L120 156 L170 124 L220 130 L270 96 L320 80 L350 70 V180 H20Z" fill="#1F3FD8" opacity=".08" />
      </g>
      <g transform="translate(400 128)">
        <rect width="180" height="196" rx="10" fill="#fff" stroke="#E4E8F0" />
        <text x="14" y="24" fontSize="11" fill="#101828" fontWeight="600" fontFamily="system-ui">By region</text>
        {bars.map((b, i) => (
          <g key={i}>
            <rect x="14" y={40 + i * 24} width="150" height="12" rx="3" fill="#F3F5FB" />
            <rect x="14" y={40 + i * 24} width={b * 1.5} height="12" rx="3" fill={i === 3 ? '#F2A33A' : '#0E8F8F'} />
          </g>
        ))}
      </g>
    </svg>
  );
}
