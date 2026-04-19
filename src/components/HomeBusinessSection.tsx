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
      className={`w-full bg-slate-50 ${
        compact ? "py-12 md:py-16" : "py-16 md:py-24"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white shadow-xl">
          <div
            className={`grid grid-cols-1 items-center gap-10 ${
              compact ? "px-6 py-10 md:px-10" : "px-6 py-12 md:px-12 md:py-16"
            } lg:grid-cols-2`}
          >
            <div>
              <div className="mb-4 inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm font-medium text-white/90">
                Erhvervsløsninger
              </div>

              <h2
                className={`font-bold tracking-tight ${
                  compact
                    ? "text-3xl md:text-4xl"
                    : "text-4xl md:text-5xl"
                }`}
              >
                Løsninger til virksomheder, ejendomme og faste samarbejder
              </h2>

              <p className="mt-4 max-w-2xl text-base leading-7 text-white/80 md:text-lg">
                Vi hjælper virksomheder, boligforeninger og professionelle
                kunder med drift, vedligeholdelse og praktiske løsninger.
                Kontakt os for en løsning, der passer til jeres behov.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/kontakt"
                  className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
                >
                  Kontakt os
                </Link>

                <Link
                  to="/tjenester"
                  className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
                >
                  Se tjenester
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-sm">
                <h3 className="text-lg font-semibold">For virksomheder</h3>
                <p className="mt-2 text-sm leading-6 text-white/75">
                  Praktiske og fleksible løsninger til mindre og større
                  erhvervskunder.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-sm">
                <h3 className="text-lg font-semibold">Faste aftaler</h3>
                <p className="mt-2 text-sm leading-6 text-white/75">
                  Mulighed for løbende samarbejde og planlagte opgaver.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-sm">
                <h3 className="text-lg font-semibold">Hurtig kontakt</h3>
                <p className="mt-2 text-sm leading-6 text-white/75">
                  Brug kontaktformularen eller ring direkte for en hurtig dialog.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-sm">
                <h3 className="text-lg font-semibold">Tilpassede løsninger</h3>
                <p className="mt-2 text-sm leading-6 text-white/75">
                  Vi tilpasser opgaven efter omfang, tidsplan og konkrete ønsker.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
