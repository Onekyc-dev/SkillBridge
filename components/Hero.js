import Image from "next/image";

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="m10 8 6 4-6 4z" fill="currentColor" stroke="none" />
    </svg>
  );
}

const benefits = [
  { title: "Learn at your pace", detail: "Short, practical lessons", icon: "book" },
  { title: "Build real skills", detail: "Practice as you learn", icon: "check" },
  { title: "Grow with confidence", detail: "Know your next step", icon: "growth" },
];

function BenefitIcon({ type }) {
  if (type === "book") {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3.5 5.5c3.1-1.2 5.8-.7 8.5 1.2v13c-2.7-1.9-5.4-2.4-8.5-1.2zM20.5 5.5c-3.1-1.2-5.8-.7-8.5 1.2v13c2.7-1.9 5.4-2.4 8.5-1.2z" /></svg>;
  }
  if (type === "check") {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5" /><path d="m8 12.2 2.6 2.6 5.5-5.6" /></svg>;
  }
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 19V5M4 19h17M7 15l4-4 3 2 6-7M16 6h4v4" /></svg>;
}

export default function Hero() {
  return (
    <section className="home-hero" aria-labelledby="home-hero-title">
      <div className="home-hero-copy">
        <div className="home-hero-kicker"><span className="home-hero-kicker-dot" /> YOUR SKILLS. YOUR FUTURE.</div>
        <h1 id="home-hero-title">Learn today.<br /><span>Build tomorrow.</span></h1>
        <p className="home-hero-lead">
          Build job-ready skills with friendly, practical lessons. Learn at your own pace and take your next step with confidence.
        </p>
        <div className="home-hero-actions">
          <a className="home-hero-primary" href="#courses">Explore Courses <ArrowIcon /></a>
          <a className="home-hero-secondary" href="#how"><PlayIcon /> How It Works</a>
        </div>
        <div className="home-hero-benefits" aria-label="SkillBridge benefits">
          {benefits.map((benefit) => (
            <div className="home-hero-benefit" key={benefit.title}>
              <span className="home-hero-benefit-icon"><BenefitIcon type={benefit.icon} /></span>
              <span><strong>{benefit.title}</strong><small>{benefit.detail}</small></span>
            </div>
          ))}
        </div>
      </div>
      <div className="home-hero-visual">
        <div className="home-hero-visual-glow" aria-hidden="true" />
        <div className="home-hero-image-frame">
          <Image
            src="/images/skillbridge-hero.png"
            alt="A woman learning new skills on her laptop in a bright, welcoming workspace"
            width={836}
            height={642}
            priority
            sizes="(max-width: 760px) 100vw, 50vw"
            className="home-hero-image"
          />
        </div>
        <div className="home-hero-float-card home-hero-float-top" aria-hidden="true">
          <span className="home-hero-float-check"><BenefitIcon type="check" /></span>
          <span><strong>Small steps, big progress</strong><small>Your future starts here</small></span>
        </div>
        <div className="home-hero-float-card home-hero-float-bottom" aria-hidden="true">
          <span className="home-hero-float-spark">✦</span>
          <span><strong>Learn something new</strong><small>One lesson at a time</small></span>
        </div>
      </div>
    </section>
  );
}
