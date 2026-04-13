import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, Video, MapPin } from "lucide-react";

type HomeBusinessSectionProps = {
  compact?: boolean;
};

export default function HomeBusinessSection({
  compact = false,
}: HomeBusinessSectionProps) {
  return (
    <section className={compact ? "bg-[#2f4ba3] py-16 md:py-20" : "bg-[#2f4ba3] py-20 md:py-24"}>
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold tracking-tight text-white md:text-6xl">
          Kontakt
        </h2>

        <p className="mx-auto mt-6 max-w-3xl text-lg text-white/90 md:text-xl">
          Har du spørgsmål? Brug vores formular, ring direkte, eller book et videokald.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Link
            to="/kontakt#kontaktformular"
            className="rounded-[32px] border border-white/20 bg-white/10 p-8 text-center text-white backdrop-blur transition hover:bg-white/15"
          >
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-500">
              <Mail className="h-8 w-8 text-white" />
            </div>

            <h3 className="mt-6 text-2xl font-semibold">Formular</h3>

            <p className="mt-4 text-sm leading-6 text-white/85">
              Send os en besked om din opgave, så vender vi hurtigt tilbage.
            </p>
          </Link>

          <a
            href="tel:+4552717810"
            className="rounded-[32px] border border-white/20 bg-white/10 p-8 text-center text-white backdrop-blur transition hover:bg-white/15"
          >
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-500">
              <Phone className="h-8 w-8 text-white" />
            </div>

            <h3 className="mt-6 text-2xl font-semibold">Ring nu</h3>

            <p className="mt-4 text-base text-white/90">+45 52 71 78 10</p>
          </a>

          <Link
            to="/book-video-call"
            className="rounded-[32px] border border-white/20 bg-white/10 p-8 text-center text-white backdrop-blur transition hover:bg-white/15"
          >
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-500">
              <Video className="h-8 w-8 text-white" />
            </div>

            <h3 className="mt-6 text-2xl font-semibold">Book videokald</h3>

            <p className="mt-4 text-sm leading-6 text-white/85">
              Gennemgå opgaven med os online og kom hurtigt videre.
            </p>
          </Link>
        </div>

        <div className="mt-10 flex items-center justify-center gap-2 text-sm text-white/85">
          <MapPin className="h-4 w-4" />
          <span>Service i hele Danmark</span>
        </div>
      </div>
    </section>
  );
}
