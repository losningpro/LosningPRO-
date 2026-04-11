import React, { FormEvent, useMemo, useState } from "react";
import { supabase } from "../lib/supabase";

const LOGIN_PATH = "/login";
const DASHBOARD_PATH = "/konto";

export default function UpdatePasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const isBusy = useMemo(() => submitting, [submitting]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSuccess(null);
    setSubmitting(true);

    try {
      if (!password) {
        throw new Error("Indtast en ny adgangskode.");
      }

      if (password.length < 6) {
        throw new Error("Adgangskoden skal være mindst 6 tegn.");
      }

      if (password !== confirmPassword) {
        throw new Error("Adgangskoderne matcher ikke.");
      }

      const { error: updateError } = await supabase.auth.updateUser({
        password,
      });

      if (updateError) {
        throw updateError;
      }

      setSuccess("Din adgangskode er opdateret.");

      setTimeout(() => {
        window.location.assign(DASHBOARD_PATH);
      }, 1200);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Kunne ikke opdatere adgangskoden.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6 py-12">
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-semibold text-gray-900">Ny adgangskode</h1>
          <p className="mt-2 text-sm text-gray-600">
            Vælg en ny adgangskode for din konto.
          </p>

          {error ? (
            <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          ) : null}

          {success ? (
            <div className="mt-4 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
              {success}
            </div>
          ) : null}

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="password" className="mb-1 block text-sm font-medium text-gray-700">
                Ny adgangskode
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="••••••••"
                disabled={isBusy}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-gray-900 disabled:cursor-not-allowed disabled:bg-gray-100"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="mb-1 block text-sm font-medium text-gray-700">
                Gentag adgangskode
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
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
              {submitting ? "Gemmer..." : "Opdater adgangskode"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <a
              href={LOGIN_PATH}
              className="text-sm font-medium text-gray-700 underline underline-offset-2 hover:text-black"
            >
              Tilbage til log ind
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
