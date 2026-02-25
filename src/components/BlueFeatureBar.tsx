import React from 'react';
import { ShieldCheck } from 'lucide-react';

export default function BlueFeatureBar() {
  const items = [
    {
      icon: '🛡️',
      title: 'Fuld forsikret',
      subtitle: 'Komplet dækning for din tryghed'
    },
    {
      icon: '🛡️',
      title: '2 års garanti på arbejde',
      subtitle: 'Kvalitet garanteret på vores arbejde'
    },
    { 
      icon: '🛡️',
      title: 'Professionelle til hver opgave',
      subtitle: 'Uddannede fagfolk til dine opgaver'
    },
    {
      icon: '🛡️',
      title: 'Mere end 10 års erfaring',
      subtitle: 'Erfaring du kan stole på'
    }
  ];

  return (
    <section className="bg-blue-900 py-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center text-white">
          {items.map((item, index) => (
            <div key={index}>
              <ShieldCheck size={36} className="mx-auto text-yellow-400 mb-3" />
              <h3 className="font-semibold text-lg">{item.title}</h3>
              <p className="opacity-85 mt-1 text-sm">{item.subtitle}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
