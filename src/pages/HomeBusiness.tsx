import React from "react";

export default function HomeBusinessPage() {
  return (
    <main className="bg-white">
      <section className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <span className="inline-flex rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700">
              Erhverv
            </span>

            <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
              Book en medarbejder til erhverv fra 350 kr./time
            </h1>

            <p className="mt-5 max-w-2xl text-lg text-slate-600">
              Til virksomheder, drift, service og akut hjælp. En enkel vej fra behov til booking.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="/kob"
                className="rounded-2xl bg-slate-900 px-6 py-4 text-center text-sm font-medium text-white hover:bg-black"
              >
                Book et medarbejder
              </a>

              <a
                href="/kontakt"
                className="rounded-2xl border border-slate-300 px-6 py-4 text-center text-sm font-medium text-slate-800 hover:bg-slate-50"
              >
                Få rådgivning først
              </a>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 p-4">
                <div className="text-2xl font-semibold text-slate-900">350+</div>
                <div className="mt-1 text-sm text-slate-600">kr./time fra</div>
              </div>
              <div className="rounded-2xl border border-slate-200 p-4">
                <div className="text-2xl font-semibold text-slate-900">B2B</div>
                <div className="mt-1 text-sm text-slate-600">tilpasset drift og service</div>
              </div>
              <div className="rounded-2xl border border-slate-200 p-4">
                <div className="text-2xl font-semibold text-slate-900">Hurtigt</div>
                <div className="mt-1 text-sm text-slate-600">fra forespørgsel til booking</div>
              </div>
            </div>
          </div>

          <div className="rounded-[32px] border border-slate-200 bg-slate-50 p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Sådan fungerer det</h2>
            <div className="mt-6 space-y-4">
              <div className="rounded-2xl bg-white p-4">
                <div className="text-sm font-semibold text-slate-900">1. Vælg service</div>
                <p className="mt-1 text-sm text-slate-600">
                  Find den rette hjælp blandt tjenester og materialer.
                </p>
              </div>

              <div className="rounded-2xl bg-white p-4">
                <div className="text-sm font-semibold text-slate-900">2. Book tidspunkt</div>
                <p className="mt-1 text-sm text-slate-600">
                  Vælg tidspunkt eller kontakt os for koordinering.
                </p>
              </div>

              <div className="rounded-2xl bg-white p-4">
                <div className="text-sm font-semibold text-slate-900">3. Få bekræftelse</div>
                <p className="mt-1 text-sm text-slate-600">
                  Ordre og booking samles i dashboard og videre flow.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
