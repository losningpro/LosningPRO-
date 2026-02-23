import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ShoppingCart, Clock, CheckCircle, Star } from 'lucide-react';

// Mock data for service products by category
const serviceData: Record<string, any> = {
  el: {
    title: 'El-Service',
    description: 'Professionel elektriker service til alle dine el-opgaver',
    icon: '⚡',
    services: [
      {
        id: 'el-1',
        name: 'El-installation',
        price: 850,
        duration: '2-4 timer',
        description: 'Komplet el-installation til nye stikkontakter, afbrydere og belysning',
        image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        features: ['Certificeret elektriker', 'Garanti på arbejdet', 'Hurtig service']
      },
      {
        id: 'el-2',
        name: 'Fejlfinding og reparation',
        price: 650,
        duration: '1-2 timer',
        description: 'Fejlfinding og reparation af el-problemer i hjemmet',
        image: 'https://placehold.co/400x400',
        features: ['Professionel fejlfinding', 'Hurtig reparation', '24/7 akutservice']
      }
    ]
  },
  vvs: {
    title: 'VVS-Service',
    description: 'Komplet VVS service til rør, varme og sanitet',
    icon: '🔧',
    services: [
      {
        id: 'vvs-1',
        name: 'Rør reparation',
        price: 750,
        duration: '1-3 timer',
        description: 'Reparation af utætte rør og vandskader',
        image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        features: ['Akut service', 'Professionelt udstyr', 'Garanti på arbejdet']
      }
    ]
  }
};

export default function ServiceCategory() {
  const { serviceSlug } = useParams<{ serviceSlug: string }>();
  
  const categoryData = serviceData[serviceSlug || ''];

  if (!categoryData) {
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
              <div className="text-6xl mb-4">{categoryData.icon}</div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">{categoryData.title}</h1>
              <p className="text-xl text-white/90 max-w-2xl mx-auto">
                {categoryData.description}
              </p>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {categoryData.services.map((service: any) => (
                <div key={service.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={service.image}
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
                            <Clock className="h-4 w-4" />
                            <span>{service.duration}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span>4.8 (24 anmeldelser)</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">Fra {service.price} kr</div>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-2">Inkluderet:</h4>
                      <ul className="space-y-1">
                        {service.features.map((feature: string, index: number) => (
                          <li key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
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
              Kontakt os for et uforpligtende tilbud eller hvis du har spørgsmål til vores {categoryData.title.toLowerCase()}
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