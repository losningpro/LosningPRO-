import React from "react";
import ContactForm from "../components/ContactForm";

export default function KontaktPage() {
  return (
    <main className="bg-slate-50">
      <section className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
        <div className="mb-10 max-w-3xl">
          <span className="inline-flex rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700">
            Kontakt
          </span>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900">
            Kontakt os om el, VVS og håndværksopgaver
          </h1>
          <p className="mt-4 text-base text-slate-600">
            Send os din opgave, så vender vi tilbage med næste skridt, pris eller bookingmulighed.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <ContactForm />

          <aside className="space-y-4">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">Ring direkte</h2>
              <p className="mt-2 text-sm text-slate-600">
                Har du brug for hurtig hjælp, kan du ringe direkte.
              </p>
              <a
                href="tel:+4552717810"
                className="mt-4 inline-flex rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white"
              >
                +45 52 71 78 10
              </a>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">Book et gratis videokald</h2>
              <p className="mt-2 text-sm text-slate-600">
                Vi kan gennemgå opgaven online og hjælpe dig videre hurtigt.
              </p>
              <a
                href="/home"
                className="mt-4 inline-flex rounded-2xl border border-slate-300 px-5 py-3 text-sm font-medium text-slate-800"
              >
                Book videokald
              </a>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">Åbningstider</h2>
              <div className="mt-3 space-y-2 text-sm text-slate-600">
                <p>Mandag – Fredag: 08:00 – 18:00</p>
                <p>Lørdag: Efter aftale</p>
                <p>Søndag: Lukket</p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
