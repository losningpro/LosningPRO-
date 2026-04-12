import React from "react";
import VideoCallForm from "../components/VideoCallForm";

export default function BookVideoCallPage() {
  return (
    <main className="bg-slate-50">
      <section className="mx-auto max-w-5xl px-4 py-12 md:px-6 md:py-16">
        <div className="mb-10 max-w-3xl">
          <span className="inline-flex rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700">
            Gratis rådgivning
          </span>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900">
            Book et gratis video- eller telefonmøde
          </h1>
          <p className="mt-4 text-base text-slate-600">
            Fortæl kort om opgaven, vælg tidspunkt, og vi vender tilbage med bekræftelse.
          </p>
        </div>

        <VideoCallForm />

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="text-sm font-semibold text-slate-900">Afklar behov</div>
            <p className="mt-2 text-sm text-slate-600">
              Vi gennemgår opgaven og anbefaler næste skridt.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="text-sm font-semibold text-slate-900">Hurtig respons</div>
            <p className="mt-2 text-sm text-slate-600">
              Vi kontakter dig for at bekræfte tidspunktet.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="text-sm font-semibold text-slate-900">Klar retning</div>
            <p className="mt-2 text-sm text-slate-600">
              Efter mødet er du klar til booking, ordre eller videre plan.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
