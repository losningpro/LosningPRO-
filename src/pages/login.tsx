import React, { useMemo, useState } from "react";
import { supabase } from "../lib/supabase";
import { useLocation, useNavigate } from "react-router-dom";
import { dashboardHomeForRole } from "../lib/roles";
import { useProfile } from "../hooks/useProfile";

function sanitizeRedirect(value: string | null | undefined, fallback: string) {
  if (!value) return fallback;

  const normalized = value.trim();

  if (!normalized.startsWith("/")) return fallback;
  if (normalized.startsWith("//")) return fallback;
  if (normalized.includes("://")) return fallback;

  return normalized;
}

export default function Login() {
  const nav = useNavigate();
  const location = useLocation();
  const { profile } = useProfile();

  const params = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const safeRedirect = useMemo(() => {
    const fallback = dashboardHomeForRole(profile?.role);
    return sanitizeRedirect(params.get("redirect"), fallback);
  }, [params, profile?.role]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function onLogin(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setMsg(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        setMsg(error.message);
        return;
      }

      nav(safeRedirect || "/konto", { replace: true });
    } catch (error) {
      console.error(error);
      setMsg("Der opstod en fejl under login. Prøv igen.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-md p-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="mb-2 text-2xl font-bold">Log på administration</h1>
        <p className="mb-6 text-sm text-slate-600">
          Sikker adgang til dashboard, produkter, ordrer og dokumenter.
        </p>

        <form onSubmit={onLogin} className="space-y-3">
          <input
            className="w-full rounded border p-2"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            autoComplete="email"
            required
          />
          <input
            className="w-full rounded border p-2"
            placeholder="Adgangskode"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            autoComplete="current-password"
            required
          />

          {msg && <div className="text-sm text-red-600">{msg}</div>}

          <button
            disabled={isLoading}
            className="w-full rounded bg-blue-600 p-2 text-white disabled:opacity-60"
            type="submit"
          >
            {isLoading ? "Logger ind..." : "Log ind"}
          </button>
        </form>

        <div className="mt-4 rounded-lg bg-slate-50 p-3 text-xs text-slate-600">
          Oprettelse af brugere skal ske via invitation eller admin-panel. Åben signup er
          fjernet for at understøtte roller og sikker adgang.
        </div>
      </div>
    </div>
  );
}
