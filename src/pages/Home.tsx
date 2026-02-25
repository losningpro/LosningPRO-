import React, { useEffect, useRef, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import ProductSlider from '../components/ProductSlider';
import HowItWorks from '../components/HowItWorks';
import ContactForm from '../components/ContactForm';
import BlueFeatureBar from '../components/BlueFeatureBar';
import TrustpilotCard from '../components/TrustpilotCard';
import ContactCards from '../components/ContactCards';
import CookieBanner from '../components/CookieBanner';
import AssistantWidget from '../components/AssistantWidget';
import BlueFeatureBar from '../components/BlueFeatureBar';

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
      addressCountry: 'DK'
    },
    areaServed: ['Glostrup', 'København', 'Albertslund', 'Brøndby', 'Ballerup', 'Brøndbyøester', 'Storkøbenhavn'],
    sameAs: [
      'https://www.trustpilot.com/review/losningpro.dk',
      'https://www.instagram.com/danieldanielsen.gi',
      'https://www.facebook.com/share/1C7Sf2mnP5/'
    ]
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// Mock data for products
const materialProducts = [
  {
    id: '1',
    name: 'LED Pære E27 10W varm lys',
    price: 29,
    image: '/00025.jpg',
   category: 'Material'    
  },
  {
    id: '2',
    name: 'Ophæng E27',
    price: 149,
    image: '/00021.jpg',
    category: 'Material'
  },
  {
    id: '3',
    name: 'Papirbole lampe',
    price: 99,
    image: '/00022.jpg',
    category: 'Material'
  },
  {
    id: '4',
    name: 'Nordic panel loftlampe',
    price: 699,
    image: '/00018.jpg',
    category: 'Material'
 },
 {
    id: '5',
    name: 'Nordic plafond loftlampe',
    price: 649,
    image: '/00013.jpg',
    category: 'Material'
  },
  {
    id: '6',
    name: 'Industrielle sort lampe',
    price: 749,
    image: '/00011.jpg',
    category: 'Material'
},];

const serviceProducts = [
  {
    id: '7',
    name: 'Flytning af stikkontakt',
    price: 1000,
    image:'/enhufeflyt.png',
    category: 'El-Service'
  },
  {
    id: '8',
    name: 'VVS Reparation',
    price: 650,
    image:'/leak.jpg',
    category: 'VVS-Service'
  },
  {
    id: '9',
    name: 'Lampeophæng med kabelskjuler/kabelkanal ( 1 lampe)',
    price: 550,
    image: '/AB25.jpg',
    category: 'El-service'
  },
  {
    id: '10',
    name: 'Opvaskemaskin intallation',
    price: 1000,
    image: '/lavaplatos.png',
    category: 'VVS-service'
  },
  {
    id: '11',
    name: 'Toiletter ude af drift',
    price: 650,
    image: '/00036.png',
    category: 'VVS-Service'
  },
  {
    id: '12',
   name: 'Vask ude af drift',
    price: 650,
    image: '/00046.png',
    category: 'VVS-Service'
  }
];

const JURIDISK_INFO_PATH = '/juridisk';

