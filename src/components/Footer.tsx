import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer
      className="text-white"
      style={{
        background: 'linear-gradient(135deg, #264a8a 0%, #3f68b3 100%)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <h3 className="text-2xl font-bold mb-4">LøsningPRO</h3>
            <p className="text-white/85 leading-relaxed mb-6">
              Professionelle håndværkertjenester til alle dine
              boligforbedringsbehov.
            </p>

            <div className="space-y-3 text-white/90">
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0" />
                <a
                  href="tel:+45452717810"
                  className="hover:text-white transition-colors"
                >
                  +45 52 71 78 10
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0" />
                <a
                  href="mailto:info@losningpro.dk"
                  className="hover:text-white transition-colors"
                >
                  info@losningpro.dk
                </a>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 shrink-0" />
                <span>Vi dækker hele Danmark</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Hurtige links</h4>
            <ul className="space-y-3 text-white/85">
              <li>
                <Link to="/om-os" className="hover:text-white transition-colors">
                  Om os
                </Link>
              </li>
              <li>
                <Link
                  to="/erhverv"
                  className="hover:text-white transition-colors"
                >
                  Erhverv
                </Link>
              </li>
              <li>
                <Link
                  to="/kontakt"
                  className="hover:text-white transition-colors"
                >
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Mere</h4>
            <ul className="space-y-3 text-white/85">
              <li>
                <Link
                  to="/tjenester"
                  className="hover:text-white transition-colors"
                >
                  Tjenester & priser
                </Link>
              </li>
              <li>
                <Link to="/kob" className="hover:text-white transition-colors">
                  KØB
                </Link>
              </li>
              <li>
                <Link
                  to="/juridisk-information"
                  className="hover:text-white transition-colors"
                >
                  Juridisk information
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Åbningstider</h4>
            <div className="space-y-3 text-white/85">
              <div className="flex justify-between gap-4">
                <span>Man - Fre</span>
                <span>8:00 - 18:00</span>
              </div>
              <div className="flex justify-between gap-4">
                <span>Lørdag</span>
                <span>9:00 - 15:00</span>
              </div>
              <div className="flex justify-between gap-4">
                <span>Søndag</span>
                <span>Lukket</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-10 pt-8 text-center text-white/75">
          <p>
            © 2026 LøsningPRO. Alle rettigheder forbeholdes.{" "}
            <Link
              to="/juridisk-information"
              className="underline hover:text-white transition-colors"
            >
              Se juridisk information
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
