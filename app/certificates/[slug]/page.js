import { notFound } from "next/navigation";
import { courses } from "../../../lib/courses";
import CertificateView from "../../../components/CertificateView";
import { requireAuth } from "../../../lib/requireAuth";

export default async function CertificatePage({ params }) {
  await requireAuth(`/certificates/${params.slug}`);

  const course = courses.find((item) => item.slug === params.slug);
  if (!course) notFound();

  return <CertificateView slug={course.slug} />;
}
