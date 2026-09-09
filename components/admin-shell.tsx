 "use client";

import { useState } from "react";
import { BookOpen, FolderKanban, GraduationCap, LogOut, Settings, ShieldCheck, Sparkles, UserRound } from "lucide-react";
import { useRouter } from "next/navigation";

const items = [
  ["Overview", Sparkles],
  ["Blog", BookOpen],
  ["Projects", FolderKanban],
  ["Skills", ShieldCheck],
  ["Experience", UserRound],
  ["Education", GraduationCap],
  ["Settings", Settings],
] as const;

export default function AdminShell() {
  const [active, setActive] = useState("Overview");
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <main className="min-h-screen">
      <div className="mx-auto flex max-w-[1500px] gap-6 px-4 py-4 lg:px-6">
        <aside className="hidden min-h-[calc(100vh-32px)] w-64 shrink-0 flex-col rounded-3xl border border-zinc-200 bg-white/70 p-4 shadow-sm dark:border-white/10 dark:bg-white/[0.025] md:flex">
          <div className="mb-8 flex items-center gap-3 px-3 pt-2">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-sky-500 text-white"><ShieldCheck size={20}/></div>
            <div><p className="font-semibold">Ozaib</p><p className="text-xs text-zinc-500">Admin</p></div>
          </div>
          <nav className="space-y-1">
            {items.map(([label, Icon]) => (
              <button key={label} onClick={()=>setActive(label)}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition ${active===label ? "bg-sky-500/10 text-sky-600 dark:text-sky-300" : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-white/5"}`}>
                <Icon size={17}/>{label}
              </button>
            ))}
          </nav>
          <div className="mt-auto border-t border-zinc-200 pt-4 dark:border-white/10">
            <button onClick={logout} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-zinc-500 hover:bg-zinc-100 dark:hover:bg-white/5">
              <LogOut size={17}/> Sign out
            </button>
          </div>
        </aside>

        <section className="min-w-0 flex-1 rounded-3xl border border-zinc-200 bg-white/60 p-5 shadow-sm dark:border-white/10 dark:bg-white/[0.02] sm:p-7">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div><p className="text-sm text-sky-500">Control center</p><h1 className="mt-1 text-3xl font-semibold">{active}</h1></div>
            <a href="/" className="button-secondary text-sm">View website</a>
          </div>

          {active === "Overview" ? <Overview/> : <ComingSoon title={active}/>}
        </section>
      </div>
    </main>
  );
}

function Overview() {
  const cards = [
    ["Posts", "0", "Blog content"],
    ["Projects", "0", "Real work only"],
    ["Skills", "0", "Honest levels"],
    ["Messages", "0", "Contact inbox"],
  ];
  return <>
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map(([title,value,desc])=><div key={title} className="premium-card"><p className="text-sm text-zinc-500">{title}</p><p className="mt-3 text-3xl font-semibold">{value}</p><p className="mt-2 text-sm text-zinc-500">{desc}</p></div>)}
    </div>
    <div className="mt-6 premium-card">
      <h2 className="font-semibold">Phase 2 foundation</h2>
      <p className="mt-2 max-w-2xl leading-7 text-zinc-600 dark:text-zinc-400">
        Authentication and the PostgreSQL data model are now prepared. The next implementation step is connecting each Admin section to real CRUD forms and then wiring the public pages to the database.
      </p>
    </div>
  </>;
}
function ComingSoon({title}:{title:string}) {
  return <div className="premium-card"><h2 className="text-xl font-semibold">{title}</h2><p className="mt-2 text-zinc-500">The database-backed editor for this section is the next build step.</p></div>;
}