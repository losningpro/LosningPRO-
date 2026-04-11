import React, { FormEvent, useMemo, useState } from "react";
import { supabase } from "../../lib/supabase";

const DASHBOARD_PATH = "/konto";
const RESET_PASSWORD_PATH = "/reset-password";

function getRedirectTo(path: string) {
  if (typeof window === "undefined") return undefined;
  return `${window.location.origin}${path}`;
}

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [oauthLoading, setOauthLoading] = useState<"google" | "facebook" | null>(null);
  const [error, setError] = useState<string | null>(null);

  const isBusy = useMemo(() => submitting || oauthLoading !== null, [submitting, oauthLoading]);

  async function handleEmailLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const normalizedEmail = email.trim().toLowerCase();

      if (!normalizedEmail) {
        throw new Error("Indtast din e-mail.");
      }

      if (!password) {
        throw new Error("Indtast din adgangskode.");
      }

      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: normalizedEmail,
        password,
      });

      if (signInError) {
        throw signInError;
      }

      window.location.assign(DASHBOARD_PATH);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Log ind mislykkedes.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleOAuthLogin(provider: "google" | "facebook") {
    setError(null);
    setOauthLoading(provider);

    try {
      const { error: oauthError } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: getRedirectTo(DASHBOARD_PATH),
        },
      });

      if (oauthError) {
        throw oauthError;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Social login mislykkedes.");
      setOauthLoading(null);
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

          <div className="mt-6 space-y-3">
            <button
              type="button"
              onClick={() => void handleOAuthLogin("google")}
              disabled={isBusy}
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-800 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {oauthLoading === "google" ? "Åbner Google..." : "Fortsæt med Google"}
            </button>

            <button
              type="button"
              onClick={() => void handleOAuthLogin("facebook")}
              disabled={isBusy}
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-800 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {oauthLoading === "facebook" ? "Åbner Facebook..." : "Fortsæt med Facebook"}
            </button>
          </div>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-xs uppercase tracking-wide text-gray-400">eller</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          <form className="space-y-4" onSubmit={handleEmailLogin}>
            <div>
              <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
                E-mail
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="navn@eksempel.dk"
                disabled={isBusy}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-gray-900 disabled:cursor-not-allowed disabled:bg-gray-100"
              />
            </div>

            <div>
              <div className="mb-1 flex items-center justify-between gap-3">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Adgangskode
                </label>

                <a
                  href={RESET_PASSWORD_PATH}
                  className="text-sm font-medium text-gray-700 underline underline-offset-2 hover:text-black"
                >
                  Glemt adgangskode?
                </a>
              </div>

              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="••••••••"
                disabled={isBusy}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-gray-900 disabled:cursor-not-allowed disabled:bg-gray-100"
              />
            </div>

            <button
              type="submit"
              disabled={isBusy}
              className="w-full rounded-xl bg-gray-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Logger ind..." : "Log ind med e-mail"}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
