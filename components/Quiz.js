"use client";
import { useState } from "react";

// Shows the options in a fixed order that moves the right answer to a different
// slot for each question, so it is never always in the same place.
export function optionOrder(q, slot) {
  const n = q.options.length;
  const shift = (q.answer - (slot % n) + n) % n;
  return q.options.map((_, k) => (k + shift) % n);
}

export default function Quiz({ questions, onPass, seed = 0 }) {
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState(null);
  const [wrong, setWrong] = useState([]);
  const [firstTry, setFirstTry] = useState(0);

  const q = questions[i];
  const solved = picked === q.answer;

  function choose(idx) {
    if (solved || wrong.includes(idx)) return;
    setPicked(idx);
    if (idx === q.answer) {
      if (wrong.length === 0) setFirstTry((f) => f + 1);
    } else {
      setWrong((w) => [...w, idx]);
    }
  }

  function next() {
    if (i + 1 < questions.length) {
      setI(i + 1);
      setPicked(null);
      setWrong([]);
    } else {
      onPass(firstTry);
    }
  }

  return (
    <div className="quiz">
      <div className="quiz-dots" aria-hidden="true">
        {questions.map((_, k) => (
          <span key={k} className={k <= i ? "on" : ""} />
        ))}
      </div>
      <p className="muted">Question {i + 1} of {questions.length}</p>
      <h2>{q.q}</h2>
      <div className="opts">
        {optionOrder(q, seed + i).map((idx) => {
          const o = q.options[idx];
          const isRight = solved && idx === q.answer;
          const isWrong = wrong.includes(idx);
          return (
            <button
              key={o}
              className={`opt${isRight ? " right" : ""}${isWrong ? " wrong" : ""}`}
              disabled={solved || isWrong}
              onClick={() => choose(idx)}
            >
              {o}
            </button>
          );
        })}
      </div>
      <div aria-live="polite">
        {solved && <p className="feedback ok"><strong>Correct.</strong> {q.why}</p>}
        {!solved && wrong.length > 0 && <p className="feedback no">Not quite. Try another answer.</p>}
      </div>
      {solved && (
        <button className="btn" onClick={next}>
          {i + 1 < questions.length ? "Next question" : "Finish module"}
        </button>
      )}
    </div>
  );
}
