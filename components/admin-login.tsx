 "use client";

import { FormEvent, useState } from "react";
import { ShieldCheck, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Unable to sign in.");
        return;
      }
      router.replace("/admin");
      router.refresh();
    } catch {
      setError("Could not connect to the server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen grid place-items-center px-6 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl border border-sky-400/20 bg-sky-400/10 text-sky-500">
            <ShieldCheck size={22}/>
          </div>
          <div>
            <p className="text-sm text-zinc-500">Ozaib</p>
            <h1 className="text-xl font-semibold">Admin access</h1>
          </div>
        </div>

        <form onSubmit={submit} className="premium-card space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium">Email</label>
            <input required type="email" autoComplete="username" value={email} onChange={e=>setEmail(e.target.value)}
              className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 outline-none focus:border-sky-400 dark:border-white/10 dark:bg-white/[0.04]" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">Password</label>
            <input required type="password" autoComplete="current-password" value={password} onChange={e=>setPassword(e.target.value)}
              className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 outline-none focus:border-sky-400 dark:border-white/10 dark:bg-white/[0.04]" />
          </div>
          {error && <p className="rounded-xl border border-red-400/20 bg-red-400/5 px-4 py-3 text-sm text-red-500">{error}</p>}
          <button disabled={loading} className="button-primary w-full disabled:opacity-60">
            {loading ? <Loader2 size={17} className="animate-spin"/> : null}
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </main>
  );
}