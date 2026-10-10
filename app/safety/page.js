import Link from "next/link";
import Diagram from "../../components/Diagram";

export const metadata = {
  title: "Scam safety | SkillBridge",
  description: "How to spot fake jobs and stay safe when you look for online work.",
};

const compare = {
  type: "columns",
  title: "A real employer or client versus a scam",
  columns: [
    { head: "Usually real", tone: "good", items: ["Never asks you to pay to get the job", "Pays through the platform or a normal contract", "Interviews or tests your skill first", "Has a working website and clear details"] },
    { head: "Usually a scam", tone: "bad", items: ["Asks for a registration, training or equipment fee", "Sends a cheque and wants change sent back", "Hires you with no interview, fast", "Pushes you to hurry or keep it secret"] },
  ],
};

export default function SafetyPage() {
  return (
    <section className="stage prose">
      <Link href="/" className="back">&larr; Home</Link>
      <h1>Stay safe from fake jobs</h1>
      <p className="lead-text">Most online jobs are honest, but some people pretend to hire in order to take your money. A few simple habits keep you safe.</p>

      <Diagram data={compare} />

      <h2>Seven red flags</h2>
      <ol className="flags">
        <li><strong>They ask you to pay.</strong> Real employers do not charge for registration, training, software or equipment.</li>
        <li><strong>A cheque and a refund.</strong> They send you money and ask you to send part back. The cheque later bounces and your money is gone.</li>
        <li><strong>No interview or test.</strong> You are hired in minutes, with nothing checked.</li>
        <li><strong>The pay is too good.</strong> Very high pay for very easy work is bait.</li>
        <li><strong>They want your private details early.</strong> Never share passwords, PINs, one-time codes or bank login details. ID is only for a real, signed contract.</li>
        <li><strong>They leave the platform.</strong> Be careful when someone insists on moving to private chat or on being paid outside the platform.</li>
        <li><strong>Pressure.</strong> "Decide now" or "do not tell anyone" is a warning sign.</li>
      </ol>

      <h2>Before you apply</h2>
      <ul className="checklist">
        <li>Search the company name with the word "scam" or "reviews".</li>
        <li>Check that the company website matches the job post.</li>
        <li>Keep chat and payment on the platform where you can.</li>
        <li>Start with small projects while you build trust.</li>
      </ul>

      <h2>If something goes wrong</h2>
      <ul className="checklist">
        <li>Stop replying and do not send any more money.</li>
        <li>Report the account to the platform.</li>
        <li>If you shared bank details, contact your bank quickly.</li>
        <li>Tell us through the <Link href="/about#contact" className="inline-link">contact section</Link> so we can warn others.</li>
      </ul>

      <p className="trust-note">SkillBridge will never ask you to pay to take a course or to see a job list.</p>
    </section>
  );
}
