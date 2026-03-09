import React from "react";

export default function JoinTenant() {
  return (
    <main className="min-h-screen bg-white">
      <section className="mx-auto max-w-4xl px-4 py-12">
        <h1 className="text-3xl font-bold tracking-tight">Join tenant</h1>
        <p className="mt-4 text-base text-gray-600">
          Denne side er under opbygning. Her kan godkendte brugere senere tilslutte
          sig en tenant og fortsætte opsætningen.
        </p>

        <div className="mt-8 rounded-2xl border border-gray-200 bg-gray-50 p-6">
          <h2 className="text-xl font-semibold">Midlertidig side</h2>
          <p className="mt-2 text-sm text-gray-600">
            Komponenten manglede tidligere indhold og default export, hvilket stoppede
            build-processen i Vite/Vercel.
          </p>
        </div>
      </section>
    </main>
  );
}
