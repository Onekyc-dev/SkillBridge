"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function MyCourses({ courses }) {
  const [prog, setProg] = useState(null);

  useEffect(() => {
    const out = {};
    for (const c of courses) {
      let n = 0;
      try { n = Number(localStorage.getItem(`sb-progress-${c.slug}`) || 0); } catch {}
      out[c.slug] = Math.max(0, Math.min(c.count, Number.isFinite(n) ? n : 0));
    }
    setProg(out);
  }, [courses]);

  if (!prog) return <p className="muted">Loading your courses...</p>;

  const started = courses.filter((c) => prog[c.slug] > 0);
  const rest = courses.filter((c) => !(prog[c.slug] > 0));
  const finished = started.filter((c) => prog[c.slug] >= c.count).length;

  return (
    <>
      {started.length === 0 ? (
        <div className="empty-box">
          <h2>You have not started a course yet</h2>
          <p>Pick one and take your first module. It only takes a few minutes.</p>
          <Link href="/courses" className="btn">Browse courses</Link>
        </div>
      ) : (
        <>
          <p className="lead-text">{started.length} started &middot; {finished} finished</p>
          <div className="grid">
            {started.map((c) => {
              const done = prog[c.slug];
              const pct = Math.round((done / c.count) * 100);
              const complete = done >= c.count;
              return (
                <Link key={c.slug} href={`/courses/${c.slug}`} className="card course-card">
                  <p className="muted c-cat">{c.category}</p>
                  <h3>{c.title}</h3>
                  <div className="progress" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label={`${c.title} progress`}>
                    <span style={{ width: `${pct}%` }} />
                  </div>
                  <p className="mc-line"><strong>{pct}%</strong> &middot; {done} of {c.count} modules{complete ? " · Finished" : ""}</p>
                  <span className="mc-go">{complete ? "Review course" : "Continue"} &rarr;</span>
                </Link>
              );
            })}
          </div>
        </>
      )}
      {rest.length > 0 && started.length > 0 && (
        <>
          <h2 style={{ marginTop: "2rem" }}>More to try</h2>
          <div className="chips">
            {rest.map((c) => <Link key={c.slug} href={`/courses/${c.slug}`} className="chip">{c.title}</Link>)}
          </div>
        </>
      )}
      <p className="trust-note">Your progress is saved on this device.</p>
    </>
  );
}
