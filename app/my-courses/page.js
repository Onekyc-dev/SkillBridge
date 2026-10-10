import { courses } from "../../lib/courses";
import MyCourses from "../../components/MyCourses";

export const metadata = {
  title: "My courses | SkillBridge",
  description: "See the courses you started and how far you have got.",
};

export default function MyCoursesPage() {
  const cards = courses.map((c) => ({ slug: c.slug, title: c.title, category: c.category, count: c.modules.length }));
  return (
    <section className="stage">
      <h1>My courses</h1>
      <MyCourses courses={cards} />
    </section>
  );
}
