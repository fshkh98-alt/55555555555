import { redirect } from "next/navigation";
import { requireAdmin } from "../../lib/auth";
import { getDb } from "../../lib/prisma";
import AdminOverview from "../../components/admin-overview";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session = await requireAdmin();
  if (!session) redirect("/admin/login");
  const db = getDb();
  let counts = { posts: 0, projects: 0, skills: 0, messages: 0 };
  if (db) {
    try {
      const [posts, projects, skills, messages] = await Promise.all([
        db.post.count(), db.project.count(), db.skill.count(), db.contactMessage.count(),
      ]);
      counts = { posts, projects, skills, messages };
    } catch {}
  }
  return <AdminOverview counts={counts} />;
}
