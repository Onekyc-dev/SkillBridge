import { courses } from "../lib/courses";
import CourseBrowser from "../components/CourseBrowser";

export default function Home() {
  return (
    <>
      <section className="hero">
        <h1>Learn a skill. Then see exactly where to apply.</h1>
        <p>Short free courses that finish with a hand-picked list of places hiring for that skill.</p>
      </section>
      <section>
        <h2>Courses</h2>
        <CourseBrowser courses={courses} />
        <p className="muted">More courses are on the way.</p>
      </section>
    </>
  );
}
