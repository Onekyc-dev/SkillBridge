import Link from "next/link";
import { CONTACT_EMAIL } from "../../lib/site";

export const metadata = {
  title: "About | SkillBridge",
  description: "What SkillBridge is, how it works and how to contact us.",
};

export default function AboutPage() {
  return (
    <section className="stage prose">
      <Link href="/" className="back">&larr; Home</Link>
      <h1>About SkillBridge</h1>
      <p className="lead-text">SkillBridge is a free place to learn a beginner skill, then see hand-picked websites where people hire for it.</p>

      <h2>How it works</h2>
      <ol className="flags">
        <li><strong>Learn.</strong> Take a short written course. Each module has a diagram, a practice task and a quick quiz.</li>
        <li><strong>Prove it.</strong> Already have the skill? Answer 5 quick questions instead.</li>
        <li><strong>Apply.</strong> See job sites that suit the skill, with a first step for each.</li>
      </ol>

      <h2>Our promise</h2>
      <ul className="checklist">
        <li>Courses and job lists are free for learners.</li>
        <li>We pick less crowded, lower-scam job sites, and tell you when a site charges a fee.</li>
        <li>We may show ads to keep the site free. Ads are clearly marked and you can skip them.</li>
        <li>We never ask you to pay to get a job. Read our <Link href="/safety" className="inline-link">scam safety guide</Link>.</li>
      </ul>

      <h2 id="contact">Contact and feedback</h2>
      <p>Found a broken link, a mistake in a lesson, or a suspicious job site? Please tell us.</p>
      {CONTACT_EMAIL ? (
        <p><a className="btn" href={`mailto:${CONTACT_EMAIL}`}>Email {CONTACT_EMAIL}</a></p>
      ) : (
        <p className="muted">Contact details are coming soon.</p>
      )}
    </section>
  );
}
