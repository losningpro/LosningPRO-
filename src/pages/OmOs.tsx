import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function OmOs() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary to-primary/80 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">Om LøsningPRO</h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Din pålidelige partner for el- og VVS-opgaver i Glostrup og omegn
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Vores historie</h2>
            <div className="text-center">
              <p className="text-gray-500 mb-4">Coming soon</p>
              <p className="text-sm text-gray-400">Use Meku to generate content for this page</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}