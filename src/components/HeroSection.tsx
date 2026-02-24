import React from "react";
import { ArrowRight, CheckCircle, Shield, Award, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        backgroundImage: "url('/portada.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* overlay para que el texto se lea bien */}
      <div className="absolute inset-0 bg-white/70" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-24">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-4 text-gray-900">
            Professionelle løsninger
            <span className="block text-blue-600 mt-1">Du kan stole på</span>
          </h1>

          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            Fra el-arbejde til møbelsamling håndterer vi alle dine
            boligforbedringsbehov med ekspertise og omhu. Hurtigt og pålideligt.
          </p>

          {/* CTAs centrados */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
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

          {/* badges centrados */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
            <div className="flex flex-col items-center text-center space-y-1">
              <CheckCircle className="h-6 w-6 text-blue-600" />
              <span className="text-xs font-medium text-gray-800 leading-tight">
                Professionelle til hver opgave
              </span>
            </div>
            <div className="flex flex-col items-center text-center space-y-1">
              <Clock className="h-6 w-6 text-blue-600" />
              <span className="text-xs font-medium text-gray-800 leading-tight">
                Mere end 10 års erfaring
              </span>
            </div>
            <div className="flex flex-col items-center text-center space-y-1">
              <Shield className="h-6 w-6 text-blue-600" />
              <span className="text-xs font-medium text-gray-800 leading-tight">
                Fuldt forsikret
              </span>
            </div>
            <div className="flex flex-col items-center text-center space-y-1">
              <Award className="h-6 w-6 text-blue-600" />
              <span className="text-xs font-medium text-gray-800 leading-tight">
                2 års garanti på arbejde
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
