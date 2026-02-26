import React from 'react';
import { ShieldCheck } from 'lucide-react';

export default function BlueFeatureBar() {
  const items = [
    { title: 'Fuldt forsikret', subtitle: 'Komplet dækning for din tryghed' },
    { title: '2 års garanti på arbejde', subtitle: 'Kvalitet garanteret på vores arbejde' },
  ];

  return (
    <section className="bg-[#1f3f8a] py-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-center text-white">
          {items.map((item) => (
            <div key={item.title} className="flex flex-col items-center">
              <ShieldCheck size={34} className="text-yellow-400 mb-3" />
              <h3 className="font-semibold text-lg">{item.title}</h3>
              <p className="text-blue-100 text-sm mt-1">{item.subtitle}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
