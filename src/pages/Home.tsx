import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import ProductSlider from '../components/ProductSlider';
import ServiceGrid from '../components/ServiceGrid';
import HowItWorks from '../components/HowItWorks';
import ContactForm from '../components/ContactForm';

// Mock data for products
const materialProducts = [
  {
    id: '1',
    name: 'LED Pære E27 9W',
    price: 89,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    category: 'Material'
  },
  {
    id: '2',
    name: 'Stikkontakt Hvid',
    price: 45,
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    category: 'Material'
  },
  {
    id: '3',
    name: 'Afbryder 1-pol',
    price: 35,
    image: 'https://placehold.co/400x400',
    category: 'Material'
  },
  {
    id: '4',
    name: 'Kabel 2.5mm²',
    price: 12,
    image: 'https://placehold.co/400x400',
    category: 'Material'
  }
];

const serviceProducts = [
  {
    id: '5',
    name: 'El-installation',
    price: 850,
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    category: 'El-Service'
  },
  {
    id: '6',
    name: 'VVS Reparation',
    price: 650,
    image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    category: 'VVS-Service'
  },
  {
    id: '7',
    name: 'Tømrerarbejde',
    price: 750,
    image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    category: 'Tømrer'
  },
  {
    id: '8',
    name: 'Malerarbejde',
    price: 450,
    image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    category: 'Maling'
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <ProductSlider 
          title="Populære Materialer" 
          products={materialProducts} 
          viewAllLink="/kob" 
        />
        <ServiceGrid />
        <ProductSlider 
          title="Populære Tjenester" 
          products={serviceProducts} 
          viewAllLink="/tjenester" 
        />
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