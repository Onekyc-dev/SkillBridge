
import Link from "next/link";
import Script from "next/script";
import { Bricolage_Grotesque, Nunito } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import SiteNav from "../components/SiteNav";
import { courses } from "../lib/courses";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
});

const body = Nunito({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata = {
  title: "SkillBridge",
  description: "Learn a skill, then see where to apply for work that fits it.",
  other: {
    "google-adsense-account": "ca-pub-8309562936855759",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8309562936855759"
          crossOrigin="anonymous"
          strategy="beforeInteractive"
        />
      </head>

      <body>
        <Providers>
          <header className="bar">
            <Link href="/" className="logo">
              SkillBridge
            </Link>

            <SiteNav
              categories={[...new Set(courses.map((c) => c.category))]}
            />
          </header>

          <main className="wrap">{children}</main>

          <footer className="foot">
            <p>
              <strong>SkillBridge</strong> · Free skills, honest job links.
            </p>

            <p className="foot-links">
              <Link href="/about">About</Link> ·{" "}
              <Link href="/safety">Scam safety</Link> ·{" "}
              <Link href="/my-courses">My courses</Link>
            </p>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
