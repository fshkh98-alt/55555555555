"use client";
import { Languages } from "lucide-react";
import { useRouter } from "next/navigation";
export function LanguageToggle({locale}:{locale:"en"|"ar"}){
 const router=useRouter();
 async function change(){const next=locale==="en"?"ar":"en"; await fetch(`/api/language?lang=${next}`,{method:"POST"}); router.refresh();}
 return <button className="icon-link gap-1 px-2 text-xs" aria-label="Switch language" onClick={change}><Languages size={15}/>{locale.toUpperCase()}</button>
}
