import { NextResponse } from "next/server";
import { getDb } from "../../../lib/prisma";
export async function POST(req:Request){
 const form=await req.formData();
 const name=String(form.get("name")||"").trim(),email=String(form.get("email")||"").trim(),subject=String(form.get("subject")||"").trim(),message=String(form.get("message")||"").trim();
 if(!name||!email||!message||name.length>80||email.length>160||message.length>5000)return NextResponse.json({error:"Invalid message"},{status:400});
 const db=getDb(); if(!db)return NextResponse.json({error:"Contact service is not configured yet."},{status:503});
 try{await db.contactMessage.create({data:{name,email,subject:subject||null,message}});return NextResponse.redirect(new URL("/contact?sent=1",req.url));}catch{return NextResponse.json({error:"Could not save message"},{status:500});}
}
