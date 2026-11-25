import { courses } from "../../lib/courses";
import Dashboard from "../../components/Dashboard";
import { requireAuth } from "../../lib/requireAuth";

export const metadata = {
  title: "My Dashboard | SkillBridge",
  description: "Track your learning progress and career next steps.",
};

export default async function DashboardPage() {
  await requireAuth("/dashboard");

  const courseCards = courses.map((course) => ({
    slug: course.slug,
    title: course.title,
    category: course.category,
    level: course.level || "Basic",
    summary: course.summary,
    moduleCount: Array.isArray(course.modules)
      ? course.modules.length
      : 0,
  }));

  return <Dashboard courses={courseCards} />;
}
