import React, { useEffect, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative w-full h-[80vh] min-h-[640px] flex items-center justify-center overflow-hidden">
      {/* Fondo portada.png */}
      <div className="absolute inset-0">
        <img
          src="/portada.png"
          alt="LøsningPRO"
          className="w-full h-full object-cover"
        />
        {/* Overlay para legibilidad */}
        <div className="absolute inset-0 bg-white/70 backdrop-blur-sm"></div>
      </div>

      {/* Contenido centrado */}
      <div className="relative z-10 text-center max-w-4xl px-6">

        <h1
          className={`font-extrabold leading-tight text-gray-900
          text-4xl sm:text-5xl lg:text-6xl
          ${mounted ? 'animate-slideUp1' : 'opacity-0'}`}
        >
          Professionelle løsninger
        </h1>

        <h2
          className={`font-extrabold leading-tight text-blue-700
          text-4xl sm:text-5xl lg:text-6xl mt-2
          ${mounted ? 'animate-slideUp2' : 'opacity-0'}`}
        >
          Du kan stole på
        </h2>

        <p
          className={`mt-6 text-lg sm:text-xl text-gray-700
          ${mounted ? 'animate-slideUp3' : 'opacity-0'}`}
        >
          Fra el-arbejde til møbelsamling håndterer vi alle dine
          boligforbedringsbehov med ekspertise og omhu.
          Hurtigt og pålideligt.
        </p>

        {/* Bullets */}
        <div
          className={`mt-6 flex flex-col sm:flex-row justify-center gap-6 text-gray-800
          ${mounted ? 'animate-slideUp4' : 'opacity-0'}`}
        >
          <div className="flex items-center gap-2 justify-center">
            <CheckCircle2 className="text-yellow-500" size={22} />
            <span className="font-medium">Professionelle til hver opgave</span>
          </div>
          <div className="flex items-center gap-2 justify-center">
            <CheckCircle2 className="text-yellow-500" size={22} />
            <span className="font-medium">Mere end 10 års erfaring</span>
          </div>
        </div>

        {/* Botones */}
        <div
          className={`mt-8 flex flex-col sm:flex-row justify-center gap-4
          ${mounted ? 'animate-slideUp5' : 'opacity-0'}`}
        >
          <a
            href="/kontakt"
            className="px-8 py-4 rounded-xl font-semibold
            bg-orange-500 text-white text-lg
            hover:bg-blue-700 transition-all duration-300"
          >
            BOOK EN TJENESTE →
          </a>

          <a
            href="/tjenester"
            className="px-8 py-4 rounded-xl font-semibold
            bg-gray-200 text-gray-900 text-lg
            hover:bg-blue-700 hover:text-white transition-all duration-300"
          >
            SE ALLE TJENESTER
          </a>
        </div>
      </div>
    </section>
  );
}
