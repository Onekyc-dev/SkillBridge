"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "sb-resume-builder-v2";
const JOB_INTERESTS = ["Virtual Assistant", "Data Entry", "Content Writing", "Customer Service", "Social Media Management", "Graphic Design", "Web Research", "Freelance Work", "Other"];
const SKILL_OPTIONS = ["Communication", "Organization", "Time management", "Problem solving", "Customer support", "Data entry", "Online research", "Writing and editing", "Spreadsheet skills", "Social media", "Graphic design", "Attention to detail", "Email management", "Microsoft Office", "Google Workspace", "Fact-checking", "Learning new tools"];
const QUALITIES = ["Organized", "Clear communicator", "Quick to learn new tools", "Problem solver", "Reliable", "Detail-oriented", "Creative", "Adaptable", "Self-motivated"];
const emptyProject = () => ({ title: "", objective: "", tasks: "", tools: "", outcome: "", link: "" });
const emptyJob = () => ({ title: "", company: "", start: "", end: "", current: false, responsibilities: "", achievements: "" });
const emptyData = {
  fullName: "", professionalTitle: "", location: "", phone: "", email: "", linkedin: "", website: "",
  interests: [], skills: [], customSkills: "", qualities: [], summaryNotes: "", summary: "",
  educationLevel: "", institution: "", qualification: "", field: "", graduationYear: "",
  hasExperience: "no", jobs: [emptyJob()], projects: [emptyProject()], includeCourses: true, includeCertificates: true,
};

function splitLines(value) { return String(value || "").split("\n").map((line) => line.trim()).filter(Boolean); }
function makeSummary(data) {
  const interests = data.interests || [];
  const skills = [...(data.skills || []), ...splitLines(data.customSkills)];
  const qualities = data.qualities || [];
  const roleText = interests.length ? `interested in opportunities in ${interests.join(", ")}` : "building practical workplace skills";
  const skillText = skills.length ? `with strengths in ${skills.join(", ")}` : "with a focus on developing reliable, transferable skills";
  const qualityText = qualities.length ? `Known for being ${qualities.join(", ").toLowerCase()}` : "Eager to learn, contribute, and grow professionally";
  const note = String(data.summaryNotes || "").trim();
  return `${data.fullName ? data.fullName.trim() + " is " : ""}${roleText}, ${skillText}. ${qualityText}.${note ? ` ${note}` : ""}`;
}

function Field({ label, children, hint }) {
  return <label className="rb-field"><span className="rb-label">{label}</span>{children}{hint ? <small className="rb-hint">{hint}</small> : null}</label>;
}
function TextInput(props) { return <input {...props} className={`rb-input ${props.className || ""}`} />; }
function TextArea(props) { return <textarea {...props} className={`rb-input rb-area ${props.className || ""}`} />; }
function Section({ number, title, intro, children }) {
  return <section className="card rb-section"><div className="rb-section-heading"><span className="rb-number">{number}</span><div><h2>{title}</h2>{intro ? <p className="muted">{intro}</p> : null}</div></div>{children}</section>;
}

