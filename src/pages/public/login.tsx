import React from "react";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6 py-12">
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-semibold text-gray-900">Log ind</h1>
          <p className="mt-2 text-sm text-gray-600">
            Få adgang til din konto med Google, Facebook eller e-mail.
          </p>

          <div className="mt-6 space-y-3">
            <button
              type="button"
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-800 transition hover:bg-gray-50"
            >
              Fortsæt med Google
            </button>

            <button
              type="button"
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-800 transition hover:bg-gray-50"
            >
              Fortsæt med Facebook
            </button>
          </div>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-xs uppercase tracking-wide text-gray-400">eller</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          <form className="space-y-4">
            <div>
              <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
                E-mail
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="navn@eksempel.dk"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-gray-900"
              />
            </div>

            <div>
              <div className="mb-1 flex items-center justify-between gap-3">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Adgangskode
                </label>

                <a
                  href="/reset-password"
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
                placeholder="••••••••"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-gray-900"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-gray-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-black"
            >
              Log ind med e-mail
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
