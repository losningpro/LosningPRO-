import React from "react";
import { Link } from "react-router-dom";

type HomeBusinessSectionProps = {
  compact?: boolean;
};

export default function HomeBusinessSection({
  compact = false,
}: HomeBusinessSectionProps) {
  return (
    <section
      className={
        compact
          ? "bg-gradient-to-b from-white via-slate-50 to-white py-16 md:py-20"
          : "bg-gradient-to-b from-white via-slate-50 to-white py-20 md:py-24"
      }
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="mb-10 text-center">
          <span className="inline-flex rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700">
            Erhverv
          </span>

          <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Klar til næste skridt?
          </h2>

          <p className="mx-auto mt-4 max-w-3xl text-base text-slate-600 md:text-lg">
            Vælg den hurtigste vej videre: book direkte, tag et gratis videokald,
            eller gå til kontaktformularen og send os din opgave.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="inline-flex rounded-2xl bg-slate-900 px-3 py-2 text-sm font-medium text-white">
              Direkte booking
            </div>

            <h3 className="mt-5 text-2xl font-semibold text-slate-900">
              Book en medarbejder
            </h3>

            <p className="mt-3 text-sm leading-6 text-slate-600">
              Til virksomheder, drift, service og akut hjælp. Gå direkte til bookingflowet
              og find den rette ydelse.
            </p>

            <div className="mt-6">
              <Link
                to="/kob"
                className="inline-flex w-full items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-black"
              >
                Book et medarbejder
              </Link>
            </div>

            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="text-2xl font-semibold text-slate-900">350+</div>
              <div className="mt-1 text-sm text-slate-600">kr./time fra</div>
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="inline-flex rounded-2xl bg-sky-600 px-3 py-2 text-sm font-medium text-white">
              Afklar først
            </div>

            <h3 className="mt-5 text-2xl font-semibold text-slate-900">
              Book gratis videokald
            </h3>

            <p className="mt-3 text-sm leading-6 text-slate-600">
              Gennemgå opgaven med os online, få afklaret behov og kom hurtigere videre
              til det rigtige næste trin.
            </p>

            <div className="mt-6">
              <Link
                to="/book-video-call"
                className="inline-flex w-full items-center justify-center rounded-2xl border border-slate-300 px-5 py-3 text-sm font-medium text-slate-800 transition hover:bg-slate-50"
              >
                Book gratis videokald
              </Link>
            </div>

            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="text-2xl font-semibold text-slate-900">B2B</div>
              <div className="mt-1 text-sm text-slate-600">tilpasset drift og service</div>
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="inline-flex rounded-2xl bg-orange-500 px-3 py-2 text-sm font-medium text-white">
              Kontaktformular
            </div>

            <h3 className="mt-5 text-2xl font-semibold text-slate-900">
              Send din opgave
            </h3>

            <p className="mt-3 text-sm leading-6 text-slate-600">
              Brug formularen, hvis du vil beskrive opgaven først. Vi opretter din
              henvendelse og kontakter dig hurtigst muligt.
            </p>

            <div className="mt-6">
              <Link
                to="/kontakt#kontaktformular"
                className="inline-flex w-full items-center justify-center rounded-2xl border border-slate-300 px-5 py-3 text-sm font-medium text-slate-800 transition hover:bg-slate-50"
              >
                Gå til kontaktformular
              </Link>
            </div>

            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="text-2xl font-semibold text-slate-900">Hurtigt</div>
              <div className="mt-1 text-sm text-slate-600">fra forespørgsel til booking</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