export default function LearnerResume({ courses = [] }) {
  const [data, setData] = useState(emptyData);
  const [loaded, setLoaded] = useState(false);
  const [view, setView] = useState("editor");
  const [portfolio, setPortfolio] = useState(false);
  const [records, setRecords] = useState([]);
  const [saveMessage, setSaveMessage] = useState("Saved on this device");

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
      if (saved && typeof saved === "object") setData({ ...emptyData, ...saved, jobs: Array.isArray(saved.jobs) && saved.jobs.length ? saved.jobs : [emptyJob()], projects: Array.isArray(saved.projects) && saved.projects.length ? saved.projects : [emptyProject()] });
      else {
        // Preserve the earlier simple résumé fields when upgrading the builder.
        const oldName = localStorage.getItem("sb-learner-name") || "";
        const oldSummary = localStorage.getItem("sb-resume-summary") || "";
        setData((current) => ({ ...current, fullName: oldName, summaryNotes: oldSummary }));
      }
    } catch {}
    const next = courses.map((course) => {
      let learning = {};
      try { learning = JSON.parse(localStorage.getItem(`sb-learning-${course.slug}`) || "{}"); } catch {}
      let legacy = 0;
      try { legacy = Number(localStorage.getItem(`sb-progress-${course.slug}`) || 0); } catch {}
      return { ...course, basicDone: Math.max(Number(learning.basicDone) || 0, legacy), practicalDone: Array.isArray(learning.practicalDone) ? learning.practicalDone.length : 0, examPassed: Boolean(learning.examPassed), certificate: learning.certificate || null };
    });
    setRecords(next);
    setLoaded(true);
  }, [courses]);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      localStorage.setItem("sb-learner-name", data.fullName || "");
      localStorage.setItem("sb-resume-summary", data.summary || makeSummary(data));
      setSaveMessage("Changes saved on this device");
    } catch { setSaveMessage("Could not save in this browser"); }
  }, [data, loaded]);

  const generatedSummary = useMemo(() => data.summary?.trim() || makeSummary(data), [data]);
  const active = records.filter((r) => r.basicDone > 0 || r.practicalDone > 0 || r.examPassed);
  const certificates = records.filter((r) => r.certificate && r.examPassed);
  const selectedSkills = [...(data.skills || []), ...splitLines(data.customSkills)];
  function update(key, value) { setData((old) => ({ ...old, [key]: value })); }
  function updateList(key, value, checked) { update(key, checked ? [...(data[key] || []).filter((x) => x !== value), value] : (data[key] || []).filter((x) => x !== value)); }
  function updateItem(key, index, patch) { update(key, data[key].map((item, i) => i === index ? { ...item, ...patch } : item)); }
  function printDocument(isPortfolio) { setPortfolio(isPortfolio); setView("preview"); setTimeout(() => window.print(), 100); }
  function startEditing() { setView("editor"); setPortfolio(false); }

  if (!loaded) return <section className="stage"><p className="muted">Loading your résumé builder…</p></section>;

  return <section className={`stage resume-page rb-page ${view === "preview" ? "rb-preview-mode" : ""}`}>
    <style jsx global>{`
      .rb-page{max-width:1080px;margin:0 auto}.rb-page .rb-section{margin:18px 0;padding:22px}.rb-section-heading{display:flex;gap:13px;align-items:flex-start;margin-bottom:20px}.rb-section-heading h2{margin:0 0 5px}.rb-section-heading .muted{margin:0}.rb-number{display:grid;place-items:center;min-width:34px;height:34px;border-radius:11px;background:rgba(83,220,166,.14);color:#42bd8e;font-weight:800}.rb-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}.rb-field{display:flex;flex-direction:column;gap:7px;min-width:0;margin-bottom:14px}.rb-label{font-weight:650;font-size:.93rem}.rb-input{width:100%;min-width:0;border:1px solid var(--line,#d8e0e4);border-radius:10px;padding:11px 12px;background:var(--surface,#fff);color:inherit;font:inherit}.rb-area{min-height:95px;resize:vertical}.rb-hint{opacity:.72;line-height:1.45}.rb-checks{display:flex;flex-wrap:wrap;gap:9px}.rb-check{display:flex;align-items:center;gap:7px;border:1px solid var(--line,#d8e0e4);border-radius:999px;padding:8px 11px;font-size:.9rem}.rb-check input{accent-color:#32b887}.rb-subcard{border:1px solid var(--line,#d8e0e4);border-radius:13px;padding:17px;margin:15px 0}.rb-subhead{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:12px}.rb-subhead h3{margin:0}.rb-actions{display:flex;flex-wrap:wrap;gap:10px;align-items:center}.rb-small-button{border:1px solid var(--line,#d8e0e4);border-radius:9px;padding:8px 11px;background:transparent;color:inherit;font:inherit;cursor:pointer}.rb-danger{color:#d05c5c}.rb-save-note{font-size:.83rem;opacity:.75}.rb-document{background:white;color:#20272d;border-radius:12px;padding:clamp(22px,5vw,54px);max-width:850px;margin:22px auto;box-shadow:0 10px 38px #0001;line-height:1.5}.rb-document h1{font-size:2rem;margin:0 0 4px;color:#17252d}.rb-document h2{font-size:1rem;letter-spacing:.08em;text-transform:uppercase;border-bottom:2px solid #46b88c;padding-bottom:6px;margin:25px 0 10px;color:#25383f}.rb-document h3{font-size:1rem;margin:12px 0 3px}.rb-document p{margin:5px 0;white-space:pre-wrap}.rb-contact{color:#58666b;font-size:.9rem;overflow-wrap:anywhere}.rb-doc-item{margin:12px 0;break-inside:avoid}.rb-doc-meta{font-size:.9rem;color:#58666b}.rb-document ul{padding-left:20px;margin:6px 0}.rb-empty-note{padding:14px;border-radius:10px;background:#f4f8f6;color:#4c5a56}.rb-preview-tools{display:flex;gap:10px;flex-wrap:wrap;justify-content:space-between;align-items:center}.rb-only-portfolio{display:none}.rb-preview-mode .rb-only-portfolio{display:block}
      @media(max-width:680px){.rb-grid{grid-template-columns:1fr}.rb-page .rb-section{padding:16px}.rb-document{padding:24px 19px}.rb-document h1{font-size:1.65rem}}
      @media print{body *{visibility:hidden!important} .rb-print-target,.rb-print-target *{visibility:visible!important}.rb-print-target{position:absolute!important;inset:0 auto auto 0!important;width:100%!important;max-width:none!important;margin:0!important;padding:12mm!important;box-shadow:none!important;border-radius:0!important;background:#fff!important;color:#20272d!important}.rb-no-print{display:none!important}@page{size:A4;margin:0}}
    `}</style>
    <div className="rb-no-print"><Link href="/dashboard" className="back">&larr; Dashboard</Link>
      <div className="dashboard-heading"><div><p className="dashboard-kicker">YOUR CAREER TOOLKIT</p><h1>Résumé & portfolio builder</h1><p className="dashboard-intro">Build it in stages, change anything whenever you need, and keep your information saved in this browser.</p></div></div>
      <div className="rb-actions" style={{ margin: "18px 0" }}><button className={`btn ${view === "editor" ? "" : "ghost"}`} onClick={startEditing}>Edit details</button><button className={`btn ${view === "preview" && !portfolio ? "" : "ghost"}`} onClick={() => { setView("preview"); setPortfolio(false); }}>Résumé preview</button><button className={`btn ${view === "preview" && portfolio ? "" : "ghost"}`} onClick={() => { setView("preview"); setPortfolio(true); }}>Portfolio preview</button><span className="rb-save-note">{saveMessage}</span></div>
    </div>

    {view === "editor" ? <>
      <Section number="1" title="Contact details" intro="Add only the details you want employers to see. You can leave optional fields blank.">
        <div className="rb-grid"><Field label="Full name"><TextInput value={data.fullName} onChange={(e) => update("fullName", e.target.value)} placeholder="Your name" autoComplete="name" /></Field><Field label="Professional title"><TextInput value={data.professionalTitle} onChange={(e) => update("professionalTitle", e.target.value)} placeholder="e.g. Entry-level Virtual Assistant" /></Field><Field label="Location"><TextInput value={data.location} onChange={(e) => update("location", e.target.value)} placeholder="City, country (optional)" autoComplete="address-level2" /></Field><Field label="Email"><TextInput type="email" value={data.email} onChange={(e) => update("email", e.target.value)} placeholder="you@example.com" autoComplete="email" /></Field><Field label="Phone"><TextInput type="tel" value={data.phone} onChange={(e) => update("phone", e.target.value)} placeholder="Phone number (optional)" autoComplete="tel" /></Field><Field label="LinkedIn profile"><TextInput value={data.linkedin} onChange={(e) => update("linkedin", e.target.value)} placeholder="Profile link (optional)" /></Field><Field label="Portfolio or website"><TextInput value={data.website} onChange={(e) => update("website", e.target.value)} placeholder="Website link (optional)" /></Field></div>
      </Section>
      <Section number="2" title="Professional direction" intro="Choose the work you are interested in. Your choices help draft a summary, and you can edit the wording yourself.">
        <Field label="Job interests"><div className="rb-checks">{JOB_INTERESTS.map((x) => <label className="rb-check" key={x}><input type="checkbox" checked={data.interests.includes(x)} onChange={(e) => updateList("interests", x, e.target.checked)} />{x}</label>)}</div></Field>
        <Field label="Skills you want to highlight"><div className="rb-checks">{SKILL_OPTIONS.map((x) => <label className="rb-check" key={x}><input type="checkbox" checked={data.skills.includes(x)} onChange={(e) => updateList("skills", x, e.target.checked)} />{x}</label>)}</div></Field>
        <Field label="Other skills (one per line)" hint="Add any skills that are missing from the list."><TextArea value={data.customSkills} onChange={(e) => update("customSkills", e.target.value)} placeholder={'e.g. Calendar management\nCanva'} /></Field>
        <Field label="Personal strengths"><div className="rb-checks">{QUALITIES.map((x) => <label className="rb-check" key={x}><input type="checkbox" checked={data.qualities.includes(x)} onChange={(e) => updateList("qualities", x, e.target.checked)} />{x}</label>)}</div></Field>
        <Field label="Extra details for your summary (optional)" hint="Only include things that are true about you."><TextArea value={data.summaryNotes} onChange={(e) => update("summaryNotes", e.target.value)} placeholder="What would you like an employer to know?" /></Field>
        <Field label="Professional summary — fully editable"><TextArea value={data.summary || makeSummary(data)} onChange={(e) => update("summary", e.target.value)} placeholder="Your summary will be drafted from your choices. Edit it freely." /><span className="rb-hint">The draft is a starting point, not a fixed template. You can rewrite it, clear it, or use your own words.</span></Field>
        <div className="rb-actions"><button className="btn ghost" onClick={() => update("summary", makeSummary(data))}>Refresh suggested summary</button><button className="rb-small-button" onClick={() => update("summary", "")}>Use automatic draft again</button></div>
      </Section>
      <Section number="3" title="Education & training" intro="Include formal education, training, or relevant qualifications. Blank fields will not appear in your résumé.">
        <div className="rb-grid"><Field label="Highest education level"><select className="rb-input" value={data.educationLevel} onChange={(e) => update("educationLevel", e.target.value)}><option value="">Choose (optional)</option>{["Secondary school", "Certificate", "Diploma", "Undergraduate degree", "Bachelor's degree", "Postgraduate degree", "Other", "Prefer not to say"].map((x) => <option key={x}>{x}</option>)}</select></Field><Field label="School or institution"><TextInput value={data.institution} onChange={(e) => update("institution", e.target.value)} placeholder="Institution name" /></Field><Field label="Qualification or certificate"><TextInput value={data.qualification} onChange={(e) => update("qualification", e.target.value)} placeholder="Qualification (optional)" /></Field><Field label="Field of study"><TextInput value={data.field} onChange={(e) => update("field", e.target.value)} placeholder="Field (optional)" /></Field><Field label="Graduation year"><TextInput value={data.graduationYear} onChange={(e) => update("graduationYear", e.target.value)} placeholder="Year (optional)" inputMode="numeric" /></Field></div>
      </Section>
      <Section number="4" title="Work experience" intro="Only add jobs, internships, or volunteer roles you actually held. If you are new to work, choose No and let your projects and training speak for you.">
        <div className="rb-checks" style={{ marginBottom: 15 }}><label className="rb-check"><input type="radio" name="has-experience" checked={data.hasExperience === "no"} onChange={() => update("hasExperience", "no")} />I don't have work experience yet</label><label className="rb-check"><input type="radio" name="has-experience" checked={data.hasExperience === "yes"} onChange={() => update("hasExperience", "yes")} />I have experience to add</label></div>
        {data.hasExperience === "yes" ? <>{data.jobs.map((job, index) => <div className="rb-subcard" key={index}><div className="rb-subhead"><h3>Role {index + 1}</h3>{data.jobs.length > 1 ? <button className="rb-small-button rb-danger" onClick={() => update("jobs", data.jobs.filter((_, i) => i !== index))}>Remove role</button> : null}</div><div className="rb-grid"><Field label="Job title"><TextInput value={job.title} onChange={(e) => updateItem("jobs", index, { title: e.target.value })} placeholder="Job title" /></Field><Field label="Company or organization"><TextInput value={job.company} onChange={(e) => updateItem("jobs", index, { company: e.target.value })} placeholder="Organization" /></Field><Field label="Start date"><TextInput value={job.start} onChange={(e) => updateItem("jobs", index, { start: e.target.value })} placeholder="e.g. Jan 2024" /></Field>{!job.current ? <Field label="End date"><TextInput value={job.end} onChange={(e) => updateItem("jobs", index, { end: e.target.value })} placeholder="e.g. Aug 2025" /></Field> : null}</div><label className="rb-check"><input type="checkbox" checked={job.current} onChange={(e) => updateItem("jobs", index, { current: e.target.checked, end: e.target.checked ? "" : job.end })} />I currently work here</label><Field label="Responsibilities"><TextArea value={job.responsibilities} onChange={(e) => updateItem("jobs", index, { responsibilities: e.target.value })} placeholder="One responsibility per line" /></Field><Field label="Achievements (optional)"><TextArea value={job.achievements} onChange={(e) => updateItem("jobs", index, { achievements: e.target.value })} placeholder="Real results or accomplishments; do not guess numbers" /></Field></div>)}<button className="rb-small-button" onClick={() => update("jobs", [...data.jobs, emptyJob()])}>+ Add another role</button></> : <div className="rb-empty-note">That's completely fine. Your résumé can highlight your course learning, practical projects, and skills without pretending you have job experience.</div>}
      </Section>
      <Section number="5" title="Practical projects" intro="Add class exercises, personal practice, or real projects. Describe honestly what you did and what you learned.">
        {data.projects.map((project, index) => <div className="rb-subcard" key={index}><div className="rb-subhead"><h3>Project {index + 1}</h3>{data.projects.length > 1 ? <button className="rb-small-button rb-danger" onClick={() => update("projects", data.projects.filter((_, i) => i !== index))}>Remove project</button> : null}</div><Field label="Project name"><TextInput value={project.title} onChange={(e) => updateItem("projects", index, { title: e.target.value })} placeholder="e.g. Customer enquiry response practice" /></Field><Field label="Objective"><TextArea value={project.objective} onChange={(e) => updateItem("projects", index, { objective: e.target.value })} placeholder="What were you trying to achieve?" /></Field><Field label="Tasks you completed"><TextArea value={project.tasks} onChange={(e) => updateItem("projects", index, { tasks: e.target.value })} placeholder="What did you personally do? One item per line." /></Field><div className="rb-grid"><Field label="Tools or skills used"><TextInput value={project.tools} onChange={(e) => updateItem("projects", index, { tools: e.target.value })} placeholder="Tools and skills" /></Field><Field label="Project link (optional)"><TextInput value={project.link} onChange={(e) => updateItem("projects", index, { link: e.target.value })} placeholder="Link to a shareable sample" /></Field></div><Field label="Outcome or what you learned"><TextArea value={project.outcome} onChange={(e) => updateItem("projects", index, { outcome: e.target.value })} placeholder="What was completed or learned?" /></Field></div>)}<button className="rb-small-button" onClick={() => update("projects", [...data.projects, emptyProject()])}>+ Add another project</button>
      </Section>
      <Section number="6" title="SkillBridge learning & certificates" intro="Choose which course achievements to show. Learning records are read from this browser and are not employment history.">
        <label className="rb-check"><input type="checkbox" checked={data.includeCourses} onChange={(e) => update("includeCourses", e.target.checked)} />Include course progress and practical learning</label><br/><label className="rb-check" style={{ marginTop: 9 }}><input type="checkbox" checked={data.includeCertificates} onChange={(e) => update("includeCertificates", e.target.checked)} />Include earned certificates</label>
        {active.length ? <div className="rb-subcard">{active.map((record) => <p key={record.slug}><strong>{record.title}</strong> — {record.basicDone}/{record.moduleCount} basic modules, {record.practicalDone} practical project(s); {record.examPassed ? "final exam passed" : "final exam not passed"}.</p>)}</div> : <p className="muted" style={{ marginTop: 12 }}>Your course progress will appear here as you learn.</p>}
        {certificates.length ? <div className="rb-subcard">{certificates.map((record) => <p key={record.slug}><strong>{record.title}</strong> — completed {new Date(record.certificate.completedAt).toLocaleDateString()} · Certificate ID: {record.certificate.id}</p>)}</div> : <p className="muted" style={{ marginTop: 12 }}>Earned certificates will appear here when available.</p>}
      </Section>
      <div className="card rb-no-print"><h2>Ready to review?</h2><p className="muted">Your details save automatically on this device. Review the preview, correct anything you want, then print or save just the résumé or portfolio as a PDF.</p><div className="rb-actions"><button className="btn" onClick={() => { setView("preview"); setPortfolio(false); window.scrollTo({ top: 0, behavior: "smooth" }); }}>Generate résumé preview</button><button className="btn ghost" onClick={() => { setView("preview"); setPortfolio(true); window.scrollTo({ top: 0, behavior: "smooth" }); }}>View portfolio preview</button></div></div>
    </> : <>
      <div className="rb-no-print rb-preview-tools"><p className="muted">Preview mode · Return to editing any time to correct or update details.</p><div className="rb-actions"><button className="btn ghost" onClick={startEditing}>← Edit details</button><button className="btn" onClick={() => printDocument(portfolio)}>Print / Save as PDF</button></div></div>
      {!portfolio ? <article className="rb-document rb-print-target"><header><h1>{data.fullName || "Your Name"}</h1>{data.professionalTitle ? <p><strong>{data.professionalTitle}</strong></p> : null}<p className="rb-contact">{[data.location, data.email, data.phone, data.linkedin, data.website].filter(Boolean).join(" · ")}</p></header>
        <h2>Professional summary</h2><p>{generatedSummary || "Add a professional summary in the editor."}</p>
        {selectedSkills.length ? <><h2>Skills</h2><p>{selectedSkills.join(" · ")}</p></> : null}
        {data.hasExperience === "yes" && data.jobs.some((j) => j.title || j.company || j.responsibilities || j.achievements) ? <><h2>Work experience</h2>{data.jobs.filter((j) => j.title || j.company || j.responsibilities || j.achievements).map((j, i) => <div className="rb-doc-item" key={i}><h3>{j.title || "Role"}{j.company ? ` · ${j.company}` : ""}</h3><p className="rb-doc-meta">{[j.start, j.current ? "Present" : j.end].filter(Boolean).join(" – ")}</p>{splitLines(j.responsibilities).length ? <ul>{splitLines(j.responsibilities).map((line, n) => <li key={n}>{line}</li>)}</ul> : null}{splitLines(j.achievements).length ? <ul>{splitLines(j.achievements).map((line, n) => <li key={n}>{line}</li>)}</ul> : null}</div>)}</> : null}
        {data.institution || data.qualification || data.educationLevel || data.field || data.graduationYear ? <><h2>Education & training</h2><div className="rb-doc-item"><h3>{data.qualification || data.educationLevel || "Education"}</h3><p>{[data.institution, data.field, data.graduationYear].filter(Boolean).join(" · ")}</p></div></> : null}
        {data.includeCourses && active.length ? <><h2>SkillBridge learning</h2>{active.map((r) => <div className="rb-doc-item" key={r.slug}><h3>{r.title}</h3><p>{r.category} · {r.basicDone}/{r.moduleCount} basic modules · {r.practicalDone} practical project(s) · {r.examPassed ? "Final exam passed" : "Final exam not passed"}</p></div>)}</> : null}
        {data.includeCertificates && certificates.length ? <><h2>Certificates</h2>{certificates.map((r) => <div className="rb-doc-item" key={r.slug}><h3>{r.title}</h3><p className="rb-doc-meta">Completed {new Date(r.certificate.completedAt).toLocaleDateString()} · ID: {r.certificate.id}</p></div>)}</> : null}
        {data.projects.some((p) => p.title || p.objective || p.tasks || p.outcome) ? <><h2>Projects</h2>{data.projects.filter((p) => p.title || p.objective || p.tasks || p.outcome).map((p, i) => <div className="rb-doc-item" key={i}><h3>{p.title || "Practical project"}</h3>{p.objective ? <p>{p.objective}</p> : null}{splitLines(p.tasks).length ? <ul>{splitLines(p.tasks).map((line, n) => <li key={n}>{line}</li>)}</ul> : null}{p.tools ? <p><strong>Tools / skills:</strong> {p.tools}</p> : null}{p.outcome ? <p><strong>Outcome:</strong> {p.outcome}</p> : null}{p.link ? <p><strong>Project link:</strong> {p.link}</p> : null}</div>)}</> : null}
      </article> : <article className="rb-document rb-print-target"><header><h1>{data.fullName ? `${data.fullName} — Portfolio` : "My Portfolio"}</h1><p className="rb-contact">{[data.professionalTitle, data.email, data.website].filter(Boolean).join(" · ")}</p></header><h2>About</h2><p>{generatedSummary}</p><h2>Skills</h2>{selectedSkills.length ? <p>{selectedSkills.join(" · ")}</p> : <p>Add skills in the editor to feature them here.</p>}<h2>Selected projects</h2>{data.projects.filter((p) => p.title || p.objective || p.tasks || p.outcome).length ? data.projects.filter((p) => p.title || p.objective || p.tasks || p.outcome).map((p, i) => <div className="rb-doc-item" key={i}><h3>{p.title || `Project ${i + 1}`}</h3>{p.objective ? <p><strong>Objective:</strong> {p.objective}</p> : null}{p.tasks ? <p><strong>Work completed:</strong> {p.tasks}</p> : null}{p.tools ? <p><strong>Tools / skills:</strong> {p.tools}</p> : null}{p.outcome ? <p><strong>Outcome / learning:</strong> {p.outcome}</p> : null}{p.link ? <p><strong>Link:</strong> {p.link}</p> : null}</div>) : <p>No projects added yet. You can add your course practice and personal projects in the editor.</p>}{data.includeCourses && active.length ? <><h2>Learning achievements</h2>{active.map((r) => <div className="rb-doc-item" key={r.slug}><h3>{r.title}</h3><p>{r.basicDone}/{r.moduleCount} basic modules completed · {r.practicalDone} practical project(s) · {r.examPassed ? "Final exam passed" : "Final exam not passed"}</p></div>)}</> : null}{data.includeCertificates && certificates.length ? <><h2>Certificates</h2>{certificates.map((r) => <p key={r.slug}>{r.title} — Certificate ID: {r.certificate.id}</p>)}</> : null}</article>}
    </>}
  </section>;
}
