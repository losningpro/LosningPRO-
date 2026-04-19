import React from "react";
import { Phone, Video, Mail } from "lucide-react";

type HomeBusinessSectionProps = {
  compact?: boolean;
};

const VIDEO_CALL_URL = "https://calendly.com/losningpro";

export default function HomeBusinessSection({
  compact = false,
}: HomeBusinessSectionProps) {
  return (
    <section
      className={`w-full bg-[#f4f7fb] ${
        compact ? "py-12 md:py-16" : "py-16 md:py-24"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[32px] border border-[#d7e3f7] bg-gradient-to-br from-[#3d67c7] via-[#3b6dd8] to-[#4b7be0] text-white shadow-[0_20px_60px_rgba(37,99,235,0.18)]">
          <div
            className={`px-6 ${
              compact ? "py-10 md:px-10 md:py-12" : "py-12 md:px-12 md:py-16"
            }`}
          >
            <div className="mx-auto max-w-4xl text-center">
              <span className="inline-flex rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-sm font-medium text-white/95">
                Erhvervsløsninger
              </span>

              <h2
                className={`mt-5 font-bold tracking-tight ${
                  compact ? "text-3xl md:text-4xl" : "text-4xl md:text-5xl"
                }`}
              >
                Har du brug for hurtig kontakt om en opgave?
              </h2>

              <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-blue-50 md:text-lg">
                Vi hjælper virksomheder, boligforeninger og private kunder i hele
                Danmark. Ring direkte, book et videomøde eller send os din
                forespørgsel via kontaktformularen.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
              <a
                href="tel:+4552717810"
                className="group flex min-h-[210px] flex-col items-center justify-center rounded-[28px] border border-white/20 bg-white/12 p-8 text-center shadow-sm backdrop-blur-sm transition hover:-translate-y-1 hover:bg-white/18"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-[#3567cf] shadow-md">
                  <Phone className="h-8 w-8" />
                </div>
                <h3 className="mt-6 text-2xl font-bold">Ring direkte</h3>
                <p className="mt-3 max-w-xs text-sm leading-6 text-blue-50">
                  Få hurtig hjælp med det samme.
                </p>
                <div className="mt-4 text-base font-semibold text-white">
                  +45 52 71 78 10
                </div>
              </a>

              <a
                href={VIDEO_CALL_URL}
                target="_blank"
                rel="noreferrer"
                className="group flex min-h-[210px] flex-col items-center justify-center rounded-[28px] border border-white/20 bg-white/12 p-8 text-center shadow-sm backdrop-blur-sm transition hover:-translate-y-1 hover:bg-white/18"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-[#3567cf] shadow-md">
                  <Video className="h-8 w-8" />
                </div>
                <h3 className="mt-6 text-2xl font-bold">Book videomøde</h3>
                <p className="mt-3 max-w-xs text-sm leading-6 text-blue-50">
                  Vælg et tidspunkt i kalenderen og tal med os online.
                </p>
                <div className="mt-4 text-sm font-semibold text-white/95">
                  Åbn kalender
                </div>
              </a>

              <a
                href="/kontakt"
                className="group flex min-h-[210px] flex-col items-center justify-center rounded-[28px] border border-white/20 bg-white/12 p-8 text-center shadow-sm backdrop-blur-sm transition hover:-translate-y-1 hover:bg-white/18"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-[#3567cf] shadow-md">
                  <Mail className="h-8 w-8" />
                </div>
                <h3 className="mt-6 text-2xl font-bold">Kontaktformular</h3>
                <p className="mt-3 max-w-xs text-sm leading-6 text-blue-50">
                  Send din opgave gennem formularen, så vender vi hurtigt tilbage.
                </p>
                <div className="mt-4 text-sm font-semibold text-white/95">
                  Gå til kontakt
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
