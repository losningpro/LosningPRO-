import React from 'react';
import { ShieldCheck } from 'lucide-react';

export default function BlueFeatureBar() {
  const items = [
    {
      title: 'Fuldt forsikret',
      subtitle: 'Komplet dækning for din tryghed'
    },
    {
      title: '2 års garanti på arbejde',
      subtitle: 'Kvalitet garanteret på vores arbejde'
    },
    {
      title: 'Professionelle til hver opgave',
      subtitle: 'Mere end 10 års erfaring'
    }
  ];

  return (
    <section className="bg-blue-900 py-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-white">

          {items.map((item, index) => (
            <div key={index}>
              <ShieldCheck
                size={36}
                className="mx-auto text-yellow-400 mb-3"
              />
              <h3 className="font-semibold text-lg">
                {item.title}
              </h3>
              <p className="opacity-80 mt-1">
                {item.subtitle}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
