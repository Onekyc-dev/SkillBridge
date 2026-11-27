"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const STORAGE_PREFIX = "skillbridge-learner-profile:";

export function profileStorageKey(email) {
  return `${STORAGE_PREFIX}${String(email || "guest").toLowerCase()}`;
}

export default function OnboardingGate() {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (status !== "authenticated" || !session?.user || !pathname) return;
    if (pathname === "/onboarding" || pathname === "/auth/signin") return;

    try {
      const key = profileStorageKey(session.user.email);
      const profile = JSON.parse(localStorage.getItem(key) || "null");
      if (profile?.onboardingCompleted) return;
      sessionStorage.setItem("skillbridge-onboarding-return", `${pathname}${window.location.search}`);
      router.replace("/onboarding");
    } catch {
      router.replace("/onboarding");
    }
  }, [status, session, pathname, router]);

  return null;
}
