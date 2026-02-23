import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              <span className="text-white">Løsning</span><span className="text-orange-400">PRO</span>
            </h3>
            <p className="text-blue-200 mb-4">
              Professionel elektriker og VVS service i Glostrup og omegn. Hurtig og pålidelig service.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-orange-400" />
                <a href="tel:+4543123456" className="text-blue-200 hover:text-white transition-colors">
                  +45 43 12 34 56
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-orange-400" />
                <a href="mailto:info@losningpro.dk" className="text-blue-200 hover:text-white transition-colors">
                  info@losningpro.dk
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-orange-400" />
                <span className="text-blue-200">Glostrup, Danmark</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Tjenester</h3>
            <ul className="space-y-2">
              {[
                { to: '/tjenester/el', label: 'El-Service' },
                { to: '/tjenester/vvs', label: 'VVS-Service' },
                { to: '/tjenester/tomrer', label: 'Tømrer' },
                { to: '/tjenester/maling', label: 'Maling' },
                { to: '/tjenester/rengoring', label: 'Rengøring' },
                { to: '/tjenester/montering', label: 'Montering' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="text-blue-200 hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Hurtige Links</h3>
            <ul className="space-y-2">
              <li><Link to="/om-os" className="text-blue-200 hover:text-white transition-colors">Om os</Link></li>
              <li><Link to="/hvordan-fungerer" className="text-blue-200 hover:text-white transition-colors">Hvordan fungerer det</Link></li>
              <li><Link to="/arbejdsgalleri" className="text-blue-200 hover:text-white transition-colors">Arbejdsgalleri</Link></li>
              <li><Link to="/kontakt" className="text-blue-200 hover:text-white transition-colors">Kontakt</Link></li>
              <li><a href="https://info.losningpro.dk/privatlivspolitik" className="text-blue-200 hover:text-white transition-colors">Privatlivspolitik</a></li>
              <li><a href="https://info.losningpro.dk/handelsbetingelser" className="text-blue-200 hover:text-white transition-colors">Handelsbetingelser</a></li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Følg os</h3>
            <div className="flex space-x-4 mb-6">
              <a href="#" className="text-blue-200 hover:text-white transition-colors" aria-label="Facebook">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-blue-200 hover:text-white transition-colors" aria-label="Instagram">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-blue-200 hover:text-white transition-colors" aria-label="LinkedIn">
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
            <div className="bg-blue-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-2 text-white">Trustpilot</h4>
              <div className="flex items-center space-x-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="h-4 w-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-sm text-blue-200">Baseret på 150+ anmeldelser</p>
            </div>
          </div>
        </div>

        <div className="border-t border-blue-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-blue-200 text-sm">
            © 2026 LøsningPRO. Alle rettigheder forbeholdes.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <span className="text-blue-200 text-sm">CVR: 12345678</span>
            <span className="text-blue-200 text-sm">Glostrup, Danmark</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;