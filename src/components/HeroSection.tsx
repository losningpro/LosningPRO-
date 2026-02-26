import React, { useEffect, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 40);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative w-full min-h-[640px] h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Fondo portada.png */}
      <div className="absolute inset-0">
        <img src="/portada.png" alt="LøsningPRO" className="w-full h-full object-cover" />
        {/* Overlay suave para legibilidad (similar a lovable) */}
        <div className="absolute inset-0 bg-white/70" />
      </div>

      {/* Contenido centrado */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <h1
          className={[
            'font-extrabold leading-tight text-gray-900',
            'text-4xl sm:text-5xl lg:text-6xl',
            mounted ? 'animate-slideUp1' : 'opacity-0',
          ].join(' ')}
        >
          Professionelle løsninger
        </h1>

        <h2
          className={[
            'font-extrabold leading-tight text-blue-700',
            'text-4xl sm:text-5xl lg:text-6xl mt-2',
            mounted ? 'animate-slideUp2' : 'opacity-0',
          ].join(' ')}
        >
          Du kan stole på
        </h2>

        <p
          className={[
            'mt-6 text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto',
            mounted ? 'animate-slideUp3' : 'opacity-0',
          ].join(' ')}
        >
          Fra el-arbejde til møbelsamling håndterer vi alle dine boligforbedringsbehov med ekspertise og omhu.
          Hurtigt og pålideligt.
        </p>

        {/* 2 líneas con icono amarillo (como lovable) */}
        <div
          className={[
            'mt-6 flex flex-col sm:flex-row justify-center gap-6 text-gray-800',
            mounted ? 'animate-slideUp4' : 'opacity-0',
          ].join(' ')}
        >
          <div className="flex items-center justify-center gap-2">
            <CheckCircle2 className="text-yellow-500" size={22} />
            <span className="font-medium">Professionelle til hver opgave</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <CheckCircle2 className="text-yellow-500" size={22} />
            <span className="font-medium">Mere end 10 års erfaring</span>
          </div>
        </div>

        {/* Botones centrados, grandes, hover a azul */}
        <div
          className={[
            'mt-8 flex flex-col sm:flex-row justify-center gap-4',
            mounted ? 'animate-slideUp5' : 'opacity-0',
          ].join(' ')}
        >
          <Link
            to="/kontakt"
            className="px-8 py-4 rounded-xl font-semibold text-lg bg-orange-500 text-white hover:bg-blue-700 transition-colors"
          >
            BOOK EN TJENESTE →
          </Link>

          <Link
            to="/tjenester"
            className="px-8 py-4 rounded-xl font-semibold text-lg bg-gray-200 text-gray-900 hover:bg-blue-700 hover:text-white transition-colors"
          >
            SE ALLE TJENESTER
          </Link>
        </div>
      </div>
    </section>
  );
}
