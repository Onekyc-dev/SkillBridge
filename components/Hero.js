// A calm illustrated scene: a bridge from "Learn" to "Work".
const hangers = [170, 230, 290, 350, 410, 470].map((x) => {
  const t = (x - 110) / 420;
  const y = 225 - 260 * t * (1 - t);
  return { x, y: Math.round(y * 10) / 10 };
});

export default function Hero() {
  return (
    <section className="hero2">
      <p className="eyebrow fx" style={{ "--d": 0 }}>Free skills for online work</p>
      <h1 className="fx" style={{ "--d": 1 }}>Learn a skill. Then see exactly where to apply.</h1>
      <p className="lead fx" style={{ "--d": 2 }}>
        Short, calm courses that end with a hand-picked list of places hiring for that skill.
      </p>
      <div className="ctas fx" style={{ "--d": 3 }}>
        <a className="btn" href="#courses">Browse courses</a>
        <a className="btn ghost" href="#how">How it works</a>
      </div>

      <svg className="hero-art fx" style={{ "--d": 4 }} viewBox="0 0 640 320" role="img" aria-label="A bridge connecting Learn on the left to Work on the right">
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#DDF1E5" />
            <stop offset="1" stopColor="#FFF3D1" />
          </linearGradient>
        </defs>
        <rect width="640" height="320" rx="24" fill="url(#sky)" />

        <circle cx="500" cy="92" r="92" fill="#FFD166" opacity=".12" />
        <circle cx="500" cy="92" r="62" fill="#FFD166" opacity=".25" />
        <circle cx="500" cy="92" r="34" fill="#FFD166" />

        <g className="cloud">
          <ellipse cx="120" cy="72" rx="40" ry="12" fill="#fff" opacity=".9" />
          <ellipse cx="146" cy="62" rx="26" ry="14" fill="#fff" opacity=".9" />
        </g>
        <g className="cloud cloud2">
          <ellipse cx="330" cy="46" rx="34" ry="10" fill="#fff" opacity=".85" />
          <ellipse cx="350" cy="38" rx="20" ry="11" fill="#fff" opacity=".85" />
        </g>

        <path d="M0 200 Q90 130 190 180 T380 172 T640 160 V320 H0Z" fill="#CBE8D3" />
        <path d="M0 236 Q120 190 240 228 T460 220 T640 210 V320 H0Z" fill="#A7D8B8" />

        <path d="M150 232 H490 Q480 250 450 262 H190 Q160 250 150 232Z" fill="#CDE9EF" />
        <path d="M200 246 H300 M340 252 H430" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity=".7" />
        <path d="M0 232 H150 Q160 250 190 262 H450 Q480 250 490 232 H640 V320 H0Z" fill="#7CC499" />

        <g>
          <rect x="34" y="204" width="5" height="22" fill="#5E8F6E" />
          <circle cx="36" cy="198" r="14" fill="#4FB27A" />
          <rect x="598" y="206" width="5" height="20" fill="#5E8F6E" />
          <circle cx="600" cy="200" r="13" fill="#4FB27A" />
        </g>

        <path d="M110 225 Q320 95 530 225" fill="none" stroke="#1E9B57" strokeWidth="5" strokeLinecap="round" />
        {hangers.map((h) => (
          <line key={h.x} x1={h.x} y1={h.y} x2={h.x} y2="225" stroke="#0E5A33" strokeWidth="2" opacity=".55" />
        ))}
        <line x1="86" y1="225" x2="554" y2="225" stroke="#0E5A33" strokeWidth="7" strokeLinecap="round" />

        <circle className="walker" cx="110" cy="211" r="7" fill="#FFD166" stroke="#0E5A33" strokeWidth="2.5" />

        <text x="26" y="296" fontSize="20" fontWeight="800" fill="#0E5A33" fontFamily="inherit">Learn</text>
        <text x="614" y="296" fontSize="20" fontWeight="800" fill="#0E5A33" fontFamily="inherit" textAnchor="end">Work</text>
      </svg>
    </section>
  );
}
