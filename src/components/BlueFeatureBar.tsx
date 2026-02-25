import React from 'react';

const features = [
  {
    icon: '🛡️',
    title: 'Fuldt forsikret',
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
    subtitle: 'Mere end 10 års erfaring'
  }
];

export default function BlueFeatureBar() {
  return (
    <section className="bg-[#1f3f8a] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {features.map((f) => (
            <div key={f.title} className="flex flex-col items-center">
              <div className="text-yellow-400 text-3xl mb-3">{f.icon}</div>
              <h3 className="text-white font-bold text-lg">{f.title}</h3>
              <p className="text-blue-100 text-sm mt-2">{f.subtitle}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
