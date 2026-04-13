import React from "react";
import { Link } from "react-router-dom";

type HomeBusinessSectionProps = {
  compact?: boolean;
};

export default function HomeBusinessSection({
  compact = false,
}: HomeBusinessSectionProps) {
  return (
    <section className={compact ? "bg-white py-16 md:py-20" : "bg-white py-20 md:py-24"}>
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <span className="inline-flex rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700">
              Erhverv
            </span>

            <h2 className="mt-5 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
              Book en medarbejder til erhverv fra 350 kr./time
            </h2>

            <p className="mt-5 max-w-2xl text-lg text-slate-600">
              Til virksomheder, drift, service og akut hjælp. En enkel vej fra behov til booking.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/kob"
                className="rounded-2xl bg-slate-900 px-6 py-4 text-center text-sm font-medium text-white transition hover:bg-black"
              >
                Book et medarbejder
              </Link>

              <Link
                to="/book-video-call"
                className="rounded-2xl border border-slate-300 px-6 py-4 text-center text-sm font-medium text-slate-800 transition hover:bg-slate-50"
              >
                Book gratis videokald
              </Link>

              <Link
                to="/kontakt#kontaktformular"
                className="rounded-2xl border border-slate-300 px-6 py-4 text-center text-sm font-medium text-slate-800 transition hover:bg-slate-50"
              >
                Gå til kontaktformular
              </Link>
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
            <h3 className="text-xl font-semibold text-slate-900">Sådan fungerer det</h3>

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
                  Vælg tidspunkt eller book først et gratis video- eller telefonmøde.
                </p>
              </div>

              <div className="rounded-2xl bg-white p-4">
                <div className="text-sm font-semibold text-slate-900">3. Få bekræftelse</div>
                <p className="mt-1 text-sm text-slate-600">
                  Ordre og booking samles i dashboard og videre flow.
                </p>
              </div>
            </div>

            <div className="mt-6">
              <Link
                to="/kontakt#kontaktformular"
                className="inline-flex w-full items-center justify-center rounded-2xl bg-sky-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-sky-700"
              >
                Åbn kontaktformular
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
