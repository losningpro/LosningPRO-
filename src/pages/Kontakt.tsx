import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ContactForm from "../components/ContactForm";
import { Mail, Phone, Video } from "lucide-react";

const VIDEO_CALL_URL = "https://calendly.com/losningpro";

export default function KontaktPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        <section className="bg-[#2f4da3] py-16 text-white md:py-24">
          <div className="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              Kontakt
            </h1>
            <p className="mx-auto mt-4 max-w-3xl text-lg text-blue-100">
              Send os en besked om din opgave, ring direkte eller book et videomøde.
            </p>
          </div>
        </section>

        <section className="bg-[#f5f7fb] py-12 md:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
              <a
                href="tel:+4552717810"
                className="flex items-center gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-[#2f4da3]">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-sm text-slate-500">Ring direkte</div>
                  <div className="text-lg font-semibold text-slate-900">
                    +45 52 71 78 10
                  </div>
                </div>
              </a>

              <a
                href={VIDEO_CALL_URL}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-[#2f4da3]">
                  <Video className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-sm text-slate-500">Videomøde</div>
                  <div className="text-lg font-semibold text-slate-900">
                    Book i kalenderen
                  </div>
                </div>
              </a>

              <a
                href="mailto:info@losningpro.dk"
                className="flex items-center gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-[#2f4da3]">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-sm text-slate-500">E-mail</div>
                  <div className="text-lg font-semibold text-slate-900">
                    info@losningpro.dk
                  </div>
                </div>
              </a>
            </div>

            <ContactForm
              pageKey="kontakt"
              title="Send os din besked"
              description="Udfyld formularen nedenfor. Din henvendelse gemmes som et lead, så vi kan følge op hurtigt og korrekt."
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
