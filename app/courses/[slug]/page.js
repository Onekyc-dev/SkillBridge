import { notFound } from "next/navigation";
import { courses } from "../../../lib/courses";
import { requireAuth } from "../../../lib/requireAuth";
import CourseView from "../../../components/CourseView";

export default async function CoursePage({ params }) {
  const { slug } = params;
  await requireAuth(`/courses/${slug}`);

  const course = courses.find((c) => c.slug === slug);
  if (!course) notFound();

  return <CourseView course={course} />;
}
