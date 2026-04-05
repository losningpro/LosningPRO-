import React, { useMemo, useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate, useLocation } from "react-router-dom";

export default function Login() {
  const nav = useNavigate();
  const location = useLocation();

  const redirectTo = useMemo(() => {
    const state = location.state as { from?: { pathname?: string } } | null;
    return state?.from?.pathname?.startsWith("/konto")
      ? state.from.pathname
      : "/konto";
  }, [location.state]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [mode, setMode] = useState<"login" | "reset">("login");

  async function onLogin(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setMsg(null);

    try {
      const cleanEmail = email.trim().toLowerCase();

      const { data, error } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password,
      });

      if (error) {
        setMsg(error.message);
        return;
      }

      if (!data.session?.user) {
        setMsg("No se pudo iniciar sesión correctamente.");
        return;
      }

      nav(redirectTo, { replace: true });
    } catch (err) {
      setMsg(err instanceof Error ? err.message : "Error inesperado al iniciar sesión.");
    } finally {
      setIsLoading(false);
    }
  }

  async function onResetPassword(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setMsg(null);

    try {
      const cleanEmail = email.trim().toLowerCase();

      const origin =
        typeof window !== "undefined" ? window.location.origin : "";

      const { error } = await supabase.auth.resetPasswordForEmail(cleanEmail, {
        redirectTo: `${origin}/login`,
      });

      if (error) {
        setMsg(error.message);
        return;
      }

      setMsg("Te hemos enviado un correo para restablecer la contraseña.");
    } catch (err) {
      setMsg(
        err instanceof Error
          ? err.message
          : "Error inesperado al solicitar el restablecimiento."
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-2">Log på</h1>
      <p className="text-sm text-slate-600 mb-6">
        Acceso restringido. Las cuentas nuevas deben ser creadas desde el panel por un administrador.
      </p>

      {mode === "login" ? (
        <form onSubmit={onLogin} className="space-y-3">
          <input
            className="w-full border rounded p-2"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            autoComplete="email"
            required
          />

          <input
            className="w-full border rounded p-2"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            autoComplete="current-password"
            required
          />

          {msg && (
            <div className="text-sm rounded border border-slate-200 bg-slate-50 p-3">
              {msg}
            </div>
          )}

          <button
            disabled={isLoading}
            className="w-full bg-blue-600 text-white rounded p-2 disabled:opacity-60"
            type="submit"
          >
            {isLoading ? "..." : "Iniciar sesión"}
          </button>

          <button
            type="button"
            disabled={isLoading}
            onClick={() => {
              setMsg(null);
              setMode("reset");
            }}
            className="w-full border rounded p-2"
          >
            He olvidado mi contraseña
          </button>
        </form>
      ) : (
        <form onSubmit={onResetPassword} className="space-y-3">
          <input
            className="w-full border rounded p-2"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            autoComplete="email"
            required
          />

          {msg && (
            <div className="text-sm rounded border border-slate-200 bg-slate-50 p-3">
              {msg}
            </div>
          )}

          <button
            disabled={isLoading}
            className="w-full bg-blue-600 text-white rounded p-2 disabled:opacity-60"
            type="submit"
          >
            {isLoading ? "..." : "Enviar enlace de recuperación"}
          </button>

          <button
            type="button"
            disabled={isLoading}
            onClick={() => {
              setMsg(null);
              setMode("login");
            }}
            className="w-full border rounded p-2"
          >
            Volver al login
          </button>
        </form>
      )}
    </div>
  );
}
