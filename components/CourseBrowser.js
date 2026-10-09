"use client";
import Link from "next/link";
import { useState } from "react";

const TONES = { "Admin & Support": "sun", "Data & Research": "sky", "Writing & Content": "rose", "Customer Support": "mint" };

function Icon({ category }) {
  const p = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true" };
  if (category === "Admin & Support")
    return <svg {...p}><path d="M9 6h11M9 12h11M9 18h11M4 6l1 1 2-2M4 12l1 1 2-2M4 18l1 1 2-2" /></svg>;
  if (category === "Data & Research")
    return <svg {...p}><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 10h18M9 4v16" /></svg>;
  if (category === "Writing & Content")
    return <svg {...p}><path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" /></svg>;
  if (category === "Customer Support")
    return <svg {...p}><path d="M21 12a8 8 0 0 1-11.6 7.1L3 21l1.9-5.4A8 8 0 1 1 21 12z" /></svg>;
  return <svg {...p}><path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2zM4 19V5" /></svg>;
}

export default function CourseBrowser({ courses }) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const [level, setLevel] = useState("All");
  const [length, setLength] = useState("All");

  const cats = ["All", ...new Set(courses.map((c) => c.category))];
  const levels = ["All", ...new Set(courses.map((c) => c.level))];

  const shown = courses.filter((c) =>
    (cat === "All" || c.category === cat) &&
    (level === "All" || c.level === level) &&
    (length === "All" || (length === "short" ? c.minutes < 60 : c.minutes >= 60)) &&
    `${c.title} ${c.summary}`.toLowerCase().includes(q.trim().toLowerCase())
  );

  return (
    <>
      <div className="filters">
        <input
          type="search"
          placeholder="Search courses"
          aria-label="Search courses"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <select aria-label="Category" value={cat} onChange={(e) => setCat(e.target.value)}>
          {cats.map((c) => <option key={c} value={c}>{c === "All" ? "All categories" : c}</option>)}
        </select>
        <select aria-label="Level" value={level} onChange={(e) => setLevel(e.target.value)}>
          {levels.map((l) => <option key={l} value={l}>{l === "All" ? "All levels" : l}</option>)}
        </select>
        <select aria-label="Length" value={length} onChange={(e) => setLength(e.target.value)}>
          <option value="All">Any length</option>
          <option value="short">Under 1 hour</option>
          <option value="long">1 hour or more</option>
        </select>
      </div>
      <div className="grid">
        {shown.map((c) => (
          <Link key={c.slug} href={`/courses/${c.slug}`} className={`card course-card tone-${TONES[c.category] || "leaf"}`}>
            <span className="c-icon"><Icon category={c.category} /></span>
            <p className="muted c-cat">{c.category}</p>
            <h3>{c.title}</h3>
            <p>{c.summary}</p>
            <p className="c-meta">
              <span>{c.level}</span>
              <span>{c.duration}</span>
              <span>{c.count} modules</span>
            </p>
          </Link>
        ))}
      </div>
      {shown.length === 0 && <p className="muted">No courses match. Try clearing a filter.</p>}
    </>
  );
}
