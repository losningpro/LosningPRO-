import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingCart, Menu, X, Phone } from 'lucide-react';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        {/* Banner construcción */}
    <div className="bg-yellow-50 border-b border-yellow-200 text-yellow-900 text-sm">
      <div className="max-w-7xl mx-auto px-4 py-2">
        Web under construction — may contain errors. Contact 
        <a className="underline ml-1" href="mailto:info@losningpro.dk">
          info@losningpro.dk
        </a>
      </div>
    </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-auto py-3 gap-4">

          {/* Left: Logo + Ring nu */}
          <div className="flex items-center space-x-3 flex-shrink-0">
            {/* Logo icon */}
            <Link to="/" className="flex items-center space-x-2">
              <img
                src="/logo.png"
                alt="LøsningPRO mascot logo"
                className="h-16 w-16 object-contain"
              />
              <span className="text-2xl font-bold leading-none">
                <span className="text-black">Løsning</span><span className="text-orange-500">PRO</span>
              </span>
            </Link>
            <a
              href="tel:+4543123456"
              className="hidden sm:flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Phone className="h-4 w-4" />
              <span className="text-sm font-medium">Ring nu</span>
            </a>
          </div>

          {/* Center: Search bar + Nav below */}
          <div className="hidden lg:flex flex-1 flex-col max-w-2xl mx-4">
            {/* Search bar */}
            <div className="relative mb-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Søg efter produkter og tjenester..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
            {/* Nav links */}
            <nav className="flex items-center justify-center space-x-6">
              <Link
                to="/kob"
                className={`text-sm font-medium transition-colors hover:text-blue-600 ${isActive('/kob') ? 'text-blue-600' : 'text-blue-700'}`}
              >
                Køb
              </Link>
              <Link
                to="/tjenester"
                className={`text-sm font-medium transition-colors hover:text-blue-600 ${isActive('/tjenester') || location.pathname.startsWith('/tjenester/') ? 'text-blue-600' : 'text-blue-700'}`}
              >
                Tjenester
              </Link>
              <Link
                to="/hvordan-fungerer"
                className={`text-sm font-medium transition-colors hover:text-blue-600 ${isActive('/hvordan-fungerer') ? 'text-blue-600' : 'text-blue-700'}`}
              >
                Hvordan fungerer
              </Link>
              <Link
                to="/om-os"
                className={`text-sm font-medium transition-colors hover:text-blue-600 ${isActive('/om-os') ? 'text-blue-600' : 'text-blue-700'}`}
              >
                Om os
              </Link>
              <Link
                to="/arbejdsgalleri"
                className={`text-sm font-medium transition-colors hover:text-blue-600 ${isActive('/arbejdsgalleri') ? 'text-blue-600' : 'text-blue-700'}`}
              >
                Arbejdsgalleri
              </Link>
              <Link
                to="/kontakt"
                className={`text-sm font-medium transition-colors hover:text-blue-600 ${isActive('/kontakt') ? 'text-blue-600' : 'text-blue-700'}`}
              >
                Kontakt
              </Link>
            </nav>
          </div>

          {/* Right: Cart + Log på */}
          <div className="flex items-center space-x-3 flex-shrink-0">
            <Link to="/cart" className="relative p-2 text-blue-600 hover:text-blue-800 transition-colors">
              <ShoppingCart className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </Link>
            <Link
              to="/log-pa"
              className="hidden sm:block text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
            >
              Log på
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 text-blue-600 hover:text-blue-800 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4">
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Søg efter produkter og tjenester..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <nav className="space-y-2">
              {[
                { to: '/kob', label: 'Køb' },
                { to: '/tjenester', label: 'Tjenester' },
                { to: '/hvordan-fungerer', label: 'Hvordan fungerer' },
                { to: '/om-os', label: 'Om os' },
                { to: '/arbejdsgalleri', label: 'Arbejdsgalleri' },
                { to: '/kontakt', label: 'Kontakt' },
                { to: '/log-pa', label: 'Log på' },
              ].map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className={`block px-3 py-2 text-base font-medium rounded-md transition-colors ${
                    isActive(to) ? 'text-blue-600 bg-blue-50' : 'text-blue-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {label}
                </Link>
              ))}
            </nav>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <a
                href="tel:+4543123456"
                className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Phone className="h-4 w-4" />
                <span className="font-medium">Ring nu: +45 43 12 34 56</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
