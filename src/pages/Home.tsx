import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import ProductSlider from '../components/ProductSlider';
import ServiceGrid from '../components/ServiceGrid';
import HowItWorks from '../components/HowItWorks';
import ContactForm from '../components/ContactForm';

function SeoSchema() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "LøsningPRO",
    "url": "https://losningpro.dk",
    "telephone": "+45 52 71 78 10",
    "address": {
      "@type": "Baneleddet 39, 2600",
      "addressLocality": "Glostrup",
      "addressCountry": "DK"
    },
    "areaServed": [
      "Glostrup",
      "København",
      "Albertslund",
      "Brøndby",
      "Ballerup",
      "Brøndbyvester",
      "Storkøbenhavn"
    ],
    "sameAs": [
      "https://www.trustpilot.com/review/losningpro.dk",
      "https://www.instagram.com/danieldanielsen.gi",
      "https://www.facebook.com/share/1C7Sf2mnP5/"
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
  }
];

const serviceProducts = [
  {
    id: '7',
    name: 'Flytning af stikkontakt',
    price: 1000,
    image: '/enhufeflyt.png',
    category: 'El-Service'
  },
  {
    id: '8',
    name: 'VVS Reparation',
    price: 1000,
    image: '/leak.jpg',
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
    name: 'Toiletter ude af drift',
    price: 650,
    image: '/00036.png',
    category: 'VVS-Service'
  },
  {
    id: '11',
    name: 'Opvaskemaskin intallation',
    price: 1000,
    image: '/lavaplatos.png',
    category: 'VVS-service'
  },
  {
    id: '12',
    name: 'Vask ude af drift',
    price: 650,
    image: '/00046.png',
    category: 'VVS-Service'
  }
];

const JURIDISK_INFO_URL = 'https://info.losningpro.dk';

function CollapsibleBanner({
  isOpen,
  innerRef,
  children,
}: {
  isOpen: boolean;
  innerRef?: React.RefObject<HTMLDivElement>;
  children: React.ReactNode;
}) {
  return (
    <section
      aria-hidden={!isOpen}
      className={[
        "bg-yellow-50 border-y border-yellow-200 overflow-hidden transition-all duration-300",
        isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
      ].join(' ')}
    >
      <div ref={innerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        {children}
      </div>
    </section>
  );
}

export default function Home() {
  const [showMaterialBanner, setShowMaterialBanner] = useState(false);
  const [showServiceBanner, setShowServiceBanner] = useState(false);

  const materialBannerRef = useRef<HTMLDivElement>(null);
  const serviceBannerRef = useRef<HTMLDivElement>(null);

  // Scroll suave al abrir
  useEffect(() => {
    if (showMaterialBanner) {
      setTimeout(() => {
        materialBannerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    }
  }, [showMaterialBanner]);

  useEffect(() => {
    if (showServiceBanner) {
      setTimeout(() => {
        serviceBannerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    }
  }, [showServiceBanner]);

  const handleMaterialsClick = () => {
    setShowMaterialBanner((v) => !v);
    // opcional: si abres materiales, cerrar servicios
    // setShowServiceBanner(false);
  };

  const handleServicesClick = () => {
    setShowServiceBanner((v) => !v);
    // opcional: si abres servicios, cerrar materiales
    // setShowMaterialBanner(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* SEO schema */}
      <SeoSchema />

      <Header />
      <main>
        <HeroSection />

        {/* Carrusel Materiales (clicable) */}
        <div
          role="button"
          tabIndex={0}
          onClick={handleMaterialsClick}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') handleMaterialsClick();
          }}
          className="cursor-pointer"
          aria-label="Åbn information om fragt og levering for materialer"
        >
          <ProductSlider
            title="Populære Materialer"
            products={materialProducts}
            viewAllLink="/kob"
          />
        </div>

        {/* Banner materiales: oculto por defecto, aparece al clicar el carrusel */}
        <CollapsibleBanner isOpen={showMaterialBanner} innerRef={materialBannerRef}>
          <p className="text-sm sm:text-base text-yellow-900 leading-relaxed">
            <span className="font-semibold">⚠️</span>{' '}
            Transport pris af varer er includeret i prissen på dette shop i hele Danmark.
            Dette er en automatiseret butik – vi har ikke eget lager. Vi behandler din ordre
            inden for maks. 24 timer, og vores leverandør sender varen direkte til dig inden
            for højst to uger. De angivne leveringstider er estimater fra distributøren og kan variere.
          </p>
        </CollapsibleBanner>

        {/* Carrusel Servicios (clicable) */}
        <div
          role="button"
          tabIndex={0}
          onClick={handleServicesClick}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') handleServicesClick();
          }}
          className="cursor-pointer"
          aria-label="Åbn information om opstartsgebyr og vilkår for tjenester"
        >
          <ProductSlider
            title="Populære Tjenester"
            products={serviceProducts}
            viewAllLink="/tjenester"
          />
        </div>

        {/* Banner servicios: oculto por defecto, aparece al clicar el carrusel */}
        <CollapsibleBanner isOpen={showServiceBanner} innerRef={serviceBannerRef}>
          <p className="text-sm sm:text-base text-yellow-900 leading-relaxed">
            <span className="font-semibold">⚠️</span>
            Der er et opstartsgebyr på 399 kr. til dækning af transport og den tid, vi bruger på at organisere din booking.
            Når du booker, betaler du kun dette opstartsgebyr (kan ikke refunderes). Resten af regningen betales under besøget,
            hvilket afspejler virkeligheden. Hvis du afbestiller en dag før servicen starter, får du refunderet for den resterende time.
            Se resten af opstartgebyr vilkår{' '}
            <a
              href={JURIDISK_INFO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-semibold hover:opacity-80"
              onClick={(e) => e.stopPropagation()} // para que el click no colapse el banner
            >
              her
            </a>
            .
          </p>

          <p className="mt-3 text-sm sm:text-base text-yellow-900 leading-relaxed">
            Kunden sørger for de materialer og genstande, der skal installeres. Ellers medbringer vi de materialer og genstande,
            der skal installeres, i henhold til kundens ønsker.
          </p>
        </CollapsibleBanner>

        <HowItWorks />

        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Om LøsningPRO</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
              Vi er din lokale partner for alle el- og VVS-opgaver i Glostrup og omegn.
              Med over 10 års erfaring leverer vi kvalitetsarbejde til både private og erhvervskunder.
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
              <p className="text-sm text-gray-400">Use Meku to generate content for this page</p>
            </div>
          </div>
        </section>

        <ContactForm />
      </main>

      <Footer />
    </div>
  );
}
