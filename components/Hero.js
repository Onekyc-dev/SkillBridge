
export default function Hero() {
  return (
    <section className="hero2 hero-layout">
      <div className="hero-copy">
        <p className="eyebrow">LEARN · PRACTISE · GET HIRED</p>

        <h1>
          Build real skills for a{" "}
          <span className="hero-highlight">brighter future.</span>
        </h1>

        <p className="lead">
          Learn practical skills at your own pace, practise what you learn,
          and discover places to apply for work.
        </p>

        <div className="ctas">
          <a className="btn" href="#courses">
            Explore courses
          </a>
          <a className="btn ghost" href="#how">
            How it works
          </a>
        </div>

        <p className="hero-note">
          <span aria-hidden="true">✓</span> Practical lessons · Safer job search
        </p>
      </div>

      <div className="hero-visual">
        <div className="hero-art" role="img" aria-label="A learner studying online">
          <div className="art-sun" />
          <div className="art-card art-card-top">
            <span>✦</span>
            <div className="art-line" />
            <div className="art-line short" />
          </div>

          <div className="art-plant">🌿</div>

          <div className="art-person">
            <div className="art-hair" />
            <div className="art-face" />
            <div className="art-body" />
            <div className="art-arm" />
          </div>

          <div className="art-laptop">
            <div className="art-screen">
              <span>Skill up!</span>
              <div className="art-progress"><i /></div>
              <div className="art-line" />
              <div className="art-line short" />
            </div>
            <div className="art-base" />
          </div>

          <div className="art-card art-card-bottom">
            <span>✓</span> Keep learning!
          </div>
        </div>
      </div>
    </section>
  );
}
