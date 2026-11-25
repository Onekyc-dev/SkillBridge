import { Suspense } from "react";
import SignInForm from "../../../components/SignInForm";

export const metadata = {
  title: "Sign in | SkillBridge",
  description: "Sign in to continue your learning journey with SkillBridge.",
};

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="signin-loading">Preparing your sign-in...</div>}>
      <SignInForm />
    </Suspense>
  );
}
