import { getDb } from "./prisma";
export async function listAdmin(resource:string){const db=getDb();if(!db)return [];try{return await (db as any)[resource].findMany({orderBy:{updatedAt:"desc"}})}catch{return []}}
