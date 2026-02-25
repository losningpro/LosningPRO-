import React from 'react';

export default function BlueFeatureBar() {
  const items = [
    { title: 'Fuld forsikret', subtitle: 'Komplet dækning for din tryghed' },
    { title: '2 års garanti på arbejde', subtitle: 'Kvalitet garanteret på vores arbejde' },
    { title: 'Professionelle til hver opgave', subtitle: 'Mere end 10 års erfaring' }
  ];

  return (
    <section className="bg-[#1f3f8a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {items.map((it) => (
            <div key={it.title} className="text-white/95">
              <div className="text-yellow-400 text-2xl">🛡️</div>
              <div className="mt-2 font-bold text-lg">{it.title}</div>
              <div className="text-white/80 mt-1">{it.subtitle}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
