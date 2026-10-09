import Link from "next/link";

export default function SkillsPicker({ skills }) {
  return (
    <div className="chips">
      {skills.map((s) => (
        <Link key={s.slug} href={`/skills?skill=${s.slug}`} className="chip">
          I know {s.title.replace(/ Basics$/, "")}
        </Link>
      ))}
    </div>
  );
}
