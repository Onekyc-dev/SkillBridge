"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { profileStorageKey } from "./OnboardingGate";

const questions = [
  {
    key: "mainGoal",
    title: "What would you most like to achieve?",
    options: ["Get a job", "Start freelancing", "Improve my skills", "Change careers", "Personal learning"],
  },
  {
    key: "skillsOfInterest",
    title: "Which skills interest you most?",
    options: ["Admin / Virtual Assistant", "Technology / Programming", "Data / Analytics", "Business / Finance", "Digital Marketing / Creative", "Something else"],
  },
  {
    key: "currentLevel",
    title: "How would you describe your current skill level?",
    options: ["Complete beginner", "I know a little", "Some experience", "Experienced"],
  },
  {
    key: "availableTime",
    title: "How much time can you usually dedicate to learning?",
    options: ["15–30 minutes daily", "About 1 hour", "2–3 hours", "Whenever I’m free"],
  },
];

export default function LearnerProfileForm({ mode = "onboarding" }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [answers, setAnswers] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (status !== "authenticated" || !session?.user?.email) return;
    try {
      const saved = JSON.parse(localStorage.getItem(profileStorageKey(session.user.email)) || "null");
      if (saved?.answers) setAnswers(saved.answers);
    } catch { /* Start with blank optional answers if stored data is unavailable. */ }
  }, [status, session]);

  function update(key, value) {
    setAnswers((current) => ({ ...current, [key]: value }));
  }

  function finish() {
    if (!session?.user?.email || saving) return;
    setSaving(true);
    const profile = {
      answers,
      onboardingCompleted: true,
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem(profileStorageKey(session.user.email), JSON.stringify(profile));
    const returnTo = sessionStorage.getItem("skillbridge-onboarding-return") || "/dashboard";
    sessionStorage.removeItem("skillbridge-onboarding-return");
    router.replace(mode === "profile" ? "/profile" : (returnTo.startsWith("/onboarding") ? "/dashboard" : returnTo));
  }

  if (status === "loading") return <p className="profile-loading">Loading your profile…</p>;
  if (status !== "authenticated") return <p>Please sign in to continue.</p>;

  return (
    <section className="learner-setup">
      <div className="learner-setup-intro">
        <span className="setup-kicker">{mode === "profile" ? "YOUR LEARNING PROFILE" : "WELCOME TO SKILLBRIDGE"}</span>
        <h1>{mode === "profile" ? "Your learning preferences" : "Let’s make learning fit you."}</h1>
        <p>{mode === "profile" ? "Update your answers whenever your goals or schedule change." : "A few optional questions will help us shape your learning experience."}</p>
        <span className="setup-optional">All questions are optional. You can skip any or all of them.</span>
      </div>

      <div className="learner-questions">
        {questions.map((question, index) => (
          <fieldset className="learner-question" key={question.key}>
            <legend><span>{index + 1}</span>{question.title}</legend>
            <div className="learner-options">
              {question.options.map((option) => (
                <label className={answers[question.key] === option ? "learner-option selected" : "learner-option"} key={option}>
                  <input type="radio" name={question.key} value={option} checked={answers[question.key] === option} onChange={() => update(question.key, option)} />
                  <span>{option}</span>
                </label>
              ))}
            </div>
            {answers[question.key] && <button type="button" className="clear-answer" onClick={() => update(question.key, "")}>Clear answer</button>}
          </fieldset>
        ))}
      </div>

      <div className="learner-setup-actions">
        <button type="button" className="setup-primary" onClick={finish} disabled={saving}>{saving ? "Saving…" : mode === "profile" ? "Save preferences" : "Continue to SkillBridge"}</button>
        {mode !== "profile" && <button type="button" className="setup-skip" onClick={finish} disabled={saving}>Skip for now</button>}
      </div>
      <p className="setup-privacy-note">Your answers are saved in this browser on this device for now. Cross-device profile syncing will come with the future database upgrade.</p>
    </section>
  );
}
