import Link from "next/link";
import { Bricolage_Grotesque, Nunito } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import AuthButton from "../components/AuthButton";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-display" });
const body = Nunito({ subsets: ["latin"], variable: "--font-body" });

export const metadata = {
  title: "SkillBridge",
  description: "Learn a skill, then see where to apply for work that fits it.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <Providers>
          <header className="bar">
            <Link href="/" className="logo">SkillBridge</Link>
            <nav className="nav">
              <Link href="/#courses" className="nav-link">Courses</Link>
              <AuthButton />
            </nav>
          </header>
          <main className="wrap">{children}</main>
          <footer className="foot">
            <p><strong>SkillBridge</strong> · Free skills, honest job links.</p>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
