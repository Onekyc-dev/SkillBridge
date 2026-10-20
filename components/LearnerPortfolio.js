"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

const EMPTY_PROJECT = { title: "", objective: "", tasks: "", skills: "", tools: "", outcome: "", link: "" };
const STORAGE_KEY = "sb-portfolio-projects-v1";
const SELECTED_KEY = "sb-portfolio-courses-v1";

export default function LearnerPortfolio({ courses = [] }) {
  const [name, setName] = useState("");
  const [headline, setHeadline] = useState("");
  const [about, setAbout] = useState("");
  const [projects, setProjects] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [draft, setDraft] = useState(EMPTY_PROJECT);
  const [editingId, setEditingId] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [message, setMessage] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    try {
      setName(localStorage.getItem("sb-learner-name") || "");
      setHeadline(localStorage.getItem("sb-portfolio-headline") || "");
      setAbout(localStorage.getItem("sb-portfolio-about") || "");
      const savedProjects = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      setProjects(Array.isArray(savedProjects) ? savedProjects : []);
      const savedSelected = JSON.parse(localStorage.getItem(SELECTED_KEY) || "[]");
      setSelectedCourses(Array.isArray(savedSelected) ? savedSelected : []);
      const nextAchievements = courses.map((course) => {
        let data = {};
        let legacy = 0;
        try { data = JSON.parse(localStorage.getItem(`sb-learning-${course.slug}`) || "{}"); } catch {}
        try { legacy = Number(localStorage.getItem(`sb-progress-${course.slug}`) || 0); } catch {}
        const basicDone = Math.max(Number(data.basicDone) || 0, legacy);
        const practicalDone = Array.isArray(data.practicalDone) ? data.practicalDone.length : 0;
        return { ...course, basicDone, practicalDone, examPassed: Boolean(data.examPassed), certificate: data.certificate || null };
      });
      setAchievements(nextAchievements);
    } catch {
      setMessage("Some saved information could not be loaded. You can still add a project below.");
    }
    setLoaded(true);
  }, [courses]);

  const earned = useMemo(() => achievements.filter((item) => item.basicDone > 0 || item.practicalDone > 0 || item.examPassed), [achievements]);
  const certificates = useMemo(() => achievements.filter((item) => item.certificate && item.examPassed), [achievements]);

  function saveText(key, value, setter) {
    setter(value);
    try { localStorage.setItem(key, value); } catch { setMessage("Your browser could not save this change. Check available storage."); }
  }
  function saveProjects(next) {
    setProjects(next);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); setMessage("Project saved on this device."); }
    catch { setMessage("Your browser could not save the project. Check available storage."); }
  }
  function saveSelected(next) {
    setSelectedCourses(next);
    try { localStorage.setItem(SELECTED_KEY, JSON.stringify(next)); } catch { setMessage("Your browser could not save this selection."); }
  }
  function submitProject(event) {
    event.preventDefault();
    if (!draft.title.trim()) { setMessage("Add a project name before saving."); return; }
    const project = { ...draft, id: editingId || `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, updatedAt: new Date().toISOString() };
    const next = editingId ? projects.map((item) => item.id === editingId ? project : item) : [...projects, project];
    saveProjects(next);
    setDraft(EMPTY_PROJECT); setEditingId(null); setShowForm(false);
  }
  function startEdit(project) { setDraft({ ...EMPTY_PROJECT, ...project }); setEditingId(project.id); setShowForm(true); setMessage(""); }
  function cancelEdit() { setDraft(EMPTY_PROJECT); setEditingId(null); setShowForm(false); }
  function removeProject(id) {
    if (!window.confirm("Remove this project from your portfolio? This cannot be undone.")) return;
    saveProjects(projects.filter((item) => item.id !== id));
    if (editingId === id) cancelEdit();
  }
  function printPortfolio() { window.print(); }

  if (!loaded) return <section className="stage"><p className="muted">Loading your portfolio…</p></section>;

  return <section className="stage portfolio-page">
    <div className="portfolio-screen-only"><Link href="/dashboard" className="back">&larr; Dashboard</Link>
      <div className="dashboard-heading"><div><p className="dashboard-kicker">SHOW WHAT YOU CAN DO</p><h1>My portfolio</h1><p className="dashboard-intro">Present your practice projects and learning achievements in one clear, professional place.</p></div><div className="dashboard-actions"><button type="button" className="btn ghost" onClick={printPortfolio}>Print / Save as PDF</button><button type="button" className="btn" onClick={() => { setDraft(EMPTY_PROJECT); setEditingId(null); setShowForm(!showForm); }}>＋ Add a project</button></div></div>
      <div className="card portfolio-profile-form"><p className="dashboard-kicker">YOUR PROFILE</p><h2>Introduce yourself</h2><p className="muted">These details appear on your portfolio. You can keep this simple while you are starting out.</p>
        <label className="practical-label" htmlFor="portfolio-name">Name to display</label><input id="portfolio-name" className="practical-textarea" value={name} onChange={(e) => saveText("sb-learner-name", e.target.value, setName)} placeholder="Your name" />
        <label className="practical-label" htmlFor="portfolio-headline">Professional title or area of interest</label><input id="portfolio-headline" className="practical-textarea" value={headline} onChange={(e) => saveText("sb-portfolio-headline", e.target.value, setHeadline)} placeholder="e.g. Aspiring Virtual Assistant" />
        <label className="practical-label" htmlFor="portfolio-about">Short introduction</label><textarea id="portfolio-about" className="practical-textarea" rows={3} value={about} onChange={(e) => saveText("sb-portfolio-about", e.target.value, setAbout)} placeholder="Describe the skills you are developing and the kind of work you are interested in." />
      </div>
      {showForm && <form className="card portfolio-project-form" onSubmit={submitProject}>
        <p className="dashboard-kicker">PROJECT DETAILS</p><h2>{editingId ? "Update project" : "Add a project"}</h2><p className="muted">Use a practice task, personal project, or sample you created during learning. Do not include confidential client information.</p>
        <label className="practical-label" htmlFor="project-title">Project name *</label><input id="project-title" className="practical-textarea" required value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} placeholder="e.g. Customer enquiry response samples" />
        <label className="practical-label" htmlFor="project-objective">Goal or objective</label><textarea id="project-objective" className="practical-textarea" rows={2} value={draft.objective} onChange={(e) => setDraft({ ...draft, objective: e.target.value })} placeholder="What were you trying to demonstrate or solve?" />
        <label className="practical-label" htmlFor="project-tasks">What you did</label><textarea id="project-tasks" className="practical-textarea" rows={3} value={draft.tasks} onChange={(e) => setDraft({ ...draft, tasks: e.target.value })} placeholder="Describe the steps you completed." />
        <label className="practical-label" htmlFor="project-skills">Skills demonstrated</label><input id="project-skills" className="practical-textarea" value={draft.skills} onChange={(e) => setDraft({ ...draft, skills: e.target.value })} placeholder="e.g. research, clear writing, organization" />
        <label className="practical-label" htmlFor="project-tools">Tools used (optional)</label><input id="project-tools" className="practical-textarea" value={draft.tools} onChange={(e) => setDraft({ ...draft, tools: e.target.value })} placeholder="e.g. Google Docs, Excel, Canva" />
        <label className="practical-label" htmlFor="project-outcome">Outcome or what you learned</label><textarea id="project-outcome" className="practical-textarea" rows={2} value={draft.outcome} onChange={(e) => setDraft({ ...draft, outcome: e.target.value })} placeholder="What did the project show, or what did you learn?" />
        <label className="practical-label" htmlFor="project-link">Project link (optional)</label><input id="project-link" className="practical-textarea" type="url" value={draft.link} onChange={(e) => setDraft({ ...draft, link: e.target.value })} placeholder="https://…" />
        <div className="button-row"><button className="btn" type="submit">{editingId ? "Save changes" : "Save project"}</button><button className="btn ghost" type="button" onClick={cancelEdit}>Cancel</button></div>
      </form>}
      {message && <p className="portfolio-message" role="status">{message}</p>}
      <div className="card"><div className="portfolio-section-heading"><div><p className="dashboard-kicker">YOUR WORK</p><h2>Projects</h2></div><span className="level-pill">{projects.length} {projects.length === 1 ? "project" : "projects"}</span></div>
        {projects.length ? <div className="portfolio-project-grid">{projects.map((project) => <article className="portfolio-project-card" key={project.id}><div className="portfolio-project-top"><span className="portfolio-project-mark" aria-hidden="true">✦</span><span className="portfolio-project-label">PROJECT</span></div><h3>{project.title}</h3>{project.objective && <><h4>Goal</h4><p>{project.objective}</p></>}{project.tasks && <><h4>What I did</h4><p className="portfolio-preserve-lines">{project.tasks}</p></>}{project.skills && <><h4>Skills demonstrated</h4><div className="skill-tags">{project.skills.split(",").map((skill) => skill.trim()).filter(Boolean).map((skill, i) => <span className="skill-tag" key={`${skill}-${i}`}>{skill}</span>)}</div></>}{project.tools && <p><strong>Tools:</strong> {project.tools}</p>}{project.outcome && <><h4>Outcome / learning</h4><p>{project.outcome}</p></>}{project.link && <p className="portfolio-link"><a href={project.link} target="_blank" rel="noreferrer">View project link ↗</a></p>}<div className="portfolio-card-actions portfolio-screen-only"><button type="button" className="btn ghost" onClick={() => startEdit(project)}>Edit</button><button type="button" className="btn ghost" onClick={() => removeProject(project.id)}>Remove</button></div></article>)}</div> : <div className="dashboard-empty"><h3>Your first project can go here</h3><p>Add a practice project, sample task, or personal piece of work. It does not need to come from a paid job.</p><button className="btn" type="button" onClick={() => setShowForm(true)}>＋ Add your first project</button></div>}
      </div>
      <div className="card"><p className="dashboard-kicker">LEARNING ACHIEVEMENTS</p><h2>Courses and certificates</h2><p className="muted">Select which learning records you want to show. These are course achievements, not employment experience.</p>
        {earned.length ? <div className="portfolio-achievement-list">{earned.map((item) => <label className="portfolio-achievement" key={item.slug}><input type="checkbox" checked={selectedCourses.includes(item.slug)} onChange={(e) => saveSelected(e.target.checked ? [...new Set([...selectedCourses, item.slug])] : selectedCourses.filter((slug) => slug !== item.slug))} /><span><strong>{item.title}</strong><small>{item.category || "Skill development"} · {item.basicDone}/{item.moduleCount} Basic Skills modules · {item.practicalDone} practical projects · Final exam {item.examPassed ? "passed" : "not passed"}</small>{item.certificate && item.examPassed && <small>Certificate earned · {new Date(item.certificate.completedAt).toLocaleDateString()}</small>}</span></label>)}</div> : <p>Your learning achievements will appear here as you make progress in your courses.</p>}
        {certificates.length > 0 && <p className="muted">You have {certificates.length} earned {certificates.length === 1 ? "certificate" : "certificates"}. Selected course records will be included in the printed portfolio.</p>}
      </div>
    </div>

    <article className="portfolio-print-document" aria-label="Portfolio document">
      <header className="portfolio-print-header"><p className="portfolio-print-brand">SKILLBRIDGE · PORTFOLIO</p><h1>{name.trim() || "My Portfolio"}</h1>{headline && <p className="portfolio-print-headline">{headline}</p>}{about && <p className="portfolio-print-about">{about}</p>}</header>
      <section className="portfolio-print-section"><h2>Projects</h2>{projects.length ? projects.map((project) => <article className="portfolio-print-project" key={project.id}><h3>{project.title}</h3>{project.objective && <p><strong>Objective:</strong> {project.objective}</p>}{project.tasks && <p><strong>What I did:</strong> {project.tasks}</p>}{project.skills && <p><strong>Skills:</strong> {project.skills}</p>}{project.tools && <p><strong>Tools:</strong> {project.tools}</p>}{project.outcome && <p><strong>Outcome / learning:</strong> {project.outcome}</p>}{project.link && <p><strong>Link:</strong> {project.link}</p>}</article>) : <p>No projects have been added yet.</p>}</section>
      <section className="portfolio-print-section"><h2>Selected learning achievements</h2>{earned.filter((item) => selectedCourses.includes(item.slug)).length ? earned.filter((item) => selectedCourses.includes(item.slug)).map((item) => <article className="portfolio-print-achievement" key={item.slug}><h3>{item.title}</h3><p>{item.category || "Skill development"} · {item.basicDone}/{item.moduleCount} Basic Skills modules completed · {item.practicalDone} practical projects completed · Final exam {item.examPassed ? "passed" : "not passed"}</p>{item.certificate && item.examPassed && <p>Certificate earned on {new Date(item.certificate.completedAt).toLocaleDateString()} · Certificate ID: {item.certificate.id}</p>}</article>) : <p>No course achievements selected.</p>}</section>
      <footer className="portfolio-print-footer">Projects and course achievements reflect learning and practice. They are not presented as employment history.</footer>
    </article>
    <p className="muted portfolio-screen-only">Your portfolio is saved in this browser on this device. It is not uploaded or shared automatically. Remove private information before sharing project links.</p>
    <style jsx global>{`
      .portfolio-page{max-width:1050px}.portfolio-page h2{margin:.15rem 0 .7rem}.portfolio-profile-form,.portfolio-project-form{margin:1rem 0}.portfolio-section-heading{display:flex;align-items:center;justify-content:space-between;gap:1rem}.portfolio-project-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1rem;margin-top:1rem}.portfolio-project-card{min-width:0;padding:1.1rem;border:1px solid #d8e2d8;border-radius:18px;background:#fffefc;overflow-wrap:anywhere}.portfolio-project-card h3{font-size:1.2rem;margin:.4rem 0 .75rem;color:#20392b}.portfolio-project-card h4{font-size:.82rem;text-transform:uppercase;letter-spacing:.04em;color:#607569;margin:1rem 0 .25rem}.portfolio-project-card p{line-height:1.6;margin:.25rem 0}.portfolio-project-top{display:flex;align-items:center;justify-content:space-between}.portfolio-project-mark{display:grid;place-items:center;width:2.4rem;height:2.4rem;border-radius:12px;background:#e2f1e3;color:#188254}.portfolio-project-label{font-size:.7rem;font-weight:800;letter-spacing:.12em;color:#6b7e72}.portfolio-card-actions{display:flex;gap:.5rem;margin-top:1rem}.portfolio-card-actions .btn{font-size:.82rem;padding:.5rem .8rem}.portfolio-message{padding:.7rem 1rem;border-radius:12px;background:#edf7ee;color:#24583b}.portfolio-preserve-lines{white-space:pre-wrap}.portfolio-link a{color:#18764b;text-decoration:underline;overflow-wrap:anywhere}.portfolio-achievement-list{display:grid;gap:.6rem;margin-top:1rem}.portfolio-achievement{display:flex;align-items:flex-start;gap:.8rem;padding:.9rem;border:1px solid #d8e2d8;border-radius:14px;background:#fffefc;cursor:pointer}.portfolio-achievement input{margin-top:.25rem;accent-color:#188254}.portfolio-achievement span,.portfolio-achievement small{display:block}.portfolio-achievement small{margin-top:.3rem;color:#607569;line-height:1.5}.portfolio-print-document{display:none}.portfolio-print-header{padding-bottom:1.2rem;border-bottom:2px solid #b9d7c0}.portfolio-print-brand{font-size:.75rem;letter-spacing:.15em;font-weight:800;color:#26724c}.portfolio-print-header h1{font-size:2.5rem;margin:.3rem 0;color:#1c5137}.portfolio-print-headline{font-size:1.1rem;font-weight:700;margin:.2rem 0}.portfolio-print-about{line-height:1.65;white-space:pre-wrap}.portfolio-print-section{margin-top:1.4rem}.portfolio-print-section h2{font-size:1.25rem;padding-bottom:.35rem;border-bottom:1px solid #d4e2d5;color:#1c5137}.portfolio-print-project,.portfolio-print-achievement{padding:.75rem 0;border-bottom:1px solid #e2e9e1;break-inside:avoid}.portfolio-print-project h3,.portfolio-print-achievement h3{margin:.1rem 0 .4rem;font-size:1rem}.portfolio-print-project p,.portfolio-print-achievement p{margin:.25rem 0;line-height:1.5;white-space:pre-wrap;overflow-wrap:anywhere}.portfolio-print-footer{margin-top:1.5rem;padding-top:.75rem;border-top:1px solid #d4e2d5;color:#5a6c60;font-size:.8rem}
      @media(max-width:700px){.portfolio-project-grid{grid-template-columns:1fr}.portfolio-section-heading{align-items:flex-start}}
      @media print{body *{visibility:hidden!important}.portfolio-print-document,.portfolio-print-document *{visibility:visible!important}.portfolio-print-document{display:block!important;position:absolute;left:0;top:0;width:100%;padding:0 1.1cm;color:#20392b;background:#fff;font-family:Arial,sans-serif;font-size:10.5pt}.portfolio-screen-only{display:none!important}.portfolio-page{max-width:none!important;margin:0!important;padding:0!important}.portfolio-print-project,.portfolio-print-achievement{break-inside:avoid}a{color:inherit;text-decoration:none}}
    `}</style>
  </section>;
}
