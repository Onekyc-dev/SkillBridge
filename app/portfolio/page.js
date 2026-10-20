import { courses } from "../../lib/courses";
import LearnerPortfolio from "../../components/LearnerPortfolio";

export const metadata = {
  title: "My portfolio | SkillBridge",
  description: "Showcase your practical projects, skills, and learning achievements.",
};

export default function PortfolioPage() {
  const courseCards = courses.map((course) => ({
    slug: course.slug,
    title: course.title,
    category: course.category,
    moduleCount: course.modules.length,
  }));
  return <LearnerPortfolio courses={courseCards} />;
}
