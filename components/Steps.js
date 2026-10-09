const steps = [
  {
    title: "Learn",
    text: "Short written lessons with a clear diagram in every module.",
    icon: <path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2zM4 19V5" />,
  },
  {
    title: "Practice",
    text: "A quick quiz and a small hands-on task after each module.",
    icon: <path d="M4 20l4-1 11-11-3-3L5 16zM14 7l3 3" />,
  },
  {
    title: "Apply",
    text: "A hand-picked list of places hiring for the skill you learned.",
    icon: <path d="M3 8h18v12H3zM8 8V5h8v3M3 13h18" />,
  },
];

export default function Steps() {
  return (
    <section id="how" className="steps scroll-rise">
      <h2>How it works</h2>
      <div className="steps-grid">
        {steps.map((s, i) => (
          <div key={s.title} className="step">
            <span className="step-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                {s.icon}
              </svg>
            </span>
            <h3>{i + 1}. {s.title}</h3>
            <p>{s.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
