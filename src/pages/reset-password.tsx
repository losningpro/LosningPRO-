import React, { FormEvent, useMemo, useState } from "react";
import { supabase } from "../lib/supabase";

const LOGIN_PATH = "/login";
const UPDATE_PASSWORD_PATH = "/update-password";

function getRedirectTo(path: string) {
  if (typeof window === "undefined") return undefined;
  return `${window.location.origin}${path}`;
}

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
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
      const normalizedEmail = email.trim().toLowerCase();

      if (!normalizedEmail) {
        throw new Error("Indtast din e-mail.");
      }

      const { error: resetError } = await supabase.auth.resetPasswordForEmail(normalizedEmail, {
        redirectTo: getRedirectTo(UPDATE_PASSWORD_PATH),
      });

      if (resetError) {
        throw resetError;
      }

      setSuccess("Vi har sendt dig et link til at nulstille din adgangskode.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Kunne ikke sende e-mail.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6 py-12">
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-semibold text-gray-900">Glemt adgangskode</h1>
          <p className="mt-2 text-sm text-gray-600">
            Indtast din e-mail, så sender vi dig et link til at nulstille din adgangskode.
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

            <button
              type="submit"
              disabled={isBusy}
              className="w-full rounded-xl bg-gray-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Sender..." : "Send nulstillingslink"}
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
