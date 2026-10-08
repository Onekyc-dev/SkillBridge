"use client";
import { useSession, signIn, signOut } from "next-auth/react";

export default function AuthButton() {
  const { data: session, status } = useSession();
  if (status === "loading") return null;
  if (session) return <button className="btn ghost" onClick={() => signOut()}>Sign out</button>;
  return <button className="btn" onClick={() => signIn("google")}>Sign in with Google</button>;
}
