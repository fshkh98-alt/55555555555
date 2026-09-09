import { redirect } from "next/navigation";
import { requireAdmin } from "../../lib/auth";
import { listAdmin } from "../../lib/admin-data";
import { AdminLayout } from "../../components/admin-overview";
import { PostsManager, ProjectsManager, SkillsManager, ExperienceManager, EducationManager, CertificationsManager, SocialManager } from "../../components/resource-manager";

export async function ResourcePage({resource,active,children}:{resource:string;active:string;children:(items:any[])=>React.ReactNode}){const s=await requireAdmin();if(!s)redirect('/admin/login');const items=await listAdmin(resource);return <AdminLayout active={active}>{children(items)}</AdminLayout>}
export const Managers={PostsManager,ProjectsManager,SkillsManager,ExperienceManager,EducationManager,CertificationsManager,SocialManager};
