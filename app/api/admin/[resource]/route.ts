import { NextResponse } from "next/server";
import { requireAdmin } from "../../../../lib/auth";
import { getDb } from "../../../../lib/prisma";

const allowed = ["post","project","skill","experience","education","certification","socialLink","siteSettings","profile"] as const;
type Resource = typeof allowed[number];
function ok(r:string): r is Resource { return (allowed as readonly string[]).includes(r); }
const modelName: Record<Resource,string> = {post:"post",project:"project",skill:"skill",experience:"experience",education:"education",certification:"certification",socialLink:"socialLink",siteSettings:"siteSettings",profile:"profile"};
function clean(v:any){ if(v===undefined||v===null)return v; if(typeof v!=="string")return v; const s=v.trim(); return s===""?null:s; }
function payload(resource:Resource,b:any){
 const base:any={...b};
 ["id","createdAt","updatedAt"].forEach(k=>delete base[k]);
 for(const k of Object.keys(base)) if(typeof base[k]==="string") base[k]=clean(base[k]);
 if(resource==="post"){base.featured=!!b.featured;base.publishedAt=b.publishedAt?new Date(b.publishedAt):b.status==="PUBLISHED"?new Date():null;base.scheduledAt=b.scheduledAt?new Date(b.scheduledAt):null;}
 if(resource==="project") {base.featured=!!b.featured;base.visible=b.visible!==false;}
 if(["skill","experience","education","certification","socialLink"].includes(resource)) base.visible=b.visible!==false;
 if(resource==="skill") base.sortOrder=Number(b.sortOrder||0);
 if(resource==="socialLink") base.sortOrder=Number(b.sortOrder||0);
 return base;
}
export async function GET(_req:Request,{params}:{params:Promise<{resource:string}>}){const s=await requireAdmin();if(!s)return NextResponse.json({error:"Unauthorized"},{status:401});const {resource}=await params;if(!ok(resource))return NextResponse.json({error:"Not found"},{status:404});const db=getDb();if(!db)return NextResponse.json({error:"DATABASE_URL is not configured"},{status:503});try{const data=await (db as any)[modelName[resource]].findMany({orderBy:{updatedAt:"desc"}});return NextResponse.json(data)}catch(e){return NextResponse.json({error:"Database request failed"},{status:500})}}
export async function POST(req:Request,{params}:{params:Promise<{resource:string}>}){const s=await requireAdmin();if(!s)return NextResponse.json({error:"Unauthorized"},{status:401});const {resource}=await params;if(!ok(resource))return NextResponse.json({error:"Not found"},{status:404});const db=getDb();if(!db)return NextResponse.json({error:"DATABASE_URL is not configured"},{status:503});try{const b=await req.json();const data=await (db as any)[modelName[resource]].create({data:payload(resource,b)});return NextResponse.json(data,{status:201})}catch(e){return NextResponse.json({error:"Could not create item. Check required fields and unique slugs."},{status:400})}}
