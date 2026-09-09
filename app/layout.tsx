import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "../components/theme-provider";
import { getLocale } from "../lib/i18n";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
export const metadata: Metadata = {
  title: "Ozaib | Cybersecurity Portfolio",
  description: "Personal cybersecurity portfolio, projects, skills, and learning notes.",
  keywords: ["Ozaib","Auday Alozaib","عدي العزيب","cybersecurity","portfolio","security student"],
  ...(siteUrl ? { metadataBase:new URL(siteUrl), alternates:{canonical:"/"}, openGraph:{title:"Ozaib | Cybersecurity Portfolio",description:"Personal cybersecurity portfolio, projects, skills, and learning notes.",type:"website",url:siteUrl} } : {})
};
export default async function RootLayout({children}:{children:React.ReactNode}){const locale=await getLocale();return <html lang={locale} dir={locale==="ar"?"rtl":"ltr"} suppressHydrationWarning><body><ThemeProvider>{children}</ThemeProvider></body></html>}
