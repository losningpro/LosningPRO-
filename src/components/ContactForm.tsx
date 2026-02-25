import React, { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const subject = encodeURIComponent('Ny besked fra losningpro.dk');
    const body = encodeURIComponent(
      `Navn: ${formData.name}\nTelefon: ${formData.phone}\nTjeneste: ${formData.service}\n\nBesked:\n${formData.message}\n`
    );

    // Abre el cliente de correo del usuario
    window.location.href = `mailto:info@losningpro.dk?subject=${subject}&body=${body}`;
  };

  return (
    <section className="py-16 bg-white" id="kontakt">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Kontakt os</h2>

        <form onSubmit={handleSubmit} className="space-y-4 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div>
            <label className="block text-sm font-medium text-gray-700">Navn *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-600 focus:ring-blue-600"
              placeholder="Dit fulde navn"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Telefon *</label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-600 focus:ring-blue-600"
              placeholder="+45 …"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Vælg tjeneste</label>
            <select
              value={formData.service}
              onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-600 focus:ring-blue-600"
            >
              <option value="">Vælg opgavetype…</option>
              <option value="El-service">El-service</option>
              <option value="VVS-service">VVS-service</option>
              <option value="Tømrer">Tømrer</option>
              <option value="Maling">Maling</option>
              <option value="Andet">Andet</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Besked *</label>
            <textarea
              required
              rows={5}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-600 focus:ring-blue-600"
              placeholder="Beskriv din opgave…"
            />
          </div>

          <button className="w-full rounded-xl bg-[#1f3f8a] text-white py-3 font-semibold hover:bg-blue-700 transition">
            Send besked
          </button>
        </form>
      </div>
    </section>
  );
}
