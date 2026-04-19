import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ContactForm from "../components/ContactForm";
import { Phone, Mail, Video, MapPin } from "lucide-react";

export default function KontaktPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        <section className="bg-[#26439a] py-16 text-white md:py-24">
          <div className="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
               <p className="mx-auto mt-4 max-w-3xl text-lg text-blue-100">
              Har du spørgsmål? Brug vores formular, ring direkte, eller book et videokald.
                 
            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
              <a
                href="#kontakt-form"
                className="rounded-3xl border border-white/20 bg-white/10 p-8 text-white shadow-sm transition hover:bg-white/15"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-500 text-white">
                  <Mail className="h-8 w-8" />
                </div>
                <h2 className="mt-6 text-2xl font-semibold">Formular</h2>
                <p className="mt-3 text-sm text-blue-100">
                  Send os en besked om din opgave, så vender vi hurtigt tilbage.
                </p>
              </a>

              <a
                href="tel:+4552717810"
                className="rounded-3xl border border-white/20 bg-white/10 p-8 text-white shadow-sm transition hover:bg-white/15"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-500 text-white">
                  <Phone className="h-8 w-8" />
                </div>
                <h2 className="mt-6 text-2xl font-semibold">Ring nu</h2>
                <p className="mt-3 text-sm text-blue-100">+45 52 71 78 10</p>
              </a>

              <Link
                to="/book-video-call"
                className="rounded-3xl border border-white/20 bg-white/10 p-8 text-white shadow-sm transition hover:bg-white/15"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-500 text-white">
                  <Video className="h-8 w-8" />
                </div>
                <h2 className="mt-6 text-2xl font-semibold">Book videokald</h2>
                <p className="mt-3 text-sm text-blue-100">
                  Gennemgå opgaven med os online og kom hurtigt videre.
                </p>
              </Link>
            </div>

            <div className="mt-10 inline-flex items-center gap-2 text-sm text-blue-100">
              <MapPin className="h-4 w-4" />
              <span>Service i hele Danmark</span>
            </div>
          </div>
        </section>

        <section id="kontakt-form" className="bg-slate-50 py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 max-w-3xl">
              <span className="inline-flex rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700">
                Kontaktformular
              </span>

              <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900">
                Fortæl os om din opgave
              </h2>

              <p className="mt-3 text-base text-slate-600">
                Vi opretter din henvendelse som lead og kontakter dig hurtigst muligt.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <ContactForm
                pageKey="kontakt"
                title="Send din besked"
                description="Udfyld formularen, så vender vi tilbage med næste skridt."
              />

              <aside className="space-y-4">
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-slate-900">Direkte kontakt</h3>
                  <div className="mt-4 space-y-3 text-sm text-slate-600">
                    <p>
                      <span className="font-medium text-slate-900">Telefon:</span>{" "}
                      <a href="tel:+4552717810" className="hover:underline">
                        +45 52 71 78 10
                      </a>
                    </p>
                    <p>
                      <span className="font-medium text-slate-900">E-mail:</span>{" "}
                      <a href="mailto:info@losningpro.dk" className="hover:underline">
                        info@losningpro.dk
                      </a>
                    </p>
                  </div>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-slate-900">Åbningstider</h3>
                  <div className="mt-3 space-y-2 text-sm text-slate-600">
                    <p>Mandag – Fredag: 08:00 – 18:00</p>
                    <p>Lørdag: Efter aftale</p>
                    <p>Søndag: Lukket</p>
                  </div>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-slate-900">Hvad sker der bagefter?</h3>
                  <div className="mt-3 space-y-2 text-sm text-slate-600">
                    <p>1. Din henvendelse gemmes som lead</p>
                    <p>2. Vi registrerer kontaktkanalen</p>
                    <p>3. Du får svar fra os hurtigst muligt</p>
                  </div>
                </div>
              </aside>
            </div>
           </div>
        </section>
          </main>
