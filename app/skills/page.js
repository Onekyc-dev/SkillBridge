import Link from "next/link";
import { courses } from "../../lib/courses";
import { checks } from "../../lib/checks";
import SkillFlow from "../../components/SkillFlow";

export const metadata = {
  title: "I already have this skill | SkillBridge",
  description: "Skip the lessons. Take a quick 5-question check and see where to apply.",
};

export default function SkillsPage({ searchParams }) {
  const slug = searchParams ? searchParams.skill : undefined;
  const course = courses.find((c) => c.slug === slug);

  if (!course || !checks[slug]) {
    return (
      <section className="stage">
        <Link href="/" className="back">&larr; Home</Link>
        <h1>I already have this skill</h1>
        <p className="lead-text">Pick your skill. You will answer 5 quick questions, then see places that hire for it.</p>
        <div className="grid">
          {courses.map((c) => (
            <Link key={c.slug} href={`/skills?skill=${c.slug}`} className="card course-card">
              <p className="muted c-cat">{c.category}</p>
              <h3>{c.title.replace(/ Basics$/, "")}</h3>
              <p>{c.summary}</p>
            </Link>
          ))}
        </div>
      </section>
    );
  }

  return <SkillFlow data={{ slug, title: course.title, check: checks[slug], jobs: course.jobs }} />;
}
