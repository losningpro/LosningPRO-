import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function JuridiskInfo() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <h1 className="text-3xl font-bold text-gray-900">Virksomhedspolitik & Juridisk information</h1>

        <div className="mt-8 space-y-6 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-gray-900">1. Opstartsgebyr</h2>
            <p>
              Ved booking betales et opstartsgebyr (typisk 399 kr.) til dækning af transport og planlægning/koordinering.
              Opstartsgebyret kan ikke refunderes, da det dækker administrative omkostninger og reserveret tid.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">2. Afbestilling</h2>
            <p>
              Ved afbestilling senest 24 timer før aftalt start kan resterende timer/ydelser refunderes efter nærmere
              aftale. Ved senere afbestilling kan refusion være begrænset.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">3. Materialer</h2>
            <p>
              Kunden sørger for materialer og genstande, der skal installeres. Alternativt kan vi medbringe materialer
              efter kundens ønsker og afregne dette separat eller som del af en aftalt pris.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">4. Online butik (levering)</h2>
            <p>
              Transportpris kan være inkluderet i prisen. Vi har ikke eget lager; ordre behandles normalt indenfor 24 timer,
              og leverandøren sender direkte. Leveringstider er estimater og kan variere.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">5. Kontakt</h2>
            <p>
              Kontakt os på <a className="underline" href="mailto:info@losningpro.dk">info@losningpro.dk</a> eller{' '}
              <a className="underline" href="tel:+4552717810">+45 52 71 78 10</a>.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
