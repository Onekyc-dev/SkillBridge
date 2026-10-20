import { notFound } from "next/navigation";
import { courses } from "../../../lib/courses";
import CertificateView from "../../../components/CertificateView";

export function generateStaticParams() {
  return courses.map((course) => ({ slug: course.slug }));
}

export default function CertificatePage({ params }) {
  const course = courses.find((item) => item.slug === params.slug);
  if (!course) notFound();
  return <CertificateView slug={course.slug} />;
}
