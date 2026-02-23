import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ServiceGrid from '../components/ServiceGrid';

export default function Tjenester() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary to-primary/80 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">Vores Tjenester</h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Vi tilbyder professionelle tjenester inden for el, VVS, tømrer, maling og meget mere. 
              Vælg den tjeneste du har brug for nedenfor.
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <ServiceGrid />

        {/* Why Choose Us */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Hvorfor vælge LøsningPRO?</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Vi er din pålidelige partner for alle typer håndværksopgaver
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">24/7</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Akutservice</h3>
                <p className="text-gray-600">
                  Vi er klar til at hjælpe dig døgnet rundt ved akutte problemer
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">✓</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Certificerede teknikere</h3>
                <p className="text-gray-600">
                  Alle vores medarbejdere er uddannede og certificerede fagfolk
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">★</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Garanti på arbejdet</h3>
                <p className="text-gray-600">
                  Vi står bag vores arbejde med garanti og efterservice
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Klar til at komme i gang?</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Kontakt os i dag og få et uforpligtende tilbud på din opgave
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:+4543123456" 
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary font-semibold rounded-lg hover:bg-gray-50 transition-colors"
              >
                Ring nu: +45 43 12 34 56
              </a>
              <a 
                href="mailto:info@losningpro.dk" 
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary transition-colors"
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