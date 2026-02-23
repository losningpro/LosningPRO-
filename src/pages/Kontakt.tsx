import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ContactForm from '../components/ContactForm';

export default function Kontakt() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary to-primary/80 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">Kontakt os</h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Vi er klar til at hjælpe dig med dine el- og VVS-opgaver
            </p>
          </div>
        </section>

        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}