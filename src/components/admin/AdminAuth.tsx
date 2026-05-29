"use client";

import { FormEvent, useEffect, useState } from "react";
import { LockKeyhole } from "lucide-react";
import { getClientAuth, isFirebaseConfigured, isDemoModeEnabled } from "@/lib/firebase";
import { AdminDashboard } from "./AdminDashboard";

const demoEmail = process.env.NEXT_PUBLIC_DEMO_ADMIN_EMAIL || "admin@pdc.local";
const demoPassword = process.env.NEXT_PUBLIC_DEMO_ADMIN_PASSWORD || "steve-admin-demo";

export function AdminAuth() {
  const [ready, setReady] = useState(false);
  const [authed, setAuthed] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const auth = getClientAuth();
    if (!auth) {
      setAuthed(isDemoModeEnabled && window.sessionStorage.getItem("demo-admin") === "true");
      setReady(true);
      return;
    }
    return auth.onAuthStateChanged((user) => {
      setAuthed(Boolean(user));
      setReady(true);
    });
  }, []);

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email"));
    const password = String(form.get("password"));

    if (isFirebaseConfigured) {
      const auth = getClientAuth();
      if (!auth) return;
      try {
        await auth.signInWithEmailAndPassword(email, password);
      } catch {
        setError("Invalid admin credentials.");
      }
      return;
    }

    if (isDemoModeEnabled && email === demoEmail && password === demoPassword) {
      window.sessionStorage.setItem("demo-admin", "true");
      setAuthed(true);
    } else {
      setError(
        isDemoModeEnabled
          ? "Invalid demo credentials."
          : "Firebase Auth is not configured for this deployment."
      );
    }
  }

  async function logout() {
    const auth = getClientAuth();
    if (auth) await auth.signOut();
    window.sessionStorage.removeItem("demo-admin");
    setAuthed(false);
  }

  if (!ready) {
    return <div className="min-h-screen bg-surface pt-36 text-center text-navy">Loading admin...</div>;
  }

  if (authed) return <AdminDashboard onLogout={logout} />;

  return (
    <div className="min-h-screen bg-royal px-4 pt-36 text-white sm:px-6 lg:px-8">
      <form onSubmit={login} className="mx-auto max-w-md rounded-[8px] bg-white p-7 text-navy shadow-institutional">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-surface text-royal">
          <LockKeyhole className="h-5 w-5" />
        </span>
        <h1 className="mt-6 font-heading text-4xl">Admin login</h1>
        <p className="mt-3 text-sm leading-6 text-slateText">
          {isFirebaseConfigured
            ? "Sign in with a Firebase Auth administrator account."
            : isDemoAdminEnabled
              ? `Demo login: ${demoEmail} / ${demoPassword}`
              : "Firebase Auth must be configured before admin access is available."}
        </p>
        <label className="mt-5 grid gap-2 text-sm font-bold">
          Email
          <input name="email" type="email" required className="min-h-12 rounded-[8px] border border-navy/10 px-4 font-normal outline-none focus:border-royal" />
        </label>
        <label className="mt-4 grid gap-2 text-sm font-bold">
          Password
          <input name="password" type="password" required className="min-h-12 rounded-[8px] border border-navy/10 px-4 font-normal outline-none focus:border-royal" />
        </label>
        <button type="submit" className="mt-5 min-h-12 w-full rounded-full bg-royal px-5 text-sm font-bold text-white transition hover:-translate-y-0.5">
          Login
        </button>
        {error ? <p className="mt-4 text-sm font-bold text-red-600">{error}</p> : null}
      </form>
    </div>
  );
}