export default function Home() {
  // banners visibles SOLO tras interacción con carruseles
  const [showMaterialBanner, setShowMaterialBanner] = useState(false);
  const [showServiceBanner, setShowServiceBanner] = useState(false);

  // buscador unificado (no filtra; solo UI como en lovable)
  const [search, setSearch] = useState('');

  // assistant (botón “AI-Chat” lo abre)
  const [assistantOpen, setAssistantOpen] = useState(false);

  // scroll helper
  const contactRef = useRef<HTMLDivElement | null>(null);
  const scrollToContact = () => contactRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  // Asegura animación consistente al cargar
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <SeoSchema />

      <Header />

      <main className="bg-white">
        <HeroSection onPrimaryClick={scrollToContact} />
        <BlueFeatureBar />

        {/* Barra azul (como en lovable) */}
        <BlueFeatureBar />

        {/* Marketplace header con buscador unificado */}
        <section className="bg-white pt-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Marketplace</h2>
                <p className="text-gray-600 mt-1">Søg efter produkter og tjenester (visning – ikke filtreret endnu)</p>
              </div>

              <div className="w-full md:w-[420px]">
                <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 shadow-sm">
                  <span className="text-gray-400">🔎</span>
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Søg efter produkter og tjenester…"
                    className="w-full outline-none text-gray-900 placeholder:text-gray-400"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Banner amarillo antes de Materialer (invisible hasta click carrusel) */}
        {showMaterialBanner && (
          <section className="bg-yellow-50 border-y border-yellow-200 mt-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <p className="text-sm sm:text-base text-yellow-900 leading-relaxed">
                <span className="font-semibold">⚠️</span>{' '}
                Transport pris af varer er includeret i prissen på dette shop i hele Danmark. Dette er en automatiseret
                butik – vi har ikke eget lager. Vi behandler din ordre inden for maks. 24 timer, og vores leverandør
                sender varen direkte til dig inden for højst to uger. De angivne leveringstider er estimater fra
                distributøren og kan variere.
              </p>
            </div>
          </section>
        )}

        <ProductSlider
          title="Populære Materialer"
          products={materialProducts}
          viewAllLink="/kob"
          onInteract={() => setShowMaterialBanner(true)}
        />

        <ProductSlider
          title="Populære Tjenester"
          products={serviceProducts}
          viewAllLink="/tjenester"
          onInteract={() => setShowServiceBanner(true)}
        />

        {/* Banner amarillo servicios (invisible hasta click carrusel) */}
        {showServiceBanner && (
          <section className="bg-yellow-50 border-y border-yellow-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
              <p className="text-sm sm:text-base text-yellow-900 leading-relaxed">
                <span className="font-semibold">⚠️</span> Der er et opstartsgebyr på 399 kr. til dækning af transport og
                den tid, vi bruger på at organisere din booking. Når du booker, betaler du kun dette opstartsgebyr (kan
                ikke refunderes). Resten af regningen betales under besøget, hvilket afspejler virkeligheden. Hvis du
                afbestiller en dag før servicen starter, får du refunderet for den resterende time. Se resten af
                opstartgebyr vilkår{' '}
                <a href={JURIDISK_INFO_PATH} className="underline font-semibold hover:opacity-80">
                  her
                </a>
                .
              </p>

              <p className="mt-3 text-sm sm:text-base text-yellow-900 leading-relaxed">
                Kunden sørger for de materialer og genstande, der skal installeres. Ellers medbringer vi de materialer
                og genstande, der skal installeres, i henhold til kundens ønsker.
              </p>
            </div>
          </section>
        )}

        <HowItWorks />

        {/* Om LøsningPRO */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Om LøsningPRO</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
              Vi er din lokale partner for alle el- og VVS-opgaver i Glostrup og omegn. Med mere end 10 års erfaring
              leverer vi kvalitetsarbejde til både private og mindre erhverv.
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

        {/* Arbejdsgalleri */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Arbejdsgalleri</h2>
            <p className="text-lg text-gray-600 mb-8">Se eksempler på vores arbejde</p>
            <div className="text-center">
              <p className="text-gray-500 mb-4">Coming soon</p>
              <p className="text-sm text-gray-400">Vi kan fylde dette med billeder senere</p>
            </div>
          </div>
        </section>

        {/* Trustpilot (gratis – tarjeta propia) */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <TrustpilotCard />
          </div>
        </section>

        {/* Contact (3 botones como lovable) */}
        <section ref={contactRef} className="py-14 bg-[#1f3f8a]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ContactCards onOpenAssistant={() => setAssistantOpen(true)} />
          </div>
        </section>

        <ContactForm />
      </main>

      <Footer />

      {/* UI global */}
      <CookieBanner />
      <AssistantWidget open={assistantOpen} onClose={() => setAssistantOpen(false)} />
    </div>
  );
}
