"use client";
import { useState } from "react";
import Link from "next/link";
import JobCard from "./JobCard";
import AdGate from "./AdGate";
import { optionOrder } from "./Quiz";

export default function SkillFlow({ data }) {
  const { slug, title, check, jobs } = data;
  const skill = title.replace(/ Basics$/, "");
  const [stage, setStage] = useState("intro"); // intro | ad | check | result
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState(null);
  const [score, setScore] = useState(0);

  const q = check[i];
  const answered = picked !== null;

  function choose(idx) {
    if (answered) return;
    setPicked(idx);
    if (idx === q.answer) setScore((s) => s + 1);
  }

  function next() {
    if (i + 1 < check.length) {
      setI(i + 1);
      setPicked(null);
    } else {
      setStage("result");
    }
  }

  function again() {
    setI(0);
    setPicked(null);
    setScore(0);
    setStage("intro");
  }

  const message =
    score >= 4
      ? "You clearly know your stuff. Here is where to start applying."
      : score >= 3
      ? "A good base. Here is where to start, and the course can sharpen the rest."
      : "You have some gaps, and that is fine. Here are the places to look, and the free course can fill them in.";

  return (
    <section key={stage + i} className="stage">
      {stage === "intro" && (
        <>
          <Link href="/skills" className="back">&larr; All skills</Link>
          <p className="eyebrow">I already have this skill</p>
          <h1>I know {skill}</h1>
          <p className="lead-text">
            Answer 5 quick questions, then see places that hire for this skill. It takes about two minutes and it is free.
            A short ad plays first.
          </p>
          <button className="btn" onClick={() => setStage("ad")}>Start the check</button>
        </>
      )}

      {stage === "ad" && <AdGate onDone={() => setStage("check")} />}

      {stage === "check" && (
        <>
          <p className="eyebrow">Quick check · {skill}</p>
          <div className="quiz">
            <div className="quiz-dots" aria-hidden="true">
              {check.map((_, k) => <span key={k} className={k <= i ? "on" : ""} />)}
            </div>
            <p className="muted">Question {i + 1} of {check.length}</p>
            <h2>{q.q}</h2>
            <div className="opts">
              {optionOrder(q, i).map((idx) => {
                const isRight = answered && idx === q.answer;
                const isWrong = answered && idx === picked && idx !== q.answer;
                return (
                  <button
                    key={q.options[idx]}
                    className={`opt${isRight ? " right" : ""}${isWrong ? " wrong" : ""}`}
                    disabled={answered}
                    onClick={() => choose(idx)}
                  >
                    {q.options[idx]}
                  </button>
                );
              })}
            </div>
            <div aria-live="polite">
              {answered && (
                <p className={`feedback ${picked === q.answer ? "ok" : "no"}`}>
                  <strong>{picked === q.answer ? "Correct." : "Not quite."}</strong> {q.why}
                </p>
              )}
            </div>
            {answered && (
              <button className="btn" onClick={next}>
                {i + 1 < check.length ? "Next question" : "See my results"}
              </button>
            )}
          </div>
        </>
      )}

      {stage === "result" && (
        <>
          <div className="celebrate" role="status">
            <div className="score-badge">{score}<span>/{check.length}</span></div>
            <h1 style={{ margin: "0 auto .5rem" }}>{skill} check done</h1>
            <p>{message}</p>
          </div>
          <h2>Where to look for {skill} work</h2>
          <div className="grid">
            {jobs.map((j) => (
              <JobCard key={j.name} job={j} />
            ))}
          </div>
          <p className="trust-note">Stay safe: real employers never ask you to pay to get a job, and keep payments on the platform.</p>
          <div className="row-btns">
            <Link href={`/courses/${slug}`} className="btn">Take the free course</Link>
            <button className="btn ghost" onClick={again}>Try the check again</button>
          </div>
        </>
      )}
    </section>
  );
}
