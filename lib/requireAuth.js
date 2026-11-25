import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "./authOptions";

export async function requireAuth(returnTo) {
  const session = await getServerSession(authOptions);

  if (!session) {
    const callbackUrl = encodeURIComponent(returnTo);
    redirect(`/api/auth/signin?callbackUrl=${callbackUrl}`);
  }

  return session;
}
