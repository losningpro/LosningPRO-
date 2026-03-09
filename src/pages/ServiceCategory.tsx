import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ShoppingCart, Star } from 'lucide-react';
import { useMarketStore } from '../lib/store';

// Basic static category info to enrich the display
const categoryMetadata: Record<string, any> = {
  el: { title: 'El-Service', description: 'Professionel elektriker service til alle dine el-opgaver', icon: '⚡' },
  vvs: { title: 'VVS-Service', description: 'Komplet VVS service til rør, varme og sanitet', icon: '🔧' },
  tomrer: { title: 'Tømrer', description: 'Tømrerarbejde og træarbejde', icon: '🔨' }
};

export default function ServiceCategory() {
  const { serviceSlug } = useParams<{ serviceSlug: string }>();
  
  const products = useMarketStore(state => state.products);
  // Find products that are tjenester and match the subcategory slug
  const categoryServices = products.filter(
    p => (p.category === 'El-Service' || p.category === 'VVS-Service' || p.category === 'Tømrer' || p.category === 'Tjeneste') && 
         p.subcategory?.toLowerCase() === serviceSlug?.toLowerCase()
  );

  const meta = categoryMetadata[serviceSlug || ''] || { 
    title: (serviceSlug || 'Tjeneste').toUpperCase(), 
    description: `Viser alle tjenester under ${serviceSlug}`, 
    icon: '📦' 
  };

  if (categoryServices.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Tjeneste ikke fundet</h1>
          <p className="text-gray-600 mb-8">Den ønskede tjeneste kunne ikke findes.</p>
          <div className="text-center">
            <p className="text-gray-500 mb-4">Coming soon</p>
            <p className="text-sm text-gray-400">Use Meku to generate content for this page</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary to-primary/80 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="text-6xl mb-4">{meta.icon}</div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">{meta.title}</h1>
              <p className="text-xl text-white/90 max-w-2xl mx-auto">
                {meta.description}
              </p>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {categoryServices.map((service: any) => (
                <div key={service.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={service.image || "https://placehold.co/400x400"}
                      alt={service.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.name}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span>Populær</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">Fra {service.price} kr</div>
                      </div>
                    </div>
                    
                    <button className="w-full flex items-center justify-center space-x-2 bg-primary text-white py-3 px-6 rounded-lg hover:bg-primary/90 transition-colors">
                      <ShoppingCart className="h-5 w-5" />
                      <span>Book nu</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Har du brug for hjælp?</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Kontakt os for et uforpligtende tilbud eller hvis du har spørgsmål til vores {meta.title.toLowerCase()}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:+4543123456" 
                className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors"
              >
                Ring nu: +45 43 12 34 56
              </a>
              <a 
                href="mailto:info@losningpro.dk" 
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-white transition-colors"
              >
                Send email
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}