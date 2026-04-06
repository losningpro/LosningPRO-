import React, { useMemo, useState } from "react";
import { supabase } from "../lib/supabase";
import { useLocation, useNavigate } from "react-router-dom";

function sanitizeRedirect(value: string | null | undefined) {
  if (!value) return "/konto";

  const normalized = value.trim();

  if (!normalized.startsWith("/")) return "/konto";
  if (normalized.startsWith("//")) return "/konto";
  if (normalized.includes("://")) return "/konto";

  return normalized;
}

export default function Login() {
  const nav = useNavigate();
  const location = useLocation();
  const redirect = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return sanitizeRedirect(params.get("redirect"));
  }, [location.search]);

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

      nav(redirect, { replace: true });
    } catch (error) {
      console.error(error);
      setMsg("Login fejlede. Prøv igen.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Log på</h1>

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
          className="w-full rounded bg-black p-2 text-white disabled:opacity-60"
          type="submit"
        >
          {isLoading ? "Logger ind..." : "Log ind"}
        </button>
      </form>

      <div className="mt-4 text-xs text-gray-500">
        Brugeroprettelse håndteres separat. Login-siden er kun til adgang.
      </div>
    </div>
  );
}
}
