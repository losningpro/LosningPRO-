import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-[#0b1630] text-white/85">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="font-bold text-xl text-white">LøsningPRO</div>
            <p className="mt-3 text-white/70">
              Professionelle håndværkertjenester til alle dine boligforbedringsbehov.
            </p>
            <div className="mt-4 space-y-2 text-white/80">
              <div>📞 +45 52 71 78 10</div>
              <div>✉️ info@losningpro.dk</div>
              <div>📍 Vi dækker hele Danmark</div>
            </div>
          </div>

          <div>
            <div className="font-bold text-white">Hurtige links</div>
            <div className="mt-3 grid grid-cols-2 gap-2 text-white/80">
              <a className="hover:underline" href="/om-os">Om os</a>
              <a className="hover:underline" href="/tjenester">Tjenester & priser</a>
              <a className="hover:underline" href="/erhverv">Erhverv</a>
              <a className="hover:underline" href="/kob">KØB</a>
              <a className="hover:underline" href="/kontakt">Kontakt</a>
              <a className="hover:underline" href="/juridisk">Juridisk information</a>
            </div>

            <div className="mt-5 flex gap-3 text-white/85">
              <a href="https://www.facebook.com/share/1C7Sf2mnP5/" target="_blank" rel="noopener noreferrer">f</a>
              <a href="https://www.instagram.com/danieldanielsen.gi" target="_blank" rel="noopener noreferrer">⌁</a>
              <a href="https://www.trustpilot.com/review/losningpro.dk" target="_blank" rel="noopener noreferrer">★</a>
            </div>
          </div>

          <div>
            <div className="font-bold text-white">Åbningstider</div>
            <div className="mt-3 text-white/80 space-y-1">
              <div className="flex justify-between"><span>Man - Fre</span><span>8:00 - 18:00</span></div>
              <div className="flex justify-between"><span>Lørdag</span><span>9:00 - 15:00</span></div>
              <div className="flex justify-between"><span>Søndag</span><span>Lukket</span></div>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-white/60">
          © {new Date().getFullYear()} LøsningPRO. Alle rettigheder forbeholdes.{' '}
          <a className="underline hover:opacity-90" href="/juridisk">
            Se juridisk information
          </a>
          .
        </div>
      </div>
    </footer>
  );
}
