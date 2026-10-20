"use client";
import { useMemo, useState } from "react";

export function shuffle(items) {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function buildQuestionBank(module) {
  const base = Array.isArray(module?.quiz) ? module.quiz : [];
  const title = module?.title || "this lesson";
  const extra = [
    {
      q: `Which approach best supports good work when applying “${title}”?`,
      options: ["Follow the instructions, check the result, and communicate clearly", "Skip checking the work", "Share private information publicly", "Promise results you cannot guarantee"],
      answer: 0,
      why: "Careful work, checking, and clear communication are useful professional habits across these skills."
    },
    {
      q: `After studying “${title}”, what is the most useful next step?`,
      options: ["Practise the skill on a small, realistic task", "Assume practice is never needed", "Ignore the client's requirements", "Copy someone else's work without checking it"],
      answer: 0,
      why: "A small practical task helps turn a lesson into a skill you can demonstrate."
    }
  ];
  return [...base, ...extra];
}

export function selectQuestions(pool, count = 3) {
  return shuffle(pool || []).slice(0, Math.min(count, (pool || []).length)).map((question) => {
    const order = shuffle(question.options.map((_, index) => index));
    return { ...question, options: order.map((index) => question.options[index]), answer: order.indexOf(question.answer) };
  });
}

export default function Quiz({ questions, onPass, onFail, passMark = 2, label = "Module test" }) {
  const quizQuestions = useMemo(() => questions || [], [questions]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const score = quizQuestions.reduce((total, q, index) => total + (answers[index] === q.answer ? 1 : 0), 0);
  const passed = score >= passMark;

  function submit() {
    setSubmitted(true);
  }

  return <div className="quiz">
    <p className="eyebrow">{label} · {quizQuestions.length} questions</p>
    {quizQuestions.map((q, index) => <fieldset key={`${q.q}-${index}`} className="quiz-question" disabled={submitted}>
      <legend><strong>{index + 1}. {q.q}</strong></legend>
      <div className="opts">{q.options.map((option, optionIndex) => <label className="opt quiz-choice" key={`${option}-${optionIndex}`}>
        <input type="radio" name={`question-${index}`} checked={answers[index] === optionIndex} onChange={() => setAnswers((old) => ({ ...old, [index]: optionIndex }))} />
        <span>{option}</span>
      </label>)}</div>
      {submitted && <p className={`feedback ${answers[index] === q.answer ? "ok" : "no"}`}><strong>{answers[index] === q.answer ? "Correct." : `Correct answer: ${q.options[q.answer]}.`}</strong> {q.why}</p>}
    </fieldset>)}
    {!submitted ? <button className="btn" disabled={Object.keys(answers).length < quizQuestions.length} onClick={submit}>Submit answers</button> : <div aria-live="polite">
      <p className={`feedback ${passed ? "ok" : "no"}`}><strong>{passed ? "You passed!" : "Not passed yet."}</strong> Score: {score}/{quizQuestions.length}. {passed ? "Your progress has been saved." : `You need at least ${passMark} correct. Review the explanations and try a new question set.`}</p>
      {passed ? <button className="btn" onClick={() => onPass?.(score, quizQuestions.length)}>Continue</button> : <button className="btn" onClick={() => onFail?.(score, quizQuestions.length)}>Try another set</button>}
    </div>}</div>;
}
