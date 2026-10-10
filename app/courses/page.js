import Link from "next/link";
import { courses } from "../../lib/courses";
import CourseBrowser from "../../components/CourseBrowser";

export const metadata = {
  title: "Courses | SkillBridge",
  description: "Free beginner courses. Pick a category or search.",
};

export default function CoursesPage({ searchParams }) {
  const cat = searchParams && typeof searchParams.category === "string" ? searchParams.category : undefined;
  const cards = courses.map((c) => ({
    slug: c.slug, title: c.title, category: c.category, level: c.level,
    minutes: c.minutes, duration: c.duration, summary: c.summary, count: c.modules.length,
  }));
  return (
    <section className="stage">
      <Link href="/" className="back">&larr; Home</Link>
      <h1>Courses</h1>
      <p className="lead-text">Free beginner courses. Pick a category, or search for what you want to learn.</p>
      <CourseBrowser key={cat || "all"} courses={cards} initialCat={cat} />
    </section>
  );
}
