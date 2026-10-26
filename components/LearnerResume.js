"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function LearnerResume({ courses = [] }) {
  const [name, setName] = useState("");
  const [summary, setSummary] = useState("");
  const [records, setRecords] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setName(localStorage.getItem("sb-learner-name") || "");
    setSummary(localStorage.getItem("sb-resume-summary") || "");
    const next = courses.map((course) => {
      let data = {};
      try { data = JSON.parse(localStorage.getItem(`sb-learning-${course.slug}`) || "{}"); } catch {}
      let legacy = 0;
      try { legacy = Number(localStorage.getItem(`sb-progress-${course.slug}`) || 0); } catch {}
      const basicDone = Math.max(Number(data.basicDone) || 0, legacy);
      const practicalDone = Array.isArray(data.practicalDone) ? data.practicalDone.length : 0;
      return { ...course, basicDone, practicalDone, examPassed: Boolean(data.examPassed), certificate: data.certificate || null };
    });
    setRecords(next);
    setLoaded(true);
  }, [courses]);

  function saveName(value) { setName(value); localStorage.setItem("sb-learner-name", value); }
  function saveSummary(value) { setSummary(value); localStorage.setItem("sb-resume-summary", value); }
  const active = records.filter((record) => record.basicDone > 0 || record.practicalDone > 0 || record.examPassed);
  const certificates = records.filter((record) => record.certificate && record.examPassed);
  if (!loaded) return <section className="stage"><p className="muted">Loading your résumé…</p></section>;

  return <section className="stage resume-page">
    <Link href="/dashboard" className="back">&larr; Dashboard</Link>
    <div className="dashboard-heading"><div><p className="dashboard-kicker">YOUR SKILLS PROFILE</p><h1>My résumé & portfolio</h1><p className="dashboard-intro">Build a truthful summary of the skills, practice projects, and courses you have completed.</p></div><button className="btn" onClick={() => window.print()}>Print / Save résumé</button></div>
    <div className="card resume-editor"><label htmlFor="resume-name"><strong>Name to display</strong></label><input id="resume-name" className="practical-textarea" rows="1" value={name} onChange={(event) => saveName(event.target.value)} placeholder="Enter your name" /><label htmlFor="resume-summary"><strong>Short professional summary</strong></label><textarea id="resume-summary" className="practical-textarea" rows={4} value={summary} onChange={(event) => saveSummary(event.target.value)} placeholder="Describe the kind of work you are learning to do. Keep it accurate and specific."/><p className="muted">Your résumé is stored in this browser only. It is not uploaded or shared automatically.</p></div>
    <div className="card"><p className="dashboard-kicker">COURSES & DEMONSTRATED SKILLS</p><h2>Learning record</h2>{active.length ? active.map((record) => <article className="resume-record" key={record.slug}><h3>{record.title}</h3><p>{record.category} · {record.basicDone}/{record.moduleCount} Basic Skills modules completed · {record.practicalDone} practical projects completed</p><p>{record.examPassed ? "Final exam passed" : "Final exam not yet passed"}{record.certificate ? " · Certificate earned" : ""}</p><Link href={`/courses/${record.slug}`} className="text-link">Continue course →</Link></article>) : <p>Your course achievements will appear here as you learn.</p>}</div>
    <div className="card"><p className="dashboard-kicker">PORTFOLIO</p><h2>Practical projects</h2><p>Use your saved project responses as practice samples. Review them before sharing and remove private or client-identifying information.</p>{active.some((record) => record.practicalDone > 0) ? <p>You've completed practical work in {active.filter((record) => record.practicalDone > 0).length} course(s). Open each course to review your saved projects.</p> : <p>No completed practical projects yet.</p>}</div>
    <div className="card"><p className="dashboard-kicker">CERTIFICATES</p><h2>Earned certificates</h2>{certificates.length ? certificates.map((record) => <p key={record.slug}><strong>{record.title}</strong> — {new Date(record.certificate.completedAt).toLocaleDateString()} (ID: {record.certificate.id}) · <Link href={`/certificates/${record.slug}`} className="text-link">View certificate</Link></p>) : <p>Certificates will appear here after you complete both stages and pass a course final exam.</p>}</div>
    <p className="muted">Course completion and practice projects are learning achievements, not employment history. Only list paid or volunteer roles under work experience if you actually held those roles.</p>
  </section>;
}
