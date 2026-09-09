import { redirect } from "next/navigation";
import { requireAdmin } from "../../../lib/auth";
import { getDb } from "../../../lib/prisma";
import SettingsEditor from "../../../components/settings-editor";
export const dynamic="force-dynamic";
export default async function Page(){if(!(await requireAdmin()))redirect('/admin/login');const db=getDb();let settings:any=null;if(db){try{settings=await db.siteSettings.findFirst()}catch{}}return <SettingsEditor settings={settings}/>}
