import React, { useEffect, useState } from 'react';

export default function HeroSection({ onPrimaryClick }: { onPrimaryClick?: () => void }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative overflow-hidden bg-white">
      {/* Fondo (puedes cambiar la imagen si quieres) */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=2200&q=80')] bg-cover bg-center opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/60 to-white" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-16">
        <div className={`max-w-3xl ${mounted ? 'animate-slideUp' : 'opacity-0'}`}>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
            Professionelle løsninger
            <br />
            Du kan stole på
          </h1>

          <p className="mt-5 text-lg sm:text-xl text-gray-700">
            Fra el-arbejde til møbelsamling håndterer vi alle dine boligforbedringsbehov med ekspertise og omhu. Hurtigt
            og pålideligt.
          </p>

          <div className="mt-6 space-y-2 text-gray-800">
            <div className="flex items-center gap-2">
              <span className="text-yellow-500">✅</span>
              <span>Professionelle til hver opgave</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-yellow-500">✅</span>
              <span>Mere end 10 års erfaring</span>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <button
              onClick={onPrimaryClick}
              className="rounded-xl px-6 py-3 font-semibold bg-orange-500 text-white hover:bg-blue-700 transition"
            >
              BOOK EN TJENESTE →
            </button>

            <a
              href="/tjenester"
              className="rounded-xl px-6 py-3 font-semibold bg-gray-200 text-gray-900 hover:bg-blue-700 hover:text-white transition text-center"
            >
              SE ALLE TJENESTER
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
