import React from 'react';
import { ArrowRight, CheckCircle, Shield, Award, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="bg-white py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left: Text content */}
          <div className="flex flex-col">
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-4 text-gray-900">
              Professionelle løsninger
              <span className="block text-blue-600 mt-1">
                Du kan stole på
              </span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-xl">
              Fra el-arbejde til møbelsamling håndterer vi alle dine boligforbedringsbehov med ekspertise og omhu. Hurtigt og pålideligt.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link
                to="/tjenester"
                className="inline-flex items-center justify-center px-8 py-4 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors shadow-md"
              >
                Se alle tjenester
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/kontakt"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-600 hover:text-white transition-colors"
              >
                Få et tilbud
              </Link>
            </div>

            {/* Trust badges - 4 items centered */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-3">
              <div className="flex flex-col items-center text-center space-y-1">
                <CheckCircle className="h-6 w-6 text-blue-600" />
                <span className="text-xs font-medium text-gray-700 leading-tight">Professionelle til hver opgave</span>
              </div>
              <div className="flex flex-col items-center text-center space-y-1">
                <Clock className="h-6 w-6 text-blue-600" />
                <span className="text-xs font-medium text-gray-700 leading-tight">Mere end 10 års erfaring</span>
              </div>
              <div className="flex flex-col items-center text-center space-y-1">
                <Shield className="h-6 w-6 text-blue-600" />
                <span className="text-xs font-medium text-gray-700 leading-tight">Fuldt forsikret</span>
              </div>
              <div className="flex flex-col items-center text-center space-y-1">
                <Award className="h-6 w-6 text-blue-600" />
                <span className="text-xs font-medium text-gray-700 leading-tight">2 års garanti på arbejde</span>
              </div>
            </div>
          </div>

          {/* Right: Hero image collage */}
          <div className="relative">
            <img
              src="https://assets.meku.dev/attachments/7c302cd1-7952-4482-a7fb-955e01b4ea57/1771362264385.png"
              alt="Professionelle håndværkere - tømrer, elektriker og VVS-mand"
              className="rounded-2xl shadow-2xl w-full object-cover"
              style={{ minHeight: '380px', maxHeight: '480px', objectFit: 'cover' }}
              loading="eager"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;