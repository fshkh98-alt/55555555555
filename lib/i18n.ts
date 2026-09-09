import { cookies } from "next/headers";

export type Locale = "en" | "ar";
export async function getLocale(): Promise<Locale> {
  const value = (await cookies()).get("ozaib-locale")?.value;
  return value === "ar" ? "ar" : "en";
}
export const t = {
  en: { about:"About", skills:"Skills", projects:"Projects", blog:"Blog", contact:"Contact", back:"Back", view:"View", read:"Read article", contactTitle:"Get in touch", contactText:"A private contact channel for opportunities, questions, and useful conversations." },
  ar: { about:"عنّي", skills:"المهارات", projects:"المشاريع", blog:"المدونة", contact:"تواصل", back:"رجوع", view:"عرض", read:"قراءة المقال", contactTitle:"تواصل معي", contactText:"قناة تواصل خاصة للفرص والأسئلة والنقاشات المفيدة." }
} as const;
