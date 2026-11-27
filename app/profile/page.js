import { requireAuth } from "../../lib/requireAuth";
import LearnerProfileForm from "../../components/LearnerProfileForm";

export const metadata = {
  title: "Learning preferences | SkillBridge",
  description: "Update your SkillBridge learning preferences.",
};

export default async function ProfilePage() {
  await requireAuth("/profile");
  return <LearnerProfileForm mode="profile" />;
}
