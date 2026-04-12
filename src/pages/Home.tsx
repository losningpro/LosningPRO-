import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import BlueFeatureBar from '../components/BlueFeatureBar';
import ProductSlider from '../components/ProductSlider';
import HowItWorks from '../components/HowItWorks';
import ContactForm from '../components/ContactForm';
import { useMarketStore } from '../lib/store';

function SeoSchema() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'LøsningPRO',
    url: 'https://www.losningpro.dk',
    telephone: '+45 52 71 78 10',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Baneleddet 39',
      postalCode: '2600',
      addressLocality: 'Glostrup',
      addressCountry: 'DK',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default function Home() {
  const products = useMarketStore((state) => state.products);

  const popularMaterials = products.filter(
    (p) => p.category === 'Material' && p.popular
  );

  const popularServices = products.filter(
    (p) =>
      (p.category === 'El-Service' ||
        p.category === 'VVS-Service' ||
        p.category === 'Tømrer') &&
      p.popular
  );

  return (
    <div className="min-h-screen bg-white">
      <SeoSchema />
      <Header />

      <main>
        <HeroSection />
        <BlueFeatureBar />

        <section className="bg-slate-950 py-14 text-white">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.25fr_0.75fr] lg:px-8">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">
                Ny home-konvertering
              </p>

              <h2 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
                Book en fagperson til virksomheder fra 350 kr./time
              </h2>

              <p className="mt-4 max-w-2xl text-slate-300">
                Målrettet elektriker, VVS og håndværker-booking med et enkelt flow:
                vælg ydelse, tilføj til kurv, reservér tid og betal.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/kob"
                  className="inline-flex items-center justify-center rounded-xl bg-blue-500 px-6 py-3 font-semibold text-white transition hover:opacity-90"
                >
                  Book et medarbejder
                </Link>

                <Link
                  to="/book-video-call"
                  className="inline-flex items-center justify-center rounded-xl border border-white/20 px-6 py-3 font-semibold text-white transition hover:bg-white/5"
                >
                  Book gratis videokald
                </Link>

                <Link
                  to="/tjenester"
                  className="inline-flex items-center justify-center rounded-xl border border-white/20 px-6 py-3 font-semibold text-white transition hover:bg-white/5"
                >
                  Se tjenester
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <h3 className="text-xl font-semibold">For virksomheder</h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-300">
                <li>• Hurtig booking af medarbejder på timebasis</li>
                <li>• Service i checkout med dato og tidspunkt</li>
                <li>• Gratis video- eller telefonafklaring før booking</li>
                <li>• Klar til leads, videokald og næste skridt i dashboard</li>
              </ul>
            </div>
          </div>
        </section>

        <ProductSlider
          title="Populære Materialer"
          products={popularMaterials}
          viewAllLink="/kob"
        />

        <ProductSlider
          title="Populære Tjenester"
          products={popularServices}
          viewAllLink="/tjenester"
        />

        <HowItWorks />

        <section className="bg-gray-50 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <ContactForm
              pageKey="home"
              title="Kontakt os"
              description="Send os din opgave, så vender vi tilbage hurtigst muligt."
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
