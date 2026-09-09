import { NextResponse } from "next/server";
export async function POST(req: Request){
 const lang=new URL(req.url).searchParams.get("lang")==="ar"?"ar":"en";
 const res=NextResponse.json({ok:true,lang});
 res.cookies.set("ozaib-locale",lang,{httpOnly:true,sameSite:"lax",path:"/",maxAge:60*60*24*365});
 return res;
}
