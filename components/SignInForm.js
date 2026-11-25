"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SignInForm() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  async function handleGoogleSignIn() {
    setLoading(true);
    await signIn("google", { callbackUrl });
  }

  return (
    <section className="signin-page">
      <div className="signin-card">
        <div className="signin-visual">
          <img
            src="/images/skillbridge-hero.png"
            alt="A learner building new skills on her laptop"
            className="signin-hero-image"
          />
          <div className="signin-visual-copy">
            <span className="signin-kicker">YOUR NEXT CHAPTER STARTS HERE</span>
            <h1>Learn something new. Open new doors.</h1>
            <p>Build practical skills, grow your confidence and take your next step with SkillBridge.</p>
          </div>
        </div>

        <div className="signin-panel">
          <div className="signin-brand">Skill<span>Bridge</span></div>
          <div className="signin-welcome">WELCOME BACK</div>
          <h2>Good to see you again.</h2>
          <p className="signin-description">
            Sign in to continue learning, track your progress and pick up where you left off.
          </p>

          <button
            type="button"
            className="signin-google-button"
            onClick={handleGoogleSignIn}
            disabled={loading}
          >
            <svg viewBox="0 0 48 48" aria-hidden="true" className="google-mark">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z" />
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.25 5.47-4.73 7.16l7.25 5.62c4.23-3.91 6.67-9.68 6.67-17.25Z" />
              <path fill="#FBBC05" d="M10.54 28.59A14.4 14.4 0 0 1 9.75 24c0-1.59.27-3.13.76-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.87.93 7.53 2.56 10.78l7.98-6.19Z" />
              <path fill="#34A853" d="M24 48c6.47 0 11.91-2.13 15.88-5.8l-7.25-5.62c-2.01 1.35-4.58 2.15-8.63 2.15-6.26 0-11.57-4.22-13.46-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z" />
            </svg>
            <span>{loading ? "Connecting to Google..." : "Continue with Google"}</span>
            <span className="signin-button-arrow" aria-hidden="true">→</span>
          </button>

          <div className="signin-divider"><span>Simple, secure sign-in</span></div>
          <p className="signin-small-print">
            By continuing, you'll return to SkillBridge and agree to use your account responsibly.
          </p>
          <p className="signin-help">New to SkillBridge? Your Google account will get you started.</p>
        </div>
      </div>
    </section>
  );
}
