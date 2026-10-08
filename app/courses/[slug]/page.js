import { notFound } from "next/navigation";
import { courses } from "../../../lib/courses";
import CourseView from "../../../components/CourseView";

export function generateStaticParams() {
  return courses.map((c) => ({ slug: c.slug }));
}

export default function CoursePage({ params }) {
  const course = courses.find((c) => c.slug === params.slug);
  if (!course) notFound();
  return <CourseView course={course} />;
}
