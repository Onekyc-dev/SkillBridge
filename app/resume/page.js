import { courses } from "../../lib/courses";
import LearnerResume from "../../components/LearnerResume";
import { requireAuth } from "../../lib/requireAuth";

export const metadata = {
  title: "My résumé | SkillBridge",
  description:
    "Build a résumé from your course achievements and practice projects.",
};

export default async function ResumePage() {
  await requireAuth("/resume");

  const courseCards = courses.map((course) => ({
    slug: course.slug,
    title: course.title,
    category: course.category,
    moduleCount: course.modules.length,
  }));

  return <LearnerResume courses={courseCards} />;
}
