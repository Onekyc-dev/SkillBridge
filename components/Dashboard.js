"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

function Icon({ name }) {
  const common = { width: 25, height: 25, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true };
  const paths = {
    started: <><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5z"/><path d="M4 5.5v16M8 7h8M8 11h7"/></>,
    completed: <><circle cx="12" cy="12" r="9"/><path d="m8 12 2.5 2.5L16.5 8"/></>,
    modules: <><rect x="4" y="4" width="16" height="16" rx="3"/><path d="m8 12 2.5 2.5L16.5 8"/></>,
    skills: <><path d="M9 18h6M10 22h4"/><path d="M8.2 14.5a6 6 0 1 1 7.6 0c-.9.7-1.3 1.5-1.4 2.5h-4.8c-.1-1-.5-1.8-1.4-2.5Z"/><path d="M12 2v2M4.9 4.9l1.4 1.4M19.1 4.9l-1.4 1.4"/></>,
    learn: <><path d="M3 8.5 12 4l9 4.5-9 4.5z"/><path d="M6.5 10.5V16c3.5 2.5 7.5 2.5 11 0v-5.5M21 9v6"/></>,
    certificate: <><circle cx="12" cy="8" r="5"/><path d="m8.5 12-1 9 4.5-2.5 4.5 2.5-1-9"/><path d="m10 8 1.3 1.3L14 6.5"/></>,
    career: <><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18M10 12v2h4v-2"/></>,
    arrow: <><path d="M5 12h14M13 6l6 6-6 6"/></>,
  };
  return <svg {...common}>{paths[name] || paths.learn}</svg>;
}

