import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Zap, 
  Wrench, 
  Hammer, 
  Paintbrush, 
  Sparkles, 
  Sofa, 
  Package, 
  Settings,
  BookOpen,
  Lightbulb,
  Construction,
  Layers
} from 'lucide-react';

const services = [
  {
    name: 'El-Service',
    slug: 'el',
    icon: Zap,
    description: 'Elektriker service og installation',
    color: 'bg-yellow-500'
  },
  {
    name: 'VVS-Service',
    slug: 'vvs',
    icon: Wrench,
    description: 'VVS installation og reparation',
    color: 'bg-blue-500'
  },
  {
    name: 'Tømrer',
    slug: 'tomrer',
    icon: Hammer,
    description: 'Tømrerarbejde og træarbejde',
    color: 'bg-amber-600'
  },
  {
    name: 'Maling',
    slug: 'maling',
    icon: Paintbrush,
    description: 'Malerfag og overfladebehandling',
    color: 'bg-green-500'
  },
  {
    name: 'Rengøring',
    slug: 'rengoring',
    icon: Sparkles,
    description: 'Professionel rengøring',
    color: 'bg-purple-500'
  },
  {
    name: 'Gardiner',
    slug: 'gardiner',
    icon: Layers,
    description: 'Gardin montering og reparation',
    color: 'bg-pink-500'
  },
  {
    name: 'Møbler',
    slug: 'mobler',
    icon: Sofa,
    description: 'Møbel samling og reparation',
    color: 'bg-indigo-500'
  },
  {
    name: 'Montering',
    slug: 'montering',
    icon: Package,
    description: 'Generel montering service',
    color: 'bg-red-500'
  },
  {
    name: 'Kombineret',
    slug: 'kombineret',
    icon: Settings,
    description: 'Kombinerede tjenester',
    color: 'bg-gray-600'
  },
  {
    name: 'Knowledge',
    slug: 'knowledge',
    icon: BookOpen,
    description: 'Vidensdeling og rådgivning',
    color: 'bg-teal-500'
  },
  {
    name: 'Concepts',
    slug: 'concepts',
    icon: Lightbulb,
    description: 'Koncepter og idéer',
    color: 'bg-orange-500'
  },
  {
    name: 'Tools',
    slug: 'tools',
    icon: Construction,
    description: 'Værktøj og udstyr',
    color: 'bg-slate-600'
  }
];

const ServiceGrid = () => {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Vores Tjenester</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Vi tilbyder et bredt udvalg af professionelle tjenester til både private og erhvervskunder
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <Link
                key={service.slug}
                to={`/tjenester/${service.slug}`}
                className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-200 hover:border-primary/20"
              >
                <div className="p-6">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${service.color} text-white mb-4 group-hover:scale-110 transition-transform`}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServiceGrid;