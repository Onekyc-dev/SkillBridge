"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

const C = 2 * Math.PI * 26;

export default function ContinueCard({ courses }) {
  const { data: session, status } = useSession();
  const [row, setRow] = useState(null);

  useEffect(() => {
    try {
      const started = courses
        .map((c) => ({ ...c, done: Number(localStorage.getItem(`sb-progress-${c.slug}`) || 0) }))
        .find((c) => c.done > 0 && c.done < c.modules.length);
      setRow(started || null);
    } catch {}
  }, [courses]);

  if (status !== "authenticated" || !row) return null;

  const total = row.modules.length;
  const pct = row.done / total;
  const first = session?.user?.name ? session.user.name.split(" ")[0] : "";

  return (
    <section className="continue stage">
      <svg className="ring-sm" viewBox="0 0 64 64" aria-hidden="true">
        <circle cx="32" cy="32" r="26" fill="none" stroke="#DDE8DF" strokeWidth="7" />
        <circle cx="32" cy="32" r="26" fill="none" stroke="#1E9B57" strokeWidth="7" strokeLinecap="round"
          strokeDasharray={`${pct * C} ${C}`} transform="rotate(-90 32 32)" />
        <text x="32" y="37" textAnchor="middle" fontSize="15" fontWeight="800" fill="#0E5A33">{Math.round(pct * 100)}%</text>
      </svg>
      <div className="continue-text">
        <p className="eyebrow">{first ? `Welcome back, ${first}` : "Welcome back"}</p>
        <h2>{row.title}</h2>
        <p className="muted">Next up: module {row.done + 1}, {row.modules[row.done]}</p>
      </div>
      <Link className="btn" href={`/courses/${row.slug}`}>Continue</Link>
    </section>
  );
}
