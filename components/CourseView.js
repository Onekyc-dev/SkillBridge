"use client";
import { useEffect, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import AdGate from "./AdGate";

export default function CourseView({ course }) {
  const { status } = useSession();
  const total = course.modules.length;
  const key = `sb-progress-${course.slug}`;
  const [done, setDone] = useState(0);
  const [current, setCurrent] = useState(0);
  const [adPassed, setAdPassed] = useState(false);

  useEffect(() => {
    try {
      const n = Number(localStorage.getItem(key) || 0);
      setDone(n);
      setCurrent(Math.min(n, total));
    } catch {}
  }, [key, total]);

  function finishModule() {
    const next = current + 1;
    const nd = Math.max(done, next);
    setDone(nd);
    try { localStorage.setItem(key, String(nd)); } catch {}
    setCurrent(next);
    setAdPassed(false);
  }

  function openModule(i) {
    setCurrent(i);
    setAdPassed(false);
  }

  if (status === "loading") return null;

  if (status === "unauthenticated") {
    return (
      <section className="hero">
        <h1>{course.title}</h1>
        <p>Sign in with Google to start this course and save your progress.</p>
        <button className="btn" onClick={() => signIn("google")}>Sign in with Google</button>
      </section>
    );
  }

  if (current >= total) {
    return (
      <section>
        <h1>You finished {course.title}</h1>
        <p>Here is where to start applying for this kind of work.</p>
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

  return (
    <div className="course">
      <aside>
        <h2>{course.title}</h2>
        <ol className="mods">
          {course.modules.map((mod, i) => (
            <li key={mod.title}>
              <button
                className={i === current ? "mod on" : "mod"}
                disabled={i > done}
                onClick={() => openModule(i)}
              >
                {i < done ? "Done: " : ""}{mod.title}
              </button>
            </li>
          ))}
        </ol>
      </aside>
      <article>
        {!adPassed ? (
          <AdGate onDone={() => setAdPassed(true)} />
        ) : (
          <>
            <h1>{m.title}</h1>
            {m.videoId ? (
              <div className="video">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${m.videoId}`}
                  title={m.title}
                  allowFullScreen
                />
              </div>
            ) : (
              <p className="muted">Video for this lesson is coming soon.</p>
            )}
            <p className="lesson">{m.text}</p>
            <button className="btn" onClick={finishModule}>
              {current === total - 1 ? "Finish course" : "Finish module"}
            </button>
          </>
        )}
      </article>
    </div>
  );
}
