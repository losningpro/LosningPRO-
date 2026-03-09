import React from 'react';
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
    url: 'https://losningpro.dk',
    telephone: '+45 52 71 78 10',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Baneleddet 39',
      postalCode: '2600',
      addressLocality: 'Glostrup',
      addressCountry: 'DK',
    },
    areaServed: [
      'Glostrup',
      'København',
      'Albertslund',
      'Brøndby',
      'Ballerup',
      'Brøndbyvester',
      'Storkøbenhavn',
    ],
    sameAs: [
      'https://www.trustpilot.com/review/losningpro.dk',
      'https://www.instagram.com/danieldanielsen.gi',
      'https://www.facebook.com/share/1C7Sf2mnP5/',
    ],
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default function Home() {
  const products = useMarketStore(state => state.products);
  
  const popularMaterials = products.filter(p => p.category === 'Material' && p.popular);
  const popularServices = products.filter(p => (p.category === 'El-Service' || p.category === 'VVS-Service' || p.category === 'Tømrer') && p.popular);

  return (
    <div className="min-h-screen bg-white">
      <SeoSchema />
      <Header />

      <main>
        <HeroSection />

        {/* ✅ SOLO UN blue banner */}
        <BlueFeatureBar />

        {/* Marketplace: 2 carruseles filtrados de la BD */}
        <ProductSlider title="Populære Materialer" products={popularMaterials} viewAllLink="/kob" />
        <ProductSlider title="Populære Tjenester" products={popularServices} viewAllLink="/tjenester" />

        <HowItWorks />

        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Om LøsningPRO</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
              Vi er din lokale partner for alle el- og VVS-opgaver i Glostrup og omegn. Med over 10 års erfaring leverer
              vi kvalitetsarbejde til både private og erhvervskunder.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">150+</div>
                <div className="text-gray-600">Tilfredse kunder</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">24/7</div>
                <div className="text-gray-600">Akutservice</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">10+</div>
                <div className="text-gray-600">Års erfaring</div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Arbejdsgalleri</h2>
            <p className="text-lg text-gray-600 mb-8">Se eksempler på vores arbejde</p>
            <div className="text-center">
              <p className="text-gray-500 mb-4">Coming soon</p>
              <p className="text-sm text-gray-400">Tilføjes senere</p>
            </div>
          </div>
        </section>

        <ContactForm />
      </main>

      <Footer />
    </div>
  );
}
