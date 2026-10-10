"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import AuthButton from "./AuthButton";

export default function SiteNav({ categories }) {
  const [open, setOpen] = useState(false);
  const [sub, setSub] = useState(false);
  const path = usePathname();

  useEffect(() => { setOpen(false); setSub(false); }, [path]);

  useEffect(() => {
    if (!open && !sub) return undefined;
    const onKey = (e) => { if (e.key === "Escape") { setOpen(false); setSub(false); } };
    const onClick = (e) => { if (!e.target.closest || !e.target.closest(".nav")) { setOpen(false); setSub(false); } };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => { document.removeEventListener("keydown", onKey); document.removeEventListener("click", onClick); };
  }, [open, sub]);

  const close = () => { setOpen(false); setSub(false); };

  return (
    <nav className="nav" aria-label="Main">
      <button type="button" className="menu-btn" aria-expanded={open} aria-controls="site-menu" onClick={() => setOpen(!open)}>
        <span className="menu-ico" aria-hidden="true"></span>
        <span className="sr">Menu</span>
      </button>
      <div id="site-menu" className={"menu" + (open ? " open" : "")}>
        <Link href="/my-courses" className="nav-link" onClick={close}>My courses</Link>
        <div className="has-sub">
          <button type="button" className="nav-link sub-btn" aria-expanded={sub} onClick={() => setSub(!sub)}>
            Courses <span aria-hidden="true">&#9662;</span>
          </button>
          <ul className={"sub" + (sub ? " open" : "")}>
            <li><Link href="/courses" onClick={close}>All courses</Link></li>
            {categories.map((c) => (
              <li key={c}><Link href={`/courses?category=${encodeURIComponent(c)}`} onClick={close}>{c}</Link></li>
            ))}
          </ul>
        </div>
        <Link href="/skills" className="nav-link" onClick={close}>I have a skill</Link>
        <Link href="/safety" className="nav-link" onClick={close}>Scam safety</Link>
        <Link href="/about" className="nav-link" onClick={close}>About</Link>
        <div className="menu-auth"><AuthButton /></div>
      </div>
    </nav>
  );
}
