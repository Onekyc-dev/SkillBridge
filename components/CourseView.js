"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession, signIn } from "next-auth/react";
import AdGate from "./AdGate";
import Diagram from "./Diagram";
import Quiz from "./Quiz";
import { extras } from "../lib/extras";

function Check() {
  return (
    <svg viewBox="0 0 52 52" aria-hidden="true">
      <path d="M13 27 L22 36 L40 16" />
    </svg>
  );
}

export default function CourseView({ course }) {
  const { status } = useSession();
  const total = course.modules.length;
  const key = `sb-progress-${course.slug}`;
  const [done, setDone] = useState(0);
  const [current, setCurrent] = useState(0);
  const [stage, setStage] = useState("ad"); // ad | lesson | quiz | complete
  const [firstTry, setFirstTry] = useState(0);

  useEffect(() => {
    try {
      const n = Number(localStorage.getItem(key) || 0);
      setDone(n);
      setCurrent(Math.min(n, total));
      setStage("ad");
    } catch {}
  }, [key, total]);

  function openModule(i) {
    setCurrent(i);
    setStage("ad");
  }

  function passQuiz(score) {
    const nd = Math.max(done, current + 1);
    setDone(nd);
    setFirstTry(score);
    try { localStorage.setItem(key, String(nd)); } catch {}
    setStage("complete");
  }

  function goOn() {
    setCurrent(current + 1);
    setStage("ad");
  }

  if (status === "loading") return null;

  if (status === "unauthenticated") {
    return (
      <section className="hero">
        <Link href="/" className="back">&larr; All courses</Link>
        <h1>{course.title}</h1>
        <p>Sign in with Google to start this course and save your progress.</p>
        <button className="btn" onClick={() => signIn("google")}>Sign in with Google</button>
      </section>
    );
  }

  if (current >= total) {
    return (
      <section className="stage">
        <Link href="/" className="back">&larr; All courses</Link>
        <div className="celebrate" role="status">
          <div className="ring"><Check /></div>
          <h1 style={{ margin: "0 auto .5rem" }}>You finished {course.title}</h1>
          <div className="progress big"><span style={{ width: "100%" }} /></div>
          <p className="muted">All {total} modules done</p>
          <p>Here is where to start applying for this kind of work.</p>
        </div>
        <div className="grid">
          {course.jobs.map((j) => (
            <a key={j.name} href={j.url} target="_blank" rel="noopener noreferrer" className="card">
              <h3>{j.name}</h3>
              <p>{j.note}</p>
            </a>
          ))}
        </div>
        <button className="btn ghost" onClick={() => openModule(0)}>Review the course</button>
      </section>
    );
  }

  const m = course.modules[current];
  const ex = (extras[course.slug] || [])[current] || {};
  const nextMod = course.modules[current + 1];
  const pct = Math.round((done / total) * 100);

  return (
    <div className="course">
      <aside>
        <Link href="/" className="back">&larr; All courses</Link>
        <h2>{course.title}</h2>
        <div className="progress" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label="Course progress">
          <span style={{ width: `${pct}%` }} />
        </div>
        <p className="muted">{done} of {total} modules done</p>
        <ol className="mods">
          {course.modules.map((mod, i) => (
            <li key={mod.title}>
              <button
                className={`mod${i === current ? " on" : ""}${i < done ? " finished" : ""}`}
                disabled={i > done}
                onClick={() => openModule(i)}
                aria-label={`Module ${i + 1}: ${mod.title}`}
                aria-current={i === current ? "step" : undefined}
              >
                <span className="badge">{i < done ? "✓" : i + 1}</span>
                <span className="mod-title">{mod.title}</span>
              </button>
            </li>
          ))}
        </ol>
      </aside>

      <article key={`${current}-${stage}`} className="stage">
        {stage === "ad" && <AdGate onDone={() => setStage("lesson")} />}

        {stage === "lesson" && (
          <>
            <p className="eyebrow">Module {current + 1} of {total}</p>
            <h1>{m.title}</h1>
            {m.videoId ? (
              <div className="video">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${m.videoId}${m.start ? `?start=${m.start}` : ""}`}
                  title={m.title}
                  allowFullScreen
                />
              </div>
            ) : null}
            {m.text.split("\n\n").map((para, i) => (
              <p key={i} className="lesson">{para}</p>
            ))}
            <Diagram data={ex.diagram} />
            {m.practice && (
              <div className="card" style={{ margin: "1.25rem 0" }}>
                <h3>Try it</h3>
                <p>{m.practice}</p>
              </div>
            )}
            <button className="btn" onClick={() => (ex.quiz ? setStage("quiz") : passQuiz(0))}>
              {ex.quiz ? "Take the quick quiz" : "Finish module"}
            </button>
          </>
        )}

        {stage === "quiz" && (
          <>
            <p className="eyebrow">Quick quiz · Module {current + 1}</p>
            <Quiz key={current} questions={ex.quiz} onPass={passQuiz} seed={current} />
          </>
        )}

        {stage === "complete" && (
          <div className="celebrate" role="status">
            <div className="ring"><Check /></div>
            <h2>Module {current + 1} complete</h2>
            <p>{m.title}</p>
            {ex.quiz && <p className="muted">Quiz: {firstTry} of {ex.quiz.length} right on the first try</p>}
            <div className="progress big"><span style={{ width: `${((current + 1) / total) * 100}%` }} /></div>
            <p className="muted">{current + 1} of {total} modules done</p>
            {nextMod ? (
              <p>Up next: <strong>{nextMod.title}</strong></p>
            ) : (
              <p>That was the last module. Your job list is next.</p>
            )}
            <button className="btn" onClick={goOn}>{nextMod ? "Continue" : "See my job list"}</button>
          </div>
        )}
      </article>
    </div>
  );
}
