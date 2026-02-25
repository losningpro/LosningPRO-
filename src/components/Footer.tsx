import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Phone, Mail, MapPin, Star } from 'lucide-react';

const TRUSTPILOT_REVIEW_PAGE = 'https://www.trustpilot.com/review/losningpro.dk';
const TRUSTPILOT_INVITE_LINK = 'https://losningpro.dk+7abe809517@invite.trustpilot.com';

const INSTAGRAM_URL = 'https://www.instagram.com/danieldanielsen.gi';
const FACEBOOK_URL = 'https://www.facebook.com/share/1C7Sf2mnP5/';
const LINKEDIN_URL = '#'; // si no lo tienes, déjalo así o bórralo

const JURIDISK_INFO_URL = 'https://info.losningpro.dk';

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company info */}
          <div>
            <h3 className="text-2xl font-bold mb-4">
              Løsning<span className="text-orange-400">PRO</span>
            </h3>
            <p className="text-blue-100 mb-4">
              Professionel elektriker og VVS service i Glostrup og omegn. Hurtig og pålidelig service.
            </p>
            <div className="space-y-2">
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-orange-400" />
                <span>+45 43 12 34 56</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-orange-400" />
                <span>info@losningpro.dk</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-orange-400" />
                <span>Glostrup, Danmark</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Tjenester</h4>
            <ul className="space-y-2 text-blue-100">
              <li><Link to="/tjenester/el-service" className="hover:text-white transition-colors">El-Service</Link></li>
              <li><Link to="/tjenester/vvs-service" className="hover:text-white transition-colors">VVS-Service</Link></li>
              <li><Link to="/tjenester/tommer" className="hover:text-white transition-colors">Tømrer</Link></li>
              <li><Link to="/tjenester/maling" className="hover:text-white transition-colors">Maling</Link></li>
              <li><Link to="/tjenester/rengoring" className="hover:text-white transition-colors">Rengøring</Link></li>
              <li><Link to="/tjenester/montering" className="hover:text-white transition-colors">Montering</Link></li>
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Hurtige Links</h4>
            <ul className="space-y-2 text-blue-100">
              <li><Link to="/om-os" className="hover:text-white transition-colors">Om os</Link></li>
              <li><Link to="/hvordan-fungerer" className="hover:text-white transition-colors">Hvordan fungerer det</Link></li>
              <li><Link to="/arbejdsgalleri" className="hover:text-white transition-colors">Arbejdsgalleri</Link></li>
              <li><Link to="/kontakt" className="hover:text-white transition-colors">Kontakt</Link></li>

              {/* Juridisk info (subdominio “invisible”) */}
              <li>
                <a
                  href={JURIDISK_INFO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Juridisk info
                </a>
              </li>

              {/* si luego quieres, puedes apuntar Handelsbetingelser a una ruta real dentro de info.losningpro.dk */}
              <li>
                <a
                  href={JURIDISK_INFO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Handelsbetingelser
                </a>
              </li>
            </ul>
          </div>

          {/* Social + Trustpilot */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Følg os</h4>

            <div className="flex space-x-4 mb-6">
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-100 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-6 w-6" />
              </a>

              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-100 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-6 w-6" />
              </a>

              {LINKEDIN_URL !== '#' && (
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-100 hover:text-white transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-6 w-6" />
                </a>
              )}
            </div>

            {/* Trustpilot (limpio, sin widget de pago) */}
            <div className="bg-blue-800 rounded-lg p-4">
              <a
                href={TRUSTPILOT_REVIEW_PAGE}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="flex items-center justify-between">
                  <div className="font-semibold">Trustpilot</div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-400" />
                    <Star className="h-4 w-4 text-yellow-400" />
                    <Star className="h-4 w-4 text-yellow-400" />
                    <Star className="h-4 w-4 text-yellow-400" />
                    <Star className="h-4 w-4 text-yellow-400" />
                  </div>
                </div>

                <div className="text-blue-100 text-sm mt-2">
                  Se vores anmeldelser på Trustpilot
                </div>
              </a>

              <a
                href={TRUSTPILOT_INVITE_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center justify-center w-full px-3 py-2 rounded-md bg-orange-500 hover:bg-orange-600 transition-colors font-semibold"
              >
                Skriv en anmeldelse
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-blue-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-blue-100 text-sm">
            © {new Date().getFullYear()} LøsningPRO. Alle rettigheder forbeholdes.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0 text-blue-100 text-sm">
            <span>CVR: 12345678</span>
            <span>Glostrup, Danmark</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
