"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function CertificateView({ slug }) {
  const [certificate, setCertificate] = useState(null);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    try {
      const learning = JSON.parse(localStorage.getItem(`sb-learning-${slug}`) || "{}");
      if (learning.examPassed && learning.certificate) setCertificate(learning.certificate);
    } catch {}
    setLoaded(true);
  }, [slug]);
  if (!loaded) return <section className="stage"><p className="muted">Loading certificate…</p></section>;
  if (!certificate) return <section className="stage"><Link href="/dashboard" className="back">&larr; Dashboard</Link><h1>No certificate yet</h1><p>Complete the Basic Skills stage, all practical projects, and pass the final exam to earn this course certificate.</p><Link href={`/courses/${slug}`} className="btn">Continue course</Link></section>;
  return <section className="stage certificate-page">
    <Link href="/dashboard" className="back">&larr; Dashboard</Link>
    <div className="certificate-paper"><p className="eyebrow">SKILLBRIDGE · CERTIFICATE OF COMPLETION</p><h1>Certificate of Achievement</h1><p>This certificate is presented to</p><h2>{certificate.name}</h2><p>for completing the course</p><h3>{certificate.courseTitle}</h3><p>after completing Basic Skills, Practical Skills, and the final examination.</p><p className="certificate-date">Completed {new Date(certificate.completedAt).toLocaleDateString()}</p><p className="certificate-id">Certificate ID: {certificate.id}</p><p className="muted">Saved in this browser. This locally generated certificate is not independently verified by a server.</p></div>
    <button className="btn" onClick={() => window.print()}>Print / Save certificate</button> <Link className="btn ghost" href={`/courses/${slug}`}>Review course</Link>
  </section>;
}
