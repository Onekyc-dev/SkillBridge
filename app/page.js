import Link from "next/link";
import { courses } from "../lib/courses";

export default function Home() {
  return (
    <>
      <section className="hero">
        <h1>Learn a skill. Then see exactly where to apply.</h1>
        <p>Short free courses that finish with a hand-picked list of places hiring for that skill.</p>
      </section>
      <section>
        <h2>Courses</h2>
        <div className="grid">
          {courses.map((c) => (
            <Link key={c.slug} href={`/courses/${c.slug}`} className="card">
              <h3>{c.title}</h3>
              <p>{c.summary}</p>
              <p className="muted">{c.level} · {c.duration} · {c.modules.length} modules</p>
            </Link>
          ))}
        </div>
        <p className="muted">More courses are on the way.</p>
      </section>
    </>
  );
}
