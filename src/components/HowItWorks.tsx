import React from 'react';
import { Phone, Calendar, Wrench, CheckCircle } from 'lucide-react';

const steps = [
  {
    icon: Phone,
    title: 'Kontakt os',
    description: 'Ring eller send en besked med din opgave'
  },
  {
    icon: Calendar,
    title: 'Book tid',
    description: 'Vi finder en tid der passer dig'
  },
  {
    icon: Wrench,
    title: 'Vi løser opgaven',
    description: 'Vores erfarne teknikere udfører arbejdet'
  },
  {
    icon: CheckCircle,
    title: 'Færdig!',
    description: 'Du får kvalitetsarbejde med garanti'
  }
];

const HowItWorks = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Hvordan fungerer det?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Få hjælp til dine opgaver i 4 enkle trin
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div key={index} className="text-center relative">
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-1/2 w-full h-0.5 bg-gray-200 z-0" />
                )}
                <div className="relative z-10 bg-white">
                  <div className="inline-flex items-center justify-center w-24 h-24 bg-primary text-white rounded-full mb-4">
                    <IconComponent className="h-10 w-10" />
                  </div>
                  <div className="absolute -top-2 -right-2 bg-primary text-white text-sm font-bold rounded-full w-8 h-8 flex items-center justify-center">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;