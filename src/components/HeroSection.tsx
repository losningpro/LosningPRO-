import React, { useEffect, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 30);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative w-full min-h-[640px] h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="/portada.png"
          alt="LøsningPRO"
          className="w-full h-full object-cover"
        />
        {/* Overlay similar a lovable: oscuro + gradiente suave */}
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <h1
          className={[
            'font-extrabold leading-tight text-white',
            'text-4xl sm:text-5xl lg:text-6xl',
            mounted ? 'animate-slideUp1' : 'opacity-0',
          ].join(' ')}
        >
          Professionelle løsninger
        </h1>

        <h2
          className={[
            'font-extrabold leading-tight text-blue-300',
            'text-4xl sm:text-5xl lg:text-6xl mt-2',
            mounted ? 'animate-slideUp2' : 'opacity-0',
          ].join(' ')}
        >
          Du kan stole på
        </h2>

        <p
          className={[
            'mt-6 text-lg sm:text-xl text-white/90 max-w-3xl mx-auto',
            mounted ? 'animate-slideUp3' : 'opacity-0',
          ].join(' ')}
        >
          Fra el-arbejde til møbelsamling håndterer vi alle dine boligforbedringsbehov
          med ekspertise og omhu. Hurtigt og pålideligt.
        </p>

              {/* CTA buttons */}
        <div
          className={[
            'mt-8 flex flex-col sm:flex-row justify-center gap-4',
            mounted ? 'animate-slideUp5' : 'opacity-0',
          ].join(' ')}
        >
          <Link
            to="/tjenester"
            className="px-9 py-4 rounded-xl font-semibold text-lg bg-orange-500 text-white hover:bg-blue-600 transition-colors shadow-lg"
          >
            Se alle tjenester
          </Link>

          <Link
            to="/kontakt"
            className="px-9 py-4 rounded-xl font-semibold text-lg bg-white/20 text-white border border-white/30 hover:bg-blue-600 hover:border-blue-600 transition-colors"
          >
            Få et tilbud
          </Link>
        </div>
      </div>
    </section>
  );
}
