import { courses } from "../lib/courses";
import Hero from "../components/Hero";
import Steps from "../components/Steps";
import ContinueCard from "../components/ContinueCard";
import SkillsPicker from "../components/SkillsPicker";
import CourseBrowser from "../components/CourseBrowser";

export default function Home() {
  // Send the browser only what these components need, not the full lesson text.
  const progressData = courses.map((c) => ({ slug: c.slug, title: c.title, modules: c.modules.map((m) => m.title) }));
  const cards = courses.map((c) => ({
    slug: c.slug, title: c.title, category: c.category, level: c.level,
    minutes: c.minutes, duration: c.duration, summary: c.summary, count: c.modules.length,
  }));

  return (
    <>
      <Hero />
      <ContinueCard courses={progressData} />
      <Steps />
      <section id="courses" className="scroll-rise">
        <h2>Courses</h2>
        <CourseBrowser courses={cards} />
        <p className="muted">More courses are on the way.</p>
      </section>
      <section id="have-skill" className="skillbar scroll-rise">
        <h2>Already have a skill?</h2>
        <p>Skip the lessons. Answer 5 quick questions and go straight to places that hire for it.</p>
        <SkillsPicker skills={cards} />
      </section>
      <section className="trust scroll-rise">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 3l8 3v6c0 4.5-3.2 8.2-8 9-4.8-.8-8-4.5-8-9V6z" /><path d="M8.5 12l2.5 2.5 4.5-5" />
        </svg>
        <p><strong>Hand-picked job sites, with scam warnings built into the courses.</strong> Real employers never ask you to pay to get a job.</p>
      </section>
    </>
  );
}
