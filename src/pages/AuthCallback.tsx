import React, { useEffect, useMemo, useState } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import { supabase } from "../lib/supabase";

const FALLBACK_PATH = "/konto";

function sanitizeNext(value: string | null): string {
  if (!value) return FALLBACK_PATH;
  if (!value.startsWith("/")) return FALLBACK_PATH;
  if (value.startsWith("//")) return FALLBACK_PATH;
  return value;
}

export default function AuthCallbackPage() {
  const [params] = useSearchParams();
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const nextPath = useMemo(() => sanitizeNext(params.get("next")), [params]);

  useEffect(() => {
    let mounted = true;

    async function finishOAuth() {
      try {
        const url = new URL(window.location.href);
        const code = url.searchParams.get("code");
        const providerError = url.searchParams.get("error_description") ?? url.searchParams.get("error");

        if (providerError) {
          throw new Error(providerError);
        }

        if (code) {
          const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
          if (exchangeError) throw exchangeError;
        }

        const { data, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) throw sessionError;

        if (!data.session) {
          throw new Error("Der blev ikke oprettet en session efter social login.");
        }

        if (mounted) {
          setReady(true);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : "Social login kunne ikke fuldføres.");
        }
      }
    }

    void finishOAuth();

    return () => {
      mounted = false;
    };
  }, []);

  if (ready) {
    return <Navigate to={nextPath} replace />;
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6 py-12">
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-semibold text-gray-900">Afslutter login…</h1>
          <p className="mt-2 text-sm text-gray-600">
            Vi forbinder din konto og henter din profil.
          </p>

          {error ? (
            <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          ) : (
            <div className="mt-4 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700">
              Vent venligst et øjeblik…
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