export default function Dashboard({ courses = [] }) {
  const [progress, setProgress] = useState(null);
  const [learningData, setLearningData] = useState({});

  useEffect(() => {
    const loadProgress = () => {
      const values = {};
      const learningValues = {};
      for (const course of courses) {
        try { learningValues[course.slug] = JSON.parse(localStorage.getItem(`sb-learning-${course.slug}`) || "{}"); } catch { learningValues[course.slug] = {}; }
        let count = 0;
        try {
          const raw = localStorage.getItem(`sb-progress-${course.slug}`);
          const parsed = raw ? JSON.parse(raw) : 0;
          if (typeof parsed === "number") count = parsed;
          else if (typeof parsed === "string") count = Number(parsed) || 0;
          else if (Array.isArray(parsed)) count = parsed.length;
          else if (parsed && typeof parsed === "object") {
            if (typeof parsed.progress === "number") count = parsed.progress;
            else if (typeof parsed.completedCount === "number") count = parsed.completedCount;
            else if (Array.isArray(parsed.completedModules)) count = parsed.completedModules.length;
          }
        } catch {}
        values[course.slug] = Math.max(0, Math.min(course.moduleCount || 0, Number.isFinite(count) ? count : 0));
      }
      setProgress(values);
      setLearningData(learningValues);
    };
    loadProgress();
    window.addEventListener("focus", loadProgress);
    window.addEventListener("storage", loadProgress);
    return () => {
      window.removeEventListener("focus", loadProgress);
      window.removeEventListener("storage", loadProgress);
    };
  }, [courses]);

  if (!progress) return <section className="stage dashboard-page"><p className="muted">Loading your learning dashboard…</p></section>;

  const started = courses.filter((course) => progress[course.slug] > 0 || (learningData[course.slug]?.practicalDone || []).length > 0);
  const completed = courses.filter((course) => course.moduleCount > 0 && progress[course.slug] >= course.moduleCount && (learningData[course.slug]?.practicalDone || []).length >= 3 && Boolean(learningData[course.slug]?.examPassed));
  const certificates = courses.filter((course) => learningData[course.slug]?.certificate && learningData[course.slug]?.examPassed);
  const modulesDone = courses.reduce((total, course) => total + progress[course.slug], 0);
  const totalModules = courses.reduce((total, course) => total + (course.moduleCount || 0), 0);
  const skills = [...new Set(completed.map((course) => course.category).filter(Boolean))];
  const current = started.find((course) => { const data = learningData[course.slug] || {}; return !(progress[course.slug] >= course.moduleCount && (data.practicalDone || []).length >= 3 && data.examPassed); }) || started[0];

  const stats = [
    { key: "started", label: "Courses started", value: started.length, note: "Courses you've begun", tone: "mint" },
    { key: "completed", label: "Courses completed", value: completed.length, note: "Courses you've finished", tone: "lilac" },
    { key: "modules", label: "Modules completed", value: modulesDone, note: `Out of ${totalModules} available modules`, tone: "peach" },
    { key: "skills", label: "Skill areas", value: skills.length, note: "From completed courses", tone: "blue" },
  ];

  return <section className="stage dashboard-page">
    <div className="dashboard-heading">
      <div><p className="dashboard-kicker">YOUR SKILLBRIDGE SPACE</p><h1>Your learning dashboard</h1><p className="dashboard-intro">See your progress, keep learning, and take your next career step.</p></div>
      <div className="dashboard-actions"><Link href="/resume" className="btn ghost">My résumé</Link><Link href="/portfolio" className="btn ghost">My portfolio</Link><Link href="/courses" className="btn">Explore courses <Icon name="arrow" /></Link></div>
    </div>

    <div className="dashboard-stats" aria-label="Learning statistics">
      {stats.map((stat) => <article key={stat.key} className={`dashboard-stat stat-${stat.tone}`}>
        <span className="stat-icon"><Icon name={stat.key === "modules" ? "modules" : stat.key} /></span>
        <p>{stat.label}</p><strong>{stat.value}</strong><small>{stat.note}</small>
      </article>)}
    </div>

    <div className="dashboard-columns">
      <section className="dashboard-panel">
        <div className="panel-heading"><div><p className="dashboard-kicker">PICK UP WHERE YOU LEFT OFF</p><h2>Continue learning</h2></div><Link href="/my-courses" className="text-link">My courses <Icon name="arrow" /></Link></div>
        {current ? <Link href={`/courses/${current.slug}`} className="continue-course-card">
          <div className="continue-course-art" aria-hidden="true"><Icon name="learn" /></div>
          <div className="continue-course-content"><span className="level-pill">{current.level || "Basic"}</span><h3>{current.title}</h3><p>{current.category || "Skill development"} · {progress[current.slug]} of {current.moduleCount} Basic Skills modules</p>
            <div className="progress" role="progressbar" aria-label={`${current.title} Basic Skills progress`} aria-valuenow={current.moduleCount ? Math.round(progress[current.slug] / current.moduleCount * 100) : 0} aria-valuemin={0} aria-valuemax={100}><span style={{ width: `${current.moduleCount ? Math.round(progress[current.slug] / current.moduleCount * 100) : 0}%` }} /></div>
            <strong className="continue-link">Continue course <Icon name="arrow" /></strong>
          </div>
        </Link> : <div className="dashboard-empty"><div className="empty-illustration"><Icon name="learn" /></div><h3>Your learning journey starts here</h3><p>Choose a course and start building practical skills. Your progress will appear here.</p><Link href="/courses" className="btn">Find your first course</Link></div>}

        <div className="panel-heading dashboard-subheading"><div><p className="dashboard-kicker">YOUR JOURNEY</p><h2>Your courses</h2></div></div>
        <div className="dashboard-course-list">{courses.map((course) => {
          const done = progress[course.slug] || 0;
          const data = learningData[course.slug] || {};
          const practicalDone = Array.isArray(data.practicalDone) ? data.practicalDone.length : 0;
          const basicPct = course.moduleCount ? done / course.moduleCount : 0;
          const pct = Math.round(basicPct * 50 + Math.min(practicalDone, 3) / 3 * 30 + (data.examPassed ? 20 : 0));
          return <Link key={course.slug} href={`/courses/${course.slug}`} className="dashboard-course-row">
            <span className="course-row-mark"><Icon name={pct >= 100 ? "completed" : "learn"} /></span>
            <span className="course-row-copy"><strong>{course.title}</strong><small>Basic {done}/{course.moduleCount} · Practical {practicalDone}/3 · Exam {data.examPassed ? "passed" : "not passed"} · {course.level || "Basic"}</small><span className="progress"><span style={{ width: `${pct}%` }} /></span></span>
            <strong className="course-row-pct">{pct}%</strong>
          </Link>;
        })}</div>
      </section>

      <aside className="dashboard-side">
        <section className="dashboard-panel skills-panel"><div className="side-title-icon mint-icon"><Icon name="skills" /></div><p className="dashboard-kicker">GROW YOUR PROFILE</p><h2>My skill areas</h2><p className="dashboard-description">Skills linked to courses you've completed.</p>{skills.length ? <div className="skill-tags">{skills.map((skill) => <span className="skill-tag" key={skill}>{skill}</span>)}</div> : <div className="soft-empty">Your skill areas will appear as you complete courses.</div>}<Link href="/courses" className="text-link">Explore courses <Icon name="arrow" /></Link></section>
        <section className="dashboard-panel certificate-panel"><div className="side-title-icon lilac-icon"><Icon name="certificate" /></div><p className="dashboard-kicker">YOUR ACHIEVEMENTS</p><h2>My certificates</h2><p className="dashboard-description">Certificates are available after both stages and the final exam are complete.</p>{certificates.length ? <div className="certificate-list">{certificates.map((course) => <article className="certificate-mini" key={course.slug}><strong>{course.title}</strong><small>Completed {new Date(learningData[course.slug].certificate.completedAt).toLocaleDateString()}</small><small>ID: {learningData[course.slug].certificate.id}</small><Link className="text-link" href={`/certificates/${course.slug}`}>View certificate →</Link></article>)}</div> : <span className="coming-label">Complete both stages and pass a final exam to earn your first certificate.</span>}</section>
        <section className="dashboard-panel career-panel"><div className="side-title-icon peach-icon"><Icon name="career" /></div><p className="dashboard-kicker">YOUR NEXT CHAPTER</p><h2>Turn your skills into opportunities</h2><p className="dashboard-description">Build towards your career goals with skill resources and job links.</p><Link href="/skills" className="btn btn-soft">Explore job links by skill</Link><p><Link href="/resume" className="text-link">Build my résumé →</Link></p><p><Link href="/portfolio" className="text-link">Build my portfolio →</Link></p></section>
      </aside>
    </div>
    <p className="dashboard-storage-note">Your learning progress is currently saved in this browser on this device. It does not yet sync across devices.</p>
  </section>;
}
