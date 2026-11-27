"use client";
import { SessionProvider } from "next-auth/react";
import OnboardingGate from "../components/OnboardingGate";

export default function Providers({ children }) {
  return (
    <SessionProvider>
      <OnboardingGate />
      {children}
    </SessionProvider>
  );
}
