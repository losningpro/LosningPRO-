import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ContactForm from "../components/ContactForm";
import { supabase } from "../lib/supabase";

async function trackCallClick() {
  try {
    await supabase.from("contact_events").insert({
      tenant_id: null,
      lead_id: null,
      channel: "call",
      page_key: "kontakt",
      metadata: {
        source: "call_click",
        href: typeof window !== "undefined" ? window.location.href : null,
        user_agent: typeof navigator !== "undefined" ? navigator.userAgent : null,
      },
    });
  } catch (error) {
    console.error("trackCallClick error:", error);
  }
}

export default function KontaktPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        <section className="bg-[#2f4ba3] py-20 text-white md:py-24">
          <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
              Kontakt
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg text-white/90 md:text-xl">
              Fortæl os om din opgave, så opretter vi din henvendelse og kontakter dig hurtigst muligt.
            </p>

            <div className="mt-8">
              <a
                href="tel:+4552717810"
                onClick={() => {
                  void trackCallClick();
                }}
                className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-4 text-sm font-medium text-[#2f4ba3] transition hover:bg-slate-100"
              >
                Ring nu: +45 52 71 78 10
              </a>
            </div>
          </div>
        </section>

        <section id="kontaktformular" className="bg-gray-50 py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <ContactForm
              pageKey="kontakt"
              title="Fortæl os om din opgave"
              description="Vi opretter din henvendelse som lead og kontakter dig hurtigst muligt."
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
