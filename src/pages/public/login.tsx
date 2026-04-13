import React, { FormEvent, useMemo, useState } from "react";
import { supabase } from "../../lib/supabase";

const DASHBOARD_PATH = "/konto";
const RESET_PASSWORD_PATH = "/reset-password";

function getAppOrigin() {
  if (typeof window === "undefined") return "https://www.losningpro.dk";
  return window.location.origin;
}

function getRedirectTo(path: string) {
  return `${getAppOrigin()}${path}`;
}

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [oauthLoading, setOauthLoading] = useState<"google" | "facebook" | null>(null);
  const [resetLoading, setResetLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const isBusy = useMemo(
    () => submitting || oauthLoading !== null || resetLoading,
    [submitting, oauthLoading, resetLoading],
  );

  async function handleEmailLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setMessage(null);
    setSubmitting(true);

    try {
      const normalizedEmail = email.trim().toLowerCase();

      if (!normalizedEmail) throw new Error("Indtast din e-mail.");
      if (!password) throw new Error("Indtast din adgangskode.");

      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: normalizedEmail,
        password,
      });

      if (signInError) throw signInError;

      window.location.assign(getRedirectTo(DASHBOARD_PATH));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Log ind mislykkedes.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleOAuthLogin(provider: "google" | "facebook") {
    setError(null);
    setMessage(null);
    setOauthLoading(provider);

    try {
      const redirectTo = getRedirectTo(DASHBOARD_PATH);

      const { error: oauthError } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo,
        },
      });

      if (oauthError) throw oauthError;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Social login mislykkedes.");
      setOauthLoading(null);
    }
  }

  async function handleResetPassword() {
    setError(null);
    setMessage(null);
    setResetLoading(true);

    try {
      const normalizedEmail = email.trim().toLowerCase();

      if (!normalizedEmail) {
        throw new Error("Indtast din e-mail for at nulstille adgangskoden.");
      }

      const { error } = await supabase.auth.resetPasswordForEmail(normalizedEmail, {
        redirectTo: getRedirectTo(RESET_PASSWORD_PATH),
      });

      if (error) throw error;

      setMessage("Vi har sendt et link til nulstilling af adgangskode til din e-mail.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Kunne ikke sende nulstillingsmail.");
    } finally {
      setResetLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6 py-12">
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-semibold text-gray-900">Log ind</h1>
          <p className="mt-2 text-sm text-gray-600">
            Få adgang til din konto med Google, Facebook eller e-mail.
          </p>

          {error ? (
            <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          ) : null}

          {message ? (
            <div className="mt-4 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
              {message}
            </div>
          ) : null}

          <div className="mt-6 space-y-3">
            <button
              type="button"
              onClick={() => void handleOAuthLogin("google")}
              disabled={isBusy}
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-800 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {oauthLoading === "google" ? "Forbinder til Google..." : "Fortsæt med Google"}
            </button>

            <button
              type="button"
              onClick={() => void handleOAuthLogin("facebook")}
              disabled={isBusy}
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-800 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {oauthLoading === "facebook" ? "Forbinder til Facebook..." : "Fortsæt med Facebook"}
            </button>
          </div>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-xs uppercase tracking-wide text-gray-400">eller</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          <form className="space-y-4" onSubmit={handleEmailLogin}>
            <label className="block">
              <div className="mb-2 text-sm font-medium text-gray-700">E-mail</div>
              <input
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="navn@eksempel.dk"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-gray-500"
              />
            </label>

            <label className="block">
              <div className="mb-2 text-sm font-medium text-gray-700">Adgangskode</div>
              <input
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Din adgangskode"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-gray-500"
              />
            </label>

            <button
              type="submit"
              disabled={isBusy}
              className="w-full rounded-xl bg-gray-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Logger ind..." : "Log ind"}
            </button>

            <button
              type="button"
              onClick={() => void handleResetPassword()}
              disabled={isBusy}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {resetLoading ? "Sender..." : "Glemt adgangskode?"}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
