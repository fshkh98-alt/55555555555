import { redirect } from "next/navigation";
import { requireAdmin } from "../../../lib/auth";
import { getDb } from "../../../lib/prisma";
import ProfileEditor from "../../../components/profile-editor";
export const dynamic="force-dynamic";
export default async function Page(){if(!(await requireAdmin()))redirect('/admin/login');const db=getDb();let profile:any=null,links:any[]=[];if(db){try{profile=await db.profile.findFirst();links=await db.socialLink.findMany({orderBy:{sortOrder:'asc'}})}catch{}}return <ProfileEditor profile={profile} links={links}/>}
