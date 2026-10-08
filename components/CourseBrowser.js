"use client";
import Link from "next/link";
import { useState } from "react";

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
          <Link key={c.slug} href={`/courses/${c.slug}`} className="card">
            <p className="muted">{c.category}</p>
            <h3>{c.title}</h3>
            <p>{c.summary}</p>
            <p className="muted">{c.level} · {c.duration} · {c.modules.length} modules</p>
          </Link>
        ))}
      </div>
      {shown.length === 0 && <p className="muted">No courses match. Try clearing a filter.</p>}
    </>
  );
}
