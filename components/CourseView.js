"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import JobCard from "./JobCard";
import { useSession, signIn } from "next-auth/react";
import AdGate from "./AdGate";
import Diagram from "./Diagram";
import Quiz, { buildQuestionBank, selectQuestions } from "./Quiz";

const PRACTICALS = {
  "virtual-assistant-basics": [
    { title: "Client inbox triage", prompt: "A client has 12 unread emails: a meeting invitation for tomorrow, an overdue invoice reminder, a newsletter, a customer complaint, a password-reset alert, a request from the manager, three routine updates, a sales pitch, and two messages marked urgent. Write how you would sort them into priorities and explain your first three actions.", criteria: "Prioritize time-sensitive work, identify the complaint and manager request, avoid opening suspicious links, and explain your reasoning." },
    { title: "Build a weekly schedule", prompt: "Create a simple weekly plan for a client who needs a 30-minute team meeting, two hours of focused work, invoice follow-up, and time to answer messages. Write the schedule and include one contingency for a delayed meeting.", criteria: "Use clear time blocks, leave realistic buffers, and communicate schedule changes." },
    { title: "Client update", prompt: "Write a short, professional update to a client explaining what you completed, what is still in progress, and one question you need answered before continuing.", criteria: "Be concise, honest, specific, and respectful of client confidentiality." }
  ],
  "data-entry-basics": [
    { title: "Clean a messy dataset", prompt: "Use this sample: (1) Ada Bello, ada@example.com, Lagos; (2) K. Musa, kmusa@example.com, Abuja; (3) Ada Bello, ada@example.com, Lagos; (4) Tunde Okafor, missing email, Ibadan. Explain which record is a duplicate, which field is missing, and how you would document the corrections without guessing missing data.", criteria: "Identify the duplicate and missing email, preserve the source, and never invent data." },
    { title: "Quality-control checklist", prompt: "Write a five-step quality-control checklist for checking 100 customer records before handing the spreadsheet to a client.", criteria: "Include required fields, format consistency, duplicate checks, spot checks, and a saved backup or change log." },
    { title: "Prepare a handover note", prompt: "Write a handover note explaining what data you checked, what errors you corrected, what needs client confirmation, and what remains unfinished.", criteria: "Clearly separate confirmed corrections from unresolved questions and protect personal data." }
  ],
  "content-writing-basics": [
    { title: "Write from a brief", prompt: "Brief: Write for busy beginners who want to learn a useful digital skill. Create a headline, a 100–150 word introduction, and three practical tips. Keep the tone clear and encouraging.", criteria: "Match the audience, use a clear headline, provide useful tips, and avoid unsupported claims." },
    { title: "Edit and fact-check", prompt: "Draft: ‘Everyone can become rich online in 3 days. This app is the best in the world and guarantees success!!!’ Rewrite it to be responsible and useful, then list two claims that would need evidence before publication.", criteria: "Remove guarantees and hype, use clear language, and identify claims requiring evidence." },
    { title: "Create a content package", prompt: "For a free beginner spreadsheet lesson, write (1) a short social post, (2) a one-sentence email subject, and (3) a product-style description of 40–60 words.", criteria: "Keep the message consistent while adapting length and style to each format." }
  ],
  "customer-service-basics": [
    { title: "Reply to an upset customer", prompt: "A customer writes: ‘I paid yesterday and still cannot access the course. Nobody is helping me!’ Draft a calm response that acknowledges the problem, asks for only the information needed to investigate, and explains the next step without promising an unverified outcome.", criteria: "Acknowledge frustration, use respectful language, protect private data, and set a realistic next step." },
    { title: "Prioritize support tickets", prompt: "Rank these issues and explain why: (A) a learner cannot sign in before an exam; (B) a typo in a nonessential page; (C) a user reports that someone else can see their private account information.", criteria: "Treat a possible privacy/security issue as urgent, then consider time-sensitive access, then the typo." },
    { title: "Escalation handover", prompt: "Write an internal handover note for a billing issue you cannot resolve yourself. Include the issue, checks already completed, the customer's desired outcome, and the next team needed.", criteria: "Keep facts separate from assumptions, avoid unnecessary personal data, and give a clear next action." }
  ]
};

function readLearning(key, total) {
  try {
    const saved = JSON.parse(localStorage.getItem(key) || "null");
    if (saved && typeof saved === "object") return { basicDone: Math.min(total, Math.max(0, Number(saved.basicDone) || 0)), practicalDone: Array.isArray(saved.practicalDone) ? saved.practicalDone : [], examPassed: Boolean(saved.examPassed), examAttempts: Number(saved.examAttempts) || 0, certificate: saved.certificate || null };
    const legacy = Number(localStorage.getItem(key.replace("learning", "progress")) || 0);
    return { basicDone: Math.min(total, Math.max(0, legacy)), practicalDone: [], examPassed: false, examAttempts: 0, certificate: null };
  } catch { return { basicDone: 0, practicalDone: [], examPassed: false, examAttempts: 0, certificate: null }; }
}
function makeCertificate(course) {
  const name = typeof localStorage !== "undefined" ? (localStorage.getItem("sb-learner-name") || "Learner") : "Learner";
  return { id: `SB-${course.slug.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 8)}-${Date.now().toString(36).toUpperCase()}`, name, courseTitle: course.title, completedAt: new Date().toISOString() };
}

export default function CourseView({ course }) {
  const { status } = useSession();
  const modules = course.modules || [];
  const total = modules.length;
  const key = `sb-learning-${course.slug}`;
  const practicals = PRACTICALS[course.slug] || [
    { title: "Apply the skill", prompt: `Create a small, realistic example that demonstrates what you learned in ${course.title}. Explain the goal, your steps, and how you checked the result.`, criteria: "The submission is relevant, complete, clearly explained, and checked for errors." },
    { title: "Solve a work scenario", prompt: `Describe how you would handle a realistic beginner-level task related to ${course.title}. Include the information you would need, your steps, and when you would ask for help.`, criteria: "Show a logical process, good judgement, and clear communication." },
    { title: "Reflect and improve", prompt: `Review your previous practical work for ${course.title}. Identify one strength, one improvement, and the next action you would take.`, criteria: "Use specific examples and identify a realistic improvement." }
  ];
  const [learning, setLearning] = useState({ basicDone: 0, practicalDone: [], examPassed: false, examAttempts: 0, certificate: null });
  const [current, setCurrent] = useState(0);
  const [view, setView] = useState("ad");
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [quizFeedback, setQuizFeedback] = useState("");
  const [practicalIndex, setPracticalIndex] = useState(0);
  const [practicalAnswers, setPracticalAnswers] = useState({});
  const [examQuestions, setExamQuestions] = useState([]);
  const [examFeedback, setExamFeedback] = useState("");

  useEffect(() => {
    const loaded = readLearning(key, total);
    setLearning(loaded);
    setCurrent(Math.min(loaded.basicDone, Math.max(0, total - 1)));
    try { setPracticalAnswers(JSON.parse(localStorage.getItem(`sb-practical-work-${course.slug}`) || "{}")); } catch {}
  }, [key, total, course.slug]);

  function saveLearning(next) {
    setLearning(next);
    try {
      localStorage.setItem(key, JSON.stringify(next));
      localStorage.setItem(`sb-progress-${course.slug}`, String(next.basicDone));
    } catch {}
  }
  function openModule(index) { setCurrent(index); setView("ad"); setQuizFeedback(""); }
  function startModuleQuiz() {
    const bank = buildQuestionBank(modules[current]);
    setQuizQuestions(selectQuestions(bank, 3));
    setQuizFeedback("");
    setView("quiz");
  }
  function passModule() {
    const next = { ...learning, basicDone: Math.max(learning.basicDone, current + 1) };
    saveLearning(next);
    setView("complete");
  }
  function startExam() {
    const basicQuestions = modules.flatMap((module) => buildQuestionBank(module));
    const practicalQuestions = practicals.map((project) => ({
      q: `In the practical project “${project.title}”, what should you do?`,
      options: ["Follow the brief, use the checklist, and check your result", "Skip the requirements and submit anything", "Invent missing facts to finish faster", "Share private information in your response"],
      answer: 0,
      why: project.criteria
    }));
    setExamQuestions(selectQuestions([...basicQuestions, ...practicalQuestions], 10));
    setExamFeedback("");
    setView("exam");
  }
  function savePractical(index, text) {
    const next = { ...practicalAnswers, [index]: text };
    setPracticalAnswers(next);
    try { localStorage.setItem(`sb-practical-work-${course.slug}`, JSON.stringify(next)); } catch {}
  }
  function completePractical(index) {
    if (!(practicalAnswers[index] || "").trim()) { setQuizFeedback("Please write your response before marking this project complete."); return; }
    const nextDone = [...new Set([...learning.practicalDone, index])];
    saveLearning({ ...learning, practicalDone: nextDone });
    setQuizFeedback("Project saved and marked complete. Review the criteria and improve your work any time.");
  }

  const examEligible = learning.basicDone >= total && learning.practicalDone.length >= practicals.length;
  const pct = Math.round((learning.basicDone / Math.max(total, 1)) * 100);
  const module = modules[current];
  const nextModule = modules[current + 1];

  if (status === "loading") return null;
  if (status === "unauthenticated") return <section className="hero"><Link href="/courses" className="back">&larr; All courses</Link><h1>{course.title}</h1><p>Sign in with Google to start this course and save your progress in this browser.</p><button className="btn" onClick={() => signIn("google")}>Sign in with Google</button></section>;

  if (view === "certificate" && learning.certificate) return <section className="stage certificate-page">
    <Link href="/dashboard" className="back">&larr; Dashboard</Link>
    <div className="certificate-paper"><p className="eyebrow">SKILLBRIDGE · CERTIFICATE OF COMPLETION</p><h1>Certificate of Achievement</h1><p>This certificate is presented to</p><h2>{learning.certificate.name}</h2><p>for completing the course</p><h3>{learning.certificate.courseTitle}</h3><p>after completing Basic Skills, Practical Skills, and the final examination.</p><p className="certificate-date">Completed {new Date(learning.certificate.completedAt).toLocaleDateString()}</p><p className="certificate-id">Certificate ID: {learning.certificate.id}</p><p className="muted">Saved in this browser. This locally generated certificate is not independently verified by a server.</p></div>
    <button className="btn" onClick={() => window.print()}>Print / Save certificate</button> <Link className="btn ghost" href="/dashboard">Back to dashboard</Link>
  </section>;

  return <div className="course">
    <aside>
      <Link href="/courses" className="back">&larr; All courses</Link>
      <h2>{course.title}</h2><p className="muted">Stage 1 · Basic Skills</p>
      <div className="progress" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label="Basic Skills progress"><span style={{ width: `${pct}%` }} /></div>
      <p className="muted">{learning.basicDone} of {total} modules passed</p>
      <ol className="mods">{modules.map((mod, index) => <li key={mod.title}><button className={`mod${index === current ? " on" : ""}${index < learning.basicDone ? " finished" : ""}`} disabled={index > learning.basicDone} onClick={() => openModule(index)}><span className="badge">{index < learning.basicDone ? "✓" : index + 1}</span><span className="mod-title">{mod.title}</span></button></li>)}</ol>
      <div className="card"><h3>Stage 2 · Practical Skills</h3><p>{learning.practicalDone.length} of {practicals.length} projects completed</p><div className="progress"><span style={{ width: `${learning.practicalDone.length / practicals.length * 100}%` }} /></div><button className="btn ghost" disabled={learning.basicDone < total} onClick={() => { setPracticalIndex(0); setView("practical"); }}>{learning.basicDone < total ? "Complete Stage 1 first" : "Open practicals"}</button></div>
      <div className="card"><h3>Final exam</h3><p>{learning.examPassed ? "Passed ✓" : examEligible ? "Ready when you are" : "Complete both stages first"}</p><button className="btn ghost" disabled={!examEligible} onClick={startExam}>{learning.examPassed ? "Retake exam" : "Start exam"}</button></div>
    </aside>
    <article className="stage">
      {view === "ad" && <AdGate onDone={() => setView("lesson")} />}
      {view === "lesson" && module && <><p className="eyebrow">Stage 1 · Module {current + 1} of {total}</p><h1>{module.title}</h1>{module.videoId ? <div className="video"><iframe src={`https://www.youtube-nocookie.com/embed/${module.videoId}${module.start ? `?start=${module.start}` : ""}`} title={module.title} allowFullScreen /></div> : null}{module.text.split("\n\n").map((para, index) => <p key={index} className="lesson">{para}</p>)}<Diagram data={module.diagram} />{module.practice && <div className="card" style={{ margin: "1.25rem 0" }}><h3>Try it</h3><p>{module.practice}</p></div>}<button className="btn" onClick={startModuleQuiz}>Take the 3-question module test</button></>}
      {view === "quiz" && <><p className="eyebrow">Stage 1 · Module {current + 1}</p><h1>Module test</h1><p>You need at least 2 of 3 correct. Each attempt selects a new set from the question bank when possible.</p><Quiz key={quizQuestions.map((q) => q.q).join("|")} questions={quizQuestions} passMark={2} onPass={() => passModule()} onFail={() => startModuleQuiz()}/>{quizFeedback && <p className="feedback">{quizFeedback}</p>}<button className="btn ghost" onClick={() => { setView("lesson"); }}>Review lesson</button></>}
      {view === "complete" && <div className="celebrate"><h1>Module passed ✓</h1><p>{module?.title}</p><p>Your module progress has been saved in this browser.</p><div className="progress big"><span style={{ width: `${Math.max(pct, Math.round((current + 1) / total * 100))}%` }} /></div>{nextModule ? <button className="btn" onClick={() => openModule(current + 1)}>Continue to next module</button> : <><h2>Basic Skills completed!</h2><p>Next, complete all three practical projects.</p><button className="btn" onClick={() => { setPracticalIndex(0); setView("practical"); }}>Start Practical Skills</button></>}</div>}
      {view === "practical" && <><p className="eyebrow">Stage 2 · Practical Skills · Project {practicalIndex + 1} of {practicals.length}</p><h1>{practicals[practicalIndex].title}</h1><p className="lesson">{practicals[practicalIndex].prompt}</p><label className="practical-label" htmlFor="practical-answer">Your project response</label><textarea id="practical-answer" className="practical-textarea" rows={9} value={practicalAnswers[practicalIndex] || ""} onChange={(event) => savePractical(practicalIndex, event.target.value)} placeholder="Write your answer or project notes here. Your draft is saved in this browser."/><div className="card"><h3>Completion checklist</h3><p>{practicals[practicalIndex].criteria}</p><p className="muted">A project is marked complete when you save a response. Use the checklist to review your own work.</p></div><p className="muted">{learning.practicalDone.includes(practicalIndex) ? "Completed ✓" : "Not completed yet"}</p><div className="button-row"><button className="btn" onClick={() => completePractical(practicalIndex)}>{learning.practicalDone.includes(practicalIndex) ? "Save and keep completed" : "Save and mark complete"}</button><button className="btn ghost" disabled={practicalIndex === 0} onClick={() => { setPracticalIndex((i) => i - 1); setQuizFeedback(""); }}>Previous project</button><button className="btn ghost" disabled={practicalIndex === practicals.length - 1} onClick={() => { setPracticalIndex((i) => i + 1); setQuizFeedback(""); }}>Next project</button></div>{quizFeedback && <p className="feedback ok">{quizFeedback}</p>}{examEligible && <div className="card"><h3>Both stages complete</h3><p>You can now take the final exam.</p><button className="btn" onClick={startExam}>Start final exam</button></div>}</>}
      {view === "exam" && <><p className="eyebrow">Final examination</p><h1>{course.title} · Final exam</h1><p>10 randomly selected questions from both stages' course question bank. You need at least 7/10 to pass.</p><Quiz key={examQuestions.map((q) => q.q).join("|")} questions={examQuestions} passMark={7} label="Final exam" onPass={(score) => { saveLearning({ ...learning, examPassed: true, examAttempts: learning.examAttempts + 1, certificate: learning.certificate || makeCertificate(course) }); setExamFeedback(`Passed with ${score}/10. Your certificate is ready.`); setView("certificate"); }} onFail={() => { saveLearning({ ...learning, examAttempts: learning.examAttempts + 1 }); startExam(); setExamFeedback("A new question set is ready. Review the previous explanations before continuing."); }}/>{examFeedback && <p className="feedback">{examFeedback}</p>}<div className="button-row"><button className="btn ghost" onClick={startExam}>Generate a new exam set</button><button className="btn ghost" onClick={() => { setCurrent(0); setView("lesson"); }}>Review Basic Skills lessons</button></div></>}
      {view === "certificate" && <div className="celebrate"><h1>Certificate earned!</h1><p>Congratulations on completing {course.title}.</p><button className="btn" onClick={() => setView("certificate")}>View certificate</button></div>}
    </article>
  </div>;
}
